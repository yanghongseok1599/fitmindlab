"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/select-role";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push(callbackUrl);
      } else {
        setLoading(false);
      }
    };
    checkSession();
  }, [supabase, router, callbackUrl]);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "auth") {
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  }, [searchParams]);

  const handleOAuthLogin = async (provider: "kakao" | "google") => {
    const options: { redirectTo: string; scopes?: string } = {
      redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(callbackUrl)}`,
    };

    // 카카오는 비즈앱이 아니면 account_email 권한이 없으므로 제외
    if (provider === "kakao") {
      options.scopes = "profile_nickname profile_image";
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options,
    });
    if (error) {
      setError("로그인 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Link>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">로그인</h1>
                <p className="text-slate-600">
                  핏마인드랩에 로그인하고
                  <br />
                  검사 결과를 저장하세요
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 text-center">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Google Login */}
                <Button
                  onClick={() => handleOAuthLogin("google")}
                  variant="outline"
                  className="w-full py-6 text-base font-medium border-2 hover:bg-slate-50"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google로 계속하기
                </Button>

                {/* Kakao Login */}
                <Button
                  onClick={() => handleOAuthLogin("kakao")}
                  className="w-full py-6 text-base font-medium"
                  style={{ backgroundColor: "#FEE500", color: "#000000" }}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 01-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z" />
                  </svg>
                  카카오로 계속하기
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">
                  로그인하면 핏마인드랩의{" "}
                  <Link href="/terms" className="text-violet-600 hover:underline">
                    이용약관
                  </Link>
                  과{" "}
                  <Link href="/privacy" className="text-violet-600 hover:underline">
                    개인정보처리방침
                  </Link>
                  에 동의하게 됩니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              로그인 없이도 검사를 진행할 수 있습니다.
              <br />
              <Link href="/select-role" className="text-violet-600 hover:underline font-medium">
                검사 시작하기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
