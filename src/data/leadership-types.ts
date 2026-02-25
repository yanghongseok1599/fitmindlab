import { LeadershipTypeId, LeadershipTypeInfo, LeadershipCombo, Role, Domain } from '@/types';

// ============================================================================
// 4 Base Leadership Types
// ============================================================================

export const LEADERSHIP_TYPES: Record<LeadershipTypeId, LeadershipTypeInfo> = {
  vision: {
    id: 'vision',
    nameKo: '비전형',
    color: '#10B981',
    gradient: 'from-emerald-600 to-teal-500',
    emoji: '🔭',
    icon: 'Telescope',
    domainMapping: 'thinking',
    description: '큰 그림을 그리고 미래를 설계하는 전략가형 리더',
  },
  execution: {
    id: 'execution',
    nameKo: '실행형',
    color: '#8B5CF6',
    gradient: 'from-violet-600 to-purple-500',
    emoji: '🚀',
    icon: 'Rocket',
    domainMapping: 'executing',
    description: '목표를 설정하고 반드시 달성하는 추진력의 리더',
  },
  relationship: {
    id: 'relationship',
    nameKo: '관계형',
    color: '#3B82F6',
    gradient: 'from-blue-600 to-sky-500',
    emoji: '💙',
    icon: 'Heart',
    domainMapping: 'relationship',
    description: '사람의 마음을 읽고 팀의 화합을 이끄는 리더',
  },
  strategic: {
    id: 'strategic',
    nameKo: '전략형',
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-500',
    emoji: '🧠',
    icon: 'Brain',
    domainMapping: 'influencing',
    description: '데이터와 분석으로 최적의 결정을 내리는 리더',
  },
};

// ============================================================================
// 16 Leadership Combos (4 Roles x 4 Types)
// ============================================================================

export const LEADERSHIP_COMBOS: LeadershipCombo[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // CEO (대표) Combos
  // ──────────────────────────────────────────────────────────────────────────
  {
    leadershipType: 'vision',
    role: 'ceo',
    comboTitle: '제국 건설자',
    tagline: '비전으로 왕국을 세우는 CEO',
    mainMessage:
      '1호점? 그건 시작일 뿐. 당신의 머릿속엔 이미 10호점 청사진이 있잖아요.',
    slogan: '남들이 1호점에 만족할 때, 당신은 이미 다음 그림을 그리고 있어요. 그 큰꿈이 당신의 가장 큰 무기입니다',
    image: '/제국건설자.png',
    hashtags: ['피트니스CEO', '제국건설중', '비전형대표'],
    viralQuotes: [
      '직원이 \'사장님 야망이 무섭다\'고 했다면 칭찬입니다',
      '당신의 카톡 프사는 아마... 센터 전경 사진?',
    ],
    recommendedBusiness: [
      '다점포 프랜차이즈',
      '피트니스 브랜드 런칭',
      '교육 사업 확장',
    ],
  },
  {
    leadershipType: 'execution',
    role: 'ceo',
    comboTitle: '현장 혁신가',
    tagline: '아이디어를 현실로 만드는 실행의 왕',
    mainMessage:
      '회의는 짧게, 실행은 빠르게. 당신이 움직이면 센터가 바뀝니다.',
    slogan: '남들이 고민할 때 당신은 이미 움직이고 있어요. 타고난 실행력, 그게 사업을 바꾸는 힘입니다',
    image: '/론울프.png',
    hashtags: ['실행형CEO', '현장주의', '행동파대표'],
    viralQuotes: [
      '직접 청소하다가 회원 PT도 뛰는 대표',
      '계획서? 일단 하고 나서 씁니다',
    ],
    recommendedBusiness: [
      '성과 보장제 센터',
      '단기간 결과형 프로그램',
      '시스템화된 운영',
    ],
  },
  {
    leadershipType: 'relationship',
    role: 'ceo',
    comboTitle: '사람 수집가',
    tagline: '좋은 사람이 알아서 모이는 센터의 비밀',
    mainMessage:
      '센터의 매출은 올릴 수 있지만, 좋은 사람을 모으는 건 아무나 못 합니다. 그게 당신의 무기예요.',
    slogan: '사람을 알아보는 눈이 탁월해요. 당신 곁에는 결국 좋은 사람만 남습니다. 그게 가장 귀한 재능이에요',
    image: '/사람 수집가.png',
    hashtags: ['사람수집가', '사람경영', '직원이자산'],
    viralQuotes: [
      '직원 생일을 본인보다 더 잘 기억하는 사장님',
      '퇴사 면담에서 오히려 직원이 우는 센터',
    ],
    recommendedBusiness: [
      '커뮤니티 중심 센터',
      '소규모 프리미엄 운영',
      '회원 소개 기반 성장',
    ],
  },
  {
    leadershipType: 'strategic',
    role: 'ceo',
    comboTitle: '전략 설계자',
    tagline: '데이터로 센터를 경영하는 두뇌형 CEO',
    mainMessage:
      '감이 아닌 수치로 움직이는 당신. 경쟁 센터가 못 보는 패턴이 당신에겐 보입니다.',
    slogan: '남들이 감으로 결정할 때, 당신은 숫자로 증명해요. 보이지 않는 패턴을 읽는 탁월한 통찰력의 소유자입니다',
    image: '/전략분석가.png',
    hashtags: ['데이터경영', '전략형CEO', '피트니스MBA'],
    viralQuotes: [
      '직원 실적표를 대시보드로 관리하는 사람',
      '\'느낌적인 느낌\'으로 절대 결정 안 함',
    ],
    recommendedBusiness: [
      '데이터 기반 대형 센터',
      '피트니스 컨설팅',
      'SaaS/플랫폼 사업',
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Manager (관리자) Combos
  // ──────────────────────────────────────────────────────────────────────────
  {
    leadershipType: 'vision',
    role: 'manager',
    comboTitle: '팀 나침반',
    tagline: '방향이 흔들릴 때 센터의 북극성',
    mainMessage:
      '대표의 비전을 팀이 이해하는 언어로 바꾸는 사람. 그게 당신이에요.',
    slogan: '팀이 길을 잃을 때 방향을 잡아주는 건 당신이에요. 비전을 언어로 바꾸는 드문 능력, 그게 당신의 강점입니다',
    image: '/팀 나침반.png',
    hashtags: ['비전형관리자', '팀나침반', '방향설정'],
    viralQuotes: [
      '\'우리가 왜 이걸 하는지\' 가장 잘 설명하는 사람',
      '대표 다음으로 센터의 미래를 많이 생각하는 사람',
    ],
    recommendedBusiness: [
      '전략 기획 담당',
      '신규 사업 기획',
      '교육 프로그램 개발',
    ],
  },
  {
    leadershipType: 'execution',
    role: 'manager',
    comboTitle: '성과 드라이버',
    tagline: 'KPI는 반드시 달성하는 실행의 귀재',
    mainMessage:
      '목표가 정해지면 어떻게든 달성합니다. 그 과정이 당신에겐 에너지예요.',
    slogan: '목표가 정해지면 반드시 해내는 사람. 당신의 추진력 앞에서는 불가능도 가능이 됩니다',
    image: '/올라운더.png',
    hashtags: ['성과관리자', 'KPI달성', '실행형매니저'],
    viralQuotes: [
      '월말이 되면 눈빛이 달라지는 관리자',
      '팀 성과표가 곧 내 자존심',
    ],
    recommendedBusiness: [
      '운영 총괄',
      '성과 관리 시스템 구축',
      '매출 목표 달성 전문',
    ],
  },
  {
    leadershipType: 'relationship',
    role: 'manager',
    comboTitle: '팀 수호자',
    tagline: '트레이너가 떠나지 않는 센터의 중심',
    mainMessage:
      '갈등을 중재하고, 번아웃을 먼저 감지하고, 팀의 온도를 지키는 사람. 당신이 있어서 센터가 따뜻합니다.',
    slogan: '표정만 봐도 팀원의 컨디션을 알아채는 감각. 당신이 있어서 센터의 온도가 지켜집니다',
    image: '/팀 수호자.png',
    hashtags: ['관계형관리자', '팀수호자', '센터의엄마'],
    viralQuotes: [
      '트레이너 표정만 봐도 오늘 컨디션을 아는 사람',
      '\'형/언니, 요즘 좀 힘들죠?\' 한마디로 눈물 뚝',
    ],
    recommendedBusiness: [
      '팀 코칭형 관리',
      '직원 멘토링 시스템',
      '조직 문화 구축',
    ],
  },
  {
    leadershipType: 'strategic',
    role: 'manager',
    comboTitle: '시스템 브레인',
    tagline: '시스템으로 센터를 돌리는 두뇌형 관리자',
    mainMessage:
      '당신이 만든 매뉴얼과 시스템 덕분에 센터는 누가 와도 돌아갑니다.',
    slogan: '당신이 만든 시스템 덕분에 센터는 누가 와도 돌아갑니다. 구조를 설계하는 탁월한 두뇌의 소유자예요',
    image: '/시스템 브레인.png',
    hashtags: ['시스템브레인', '매뉴얼장인', '전략형매니저'],
    viralQuotes: [
      '체크리스트와 매뉴얼이 취미인 관리자',
      '신입이 와도 매뉴얼대로 하면 된다',
    ],
    recommendedBusiness: [
      '운영 시스템 구축',
      'SOP 개발',
      '효율화 컨설팅',
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Trainer (강사/트레이너) Combos
  // ──────────────────────────────────────────────────────────────────────────
  {
    leadershipType: 'vision',
    role: 'trainer',
    comboTitle: '변화 설계자',
    tagline: '회원의 미래를 가장 먼저 보는 트레이너',
    mainMessage:
      '당신은 운동을 가르치는 게 아니라 삶의 변화를 설계합니다.',
    slogan: '당신은 운동을 넘어 삶의 변화를 설계합니다. 회원의 인생이 바뀌는 건, 당신이라서 가능한 일이에요',
    image: '/변화 설계자.png',
    hashtags: ['비전형트레이너', '변화설계자', '인생PT'],
    viralQuotes: [
      '회원에게 \'선생님 덕에 인생 바뀌었다\' 듣는 사람',
      'PT가 아니라 인생 코칭을 하고 있는 당신',
    ],
    recommendedBusiness: [
      '프리미엄 1:1 PT',
      '라이프 코칭형 트레이닝',
      '온라인 코칭 프로그램',
    ],
  },
  {
    leadershipType: 'execution',
    role: 'trainer',
    comboTitle: '결과 제조기',
    tagline: '목표를 세우면 반드시 달성시키는 PT 장인',
    mainMessage:
      'before/after가 곧 당신의 명함입니다. 회원들이 결과로 당신을 증명합니다.',
    slogan: '당신이 맡으면 결과가 나옵니다. before/after가 곧 당신의 명함이자, 가장 강력한 자기소개예요',
    image: '/결과머신.png',
    hashtags: ['결과형트레이너', '비포애프터', '목표달성PT'],
    viralQuotes: [
      '회원 체중계 숫자가 내 성적표',
      '결과 못 내면 내 자존심이 허락하지 않는다',
    ],
    recommendedBusiness: [
      '다이어트 전문 PT',
      '대회 준비 코칭',
      '성과 보장제 PT',
    ],
  },
  {
    leadershipType: 'relationship',
    role: 'trainer',
    comboTitle: '힐링 마스터',
    tagline: '운동을 가르치다 인생 상담까지 하는 트레이너',
    mainMessage:
      '회원이 센터에 오는 이유가 \'운동\'이 아니라 \'당신\'입니다. 그게 재등록률의 비밀이에요.',
    slogan: '회원이 센터에 오는 진짜 이유는 당신입니다. 마음을 어루만지는 그 따뜻함이 재등록의 비밀이에요',
    image: '/힐링마스터.png',
    hashtags: ['공감형트레이너', '힐링PT', '재등록률장인'],
    viralQuotes: [
      '회원이 센터에서 울어도 당황 안 하는 유일한 트레이너',
      '\'선생님이 없으면 운동 안 해요\' 듣는 사람',
    ],
    recommendedBusiness: [
      '시니어/산전산후 전문',
      '재활 특화 PT',
      '웰니스 프로그램',
    ],
  },
  {
    leadershipType: 'strategic',
    role: 'trainer',
    comboTitle: '분석 마스터',
    tagline: '데이터로 프로그램을 설계하는 과학형 트레이너',
    mainMessage:
      '감이 아니라 데이터로 프로그래밍하는 당신. 회원 변화의 이유를 수치로 설명할 수 있습니다.',
    slogan: '감이 아닌 데이터로 설계하고, 근거로 설명하는 당신. 과학적 사고력이 돋보이는 트레이너입니다',
    image: '/전략분석가.png',
    hashtags: ['분석형트레이너', '과학PT', '데이터트레이닝'],
    viralQuotes: [
      '인바디 결과지를 엑셀로 관리하는 트레이너',
      '운동일지에 세트수보다 회복 데이터가 더 많은 사람',
    ],
    recommendedBusiness: [
      '재활/교정 전문',
      '스포츠 과학 기반 PT',
      '기업 건강관리 프로그램',
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // FC (피트니스 컨설턴트) Combos
  // ──────────────────────────────────────────────────────────────────────────
  {
    leadershipType: 'vision',
    role: 'fc',
    comboTitle: '꿈 심는 상담사',
    tagline: '회원에게 미래를 보여주는 FC',
    mainMessage:
      '당신은 상품을 파는 게 아니라 변화의 가능성을 팝니다. 회원이 꿈을 사게 만드는 게 당신의 재능이에요.',
    slogan: '당신은 상품이 아니라 가능성을 보여줍니다. 상담이 끝나면 회원의 눈빛이 달라져요. 그게 당신만의 재능이에요',
    image: '/꿈심는 상담사.png',
    hashtags: ['비전형FC', '꿈파는상담사', '가능성영업'],
    viralQuotes: [
      '상담 후 회원이 눈이 반짝이는 게 보이는 사람',
      '\'여기 등록하면 인생 바뀔 것 같아요\' 듣는 FC',
    ],
    recommendedBusiness: [
      '프리미엄 상담 전문',
      'VIP 회원 관리',
      '장기 프로그램 설계',
    ],
  },
  {
    leadershipType: 'execution',
    role: 'fc',
    comboTitle: '열정 클로저',
    tagline: '클로징의 신, 거절이 두렵지 않은 FC',
    mainMessage:
      '망설이는 회원을 \'지금\'으로 만드는 것이 당신의 초능력입니다.',
    slogan: '망설이는 순간을 결심으로 바꾸는 힘. 당신의 열정과 에너지 앞에서는 거절도 녹아내립니다',
    image: '/열정 클로저.png',
    hashtags: ['실행형FC', '클로징장인', '열정영업'],
    viralQuotes: [
      '\'아 그래도...\' 하는 회원을 \'그럼 시작합시다!\'로 바꾸는 마법사',
      '월말 목표 달성 후 피자 시켜먹는 게 행복인 FC',
    ],
    recommendedBusiness: [
      '단기 등록 전문',
      '이벤트/프로모션 전문',
      '신규 회원 유치',
    ],
  },
  {
    leadershipType: 'relationship',
    role: 'fc',
    comboTitle: '관계의 달인',
    tagline: '한 번 만나면 소개가 따라오는 FC',
    mainMessage:
      '당신의 진심이 회원에게 전해지니까, 광고비 없이도 소개가 끊이지 않습니다.',
    slogan: '당신의 진심은 회원에게 그대로 전해집니다. 광고 없이도 소개가 끊이지 않는 건, 신뢰라는 최고의 무기 덕분이에요',
    image: '/관계의 달인.png',
    hashtags: ['관계형FC', '소개왕', '신뢰영업'],
    viralQuotes: [
      '회원이 친구를 데려오면서 \'이 분한테 상담받아봐\' 하는 FC',
      '퇴사해도 회원이 연락하는 사람',
    ],
    recommendedBusiness: [
      '재등록/소개 전문',
      'VIP 관계 관리',
      '커뮤니티 기반 영업',
    ],
  },
  {
    leadershipType: 'strategic',
    role: 'fc',
    comboTitle: '데이터 설득자',
    tagline: '논리와 근거로 설득하는 전략형 FC',
    mainMessage:
      '감성이 아닌 논리로 설득하는 당신. 꼼꼼한 회원일수록 당신에게 넘어갑니다.',
    slogan: '논리와 근거로 설득하는 당신. 꼼꼼한 회원일수록 당신에게 빠져듭니다. 그 치밀함이 최고의 경쟁력이에요',
    image: '/데이터 설득자.png',
    hashtags: ['전략형FC', '논리영업', '데이터설득'],
    viralQuotes: [
      '상담에 비교표와 그래프를 가져오는 FC',
      '가격 물어보기 전에 가치를 먼저 설명하는 사람',
    ],
    recommendedBusiness: [
      '기업 B2B 영업',
      '데이터 기반 상담',
      '프로그램 비교 분석',
    ],
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Find a specific leadership combo by role and leadership type.
 */
export function getLeadershipCombo(
  role: Role,
  type: LeadershipTypeId,
): LeadershipCombo | undefined {
  return LEADERSHIP_COMBOS.find(
    (combo) => combo.role === role && combo.leadershipType === type,
  );
}

/**
 * Get a leadership type info by its ID.
 */
export function getLeadershipType(id: LeadershipTypeId): LeadershipTypeInfo {
  return LEADERSHIP_TYPES[id];
}
