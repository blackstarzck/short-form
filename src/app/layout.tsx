import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { BottomNav } from "@/components/layout/BottomNav";
import "./globals.css";

const pretendard = localFont({
  src: [
    { path: "../../public/fonts/Pretendard-Thin.otf", weight: "100", style: "normal" },
    { path: "../../public/fonts/Pretendard-ExtraLight.otf", weight: "200", style: "normal" },
    { path: "../../public/fonts/Pretendard-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Pretendard-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Pretendard-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Pretendard-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Pretendard-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Pretendard-ExtraBold.otf", weight: "800", style: "normal" },
    { path: "../../public/fonts/Pretendard-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "ShortForm Knowledge",
  description: "짧은 영상으로 더 빠르게, 더 깊이 배우세요.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${pretendard.variable} font-sans antialiased bg-black text-white`}
      >
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
