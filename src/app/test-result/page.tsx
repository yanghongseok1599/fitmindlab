"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Response } from "@/types";

// 테스트용 목업 데이터 - 비전형(전략사고 도메인 1위) + 대표 → 제국 건설자
const mockResponses: Response[] = [
  // ===== 전략사고 (Thinking) - 최고 점수 (비전형이 나오도록) =====
  // vision (core=3문항)
  { questionId: 'vision_A', themeId: 'vision', questionType: 'A', score: 5 },
  { questionId: 'vision_B', themeId: 'vision', questionType: 'B', score: 5 },
  { questionId: 'vision_C', themeId: 'vision', questionType: 'C', score: 5 },
  // strategy (core=3문항)
  { questionId: 'strategy_A', themeId: 'strategy', questionType: 'A', score: 5 },
  { questionId: 'strategy_B', themeId: 'strategy', questionType: 'B', score: 5 },
  { questionId: 'strategy_C', themeId: 'strategy', questionType: 'C', score: 4 },
  // analysis (standard=2문항)
  { questionId: 'analysis_A', themeId: 'analysis', questionType: 'A', score: 5 },
  { questionId: 'analysis_B', themeId: 'analysis', questionType: 'B', score: 4 },
  // ideation (core=3문항)
  { questionId: 'ideation_A', themeId: 'ideation', questionType: 'A', score: 5 },
  { questionId: 'ideation_B', themeId: 'ideation', questionType: 'B', score: 5 },
  { questionId: 'ideation_C', themeId: 'ideation', questionType: 'C', score: 4 },
  // input (standard=2문항)
  { questionId: 'input_A', themeId: 'input', questionType: 'A', score: 4 },
  { questionId: 'input_B', themeId: 'input', questionType: 'B', score: 4 },
  // intellection (standard=2문항)
  { questionId: 'intellection_A', themeId: 'intellection', questionType: 'A', score: 4 },
  { questionId: 'intellection_B', themeId: 'intellection', questionType: 'B', score: 4 },

  // ===== 실행력 (Executing) - 중간 점수 =====
  // execution (core=3문항)
  { questionId: 'execution_A', themeId: 'execution', questionType: 'A', score: 4 },
  { questionId: 'execution_B', themeId: 'execution', questionType: 'B', score: 3 },
  { questionId: 'execution_C', themeId: 'execution', questionType: 'C', score: 3 },
  // focus (standard=2문항)
  { questionId: 'focus_A', themeId: 'focus', questionType: 'A', score: 3 },
  { questionId: 'focus_B', themeId: 'focus', questionType: 'B', score: 3 },
  // discipline (light=1문항)
  { questionId: 'discipline_A', themeId: 'discipline', questionType: 'A', score: 3 },
  // arranger (standard=2문항)
  { questionId: 'arranger_A', themeId: 'arranger', questionType: 'A', score: 3 },
  { questionId: 'arranger_B', themeId: 'arranger', questionType: 'B', score: 2 },
  // completion (standard=2문항)
  { questionId: 'completion_A', themeId: 'completion', questionType: 'A', score: 3 },
  { questionId: 'completion_B', themeId: 'completion', questionType: 'B', score: 2 },
  // deliberative (standard=2문항)
  { questionId: 'deliberative_A', themeId: 'deliberative', questionType: 'A', score: 2 },
  { questionId: 'deliberative_B', themeId: 'deliberative', questionType: 'B', score: 2 },
  // restorative (standard=2문항)
  { questionId: 'restorative_A', themeId: 'restorative', questionType: 'A', score: 2 },
  { questionId: 'restorative_B', themeId: 'restorative', questionType: 'B', score: 2 },
  // adaptability (standard=2문항)
  { questionId: 'adaptability_A', themeId: 'adaptability', questionType: 'A', score: 2 },
  { questionId: 'adaptability_B', themeId: 'adaptability', questionType: 'B', score: 2 },

  // ===== 영향력 (Influencing) - 중하 점수 =====
  // maximizer (core=3문항)
  { questionId: 'maximizer_A', themeId: 'maximizer', questionType: 'A', score: 3 },
  { questionId: 'maximizer_B', themeId: 'maximizer', questionType: 'B', score: 3 },
  { questionId: 'maximizer_C', themeId: 'maximizer', questionType: 'C', score: 2 },
  // command (core=3문항)
  { questionId: 'command_A', themeId: 'command', questionType: 'A', score: 3 },
  { questionId: 'command_B', themeId: 'command', questionType: 'B', score: 2 },
  { questionId: 'command_C', themeId: 'command', questionType: 'C', score: 2 },
  // selfAssurance (core=3문항)
  { questionId: 'selfAssurance_A', themeId: 'selfAssurance', questionType: 'A', score: 3 },
  { questionId: 'selfAssurance_B', themeId: 'selfAssurance', questionType: 'B', score: 2 },
  { questionId: 'selfAssurance_C', themeId: 'selfAssurance', questionType: 'C', score: 2 },
  // influence (core=3문항)
  { questionId: 'influence_A', themeId: 'influence', questionType: 'A', score: 3 },
  { questionId: 'influence_B', themeId: 'influence', questionType: 'B', score: 2 },
  { questionId: 'influence_C', themeId: 'influence', questionType: 'C', score: 2 },
  // communication (standard=2문항)
  { questionId: 'communication_A', themeId: 'communication', questionType: 'A', score: 3 },
  { questionId: 'communication_B', themeId: 'communication', questionType: 'B', score: 2 },
  // activator (core=3문항)
  { questionId: 'activator_A', themeId: 'activator', questionType: 'A', score: 2 },
  { questionId: 'activator_B', themeId: 'activator', questionType: 'B', score: 2 },
  { questionId: 'activator_C', themeId: 'activator', questionType: 'C', score: 2 },

  // ===== 관계 구축 (Relationship) - 낮은 점수 =====
  // empathy (standard=2문항)
  { questionId: 'empathy_A', themeId: 'empathy', questionType: 'A', score: 2 },
  { questionId: 'empathy_B', themeId: 'empathy', questionType: 'B', score: 2 },
  // individualization (standard=2문항)
  { questionId: 'individualization_A', themeId: 'individualization', questionType: 'A', score: 2 },
  { questionId: 'individualization_B', themeId: 'individualization', questionType: 'B', score: 2 },
  // relator (light=1문항)
  { questionId: 'relator_A', themeId: 'relator', questionType: 'A', score: 2 },
  // harmony (light=1문항)
  { questionId: 'harmony_A', themeId: 'harmony', questionType: 'A', score: 2 },
  // connectedness (standard=2문항)
  { questionId: 'connectedness_A', themeId: 'connectedness', questionType: 'A', score: 2 },
  { questionId: 'connectedness_B', themeId: 'connectedness', questionType: 'B', score: 2 },
  // includer (light=1문항)
  { questionId: 'includer_A', themeId: 'includer', questionType: 'A', score: 2 },
  // positivity (standard=2문항)
  { questionId: 'positivity_A', themeId: 'positivity', questionType: 'A', score: 2 },
  { questionId: 'positivity_B', themeId: 'positivity', questionType: 'B', score: 2 },
  // developer (core=3문항)
  { questionId: 'developer_A', themeId: 'developer', questionType: 'A', score: 3 },
  { questionId: 'developer_B', themeId: 'developer', questionType: 'B', score: 2 },
  { questionId: 'developer_C', themeId: 'developer', questionType: 'C', score: 2 },
  // belief (core=3문항)
  { questionId: 'belief_A', themeId: 'belief', questionType: 'A', score: 2 },
  { questionId: 'belief_B', themeId: 'belief', questionType: 'B', score: 2 },
  { questionId: 'belief_C', themeId: 'belief', questionType: 'C', score: 2 },
  // fairness (light=1문항)
  { questionId: 'fairness_A', themeId: 'fairness', questionType: 'A', score: 2 },

  // ===== 보완 문항 =====
  { questionId: 'S1', themeId: 'vision', questionType: 'A', score: 5, isSupplementary: true },
  { questionId: 'S2', themeId: 'vision', questionType: 'A', score: 4, isSupplementary: true },
  { questionId: 'S3', themeId: 'vision', questionType: 'A', score: 4, isSupplementary: true },
  { questionId: 'S4', themeId: 'vision', questionType: 'A', score: 3, isSupplementary: true },
];

export default function TestResultPage() {
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem("premiumPaid", "true");
    sessionStorage.setItem("assessmentResponses", JSON.stringify(mockResponses));
    sessionStorage.setItem("assessmentRole", "ceo");
    router.push("/results");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-slate-600">FC 결과 페이지로 이동 중...</p>
    </div>
  );
}
