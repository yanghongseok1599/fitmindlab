"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getQuestions } from "@/data/questions";
import { Role, Question, Response } from "@/types";

const scaleOptions = [
  { value: 1, label: "매우 그렇지 않다" },
  { value: 2, label: "그렇지 않다" },
  { value: 3, label: "보통이다" },
  { value: 4, label: "그렇다" },
  { value: 5, label: "매우 그렇다" },
];

function AssessmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") as Role;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);

  useEffect(() => {
    if (!role || !["manager", "operator", "trainer"].includes(role)) {
      router.push("/select-role");
      return;
    }
    setQuestions(getQuestions(role));
  }, [role, router]);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const isLastQuestion = currentIndex === questions.length - 1;

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
      sessionStorage.setItem("assessmentResponses", JSON.stringify(newResponses));
      sessionStorage.setItem("assessmentRole", role);
      router.push("/results");
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
          <p className="text-slate-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>진행률</span>
              <span>
                {currentIndex + 1} / {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <span className="inline-block bg-violet-100 text-violet-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
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
        </div>
      </div>
    </main>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600 mx-auto mb-4" />
          <p className="text-slate-600">로딩 중...</p>
        </div>
      </div>
    }>
      <AssessmentContent />
    </Suspense>
  );
}
