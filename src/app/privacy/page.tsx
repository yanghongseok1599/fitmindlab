import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">개인정보처리방침</h1>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">1. 수집하는 개인정보 항목</h2>
            <p className="text-slate-600 leading-relaxed">핏마인드랩은 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-2">
              <li><strong>서비스 이용 시:</strong> 검사 응답 데이터, 검사 결과, 선택한 역할(대표/관리자/트레이너/FC)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">2. 개인정보의 수집 및 이용 목적</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>회원 식별 및 서비스 제공</li>
              <li>강점검사 결과 저장 및 히스토리 관리</li>
              <li>서비스 개선 및 통계 분석 (비식별화 처리)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">3. 개인정보의 보유 및 이용 기간</h2>
            <p className="text-slate-600 leading-relaxed">
              회원 탈퇴 시까지 보유하며, 탈퇴 요청 시 지체 없이 파기합니다. 단, 관련 법령에 의해 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">4. 개인정보의 제3자 제공</h2>
            <p className="text-slate-600 leading-relaxed">
              핏마인드랩은 원칙적으로 사용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 법령에 의거하거나 사용자의 동의가 있는 경우에 한하여 제공할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">5. 개인정보의 안전성 확보 조치</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>데이터 암호화 전송 (HTTPS/TLS)</li>
              <li>인증 정보 안전 관리</li>
              <li>접근 권한 제한 및 관리</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">6. 사용자의 권리</h2>
            <p className="text-slate-600 leading-relaxed">사용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-2">
              <li>개인정보 열람, 수정, 삭제 요청</li>
              <li>회원 탈퇴 및 개인정보 처리 정지 요청</li>
              <li>개인정보 이동 요청</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">7. 쿠키 사용</h2>
            <p className="text-slate-600 leading-relaxed">
              서비스는 사용자 인증 및 세션 관리를 위해 쿠키를 사용합니다. 브라우저 설정을 통해 쿠키 사용을 거부할 수 있으나, 이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">8. 개인정보 처리방침의 변경</h2>
            <p className="text-slate-600 leading-relaxed">
              개인정보 처리방침이 변경되는 경우, 변경 사항을 서비스 내 공지를 통해 안내합니다.
            </p>
          </section>

          <p className="text-sm text-slate-400 mt-8">시행일: 2025년 1월 1일</p>
        </div>
      </div>
    </main>
  );
}
