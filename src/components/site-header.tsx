import Link from "next/link";
import { LuGithub } from "react-icons/lu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4 sm:px-6 lg:px-8">
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

        <nav className="ml-6 flex items-center space-x-4 sm:space-x-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
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

        <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
          <Link href="https://github.com/WitAqua">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
            >
              <LuGithub className="h-5 w-5" />
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
