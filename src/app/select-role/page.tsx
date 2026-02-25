"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Role, ROLE_LABELS } from "@/types";
import { ROLES } from "@/data/roles";
import { getTotalBaseQuestions, getSupplementaryCount } from "@/data/role-weights";

function SelectRoleContent() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleStart = () => {
    if (selectedRole) {
      router.push(`/assessment?role=${selectedRole}`);
    }
  };

  const getEstimatedTime = (role: Role): string => {
    const total = getTotalBaseQuestions(role) + getSupplementaryCount(role);
    const minutes = Math.ceil(total * 0.3);
    return `약 ${minutes}분`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-slate-500 hover:text-slate-700 mb-8 inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            처음으로
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              나의 역할을 선택해주세요
            </h1>
            <p className="text-slate-600">
              역할에 맞는 맞춤형 질문이 제공됩니다
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {ROLES.map((item) => {
              const totalQ = getTotalBaseQuestions(item.id) + getSupplementaryCount(item.id);
              const isSelected = selectedRole === item.id;
              return (
                <Card
                  key={item.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    isSelected
                      ? "ring-2 shadow-lg"
                      : "hover:bg-slate-50"
                  }`}
                  style={isSelected ? { borderColor: item.color } : {}}
                  onClick={() => setSelectedRole(item.id)}
                >
                  <CardContent className="p-5 text-center">
                    <div className="text-4xl mb-3">{item.emoji}</div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">
                      {item.nameKo}
                    </h3>
                    <p className="text-slate-500 text-xs mb-3 leading-relaxed">{item.description}</p>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-slate-400 flex items-center justify-center gap-1">
                        <FileText className="w-3 h-3" />
                        {totalQ}문항
                      </span>
                      <span className="text-xs text-slate-400 flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getEstimatedTime(item.id)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="text-lg px-12 py-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 disabled:opacity-50"
              disabled={!selectedRole}
              onClick={handleStart}
            >
              검사 시작하기
            </Button>
            {selectedRole && (
              <p className="text-sm text-slate-500 mt-4">
                {ROLE_LABELS[selectedRole]} 역할로 검사를 시작합니다
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
