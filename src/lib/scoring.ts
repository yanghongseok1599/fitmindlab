import { keywords, getKeywordById } from '@/data/keywords';
import { fitnessTypes } from '@/data/fitness-types';
import {
  Response,
  KeywordScore,
  DomainScore,
  Domain,
  FitnessType,
  FitnessTypeCode,
  Role,
  DOMAIN_INFO,
} from '@/types';

// 키워드별 점수 계산
export function calculateKeywordScores(responses: Response[]): KeywordScore[] {
  const scoreMap = new Map<number, number[]>();

  // 키워드별로 점수 그룹화
  responses.forEach((response) => {
    const scores = scoreMap.get(response.keywordId) || [];
    scores.push(response.score);
    scoreMap.set(response.keywordId, scores);
  });

  // 각 키워드별 평균 점수 계산
  const keywordScores: KeywordScore[] = [];
  scoreMap.forEach((scores, keywordId) => {
    const keyword = getKeywordById(keywordId);
    if (keyword) {
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      keywordScores.push({
        keywordId,
        keyword,
        score: Math.round(avgScore * 100) / 100,
      });
    }
  });

  // 점수 내림차순 정렬
  return keywordScores.sort((a, b) => b.score - a.score);
}

// 도메인별 점수 계산
export function calculateDomainScores(keywordScores: KeywordScore[]): DomainScore[] {
  const domainScoreMap: Record<Domain, number[]> = {
    executing: [],
    influencing: [],
    relationship: [],
    thinking: [],
  };

  // 도메인별로 점수 그룹화
  keywordScores.forEach((ks) => {
    domainScoreMap[ks.keyword.domain].push(ks.score);
  });

  // 각 도메인별 평균 점수 계산
  const domainScores: DomainScore[] = [];
  let totalScore = 0;

  Object.entries(domainScoreMap).forEach(([domain, scores]) => {
    if (scores.length > 0) {
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      totalScore += avgScore;
      domainScores.push({
        domain: domain as Domain,
        score: Math.round(avgScore * 100) / 100,
        percentage: 0, // 나중에 계산
      });
    }
  });

  // 비율 계산
  domainScores.forEach((ds) => {
    ds.percentage = Math.round((ds.score / totalScore) * 100);
  });

  return domainScores.sort((a, b) => b.score - a.score);
}

// 유형 판정 로직
export function determineFitnessType(
  topStrengths: KeywordScore[],
  domainScores: DomainScore[],
  role: Role
): FitnessType {
  const top5Keywords = topStrengths.slice(0, 5).map((s) => s.keyword.nameKo);
  const top5Domains = topStrengths.slice(0, 5).map((s) => s.keyword.domain);

  // 도메인별 TOP5 내 개수
  const domainCounts: Record<Domain, number> = {
    executing: 0,
    influencing: 0,
    relationship: 0,
    thinking: 0,
  };
  top5Domains.forEach((d) => {
    domainCounts[d]++;
  });

  // 유형 판정 (우선순위 순)

  // 1. 론울프: 개별화 + 공감 + 관계형성 3개 이상
  if (
    top5Keywords.includes('개별화') &&
    top5Keywords.includes('공감') &&
    domainCounts.relationship >= 3
  ) {
    return fitnessTypes.LONE_WOLF;
  }

  // 2. 제국건설자: 주도력 + 비전제시 + 영향력 3개 이상
  if (
    top5Keywords.includes('주도력') &&
    (top5Keywords.includes('비전제시') || top5Keywords.includes('전략')) &&
    domainCounts.influencing >= 2
  ) {
    return fitnessTypes.EMPIRE_BUILDER;
  }

  // 3. 결과머신: 성취 + 경쟁 + 집중
  if (
    top5Keywords.includes('성취') &&
    (top5Keywords.includes('경쟁') || top5Keywords.includes('집중')) &&
    domainCounts.executing >= 2
  ) {
    return fitnessTypes.RESULT_MACHINE;
  }

  // 4. 힐링마스터: 공감 + 성장지원 + 긍정
  if (
    top5Keywords.includes('공감') &&
    (top5Keywords.includes('성장지원') || top5Keywords.includes('긍정')) &&
    domainCounts.relationship >= 2
  ) {
    return fitnessTypes.HEALING_MASTER;
  }

  // 5. 크리에이터: 발상 + 소통 + 미래지향
  if (
    top5Keywords.includes('발상') ||
    (top5Keywords.includes('소통') && top5Keywords.includes('미래지향'))
  ) {
    return fitnessTypes.CREATOR;
  }

  // 6. 전략분석가: 분석 + 전략 + 체계
  if (
    top5Keywords.includes('분석') ||
    (top5Keywords.includes('전략') && top5Keywords.includes('체계'))
  ) {
    return fitnessTypes.STRATEGIST;
  }

  // 7. 멘토장인: 성장지원 + 배움 + 개별화
  if (
    top5Keywords.includes('성장지원') &&
    (top5Keywords.includes('배움') || top5Keywords.includes('개별화'))
  ) {
    return fitnessTypes.MASTER_MENTOR;
  }

  // 8. 올라운더: 4개 도메인이 고르게 분포
  const maxDomain = Math.max(...Object.values(domainCounts));
  if (maxDomain <= 2) {
    return fitnessTypes.ALL_ROUNDER;
  }

  // 기본값: 도메인별 대표 유형
  const topDomain = domainScores[0]?.domain;
  switch (topDomain) {
    case 'executing':
      return fitnessTypes.RESULT_MACHINE;
    case 'influencing':
      return fitnessTypes.EMPIRE_BUILDER;
    case 'relationship':
      return fitnessTypes.HEALING_MASTER;
    case 'thinking':
      return fitnessTypes.STRATEGIST;
    default:
      return fitnessTypes.ALL_ROUNDER;
  }
}

// 전체 결과 계산
export function calculateResults(responses: Response[], role: Role) {
  const keywordScores = calculateKeywordScores(responses);
  const domainScores = calculateDomainScores(keywordScores);
  const topStrengths = keywordScores.slice(0, 5);
  const fitnessType = determineFitnessType(topStrengths, domainScores, role);

  return {
    role,
    fitnessType,
    topStrengths,
    domainScores,
    allScores: keywordScores,
  };
}
