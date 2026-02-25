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
  Shield,
  AlertTriangle,
  Zap,
  Battery,
  Briefcase,
  Users,
  Crown,
  DollarSign,
  Map,
  Star,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  UserCheck,
  UserPlus,
  Award,
  Target,
  MessageCircle,
  HeartPulse,
  Lightbulb,
  HelpCircle,
  FileDown,
  Flame,
  Megaphone,
  Calculator,
  Skull,
  Rocket as RocketIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ShareCard from "@/components/ShareCard";
import { calculateFullResults } from "@/lib/scoring";
import { GRADE_INFO } from "@/lib/scoring";
import { Role, ROLE_LABELS, Response as AssessmentResponse, FullAssessmentResult, DOMAIN_INFO } from "@/types";
import { LEADERSHIP_TYPES } from "@/data/leadership-types";
import { THEMES } from "@/data/themes";
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
  CEO_HIRING_STRATEGY,
  CEO_PROMOTION_STRATEGY,
  INDEPENDENCE_READINESS,
  ROLE_MODELS,
  MONTHLY_MISSIONS,
  MARKETING_STRATEGY,
  INCOME_GROWTH_FORMULA,
  WORST_COMPATIBILITY,
  TEAM_DESTRUCTION,
} from "@/data/result-content";

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<FullAssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const responsesData = sessionStorage.getItem("assessmentResponses");
    const roleData = sessionStorage.getItem("assessmentRole");

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
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          styles.forEach((style) => style.remove());
          clonedDoc.documentElement.style.cssText = `--background: #ffffff; --foreground: #0a0a0a;`;
        },
      });

      const link = document.createElement("a");
      link.download = `핏마인드랩-${result.leadership.combo.comboTitle}-결과.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Image generation failed:", error);
    }
    setIsGenerating(false);
  };

  const generateAndShareImage = async () => {
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
          clonedDoc.documentElement.style.cssText = `--background: #ffffff; --foreground: #0a0a0a;`;
        },
      });

      canvas.toBlob(async (blob) => {
        if (!blob) { setIsGenerating(false); return; }

        const file = new File([blob], `핏마인드랩-결과.png`, { type: "image/png" });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: "피트니스 리더십 검사 결과",
              text: `나는 [${result.leadership.combo.comboTitle}] 유형의 [${ROLE_LABELS[result.role]}]입니다!\n\n"${result.leadership.combo.slogan}"\n\n나도 검사하기 → fitmindlab.vercel.app`,
              files: [file],
            });
          } catch {
            // Share cancelled
          }
        } else {
          const link = document.createElement("a");
          link.download = `핏마인드랩-결과.png`;
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

  const handlePdfDownload = () => {
    window.print();
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

  const { leadership, top5, domainScores, role, blindSpots, allThemeScores } = result;
  const leadershipType = LEADERSHIP_TYPES[leadership.primaryType];
  const roleInfo = ROLE_MAP[role];
  const combo = leadership.combo;

  // Premium data
  const burnout = BURNOUT_TRIGGERS[role];
  const energy = ENERGY_PATTERNS[role];
  const workType = WORK_TYPES[role];
  const boss = BOSS_COMPATIBILITY[role];
  const subordinate = SUBORDINATE_COMPATIBILITY[role];
  const leadershipStyle = LEADERSHIP_STYLES[role][domainScores.sort((a, b) => b.percentage - a.percentage)[0].domain];
  const income = INCOME_TYPES[role];
  const career = CAREER_ROADMAP[role];
  const subTypeDetail = ROLE_SUB_TYPE_DETAILS[role]?.[leadership.roleSubType];
  const roleCategories = ROLE_SPECIFIC_CATEGORIES[role];
  const ceoHiring = role === 'ceo' ? CEO_HIRING_STRATEGY[leadership.primaryType] : null;
  const ceoPromotion = role === 'ceo' ? CEO_PROMOTION_STRATEGY[leadership.primaryType] : null;
  const independence = role !== 'ceo' ? INDEPENDENCE_READINESS[role] : null;

  // New sections data
  const roleModels = ROLE_MODELS[role][leadership.primaryType];
  const missions = MONTHLY_MISSIONS[role][leadership.primaryType];
  const marketing = MARKETING_STRATEGY[role][leadership.primaryType];
  const incomeFormula = INCOME_GROWTH_FORMULA[role][leadership.primaryType];
  const worstCompat = WORST_COMPATIBILITY[role][leadership.primaryType];
  const teamDestruction = TEAM_DESTRUCTION[role][leadership.primaryType];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">

          {/* ====== 1. Leadership Type Hero Card ====== */}
          <Card className="mb-8 overflow-hidden shadow-2xl border-0">
            {/* White Top Section: Badges + Image */}
            <div className="bg-white p-8 pb-0 text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Badge className={`bg-gradient-to-r ${leadershipType.gradient} text-white border-0`}>
                  {roleInfo?.emoji} {roleInfo?.nameKo}
                </Badge>
                <Badge className={`bg-gradient-to-r ${leadershipType.gradient} text-white border-0`}>
                  {leadershipType.nameKo} 리더
                </Badge>
              </div>

              {/* Character Image */}
              {combo.image && (
                <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-0">
                  <Image
                    src={combo.image}
                    alt={combo.comboTitle}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
              {!combo.image && (
                <div className="text-7xl mb-0">{leadershipType.emoji}</div>
              )}
            </div>

            {/* Gradient Bottom: Combo Title + Tagline */}
            <div
              className={`bg-gradient-to-r ${leadershipType.gradient} relative overflow-hidden`}
            >
              <div className="relative z-10 px-8 py-8 text-center text-white">
                <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight drop-shadow-lg">
                  {combo.comboTitle}
                </h1>
                <p className="text-lg md:text-xl opacity-90">
                  {combo.tagline}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            <CardContent className="p-8">
              {/* Slogan */}
              <div className="bg-slate-50 rounded-xl p-5 text-center mb-6">
                <p className="text-xl font-bold text-slate-900">
                  &ldquo;{combo.slogan.split('. ').map((sentence, i, arr) => (
                    <span key={i}>
                      {sentence}{i < arr.length - 1 ? '.' : ''}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}&rdquo;
                </p>
              </div>

              {/* Recommended Business */}
              <div className="mb-6">
                <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2">
                  <h3 className="font-semibold text-slate-900 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-slate-400" /> 추천 비즈니스 모델
                  </h3>
                  {combo.recommendedBusiness.map((item, index) => (
                    <span key={index} className="flex items-center text-slate-700 font-medium">
                      <span className="w-2 h-2 bg-slate-400 rounded-full mr-2" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-2 justify-center">
                {combo.hashtags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ====== Share Buttons ====== */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 no-print">
            <Button
              onClick={generateAndShareImage}
              disabled={isGenerating}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              {isGenerating ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />이미지 생성 중...</>
              ) : (
                <><Share2 className="w-4 h-4 mr-2" />카드 이미지 공유하기</>
              )}
            </Button>
            <Button
              onClick={generateAndDownloadImage}
              disabled={isGenerating}
              variant="outline"
            >
              {isGenerating ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />생성 중...</>
              ) : (
                <><Download className="w-4 h-4 mr-2" />이미지 저장하기</>
              )}
            </Button>
          </div>

          <Separator className="my-10" />

          {/* ====== 2. TOP 5 Strengths + Domain Distribution (Side by Side) ====== */}
          <section className="mb-12">
            {/* Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <h2 className="text-xl font-bold text-slate-900 text-center flex items-center justify-center">
                <Trophy className="w-5 h-5 mr-2 text-slate-400" />
                나의 TOP 5 강점
              </h2>
              <h2 className="text-xl font-bold text-slate-900 text-center flex items-center justify-center">
                <BarChart3 className="w-5 h-5 mr-2 text-slate-400" />
                도메인 분포
              </h2>
            </div>
            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT: TOP 5 */}
              <div className="space-y-2">
                {top5.map((item, index) => {
                  const domainInfo = DOMAIN_INFO[item.domain];
                  const gradeInfo = GRADE_INFO[item.grade];
                  const rankLabels = ["1st", "2nd", "3rd", "4th", "5th"];
                  return (
                    <Card key={item.themeId} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-stretch">
                          <div
                            className={`w-11 flex flex-col items-center justify-center text-white font-bold ${domainInfo.bgColor}`}
                          >
                            <span className="text-xs">{rankLabels[index]}</span>
                            <span className="text-lg font-black">{item.grade}</span>
                          </div>
                          <div className="flex-1 px-3 py-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-slate-900">
                                {item.nameKo}
                              </h3>
                              <Badge
                                variant="outline"
                                className="text-xs"
                                style={{ borderColor: domainInfo.color, color: domainInfo.color }}
                              >
                                {domainInfo.nameKo}
                              </Badge>
                              <span className="ml-auto text-sm font-medium" style={{ color: gradeInfo.color }}>
                                {item.standardizedScore}점
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">{THEMES.find(t => t.id === item.themeId)?.description || gradeInfo.label}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* RIGHT: Domain Distribution */}
              <Card className="h-full" style={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent className="p-5" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Domain Interpretation */}
                  {(() => {
                    const sorted = [...domainScores].sort((a, b) => b.percentage - a.percentage);
                    const top = DOMAIN_INFO[sorted[0].domain];
                    const second = DOMAIN_INFO[sorted[1].domain];
                    const third = DOMAIN_INFO[sorted[2].domain];
                    const weak = DOMAIN_INFO[sorted[3].domain];
                    return (
                      <div className="text-sm text-slate-600 leading-relaxed mb-5">
                        <p className="mb-2">
                          <span className="font-bold" style={{ color: top.color }}>{top.nameKo}</span> 도메인이
                          가장 높아, {top.nameKo} 중심의 강점 구조를 가지고 있습니다.
                        </p>
                        <p className="mb-2">
                          <span className="font-bold" style={{ color: second.color }}>{second.nameKo}</span>이
                          이를 보완하며, 상위 두 도메인의 조합이 당신의 리더십 스타일을 형성합니다.
                        </p>
                        <p className="mb-2">
                          <span className="font-bold" style={{ color: third.color }}>{third.nameKo}</span> 영역은
                          필요한 상황에서 발휘할 수 있는 잠재 자원입니다.
                        </p>
                        <p>
                          <span className="font-bold" style={{ color: weak.color }}>{weak.nameKo}</span> 영역은
                          상대적으로 낮으므로, 의식적으로 개발하면 균형 잡힌 성장이 가능합니다.
                        </p>
                      </div>
                    );
                  })()}

                  {/* Bar Chart - pushed to bottom */}
                  <div className="mt-auto space-y-4">
                    {domainScores.map((ds) => {
                      const info = DOMAIN_INFO[ds.domain];
                      return (
                        <div key={ds.domain}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-semibold text-slate-700">{info.nameKo}</span>
                            <span className="text-sm font-bold" style={{ color: info.color }}>{ds.percentage}%</span>
                          </div>
                          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${ds.percentage}%`, backgroundColor: info.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-10" />

          {/* ====== 전체 강점 순위 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-green-500 tracking-widest uppercase mb-2">Full Ranking</span>
              <h2 className="text-2xl font-bold text-slate-900">전체 강점 순위</h2>
              <div className="w-12 h-1 bg-green-500 mt-3 rounded-full" />
              <p className="mt-4 text-sm text-slate-500 font-medium">총 {allThemeScores.length}개 테마 · 높은 점수순</p>
            </div>

            {(() => {
              const half = Math.ceil(allThemeScores.length / 2);
              const leftCol = allThemeScores.slice(0, half);
              const rightCol = allThemeScores.slice(half);
              const renderItem = (theme: typeof allThemeScores[number], i: number) => {
                const domainInfo = DOMAIN_INFO[theme.domain];
                const gradeInfo = GRADE_INFO[theme.grade];
                const isTop5 = i < 5;
                const isBottom5 = i >= allThemeScores.length - 5;
                return (
                  <div
                    key={theme.themeId}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${isTop5 ? 'bg-green-50 border-green-100' : isBottom5 ? 'bg-green-50/50 border-green-100' : 'bg-white border-green-100'}`}
                  >
                    <span className={`w-5 text-right font-black text-xs shrink-0 ${isTop5 ? 'text-slate-800' : isBottom5 ? 'text-slate-300' : 'text-slate-400'}`}>
                      {i + 1}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: domainInfo.color }} />
                    <span className="font-bold text-slate-800 text-xs flex-1 truncate">{theme.nameKo}</span>
                    <span className="text-[10px] font-bold text-slate-400 shrink-0">{theme.standardizedScore}점</span>
                    <span
                      className="text-[10px] font-black w-4 text-center shrink-0"
                      style={{ color: gradeInfo.color }}
                    >
                      {theme.grade}
                    </span>
                  </div>
                );
              };
              return (
                <div className="grid grid-cols-2 gap-x-3">
                  <div className="space-y-2">
                    {leftCol.map((theme, idx) => renderItem(theme, idx))}
                  </div>
                  <div className="space-y-2">
                    {rightCol.map((theme, idx) => renderItem(theme, idx + half))}
                  </div>
                </div>
              );
            })()}
          </section>

          <Separator className="my-10" />

          {/* ========================================================================
              ZONE 1: FREE (무료 공개 영역) - 바이럴 + 후킹 콘텐츠
              ======================================================================== */}

          {/* ====== 3. 나와 같은 유형의 유명인/롤모델 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-violet-500 tracking-widest uppercase mb-2">Role Models</span>
              <h2 className="text-2xl font-bold text-slate-900">나와 같은 유형의 유명인</h2>
              <div className="w-12 h-1 bg-violet-500 mt-3 rounded-full" />
              <p className="mt-4 text-sm text-slate-500 font-medium">당신과 같은 {leadershipType.nameKo} 리더십을 가진 인물들</p>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
              {roleModels.models.map((model, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden hover:border-slate-200 transition-all">
                  
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">{model.title}</span>
                      <h3 className="text-xl font-bold text-slate-900">{model.name}</h3>
                    </div>
                    <div className="bg-violet-50 rounded-xl p-4 border border-violet-100 mb-4">
                      <p className="text-slate-700 font-bold italic">&ldquo;{model.quote}&rdquo;</p>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{model.reason}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-violet-50 rounded-2xl p-6 border border-violet-200">
              <p className="text-xs font-bold text-violet-300 uppercase tracking-widest mb-4 text-center">Common Traits</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {roleModels.commonTraits.map((trait, i) => (
                  <span key={i} className="text-sm font-medium px-4 py-2 bg-white border border-slate-100 text-slate-700 rounded-full">{trait}</span>
                ))}
              </div>
            </div>
          </section>

          <Separator className="my-10" />

          {/* ====== 4. 내가 팀을 망치는 순간 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-red-500 tracking-widest uppercase mb-2">Warning</span>
              <h2 className="text-2xl font-bold text-slate-900">내가 팀을 망치는 순간</h2>
              <div className="w-12 h-1 bg-red-500 mt-3 rounded-full" />
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-8">
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{teamDestruction.destructionTitle}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{teamDestruction.scenario}</p>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-6 text-center">Overdone Strengths</h4>
                  <div className="space-y-4">
                    {teamDestruction.overdoneStrengths.map((item, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest block mb-1">Strength</span>
                            <p className="text-sm text-slate-900 font-bold">{item.strength}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest block mb-1">When Overdone</span>
                            <p className="text-sm text-slate-600">{item.whenOverdone}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest block mb-1">Damage</span>
                            <p className="text-sm text-slate-600">{item.damage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-5 border border-red-100 text-center">
                  <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest block mb-2">Warning Quote</span>
                  <p className="text-sm text-slate-700 font-bold leading-relaxed">{teamDestruction.warningQuote}</p>
                </div>

                <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest block mb-2">Prevention Tip</span>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">{teamDestruction.preventionTip}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ====== 5. CEO: 당장 채용해야 하는 인재 유형 (FREE) ====== */}
          {role === 'ceo' && ceoHiring && (
            <>
              <Separator className="my-10" />
              <section className="mb-12">
                <div className="flex flex-col items-center mb-8">
                  <span className="text-xs font-bold text-green-500 tracking-widest uppercase mb-2">Recruitment</span>
                  <h2 className="text-2xl font-bold text-slate-900">당장 채용해야 하는 인재 유형</h2>
                  <div className="w-12 h-1 bg-green-500 mt-3 rounded-full" />
                </div>

                <div className="grid grid-cols-1 gap-6 mb-6">
                  {ceoHiring.urgentHires.map((hire, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-[10px] font-black px-2.5 py-1 bg-slate-100 text-slate-500 rounded-md uppercase tracking-tighter">
                          {hire.role}
                        </span>
                        <h3 className="font-bold text-slate-900 text-xl">{hire.type}</h3>
                        {hire.comboType && (
                          <span className="text-[11px] font-bold text-slate-400 ml-auto border-b border-slate-200">{hire.comboType} 유형</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-6 leading-relaxed bg-green-50 p-4 rounded-xl border border-green-100 flex items-start gap-3">
                        <UserPlus className="w-5 h-5 shrink-0 text-green-500" />
                        {hire.reason}
                      </p>
                      <div className="space-y-3">
                        <span className="text-[10px] font-black text-green-300 uppercase tracking-widest">Key Qualities</span>
                        <div className="flex flex-wrap gap-2">
                          {hire.keyQualities.map((q, j) => (
                            <span key={j} className="text-[11px] font-bold px-3 py-1 bg-green-50 border border-green-200 text-slate-600 rounded-full">{q}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-dotted border-green-200 text-center">
                  <p className="text-sm text-slate-500 font-semibold">
                    <span className="text-slate-700 font-black">PRINCIPLE:</span> <span className="text-slate-800">{ceoHiring.hiringPrinciple}</span>
                  </p>
                </div>
              </section>
            </>
          )}

          <Separator className="my-10" />

          {/* ========================================================================
              ZONE 2: TEASER (제목 공개, 추후 블러 처리 예정)
              ======================================================================== */}

          {/* ====== 6. 나와 최악의 궁합 유형 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-red-500 tracking-widest uppercase mb-2">Worst Match</span>
              <h2 className="text-2xl font-bold text-slate-900">나와 최악의 궁합 유형</h2>
              <div className="w-12 h-1 bg-red-500 mt-3 rounded-full" />
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-8">
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">{worstCompat.worstType}</h3>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest block mb-3">Conflict Scenario</span>
                  <div className="bg-red-50/50 rounded-xl p-5 border border-red-200/50">
                    <p className="text-sm text-slate-700 leading-relaxed italic">{worstCompat.conflictScenario}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-black text-red-300 uppercase tracking-widest block mb-3">Root Cause</span>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{worstCompat.rootCause}</p>
                </div>

                <div className="border-t border-slate-100 pt-8">
                  <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-6">Survival Tips</h4>
                  <div className="space-y-3">
                    {worstCompat.survivalTips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-red-50 border border-red-100">
                        <Shield className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-slate-700 leading-relaxed font-medium">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                  <span className="text-[10px] font-black text-red-300 uppercase tracking-widest block mb-2">Real Life Example</span>
                  <p className="text-sm text-slate-600 leading-relaxed italic">{worstCompat.realLifeExample}</p>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-10" />

          {/* ====== 7. 연봉/매출 성장 공식 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-green-500 tracking-widest uppercase mb-2">Growth Formula</span>
              <h2 className="text-2xl font-bold text-slate-900">연봉/매출 성장 공식</h2>
              <div className="w-12 h-1 bg-green-500 mt-3 rounded-full" />
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-8">
              <div className="p-8 text-center border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{incomeFormula.formulaTitle}</h3>
                <div className="bg-green-50 rounded-xl p-5 border border-green-100 mb-4">
                  <p className="text-green-600 font-black text-xl tracking-tight">{incomeFormula.formula}</p>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{incomeFormula.explanation}</p>
              </div>

              <div className="p-8">
                <h4 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-8 text-center">Step by Step</h4>
                <div className="space-y-6 relative">
                  
                  {incomeFormula.steps.map((step, i) => (
                    <div key={i} className="relative md:pl-12">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-black text-sm hidden md:flex">
                        {i + 1}
                      </div>
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-200 transition-all">
                        <h3 className="font-bold text-slate-900 mb-2">{step.step}</h3>
                        <p className="text-sm text-slate-500 mb-3 leading-relaxed">{step.action}</p>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-xs font-bold text-slate-500">{step.expectedResult}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-200 text-center">
              <p className="text-xs font-bold text-green-300 uppercase tracking-widest mb-2">Key Metric</p>
              <p className="text-sm text-slate-700 font-bold leading-relaxed">{incomeFormula.keyMetric}</p>
            </div>
          </section>

          <Separator className="my-10" />

          {/* ====== 8. 나의 마케팅 전략 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-blue-500 tracking-widest uppercase mb-2">Marketing</span>
              <h2 className="text-2xl font-bold text-slate-900">나의 마케팅 전략</h2>
              <div className="w-12 h-1 bg-blue-500 mt-3 rounded-full" />
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <span className="text-[10px] font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-md uppercase tracking-wider">Best Channel</span>
                  <h3 className="text-xl font-bold text-slate-900">{marketing.bestChannel}</h3>
                </div>
                <p className="text-sm text-slate-600">
                  <span className="text-slate-500 font-bold">콘텐츠 유형:</span> {marketing.contentType}
                </p>
              </div>

              <div className="p-8 space-y-8">
                <div>
                  <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-6">Posting Tips</h4>
                  <div className="space-y-3">
                    {marketing.postingTips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                        <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-slate-700 leading-relaxed font-medium">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-8">
                  <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-6 text-center">SNS Strategy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {marketing.snsStrategy.map((sns, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-200 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <Megaphone className="w-5 h-5 text-blue-500" />
                          <h3 className="font-bold text-slate-900">{sns.platform}</h3>
                          <span className="ml-auto text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded">{sns.frequency}</span>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">{sns.strategy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 text-center">
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest block mb-2">Viral Tip</span>
              <p className="text-sm text-slate-700 font-bold">{marketing.viralTip}</p>
            </div>
          </section>

          <Separator className="my-10" />

          {/* ========================================================================
              ZONE 3: PAID (유료 영역)
              ======================================================================== */}

          {/* ====== 9. 나의 강점을 강화하는 방법 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-green-500 tracking-widest uppercase mb-2">Enhance</span>
              <h2 className="text-2xl font-bold text-slate-900">
                나의 강점을 강화하는 방법
              </h2>
              <div className="w-12 h-1 bg-green-500 mt-3 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-6">
              {top5.map((item) => {
                const theme = THEMES.find(t => t.id === item.themeId);
                const domainInfo = DOMAIN_INFO[item.domain];
                const gradeInfo = GRADE_INFO[item.grade];
                const roleMessage = theme?.roleMessages?.[role];
                return (
                  <div key={item.themeId} className="group relative bg-white border border-slate-200 rounded-2xl p-6 transition-all hover:border-slate-300 hover:shadow-sm">
                    

                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {item.grade}등급
                        </span>
                        <h3 className="font-bold text-slate-900 text-xl">{item.nameKo}</h3>
                        <div className="flex items-center gap-1.5 ml-auto">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: domainInfo.color }} />
                          <span className="text-xs font-medium text-slate-500 uppercase tracking-tight">{domainInfo.nameKo}</span>
                        </div>
                      </div>

                      {roleMessage && (
                        <div className="mb-4 text-slate-700 leading-relaxed font-medium bg-green-50 p-4 rounded-xl border border-green-100">
                          <p className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 shrink-0 text-green-500 mt-0.5" />
                            {roleMessage}
                          </p>
                        </div>
                      )}

                      {theme?.strengthTip && (
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-bold text-green-300 uppercase tracking-wider">Strategy</span>
                          <p className="text-sm text-slate-600 leading-relaxed">{theme.strengthTip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <Separator className="my-10" />

          {/* ====== 10. 나의 약점을 보완하는 방법 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-yellow-500 tracking-widest uppercase mb-2">Supplement</span>
              <h2 className="text-2xl font-bold text-slate-900">
                나의 약점을 보완하는 방법
              </h2>
              <div className="w-12 h-1 bg-yellow-500 mt-3 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-6">
              {blindSpots.map((item) => {
                const theme = THEMES.find(t => t.id === item.themeId);
                const domainInfo = DOMAIN_INFO[item.domain];
                const gradeInfo = GRADE_INFO[item.grade];
                const roleMessage = theme?.roleMessages?.[role];
                return (
                  <div key={item.themeId} className="bg-white border border-slate-200 rounded-2xl p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {item.grade}등급
                      </span>
                      <h3 className="font-bold text-slate-900 text-xl">{item.nameKo}</h3>
                      <span className="text-xs font-medium text-slate-500 ml-auto">{domainInfo.nameKo}</span>
                    </div>

                    <div className="mb-5 space-y-3">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-yellow-500 mt-0.5" />
                        <p className="text-sm text-slate-600 leading-relaxed">
                          <span className="font-bold text-slate-900">{theme?.description}</span>
                          {roleMessage && (
                            <span className="block mt-1 text-slate-500">
                              {ROLE_LABELS[role]}로서 {roleMessage.replace(/합니다$|입니다$|됩니다$|줍니다$/, '는 것')}이 다소 어려울 수 있습니다.
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {theme?.weaknessTip && (
                      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">Solution</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">{theme.weaknessTip}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <Separator className="my-10" />

          {/* ====== 11. 리더십 스타일 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-blue-500 tracking-widest uppercase mb-2">Leadership</span>
              <h2 className="text-2xl font-bold text-slate-900">리더십 스타일</h2>
              <div className="w-12 h-1 bg-blue-500 mt-3 rounded-full" />
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{leadershipStyle.styleName}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{leadershipStyle.description}</p>
              </div>

              <div className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      강점
                    </h4>
                    <p className="text-slate-600 leading-relaxed">{leadershipStyle.strengthPoint}</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      주의점
                    </h4>
                    <p className="text-slate-600 leading-relaxed">{leadershipStyle.cautionPoint}</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-8">
                  <h4 className="text-sm font-bold text-blue-400 uppercase mb-6 tracking-tight text-center">PRACTICAL TIPS</h4>
                  <div className="space-y-3">
                    {leadershipStyle.practicalTips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-blue-50 border border-blue-100">
                        <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-slate-700 leading-relaxed font-semibold">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-3">Team Impact</p>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{leadershipStyle.teamImpact}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-3">Development</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{leadershipStyle.developmentAdvice}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-10" />

          {/* ====== 12. 수입 잠재력 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-yellow-500 tracking-widest uppercase mb-2">Income Potential</span>
              <h2 className="text-2xl font-bold text-slate-900">수입 잠재력</h2>
              <div className="w-12 h-1 bg-yellow-500 mt-3 rounded-full" />
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <div className="mb-10 text-center">
                <span className="inline-block px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold mb-4 uppercase tracking-wider">
                  {income.typeName}
                </span>
                <p className="text-lg text-slate-600 font-medium">{income.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-100 pt-10">
                <div className="space-y-6 pl-4">
                  <h4 className="text-sm font-bold text-yellow-600 uppercase tracking-widest">Growth Strategy</h4>
                  <div className="space-y-4">
                    {income.growthStrategy.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <ArrowRight className="w-4 h-4 text-yellow-500 mt-1 shrink-0" />
                        <p className="text-sm text-slate-600 leading-relaxed font-semibold">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-yellow-600 uppercase tracking-widest">Action Now</h4>
                  <div className="space-y-4">
                    {income.currentActions.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-yellow-100 bg-yellow-50">
                        <CheckCircle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-slate-600 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-6">
                <h4 className="text-sm font-bold text-yellow-600 uppercase tracking-widest text-center">Income Milestones</h4>
                <div className="relative">
                  
                  <div className="space-y-6">
                    {income.milestones.map((ms, i) => {
                      const milestoneColors = ['bg-yellow-500 text-white', 'bg-yellow-400 text-white', 'bg-yellow-300 text-white'];
                      const dotColors = ['bg-yellow-500', 'bg-yellow-400', 'bg-yellow-300'];
                      return (
                      <div key={i} className="relative md:pl-10">
                        <div className={`absolute left-3 w-2.5 h-2.5 rounded-full ${dotColors[i] || 'bg-yellow-300'} border-2 border-white top-2 hidden md:block`} />
                        <div className="p-5 border border-slate-100 rounded-2xl bg-white hover:border-slate-200 transition-colors">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-md ${milestoneColors[i] || 'bg-yellow-300 text-white'} uppercase`}>{ms.stage}</span>
                            <span className="text-sm font-bold text-slate-900">{ms.target}</span>
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed">{ms.action}</p>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-yellow-50 rounded-2xl border border-dashed border-yellow-200 text-center">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-700">Multiplier:</span> {income.incomeMultiplier}
                </p>
                <p className="mt-3 text-[11px] text-slate-400 font-medium">
                  CAUTION: {income.cautionPoint}
                </p>
              </div>
            </div>
          </section>

          <Separator className="my-10" />

          {/* ====== 독립 가능성 진단 (CEO 제외) ====== */}
          {independence && (
            <>
              <section className="mb-12">
                <div className="flex flex-col items-center mb-8">
                  <span className="text-xs font-bold text-violet-500 tracking-widest uppercase mb-2">Independence</span>
                  <h2 className="text-2xl font-bold text-slate-900">{independence.sectionTitle}</h2>
                  <div className="w-12 h-1 bg-violet-500 mt-3 rounded-full" />
                  <p className="mt-4 text-sm text-slate-500 font-medium">{independence.subtitle}</p>
                </div>

                {/* 독립 준비도 체크리스트 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-8">
                  <h4 className="text-sm font-bold text-violet-400 uppercase tracking-widest mb-2 text-center">Readiness Checklist</h4>
                  <h3 className="text-xl font-bold text-slate-900 text-center mb-2">독립 준비도 체크리스트</h3>
                  <p className="text-sm text-slate-400 text-center mb-8">해당하는 항목이 많을수록 독립 준비도가 높습니다</p>
                  <div className="space-y-3">
                    {independence.readinessChecklist.map((check, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-violet-50 border border-violet-100">
                        <div className="flex items-start gap-4">
                          <CheckCircle className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm text-slate-800 font-bold mb-1">{check.item}</p>
                            <p className="text-xs text-slate-400 leading-relaxed">{check.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 나에게 맞는 독립 경로 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-8">
                  <h4 className="text-sm font-bold text-violet-400 uppercase tracking-widest mb-2 text-center">Best Fit Paths</h4>
                  <h3 className="text-xl font-bold text-slate-900 text-center mb-8">나에게 맞는 독립 경로</h3>
                  <div className="space-y-4">
                    {independence.bestFitPaths.map((path, i) => (
                      <div key={i} className="p-6 border border-slate-200 rounded-2xl hover:border-slate-200 hover:bg-slate-50 transition-all">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center text-white font-black text-sm shrink-0">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h3 className="font-bold text-slate-900 text-lg">{path.path}</h3>
                              <span className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 text-slate-500 rounded-md">{path.requiredStrength}</span>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed">{path.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reality Check + First Step */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <AlertTriangle className="w-5 h-5 text-violet-500 shrink-0" />
                      <h4 className="text-sm font-bold text-violet-400 uppercase tracking-widest">Reality Check — 현실 점검</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{independence.realityCheck}</p>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-5 border border-violet-100">
                    <div className="flex items-start gap-3 mb-3">
                      <Target className="w-5 h-5 text-violet-500 shrink-0" />
                      <h4 className="text-sm font-bold text-violet-400 uppercase tracking-widest">First Step — 지금 당장</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{independence.firstStep}</p>
                  </div>
                </div>
              </section>

              <Separator className="my-10" />
            </>
          )}

          {/* ====== 13. 아랫사람과의 궁합 (CEO, Manager만 표시) ====== */}
          {(role === 'ceo' || role === 'manager') && (
            <>
              <section className="mb-12">
                <div className="flex flex-col items-center mb-8">
                  <span className="text-xs font-bold text-violet-500 tracking-widest uppercase mb-2">Hierarchy</span>
                  <h2 className="text-2xl font-bold text-slate-900">아랫사람과의 궁합</h2>
                  <div className="w-12 h-1 bg-violet-500 mt-3 rounded-full" />
                </div>

                <div className="space-y-4 mb-8">
                  <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6 text-center">
                    <p className="text-[10px] font-bold text-violet-300 uppercase tracking-widest mb-3">Management Style</p>
                    {(() => {
                      const parts = subordinate.managementStyle.split(/(?<=맞습니다\.)\s*/);
                      return (
                        <>
                          <p className="text-lg text-slate-800 font-bold mb-2">"{parts[0]}"</p>
                          {parts[1] && <p className="text-sm text-slate-500 leading-relaxed">{parts[1]}</p>}
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { label: 'BEST', data: subordinate.bestMatch },
                    { label: 'GROWTH', data: subordinate.growthMatch },
                    { label: 'CHALLENGE', data: subordinate.challengeMatch }
                  ].map((match, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden flex flex-col h-full hover:border-slate-300 transition-all">
                      <div className={`inline-block px-2.5 py-1 text-[9px] font-black text-white ${match.label === 'BEST' ? 'bg-violet-500' : match.label === 'GROWTH' ? 'bg-violet-400' : 'bg-violet-300'} rounded-md mb-3`}>
                        {match.label}
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">{match.data.type}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-grow">{match.data.description}</p>
                      
                      <div className="space-y-4 mt-auto">
                        <div className="flex flex-wrap gap-2">
                          {match.data.comboTypes?.map((ct, j) => (
                            <span key={j} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">#{ct}</span>
                          ))}
                        </div>
                        <div className="p-3 bg-violet-50 rounded-xl border border-violet-100">
                          <p className="text-[11px] font-medium text-slate-600 italic">"TIP: {match.data.tip}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-8">
                  <h4 className="text-sm font-bold text-violet-400 uppercase tracking-widest mb-6 text-center">Effective Communication</h4>
                  <div className="space-y-3">
                    {subordinate.communicationTips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-violet-50 border border-violet-100">
                        <CheckCircle className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-slate-700 leading-relaxed font-semibold">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <Separator className="my-10" />
            </>
          )}

          {/* ====== CEO: 관리자로 진급시켜야 하는 유형 ====== */}
          {role === 'ceo' && ceoPromotion && (
              <section className="mb-12">
                <div className="flex flex-col items-center mb-8">
                  <span className="text-xs font-bold text-violet-500 tracking-widest uppercase mb-2">Promotion</span>
                  <h2 className="text-2xl font-bold text-slate-900">관리자로 진급시켜야 하는 유형</h2>
                  <div className="w-12 h-1 bg-violet-500 mt-3 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white border border-slate-100 rounded-2xl p-8 relative">
                    <div className="inline-block px-2.5 py-1 bg-violet-500 text-[10px] font-black text-white rounded-md tracking-widest uppercase mb-3">Promote</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{ceoPromotion.promoteType.title}</h3>
                    <p className="text-sm text-slate-500 mb-8 leading-relaxed italic">"{ceoPromotion.promoteType.description}"</p>
                    
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-bold text-violet-300 uppercase tracking-widest block mb-4">Positive Signals</span>
                        <ul className="space-y-2">
                          {ceoPromotion.promoteType.signs.map((sign, i) => (
                            <li key={i} className="text-sm text-slate-600 flex items-start gap-3">
                              <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-violet-500" />
                              {sign}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100">
                        <span className="text-[10px] font-bold text-violet-300 uppercase tracking-widest block mb-1">Development Plan</span>
                        <p className="text-sm text-slate-700 font-medium">{ceoPromotion.promoteType.developmentPlan}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-2xl p-8 relative">
                    <div className="inline-block px-2.5 py-1 bg-violet-300 text-[10px] font-black text-white rounded-md tracking-widest uppercase mb-3">Caution</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{ceoPromotion.avoidPromoting.title}</h3>
                    <p className="text-sm text-slate-500 mb-8 leading-relaxed italic">"{ceoPromotion.avoidPromoting.reason}"</p>

                    <div>
                      <span className="text-[10px] font-bold text-violet-300 uppercase tracking-widest block mb-4">Warning Signals</span>
                      <ul className="space-y-2">
                        {ceoPromotion.avoidPromoting.signs.map((sign, i) => (
                          <li key={i} className="text-sm text-slate-600 flex items-start gap-3">
                            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-violet-500" />
                            {sign}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-violet-50 rounded-xl p-5 border border-violet-100 text-center">
                  <p className="text-[10px] font-bold text-violet-300 mb-2 uppercase tracking-widest">PROMOTION TIP</p>
                  {(() => {
                    const parts = ceoPromotion.promotionTip.split(/(?<=[\.\?!])\s+/);
                    const first = parts[0];
                    const rest = parts.slice(1).join(' ');
                    return (
                      <>
                        <p className="text-sm text-slate-700 font-medium">{first}</p>
                        {rest && <p className="text-sm text-slate-700 font-medium mt-2">{rest}</p>}
                      </>
                    );
                  })()}
                </div>
              </section>
          )}

          {/* ====== 윗사람과의 궁합 (CEO 제외) ====== */}
          {role !== 'ceo' && (
            <section className="mb-12">
              <div className="flex flex-col items-center mb-8">
                <span className="text-xs font-bold text-violet-500 tracking-widest uppercase mb-2">Relational</span>
                <h2 className="text-2xl font-bold text-slate-900">윗사람과의 궁합</h2>
                <div className="w-12 h-1 bg-violet-500 mt-3 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-100 rounded-2xl p-8 relative">
                  <div className="inline-block px-2.5 py-1 bg-violet-500 text-[10px] font-black text-white rounded-md tracking-widest uppercase mb-3">Best</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{boss.bestMatch.type}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 italic">"{boss.bestMatch.description}"</p>

                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {boss.bestMatch.comboTypes?.map((ct, j) => (
                        <span key={j} className="text-[10px] font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded">#{ct}</span>
                      ))}
                    </div>
                    <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100">
                      <span className="text-[10px] font-bold text-violet-300 uppercase tracking-widest block mb-1">Collaboration Tip</span>
                      <p className="text-sm text-slate-700 font-medium italic">"{boss.bestMatch.tip}"</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-8 relative">
                  <div className="inline-block px-2.5 py-1 bg-violet-300 text-[10px] font-black text-white rounded-md tracking-widest uppercase mb-3">Caution</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{boss.worstMatch.type}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 italic">"{boss.worstMatch.description}"</p>

                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {boss.worstMatch.comboTypes?.map((ct, j) => (
                        <span key={j} className="text-[10px] font-bold px-3 py-1 bg-slate-100 text-slate-500 rounded">#{ct}</span>
                      ))}
                    </div>
                    <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100">
                      <span className="text-[10px] font-bold text-violet-300 uppercase tracking-widest block mb-1">Warning Tip</span>
                      <p className="text-sm text-slate-500 font-medium italic">"{boss.worstMatch.tip}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <Separator className="my-10" />

          {/* ====== 9. 번아웃 트리거 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-yellow-500 tracking-widest uppercase mb-2">Wellbeing</span>
              <h2 className="text-2xl font-bold text-slate-900">번아웃 트리거</h2>
              <div className="w-12 h-1 bg-yellow-500 mt-3 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-8">
                <h4 className="text-sm font-bold text-yellow-600 uppercase tracking-widest mb-10 text-center">Triggers & Signals</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-2 block">나를 지치게 하는 것들</span>
                    <div className="space-y-4">
                      {burnout.triggers.map((trigger, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <span className="w-6 h-6 rounded bg-yellow-500 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">0{i + 1}</span>
                          <p className="text-sm text-slate-600 font-semibold leading-relaxed">{trigger}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">초기 경고 신호</span>
                    <div className="space-y-4">
                      {burnout.earlySignals.map((signal, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-yellow-100 bg-yellow-50">
                          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                          <p className="text-sm text-slate-500 leading-relaxed italic">{signal}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 bg-yellow-50 rounded-xl p-5 border border-yellow-100 text-center">
                  <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest block mb-2">Danger Sign</span>
                  <p className="text-sm text-slate-700 font-bold">{burnout.warningSign}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200 rounded-2xl p-8">
                  <h4 className="text-sm font-bold text-yellow-600 uppercase tracking-widest mb-6">Prevention Routine</h4>
                  <div className="space-y-4">
                    {burnout.preventionRoutine.map((routine, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{routine}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-yellow-600 uppercase tracking-widest mb-6">Recovery Plan</h4>
                  <div className="space-y-4">
                    {burnout.recoveryPlan.map((plan, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <span className="w-7 h-7 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                        <div className="flex-1">
                          <span className="text-xs font-bold text-yellow-500 uppercase tracking-tighter block mb-1">{plan.step}</span>
                          <p className="text-sm text-slate-600 font-semibold">{plan.action}</p>
                        </div>
                      </div>
                    ))}
                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                      <p className="text-xs text-slate-500 font-medium italic">"TIP: {burnout.recoveryTip}"</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-200">
                <h4 className="text-sm font-bold text-yellow-600 uppercase tracking-widest mb-8 text-center flex items-center justify-center gap-3">
                  <HelpCircle className="w-4 h-4 text-yellow-500" />
                  Self Check Questions
                </h4>
                <div className="space-y-3">
                  {burnout.selfCheckQuestions.map((q, i) => (
                    <div key={i} className="p-5 bg-white rounded-2xl border border-slate-100 flex items-start gap-4">
                      <span className="text-xs font-bold text-yellow-500 font-mono mt-0.5">Q0{i + 1}</span>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-10" />

          {/* ====== 10. 에너지 충전·방전 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-green-500 tracking-widest uppercase mb-2">Energy</span>
              <h2 className="text-2xl font-bold text-slate-900">에너지 충전·방전</h2>
              <div className="w-12 h-1 bg-green-500 mt-3 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden transition-all hover:border-slate-300">
                
                <h3 className="font-bold text-green-400 uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                   Charging
                </h3>
                <ul className="space-y-4">
                  {energy.chargeActivities.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 font-semibold flex items-start gap-3 leading-relaxed">
                      <span className="text-green-500 font-bold">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden transition-all hover:border-slate-300">
                
                <h3 className="font-black text-green-300 uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                   Draining
                </h3>
                <ul className="space-y-4">
                  {energy.drainActivities.map((item, i) => (
                    <li key={i} className="text-sm text-slate-400 font-medium flex items-start gap-3 leading-relaxed">
                      <span className="text-green-300">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border border-green-100 text-center">
              <span className="text-[10px] font-bold text-green-300 uppercase tracking-widest block mb-2">Optimal Environment</span>
              <p className="text-sm text-slate-700 font-medium">{energy.optimalEnvironment}</p>
            </div>
          </section>

          <Separator className="my-10" />

          {/* ====== 11. 맞는 업무 유형 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-violet-500 tracking-widest uppercase mb-2">Work Styles</span>
              <h2 className="text-2xl font-bold text-slate-900">맞는 업무 유형</h2>
              <div className="w-12 h-1 bg-violet-500 mt-3 rounded-full" />
            </div>

            <div className="space-y-4 mb-8">
              {workType.bestFit.map((item, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 transition-all hover:border-slate-200 hover:bg-slate-50">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">{item.type}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-slate-700 mb-1 uppercase tracking-tight">피해야 할 유형: {workType.avoidType.type}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed italic">{workType.avoidType.reason}</p>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-10" />

          {/* ====== 12. 역할별 고유 분석 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-violet-500 tracking-widest uppercase mb-2">Analysis</span>
              <h2 className="text-2xl font-bold text-slate-900">역할별 고유 분석</h2>
              <div className="w-12 h-1 bg-violet-500 mt-3 rounded-full" />
              <p className="mt-4 text-sm text-slate-500 font-medium">
                {role === 'ceo' ? '사업을 키우는 방향' : role === 'manager' ? '팀을 운영하는 방식' : role === 'trainer' ? '회원을 이끄는 스타일' : '영업하는 스타일'}에 특화된 분석입니다.
              </p>
            </div>

            {subTypeDetail && (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-8">
                {/* 상단: 흰 배경 */}
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{subTypeDetail.typeName}</h3>
                  <p className="text-slate-500">{subTypeDetail.description}</p>
                </div>
                {/* 중앙: 인용구 */}
                <div className="bg-violet-50 p-8 italic text-center border-y border-violet-100">
                  <p className="text-lg text-violet-700 font-semibold">"{subTypeDetail.shareQuote}"</p>
                </div>
                {/* 하단: 흰 배경 */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                  {[
                    { label: 'STRENGTH', value: subTypeDetail.strength, color: 'text-violet-500' },
                    { label: 'CAUTION', value: subTypeDetail.caution, color: 'text-violet-500' },
                    { label: 'ACTION', value: subTypeDetail.actionTip, color: 'text-violet-500' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-6">
                      <span className={`text-[10px] font-black ${item.color} uppercase tracking-widest block mb-2`}>{item.label}</span>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6">
              {[roleCategories.result11, roleCategories.result12, roleCategories.result13].map((cat, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 transition-all hover:border-slate-200 hover:bg-slate-50">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{cat.title}</h3>
                  <p className="text-[10px] font-bold text-violet-500 uppercase tracking-widest mb-6">{cat.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {cat.details.map((detail, j) => (
                      <li key={j} className="text-sm text-slate-600 flex items-start gap-4 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-300 mt-1.5 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100">
                    <span className="text-[10px] font-bold text-violet-500 uppercase tracking-widest block mb-1">Practical Tip</span>
                    <p className="text-sm text-slate-700 font-semibold">{cat.actionTip}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-10" />

          {/* ====== 13. 커리어 로드맵 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-green-500 tracking-widest uppercase mb-2">Roadmap</span>
              <h2 className="text-2xl font-bold text-slate-900">커리어 로드맵</h2>
              <div className="w-12 h-1 bg-green-500 mt-3 rounded-full" />
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-12 border-b border-slate-100">
                <div className="text-center md:text-left">
                  <span className="text-[10px] font-black text-green-300 uppercase tracking-widest block mb-2">Current Status</span>
                  <span className="text-2xl font-black text-slate-900">{career.currentStage}</span>
                </div>
                <div className="hidden md:block">
                  <ArrowRight className="w-6 h-6 text-green-500" />
                </div>
                <div className="text-center md:text-right">
                  <span className="text-[10px] font-bold text-green-300 uppercase tracking-widest block mb-2">Ultimate Goal</span>
                  <div className="flex items-center gap-2 justify-center md:justify-end">
                    <Star className="w-5 h-5 text-green-500 fill-green-500" />
                    <span className="text-2xl font-black text-slate-900">{career.ultimateGoal}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-12 relative">
                
                {career.nextSteps.map((step, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-6 relative md:pl-12">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-green-500 border-2 border-green-500 flex items-center justify-center font-black text-white text-sm hidden md:flex">
                      {i + 1}
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-200 hover:bg-slate-50/10 transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-slate-900 text-lg">{step.step}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase">{step.timeframe}</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Separator className="my-10" />

          {/* ====== 15. 이번 달 실천 미션 3가지 ====== */}
          <section className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-bold text-yellow-500 tracking-widest uppercase mb-2">Monthly Missions</span>
              <h2 className="text-2xl font-bold text-slate-900">이번 달 실천 미션</h2>
              <div className="w-12 h-1 bg-yellow-500 mt-3 rounded-full" />
              <p className="mt-4 text-sm text-slate-500 font-medium">{missions.theme}</p>
            </div>

            <div className="space-y-6 mb-8">
              {missions.missions.map((m, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden hover:border-slate-200 transition-all">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-500 flex items-center justify-center text-white font-black text-lg shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-3">{m.mission}</h3>
                      <div className="mb-4">
                        <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest block mb-1">Why</span>
                        <p className="text-sm text-slate-500 leading-relaxed">{m.why}</p>
                      </div>
                      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                        <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest block mb-1">How To</span>
                        <p className="text-sm text-slate-700 font-medium leading-relaxed">{m.howTo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-100 text-center">
              <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest block mb-2">Completion Reward</span>
              <p className="text-sm text-slate-700 font-bold">{missions.completionReward}</p>
            </div>
          </section>

          {/* ====== Actions ====== */}
          <div className="flex flex-col items-center gap-4 no-print">
            <Button
              onClick={handlePdfDownload}
              className="w-full sm:w-auto px-10 py-7 rounded-2xl bg-slate-900 text-white hover:bg-yellow-500 transition-all font-bold text-base shadow-lg"
            >
              <FileDown className="w-5 h-5 mr-2" />
              결과 PDF 다운로드
            </Button>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={handleRestart}
                className="px-8 py-6 rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-bold"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                다시 검사하기
              </Button>
              <Link href="/">
                <Button
                  variant="outline"
                  className="px-8 py-6 rounded-2xl border-slate-800 bg-yellow-500 text-white hover:bg-slate-700 transition-all font-bold shadow-lg shadow-slate-200"
                >
                  <Home className="w-4 h-4 mr-2" />
                  처음으로
                </Button>
              </Link>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-slate-100 text-center">
              <p className="text-xs text-slate-400">
                이 페이지를 벗어나면 검사 결과가 사라집니다. PDF를 다운로드하여 저장해 주세요.
              </p>
            </div>
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
          combo={combo}
          role={role}
          top5={top5}
          leadershipTypeId={leadership.primaryType}
        />
      </div>
    </main>
  );
}
