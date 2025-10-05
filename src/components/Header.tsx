import Link from "next/link";
import { Button } from "./ui/button";

type HeaderLink = {
  href: string;
  label: string;
};

const LINKS: HeaderLink[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/app",
    label: "App",
  },
  {
    href: "/algorithm",
    label: "Algorithm",
  },
];

export default function Header() {
  return (
    <header className="bg-foreground text-background absolute z-50 flex h-16 w-screen items-center justify-between p-4 md:px-8">
      <Link href="/" className="text-xl md:text-2xl font-light hidden min-[350px]:block">
        DriveNet
      </Link>
      <div className="flex items-center gap-1 md:gap-2 ml-auto">
        {LINKS.map((link) => (
          <Button variant="ghost" asChild key={link.href} className="hover:text-background hover:!bg-background/10 rounded-full px-2 md:px-4">
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </div>
    </header>
  );
}
