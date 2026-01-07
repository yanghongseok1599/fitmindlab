"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Loader2,
  Share2,
  Download,
  RotateCcw,
  Home,
  Trophy,
  BarChart3,
  Sparkles,
  FileText,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Heart,
  Crown,
  Lightbulb,
  Zap,
  Users,
  Target,
  BookOpen,
  Check,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ShareCard from "@/components/ShareCard";
import { calculateResults } from "@/lib/scoring";
import { Role, ROLE_LABELS, Response, AssessmentResult, DOMAIN_INFO, FitnessTypeCode } from "@/types";
import { getSynergyAnalysis, TEAM_BUILDING_GUIDE, ACTION_PLANS, ROLE_GUIDES, RECOMMENDED_CONTENTS } from "@/data/premium-data";
import { fitnessTypes } from "@/data/fitness-types";

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

export default function PremiumResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const pdfContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 프리미엄 결제 확인
    const isPaid = sessionStorage.getItem("premiumPaid");
    if (!isPaid) {
      router.push("/premium");
      return;
    }

    const responsesData = sessionStorage.getItem("premiumResponses");
    const roleData = sessionStorage.getItem("premiumRole");

    if (!responsesData || !roleData) {
      router.push("/select-role?premium=true");
      return;
    }

    const responses: Response[] = JSON.parse(responsesData);
    const role = roleData as Role;
    const calculatedResult = calculateResults(responses, role);
    setResult(calculatedResult);
    setLoading(false);
  }, [router]);

  const generateAndDownloadImage = async () => {
    if (!shareCardRef.current || !result) return;

    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          styles.forEach((style) => style.remove());
          clonedDoc.documentElement.style.cssText = `
            --background: #ffffff;
            --foreground: #0a0a0a;
          `;
        },
      });

      const link = document.createElement("a");
      link.download = `핏마인드랩-${result.fitnessType.nameKo}-프리미엄결과.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      setIsGenerating(false);
    } catch (error) {
      console.error("Image generation failed:", error);
      setIsGenerating(false);
    }
  };

  const generatePdf = async () => {
    if (!result || !pdfContentRef.current) return;

    setIsPdfGenerating(true);

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // PDF 페이지 요소들을 찾기
      const container = pdfContentRef.current;
      const pdfPages = container.querySelectorAll('.pdf-page');

      // 격리된 iframe 생성 (Tailwind CSS의 lab() 색상 함수 문제 회피)
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position: fixed; left: 0; top: 0; width: 595px; height: 842px; border: none; opacity: 0; pointer-events: none;';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        throw new Error('iframe document not available');
      }

      for (let i = 0; i < pdfPages.length; i++) {
        const page = pdfPages[i] as HTMLElement;

        // iframe 문서 초기화 (Tailwind CSS 없이 깨끗한 환경)
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { background: white; font-family: system-ui, -apple-system, sans-serif; }
              </style>
            </head>
            <body></body>
          </html>
        `);
        iframeDoc.close();

        // 페이지 복제 후 iframe에 추가
        const clonedPage = page.cloneNode(true) as HTMLElement;
        iframeDoc.body.appendChild(clonedPage);

        await new Promise(resolve => setTimeout(resolve, 100));

        // html2canvas로 iframe 내부 캡처
        const canvas = await html2canvas(clonedPage, {
          scale: 2,
          backgroundColor: "#ffffff",
          useCORS: true,
          logging: false,
          windowWidth: 595,
          windowHeight: 842,
        });

        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, Math.min(imgHeight, pageHeight));
      }

      // iframe 제거
      document.body.removeChild(iframe);

      pdf.save(`핏마인드랩-${result.fitnessType.nameKo}-프리미엄리포트.pdf`);

    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("PDF 생성에 실패했습니다. 다시 시도해주세요.");
    }

    setIsPdfGenerating(false);
  };

  const handleRestart = () => {
    sessionStorage.removeItem("premiumResponses");
    sessionStorage.removeItem("premiumRole");
    sessionStorage.removeItem("premiumPaid");
    router.push("/");
  };

  if (loading || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-violet-600 mx-auto mb-4" />
          <p className="text-slate-600">프리미엄 결과를 분석하고 있습니다...</p>
        </div>
      </div>
    );
  }

  const { fitnessType, topStrengths, domainScores, role, allScores } = result;
  const weaknesses = allScores.slice(-5).reverse();
  const healingStrengths = allScores.slice(10, 15); // 11-15위: 힐링 키워드

  // 강점 조합 시너지 분석
  const strengthNames = topStrengths.map(s => s.keyword.nameKo);
  const synergies = getSynergyAnalysis(strengthNames);

  // 팀 빌딩 가이드
  const teamGuide = TEAM_BUILDING_GUIDE[fitnessType.code];

  // 역할별 가이드
  const roleGuide = ROLE_GUIDES[role];

  // 추천 콘텐츠
  const recommendedContents = RECOMMENDED_CONTENTS[fitnessType.code];

  // 즉시 실천 액션 플랜 (TOP 3 강점 기반)
  const actionPlanItems = topStrengths.slice(0, 3).map(s => ({
    keyword: s.keyword.nameKo,
    actions: ACTION_PLANS[s.keywordId] || [],
  }));


  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Premium Badge */}
          <div className="text-center mb-6">
            <Badge className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-2 text-sm">
              <Crown className="w-4 h-4 mr-2" />
              프리미엄 리포트
            </Badge>
          </div>

          {/* Type Result Card */}
          <Card className="mb-8 overflow-hidden shadow-xl border-violet-200 border-2">
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

          {/* PDF Download & Share Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={generatePdf}
              disabled={isPdfGenerating}
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
            >
              {isPdfGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  PDF 생성 중...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  PDF 리포트 다운로드
                </>
              )}
            </Button>
            <Button
              onClick={() => {
                const text = `나의 피트니스 리더 유형은 [${fitnessType.nameKo}]입니다!\n\n"${fitnessType.slogan}"\n\nTOP 5 강점:\n${topStrengths.slice(0, 5).map((s, i) => `${i + 1}. ${s.keyword.nameKo}`).join('\n')}\n\n나도 검사해보기 ${window.location.origin}`;
                if (navigator.share) {
                  navigator.share({ title: '핏마인드랩 결과', text });
                } else {
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                }
              }}
              variant="outline"
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <Share2 className="w-4 h-4 mr-2" />
              SNS 공유하기
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

          {/* Full 36 Rankings - Premium Only */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-500" />
              전체 36개 강점 순위
              <Badge className="ml-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white">
                Premium
              </Badge>
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">순위</th>
                        <th className="text-left py-2 px-2">강점</th>
                        <th className="text-left py-2 px-2">도메인</th>
                        <th className="text-right py-2 px-2">점수</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allScores.map((item, index) => {
                        const domainInfo = DOMAIN_INFO[item.keyword.domain];
                        const isTop5 = index < 5;
                        const isBottom5 = index >= allScores.length - 5;
                        return (
                          <tr
                            key={item.keywordId}
                            className={`border-b ${
                              isTop5
                                ? "bg-emerald-50"
                                : isBottom5
                                ? "bg-red-50"
                                : ""
                            }`}
                          >
                            <td className="py-2 px-2 font-medium">
                              {index + 1}
                              {isTop5 && <TrendingUp className="w-3 h-3 inline ml-1 text-emerald-600" />}
                              {isBottom5 && <TrendingDown className="w-3 h-3 inline ml-1 text-red-500" />}
                            </td>
                            <td className="py-2 px-2">
                              {item.keyword.nameKo}
                              <span className="text-slate-400 ml-1">({item.keyword.nameEn})</span>
                            </td>
                            <td className="py-2 px-2">
                              <Badge
                                variant="outline"
                                style={{ borderColor: domainInfo.color, color: domainInfo.color }}
                                className="text-xs"
                              >
                                {domainInfo.nameKo}
                              </Badge>
                            </td>
                            <td className="py-2 px-2 text-right font-medium">
                              {item.score.toFixed(1)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

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
                            <span className="ml-auto text-sm font-medium text-slate-600">
                              {item.score.toFixed(1)}점
                            </span>
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

          <Separator className="my-8" />

          {/* 강점 조합 시너지 분석 */}
          {synergies.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
                <Zap className="w-6 h-6 mr-2 text-amber-500" />
                강점 조합 시너지 분석
                <Badge className="ml-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white">
                  Premium
                </Badge>
              </h2>
              <p className="text-center text-slate-600 mb-6">
                나의 TOP 5 강점들이 만들어내는 시너지 효과입니다
              </p>
              <div className="space-y-4">
                {synergies.map((synergy, index) => (
                  <Card key={index} className="border-amber-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 mb-1">
                            {synergy.title}
                          </h3>
                          <p className="text-slate-600">
                            {synergy.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          <Separator className="my-8" />

          {/* 팀 빌딩 가이드 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <Users className="w-6 h-6 mr-2 text-blue-500" />
              팀 빌딩 가이드
              <Badge className="ml-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white">
                Premium
              </Badge>
            </h2>
            <div className="space-y-6">
              {/* 시너지 좋은 유형 */}
              <Card className="border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    시너지 좋은 파트너 유형
                  </h3>
                  <div className="space-y-4">
                    {teamGuide.partnerTypes.map((partner, index) => {
                      const partnerType = fitnessTypes[partner.type];
                      return (
                        <div key={index} className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-bold flex-shrink-0">
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-bold text-slate-900">{partnerType.nameKo}</p>
                              <p className="text-sm text-slate-600">{partner.reason}</p>
                            </div>
                          </div>
                          {/* 시너지 상세 설명 */}
                          <div className="bg-white p-3 rounded-lg mb-2">
                            <p className="text-sm font-medium text-blue-700 mb-1 flex items-center">
                              <Zap className="w-4 h-4 mr-1" />
                              왜 시너지가 좋을까요?
                            </p>
                            <p className="text-sm text-slate-600">{partner.synergyDetail}</p>
                          </div>
                          {/* 팀워크 팁 */}
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-700 mb-1 flex items-center">
                              <Lightbulb className="w-4 h-4 mr-1" />
                              이렇게 협업하세요
                            </p>
                            <p className="text-sm text-blue-800">{partner.teamworkTip}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* 채용 시 찾아야 할 강점 (경영자/운영자) 또는 상사일 때 좋은 강점 (트레이너) */}
              {role === 'trainer' && roleGuide.bossStrengths ? (
                <Card className="border-purple-200">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center">
                      <Crown className="w-5 h-5 mr-2 text-purple-500" />
                      이런 상사/대표와 잘 맞아요
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {roleGuide.bossStrengths.strengths.map((strength, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-700 border-purple-300 px-3 py-1">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-purple-700 leading-relaxed">
                        {roleGuide.bossStrengths.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-emerald-200">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-emerald-500" />
                      채용 시 찾아야 할 강점
                    </h3>
                    <div className="space-y-3 mb-4">
                      {teamGuide.recruitStrengths.map((strengthItem, index) => (
                        <div key={index} className="bg-emerald-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
                              {strengthItem.name}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 ml-1">{strengthItem.reason}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <p className="text-sm text-emerald-700 flex items-start">
                        <Lightbulb className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                        {teamGuide.teamTip}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          <Separator className="my-8" />

          {/* 즉시 실천 액션 플랜 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <Target className="w-6 h-6 mr-2 text-violet-500" />
              즉시 실천 액션 플랜
              <Badge className="ml-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white">
                Premium
              </Badge>
            </h2>
            <p className="text-center text-slate-600 mb-6">
              TOP 3 강점을 오늘부터 바로 활용해보세요
            </p>
            <div className="space-y-4">
              {actionPlanItems.map((item, index) => (
                <Card key={index} className="border-violet-200">
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      {item.keyword} 강점 활용하기
                    </h3>
                    <ul className="space-y-2">
                      {item.actions.map((action, i) => (
                        <li key={i} className="flex items-start text-slate-600">
                          <Check className="w-4 h-4 mr-2 text-violet-500 flex-shrink-0 mt-1" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="my-8" />

          {/* 역할별 맞춤 가이드 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <Briefcase className="w-6 h-6 mr-2 text-slate-700" />
              {roleGuide.title}
              <Badge className="ml-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white">
                Premium
              </Badge>
            </h2>
            <p className="text-center text-slate-600 mb-6">
              {roleGuide.description}
            </p>
            <div className="space-y-4">
              {roleGuide.focusAreas.map((area, index) => (
                <Card key={index} className="border-slate-200">
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-slate-700 text-white text-sm flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      {area.title}
                    </h3>
                    <ul className="space-y-2">
                      {area.tips.map((tip, i) => (
                        <li key={i} className="flex items-start text-slate-600 bg-slate-50 p-2 rounded-lg">
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 font-medium">
                            {i + 1}
                          </span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="my-8" />

          {/* Weakness Analysis - Premium Only */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
              약점 분석 & 비즈니스 리스크
              <Badge className="ml-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white">
                Premium
              </Badge>
            </h2>
            <div className="space-y-4">
              {weaknesses.map((item, index) => {
                const domainInfo = DOMAIN_INFO[item.keyword.domain];
                return (
                  <Card key={item.keywordId} className="overflow-hidden border-red-200">
                    <CardContent className="p-0">
                      <div className="flex items-stretch">
                        <div className="w-16 bg-red-500 flex items-center justify-center text-white font-bold">
                          {allScores.length - 4 + index}위
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg text-slate-900">
                              {item.keyword.nameKo}
                            </h3>
                            <Badge
                              variant="outline"
                              style={{ borderColor: domainInfo.color, color: domainInfo.color }}
                            >
                              {domainInfo.nameKo}
                            </Badge>
                            <span className="ml-auto text-sm font-medium text-red-600">
                              {item.score.toFixed(1)}점
                            </span>
                          </div>
                          <div className="bg-red-50 rounded-lg p-3 mt-2">
                            <p className="text-sm font-medium text-red-700 mb-1 flex items-center">
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              비즈니스 리스크
                            </p>
                            <p className="text-sm text-red-600">
                              {item.keyword.weaknessRisk}
                            </p>
                          </div>
                          {/* 약점 보완 솔루션 */}
                          <div className="bg-emerald-50 rounded-lg p-3 mt-3">
                            <p className="text-sm font-medium text-emerald-700 mb-2 flex items-center">
                              <Lightbulb className="w-4 h-4 mr-1" />
                              보완 솔루션
                            </p>
                            <ul className="text-sm text-emerald-700 space-y-2">
                              {item.keyword.weaknessSolutions?.map((solution, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-700 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 font-medium">
                                    {i + 1}
                                  </span>
                                  <span>{solution}</span>
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

          <Separator className="my-8" />

          {/* Healing Keywords - Premium Only */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <Heart className="w-6 h-6 mr-2 text-emerald-500" />
              힐링 키워드
              <Badge className="ml-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white">
                Premium
              </Badge>
            </h2>
            <p className="text-center text-slate-600 mb-6">
              지치고 힘들 때 회복에 도움이 되는 활동입니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {healingStrengths.map((item, index) => {
                const domainInfo = DOMAIN_INFO[item.keyword.domain];
                return (
                  <Card key={item.keywordId} className="border-emerald-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">
                          {index + 11}
                        </span>
                        <h3 className="font-bold text-slate-900">
                          {item.keyword.nameKo}
                        </h3>
                        <Badge
                          variant="outline"
                          style={{ borderColor: domainInfo.color, color: domainInfo.color }}
                          className="text-xs"
                        >
                          {domainInfo.nameKo}
                        </Badge>
                      </div>
                      <p className="text-emerald-700 text-sm bg-emerald-50 p-3 rounded-lg mb-3">
                        <Heart className="w-4 h-4 inline mr-1" />
                        {item.keyword.healingKeyword}
                      </p>
                      {/* 힐링 키워드 활용 솔루션 3줄 */}
                      {item.keyword.healingTips && item.keyword.healingTips.length > 0 && (
                        <div className="bg-slate-50 rounded-lg p-3">
                          <p className="text-xs font-medium text-slate-500 mb-2">활용 방법</p>
                          <ul className="text-sm text-slate-600 space-y-1">
                            {item.keyword.healingTips.map((tip, i) => (
                              <li key={i} className="flex items-start">
                                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  {i + 1}
                                </span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <Separator className="my-8" />

          {/* 유형별 추천 콘텐츠 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <BookOpen className="w-6 h-6 mr-2 text-indigo-500" />
              {fitnessType.nameKo}를 위한 추천 콘텐츠
              <Badge className="ml-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white">
                Premium
              </Badge>
            </h2>
            <div className="space-y-6">
              {/* 추천 도서 */}
              <Card className="border-indigo-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-indigo-500" />
                    추천 도서
                  </h3>
                  <div className="space-y-3">
                    {recommendedContents.books.map((book, index) => (
                      <div key={index} className="bg-indigo-50 p-3 rounded-lg">
                        <p className="font-medium text-slate-900">📚 {book.title}</p>
                        <p className="text-sm text-slate-500">저자: {book.author}</p>
                        <p className="text-sm text-indigo-600 mt-1">{book.reason}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 추천 유튜브 */}
              <Card className="border-red-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center">
                    <span className="mr-2">▶️</span>
                    추천 유튜브 채널
                  </h3>
                  <div className="space-y-3">
                    {recommendedContents.youtube.map((yt, index) => (
                      <div key={index} className="bg-red-50 p-3 rounded-lg">
                        <p className="font-medium text-slate-900">🎬 {yt.channel}</p>
                        <p className="text-sm text-red-600">{yt.reason}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 추천 팟캐스트 */}
              <Card className="border-purple-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center">
                    <span className="mr-2">🎧</span>
                    추천 팟캐스트
                  </h3>
                  <div className="space-y-3">
                    {recommendedContents.podcasts.map((pod, index) => (
                      <div key={index} className="bg-purple-50 p-3 rounded-lg">
                        <p className="font-medium text-slate-900">🎙️ {pod.name}</p>
                        <p className="text-sm text-purple-600">{pod.reason}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

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


          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={generatePdf}
              disabled={isPdfGenerating}
              className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
            >
              {isPdfGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  PDF 생성 중...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  PDF 다운로드
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleRestart}>
              <RotateCcw className="w-4 h-4 mr-2" />
              처음부터 다시하기
            </Button>
            <Link href="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                홈으로
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

      {/* Hidden PDF Pages for html2canvas */}
      <div
        ref={pdfContentRef}
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
        }}
      >
        {/* Page 1: Title with Full Card Content */}
        <div className="pdf-page" style={{ width: "595px", minHeight: "842px", backgroundColor: "#fff", fontFamily: "system-ui, -apple-system, sans-serif", padding: "0" }}>
          {/* Header */}
          <div style={{ backgroundColor: "#8B5CF6", padding: "20px 30px", textAlign: "center" }}>
            <h1 style={{ color: "#fff", fontSize: "22px", margin: "0 0 4px 0" }}>핏마인드랩</h1>
            <p style={{ color: "#fff", fontSize: "11px", margin: 0, opacity: 0.9 }}>피트니스 리더 강점검사 프리미엄 리포트</p>
          </div>

          {/* Character Image */}
          <div style={{ textAlign: "center", padding: "15px 0 10px 0", backgroundColor: "#F8FAFC" }}>
            <img
              src={TYPE_IMAGES[fitnessType.code]}
              alt={fitnessType.nameKo}
              style={{ width: "160px", height: "160px", objectFit: "contain" }}
            />
          </div>

          {/* Type Name & Role */}
          <div style={{ textAlign: "center", padding: "15px 30px 10px 30px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#1E293B", margin: "0 0 6px 0" }}>{fitnessType.nameKo}</h2>
            <p style={{ fontSize: "13px", color: "#64748B", margin: "0 0 8px 0" }}>{ROLE_LABELS[role]}</p>
            <p style={{ fontSize: "14px", color: "#8B5CF6", fontStyle: "italic", margin: "0" }}>"{fitnessType.slogan}"</p>
          </div>

          {/* Main Message */}
          <div style={{ padding: "10px 30px", textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "#475569", lineHeight: "1.6", margin: 0 }}>{fitnessType.mainMessage}</p>
          </div>

          {/* TOP 5 Strengths */}
          <div style={{ padding: "12px 30px", backgroundColor: "#F8FAFC", margin: "10px 20px", borderRadius: "8px" }}>
            <p style={{ fontSize: "11px", color: "#64748B", margin: "0 0 8px 0", fontWeight: "bold", textAlign: "center" }}>TOP 5 강점</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px" }}>
              {topStrengths.slice(0, 5).map((item, index) => (
                <span key={item.keywordId} style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: DOMAIN_INFO[item.keyword.domain].color,
                  backgroundColor: "#fff",
                  padding: "6px 12px",
                  borderRadius: "12px",
                  border: `1px solid ${DOMAIN_INFO[item.keyword.domain].color}`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                  height: "28px",
                }}>
                  {index + 1}. {item.keyword.nameKo}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Business */}
          <div style={{ padding: "10px 30px" }}>
            <p style={{ fontSize: "11px", color: "#64748B", margin: "0 0 6px 0", fontWeight: "bold" }}>추천 비즈니스 모델</p>
            <ul style={{ margin: 0, paddingLeft: "16px" }}>
              {fitnessType.recommendedBusiness.map((item, index) => (
                <li key={index} style={{ fontSize: "10px", color: "#475569", marginBottom: "3px" }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Hashtags */}
          <div style={{ padding: "8px 30px", textAlign: "center" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px" }}>
              {fitnessType.hashtags.map((tag, index) => (
                <span key={index} style={{
                  fontSize: "10px",
                  color: "#8B5CF6",
                  backgroundColor: "#F3E8FF",
                  padding: "5px 10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                  height: "22px",
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Strength Distribution */}
          <div style={{ padding: "10px 30px", backgroundColor: "#F8FAFC", margin: "8px 20px", borderRadius: "8px" }}>
            <p style={{ fontSize: "10px", color: "#64748B", margin: "0 0 8px 0", fontWeight: "bold", textAlign: "center" }}>강점 유형 분포</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              {domainScores.map((ds) => {
                const info = DOMAIN_INFO[ds.domain];
                return (
                  <div key={ds.domain} style={{ textAlign: "center" }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: info.color,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "bold",
                      margin: "0 auto 4px auto",
                    }}>
                      {ds.percentage}%
                    </div>
                    <p style={{ fontSize: "9px", color: "#64748B", margin: 0 }}>{info.nameKo}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer with Test Date */}
          <div style={{ padding: "12px 30px", textAlign: "center", borderTop: "1px solid #E2E8F0", marginTop: "auto" }}>
            <p style={{ fontSize: "9px", color: "#94A3B8", margin: "0 0 4px 0" }}>검사일: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p style={{ fontSize: "10px", color: "#94A3B8", margin: 0 }}>fitmindlab.kr</p>
          </div>
        </div>

        {/* Page 2: TOP 5 Strengths */}
        <div className="pdf-page" style={{ width: "595px", minHeight: "842px", backgroundColor: "#fff", fontFamily: "system-ui, -apple-system, sans-serif" }}>
          <div style={{ backgroundColor: "#8B5CF6", padding: "12px 20px", textAlign: "center" }}>
            <h2 style={{ color: "#fff", fontSize: "16px", margin: 0 }}>TOP 5 강점</h2>
          </div>
          <div style={{ padding: "20px" }}>
            {topStrengths.slice(0, 5).map((item, index) => (
              <div key={item.keywordId} style={{ marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #E2E8F0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontWeight: "bold", fontSize: "14px", color: "#1E293B" }}>{index + 1}. {item.keyword.nameKo}</span>
                  <span style={{ color: "#64748B", fontSize: "12px" }}>({item.keyword.nameEn})</span>
                </div>
                <p style={{ fontSize: "11px", color: "#64748B", margin: "2px 0" }}>도메인: {DOMAIN_INFO[item.keyword.domain].nameKo} | 점수: {item.score.toFixed(1)}</p>
                <p style={{ fontSize: "12px", color: "#1E293B", margin: "4px 0" }}>{item.keyword.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Page 3: Full 36 Rankings */}
        <div className="pdf-page" style={{ width: "595px", minHeight: "842px", backgroundColor: "#fff", fontFamily: "system-ui, -apple-system, sans-serif" }}>
          <div style={{ backgroundColor: "#3B82F6", padding: "12px 20px", textAlign: "center" }}>
            <h2 style={{ color: "#fff", fontSize: "16px", margin: 0 }}>전체 36개 강점 순위</h2>
          </div>
          <div style={{ padding: "15px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
              {result.allScores.map((item, index) => (
                <div key={item.keywordId} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "3px 0", fontSize: "10px" }}>
                  <span style={{ width: "20px", fontWeight: "bold", color: "#1E293B" }}>{index + 1}.</span>
                  <span style={{ flex: 1, color: "#1E293B" }}>{item.keyword.nameKo}</span>
                  <span style={{ color: "#64748B", width: "50px" }}>{DOMAIN_INFO[item.keyword.domain].nameKo}</span>
                  <span style={{ color: "#64748B", width: "30px", textAlign: "right" }}>{item.score.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page 4: Weakness Analysis */}
        <div className="pdf-page" style={{ width: "595px", minHeight: "842px", backgroundColor: "#fff", fontFamily: "system-ui, -apple-system, sans-serif" }}>
          <div style={{ backgroundColor: "#EF4444", padding: "12px 20px", textAlign: "center" }}>
            <h2 style={{ color: "#fff", fontSize: "16px", margin: 0 }}>약점 분석 & 비즈니스 리스크</h2>
          </div>
          <div style={{ padding: "15px 20px" }}>
            {result.allScores.slice(-5).reverse().map((item, index) => (
              <div key={item.keywordId} style={{ marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #E2E8F0" }}>
                <div style={{ fontWeight: "bold", fontSize: "12px", color: "#1E293B", marginBottom: "4px" }}>
                  {index + 1}. {item.keyword.nameKo} (점수: {item.score.toFixed(1)})
                </div>
                <p style={{ fontSize: "10px", color: "#DC2626", margin: "4px 0", lineHeight: "1.4" }}>리스크: {item.keyword.weaknessRisk}</p>
                <div style={{ marginTop: "6px" }}>
                  <p style={{ fontSize: "10px", color: "#10B981", marginBottom: "3px" }}>보완 솔루션:</p>
                  {item.keyword.weaknessSolutions?.map((sol, i) => (
                    <p key={i} style={{ fontSize: "9px", color: "#475569", margin: "2px 0 2px 10px", lineHeight: "1.3" }}>{i + 1}. {sol}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Page 5: Healing Keywords */}
        <div className="pdf-page" style={{ width: "595px", minHeight: "842px", backgroundColor: "#fff", fontFamily: "system-ui, -apple-system, sans-serif" }}>
          <div style={{ backgroundColor: "#10B981", padding: "12px 20px", textAlign: "center" }}>
            <h2 style={{ color: "#fff", fontSize: "16px", margin: 0 }}>힐링 키워드 (11-15위)</h2>
          </div>
          <div style={{ padding: "15px 20px" }}>
            <p style={{ fontSize: "11px", color: "#64748B", marginBottom: "15px" }}>지치고 힘들 때 회복에 도움이 되는 활동입니다.</p>
            {result.allScores.slice(10, 15).map((item, index) => (
              <div key={item.keywordId} style={{ marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #E2E8F0" }}>
                <div style={{ fontWeight: "bold", fontSize: "12px", color: "#1E293B", marginBottom: "4px" }}>
                  {index + 11}. {item.keyword.nameKo} ({DOMAIN_INFO[item.keyword.domain].nameKo})
                </div>
                <p style={{ fontSize: "11px", color: "#10B981", margin: "4px 0" }}>→ {item.keyword.healingKeyword}</p>
                {item.keyword.healingTips && item.keyword.healingTips.length > 0 && (
                  <div style={{ marginTop: "6px" }}>
                    <p style={{ fontSize: "10px", color: "#64748B", marginBottom: "3px" }}>활용 방법:</p>
                    {item.keyword.healingTips.map((tip, i) => (
                      <p key={i} style={{ fontSize: "9px", color: "#475569", margin: "2px 0 2px 10px", lineHeight: "1.3" }}>{i + 1}. {tip}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ marginTop: "30px", textAlign: "center", color: "#94A3B8", fontSize: "10px" }}>
              <p>핏마인드랩 - 피트니스 리더 강점검사</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
