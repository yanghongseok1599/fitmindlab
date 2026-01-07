"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Briefcase, Users, Dumbbell, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Role, ROLE_LABELS } from "@/types";

const roles: { role: Role; icon: React.ReactNode; title: string; description: string }[] = [
  {
    role: "manager",
    icon: <Briefcase className="w-12 h-12 text-violet-600" />,
    title: "경영자",
    description: "직접 수업을 하지 않고 센터를 운영하는 대표/오너",
  },
  {
    role: "operator",
    icon: <Users className="w-12 h-12 text-blue-600" />,
    title: "운영자",
    description: "수업도 하면서 센터를 함께 운영하는 대표",
  },
  {
    role: "trainer",
    icon: <Dumbbell className="w-12 h-12 text-emerald-600" />,
    title: "트레이너",
    description: "회원 지도에 집중하는 전문 트레이너",
  },
];

function SelectRoleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPremium = searchParams.get("premium") === "true";
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleStart = () => {
    if (selectedRole) {
      if (isPremium) {
        router.push(`/premium/assessment?role=${selectedRole}`);
      } else {
        router.push(`/assessment?role=${selectedRole}`);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link href={isPremium ? "/premium" : "/"} className="text-slate-500 hover:text-slate-700 mb-8 inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {isPremium ? "결제 페이지로" : "처음으로"}
          </Link>

          <div className="text-center mb-12">
            {isPremium && (
              <Badge className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-1 mb-4">
                프리미엄 정밀 검사 (108문항)
              </Badge>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              나의 역할을 선택해주세요
            </h1>
            <p className="text-slate-600">
              역할에 맞는 맞춤형 질문이 제공됩니다
              {isPremium && " (약 30분 소요)"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {roles.map((item) => (
              <Card
                key={item.role}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedRole === item.role
                    ? "ring-2 ring-violet-500 bg-violet-50"
                    : "hover:bg-slate-50"
                }`}
                onClick={() => setSelectedRole(item.role)}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <h3 className="font-bold text-xl text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="text-lg px-12 py-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 disabled:opacity-50"
              disabled={!selectedRole}
              onClick={handleStart}
            >
              {isPremium ? "프리미엄 검사 시작하기" : "검사 시작하기"}
            </Button>
            {selectedRole && (
              <p className="text-sm text-slate-500 mt-4">
                {ROLE_LABELS[selectedRole]} 역할로 {isPremium ? "프리미엄 " : ""}검사를 시작합니다
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SelectRolePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600 mx-auto mb-4" />
          <p className="text-slate-600">로딩 중...</p>
        </div>
      </div>
    }>
      <SelectRoleContent />
    </Suspense>
  );
}