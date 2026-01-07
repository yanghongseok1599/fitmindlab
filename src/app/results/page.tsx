"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import html2canvas from "html2canvas";
import {
  Loader2,
  Share2,
  Download,
  RotateCcw,
  Home,
  Trophy,
  BarChart3,
  Sparkles,
  Lock,
  TrendingUp,
  AlertCircle,
  Eye,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ShareCard from "@/components/ShareCard";
import DynamicIcon from "@/components/DynamicIcon";
import { calculateResults } from "@/lib/scoring";
import { Role, ROLE_LABELS, Response, AssessmentResult, DOMAIN_INFO, FitnessTypeCode } from "@/types";

const TYPE_IMAGES: Record<FitnessTypeCode, string> = {
  LONE_WOLF: "/론울프.png",
  EMPIRE_BUILDER: "/제국건설자.png",
  RESULT_MACHINE: "/결과머신.png",
  HEALING_MASTER: "/힐링마스터.png",
  CREATOR: "/크리에이터.png",
  STRATEGIST: "/전략분석가.png",
  MASTER_MENTOR: "/멘토장인.png",
  ALL_ROUNDER: "/올라운더.png",
};

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const responsesData = sessionStorage.getItem("assessmentResponses");
    const roleData = sessionStorage.getItem("assessmentRole");

    if (!responsesData || !roleData) {
      router.push("/select-role");
      return;
    }

    const responses: Response[] = JSON.parse(responsesData);
    const role = roleData as Role;
    const calculatedResult = calculateResults(responses, role);
    setResult(calculatedResult);
    setLoading(false);

    // 무료 검사 응답을 localStorage에 저장 (프리미엄 검사 시 재활용 위해)
    localStorage.setItem("freeAssessmentResponses", responsesData);
    localStorage.setItem("freeAssessmentRole", roleData);
  }, [router]);

  const generateAndDownloadImage = async () => {
    if (!shareCardRef.current || !result) return;

    setIsGenerating(true);
    setShowShareCard(true);

    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          // Remove all stylesheets to avoid oklch color parsing
          const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          styles.forEach((style) => style.remove());

          // Override CSS variables with hex colors
          clonedDoc.documentElement.style.cssText = `
            --background: #ffffff;
            --foreground: #0a0a0a;
          `;
        },
      });

      const link = document.createElement("a");
      link.download = `핏마인드랩-${result.fitnessType.nameKo}-결과.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      setIsGenerating(false);
    } catch (error) {
      console.error("Image generation failed:", error);
      setIsGenerating(false);
    }
  };

  const generateAndShareImage = async () => {
    if (!shareCardRef.current || !result) return;

    setIsGenerating(true);
    setShowShareCard(true);

    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          // Remove all stylesheets to avoid oklch color parsing
          const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          styles.forEach((style) => style.remove());

          // Override CSS variables with hex colors
          clonedDoc.documentElement.style.cssText = `
            --background: #ffffff;
            --foreground: #0a0a0a;
          `;
        },
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsGenerating(false);
          return;
        }

        const file = new File([blob], `핏마인드랩-결과.png`, { type: "image/png" });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: "피트니스 리더 강점검사 결과",
              text: `나는 [${result.fitnessType.nameKo}] 유형의 [${ROLE_LABELS[result.role]}]입니다!\n\n"${result.fitnessType.slogan}"\n\n나도 검사하기`,
              files: [file],
            });
          } catch (err) {
            console.log("Share cancelled");
          }
        } else {
          const link = document.createElement("a");
          link.download = `핏마인드랩-${result.fitnessType.nameKo}-결과.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
          alert("이미지가 저장되었습니다! SNS에 직접 업로드해주세요.");
        }

        setIsGenerating(false);
      }, "image/png");
    } catch (error) {
      console.error("Image generation failed:", error);
      setIsGenerating(false);
    }
  };

  const handleRestart = () => {
    sessionStorage.removeItem("assessmentResponses");
    sessionStorage.removeItem("assessmentRole");
    router.push("/select-role");
  };

  if (loading || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-violet-600 mx-auto mb-4" />
          <p className="text-slate-600">결과를 분석하고 있습니다...</p>
        </div>
      </div>
    );
  }

  const { fitnessType, topStrengths, domainScores, role } = result;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Type Result Card */}
          <Card className="mb-8 overflow-hidden shadow-xl">
            <div className="bg-white p-8 text-center">
              <div className="w-56 h-56 md:w-72 md:h-72 mx-auto mb-6 relative">
                <Image
                  src={TYPE_IMAGES[fitnessType.code]}
                  alt={fitnessType.nameKo}
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
                당신은{" "}
                <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  [{fitnessType.nameKo}]
                </span>{" "}
                유형의{" "}
                <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  [{ROLE_LABELS[role]}]
                </span>
                입니다
              </h1>
            </div>
            <CardContent className="p-8">
              <blockquote className="text-lg md:text-xl text-slate-700 text-center italic mb-6 leading-relaxed">
                &ldquo;{fitnessType.mainMessage}&rdquo;
              </blockquote>

              <Separator className="my-6" />

              {/* Recommended Business */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-violet-600" /> 추천 비즈니스 모델
                </h3>
                <ul className="space-y-2">
                  {fitnessType.recommendedBusiness.map((item, index) => (
                    <li key={index} className="flex items-center text-slate-600">
                      <span className="w-2 h-2 bg-violet-500 rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Slogan */}
              <div className="bg-slate-50 rounded-lg p-4 text-center mb-6">
                <p className="text-sm text-slate-500 mb-1">당신의 슬로건</p>
                <p className="text-lg font-medium text-slate-900">
                  &ldquo;{fitnessType.slogan}&rdquo;
                </p>
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-2 justify-center">
                {fitnessType.hashtags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Share Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={generateAndShareImage}
              disabled={isGenerating}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  이미지 생성 중...
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 mr-2" />
                  카드 이미지 공유하기
                </>
              )}
            </Button>
            <Button
              onClick={generateAndDownloadImage}
              disabled={isGenerating}
              variant="outline"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  생성 중...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  이미지 저장하기
                </>
              )}
            </Button>
          </div>

          <Separator className="my-8" />

          {/* TOP 5 Strengths */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <Trophy className="w-6 h-6 mr-2 text-amber-500" />
              나의 TOP 5 강점
            </h2>
            <div className="space-y-4">
              {topStrengths.map((item, index) => {
                const domainInfo = DOMAIN_INFO[item.keyword.domain];
                const rankLabels = ["1st", "2nd", "3rd", "4th", "5th"];
                return (
                  <Card key={item.keywordId} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-stretch">
                        <div
                          className={`w-16 flex items-center justify-center text-white font-bold ${domainInfo.bgColor}`}
                        >
                          {rankLabels[index]}
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg text-slate-900">
                              {item.keyword.nameKo}
                            </h3>
                            <span className="text-sm text-slate-500">
                              ({item.keyword.nameEn})
                            </span>
                            <Badge
                              variant="outline"
                              style={{ borderColor: domainInfo.color, color: domainInfo.color }}
                            >
                              {domainInfo.nameKo}
                            </Badge>
                          </div>
                          <p className="text-slate-600 text-sm mb-3">
                            {item.keyword.description}
                          </p>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-sm font-medium text-slate-700 mb-2 flex items-center">
                              <TrendingUp className="w-4 h-4 mr-1 text-emerald-600" />
                              이 강점 더 키우기:
                            </p>
                            <ul className="text-sm text-slate-600 space-y-1">
                              {item.keyword.enhancementTips.map((tip, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="mr-2">•</span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Domain Scores */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-500" />
              도메인 분포
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {domainScores.map((ds) => {
                    const info = DOMAIN_INFO[ds.domain];
                    return (
                      <div key={ds.domain} className="text-center">
                        <div
                          className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: info.color }}
                        >
                          {ds.percentage}%
                        </div>
                        <p className="font-medium text-slate-900">{info.nameKo}</p>
                        <p className="text-sm text-slate-500">
                          {ds.score.toFixed(1)}점
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Premium Upsell */}
          <Card className="mb-8 border-2 border-violet-200 bg-gradient-to-r from-violet-50 to-blue-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center justify-center">
                <Lock className="w-5 h-5 mr-2 text-violet-600" />
                더 깊이 알아보세요
              </h3>
              <ul className="text-slate-600 space-y-2 mb-6 text-left max-w-md mx-auto">
                <li className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-slate-400" />
                  나머지 31개 강점 순위가 궁금하지 않으세요?
                </li>
                <li className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-slate-400" />
                  나의 약점을 알고 사업 리스크를 예방하세요
                </li>
                <li className="flex items-center">
                  <Eye className="w-4 h-4 mr-2 text-slate-400" />
                  남들이 보는 당신은 다를 수 있어요
                </li>
                <li className="flex items-center">
                  <Leaf className="w-4 h-4 mr-2 text-slate-400" />
                  지칠 때 당신을 회복시키는 힐링 키워드
                </li>
              </ul>
              <p className="text-slate-700 font-medium mb-4">
                커피 한 잔 값으로 내 비즈니스 플랜을 완성해보세요
              </p>
              <Link href="/premium">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                >
                  정밀 검사 후 프리미엄 리포트 받기{" "}
                  <span className="line-through text-white/60 mx-2">9,900원</span>
                  <span className="font-bold">5,900원</span>
                </Button>
              </Link>
              <p className="text-sm text-slate-500 mt-2">
                108문항 정밀 검사 + PDF 리포트 제공
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={handleRestart}>
              <RotateCcw className="w-4 h-4 mr-2" />
              다시 검사하기
            </Button>
            <Link href="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                처음으로
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hidden Share Card for Image Generation */}
      <div
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          backgroundColor: "#ffffff",
          isolation: "isolate",
        }}
      >
        <ShareCard
          ref={shareCardRef}
          fitnessType={fitnessType}
          role={role}
          topStrengths={topStrengths}
        />
      </div>
    </main>
  );
}
