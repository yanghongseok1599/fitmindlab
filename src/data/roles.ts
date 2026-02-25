import { Role, RoleInfo } from '@/types';

/**
 * 역할(Role) 정의 데이터
 * 피트니스 센터 내 4가지 직무 역할 정보
 */

export const ROLES: RoleInfo[] = [
  {
    id: 'ceo',
    nameKo: '대표',
    nameEn: 'CEO',
    emoji: '🔴',
    color: '#EF4444',
    bgGradient: 'from-red-500 to-rose-600',
    description: '센터를 이끌어가는 대표/오너',
  },
  {
    id: 'manager',
    nameKo: '관리자',
    nameEn: 'Manager',
    emoji: '🔵',
    color: '#3B82F6',
    bgGradient: 'from-blue-500 to-indigo-600',
    description: '센터 운영과 관리를 담당하는 매니저',
  },
  {
    id: 'trainer',
    nameKo: '강사·트레이너',
    nameEn: 'Trainer',
    emoji: '🟢',
    color: '#22C55E',
    bgGradient: 'from-green-500 to-emerald-600',
    description: '회원 지도에 집중하는 전문 트레이너/강사',
  },
  {
    id: 'fc',
    nameKo: 'FC',
    nameEn: 'Fitness Consultant',
    emoji: '🟡',
    color: '#EAB308',
    bgGradient: 'from-yellow-500 to-amber-600',
    description: '회원 상담과 등록을 전문으로 하는 피트니스 컨설턴트',
  },
];

/**
 * Role ID를 키로 하는 RoleInfo 맵
 * 빠른 조회를 위한 Record 형태
 */
export const ROLE_MAP: Record<Role, RoleInfo> = ROLES.reduce(
  (map, role) => {
    map[role.id] = role;
    return map;
  },
  {} as Record<Role, RoleInfo>
);

/**
 * Role ID로 RoleInfo를 조회하는 함수
 * @param id - 역할 ID
 * @returns RoleInfo 또는 undefined
 */
export function getRoleById(id: Role): RoleInfo | undefined {
  return ROLE_MAP[id];
}
