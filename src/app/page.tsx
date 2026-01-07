"use client";

import Link from "next/link";
import {
  Target,
  Users,
  BarChart3,
  Clock,
  Zap,
  Heart,
  Crown,
  Palette,
  GraduationCap,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const features = [
  {
    icon: <Target className="w-8 h-8 text-violet-600" />,
    title: "36개 피트니스 강점",
    description: "갤럽 기반으로 피트니스 업계에 맞게 설계된 36개 강점 키워드"
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: "역할별 맞춤 문항",
    description: "경영자, 운영자, 트레이너 역할에 맞는 맞춤형 질문"
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-emerald-600" />,
    title: "8가지 리더 유형",
    description: "론울프, 제국건설자, 결과머신 등 나만의 유형 발견"
  },
  {
    icon: <Clock className="w-8 h-8 text-amber-600" />,
    title: "약 10분 소요",
    description: "36개 문항으로 빠르게 나의 강점 TOP 5 확인"
  },
];

const fitnessTypes = [
  { icon: <User className="w-6 h-6" />, name: "론울프", desc: "1인샵에서 빛나는" },
  { icon: <Crown className="w-6 h-6" />, name: "제국건설자", desc: "대기업을 꿈꾸는" },
  { icon: <Target className="w-6 h-6" />, name: "결과머신", desc: "성과로 증명하는" },
  { icon: <Heart className="w-6 h-6" />, name: "힐링마스터", desc: "마음까지 케어하는" },
  { icon: <Palette className="w-6 h-6" />, name: "크리에이터", desc: "콘텐츠를 만드는" },
  { icon: <BarChart3 className="w-6 h-6" />, name: "전략분석가", desc: "데이터로 경영하는" },
  { icon: <GraduationCap className="w-6 h-6" />, name: "멘토장인", desc: "후배를 키우는" },
  { icon: <Zap className="w-6 h-6" />, name: "올라운더", desc: "뭐든 잘하는" },
];

const domains = [
  { name: "실행력", color: "bg-violet-500", description: "성취, 체계, 집중, 책임 등 목표 달성과 실천력" },
  { name: "영향력", color: "bg-amber-500", description: "주도력, 소통, 설득 등 동기부여와 리더십" },
  { name: "관계형성", color: "bg-blue-500", description: "공감, 성장지원, 포용 등 신뢰 구축과 팀워크" },
  { name: "전략사고", color: "bg-emerald-500", description: "분석, 전략, 비전제시 등 분석과 미래 설계" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-16">
        {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-blue-600/10 to-emerald-600/10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-1">
              피트니스 리더를 위한 강점검사
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              당신의{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                피트니스 리더십 강점
              </span>
              을<br />발견하세요
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              경영자, 운영자, 트레이너 역할에 맞는
              <br />
              36개 강점을 분석하고,
              <br />
              나만의 피트니스 리더 유형을 확인하세요
            </p>
            <Link href="/login?callbackUrl=/select-role">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
              >
                무료로 검사 시작하기
              </Button>
            </Link>
            <p className="text-sm text-slate-500 mt-4">
              약 10분 소요 · 36문항 · 결과 즉시 확인
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
            핏마인드랩 검사 특징
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            갤럽 강점검사를 기반으로
            <br />
            피트니스 업계에 특화된 강점검사입니다
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{f.icon}</div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Domains Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
            4가지 강점 도메인
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            36개 강점은 4가지 도메인으로 분류됩니다
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {domains.map((d, i) => (
              <Card key={i} className="border-2 border-slate-200">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-full ${d.color} flex items-center justify-center mb-4`}>
                    <div className="w-6 h-6 bg-white rounded-full" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{d.name}</h3>
                  <p className="text-slate-600 text-sm">{d.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
            8가지 피트니스 리더 유형
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            TOP 5 강점 조합으로 나만의 유형을 확인하세요
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {fitnessTypes.map((t, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow cursor-default">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center mx-auto mb-3 text-violet-600">
                    {t.icon}
                  </div>
                  <h3 className="font-bold text-slate-900">{t.name}</h3>
                  <p className="text-xs text-slate-500">{t.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            지금 바로 나의 강점을 발견하세요
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            무료로 36문항 검사를 완료하고
            <br />
            TOP 5 강점과 나만의 유형을 확인하세요
          </p>
          <Link href="/login?callbackUrl=/select-role">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              무료 검사 시작하기
            </Button>
          </Link>
        </div>
      </section>

        {/* Footer */}
        <footer className="py-8 bg-slate-900 text-slate-400">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">핏마인드랩 - 피트니스 리더 강점검사</p>
            <p className="text-xs mt-2">
              갤럽 강점검사를 기반으로 한 피트니스 업계 특화 강점검사입니다
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
