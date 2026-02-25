import {
  Role, ThemeId, ThemeScore, DomainScore, Grade, Domain,
  LeadershipTypeId, LeadershipResult, WeightLevel,
  FreeResult, FullAssessmentResult,
  Response, RoleSubTypeResult, RoleSpecificResult,
} from '@/types';
import { THEME_MAP } from '@/data/themes';
import { ROLE_THEME_WEIGHTS, getMaxScore } from '@/data/role-weights';
import { LEADERSHIP_TYPES, getLeadershipCombo } from '@/data/leadership-types';

// ===== 등급 판정 =====
export function getGrade(score: number): Grade {
  if (score >= 90) return 'S';
  if (score >= 75) return 'A';
  if (score >= 55) return 'B';
  if (score >= 35) return 'C';
  if (score >= 20) return 'D';
  return 'E';
}

export const GRADE_INFO: Record<Grade, { label: string; color: string; bgColor: string }> = {
  S: { label: '이 역할에서 가장 강력한 무기', color: '#DC2626', bgColor: 'bg-red-500' },
  A: { label: '자주 발휘되는 핵심 강점', color: '#F97316', bgColor: 'bg-orange-500' },
  B: { label: '상황에 따라 발휘되는 강점', color: '#EAB308', bgColor: 'bg-yellow-500' },
  C: { label: '개발 가능한 영역', color: '#22C55E', bgColor: 'bg-green-500' },
  D: { label: '에너지를 많이 쓰는 영역', color: '#3B82F6', bgColor: 'bg-blue-500' },
  E: { label: '주의가 필요한 맹점', color: '#6B7280', bgColor: 'bg-gray-500' },
};

// ===== STEP 1: 테마별 점수 계산 =====
export function calculateThemeScores(
  role: Role,
  responses: Response[],
): ThemeScore[] {
  const weights = ROLE_THEME_WEIGHTS[role];
  const themeScores: ThemeScore[] = [];

  // 테마별 응답 그룹화 (보완 문항 제외)
  const responsesByTheme = new Map<ThemeId, number[]>();
  for (const r of responses) {
    if (r.isSupplementary) continue;
    const scores = responsesByTheme.get(r.themeId) || [];
    scores.push(r.score);
    responsesByTheme.set(r.themeId, scores);
  }

  // 각 테마 점수 계산
  for (const [themeId, weight] of Object.entries(weights) as [ThemeId, WeightLevel][]) {
    if (weight === 'excluded') continue;

    const theme = THEME_MAP[themeId];
    if (!theme) continue;

    const scores = responsesByTheme.get(themeId) || [];
    const rawScore = scores.reduce((sum, s) => sum + s, 0);
    const maxPossible = getMaxScore(weight);
    const standardizedScore = maxPossible > 0
      ? Math.round((rawScore / maxPossible) * 100)
      : 0;

    themeScores.push({
      themeId,
      nameKo: theme.nameKo,
      domain: theme.domain,
      rawScore,
      maxPossible,
      standardizedScore: Math.min(standardizedScore, 100),
      grade: getGrade(Math.min(standardizedScore, 100)),
      weight,
    });
  }

  // 랭킹용 보정 점수: light(1문항)는 신뢰도가 낮으므로 페널티 적용
  // 표시 점수(standardizedScore)는 그대로 유지, 정렬에만 영향
  const reliabilityBonus = (w: WeightLevel): number => {
    switch (w) {
      case 'core': return 3;      // 3문항 → +3점 보너스
      case 'standard': return 1;  // 2문항 → +1점 보너스
      case 'light': return -5;    // 1문항 → -5점 페널티
      default: return 0;
    }
  };

  return themeScores.sort((a, b) => {
    const aRank = a.standardizedScore + reliabilityBonus(a.weight);
    const bRank = b.standardizedScore + reliabilityBonus(b.weight);
    if (bRank !== aRank) return bRank - aRank;
    // 동점 시 문항 수가 많은 테마 우선
    return b.maxPossible - a.maxPossible;
  });
}

// ===== STEP 2: 도메인별 점수 계산 =====
export function calculateDomainScores(themeScores: ThemeScore[]): DomainScore[] {
  const domainMap = new Map<Domain, number[]>();

  for (const ts of themeScores) {
    const scores = domainMap.get(ts.domain) || [];
    scores.push(ts.standardizedScore);
    domainMap.set(ts.domain, scores);
  }

  const domainScores: DomainScore[] = [];
  let totalAvg = 0;

  for (const [domain, scores] of domainMap) {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    totalAvg += avg;
    domainScores.push({
      domain,
      averageScore: Math.round(avg * 10) / 10,
      percentage: 0,
      themeCount: scores.length,
    });
  }

  for (const ds of domainScores) {
    ds.percentage = totalAvg > 0
      ? Math.round((ds.averageScore / totalAvg) * 100)
      : 25;
  }

  return domainScores.sort((a, b) => b.averageScore - a.averageScore);
}

// ===== STEP 3: 리더십 유형 판정 =====
export function determineLeadershipType(
  domainScores: DomainScore[],
  themeScores: ThemeScore[],
): LeadershipTypeId {
  const domainToType: Record<Domain, LeadershipTypeId> = {
    thinking: 'vision',
    executing: 'execution',
    relationship: 'relationship',
    influencing: 'strategic',
  };

  const sorted = [...domainScores].sort((a, b) => b.averageScore - a.averageScore);
  const top = sorted[0];
  const second = sorted[1];

  // 동점(3점 이내) 시 S+A 등급 수로 판정
  if (second && Math.abs(top.averageScore - second.averageScore) <= 3) {
    const topSA = themeScores.filter(
      ts => ts.domain === top.domain && (ts.grade === 'S' || ts.grade === 'A')
    ).length;
    const secondSA = themeScores.filter(
      ts => ts.domain === second.domain && (ts.grade === 'S' || ts.grade === 'A')
    ).length;

    if (secondSA > topSA) {
      return domainToType[second.domain];
    }
  }

  return domainToType[top.domain];
}

// ===== STEP 4: 역할별 하위유형 판정 =====
export function determineRoleSubType(
  role: Role,
  supplementaryResponses: Response[],
  themeScores: ThemeScore[],
): string {
  const getSupp = (key: string): number => {
    const r = supplementaryResponses.find(s => s.questionId === key);
    return r?.score || 3;
  };

  const getThemeStd = (id: ThemeId): number => {
    return themeScores.find(t => t.themeId === id)?.standardizedScore || 50;
  };

  const s1 = getSupp('S1');

  switch (role) {
    case 'ceo': {
      if (s1 <= 2 && getThemeStd('vision') >= 75) return '지점확장형';
      if (s1 >= 4 && getThemeStd('communication') >= 75) return '온라인확장형';
      if (getThemeStd('influence') + getThemeStd('communication') >
          getThemeStd('vision') + getThemeStd('analysis')) return '브랜드형';
      return '전문화형';
    }
    case 'manager': {
      if (s1 <= 2 && getThemeStd('completion') >= 75) return '성과중심형';
      if (s1 >= 4 && getThemeStd('empathy') >= 75) return '관계중심형';
      if (getThemeStd('developer') >= 75) return '코칭중심형';
      return '시스템중심형';
    }
    case 'trainer': {
      if (s1 <= 2 && getThemeStd('execution') >= 75) return '밀어붙임형';
      if (s1 >= 4 && getThemeStd('empathy') >= 75) return '공감형';
      if (getThemeStd('analysis') >= 75) return '분석형';
      return '동기부여형';
    }
    case 'fc': {
      if (s1 <= 2 && getThemeStd('relator') >= 75) return '관계·신뢰형';
      if (s1 >= 4 && getThemeStd('analysis') >= 75) return '논리·데이터형';
      if (getThemeStd('positivity') >= 75) return '열정·에너지형';
      return '안정·신뢰형';
    }
  }
}

// ===== 등급 분포 =====
function calculateGradeDistribution(themeScores: ThemeScore[]): Record<Grade, number> {
  const dist: Record<Grade, number> = { S: 0, A: 0, B: 0, C: 0, D: 0, E: 0 };
  for (const ts of themeScores) {
    dist[ts.grade]++;
  }
  return dist;
}

// ===== 무료 결과 계산 =====
export function calculateFreeResults(
  role: Role,
  responses: Response[],
): FreeResult {
  const themeScores = calculateThemeScores(role, responses);
  const domainScores = calculateDomainScores(themeScores);
  const leadershipTypeId = determineLeadershipType(domainScores, themeScores);

  const supplementary = responses.filter(r => r.isSupplementary);
  const roleSubType = determineRoleSubType(role, supplementary, themeScores);

  const leadershipType = LEADERSHIP_TYPES[leadershipTypeId];
  const combo = getLeadershipCombo(role, leadershipTypeId);

  const leadership: LeadershipResult = {
    primaryType: leadershipTypeId,
    primaryTypeName: leadershipType.nameKo,
    roleSubType,
    role,
    combo: combo || {
      leadershipType: leadershipTypeId,
      role,
      comboTitle: leadershipType.nameKo,
      tagline: leadershipType.description,
      mainMessage: '',
      slogan: '',
      hashtags: [],
      viralQuotes: [],
      recommendedBusiness: [],
    },
  };

  return {
    leadership,
    top5: themeScores.slice(0, 5),
    domainScores,
    role,
  };
}

// ===== 전체 결과 계산 (프리미엄) =====
export function calculateFullResults(
  role: Role,
  responses: Response[],
): FullAssessmentResult {
  const freeResult = calculateFreeResults(role, responses);
  const themeScores = calculateThemeScores(role, responses);
  const gradeDistribution = calculateGradeDistribution(themeScores);
  const blindSpots = [...themeScores].reverse().slice(0, 5);

  const roleSubType = freeResult.leadership.roleSubType;

  const roleSubTypeDetail: RoleSubTypeResult = {
    typeName: roleSubType,
    description: `당신은 ${roleSubType} 유형의 ${freeResult.leadership.primaryTypeName} 리더입니다.`,
    shareQuote: `나는 ${roleSubType} 유형!`,
    strength: '',
    caution: '',
    actionTip: '',
  };

  const emptyResult: RoleSpecificResult = {
    title: '',
    typeName: '',
    description: '',
    shareQuote: '',
    actionTips: [],
  };

  // excluded 테마도 0점/E등급으로 추가하여 전체 30개 표시
  const weights = ROLE_THEME_WEIGHTS[role];
  const includedIds = new Set(themeScores.map(ts => ts.themeId));
  const excludedThemes: ThemeScore[] = [];
  for (const [themeId, weight] of Object.entries(weights) as [ThemeId, WeightLevel][]) {
    if (weight === 'excluded' && !includedIds.has(themeId)) {
      const theme = THEME_MAP[themeId];
      if (theme) {
        excludedThemes.push({
          themeId,
          nameKo: theme.nameKo,
          domain: theme.domain,
          rawScore: 0,
          maxPossible: 0,
          standardizedScore: 0,
          grade: 'E',
          weight,
        });
      }
    }
  }
  const allThemeScores = [...themeScores, ...excludedThemes];

  return {
    ...freeResult,
    allThemeScores,
    gradeDistribution,
    blindSpots,
    roleSubTypeDetail,
    roleResult11: emptyResult,
    roleResult12: emptyResult,
    roleResult13: emptyResult,
  };
}
