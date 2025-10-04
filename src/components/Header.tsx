import { SignInButton, UserButton, SignUpButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-end gap-4 border-b p-4 lg:gap-8">
      <Unauthenticated>
        <SignInButton>
          <Button
            className="cursor-pointer text-sm sm:text-base"
            variant="link"
          >
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton>
          <button className="bg-primary text-background h-10 cursor-pointer rounded-full px-4 text-sm font-medium sm:h-12 sm:px-5 sm:text-base">
            Sign Up
          </button>
        </SignUpButton>
      </Unauthenticated>
      <Authenticated>
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/todos" className="hover:underline">
          Todos
        </Link>
        <UserButton />
      </Authenticated>
      <ThemeToggle />
    </header>
  );
}
