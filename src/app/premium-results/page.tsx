"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import html2canvas from "html2canvas";
import Image from "next/image";
import {
  Loader2,
  Share2,
  Download,
  RotateCcw,
  Home,
  Trophy,
  BarChart3,
  Sparkles,
  Crown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Heart,
  Zap,
  Users,
  Target,
  Compass,
  DollarSign,
  MapPin,
  Shield,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ShareCard from "@/components/ShareCard";
import { calculateFullResults, GRADE_INFO } from "@/lib/scoring";
import { Role, ROLE_LABELS, Response as AssessmentResponse, FullAssessmentResult, DOMAIN_INFO } from "@/types";
import { LEADERSHIP_TYPES } from "@/data/leadership-types";
import { ROLE_MAP } from "@/data/roles";
import {
  BURNOUT_TRIGGERS,
  ENERGY_PATTERNS,
  WORK_TYPES,
  BOSS_COMPATIBILITY,
  SUBORDINATE_COMPATIBILITY,
  LEADERSHIP_STYLES,
  INCOME_TYPES,
  CAREER_ROADMAP,
  ROLE_SUB_TYPE_DETAILS,
  ROLE_SPECIFIC_CATEGORIES,
} from "@/data/result-content";

export default function PremiumResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<FullAssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isPaid = sessionStorage.getItem("premiumPaid");
    if (!isPaid) {
      router.push("/premium");
      return;
    }

    const responsesData = sessionStorage.getItem("assessmentResponses") || sessionStorage.getItem("premiumResponses");
    const roleData = sessionStorage.getItem("assessmentRole") || sessionStorage.getItem("premiumRole");

    if (!responsesData || !roleData) {
      router.push("/select-role");
      return;
    }

    const responses: AssessmentResponse[] = JSON.parse(responsesData);
    const role = roleData as Role;
    const calculatedResult = calculateFullResults(role, responses);
    setResult(calculatedResult);
    setLoading(false);
  }, [router]);

  const generateAndDownloadImage = async () => {
    if (!shareCardRef.current || !result) return;
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2, backgroundColor: "#ffffff", useCORS: true, logging: false,
        onclone: (clonedDoc) => {
          clonedDoc.querySelectorAll('style, link[rel="stylesheet"]').forEach(s => s.remove());
          clonedDoc.documentElement.style.cssText = `--background: #ffffff; --foreground: #0a0a0a;`;
        },
      });
      const link = document.createElement("a");
      link.download = `핏마인드랩-프리미엄결과.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Image generation failed:", error);
    }
    setIsGenerating(false);
  };

  const handleRestart = () => {
    sessionStorage.removeItem("assessmentResponses");
    sessionStorage.removeItem("assessmentRole");
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

  const { leadership, top5, domainScores, role, allThemeScores, gradeDistribution, blindSpots } = result;
  const leadershipType = LEADERSHIP_TYPES[leadership.primaryType];
  const roleInfo = ROLE_MAP[role];
  const combo = leadership.combo;

  const burnout = BURNOUT_TRIGGERS[role];
  const energy = ENERGY_PATTERNS[role];
  const work = WORK_TYPES[role];
  const boss = BOSS_COMPATIBILITY[role];
  const subordinate = SUBORDINATE_COMPATIBILITY[role];
  const topDomain = domainScores[0]?.domain || 'thinking';
  const leaderStyle = LEADERSHIP_STYLES[role]?.[topDomain];
  const income = INCOME_TYPES[role];
  const career = CAREER_ROADMAP[role];
  const subTypeDetail = ROLE_SUB_TYPE_DETAILS[role]?.[leadership.roleSubType];
  const specificCategories = ROLE_SPECIFIC_CATEGORIES[role];

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

          {/* ====== 1. Leadership Type Hero ====== */}
          <Card className="mb-8 overflow-hidden shadow-2xl border-2 border-violet-200">
            <div className={`bg-gradient-to-r ${leadershipType.gradient} relative overflow-hidden`}>
              <div className="relative z-10 p-8 text-center text-white">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Badge className="bg-white/20 text-white border-white/30">{roleInfo?.emoji} {roleInfo?.nameKo}</Badge>
                  <Badge className="bg-white/20 text-white border-white/30">{leadershipType.nameKo} 리더</Badge>
                </div>
                {combo.image ? (
                  <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-4">
                    <Image src={combo.image} alt={combo.comboTitle} fill className="object-contain drop-shadow-2xl" priority />
                  </div>
                ) : (
                  <div className="text-7xl mb-4">{leadershipType.emoji}</div>
                )}
                <h1 className="text-3xl md:text-5xl font-black mb-3 drop-shadow-lg">{combo.comboTitle}</h1>
                <p className="text-lg opacity-90">{combo.tagline}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            <CardContent className="p-8">
              <blockquote className="text-lg text-slate-700 text-center italic mb-6 leading-relaxed">
                &ldquo;{combo.mainMessage}&rdquo;
              </blockquote>
              <div className="bg-slate-50 rounded-xl p-4 text-center mb-4">
                <p className="text-xl font-bold text-slate-900">&ldquo;{combo.slogan}&rdquo;</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {combo.hashtags.map((tag, i) => <Badge key={i} variant="secondary">#{tag}</Badge>)}
              </div>
            </CardContent>
          </Card>

          {/* Share Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button onClick={generateAndDownloadImage} disabled={isGenerating} variant="outline">
              {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />생성 중...</> : <><Download className="w-4 h-4 mr-2" />이미지 저장</>}
            </Button>
          </div>

          <Separator className="my-8" />

          {/* ====== 2. TOP 5 + Grade ====== */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <Trophy className="w-6 h-6 mr-2 text-amber-500" />TOP 5 핵심 강점
            </h2>
            <div className="space-y-4">
              {top5.map((item, index) => {
                const domainInfo = DOMAIN_INFO[item.domain];
                const gradeInfo = GRADE_INFO[item.grade];
                return (
                  <Card key={item.themeId} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-stretch">
                        <div className={`w-16 flex flex-col items-center justify-center text-white font-bold ${domainInfo.bgColor}`}>
                          <span className="text-xs">{index + 1}위</span>
                          <span className="text-xl font-black">{item.grade}</span>
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg">{item.nameKo}</h3>
                            <Badge variant="outline" style={{ borderColor: domainInfo.color, color: domainInfo.color }}>{domainInfo.nameKo}</Badge>
                            <span className="ml-auto text-sm font-medium" style={{ color: gradeInfo.color }}>{item.standardizedScore}점</span>
                          </div>
                          <p className="text-sm text-slate-500">{gradeInfo.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <Separator className="my-8" />

          {/* ====== 3. Burnout Triggers ====== */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />번아웃 트리거
            </h2>
            <Card className="border-red-200">
              <CardContent className="p-6">
                <ul className="space-y-3 mb-4">
                  {burnout.triggers.map((t, i) => (
                    <li key={i} className="flex items-start text-slate-700"><Zap className="w-4 h-4 mr-2 text-red-400 mt-1 flex-shrink-0" />{t}</li>
                  ))}
                </ul>
                <div className="bg-red-50 p-4 rounded-lg mb-3">
                  <p className="text-sm font-medium text-red-700 mb-1">경고 신호</p>
                  <p className="text-sm text-red-600">{burnout.warningSign}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-emerald-700 mb-1">회복 팁</p>
                  <p className="text-sm text-emerald-600">{burnout.recoveryTip}</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-8" />

          {/* ====== 4. Energy Patterns ====== */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <Heart className="w-6 h-6 mr-2 text-pink-500" />에너지 충전·방전
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-emerald-200">
                <CardContent className="p-5">
                  <h3 className="font-bold text-emerald-700 mb-3 flex items-center"><TrendingUp className="w-4 h-4 mr-2" />충전되는 순간</h3>
                  <ul className="space-y-2">
                    {energy.chargeActivities.map((a, i) => <li key={i} className="text-sm text-slate-600 flex items-start"><span className="text-emerald-500 mr-2">+</span>{a}</li>)}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-red-200">
                <CardContent className="p-5">
                  <h3 className="font-bold text-red-700 mb-3 flex items-center"><TrendingDown className="w-4 h-4 mr-2" />방전되는 순간</h3>
                  <ul className="space-y-2">
                    {energy.drainActivities.map((a, i) => <li key={i} className="text-sm text-slate-600 flex items-start"><span className="text-red-500 mr-2">-</span>{a}</li>)}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4 bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-blue-700"><Lightbulb className="w-4 h-4 inline mr-1" />최적 환경: {energy.optimalEnvironment}</p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* ====== 5. Work Types ====== */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <Target className="w-6 h-6 mr-2 text-violet-500" />맞는 업무 유형
            </h2>
            <div className="space-y-3 mb-4">
              {work.bestFit.map((w, i) => (
                <Card key={i} className="border-violet-200">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-slate-900 mb-1">{w.type}</h3>
                    <p className="text-sm text-slate-600">{w.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-amber-700 mb-1">피해야 할 유형: {work.avoidType.type}</p>
              <p className="text-sm text-amber-600">{work.avoidType.reason}</p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* ====== 6. Boss Compatibility ====== */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <Users className="w-6 h-6 mr-2 text-blue-500" />윗사람과의 궁합
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-emerald-200">
                <CardContent className="p-5">
                  <h3 className="font-bold text-emerald-700 mb-2">Best: {boss.bestMatch.type}</h3>
                  <p className="text-sm text-slate-600 mb-2">{boss.bestMatch.description}</p>
                  <div className="bg-emerald-50 p-3 rounded-lg"><p className="text-sm text-emerald-700"><Lightbulb className="w-3 h-3 inline mr-1" />{boss.bestMatch.tip}</p></div>
                </CardContent>
              </Card>
              <Card className="border-red-200">
                <CardContent className="p-5">
                  <h3 className="font-bold text-red-700 mb-2">주의: {boss.worstMatch.type}</h3>
                  <p className="text-sm text-slate-600 mb-2">{boss.worstMatch.description}</p>
                  <div className="bg-red-50 p-3 rounded-lg"><p className="text-sm text-red-700"><Lightbulb className="w-3 h-3 inline mr-1" />{boss.worstMatch.tip}</p></div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          {/* ====== 7. Subordinate Compatibility ====== */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <Users className="w-6 h-6 mr-2 text-purple-500" />아랫사람·회원과의 궁합
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-emerald-200">
                <CardContent className="p-5">
                  <h3 className="font-bold text-emerald-700 mb-2">Best: {subordinate.bestMatch.type}</h3>
                  <p className="text-sm text-slate-600 mb-2">{subordinate.bestMatch.description}</p>
                  <div className="bg-emerald-50 p-3 rounded-lg"><p className="text-sm text-emerald-700"><Lightbulb className="w-3 h-3 inline mr-1" />{subordinate.bestMatch.tip}</p></div>
                </CardContent>
              </Card>
              <Card className="border-amber-200">
                <CardContent className="p-5">
                  <h3 className="font-bold text-amber-700 mb-2">도전: {subordinate.challengeMatch.type}</h3>
                  <p className="text-sm text-slate-600 mb-2">{subordinate.challengeMatch.description}</p>
                  <div className="bg-amber-50 p-3 rounded-lg"><p className="text-sm text-amber-700"><Lightbulb className="w-3 h-3 inline mr-1" />{subordinate.challengeMatch.tip}</p></div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          {/* ====== 8. Leadership Style ====== */}
          {leaderStyle && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
                <Compass className="w-6 h-6 mr-2 text-indigo-500" />리더십 스타일
              </h2>
              <Card className="border-indigo-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-indigo-700 mb-2">{leaderStyle.styleName}</h3>
                  <p className="text-slate-600 mb-4">{leaderStyle.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-emerald-700 mb-1">강점</p>
                      <p className="text-sm text-emerald-600">{leaderStyle.strengthPoint}</p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-amber-700 mb-1">주의점</p>
                      <p className="text-sm text-amber-600">{leaderStyle.cautionPoint}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          <Separator className="my-8" />

          {/* ====== 9. Income Type ====== */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <DollarSign className="w-6 h-6 mr-2 text-green-500" />수입 잠재력 유형
            </h2>
            <Card className="border-green-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-green-700 mb-2">{income.typeName}</h3>
                <p className="text-slate-600 mb-4">{income.description}</p>
                <div className="space-y-2 mb-4">
                  {income.growthStrategy.map((s, i) => (
                    <div key={i} className="flex items-start bg-green-50 p-3 rounded-lg">
                      <span className="w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center mr-2 flex-shrink-0">{i + 1}</span>
                      <span className="text-sm text-green-700">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="text-sm text-amber-700"><Shield className="w-3 h-3 inline mr-1" />{income.cautionPoint}</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-8" />

          {/* ====== 10. Career Roadmap ====== */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <MapPin className="w-6 h-6 mr-2 text-orange-500" />커리어 성장 로드맵
            </h2>
            <Card className="border-orange-200">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Badge className="bg-orange-100 text-orange-700 mb-2">현재: {career.currentStage}</Badge>
                  <p className="text-sm text-slate-500">목표: {career.ultimateGoal}</p>
                </div>
                <div className="space-y-4">
                  {career.nextSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 bg-orange-50 p-4 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">{i + 1}</div>
                      <div>
                        <h4 className="font-bold text-slate-900">{step.step}</h4>
                        <p className="text-sm text-slate-600">{step.description}</p>
                        <p className="text-xs text-orange-600 mt-1">{step.timeframe}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-8" />

          {/* ====== 11. Role Sub-Type Detail ====== */}
          {subTypeDetail && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
                <Sparkles className="w-6 h-6 mr-2 text-violet-500" />하위유형: {subTypeDetail.typeName}
              </h2>
              <Card className="border-violet-200">
                <CardContent className="p-6">
                  <p className="text-slate-600 mb-4">{subTypeDetail.description}</p>
                  <div className="bg-violet-50 p-4 rounded-lg mb-3 text-center">
                    <p className="text-violet-700 font-medium italic">&ldquo;{subTypeDetail.shareQuote}&rdquo;</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-emerald-700 mb-1">강점</p>
                      <p className="text-sm text-emerald-600">{subTypeDetail.strength}</p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-amber-700 mb-1">주의점</p>
                      <p className="text-sm text-amber-600">{subTypeDetail.caution}</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-700 mb-1">액션 팁</p>
                    <p className="text-sm text-blue-600">{subTypeDetail.actionTip}</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          <Separator className="my-8" />

          {/* ====== 12. All Theme Scores ====== */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-500" />전체 테마 순위
            </h2>
            <Card>
              <CardContent className="p-6">
                {/* Grade Distribution */}
                <div className="flex justify-center gap-4 mb-4">
                  {(['S', 'A', 'B', 'C', 'D', 'E'] as const).map((g) => (
                    <div key={g} className="text-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-1" style={{ backgroundColor: GRADE_INFO[g].color }}>
                        {gradeDistribution[g]}
                      </div>
                      <span className="text-xs text-slate-500">{g}</span>
                    </div>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b"><th className="text-left py-2 px-2">순위</th><th className="text-left py-2 px-2">테마</th><th className="text-left py-2 px-2">도메인</th><th className="text-center py-2 px-2">등급</th><th className="text-right py-2 px-2">점수</th></tr>
                    </thead>
                    <tbody>
                      {allThemeScores.map((item, index) => {
                        const domainInfo = DOMAIN_INFO[item.domain];
                        const isTop5 = index < 5;
                        const isBottom5 = index >= allThemeScores.length - 5;
                        return (
                          <tr key={item.themeId} className={`border-b ${isTop5 ? "bg-emerald-50" : isBottom5 ? "bg-red-50" : ""}`}>
                            <td className="py-2 px-2 font-medium">
                              {index + 1}
                              {isTop5 && <TrendingUp className="w-3 h-3 inline ml-1 text-emerald-600" />}
                              {isBottom5 && <TrendingDown className="w-3 h-3 inline ml-1 text-red-500" />}
                            </td>
                            <td className="py-2 px-2">{item.nameKo}</td>
                            <td className="py-2 px-2">
                              <Badge variant="outline" style={{ borderColor: domainInfo.color, color: domainInfo.color }} className="text-xs">{domainInfo.nameKo}</Badge>
                            </td>
                            <td className="py-2 px-2 text-center">
                              <span className="font-bold" style={{ color: GRADE_INFO[item.grade].color }}>{item.grade}</span>
                            </td>
                            <td className="py-2 px-2 text-right">{item.standardizedScore}</td>
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

          {/* ====== 13. Blind Spots ====== */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />약점 맹점 TOP 5
            </h2>
            <div className="space-y-3">
              {blindSpots.map((item, index) => {
                const domainInfo = DOMAIN_INFO[item.domain];
                return (
                  <Card key={item.themeId} className="border-red-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-red-500 text-white text-sm flex items-center justify-center flex-shrink-0">{allThemeScores.length - index}</span>
                        <h3 className="font-bold text-slate-900">{item.nameKo}</h3>
                        <Badge variant="outline" style={{ borderColor: domainInfo.color, color: domainInfo.color }} className="text-xs">{domainInfo.nameKo}</Badge>
                        <span className="ml-auto font-bold" style={{ color: GRADE_INFO[item.grade].color }}>{item.grade} ({item.standardizedScore}점)</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <Separator className="my-8" />

          {/* Domain Scores */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-500" />도메인 분포
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {domainScores.map((ds) => {
                    const info = DOMAIN_INFO[ds.domain];
                    return (
                      <div key={ds.domain} className="text-center">
                        <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold" style={{ backgroundColor: info.color }}>
                          {ds.percentage}%
                        </div>
                        <p className="font-medium text-slate-900">{info.nameKo}</p>
                        <p className="text-sm text-slate-500">{ds.averageScore}점</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={handleRestart}>
              <RotateCcw className="w-4 h-4 mr-2" />처음부터 다시하기
            </Button>
            <Link href="/">
              <Button variant="outline"><Home className="w-4 h-4 mr-2" />홈으로</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hidden Share Card */}
      <div style={{ position: "fixed", left: "-9999px", top: 0, backgroundColor: "#ffffff", isolation: "isolate" }}>
        <ShareCard ref={shareCardRef} combo={combo} role={role} top5={top5} leadershipTypeId={leadership.primaryType} />
      </div>
    </main>
  );
}
