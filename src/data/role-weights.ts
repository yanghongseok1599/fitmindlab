import { Role, ThemeId, WeightLevel } from '@/types';

/**
 * 역할별 테마 가중치 매트릭스 (알고리즘 문서 Table 3)
 *
 * WeightLevel에 따른 출제 문항 수:
 *   - core: 3문항 (최대 15점)
 *   - standard: 2문항 (최대 10점)
 *   - light: 1문항 (최대 5점)
 *   - excluded: 0문항 (미출제)
 */

// ─────────────────────────────────────────────
// 대표 (CEO) 🔴
// ─────────────────────────────────────────────
const ceoWeights: Record<ThemeId, WeightLevel> = {
  // 전략적 사고 (Strategic Thinking)
  vision: 'core',
  strategy: 'core',
  analysis: 'standard',
  ideation: 'core',
  input: 'standard',
  intellection: 'standard',

  // 실행력 (Executing)
  execution: 'core',
  focus: 'standard',
  discipline: 'light',
  arranger: 'standard',
  completion: 'standard',
  deliberative: 'standard',
  restorative: 'standard',
  adaptability: 'standard',

  // 영향력 (Influencing)
  maximizer: 'core',
  command: 'core',
  selfAssurance: 'core',
  influence: 'core',
  communication: 'standard',
  activator: 'core',

  // 관계 구축 (Relationship Building)
  empathy: 'standard',
  individualization: 'standard',
  relator: 'light',
  harmony: 'light',
  connectedness: 'standard',
  includer: 'light',
  positivity: 'standard',
  developer: 'core',
  belief: 'core',
  fairness: 'light',
};

// ─────────────────────────────────────────────
// 관리자 (Manager) 🔵
// ─────────────────────────────────────────────
const managerWeights: Record<ThemeId, WeightLevel> = {
  // 전략적 사고 (Strategic Thinking)
  vision: 'standard',
  strategy: 'standard',
  analysis: 'core',
  ideation: 'light',
  input: 'light',
  intellection: 'light',

  // 실행력 (Executing)
  execution: 'core',
  focus: 'standard',
  discipline: 'core',
  arranger: 'core',
  completion: 'core',
  deliberative: 'standard',
  restorative: 'core',
  adaptability: 'standard',

  // 영향력 (Influencing)
  maximizer: 'standard',
  command: 'core',
  selfAssurance: 'standard',
  influence: 'standard',
  communication: 'core',
  activator: 'standard',

  // 관계 구축 (Relationship Building)
  empathy: 'core',
  individualization: 'core',
  relator: 'standard',
  harmony: 'core',
  connectedness: 'excluded',
  includer: 'standard',
  positivity: 'standard',
  developer: 'core',
  belief: 'standard',
  fairness: 'core',
};

// ─────────────────────────────────────────────
// 강사·트레이너 (Trainer) 🟢
// ─────────────────────────────────────────────
const trainerWeights: Record<ThemeId, WeightLevel> = {
  // 전략적 사고 (Strategic Thinking)
  vision: 'light',
  strategy: 'light',
  analysis: 'standard',
  ideation: 'standard',
  input: 'standard',
  intellection: 'standard',

  // 실행력 (Executing)
  execution: 'standard',
  focus: 'standard',
  discipline: 'standard',
  arranger: 'light',
  completion: 'core',
  deliberative: 'standard',
  restorative: 'core',
  adaptability: 'core',

  // 영향력 (Influencing)
  maximizer: 'core',
  command: 'light',
  selfAssurance: 'standard',
  influence: 'standard',
  communication: 'core',
  activator: 'light',

  // 관계 구축 (Relationship Building)
  empathy: 'core',
  individualization: 'core',
  relator: 'core',
  harmony: 'standard',
  connectedness: 'standard',
  includer: 'standard',
  positivity: 'core',
  developer: 'core',
  belief: 'standard',
  fairness: 'standard',
};

// ─────────────────────────────────────────────
// FC (Fitness Consultant) 🟡
// ─────────────────────────────────────────────
const fcWeights: Record<ThemeId, WeightLevel> = {
  // 전략적 사고 (Strategic Thinking)
  vision: 'standard',
  strategy: 'standard',
  analysis: 'standard',
  ideation: 'standard',
  input: 'light',
  intellection: 'excluded',

  // 실행력 (Executing)
  execution: 'core',
  focus: 'standard',
  discipline: 'light',
  arranger: 'light',
  completion: 'standard',
  deliberative: 'light',
  restorative: 'standard',
  adaptability: 'core',

  // 영향력 (Influencing)
  maximizer: 'standard',
  command: 'standard',
  selfAssurance: 'core',
  influence: 'core',
  communication: 'core',
  activator: 'core',

  // 관계 구축 (Relationship Building)
  empathy: 'core',
  individualization: 'core',
  relator: 'core',
  harmony: 'standard',
  connectedness: 'core',
  includer: 'standard',
  positivity: 'core',
  developer: 'excluded',
  belief: 'standard',
  fairness: 'light',
};

// ─────────────────────────────────────────────
// Export: 역할별 테마 가중치 매트릭스
// ─────────────────────────────────────────────
export const ROLE_THEME_WEIGHTS: Record<Role, Record<ThemeId, WeightLevel>> = {
  ceo: ceoWeights,
  manager: managerWeights,
  trainer: trainerWeights,
  fc: fcWeights,
};

// ─────────────────────────────────────────────
// 유틸리티 함수
// ─────────────────────────────────────────────

/**
 * 가중치 레벨에 따른 출제 문항 수 반환
 * @param weight - 가중치 레벨
 * @returns 출제 문항 수 (core→3, standard→2, light→1, excluded→0)
 */
export function getQuestionCount(weight: WeightLevel): number {
  switch (weight) {
    case 'core':
      return 3;
    case 'standard':
      return 2;
    case 'light':
      return 1;
    case 'excluded':
      return 0;
  }
}

/**
 * 가중치 레벨에 따른 최대 점수 반환 (문항당 5점 기준)
 * @param weight - 가중치 레벨
 * @returns 최대 점수 (core→15, standard→10, light→5, excluded→0)
 */
export function getMaxScore(weight: WeightLevel): number {
  switch (weight) {
    case 'core':
      return 15;
    case 'standard':
      return 10;
    case 'light':
      return 5;
    case 'excluded':
      return 0;
  }
}

/**
 * 역할별 기본 출제 문항 총수 반환
 * 모든 테마의 문항 수 합산
 * @param role - 역할 ID
 * @returns 기본 출제 문항 총수
 */
export function getTotalBaseQuestions(role: Role): number {
  const weights = ROLE_THEME_WEIGHTS[role];
  return Object.values(weights).reduce(
    (total, weight) => total + getQuestionCount(weight),
    0
  );
}

/**
 * 역할별 보충 문항 수 반환
 * 대표: 2문항, 관리자/트레이너/FC: 4문항
 * @param role - 역할 ID
 * @returns 보충 문항 수
 */
export function getSupplementaryCount(role: Role): number {
  switch (role) {
    case 'ceo':
      return 2;
    case 'manager':
      return 4;
    case 'trainer':
      return 4;
    case 'fc':
      return 4;
  }
}
