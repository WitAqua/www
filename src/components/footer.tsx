"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { LuGithub } from "react-icons/lu";
import { motion } from "framer-motion";

export function SiteFooter() {
  const { language } = useLanguage();
  const localizedHref = (path: string) => {
    if (path === "/") {
      return language === "en" ? "/" : "/ja";
    }
    return language === "en" ? path : `/ja${path}`;
  };
  return (
    <footer className="inset-x-4 z-50 w-[93%] lg:w-[65%] mx-auto rounded-xl">
      <motion.div
        className="container mx-auto flex flex-col items-center justify-between md:gap-9 gap-6 px-4 py-6 sm:px-6 lg:px-8 md:flex-row md:py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:gap-6 md:text-left">
          <div className="flex flex-col items-center md:items-start max-w-xs sm:max-w-sm md:max-w-lg">
            <Image
              src="/witaqua.svg"
              width={100}
              height={100}
              alt="WitAqua Logo"
              className="h-8 w-auto"
              draggable={false}
            />
            <p className="text-muted-foreground mb-8">
              Minimal, Liquid, Android.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link
                href="https://x.com/WitAquaROM"
                className="text-muted-foreground hover:text-[#00d5bc] transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter size={20} />
              </Link>
              <Link
                href="https://github.com/WitAqua"
                className="text-muted-foreground hover:text-[#00d5bc] transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuGithub size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-10 lg:gap-40 md:flex-row md:gap-32">
          <div className="md:self-start">
            <h3 className="text-lg font-semibold mb-2 text-center md:text-left">
              {language === "en" ? "Resources" : "リソース"}
            </h3>
            <ul className="flex flex-col items-center gap-2 md:items-start">
              <li>
                <Link
                  href={localizedHref("/about")}
                  className="text-muted-foreground hover:text-[#00d5bc] transition-colors duration-300"
                >
                  {language === "en" ? "About" : "アバウト"}
                </Link>
              </li>
              <li>
                <Link
                  href="https://gerrit.witaqua.org"
                  className="text-muted-foreground hover:text-[#00d5bc] transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gerrit
                </Link>
              </li>
              <li>
                <Link
                  href="https://wiki.witaqua.org"
                  className="text-muted-foreground hover:text-[#00d5bc] transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wiki
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/orgs/WitAqua/discussions"
                  className="text-muted-foreground hover:text-[#00d5bc] transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {language === "en" ? "Discussions" : "ディスカッション"}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-center md:text-left">
              {language === "en" ? "Developers" : "開発者"}
            </h3>
            <ul className="flex flex-col items-center gap-2 md:items-start">
              <li>
                <Link
                  href="https://wiki.witaqua.org/developers/maintainership/requirements"
                  className="text-muted-foreground hover:text-[#00d5bc] transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {language === "en"
                    ? "Maintainership Requirements"
                    : "メンテナー資格要件"}
                </Link>
              </li>
              <li>
                <Link
                  href="https://wiki.witaqua.org/developers/maintainership/apply"
                  className="text-muted-foreground hover:text-[#00d5bc] transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {language === "en"
                    ? "Become a Maintainer"
                    : "メンテナーになる"}
                </Link>
              </li>
              <li>
                <Link
                  href="https://wiki.witaqua.org/developers/maintainership/code-of-conduct-and-guidelines"
                  className="text-muted-foreground hover:text-[#00d5bc] transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {language === "en"
                    ? "Code of Conduct"
                    : "コード・オブ・コンダクツ"}
                </Link>
              </li>
              <li>
                <Link
                  href="https://wiki.witaqua.org/developers/building"
                  className="text-muted-foreground hover:text-[#00d5bc] transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {language === "en" ? "Building Guides" : "ビルディングガイド"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} WitAqua.
        </div>
      </div>
    </footer>
  );
}
