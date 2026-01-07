"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  User,
  LogOut,
  Loader2,
  FileText,
  Clock,
  Trophy,
  Crown,
  ChevronRight,
} from "lucide-react";
import { ROLE_LABELS, Role, FitnessTypeCode } from "@/types";

interface TestHistory {
  id: string;
  type: "free" | "premium";
  role: Role;
  fitnessType: FitnessTypeCode;
  fitnessTypeName: string;
  date: string;
  topStrengths: string[];
}

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

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [testHistory, setTestHistory] = useState<TestHistory[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    // localStorage에서 검사 이력 불러오기
    const loadTestHistory = () => {
      const history: TestHistory[] = [];

      // 무료 검사 결과 확인
      const freeResponses = localStorage.getItem("freeAssessmentResponses");
      const freeRole = localStorage.getItem("freeAssessmentRole") as Role | null;
      const freeResult = localStorage.getItem("freeAssessmentResult");

      if (freeResult && freeRole) {
        try {
          const result = JSON.parse(freeResult);
          history.push({
            id: "free-" + Date.now(),
            type: "free",
            role: freeRole,
            fitnessType: result.fitnessType.code,
            fitnessTypeName: result.fitnessType.nameKo,
            date: result.date || new Date().toISOString(),
            topStrengths: result.topStrengths?.slice(0, 3).map((s: { keyword: { nameKo: string } }) => s.keyword.nameKo) || [],
          });
        } catch (e) {
          console.error("Failed to parse free assessment result", e);
        }
      }

      // 프리미엄 검사 결과 확인
      const premiumResult = localStorage.getItem("premiumAssessmentResult");
      const premiumRole = sessionStorage.getItem("premiumRole") as Role | null;

      if (premiumResult && premiumRole) {
        try {
          const result = JSON.parse(premiumResult);
          history.push({
            id: "premium-" + Date.now(),
            type: "premium",
            role: premiumRole,
            fitnessType: result.fitnessType.code,
            fitnessTypeName: result.fitnessType.nameKo,
            date: result.date || new Date().toISOString(),
            topStrengths: result.topStrengths?.slice(0, 3).map((s: { keyword: { nameKo: string } }) => s.keyword.nameKo) || [],
          });
        } catch (e) {
          console.error("Failed to parse premium assessment result", e);
        }
      }

      setTestHistory(history);
    };

    if (session) {
      loadTestHistory();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Link>

          {/* Profile Card */}
          <Card className="mb-8 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-slate-900 mb-1">
                    {session.user?.name || "사용자"}
                  </h1>
                  <p className="text-slate-500 text-sm mb-3">{session.user?.email}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    로그아웃
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Link href="/select-role">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 mx-auto mb-3 text-violet-600" />
                  <h3 className="font-semibold text-slate-900 mb-1">무료 검사</h3>
                  <p className="text-xs text-slate-500">36문항 · 약 10분</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/premium">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-violet-200">
                <CardContent className="p-6 text-center">
                  <Crown className="w-8 h-8 mx-auto mb-3 text-violet-600" />
                  <h3 className="font-semibold text-slate-900 mb-1">프리미엄 검사</h3>
                  <p className="text-xs text-slate-500">108문항 · 약 30분</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <Separator className="my-8" />

          {/* Test History */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-slate-600" />
              검사 이력
            </h2>

            {testHistory.length > 0 ? (
              <div className="space-y-4">
                {testHistory.map((test) => (
                  <Card key={test.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 relative flex-shrink-0">
                          <Image
                            src={TYPE_IMAGES[test.fitnessType]}
                            alt={test.fitnessTypeName}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant={test.type === "premium" ? "default" : "secondary"}
                              className={test.type === "premium" ? "bg-gradient-to-r from-violet-600 to-blue-600" : ""}
                            >
                              {test.type === "premium" ? "프리미엄" : "무료"}
                            </Badge>
                            <span className="text-sm text-slate-500">{ROLE_LABELS[test.role]}</span>
                          </div>
                          <h3 className="font-bold text-slate-900 mb-1">{test.fitnessTypeName}</h3>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-amber-500" />
                            <span className="text-sm text-slate-600 truncate">
                              {test.topStrengths.join(", ")}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <h3 className="font-medium text-slate-700 mb-2">검사 이력이 없습니다</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    강점 검사를 진행하고 결과를 확인해보세요
                  </p>
                  <Link href="/select-role">
                    <Button>검사 시작하기</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Info */}
          <div className="mt-8 p-4 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 text-center">
              검사 결과는 현재 브라우저에 저장됩니다.
              <br />
              다른 기기에서는 결과를 확인할 수 없습니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
