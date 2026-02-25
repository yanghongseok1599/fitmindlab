import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-slate-900">
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              핏마인드랩
            </span>
          </Link>

          {/* CTA */}
          <Link
            href="/select-role"
            className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
          >
            검사 시작하기
          </Link>
        </div>
      </div>
    </header>
  );
}
