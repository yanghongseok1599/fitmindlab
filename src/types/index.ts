// ===== 역할 =====
export type Role = 'ceo' | 'manager' | 'trainer' | 'fc';

export const ROLE_LABELS: Record<Role, string> = {
  ceo: '대표',
  manager: '관리자',
  trainer: '강사·트레이너',
  fc: 'FC',
};

// ===== 역할 정보 =====
export interface RoleInfo {
  id: Role;
  nameKo: string;
  nameEn: string;
  emoji: string;
  color: string;
  bgGradient: string;
  description: string;
}

// ===== 도메인 =====
export type Domain = 'thinking' | 'executing' | 'influencing' | 'relationship';

export const DOMAIN_INFO: Record<Domain, { nameKo: string; color: string; bgColor: string; emoji: string }> = {
  thinking:     { nameKo: '전략사고', color: '#10B981', bgColor: 'bg-emerald-500', emoji: '🟢' },
  executing:    { nameKo: '실행력',   color: '#8B5CF6', bgColor: 'bg-violet-500',  emoji: '🟣' },
  influencing:  { nameKo: '영향력',   color: '#F59E0B', bgColor: 'bg-amber-500',   emoji: '🟠' },
  relationship: { nameKo: '관계형성', color: '#3B82F6', bgColor: 'bg-blue-500',    emoji: '🔵' },
};

// ===== 30개 테마 =====
export type ThemeId =
  // 전략사고 (6)
  | 'vision' | 'strategy' | 'analysis' | 'ideation' | 'input' | 'intellection'
  // 실행력 (9)
  | 'execution' | 'focus' | 'discipline' | 'arranger' | 'completion'
  | 'deliberative' | 'restorative' | 'adaptability' | 'maximizer'
  // 영향력 (5)
  | 'command' | 'selfAssurance' | 'influence' | 'communication' | 'activator'
  // 관계형성 (10)
  | 'empathy' | 'individualization' | 'relator' | 'harmony' | 'connectedness'
  | 'includer' | 'positivity' | 'developer' | 'belief' | 'fairness';

// ===== 가중 등급 =====
export type WeightLevel = 'core' | 'standard' | 'light' | 'excluded';

// ===== 등급 =====
export type Grade = 'S' | 'A' | 'B' | 'C' | 'D' | 'E';

// ===== 문항 =====
export type QuestionType = 'A' | 'B' | 'C';

export interface Question {
  id: string;
  themeId: ThemeId;
  questionType: QuestionType;
  text: string;
  isSupplementary?: boolean;
  supplementaryKey?: string;
}

export interface Response {
  questionId: string;
  themeId: ThemeId;
  questionType: QuestionType;
  score: number;
  isSupplementary?: boolean;
}

// ===== 테마 정의 =====
export interface Theme {
  id: ThemeId;
  nameKo: string;
  nameEn: string;
  domain: Domain;
  description: string;
  roleMessages: Partial<Record<Role, string>>;
  strengthTip: string;
  weaknessTip: string;
}

// ===== 점수 =====
export interface ThemeScore {
  themeId: ThemeId;
  nameKo: string;
  domain: Domain;
  rawScore: number;
  maxPossible: number;
  standardizedScore: number;
  grade: Grade;
  weight: WeightLevel;
}

export interface DomainScore {
  domain: Domain;
  averageScore: number;
  percentage: number;
  themeCount: number;
}

// ===== 리더십 유형 =====
export type LeadershipTypeId = 'vision' | 'execution' | 'relationship' | 'strategic';

export interface LeadershipTypeInfo {
  id: LeadershipTypeId;
  nameKo: string;
  color: string;
  gradient: string;
  emoji: string;
  icon: string;
  domainMapping: Domain;
  description: string;
}

export interface LeadershipCombo {
  leadershipType: LeadershipTypeId;
  role: Role;
  comboTitle: string;
  tagline: string;
  mainMessage: string;
  slogan: string;
  hashtags: string[];
  viralQuotes: string[];
  recommendedBusiness: string[];
  image?: string;
}

export interface LeadershipResult {
  primaryType: LeadershipTypeId;
  primaryTypeName: string;
  roleSubType: string;
  role: Role;
  combo: LeadershipCombo;
}

// ===== 결과 =====
export interface FreeResult {
  leadership: LeadershipResult;
  top5: ThemeScore[];
  domainScores: DomainScore[];
  role: Role;
}

export interface RoleSubTypeResult {
  typeName: string;
  description: string;
  shareQuote: string;
  strength: string;
  caution: string;
  actionTip: string;
}

export interface RoleSpecificResult {
  title: string;
  typeName: string;
  description: string;
  shareQuote: string;
  actionTips: string[];
}

export interface FullAssessmentResult extends FreeResult {
  allThemeScores: ThemeScore[];
  gradeDistribution: Record<Grade, number>;
  blindSpots: ThemeScore[];
  roleSubTypeDetail: RoleSubTypeResult;
  roleResult11: RoleSpecificResult;
  roleResult12: RoleSpecificResult;
  roleResult13: RoleSpecificResult;
}
