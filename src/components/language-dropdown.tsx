"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuGlobe } from "react-icons/lu";
import { useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "ja", name: "日本語" },
];

export function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = async (lang: "en" | "ja") => {
    if (isChanging) return;
    setIsChanging(true);
    try {
      await setLanguage(lang);
    } catch (error) {
      console.error("Failed to change language:", error);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isChanging}>
          <LuGlobe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code as "en" | "ja")}
            className={language === lang.code ? "bg-accent" : ""}
            disabled={isChanging}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
