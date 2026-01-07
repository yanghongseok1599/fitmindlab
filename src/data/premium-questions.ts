import { Question, Role } from '@/types';

// 프리미엄 버전: 키워드당 3문항 (108문항)
// Type A: 일반적 경향성 / Type B: 행동 패턴 / Type C: 가치관/동기
export const getPremiumQuestions = (role: Role): Question[] => {
  const questions: Record<Role, Question[]> = {
    manager: [
      // ===== 실행력 (Executing) =====
      // 1. 성취 (Achiever)
      { id: 1, keywordId: 1, type: 'A', content: '나는 매일 센터 운영 관련 목표를 세우고 점검한다' },
      { id: 2, keywordId: 1, type: 'B', content: '하루를 마무리할 때 오늘 얼마나 성과를 냈는지 돌아본다' },
      { id: 3, keywordId: 1, type: 'C', content: '목표를 달성했을 때 느끼는 성취감이 나를 움직이는 원동력이다' },
      // 2. 정리 (Arranger)
      { id: 4, keywordId: 2, type: 'A', content: '나는 복잡한 업무를 효율적으로 배분하고 조직화한다' },
      { id: 5, keywordId: 2, type: 'B', content: '직원 스케줄이나 업무 배치를 최적화하는 것을 즐긴다' },
      { id: 6, keywordId: 2, type: 'C', content: '모든 것이 제자리에 있을 때 마음이 편안해진다' },
      // 3. 신념 (Belief)
      { id: 7, keywordId: 3, type: 'A', content: '나는 센터 운영에서 핵심 가치를 기반으로 결정한다' },
      { id: 8, keywordId: 3, type: 'B', content: '돈보다 가치관에 맞는 결정을 선택한 적이 많다' },
      { id: 9, keywordId: 3, type: 'C', content: '내가 믿는 가치를 실현하는 것이 사업의 의미라고 생각한다' },
      // 4. 일관성 (Consistency)
      { id: 10, keywordId: 4, type: 'A', content: '나는 모든 직원에게 공정하고 일관된 기준을 적용한다' },
      { id: 11, keywordId: 4, type: 'B', content: '규칙이 공평하게 적용되지 않으면 불편함을 느낀다' },
      { id: 12, keywordId: 4, type: 'C', content: '예측 가능하고 일관된 환경이 조직을 건강하게 만든다고 믿는다' },
      // 5. 심사숙고 (Deliberative)
      { id: 13, keywordId: 5, type: 'A', content: '나는 중요한 사업 결정을 내리기 전에 충분히 검토한다' },
      { id: 14, keywordId: 5, type: 'B', content: '결정을 내리기 전에 발생할 수 있는 리스크를 미리 파악한다' },
      { id: 15, keywordId: 5, type: 'C', content: '신중하게 결정하는 것이 장기적으로 더 좋은 결과를 가져온다고 믿는다' },
      // 6. 체계 (Discipline)
      { id: 16, keywordId: 6, type: 'A', content: '나는 센터 운영에 체계적인 시스템을 구축하는 편이다' },
      { id: 17, keywordId: 6, type: 'B', content: '업무 매뉴얼이나 프로세스를 만들고 정리하는 것을 좋아한다' },
      { id: 18, keywordId: 6, type: 'C', content: '체계와 시스템이 있어야 조직이 안정적으로 성장한다고 믿는다' },
      // 7. 집중 (Focus)
      { id: 19, keywordId: 7, type: 'A', content: '나는 중요한 일에 집중하고 우선순위를 명확히 한다' },
      { id: 20, keywordId: 7, type: 'B', content: '한 가지 일에 몰두하면 다른 것들이 눈에 들어오지 않는다' },
      { id: 21, keywordId: 7, type: 'C', content: '핵심에 집중하는 것이 성공의 비결이라고 믿는다' },
      // 8. 책임 (Responsibility)
      { id: 22, keywordId: 8, type: 'A', content: '나는 맡은 일에 대해 강한 주인의식을 가진다' },
      { id: 23, keywordId: 8, type: 'B', content: '한번 약속하면 어떻게든 지키려고 노력한다' },
      { id: 24, keywordId: 8, type: 'C', content: '책임감은 리더의 가장 중요한 덕목이라고 생각한다' },
      // 9. 복구 (Restorative)
      { id: 25, keywordId: 9, type: 'A', content: '나는 문제가 생기면 해결책을 찾는 것을 즐긴다' },
      { id: 26, keywordId: 9, type: 'B', content: '센터에 문제가 생기면 원인을 파악하고 해결하는 데 집중한다' },
      { id: 27, keywordId: 9, type: 'C', content: '문제를 해결하고 나면 큰 보람을 느낀다' },

      // ===== 영향력 (Influencing) =====
      // 10. 활성화 (Activator)
      { id: 28, keywordId: 10, type: 'A', content: '나는 좋은 아이디어가 떠오르면 즉시 행동으로 옮긴다' },
      { id: 29, keywordId: 10, type: 'B', content: '오래 고민하기보다 일단 시작하고 조정하는 편이다' },
      { id: 30, keywordId: 10, type: 'C', content: '행동이 결과를 만들고, 기다림은 기회를 놓친다고 믿는다' },
      // 11. 주도력 (Command)
      { id: 31, keywordId: 11, type: 'A', content: '나는 상황을 통제하고 결단력 있게 팀을 이끈다' },
      { id: 32, keywordId: 11, type: 'B', content: '위기 상황에서 내가 앞장서서 방향을 제시하는 편이다' },
      { id: 33, keywordId: 11, type: 'C', content: '누군가는 결정을 내려야 하고, 그것이 내 역할이라고 느낀다' },
      // 12. 소통 (Communication)
      { id: 34, keywordId: 12, type: 'A', content: '나는 생각을 직원들에게 명확하게 전달하는 편이다' },
      { id: 35, keywordId: 12, type: 'B', content: '복잡한 내용도 쉽게 설명할 수 있다는 말을 자주 듣는다' },
      { id: 36, keywordId: 12, type: 'C', content: '효과적인 소통이 팀워크의 핵심이라고 믿는다' },
      // 13. 경쟁 (Competition)
      { id: 37, keywordId: 13, type: 'A', content: '나는 경쟁 센터보다 앞서나가려는 의지가 강하다' },
      { id: 38, keywordId: 13, type: 'B', content: '경쟁자와 비교했을 때 내가 이기고 있으면 동기부여가 된다' },
      { id: 39, keywordId: 13, type: 'C', content: '경쟁은 나를 더 발전하게 만드는 원동력이다' },
      // 14. 최상화 (Maximizer)
      { id: 40, keywordId: 14, type: 'A', content: '나는 직원들의 강점을 극대화하는 데 집중한다' },
      { id: 41, keywordId: 14, type: 'B', content: '평범한 것을 탁월한 수준으로 끌어올리는 것을 좋아한다' },
      { id: 42, keywordId: 14, type: 'C', content: '약점 보완보다 강점 강화가 더 효과적이라고 믿는다' },
      // 15. 자기확신 (Self-Assurance)
      { id: 43, keywordId: 15, type: 'A', content: '나는 내 판단과 능력에 확신을 가지고 있다' },
      { id: 44, keywordId: 15, type: 'B', content: '어려운 상황에서도 스스로 해낼 수 있다는 자신감이 있다' },
      { id: 45, keywordId: 15, type: 'C', content: '내 결정을 믿고 밀고 나가는 것이 성공의 비결이다' },
      // 16. 존재감 (Significance)
      { id: 46, keywordId: 16, type: 'A', content: '나는 업계에서 인정받고 영향력을 발휘하고 싶다' },
      { id: 47, keywordId: 16, type: 'B', content: '나의 성과나 능력이 인정받을 때 큰 동기부여가 된다' },
      { id: 48, keywordId: 16, type: 'C', content: '의미 있는 업적을 남기는 것이 인생의 목표 중 하나이다' },
      // 17. 사교성 (Woo)
      { id: 49, keywordId: 17, type: 'A', content: '나는 새로운 사람들과 빠르게 친해지는 편이다' },
      { id: 50, keywordId: 17, type: 'B', content: '네트워킹 행사나 모임에서 새로운 인맥을 쉽게 만든다' },
      { id: 51, keywordId: 17, type: 'C', content: '사람들과의 만남이 비즈니스의 핵심 자산이라고 믿는다' },
      // 18. 설득 (Influencer)
      { id: 52, keywordId: 18, type: 'A', content: '나는 직원이나 파트너를 설득하는 능력이 뛰어나다' },
      { id: 53, keywordId: 18, type: 'B', content: '상대방의 마음을 움직여 행동을 이끌어낸 경험이 많다' },
      { id: 54, keywordId: 18, type: 'C', content: '좋은 아이디어도 설득력 없이는 실현되지 않는다고 믿는다' },

      // ===== 관계형성 (Relationship) =====
      // 19. 적응 (Adaptability)
      { id: 55, keywordId: 19, type: 'A', content: '나는 예상치 못한 상황에서도 유연하게 대처한다' },
      { id: 56, keywordId: 19, type: 'B', content: '계획이 바뀌어도 스트레스 없이 적응하는 편이다' },
      { id: 57, keywordId: 19, type: 'C', content: '변화는 피할 수 없으니 유연하게 받아들이는 것이 현명하다' },
      // 20. 연결성 (Connectedness)
      { id: 58, keywordId: 20, type: 'A', content: '나는 센터의 모든 구성원이 서로 연결되어 있다고 믿는다' },
      { id: 59, keywordId: 20, type: 'B', content: '한 직원의 성장이 전체 팀에 긍정적 영향을 준다고 느낀다' },
      { id: 60, keywordId: 20, type: 'C', content: '모든 사람과 일은 어떤 식으로든 연결되어 있다고 믿는다' },
      // 21. 성장지원 (Developer)
      { id: 61, keywordId: 21, type: 'A', content: '나는 직원들의 잠재력을 발견하고 성장을 돕는다' },
      { id: 62, keywordId: 21, type: 'B', content: '직원이 성장하는 모습을 볼 때 큰 보람을 느낀다' },
      { id: 63, keywordId: 21, type: 'C', content: '사람의 성장 가능성을 믿고 투자하는 것이 가치 있다고 생각한다' },
      // 22. 공감 (Empathy)
      { id: 64, keywordId: 22, type: 'A', content: '나는 직원들의 감정 상태를 직관적으로 파악한다' },
      { id: 65, keywordId: 22, type: 'B', content: '상대방이 말하지 않아도 기분이 좋은지 안 좋은지 안다' },
      { id: 66, keywordId: 22, type: 'C', content: '다른 사람의 감정을 이해하는 것이 좋은 관계의 시작이다' },
      // 23. 화합 (Harmony)
      { id: 67, keywordId: 23, type: 'A', content: '나는 팀 내 갈등보다 화합을 중시한다' },
      { id: 68, keywordId: 23, type: 'B', content: '의견 충돌이 생기면 공통점을 찾아 중재하려고 한다' },
      { id: 69, keywordId: 23, type: 'C', content: '조화로운 팀 분위기가 최고의 성과를 만든다고 믿는다' },
      // 24. 포용 (Includer)
      { id: 70, keywordId: 24, type: 'A', content: '나는 모든 직원이 소속감을 느끼도록 노력한다' },
      { id: 71, keywordId: 24, type: 'B', content: '소외되는 사람이 없도록 배려하는 편이다' },
      { id: 72, keywordId: 24, type: 'C', content: '모든 사람은 존중받을 자격이 있다고 믿는다' },
      // 25. 개별화 (Individualization)
      { id: 73, keywordId: 25, type: 'A', content: '나는 각 직원의 고유한 특성과 강점을 파악한다' },
      { id: 74, keywordId: 25, type: 'B', content: '직원마다 다른 방식으로 동기부여하는 것을 즐긴다' },
      { id: 75, keywordId: 25, type: 'C', content: '획일적인 접근보다 개인 맞춤이 더 효과적이라고 믿는다' },
      // 26. 긍정 (Positivity)
      { id: 76, keywordId: 26, type: 'A', content: '나는 긍정적인 에너지로 팀 분위기를 이끈다' },
      { id: 77, keywordId: 26, type: 'B', content: '어려운 상황에서도 유머와 밝은 면을 찾으려고 한다' },
      { id: 78, keywordId: 26, type: 'C', content: '긍정적인 태도가 문제 해결의 시작이라고 믿는다' },
      // 27. 관계 (Relator)
      { id: 79, keywordId: 27, type: 'A', content: '나는 직원들과 깊고 진실된 관계를 맺는다' },
      { id: 80, keywordId: 27, type: 'B', content: '많은 사람보다 소수의 사람과 깊은 관계를 선호한다' },
      { id: 81, keywordId: 27, type: 'C', content: '진정한 관계는 시간과 신뢰를 통해 쌓인다고 믿는다' },

      // ===== 전략사고 (Thinking) =====
      // 28. 분석 (Analytical)
      { id: 82, keywordId: 28, type: 'A', content: '나는 데이터를 분석하여 의사결정을 내린다' },
      { id: 83, keywordId: 28, type: 'B', content: '주장에는 근거가 있어야 한다고 생각하고 확인하는 편이다' },
      { id: 84, keywordId: 28, type: 'C', content: '감보다 데이터가 더 신뢰할 수 있다고 믿는다' },
      // 29. 맥락 (Context)
      { id: 85, keywordId: 29, type: 'A', content: '나는 과거 경험을 바탕으로 현재 상황을 판단한다' },
      { id: 86, keywordId: 29, type: 'B', content: '새로운 결정을 내리기 전에 이전 사례를 참고한다' },
      { id: 87, keywordId: 29, type: 'C', content: '역사를 알아야 미래를 예측할 수 있다고 믿는다' },
      // 30. 미래지향 (Futuristic)
      { id: 88, keywordId: 30, type: 'A', content: '나는 센터의 미래 비전을 그리는 것에서 영감을 얻는다' },
      { id: 89, keywordId: 30, type: 'B', content: '5년 후, 10년 후 센터의 모습을 자주 상상한다' },
      { id: 90, keywordId: 30, type: 'C', content: '미래에 대한 비전이 현재의 행동을 결정한다고 믿는다' },
      // 31. 발상 (Ideation)
      { id: 91, keywordId: 31, type: 'A', content: '나는 새로운 아이디어나 사업 기회를 자주 발견한다' },
      { id: 92, keywordId: 31, type: 'B', content: '브레인스토밍이나 아이디어 회의를 즐기는 편이다' },
      { id: 93, keywordId: 31, type: 'C', content: '혁신은 기존의 틀을 깨는 아이디어에서 시작된다고 믿는다' },
      // 32. 수집 (Input)
      { id: 94, keywordId: 32, type: 'A', content: '나는 업계 정보와 지식을 꾸준히 수집한다' },
      { id: 95, keywordId: 32, type: 'B', content: '관심 분야의 정보를 모으고 저장하는 습관이 있다' },
      { id: 96, keywordId: 32, type: 'C', content: '지식과 정보는 언젠가 반드시 쓸모가 있다고 믿는다' },
      // 33. 지적사고 (Intellection)
      { id: 97, keywordId: 33, type: 'A', content: '나는 중요한 결정 전에 깊이 생각하는 시간을 갖는다' },
      { id: 98, keywordId: 33, type: 'B', content: '혼자 조용히 생각하는 시간이 필요하다' },
      { id: 99, keywordId: 33, type: 'C', content: '깊은 사고가 올바른 결정으로 이어진다고 믿는다' },
      // 34. 배움 (Learner)
      { id: 100, keywordId: 34, type: 'A', content: '나는 새로운 것을 배우는 과정 자체를 즐긴다' },
      { id: 101, keywordId: 34, type: 'B', content: '교육이나 세미나에 참석하면 에너지가 충전된다' },
      { id: 102, keywordId: 34, type: 'C', content: '배움을 멈추면 성장도 멈춘다고 믿는다' },
      // 35. 전략 (Strategic)
      { id: 103, keywordId: 35, type: 'A', content: '나는 목표 달성을 위한 최적의 전략을 찾아낸다' },
      { id: 104, keywordId: 35, type: 'B', content: '여러 가지 시나리오를 검토하고 최선의 경로를 선택한다' },
      { id: 105, keywordId: 35, type: 'C', content: '전략적 사고가 효율적인 목표 달성의 핵심이라고 믿는다' },
      // 36. 비전제시 (Visionary)
      { id: 106, keywordId: 36, type: 'A', content: '나는 센터의 큰 그림을 그리고 방향을 제시한다' },
      { id: 107, keywordId: 36, type: 'B', content: '직원들에게 우리가 어디로 가는지 명확하게 설명한다' },
      { id: 108, keywordId: 36, type: 'C', content: '리더의 역할은 방향을 보여주는 것이라고 믿는다' },
    ],
    operator: [
      // ===== 실행력 (Executing) =====
      // 1. 성취 (Achiever)
      { id: 1, keywordId: 1, type: 'A', content: '나는 수업과 경영 업무 모두에서 구체적인 목표를 세운다' },
      { id: 2, keywordId: 1, type: 'B', content: '하루 일과를 마치고 오늘의 성과를 점검하는 습관이 있다' },
      { id: 3, keywordId: 1, type: 'C', content: '목표 달성의 성취감이 나를 계속 움직이게 한다' },
      // 2. 정리 (Arranger)
      { id: 4, keywordId: 2, type: 'A', content: '나는 수업 스케줄과 경영 업무를 효율적으로 조율한다' },
      { id: 5, keywordId: 2, type: 'B', content: '회원 시간표와 센터 운영을 최적화하는 것을 즐긴다' },
      { id: 6, keywordId: 2, type: 'C', content: '효율적인 조직화가 시간과 에너지를 절약한다고 믿는다' },
      // 3. 신념 (Belief)
      { id: 7, keywordId: 3, type: 'A', content: '나는 나만의 운영 철학을 바탕으로 센터를 이끈다' },
      { id: 8, keywordId: 3, type: 'B', content: '수익보다 가치관에 맞는 선택을 한 적이 많다' },
      { id: 9, keywordId: 3, type: 'C', content: '나의 신념이 센터의 정체성을 만든다고 믿는다' },
      // 4. 일관성 (Consistency)
      { id: 10, keywordId: 4, type: 'A', content: '나는 회원과 직원 모두에게 일관된 기준을 적용한다' },
      { id: 11, keywordId: 4, type: 'B', content: '규칙이 상황에 따라 달라지면 불편함을 느낀다' },
      { id: 12, keywordId: 4, type: 'C', content: '공정한 기준이 신뢰를 만든다고 믿는다' },
      // 5. 심사숙고 (Deliberative)
      { id: 13, keywordId: 5, type: 'A', content: '나는 새로운 시도를 하기 전에 신중하게 검토한다' },
      { id: 14, keywordId: 5, type: 'B', content: '결정 전에 장단점을 꼼꼼히 비교하는 편이다' },
      { id: 15, keywordId: 5, type: 'C', content: '신중한 결정이 후회를 줄인다고 믿는다' },
      // 6. 체계 (Discipline)
      { id: 16, keywordId: 6, type: 'A', content: '나는 수업과 운영 모두에 체계적인 루틴이 있다' },
      { id: 17, keywordId: 6, type: 'B', content: '정해진 루틴대로 움직일 때 효율이 높아진다' },
      { id: 18, keywordId: 6, type: 'C', content: '체계적인 시스템이 안정적인 성장의 기반이다' },
      // 7. 집중 (Focus)
      { id: 19, keywordId: 7, type: 'A', content: '나는 수업 중에도 경영 걱정 없이 현재에 집중한다' },
      { id: 20, keywordId: 7, type: 'B', content: '여러 일을 동시에 하기보다 하나에 집중하는 편이다' },
      { id: 21, keywordId: 7, type: 'C', content: '집중력이 수업과 경영 모두의 질을 결정한다고 믿는다' },
      // 8. 책임 (Responsibility)
      { id: 22, keywordId: 8, type: 'A', content: '나는 회원과 직원 모두에게 책임감 있게 행동한다' },
      { id: 23, keywordId: 8, type: 'B', content: '약속을 지키지 못하면 마음이 불편하다' },
      { id: 24, keywordId: 8, type: 'C', content: '책임감이 신뢰의 기반이라고 믿는다' },
      // 9. 복구 (Restorative)
      { id: 25, keywordId: 9, type: 'A', content: '나는 센터 운영 문제를 발견하면 해결하는 것을 즐긴다' },
      { id: 26, keywordId: 9, type: 'B', content: '문제의 원인을 찾고 해결하는 과정이 흥미롭다' },
      { id: 27, keywordId: 9, type: 'C', content: '문제 해결 능력이 경쟁력이라고 믿는다' },

      // ===== 영향력 (Influencing) =====
      // 10. 활성화 (Activator)
      { id: 28, keywordId: 10, type: 'A', content: '나는 좋은 아이디어가 있으면 바로 실행에 옮긴다' },
      { id: 29, keywordId: 10, type: 'B', content: '계획만 세우기보다 일단 시작하는 편이다' },
      { id: 30, keywordId: 10, type: 'C', content: '실행이 완벽한 계획보다 중요하다고 믿는다' },
      // 11. 주도력 (Command)
      { id: 31, keywordId: 11, type: 'A', content: '나는 수업에서도 경영에서도 상황을 주도적으로 이끈다' },
      { id: 32, keywordId: 11, type: 'B', content: '불확실한 상황에서 결정을 내리는 것이 어렵지 않다' },
      { id: 33, keywordId: 11, type: 'C', content: '리더는 앞장서서 방향을 제시해야 한다고 믿는다' },
      // 12. 소통 (Communication)
      { id: 34, keywordId: 12, type: 'A', content: '나는 회원과 직원 모두에게 명확하게 소통한다' },
      { id: 35, keywordId: 12, type: 'B', content: '이야기를 통해 메시지를 전달하는 것을 좋아한다' },
      { id: 36, keywordId: 12, type: 'C', content: '명확한 소통이 오해를 줄인다고 믿는다' },
      // 13. 경쟁 (Competition)
      { id: 37, keywordId: 13, type: 'A', content: '나는 다른 센터보다 뛰어난 성과를 내고 싶다' },
      { id: 38, keywordId: 13, type: 'B', content: '경쟁에서 이겼을 때 강한 성취감을 느낀다' },
      { id: 39, keywordId: 13, type: 'C', content: '건전한 경쟁이 성장을 촉진한다고 믿는다' },
      // 14. 최상화 (Maximizer)
      { id: 40, keywordId: 14, type: 'A', content: '나는 회원과 직원의 강점을 최대화하려고 노력한다' },
      { id: 41, keywordId: 14, type: 'B', content: '좋은 것을 탁월하게 만드는 과정을 즐긴다' },
      { id: 42, keywordId: 14, type: 'C', content: '강점에 집중하는 것이 가장 효율적이라고 믿는다' },
      // 15. 자기확신 (Self-Assurance)
      { id: 43, keywordId: 15, type: 'A', content: '나는 수업과 경영 모두에서 내 능력에 확신이 있다' },
      { id: 44, keywordId: 15, type: 'B', content: '어려운 상황에서도 나를 믿고 나아가는 편이다' },
      { id: 45, keywordId: 15, type: 'C', content: '자기 확신이 어려움을 극복하는 힘이라고 믿는다' },
      // 16. 존재감 (Significance)
      { id: 46, keywordId: 16, type: 'A', content: '나는 지역에서 인정받는 센터를 만들고 싶다' },
      { id: 47, keywordId: 16, type: 'B', content: '내 노력과 성과가 인정받을 때 동기부여가 된다' },
      { id: 48, keywordId: 16, type: 'C', content: '의미 있는 영향력을 남기는 것이 중요하다고 믿는다' },
      // 17. 사교성 (Woo)
      { id: 49, keywordId: 17, type: 'A', content: '나는 새로운 회원이나 파트너와 빠르게 친해진다' },
      { id: 50, keywordId: 17, type: 'B', content: '처음 만난 사람과도 편하게 대화하는 편이다' },
      { id: 51, keywordId: 17, type: 'C', content: '좋은 인맥이 좋은 기회를 만든다고 믿는다' },
      // 18. 설득 (Influencer)
      { id: 52, keywordId: 18, type: 'A', content: '나는 회원의 마음을 움직여 동기부여하는 능력이 있다' },
      { id: 53, keywordId: 18, type: 'B', content: '상대방이 원하는 것을 파악하고 설득하는 데 능하다' },
      { id: 54, keywordId: 18, type: 'C', content: '설득력이 리더십의 핵심 역량이라고 믿는다' },

      // ===== 관계형성 (Relationship) =====
      // 19. 적응 (Adaptability)
      { id: 55, keywordId: 19, type: 'A', content: '나는 수업과 경영 사이에서 유연하게 전환한다' },
      { id: 56, keywordId: 19, type: 'B', content: '갑작스러운 상황 변화에도 당황하지 않는 편이다' },
      { id: 57, keywordId: 19, type: 'C', content: '유연함이 생존력이라고 믿는다' },
      // 20. 연결성 (Connectedness)
      { id: 58, keywordId: 20, type: 'A', content: '나는 회원, 직원, 센터가 모두 연결되어 있다고 느낀다' },
      { id: 59, keywordId: 20, type: 'B', content: '작은 변화가 전체에 영향을 미친다고 생각한다' },
      { id: 60, keywordId: 20, type: 'C', content: '우리는 모두 하나의 커뮤니티라고 믿는다' },
      // 21. 성장지원 (Developer)
      { id: 61, keywordId: 21, type: 'A', content: '나는 회원의 작은 변화도 발견하고 인정해준다' },
      { id: 62, keywordId: 21, type: 'B', content: '회원이나 직원의 성장 과정을 지켜보는 것이 즐겁다' },
      { id: 63, keywordId: 21, type: 'C', content: '사람의 잠재력을 믿고 기다려주는 것이 중요하다고 믿는다' },
      // 22. 공감 (Empathy)
      { id: 64, keywordId: 22, type: 'A', content: '나는 회원의 감정 상태를 직관적으로 파악한다' },
      { id: 65, keywordId: 22, type: 'B', content: '상대방의 표정만 봐도 기분을 알 수 있다' },
      { id: 66, keywordId: 22, type: 'C', content: '공감은 진정한 관계의 시작이라고 믿는다' },
      // 23. 화합 (Harmony)
      { id: 67, keywordId: 23, type: 'A', content: '나는 센터 내 갈등보다 화합을 중시한다' },
      { id: 68, keywordId: 23, type: 'B', content: '의견 충돌이 생기면 합의점을 찾으려고 노력한다' },
      { id: 69, keywordId: 23, type: 'C', content: '화합이 팀워크의 기반이라고 믿는다' },
      // 24. 포용 (Includer)
      { id: 70, keywordId: 24, type: 'A', content: '나는 모든 회원이 환영받는 느낌을 주려고 노력한다' },
      { id: 71, keywordId: 24, type: 'B', content: '새로운 회원이나 직원이 소외되지 않도록 신경 쓴다' },
      { id: 72, keywordId: 24, type: 'C', content: '모든 사람이 소속감을 느껴야 한다고 믿는다' },
      // 25. 개별화 (Individualization)
      { id: 73, keywordId: 25, type: 'A', content: '나는 각 회원의 고유한 특성과 니즈를 파악한다' },
      { id: 74, keywordId: 25, type: 'B', content: '회원마다 다른 접근 방식을 사용하는 편이다' },
      { id: 75, keywordId: 25, type: 'C', content: '개인 맞춤이 최고의 서비스라고 믿는다' },
      // 26. 긍정 (Positivity)
      { id: 76, keywordId: 26, type: 'A', content: '나는 긍정적인 에너지로 수업 분위기를 이끈다' },
      { id: 77, keywordId: 26, type: 'B', content: '힘든 상황에서도 밝은 면을 찾으려고 한다' },
      { id: 78, keywordId: 26, type: 'C', content: '긍정적 에너지가 전염된다고 믿는다' },
      // 27. 관계 (Relator)
      { id: 79, keywordId: 27, type: 'A', content: '나는 회원들과 깊고 진실된 관계를 맺는다' },
      { id: 80, keywordId: 27, type: 'B', content: '신뢰할 수 있는 소수와 깊은 관계를 선호한다' },
      { id: 81, keywordId: 27, type: 'C', content: '진정성 있는 관계가 가장 오래간다고 믿는다' },

      // ===== 전략사고 (Thinking) =====
      // 28. 분석 (Analytical)
      { id: 82, keywordId: 28, type: 'A', content: '나는 회원 데이터를 분석하여 운영 결정을 내린다' },
      { id: 83, keywordId: 28, type: 'B', content: '숫자와 데이터로 확인해야 안심이 된다' },
      { id: 84, keywordId: 28, type: 'C', content: '근거 있는 결정이 좋은 결과를 만든다고 믿는다' },
      // 29. 맥락 (Context)
      { id: 85, keywordId: 29, type: 'A', content: '나는 과거 운영 경험을 바탕으로 현재를 판단한다' },
      { id: 86, keywordId: 29, type: 'B', content: '비슷한 상황의 과거 사례를 참고하는 편이다' },
      { id: 87, keywordId: 29, type: 'C', content: '과거를 알면 미래를 더 잘 준비할 수 있다고 믿는다' },
      // 30. 미래지향 (Futuristic)
      { id: 88, keywordId: 30, type: 'A', content: '나는 센터의 미래 성장 비전을 자주 그려본다' },
      { id: 89, keywordId: 30, type: 'B', content: '미래의 가능성을 상상하면 에너지가 생긴다' },
      { id: 90, keywordId: 30, type: 'C', content: '비전이 있어야 방향이 있다고 믿는다' },
      // 31. 발상 (Ideation)
      { id: 91, keywordId: 31, type: 'A', content: '나는 수업이나 운영에서 새로운 아이디어가 자주 떠오른다' },
      { id: 92, keywordId: 31, type: 'B', content: '새로운 개념이나 연결고리를 찾는 것을 즐긴다' },
      { id: 93, keywordId: 31, type: 'C', content: '창의적 아이디어가 차별화의 핵심이라고 믿는다' },
      // 32. 수집 (Input)
      { id: 94, keywordId: 32, type: 'A', content: '나는 피트니스 관련 정보와 트렌드를 꾸준히 수집한다' },
      { id: 95, keywordId: 32, type: 'B', content: '관심 있는 정보를 모으고 정리하는 습관이 있다' },
      { id: 96, keywordId: 32, type: 'C', content: '정보가 곧 힘이라고 믿는다' },
      // 33. 지적사고 (Intellection)
      { id: 97, keywordId: 33, type: 'A', content: '나는 중요한 결정 전에 혼자 깊이 생각하는 시간이 필요하다' },
      { id: 98, keywordId: 33, type: 'B', content: '조용한 환경에서 생각을 정리하는 것을 좋아한다' },
      { id: 99, keywordId: 33, type: 'C', content: '깊은 생각이 좋은 결정으로 이어진다고 믿는다' },
      // 34. 배움 (Learner)
      { id: 100, keywordId: 34, type: 'A', content: '나는 새로운 운동법이나 경영 기법을 배우는 것을 즐긴다' },
      { id: 101, keywordId: 34, type: 'B', content: '새로운 것을 배울 때 에너지가 충전된다' },
      { id: 102, keywordId: 34, type: 'C', content: '끊임없는 배움이 성장의 열쇠라고 믿는다' },
      // 35. 전략 (Strategic)
      { id: 103, keywordId: 35, type: 'A', content: '나는 센터 성장을 위한 최적의 전략을 찾아낸다' },
      { id: 104, keywordId: 35, type: 'B', content: '여러 경로 중 가장 효율적인 방법을 선택한다' },
      { id: 105, keywordId: 35, type: 'C', content: '전략적 접근이 성공 확률을 높인다고 믿는다' },
      // 36. 비전제시 (Visionary)
      { id: 106, keywordId: 36, type: 'A', content: '나는 센터의 방향성과 비전을 직원들에게 제시한다' },
      { id: 107, keywordId: 36, type: 'B', content: '우리가 어디로 가는지 명확히 설명할 수 있다' },
      { id: 108, keywordId: 36, type: 'C', content: '비전 공유가 팀을 하나로 만든다고 믿는다' },
    ],
    trainer: [
      // ===== 실행력 (Executing) =====
      // 1. 성취 (Achiever)
      { id: 1, keywordId: 1, type: 'A', content: '나는 매 수업마다 회원에게 달성할 목표를 제시한다' },
      { id: 2, keywordId: 1, type: 'B', content: '하루 일과를 마칠 때 오늘의 성과를 점검한다' },
      { id: 3, keywordId: 1, type: 'C', content: '목표 달성의 성취감이 나를 계속 움직이게 한다' },
      // 2. 정리 (Arranger)
      { id: 4, keywordId: 2, type: 'A', content: '나는 수업 시간과 프로그램을 효율적으로 구성한다' },
      { id: 5, keywordId: 2, type: 'B', content: '회원별 운동 계획을 체계적으로 정리하는 편이다' },
      { id: 6, keywordId: 2, type: 'C', content: '잘 조직된 계획이 좋은 결과를 만든다고 믿는다' },
      // 3. 신념 (Belief)
      { id: 7, keywordId: 3, type: 'A', content: '나는 나만의 트레이닝 철학을 바탕으로 지도한다' },
      { id: 8, keywordId: 3, type: 'B', content: '내가 믿는 가치관에 맞지 않는 요청은 거절한다' },
      { id: 9, keywordId: 3, type: 'C', content: '신념이 나의 정체성을 만든다고 믿는다' },
      // 4. 일관성 (Consistency)
      { id: 10, keywordId: 4, type: 'A', content: '나는 모든 회원에게 공정하고 일관된 기준을 적용한다' },
      { id: 11, keywordId: 4, type: 'B', content: '회원마다 대우가 달라지면 불편함을 느낀다' },
      { id: 12, keywordId: 4, type: 'C', content: '일관된 기준이 신뢰를 쌓는다고 믿는다' },
      // 5. 심사숙고 (Deliberative)
      { id: 13, keywordId: 5, type: 'A', content: '나는 새로운 운동 프로그램을 도입하기 전에 신중히 검토한다' },
      { id: 14, keywordId: 5, type: 'B', content: '리스크를 미리 파악하고 대비하는 편이다' },
      { id: 15, keywordId: 5, type: 'C', content: '신중함이 실수를 줄인다고 믿는다' },
      // 6. 체계 (Discipline)
      { id: 16, keywordId: 6, type: 'A', content: '나는 수업 전 준비부터 마무리까지 체계적인 루틴이 있다' },
      { id: 17, keywordId: 6, type: 'B', content: '정해진 루틴대로 움직일 때 안정감을 느낀다' },
      { id: 18, keywordId: 6, type: 'C', content: '체계가 효율을 높인다고 믿는다' },
      // 7. 집중 (Focus)
      { id: 19, keywordId: 7, type: 'A', content: '나는 수업 중에는 오직 회원에게만 집중한다' },
      { id: 20, keywordId: 7, type: 'B', content: '한 가지에 몰두하면 시간 가는 줄 모른다' },
      { id: 21, keywordId: 7, type: 'C', content: '집중력이 수업의 질을 결정한다고 믿는다' },
      // 8. 책임 (Responsibility)
      { id: 22, keywordId: 8, type: 'A', content: '나는 회원의 목표 달성에 대해 강한 책임감을 느낀다' },
      { id: 23, keywordId: 8, type: 'B', content: '약속한 것은 반드시 지키려고 노력한다' },
      { id: 24, keywordId: 8, type: 'C', content: '책임감 있는 태도가 프로의 기본이라고 믿는다' },
      // 9. 복구 (Restorative)
      { id: 25, keywordId: 9, type: 'A', content: '나는 회원의 문제점을 발견하고 해결하는 것을 즐긴다' },
      { id: 26, keywordId: 9, type: 'B', content: '회원의 약점을 분석하고 개선하는 과정이 재미있다' },
      { id: 27, keywordId: 9, type: 'C', content: '문제 해결이 트레이너의 핵심 역량이라고 믿는다' },

      // ===== 영향력 (Influencing) =====
      // 10. 활성화 (Activator)
      { id: 28, keywordId: 10, type: 'A', content: '나는 좋은 아이디어가 떠오르면 바로 수업에 적용한다' },
      { id: 29, keywordId: 10, type: 'B', content: '오래 고민하기보다 일단 시도해보는 편이다' },
      { id: 30, keywordId: 10, type: 'C', content: '행동이 결과를 만든다고 믿는다' },
      // 11. 주도력 (Command)
      { id: 31, keywordId: 11, type: 'A', content: '나는 수업 상황을 주도적으로 이끌어간다' },
      { id: 32, keywordId: 11, type: 'B', content: '회원에게 방향을 제시하고 결정하는 것이 자연스럽다' },
      { id: 33, keywordId: 11, type: 'C', content: '트레이너가 수업을 리드해야 한다고 믿는다' },
      // 12. 소통 (Communication)
      { id: 34, keywordId: 12, type: 'A', content: '나는 운동 방법을 회원에게 명확하게 전달한다' },
      { id: 35, keywordId: 12, type: 'B', content: '복잡한 동작도 쉽게 설명한다는 말을 자주 듣는다' },
      { id: 36, keywordId: 12, type: 'C', content: '좋은 소통이 좋은 수업을 만든다고 믿는다' },
      // 13. 경쟁 (Competition)
      { id: 37, keywordId: 13, type: 'A', content: '나는 다른 트레이너보다 뛰어난 성과를 내고 싶다' },
      { id: 38, keywordId: 13, type: 'B', content: '경쟁에서 이겼을 때 강한 동기부여가 된다' },
      { id: 39, keywordId: 13, type: 'C', content: '경쟁이 나를 더 발전하게 만든다고 믿는다' },
      // 14. 최상화 (Maximizer)
      { id: 40, keywordId: 14, type: 'A', content: '나는 회원의 강점을 찾아 최대화하려고 노력한다' },
      { id: 41, keywordId: 14, type: 'B', content: '좋은 것을 더 좋게 만드는 과정을 즐긴다' },
      { id: 42, keywordId: 14, type: 'C', content: '약점 보완보다 강점 강화가 효과적이라고 믿는다' },
      // 15. 자기확신 (Self-Assurance)
      { id: 43, keywordId: 15, type: 'A', content: '나는 내 트레이닝 능력에 확신을 가지고 있다' },
      { id: 44, keywordId: 15, type: 'B', content: '어려운 케이스도 해결할 수 있다는 자신감이 있다' },
      { id: 45, keywordId: 15, type: 'C', content: '자기 확신이 회원에게 신뢰를 준다고 믿는다' },
      // 16. 존재감 (Significance)
      { id: 46, keywordId: 16, type: 'A', content: '나는 업계에서 인정받는 트레이너가 되고 싶다' },
      { id: 47, keywordId: 16, type: 'B', content: '내 노력과 성과가 인정받을 때 에너지가 생긴다' },
      { id: 48, keywordId: 16, type: 'C', content: '의미 있는 영향력을 남기고 싶다고 생각한다' },
      // 17. 사교성 (Woo)
      { id: 49, keywordId: 17, type: 'A', content: '나는 새로운 회원과 빠르게 친해지는 편이다' },
      { id: 50, keywordId: 17, type: 'B', content: '처음 만난 회원과도 편하게 대화한다' },
      { id: 51, keywordId: 17, type: 'C', content: '좋은 첫인상이 좋은 관계의 시작이라고 믿는다' },
      // 18. 설득 (Influencer)
      { id: 52, keywordId: 18, type: 'A', content: '나는 회원의 마음을 움직여 운동 동기를 부여한다' },
      { id: 53, keywordId: 18, type: 'B', content: '운동을 싫어하는 회원도 설득해서 꾸준히 오게 만든다' },
      { id: 54, keywordId: 18, type: 'C', content: '동기부여가 트레이너의 핵심 역할이라고 믿는다' },

      // ===== 관계형성 (Relationship) =====
      // 19. 적응 (Adaptability)
      { id: 55, keywordId: 19, type: 'A', content: '나는 회원의 컨디션에 따라 수업을 유연하게 조절한다' },
      { id: 56, keywordId: 19, type: 'B', content: '계획이 바뀌어도 스트레스 없이 적응한다' },
      { id: 57, keywordId: 19, type: 'C', content: '유연함이 좋은 수업을 만든다고 믿는다' },
      // 20. 연결성 (Connectedness)
      { id: 58, keywordId: 20, type: 'A', content: '나는 회원의 운동과 일상이 연결되어 있다고 믿는다' },
      { id: 59, keywordId: 20, type: 'B', content: '회원의 라이프스타일까지 고려해서 프로그램을 짠다' },
      { id: 60, keywordId: 20, type: 'C', content: '운동은 삶의 일부라고 믿는다' },
      // 21. 성장지원 (Developer)
      { id: 61, keywordId: 21, type: 'A', content: '나는 회원의 작은 변화도 발견하고 칭찬해준다' },
      { id: 62, keywordId: 21, type: 'B', content: '회원의 성장 과정을 지켜보는 것이 가장 큰 보람이다' },
      { id: 63, keywordId: 21, type: 'C', content: '누구나 성장할 수 있다고 믿는다' },
      // 22. 공감 (Empathy)
      { id: 64, keywordId: 22, type: 'A', content: '나는 회원의 감정 상태를 직관적으로 파악한다' },
      { id: 65, keywordId: 22, type: 'B', content: '회원이 말하지 않아도 기분을 알 수 있다' },
      { id: 66, keywordId: 22, type: 'C', content: '공감이 신뢰의 기반이라고 믿는다' },
      // 23. 화합 (Harmony)
      { id: 67, keywordId: 23, type: 'A', content: '나는 회원과의 관계에서 갈등보다 화합을 중시한다' },
      { id: 68, keywordId: 23, type: 'B', content: '의견 충돌이 생기면 합의점을 찾으려 한다' },
      { id: 69, keywordId: 23, type: 'C', content: '좋은 분위기가 좋은 결과를 만든다고 믿는다' },
      // 24. 포용 (Includer)
      { id: 70, keywordId: 24, type: 'A', content: '나는 모든 회원이 환영받는 느낌을 주려고 노력한다' },
      { id: 71, keywordId: 24, type: 'B', content: '새로운 회원이 소외되지 않도록 특별히 신경 쓴다' },
      { id: 72, keywordId: 24, type: 'C', content: '모든 사람이 운동할 자격이 있다고 믿는다' },
      // 25. 개별화 (Individualization)
      { id: 73, keywordId: 25, type: 'A', content: '나는 각 회원의 체형, 성격, 목표를 개별적으로 파악한다' },
      { id: 74, keywordId: 25, type: 'B', content: '회원마다 다른 접근 방식을 사용한다' },
      { id: 75, keywordId: 25, type: 'C', content: '맞춤형 지도가 최고의 서비스라고 믿는다' },
      // 26. 긍정 (Positivity)
      { id: 76, keywordId: 26, type: 'A', content: '나는 긍정적인 에너지로 수업 분위기를 밝게 만든다' },
      { id: 77, keywordId: 26, type: 'B', content: '힘든 운동도 유머와 격려로 즐겁게 만든다' },
      { id: 78, keywordId: 26, type: 'C', content: '긍정적 에너지가 운동 효과를 높인다고 믿는다' },
      // 27. 관계 (Relator)
      { id: 79, keywordId: 27, type: 'A', content: '나는 회원들과 깊고 진실된 관계를 맺는다' },
      { id: 80, keywordId: 27, type: 'B', content: '많은 회원보다 소수와 깊은 관계를 선호한다' },
      { id: 81, keywordId: 27, type: 'C', content: '진정한 관계가 장기 유지의 비결이라고 믿는다' },

      // ===== 전략사고 (Thinking) =====
      // 28. 분석 (Analytical)
      { id: 82, keywordId: 28, type: 'A', content: '나는 회원의 운동 데이터를 분석하여 프로그램을 설계한다' },
      { id: 83, keywordId: 28, type: 'B', content: '감보다 데이터로 확인하고 결정하는 편이다' },
      { id: 84, keywordId: 28, type: 'C', content: '근거 있는 프로그램이 효과적이라고 믿는다' },
      // 29. 맥락 (Context)
      { id: 85, keywordId: 29, type: 'A', content: '나는 회원의 과거 운동 이력을 바탕으로 지도한다' },
      { id: 86, keywordId: 29, type: 'B', content: '회원의 이전 경험을 참고해서 프로그램을 짠다' },
      { id: 87, keywordId: 29, type: 'C', content: '과거를 알면 더 좋은 지도가 가능하다고 믿는다' },
      // 30. 미래지향 (Futuristic)
      { id: 88, keywordId: 30, type: 'A', content: '나는 회원의 미래 목표를 함께 그려보는 것을 좋아한다' },
      { id: 89, keywordId: 30, type: 'B', content: '회원이 목표를 달성한 모습을 상상하며 동기부여한다' },
      { id: 90, keywordId: 30, type: 'C', content: '비전이 있어야 동기가 생긴다고 믿는다' },
      // 31. 발상 (Ideation)
      { id: 91, keywordId: 31, type: 'A', content: '나는 새로운 운동 아이디어나 프로그램이 자주 떠오른다' },
      { id: 92, keywordId: 31, type: 'B', content: '기존 방식에 얽매이지 않고 새로운 것을 시도한다' },
      { id: 93, keywordId: 31, type: 'C', content: '창의성이 차별화의 핵심이라고 믿는다' },
      // 32. 수집 (Input)
      { id: 94, keywordId: 32, type: 'A', content: '나는 운동 관련 정보와 최신 트렌드를 꾸준히 수집한다' },
      { id: 95, keywordId: 32, type: 'B', content: '좋은 운동 정보를 발견하면 저장해두는 습관이 있다' },
      { id: 96, keywordId: 32, type: 'C', content: '지식이 좋은 트레이닝의 기반이라고 믿는다' },
      // 33. 지적사고 (Intellection)
      { id: 97, keywordId: 33, type: 'A', content: '나는 트레이닝 방법에 대해 깊이 생각하고 연구한다' },
      { id: 98, keywordId: 33, type: 'B', content: '혼자 조용히 생각하고 공부하는 시간을 즐긴다' },
      { id: 99, keywordId: 33, type: 'C', content: '깊은 이해가 좋은 지도로 이어진다고 믿는다' },
      // 34. 배움 (Learner)
      { id: 100, keywordId: 34, type: 'A', content: '나는 새로운 운동법이나 자격증을 배우는 것을 즐긴다' },
      { id: 101, keywordId: 34, type: 'B', content: '교육이나 워크샵에 참석하면 에너지가 충전된다' },
      { id: 102, keywordId: 34, type: 'C', content: '배움을 멈추면 성장도 멈춘다고 믿는다' },
      // 35. 전략 (Strategic)
      { id: 103, keywordId: 35, type: 'A', content: '나는 회원 목표 달성을 위한 최적의 전략을 세운다' },
      { id: 104, keywordId: 35, type: 'B', content: '여러 방법 중 가장 효율적인 경로를 선택한다' },
      { id: 105, keywordId: 35, type: 'C', content: '전략적 접근이 빠른 결과를 만든다고 믿는다' },
      // 36. 비전제시 (Visionary)
      { id: 106, keywordId: 36, type: 'A', content: '나는 회원에게 큰 그림과 방향을 제시해준다' },
      { id: 107, keywordId: 36, type: 'B', content: '회원이 목표를 향해 가는 길을 명확히 보여준다' },
      { id: 108, keywordId: 36, type: 'C', content: '방향을 제시하는 것이 트레이너의 역할이라고 믿는다' },
    ],
  };

  return questions[role];
};
