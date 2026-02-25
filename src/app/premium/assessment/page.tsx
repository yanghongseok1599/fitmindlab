"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// 새 시스템에서는 모든 문항이 무료 검사에 포함됩니다.
// 프리미엄은 결과만 잠금 해제하는 방식입니다.
// 이 페이지는 기존 사용자를 위해 메인 검사 페이지로 리다이렉트합니다.
export default function PremiumAssessmentPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/select-role");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600 mx-auto mb-4" />
        <p className="text-slate-600">검사 페이지로 이동 중...</p>
      </div>
    </div>
  );
}
