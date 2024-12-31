"use client";

import { useState } from "react";
import Link from "next/link";
import { LuGithub } from "react-icons/lu";
import { RxDragHandleDots2 } from "react-icons/rx";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { FaXTwitter } from "react-icons/fa6";
import { PiDotsSixVerticalFill } from "react-icons/pi";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-start px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
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
            href="/devices"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Devices
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
          <Link href="https://github.com/WitAqua"> 
            <Button variant="ghost" size="icon">
              <LuGithub className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="https://x.com/WitAquaROM"> 
            <Button variant="ghost" size="icon">
              <FaXTwitter className="h-5 w-5" />
            </Button>
          </Link>
          <ThemeToggle />
          <button
            className="block sm:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <PiDotsSixVerticalFill className="h-6 w-6" />
            ) : (
              <RxDragHandleDots2 className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`sm:hidden bg-background/95 border-t overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col space-y-2 p-4">
          <Link
            href="/devices"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={toggleMenu}
          >
            Devices
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={toggleMenu}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

