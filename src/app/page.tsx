"use client";

import Link from "next/link";
import {
  Target,
  Users,
  BarChart3,
  Clock,
  Telescope,
  Rocket,
  Heart,
  Brain,
  Crown,
  Zap,
  Shield,
  Handshake,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const features = [
  {
    icon: <Target className="w-8 h-8 text-violet-600" />,
    title: "30개 피트니스 강점",
    description: "갤럽 기반으로 피트니스 업계에 맞게 설계된 30개 강점 테마",
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: "4가지 역할별 맞춤 문항",
    description: "대표, 관리자, 트레이너, FC 역할에 맞는 맞춤형 질문",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-emerald-600" />,
    title: "16가지 리더십 유형",
    description: "4역할 × 4리더십 = 나만의 고유한 유형 발견",
  },
  {
    icon: <Clock className="w-8 h-8 text-amber-600" />,
    title: "약 15분 소요",
    description: "역할별 66~72문항으로 나의 리더십 유형과 TOP 5 확인",
  },
];

const leadershipTypes = [
  {
    icon: <Telescope className="w-6 h-6" />,
    name: "비전형",
    emoji: "🔭",
    color: "from-emerald-100 to-teal-100",
    textColor: "text-emerald-700",
    desc: "큰 그림을 그리는",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    name: "실행형",
    emoji: "🚀",
    color: "from-violet-100 to-purple-100",
    textColor: "text-violet-700",
    desc: "목표를 반드시 달성하는",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    name: "관계형",
    emoji: "💙",
    color: "from-blue-100 to-sky-100",
    textColor: "text-blue-700",
    desc: "사람의 마음을 읽는",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    name: "전략형",
    emoji: "🧠",
    color: "from-amber-100 to-orange-100",
    textColor: "text-amber-700",
    desc: "데이터로 결정하는",
  },
];

const comboExamples = [
  { role: "대표", combo: "제국 건설자", icon: <Crown className="w-5 h-5" />, color: "bg-red-500" },
  { role: "관리자", combo: "성과 드라이버", icon: <Zap className="w-5 h-5" />, color: "bg-blue-500" },
  { role: "트레이너", combo: "결과 제조기", icon: <Target className="w-5 h-5" />, color: "bg-green-500" },
  { role: "FC", combo: "관계의 달인", icon: <Handshake className="w-5 h-5" />, color: "bg-yellow-500" },
  { role: "대표", combo: "사람 수집가", icon: <Heart className="w-5 h-5" />, color: "bg-red-500" },
  { role: "관리자", combo: "팀 수호자", icon: <Shield className="w-5 h-5" />, color: "bg-blue-500" },
  { role: "트레이너", combo: "힐링 마스터", icon: <Heart className="w-5 h-5" />, color: "bg-green-500" },
  { role: "FC", combo: "열정 클로저", icon: <Zap className="w-5 h-5" />, color: "bg-yellow-500" },
];

const domains = [
  { name: "전략사고", color: "bg-emerald-500", description: "비전력, 전략력, 분석력 등 미래 설계와 데이터 기반 사고" },
  { name: "실행력", color: "bg-violet-500", description: "실행력, 절제력, 집중력 등 목표 달성과 실천력" },
  { name: "영향력", color: "bg-amber-500", description: "소통력, 지휘력, 자신감 등 동기부여와 리더십" },
  { name: "관계형성", color: "bg-blue-500", description: "공감력, 적응력, 연결력 등 신뢰 구축과 팀워크" },
];

const resultPreviews = [
  "리더십 유형 + 조합 타이틀",
  "핵심 강점 TOP 5",
  "번아웃 트리거",
  "에너지 충전·방전 패턴",
  "맞는 피트니스 업무 유형",
  "윗사람과의 궁합",
  "아랫사람과의 궁합",
  "리더십 스타일",
  "수입 잠재력 유형",
  "커리어 로드맵",
  "역할별 고유 분석",
  "역할별 맞춤 전략",
  "+ 더 많은 분석...",
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
                피트니스 리더를 위한 리더십 유형검사
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                당신은 어떤{" "}
                <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  피트니스 리더
                </span>
                인가요?
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                대표, 관리자, 트레이너, FC
                <br />
                4가지 역할 × 4가지 리더십 = 16가지 유형
                <br />
                나만의 리더십 유형을 발견하세요
              </p>
              <Link href="/select-role">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                >
                  무료로 검사 시작하기
                </Button>
              </Link>
              <p className="text-sm text-slate-500 mt-4">
                약 15분 소요 · 역할별 66~72문항 · 결과 즉시 확인
              </p>
            </div>
          </div>
        </section>

        {/* Pain Points & Solution Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-14 leading-tight">
              혹시 이런 생각,<br />해본 적 없나요?
            </h2>

            <div className="space-y-6 mb-16">
              {[
                { pain: "열심히 하는데 왜 성과가 안 나올까?", detail: "매일 새벽부터 밤까지 일하는데, 센터는 제자리걸음입니다" },
                { pain: "나는 왜 저 사람처럼 못할까?", detail: "SNS 속 잘나가는 트레이너를 보며 자괴감이 듭니다" },
                { pain: "직원이 왜 내 마음 같지 않을까?", detail: "뽑아놓으면 금방 나가고, 남은 사람도 열정이 없습니다" },
                { pain: "이 일, 계속해도 되는 걸까?", detail: "체력도, 마음도 지쳐가는데 출구가 보이지 않습니다" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-red-500 text-lg font-bold">!</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg mb-1">&ldquo;{item.pain}&rdquo;</p>
                    <p className="text-slate-500 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mb-14">
              <div className="inline-block bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full px-6 py-2 text-sm font-semibold mb-6">
                원인은 하나입니다
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-snug">
                나의 강점을 모른 채<br />남의 방식을 따라하고 있기 때문입니다
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                관계형 리더가 성과 중심으로 운영하면 번아웃이 옵니다.<br />
                실행형 트레이너가 감성 마케팅을 하면 에너지가 고갈됩니다.<br />
                <span className="font-semibold text-slate-800">문제는 능력이 아니라, 방향이 틀린 겁니다.</span>
              </p>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-violet-100">
              <div className="text-center">
                <div className="text-4xl mb-4">🔑</div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  내 강점에 맞는 방식을 찾으면<br />모든 것이 달라집니다
                </h3>
                <p className="text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
                  핏마인드랩은 당신의 <span className="font-semibold text-violet-700">30가지 강점을 정밀 분석</span>해서<br />
                  당신만의 리더십 유형, 맞는 업무 방식, 성장 전략까지<br />
                  한 번에 알려드립니다.
                </p>
                <Link href="/select-role">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                  >
                    내 강점 발견하기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
              핏마인드랩 검사 특징
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              갤럽 강점검사를 기반으로
              <br />
              피트니스 업계에 특화된 리더십 유형검사입니다
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
              4가지 강점 도메인
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              30개 강점 테마는 4가지 도메인으로 분류됩니다
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

        {/* 4 Leadership Types Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
              4가지 리더십 유형
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              가장 높은 도메인이 당신의 리더십 유형을 결정합니다
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {leadershipTypes.map((t, i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center mx-auto mb-4 ${t.textColor}`}>
                      {t.icon}
                    </div>
                    <div className="text-2xl mb-1">{t.emoji}</div>
                    <h3 className={`font-bold text-lg ${t.textColor}`}>{t.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{t.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 16 Combo Types Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
              16가지 조합 유형
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              4역할 × 4리더십 = 16가지 고유한 조합
              <br />
              나는 어떤 유형일까?
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {comboExamples.map((c, i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow cursor-default">
                  <CardContent className="p-4 text-center">
                    <div className={`w-10 h-10 rounded-full ${c.color} flex items-center justify-center mx-auto mb-3 text-white`}>
                      {c.icon}
                    </div>
                    <Badge variant="outline" className="mb-2 text-xs">{c.role}</Badge>
                    <h3 className="font-bold text-slate-900 text-sm">{c.combo}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-sm text-slate-400 mt-6">
              외 8가지 더...
            </p>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
              <Sparkles className="w-8 h-8 inline-block mr-2 text-violet-500" />
              이런 결과를 받게 됩니다
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              단순한 강점 나열이 아닌, 실제 업무에 바로 적용할 수 있는 분석
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-3">
                {resultPreviews.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-slate-50 rounded-lg px-4 py-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-violet-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              지금 바로 나의 리더십 유형을 발견하세요
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              무료로 검사를 완료하고
              <br />
              나만의 리더십 유형과 TOP 5 강점을 확인하세요
            </p>
            <Link href="/select-role">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                무료 검사 시작하기
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-slate-900 text-slate-400">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">핏마인드랩 - 피트니스 리더 리더십 유형검사</p>
            <p className="text-xs mt-2">
              갤럽 강점검사를 기반으로 한 피트니스 업계 특화 리더십 유형검사입니다
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
