"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageDropdown } from "@/components/lang-dropdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDiscord } from "react-icons/fa6";

export function SiteHeader() {
  const { language } = useLanguage();

  const localizedHref = (path: string) => {
    if (path === "/") {
      return language === "en" ? "/" : "/ja";
    }
    return language === "en" ? path : `/ja${path}`;
  };

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-6 inset-x-4 z-50 w-[93%] lg:w-[65%] mx-auto bg-white backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#6f6f6f]/20 shadow-lg rounded-2xl"
    >
      <div className="flex h-14 items-center px-6 sm:px-8 lg:px-8 py-8">
        <Link href={localizedHref("/")} className="flex items-center space-x-2">
          <Image
            src="/witaqua.svg"
            width={100}
            height={100}
            alt="WitAqua Logo"
            className="h-8 w-auto"
          />
        </Link>
        <nav className="text-muted-foreground font-medium hidden lg:flex md:flex flex-1 pl-24 justify-center space-x-4">
          <Link
            href="https://wiki.witaqua.org"
            className="hover:text-[#00d5bc] transition-colors duration-300"
            target="_blank"
            rel="norefferer noopener"
          >
            Wiki
          </Link>
          <Link
            href={localizedHref("/about")}
            className="hover:text-[#00d5bc] transition-colors duration-300"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
          <Link
            href="https://discord.gg/Br2zts2V2J"
            className="transition-colors duration-300 hidden sm:block"
            target="_blank"
            rel="norefferer noopener"
          >
            <Button
              className="hover:bg-[#d8dfe3] dark:hover:bg-[#545454]"
              variant="ghost"
              size="icon"
            >
              <FaDiscord className="w-5 h-5" />
            </Button>
          </Link>

          <LanguageDropdown />
          <ThemeToggle />
          <Link href={language === "en" ? "/devices" : "/ja/devices"}>
            <Button
              size="default"
              className="bg-[#00c8ff] transition-colors duration-500 hover:bg-[#00aeff] font-medium"
            >
              {language === "en" ? "Download" : "ダウンロード"}
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
