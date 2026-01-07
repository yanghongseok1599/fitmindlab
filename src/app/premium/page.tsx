"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, FileText, BarChart3, Heart, Shield, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { ROLE_LABELS, Role } from "@/types";

const features = [
  {
    icon: BarChart3,
    title: "전체 36개 강점 순위",
    description: "모든 강점의 순위와 점수를 확인하고 나만의 강점 지도를 완성하세요",
  },
  {
    icon: FileText,
    title: "PDF 리포트 다운로드",
    description: "언제든 다시 볼 수 있는 나만의 강점 리포트를 PDF로 저장하세요",
  },
  {
    icon: Shield,
    title: "약점 분석 + 리스크",
    description: "하위 5개 강점과 그로 인한 비즈니스 리스크를 파악하세요",
  },
  {
    icon: Heart,
    title: "힐링 키워드 추천",
    description: "나의 강점을 회복하고 재충전하는 방법을 알아보세요",
  },
];

const comparisonData = [
  { feature: "검사 문항 수", free: "36문항", premium: "108문항" },
  { feature: "소요 시간", free: "약 10분", premium: "약 30분" },
  { feature: "TOP 5 강점", free: true, premium: true },
  { feature: "피트니스 유형 분석", free: true, premium: true },
  { feature: "도메인 분포", free: true, premium: true },
  { feature: "전체 36개 강점 순위", free: false, premium: true },
  { feature: "약점 분석 + 리스크", free: false, premium: true },
  { feature: "힐링 키워드 추천", free: false, premium: true },
  { feature: "PDF 리포트 다운로드", free: false, premium: true },
];

export default function PremiumPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasFreeAssessment, setHasFreeAssessment] = useState(false);
  const [savedRole, setSavedRole] = useState<Role | null>(null);

  useEffect(() => {
    // 무료 검사 완료 여부 확인
    const freeResponses = localStorage.getItem("freeAssessmentResponses");
    const freeRole = localStorage.getItem("freeAssessmentRole") as Role | null;

    if (freeResponses && freeRole) {
      setHasFreeAssessment(true);
      setSavedRole(freeRole);
    }
  }, []);

  const handlePayment = () => {
    if (!hasFreeAssessment) {
      // 무료 검사를 먼저 진행하도록 안내
      alert("무료 검사를 먼저 진행해주세요!");
      router.push("/select-role");
      return;
    }

    setIsProcessing(true);

    // 목업 결제: 2초 후 결제 완료 처리
    setTimeout(() => {
      // 프리미엄 결제 완료 상태 저장
      sessionStorage.setItem("premiumPaid", "true");

      // 바로 프리미엄 검사 페이지로 이동 (역할 선택 페이지 건너뜀)
      router.push("/premium/assessment");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/results" className="inline-flex items-center text-slate-600 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          결과 페이지로 돌아가기
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-1 bg-gradient-to-r from-violet-100 to-blue-100">
            프리미엄 정밀 검사
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            나의 <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">모든 강점</span>을
            <br />완벽하게 분석하세요
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            108문항 정밀 검사로 36개 강점 전체를 분석하고
            <br />나만의 프리미엄 리포트를 받아보세요
          </p>

          {/* Price Card */}
          <Card className="max-w-md mx-auto border-2 border-violet-200 shadow-xl">
            <CardContent className="p-8">
              <div className="text-slate-500 line-through text-lg">9,900원</div>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  5,900
                </span>
                <span className="text-xl text-slate-700">원</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">커피 한 잔 값으로 내 비즈니스 플랜을 완성하세요</p>

              {hasFreeAssessment && savedRole ? (
                <>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4 text-left">
                    <p className="text-sm text-emerald-700 flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      <span>
                        <strong>{ROLE_LABELS[savedRole]}</strong> 역할로 무료 검사 완료
                      </span>
                    </p>
                    <p className="text-xs text-emerald-600 mt-1 ml-6">
                      36문항 응답이 반영되어 72문항만 추가 진행됩니다
                    </p>
                  </div>
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    size="lg"
                    className="w-full text-lg py-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        결제 처리 중...
                      </>
                    ) : (
                      "결제하고 검사 시작하기"
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-left">
                    <p className="text-sm text-amber-700 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      무료 검사를 먼저 진행해주세요
                    </p>
                    <p className="text-xs text-amber-600 mt-1 ml-6">
                      무료 검사 완료 후 프리미엄 검사를 이용할 수 있습니다
                    </p>
                  </div>
                  <Link href="/select-role">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full text-lg py-6"
                    >
                      무료 검사 먼저 하기
                    </Button>
                  </Link>
                </>
              )}

              <p className="text-xs text-slate-400 mt-4">
                * 테스트 버전: 실제 결제 없이 진행됩니다
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
            프리미엄 검사에서만 제공되는 기능
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-100 to-blue-100 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
            무료 vs 프리미엄 비교
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-3 bg-slate-100 p-4 font-semibold text-slate-700">
                <div></div>
                <div className="text-center">무료</div>
                <div className="text-center text-violet-600">프리미엄</div>
              </div>
              {comparisonData.map((row, i) => (
                <div key={i} className="grid grid-cols-3 p-4 border-t border-slate-100 items-center">
                  <div className="text-slate-700 text-sm">{row.feature}</div>
                  <div className="text-center">
                    {typeof row.free === "boolean" ? (
                      row.free ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-slate-300">-</span>
                      )
                    ) : (
                      <span className="text-slate-600 text-sm">{row.free}</span>
                    )}
                  </div>
                  <div className="text-center">
                    {typeof row.premium === "boolean" ? (
                      row.premium ? (
                        <Check className="w-5 h-5 text-violet-600 mx-auto" />
                      ) : (
                        <span className="text-slate-300">-</span>
                      )
                    ) : (
                      <span className="text-violet-600 font-medium text-sm">{row.premium}</span>
                    )}
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-violet-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            나의 36개 강점 전체를 알아보세요
          </h2>
          <p className="text-white/80 mb-8">
            108문항 정밀 검사로 더 정확한 나를 발견하세요
          </p>
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                결제 처리 중...
              </>
            ) : (
              "5,900원으로 시작하기"
            )}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">핏마인드랩 - 피트니스 리더 강점검사</p>
        </div>
      </footer>
    </main>
  );
}
