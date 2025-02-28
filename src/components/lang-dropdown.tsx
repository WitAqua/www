"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoLanguage } from "react-icons/io5";
import { useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "ja", name: "日本語" },
];

export function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);
  const pathname = usePathname();

  const handleLanguageChange = async (lang: "en" | "ja") => {
    if (isChanging || lang === language) return;
    setIsChanging(true);
    try {
      await setLanguage(lang);

      let currentPath = pathname.replace(/^\/ja/, "") || "/";
      if (currentPath !== "/" && currentPath.endsWith("/")) {
        currentPath = currentPath.slice(0, -1);
      }

      const newPath =
        lang === "ja"
          ? currentPath === "/"
            ? "/ja"
            : `/ja${currentPath}`
          : currentPath;

      window.history.replaceState(null, "", newPath);
      window.location.reload();
    } catch (error) {
      console.error("Failed to change language:", error);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="hover:bg-[#d8dfe3] dark:hover:bg-[#545454]"
          variant="ghost"
          size="icon"
          disabled={isChanging}
        >
          <IoLanguage className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code as "en" | "ja")}
            className={`${language === lang.code ? "" : "cursor-pointer"}`}
            disabled={isChanging}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
