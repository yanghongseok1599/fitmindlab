"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// 힐링마스터 유형이 나오는 테스트용 목업 데이터
// 조건: TOP5에 공감(22) + (성장지원(21) 또는 긍정(26)) + 관계형성 도메인 2개 이상
const mockResponses = [
  // 핵심 키워드 - 높은 점수
  { questionId: 1, keywordId: 22, type: "A", score: 5 },  // 공감 (relationship) - 필수
  { questionId: 2, keywordId: 26, type: "A", score: 5 },  // 긍정 (relationship) - 필수
  { questionId: 3, keywordId: 21, type: "A", score: 5 },  // 성장지원 (relationship)
  { questionId: 4, keywordId: 24, type: "A", score: 5 },  // 포용 (relationship)
  { questionId: 5, keywordId: 27, type: "A", score: 4 },  // 관계 (relationship)
  // 나머지 - 중간 점수
  { questionId: 6, keywordId: 19, type: "A", score: 3 },  // 적응
  { questionId: 7, keywordId: 20, type: "A", score: 3 },  // 연결성
  { questionId: 8, keywordId: 23, type: "A", score: 3 },  // 화합
  { questionId: 9, keywordId: 25, type: "A", score: 3 },  // 개별화
  { questionId: 10, keywordId: 1, type: "A", score: 2 },  // 성취
  { questionId: 11, keywordId: 2, type: "A", score: 2 },  // 정리
  { questionId: 12, keywordId: 3, type: "A", score: 2 },  // 신념
  { questionId: 13, keywordId: 4, type: "A", score: 2 },  // 일관성
  { questionId: 14, keywordId: 5, type: "A", score: 2 },  // 심사숙고
  { questionId: 15, keywordId: 6, type: "A", score: 2 },  // 체계
  { questionId: 16, keywordId: 7, type: "A", score: 2 },  // 집중
  { questionId: 17, keywordId: 8, type: "A", score: 2 },  // 책임
  { questionId: 18, keywordId: 9, type: "A", score: 2 },  // 복구
  { questionId: 19, keywordId: 10, type: "A", score: 2 }, // 활성화
  { questionId: 20, keywordId: 11, type: "A", score: 2 }, // 주도력
  { questionId: 21, keywordId: 12, type: "A", score: 2 }, // 소통
  { questionId: 22, keywordId: 13, type: "A", score: 2 }, // 경쟁
  { questionId: 23, keywordId: 14, type: "A", score: 2 }, // 최상화
  { questionId: 24, keywordId: 15, type: "A", score: 2 }, // 자기확신
  { questionId: 25, keywordId: 16, type: "A", score: 2 }, // 존재감
  { questionId: 26, keywordId: 17, type: "A", score: 2 }, // 사교성
  { questionId: 27, keywordId: 18, type: "A", score: 2 }, // 설득
  { questionId: 28, keywordId: 28, type: "A", score: 2 }, // 분석
  { questionId: 29, keywordId: 29, type: "A", score: 2 }, // 맥락
  { questionId: 30, keywordId: 30, type: "A", score: 2 }, // 미래지향
  { questionId: 31, keywordId: 31, type: "A", score: 2 }, // 발상
  { questionId: 32, keywordId: 32, type: "A", score: 2 }, // 수집
  { questionId: 33, keywordId: 33, type: "A", score: 2 }, // 지적사고
  { questionId: 34, keywordId: 34, type: "A", score: 2 }, // 배움
  { questionId: 35, keywordId: 35, type: "A", score: 2 }, // 전략
  { questionId: 36, keywordId: 36, type: "A", score: 2 }, // 비전제시
];

export default function TestResultPage() {
  const router = useRouter();

  useEffect(() => {
    // 프리미엄 결제 상태 설정
    sessionStorage.setItem("premiumPaid", "true");

    // 테스트 데이터를 sessionStorage에 저장 (프리미엄용)
    sessionStorage.setItem("premiumResponses", JSON.stringify(mockResponses));
    sessionStorage.setItem("premiumRole", "manager"); // manager, operator, trainer 중 선택

    // 프리미엄 결과 페이지로 리다이렉트
    router.push("/premium-results");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-slate-600">프리미엄 결과 페이지로 이동 중...</p>
    </div>
  );
}
