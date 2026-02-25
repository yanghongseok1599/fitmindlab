import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "이용약관",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">이용약관</h1>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">제1조 (목적)</h2>
            <p className="text-slate-600 leading-relaxed">
              이 약관은 핏마인드랩(이하 &quot;서비스&quot;)이 제공하는 피트니스 리더 강점검사 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">제2조 (서비스의 내용)</h2>
            <p className="text-slate-600 leading-relaxed">
              서비스는 피트니스 업계 종사자(경영자, 운영자, 트레이너)를 위한 맞춤형 강점검사를 제공합니다. 무료 검사(36문항)와 프리미엄 검사(108문항)를 통해 사용자의 강점을 분석하고 피트니스 리더 유형을 제공합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">제3조 (회원가입 및 계정)</h2>
            <p className="text-slate-600 leading-relaxed">
              서비스는 별도의 회원가입 없이 이용할 수 있습니다. 검사 결과는 브라우저에 저장되며, 결과 페이지에서 바로 확인할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">제4조 (서비스 이용)</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>검사 결과는 참고 자료로만 활용되며, 전문적인 진단이나 평가를 대체하지 않습니다.</li>
              <li>서비스는 검사 결과의 정확성을 보장하지 않으며, 결과 활용에 대한 책임은 사용자에게 있습니다.</li>
              <li>서비스는 사전 공지 후 서비스 내용을 변경하거나 중단할 수 있습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">제5조 (지적재산권)</h2>
            <p className="text-slate-600 leading-relaxed">
              서비스에서 제공하는 검사 문항, 결과 분석, 콘텐츠 등에 대한 지적재산권은 핏마인드랩에 귀속됩니다. 사용자는 서비스를 통해 얻은 정보를 개인적 용도로만 사용할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">제6조 (면책조항)</h2>
            <p className="text-slate-600 leading-relaxed">
              서비스는 천재지변, 시스템 장애 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다. 사용자의 귀책사유로 인한 서비스 이용 장애에 대해서도 책임을 지지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">제7조 (약관의 변경)</h2>
            <p className="text-slate-600 leading-relaxed">
              서비스는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지를 통해 효력이 발생합니다.
            </p>
          </section>

          <p className="text-sm text-slate-400 mt-8">시행일: 2025년 1월 1일</p>
        </div>
      </div>
    </main>
  );
}
