import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import Providers from "@/components/motion/Providers";

export const metadata: Metadata = {
  title: "SKILLORA — Build smarter. Manage better. Grow with AI.",
  description:
    "SKILLORA is an AI-powered entrepreneurship and enterprise management platform. Plan, operate, analyze and grow your business with explainable decision support.",
  icons: { icon: "/favicon.svg" },
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "SKILLORA" },
};

// Pinch-zoom stays enabled (accessibility); only the notch/safe-area behaviour is customised.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#17181C",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" data-theme="sunrise">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* App Router: a <link> in the root layout applies to every page (the lint rule targets pages/_document). */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
