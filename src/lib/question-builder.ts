import { Role, ThemeId, Question, QuestionType, WeightLevel } from '@/types';
import { ROLE_THEME_WEIGHTS, getQuestionCount } from '@/data/role-weights';
import { THEME_QUESTIONS, SUPPLEMENTARY_QUESTIONS } from '@/data/questions';
import { THEMES } from '@/data/themes';

// 역할별 문항 리스트 생성
export function buildQuestionsForRole(role: Role): Question[] {
  const weights = ROLE_THEME_WEIGHTS[role];
  const questions: Question[] = [];

  // 테마 순서대로 문항 추가
  for (const theme of THEMES) {
    const weight = weights[theme.id];
    if (weight === 'excluded') continue;

    const themeQ = THEME_QUESTIONS.find(tq => tq.themeId === theme.id);
    if (!themeQ) continue;

    const count = getQuestionCount(weight);

    // Type A (항상 포함)
    if (count >= 1 && themeQ.questions.A[role]) {
      questions.push({
        id: `${theme.id}_A`,
        themeId: theme.id,
        questionType: 'A',
        text: themeQ.questions.A[role],
      });
    }

    // Type B (보통 이상)
    if (count >= 2 && themeQ.questions.B[role]) {
      questions.push({
        id: `${theme.id}_B`,
        themeId: theme.id,
        questionType: 'B',
        text: themeQ.questions.B[role],
      });
    }

    // Type C (핵심만)
    if (count >= 3 && themeQ.questions.C[role]) {
      questions.push({
        id: `${theme.id}_C`,
        themeId: theme.id,
        questionType: 'C',
        text: themeQ.questions.C[role],
      });
    }
  }

  // 보완 문항 추가 (역할별)
  const suppQuestions = SUPPLEMENTARY_QUESTIONS.filter(sq => sq.roles.includes(role));
  for (const sq of suppQuestions) {
    questions.push({
      id: sq.id,
      themeId: 'vision' as ThemeId, // placeholder
      questionType: 'A',
      text: sq.text[role],
      isSupplementary: true,
      supplementaryKey: sq.id,
    });
  }

  return questions;
}

// 문항 셔플 (보완 문항은 마지막 유지)
export function shuffleQuestions(questions: Question[]): Question[] {
  const main = questions.filter(q => !q.isSupplementary);
  const supplementary = questions.filter(q => q.isSupplementary);

  // Fisher-Yates shuffle
  for (let i = main.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [main[i], main[j]] = [main[j], main[i]];
  }

  return [...main, ...supplementary];
}

// 역할별 총 문항 수
export function getTotalQuestionCount(role: Role): number {
  return buildQuestionsForRole(role).length;
}
