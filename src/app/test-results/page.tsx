'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { buildQuestionsForRole } from '@/lib/question-builder';
import { Role } from '@/types';

function TestResultsInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const role = (searchParams.get('role') || 'trainer') as Role;
    // bias: which domain to boost (thinking/executing/influencing/relationship)
    const bias = searchParams.get('bias') || 'executing';

    const questions = buildQuestionsForRole(role);

    // Domain mapping for themes
    const domainMap: Record<string, string> = {
      vision: 'thinking', strategy: 'thinking', analysis: 'thinking',
      learning: 'thinking', ideation: 'thinking', context: 'thinking',
      future: 'thinking', deliberation: 'thinking',
      execution: 'executing', discipline: 'executing', focus: 'executing',
      responsibility: 'executing', arrangement: 'executing', restoration: 'executing',
      completion: 'executing',
      communication: 'influencing', command: 'influencing', confidence: 'influencing',
      influence: 'influencing', maximizing: 'influencing', activation: 'influencing',
      competition: 'influencing',
      empathy: 'relationship', adaptability: 'relationship', connection: 'relationship',
      harmony: 'relationship', positivity: 'relationship', individualization: 'relationship',
      inclusion: 'relationship', fairness: 'relationship', growth: 'relationship',
    };

    const responses = questions.map((q) => {
      const domain = domainMap[q.themeId] || 'executing';
      let score = 3; // default neutral

      if (domain === bias) {
        score = 5; // high score for biased domain
      } else if (domain === 'executing' && bias !== 'executing') {
        score = 2;
      }

      return {
        questionId: q.id,
        themeId: q.themeId,
        questionType: q.questionType,
        score,
        isSupplementary: q.isSupplementary || false,
      };
    });

    sessionStorage.setItem('assessmentResponses', JSON.stringify(responses));
    sessionStorage.setItem('assessmentRole', role);

    router.push('/results');
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">테스트 데이터 생성 중...</p>
    </div>
  );
}

export default function TestResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>로딩 중...</p></div>}>
      <TestResultsInner />
    </Suspense>
  );
}
