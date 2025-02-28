"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

type Language = "en" | "ja";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLang: Language;
}> = ({ children, initialLang }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguageState] = useState<Language>(initialLang);

  useEffect(() => {
    const detectedLang = pathname?.startsWith("/ja") ? "ja" : "en";
    setLanguageState(detectedLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLanguage", detectedLang);
      document.documentElement.lang = detectedLang;
    }
  }, [pathname]);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLanguage", lang);
      document.documentElement.lang = lang;

      let currentPath = pathname || "/";
      if (currentPath !== "/" && currentPath.endsWith("/")) {
        currentPath = currentPath.slice(0, -1);
      }

      const newPath =
        lang === "en"
          ? currentPath.replace(/^\/ja/, "") || "/"
          : currentPath === "/"
            ? "/ja"
            : `/ja${currentPath.replace(/^\/ja/, "")}`;

      try {
        router.push(newPath);
      } catch (error) {
        console.error("Navigation error:", error);
        setLanguageState(language);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
