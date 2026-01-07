import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://fitmindlab.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "핏마인드랩 | 피트니스 리더 강점검사",
    template: "%s | 핏마인드랩",
  },
  description:
    "피트니스 업계 종사자(경영자, 운영자, 트레이너)를 위한 맞춤형 강점검사. 갤럽 기반 36개 강점으로 나만의 피트니스 리더십 유형을 발견하세요.",
  alternates: {
    canonical: siteUrl,
    languages: { ko: `${siteUrl}/` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "핏마인드랩 - 피트니스 리더 강점검사",
    description:
      "나의 피트니스 리더십 강점을 발견하세요. 경영자, 운영자, 트레이너 역할에 맞는 36개 강점을 분석하고 8가지 리더 유형 중 나만의 유형을 확인하세요.",
    siteName: "핏마인드랩",
    locale: "ko_KR",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "핏마인드랩 - 피트니스 리더 강점검사",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "핏마인드랩 - 피트니스 리더 강점검사",
    description:
      "피트니스 업계 종사자를 위한 맞춤형 강점검사. 나만의 리더십 유형을 발견하세요.",
    images: [`${siteUrl}/og-image.png`],
  },
  keywords: [
    "피트니스 강점검사",
    "트레이너 성격검사",
    "PT 강점",
    "헬스장 경영",
    "피트니스 리더십",
    "갤럽 강점",
    "핏마인드랩",
    "피트니스 유형검사",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  category: "health",
  verification: {
    // google: "구글서치콘솔코드",
    // naver: "네이버웹마스터코드",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
