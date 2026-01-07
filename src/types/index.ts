// 역할 타입
export type Role = 'manager' | 'operator' | 'trainer';

export const ROLE_LABELS: Record<Role, string> = {
  manager: '경영자',
  operator: '운영자',
  trainer: '트레이너',
};

// 도메인 타입
export type Domain = 'executing' | 'influencing' | 'relationship' | 'thinking';

export const DOMAIN_INFO: Record<Domain, { nameKo: string; color: string; bgColor: string }> = {
  executing: { nameKo: '실행력', color: '#8B5CF6', bgColor: 'bg-violet-500' },
  influencing: { nameKo: '영향력', color: '#F59E0B', bgColor: 'bg-amber-500' },
  relationship: { nameKo: '관계형성', color: '#3B82F6', bgColor: 'bg-blue-500' },
  thinking: { nameKo: '전략사고', color: '#10B981', bgColor: 'bg-emerald-500' },
};

// 강점 키워드 타입
export interface Keyword {
  id: number;
  nameKo: string;
  nameEn: string;
  domain: Domain;
  description: string;
  enhancementTips: string[];  // 강점 키우는 실행솔루션 (5가지)
  healingKeyword: string;     // 힐링 키워드 (회복에 도움되는 활동/방법)
  healingTips: string[];      // 힐링 키워드 활용 솔루션 (3가지)
  weaknessRisk: string;       // 약점일 때 비즈니스 리스크
  weaknessSolutions: string[]; // 약점 보완 솔루션 (2-3가지)
}

// 문항 타입
export type QuestionType = 'A' | 'B' | 'C';

export interface Question {
  id: number;
  keywordId: number;
  type: QuestionType;
  content: string;
}

// 검사 응답 타입
export interface Response {
  questionId: number;
  keywordId: number;
  type: QuestionType;
  score: number;
}

// 점수 계산 결과 타입
export interface KeywordScore {
  keywordId: number;
  keyword: Keyword;
  score: number;
}

export interface DomainScore {
  domain: Domain;
  score: number;
  percentage: number;
}

// 피트니스 유형 타입
export type FitnessTypeCode =
  | 'LONE_WOLF'
  | 'EMPIRE_BUILDER'
  | 'RESULT_MACHINE'
  | 'HEALING_MASTER'
  | 'CREATOR'
  | 'STRATEGIST'
  | 'MASTER_MENTOR'
  | 'ALL_ROUNDER';

export interface FitnessType {
  code: FitnessTypeCode;
  nameKo: string;
  icon: string;
  mainMessage: string;
  subMessages: string[];
  recommendedBusiness: string[];
  slogan: string;
  hashtags: string[];
}

// 결과 타입
export interface AssessmentResult {
  role: Role;
  fitnessType: FitnessType;
  topStrengths: KeywordScore[];
  domainScores: DomainScore[];
  allScores: KeywordScore[];
}
