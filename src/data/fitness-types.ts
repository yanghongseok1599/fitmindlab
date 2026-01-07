import { FitnessType, FitnessTypeCode } from '@/types';

export const fitnessTypes: Record<FitnessTypeCode, FitnessType> = {
  LONE_WOLF: {
    code: 'LONE_WOLF',
    nameKo: '론울프',
    icon: 'User',
    mainMessage: '당신은 스스로 완결되는 사람이에요. 누구의 도움 없이도 최고의 서비스를 만들어내는 독립성과 집중력, 그게 당신만의 강력한 무기입니다.',
    subMessages: [
      '팀플? 그거 저랑 안 맞아요. 혼자 다 합니다만?',
      '회식 대신 회원 상담이 더 좋은 당신',
      '직원 관리 스트레스? 그게 뭔데요? (1인샵 특)',
    ],
    recommendedBusiness: [
      '프라이빗 1:1 PT 전문 스튜디오',
      '예약제 소수정예 운영',
      '고단가 프리미엄 퍼스널 트레이닝',
    ],
    slogan: '적게 받고, 깊게 케어한다',
    hashtags: ['론울프트레이너', '1인샵장인', '프라이빗PT'],
  },
  EMPIRE_BUILDER: {
    code: 'EMPIRE_BUILDER',
    nameKo: '제국건설자',
    icon: 'Crown',
    mainMessage: '당신에겐 남들이 못 보는 큰 그림이 보여요. 비전을 현실로 만드는 추진력과 리더십, 당신은 사람들을 이끌고 성장시키는 타고난 리더입니다.',
    subMessages: [
      '1호점 오픈날, 이미 2호점 부동산 보고 있었죠?',
      '직원이 "사장님 야망이 무섭다"고 했다면 칭찬입니다',
      '당신의 카톡 프사는 아마... 센터 전경 사진?',
    ],
    recommendedBusiness: [
      '다점포 프랜차이즈 본사',
      '피트니스 브랜드 런칭',
      '기업형 피트니스 사업 모델',
    ],
    slogan: '하나의 성공을 백 개의 성장으로',
    hashtags: ['피트니스CEO', '제국건설중', '프랜차이즈대표'],
  },
  RESULT_MACHINE: {
    code: 'RESULT_MACHINE',
    nameKo: '결과머신',
    icon: 'Target',
    mainMessage: '당신은 약속을 지키는 사람이에요. 목표를 세우면 반드시 달성하는 실행력과 끈기, 회원들이 당신을 믿고 따르는 이유입니다.',
    subMessages: [
      '회원 체중계 숫자가 곧 내 성적표',
      '"선생님 덕분에 인생 바뀌었어요" 중독된 사람',
      'before/after 앨범이 가장 소중한 자산',
    ],
    recommendedBusiness: [
      '다이어트/체형교정 전문 센터',
      '대회 준비 전문 코칭',
      '성과 보장제 프로그램 운영',
    ],
    slogan: '감동은 덤, 결과는 필수',
    hashtags: ['결과로증명', '비포애프터장인', '다이어트전문'],
  },
  HEALING_MASTER: {
    code: 'HEALING_MASTER',
    nameKo: '힐링마스터',
    icon: 'Heart',
    mainMessage: '당신에겐 사람의 마음을 읽는 특별한 능력이 있어요. 깊은 공감력과 따뜻한 배려심으로 사람들에게 진정한 치유를 선물하는 존재입니다.',
    subMessages: [
      '회원이 센터에서 울어도 당황 안 하는 유일한 트레이너',
      '운동 가르치다가 인생 상담까지 하는 중',
      '당신 센터는 헬스장인가요, 치유센터인가요?',
    ],
    recommendedBusiness: [
      '재활/교정 특화 웰니스 센터',
      '시니어/산전산후 전문 스튜디오',
      '마음챙김 + 운동 통합 프로그램',
    ],
    slogan: '아픈 곳만 고치는 게 아니라, 아픈 마음도 안아줍니다',
    hashtags: ['힐링센터', '재활전문', '마음까지케어'],
  },
  CREATOR: {
    code: 'CREATOR',
    nameKo: '크리에이터',
    icon: 'Palette',
    mainMessage: '당신의 머릿속은 아이디어 공장이에요. 남다른 창의력과 표현력으로 평범한 것도 특별하게 만드는 능력, 당신만이 가진 빛나는 재능입니다.',
    subMessages: [
      '인스타 릴스 찍다가 수업 시간 까먹은 적 있죠?',
      '회원보다 팔로워가 더 많을 수도 있는 사람',
      '운동 루틴보다 촬영 앵글이 먼저 떠오르는 당신',
    ],
    recommendedBusiness: [
      '피트니스 유튜버/인플루언서',
      '온라인 클래스 + 센터 병행',
      '운동 프로그램/앱 개발',
    ],
    slogan: '수업도 콘텐츠도, 결국 "나"라는 브랜드',
    hashtags: ['피트니스크리에이터', '운동유튜버', '콘텐츠장인'],
  },
  STRATEGIST: {
    code: 'STRATEGIST',
    nameKo: '전략분석가',
    icon: 'BarChart3',
    mainMessage: '당신은 혼란 속에서 패턴을 찾아내는 사람이에요. 뛰어난 분석력과 논리적 사고로 최적의 답을 도출하는 능력, 당신의 가장 큰 강점입니다.',
    subMessages: [
      '엑셀 없으면 센터 못 굴리는 사람',
      '"느낌적인 느낌"으로 의사결정 절대 안 함',
      '회원 이탈 예측 모델 만들어본 적 있다면 당신이 맞아요',
    ],
    recommendedBusiness: [
      '데이터 기반 대형 피트니스 센터',
      '피트니스 컨설팅/교육 사업',
      'SaaS/플랫폼 비즈니스 진출',
    ],
    slogan: '감이 아닌 근거로, 전략으로 승부한다',
    hashtags: ['데이터경영', '피트니스MBA', '전략적CEO'],
  },
  MASTER_MENTOR: {
    code: 'MASTER_MENTOR',
    nameKo: '멘토장인',
    icon: 'GraduationCap',
    mainMessage: '당신은 사람의 잠재력을 알아보는 눈이 있어요. 지식을 나누고 성장을 이끄는 따뜻한 멘토십, 당신 덕분에 더 많은 사람들이 성장합니다.',
    subMessages: [
      '제자가 대회에서 상 타면 내가 더 기쁜 사람',
      '후배 트레이너 성장이 내 노후 대비',
      '"선생님의 선생님"이라는 호칭이 제일 좋아요',
    ],
    recommendedBusiness: [
      '트레이너 양성 아카데미',
      '자격증/교육 과정 개발',
      '피트니스 교육 플랫폼 운영',
    ],
    slogan: '나 하나 잘하는 것보다, 백 명을 잘하게 만든다',
    hashtags: ['트레이너양성', '피트니스교육', '멘토의멘토'],
  },
  ALL_ROUNDER: {
    code: 'ALL_ROUNDER',
    nameKo: '올라운더',
    icon: 'Zap',
    mainMessage: '당신은 어떤 상황에서도 빛나는 사람이에요. 다양한 분야에서 균형 잡힌 역량을 발휘하는 적응력, 당신이기에 가능한 특별한 강점입니다.',
    subMessages: [
      'MBTI로 치면 T와 F 딱 50:50',
      '강점검사 결과가 너무 고르게 나와서 유형 정하기 어려웠던 사람',
      '뭘 해도 "어 생각보다 잘하네?" 듣는 타입',
    ],
    recommendedBusiness: [
      '중형 피트니스 센터 직접 운영',
      '멀티 브랜드/복합 웰니스 공간',
      '수업 + 경영 + 교육 트리플 포지션',
    ],
    slogan: '못하는 게 없는, 만능 육각형 인간',
    hashtags: ['만능운영자', '올라운더', '뭐든잘함'],
  },
};

export const getFitnessType = (code: FitnessTypeCode): FitnessType => {
  return fitnessTypes[code];
};
