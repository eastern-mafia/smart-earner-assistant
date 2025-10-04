import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b p-4">
      <Link href="/" className="text-xl font-bold">
        Smart Earner Assistant
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
      </div>
    </header>
  );
}
