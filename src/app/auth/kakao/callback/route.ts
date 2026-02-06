import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const KAKAO_CLIENT_ID = "776bf3f1f78decd3b20fbcf4c544641c";
const KAKAO_CLIENT_SECRET = "AXQdpMu8Up0GMR5v7mf0AAn9tsysNsfK";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state"); // callbackUrl이 저장됨
  const next = state ? decodeURIComponent(state) : "/select-role";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

  try {
    // 1. 카카오 토큰 교환
    const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: KAKAO_CLIENT_ID,
        client_secret: KAKAO_CLIENT_SECRET,
        redirect_uri: `${origin}/auth/kakao/callback`,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      console.error("Kakao token error:", await tokenResponse.text());
      return NextResponse.redirect(`${origin}/login?error=token_failed`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. 카카오 사용자 정보 가져오기
    const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      console.error("Kakao user error:", await userResponse.text());
      return NextResponse.redirect(`${origin}/login?error=user_failed`);
    }

    const kakaoUser = await userResponse.json();
    const kakaoId = kakaoUser.id.toString();
    const nickname = kakaoUser.properties?.nickname || "사용자";
    const profileImage = kakaoUser.properties?.profile_image || null;

    // 3. Supabase 사용자 생성/로그인
    const supabase = await createClient();

    // 카카오 ID 기반으로 이메일 생성 (Supabase는 이메일 필수)
    const email = `kakao_${kakaoId}@fitmindlab.local`;
    // 비밀번호는 카카오 ID + 시크릿으로 생성 (예측 불가능하게)
    const password = `kakao_${kakaoId}_${KAKAO_CLIENT_SECRET.substring(0, 8)}`;

    // 먼저 로그인 시도
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      // 로그인 실패 시 회원가입 시도
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: nickname,
            avatar_url: profileImage,
            provider: "kakao",
            kakao_id: kakaoId,
          },
        },
      });

      if (signUpError) {
        console.error("Supabase signup error:", signUpError);
        return NextResponse.redirect(`${origin}/login?error=signup_failed`);
      }
    }

    // 로그인 성공 - 리다이렉트
    return NextResponse.redirect(`${origin}${next}`);
  } catch (error) {
    console.error("Kakao callback error:", error);
    return NextResponse.redirect(`${origin}/login?error=unknown`);
  }
}
