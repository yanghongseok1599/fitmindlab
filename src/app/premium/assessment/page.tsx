"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { getPremiumQuestions } from "@/data/premium-questions";
import { Role, Question, Response } from "@/types";

const scaleOptions = [
  { value: 1, label: "매우 그렇지 않다" },
  { value: 2, label: "그렇지 않다" },
  { value: 3, label: "보통이다" },
  { value: 4, label: "그렇다" },
  { value: 5, label: "매우 그렇다" },
];

export default function PremiumAssessmentPage() {
  const router = useRouter();

  const [role, setRole] = useState<Role | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);
  const [freeResponses, setFreeResponses] = useState<Response[]>([]);
  const [hasFreeAssessment, setHasFreeAssessment] = useState(false);

  useEffect(() => {
    // 프리미엄 결제 확인
    const isPaid = sessionStorage.getItem("premiumPaid");
    if (!isPaid) {
      router.push("/premium");
      return;
    }

    // localStorage에서 무료 검사 역할 가져오기
    const freeRoleData = localStorage.getItem("freeAssessmentRole") as Role | null;
    const freeResponsesData = localStorage.getItem("freeAssessmentResponses");

    if (!freeRoleData || !freeResponsesData) {
      // 무료 검사를 먼저 진행하도록 안내
      router.push("/premium");
      return;
    }

    setRole(freeRoleData);
    const allQuestions = getPremiumQuestions(freeRoleData);

    // 무료 검사 응답을 프리미엄 형식(Type A)으로 변환
    const parsedFreeResponses: Response[] = JSON.parse(freeResponsesData);
    const typeAResponses: Response[] = parsedFreeResponses.map((freeResp) => {
      const typeAQuestion = allQuestions.find(
        (q) => q.keywordId === freeResp.keywordId && q.type === 'A'
      );
      return {
        questionId: typeAQuestion?.id || freeResp.questionId,
        keywordId: freeResp.keywordId,
        type: 'A' as const,
        score: freeResp.score,
      };
    });

    setFreeResponses(typeAResponses);
    setHasFreeAssessment(true);

    // Type B, C 문항만 필터링 (72문항)
    const filteredQuestions = allQuestions.filter((q) => q.type !== 'A');
    setQuestions(filteredQuestions);
  }, [router]);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const isLastQuestion = currentIndex === questions.length - 1;

  // 예상 남은 시간 계산 (문항당 평균 15초)
  const remainingQuestions = questions.length - currentIndex;
  const remainingMinutes = Math.ceil((remainingQuestions * 15) / 60);

  const handleAnswer = (value: string) => {
    setCurrentAnswer(parseInt(value));
  };

  const handleNext = () => {
    if (currentAnswer === null || !currentQuestion) return;

    const newResponse: Response = {
      questionId: currentQuestion.id,
      keywordId: currentQuestion.keywordId,
      type: currentQuestion.type,
      score: currentAnswer,
    };

    const newResponses = [...responses, newResponse];
    setResponses(newResponses);

    if (isLastQuestion) {
      // 무료 검사 응답이 있으면 병합
      const allResponses = hasFreeAssessment
        ? [...freeResponses, ...newResponses]
        : newResponses;

      sessionStorage.setItem("premiumResponses", JSON.stringify(allResponses));
      sessionStorage.setItem("premiumRole", role || "");
      router.push("/premium-results");
    } else {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      const prevResponse = responses[currentIndex - 1];
      if (prevResponse) {
        setCurrentAnswer(prevResponse.score);
        setResponses(responses.slice(0, -1));
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "5") {
        setCurrentAnswer(parseInt(e.key));
      } else if (e.key === "Enter" && currentAnswer !== null) {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentAnswer, currentIndex]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600 mx-auto mb-4" />
          <p className="text-slate-600">프리미엄 검사 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Premium Badge */}
          <div className="text-center mb-6">
            <Badge className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-1">
              프리미엄 정밀 검사 ({questions.length}문항)
            </Badge>
            {hasFreeAssessment && (
              <p className="text-sm text-emerald-600 mt-2">
                ✓ 무료 검사 응답이 반영되어 {108 - questions.length}문항이 자동 건너뛰기됩니다
              </p>
            )}
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>진행률</span>
              <span>
                {currentIndex + 1} / {questions.length} (약 {remainingMinutes}분 남음)
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-8 shadow-lg border-violet-100">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <span className="inline-block bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  Q{currentIndex + 1}
                </span>
                <h2 className="text-xl md:text-2xl font-medium text-slate-900 leading-relaxed">
                  {currentQuestion?.content}
                </h2>
              </div>

              <RadioGroup
                value={currentAnswer?.toString() || ""}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {scaleOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      currentAnswer === option.value
                        ? "border-violet-500 bg-violet-50"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <RadioGroupItem
                      value={option.value.toString()}
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                        currentAnswer === option.value
                          ? "border-violet-500 bg-violet-500"
                          : "border-slate-300"
                      }`}
                    >
                      {currentAnswer === option.value && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-slate-700">{option.label}</span>
                    <span className="ml-auto text-slate-400 text-sm">
                      {option.value}
                    </span>
                  </label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-6"
            >
              이전
            </Button>

            <p className="text-sm text-slate-500 hidden md:block">
              키보드 1-5로 빠르게 응답하세요
            </p>

            <Button
              onClick={handleNext}
              disabled={currentAnswer === null}
              className="px-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
            >
              {isLastQuestion ? "결과 보기" : "다음"}
            </Button>
          </div>

          {/* Progress Milestones */}
          {currentIndex > 0 && currentIndex % (hasFreeAssessment ? 24 : 36) === 0 && (
            <Card className="mt-8 bg-gradient-to-r from-violet-50 to-blue-50 border-violet-200">
              <CardContent className="p-6 text-center">
                <p className="text-violet-700 font-medium">
                  {hasFreeAssessment ? (
                    <>
                      {currentIndex === 24 && "1/3 완료! 잘 하고 계세요 💪"}
                      {currentIndex === 48 && "2/3 완료! 조금만 더 힘내세요 🔥"}
                    </>
                  ) : (
                    <>
                      {currentIndex === 36 && "1/3 완료! 잘 하고 계세요 💪"}
                      {currentIndex === 72 && "2/3 완료! 조금만 더 힘내세요 🔥"}
                    </>
                  )}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
