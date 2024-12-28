import Image from "next/image";
import { LuGithub } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  github: string;
  twitter?: string;
  telegram?: string;
}

export function TeamMember({
  name,
  role,
  image,
  github,
  twitter,
  telegram,
}: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center text-center px-4 py-6 sm:px-6 lg:px-8 mx-auto w-full max-w-xs">
      <Image
        src={image}
        alt={name}
        width={150}
        height={150}
        className="rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-muted-foreground mb-4">{role}</p>
      <div className="flex space-x-2">
        <Button variant="outline" size="icon" asChild>
          <a
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuGithub className="h-4 w-4" />
            <span className="sr-only">GitHub profile</span>
          </a>
        </Button>
        {twitter && (
          <Button variant="outline" size="icon" asChild>
            <a
              href={`https://x.com/${twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="h-4 w-4" />
              <span className="sr-only">X profile</span>
            </a>
          </Button>
        )}
        {telegram && (
          <Button variant="outline" size="icon" asChild>
            <a
              href={`https://t.me/${telegram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane className="h-4 w-4" />
              <span className="sr-only">Telegram profile</span>
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
