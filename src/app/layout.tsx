import { Geist } from "next/font/google";
import { ThemeProvider } from "./providers";
import { SiteHeader } from "@/components/header";
import { SiteFooter } from "@/components/footer";
import type { Metadata } from "next";
import type React from "react";
import { LanguageProvider } from "../contexts/LanguageContext";

import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "WitAqua",
    template: "%s / WitAqua",
  },
  description: "A custom Android ROM based on LineageOS.",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang === "ja" ? "ja" : "en";

  return (
    <html lang={lang} suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={`${geist.className} min-h-screen bg-[#eff1f5] dark:bg-[#171717] antialiased`}
      >
        <LanguageProvider initialLang={lang}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
