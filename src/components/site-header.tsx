"use client";

import Link from "next/link";
import { LuGithub } from "react-icons/lu";
import { MdOutlineForum } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { FaXTwitter } from "react-icons/fa6";
import { LanguageDropdown } from "./language-dropdown";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { DropdownMenuContent } from "./ui/dropdown-menu";
import { useLanguage } from "../contexts/LanguageContext";

export function SiteHeader() {
  const { language } = useLanguage();

  const localizedHref = (path: string) => {
    if (path === "/") {
      return language === "en" ? "/" : "/ja";
    }
    return language === "en" ? path : `/ja${path}`;
  };

  return (
    <header className="sticky top-0 z-50 border-b w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-start px-4 sm:px-6 lg:px-8">
        <Link href={localizedHref("/")} className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            width={100}
            height={50}
            alt="WitAqua Logo"
            className="h-8 w-auto"
          />
          <span className="font-bold text-xl">WitAqua</span>
        </Link>

        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 ml-6">
          <Link
            href={localizedHref("/devices")}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {language === "en" ? "Devices" : "デバイス"}
          </Link>
          <Link
            href={localizedHref("/about")}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {language === "en" ? "About" : "私たちについて"}
          </Link>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
          <Link href="https://github.com/WitAqua" className="hidden sm:flex">
            <Button variant="ghost" size="icon">
              <LuGithub className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="https://x.com/WitAquaROM" className="hidden sm:flex">
            <Button variant="ghost" size="icon">
              <FaXTwitter className="h-5 w-5" />
            </Button>
          </Link>
          <Link
            href="https://github.com/orgs/WitAqua/discussions"
            className="hidden sm:flex"
          >
            <Button variant="ghost" size="icon">
              <MdOutlineForum className="h-5 w-5" />
            </Button>
          </Link>
          <LanguageDropdown />
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon">
                <RxDragHandleDots2 className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link
                  href={localizedHref("/devices")}
                  className="text-sm font-medium justify-center transition-colors hover:text-primary"
                >
                  {language === "en" ? "Devices" : "デバイス"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={localizedHref("/about")}
                  className="text-sm font-medium justify-center transition-colors hover:text-primary"
                >
                  {language === "en" ? "About" : "私たちについて"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="https://github.com/WitAqua"
                  className="items-center justify-center"
                >
                  <LuGithub className="h-5 w-5" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="https://x.com/WitAquaROM"
                  className="items-center justify-center"
                >
                  <FaXTwitter className="h-5 w-5" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="https://github.com/orgs/WitAqua/discussions"
                  className="items-center justify-center"
                >
                  <MdOutlineForum className="h-5 w-5" />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
