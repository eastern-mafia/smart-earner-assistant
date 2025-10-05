import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Home | DriveNet",
  description: "AI-powered co-pilot for Uber drivers",
};

export default function HomePage() {
  return (
    <main className="mb-16 w-full font-light">
      <section className="from-background to-secondary/30 w-full bg-gradient-to-b px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl text-center flex flex-col items-center">
          <span className="border-border bg-card/60 text-muted-foreground inline-flex items-center rounded-full border px-3 py-1 text-sm">
            AI recommendations • Uber • Real-time guidance
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Earn smarter on Uber with AI-guided actions
          </h1>
          <p className="text-muted-foreground mt-4 text-lg md:text-xl">
            An AI co-pilot that suggests your next best move in real time—so you can
            focus on driving and maximize earnings.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/app" className="h-12">Open the app</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/algorithm" className="h-12">See algorithm</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="w-full px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card rounded-xl border p-6">
              <div className="bg-primary/10 text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                <span>🤖</span>
              </div>
              <h3 className="text-lg font-semibold">AI action recommendations</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Personalized, context-aware suggestions for your highest-impact next step.
              </p>
            </div>
            <div className="bg-card rounded-xl border p-6">
              <div className="bg-primary/10 text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                <span>📍</span>
              </div>
              <h3 className="text-lg font-semibold">
                Real-time market insight
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Stay ahead with timely guidance and location-aware suggestions.
              </p>
            </div>
            <div className="bg-card rounded-xl border p-6">
              <div className="bg-primary/10 text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                <span>🔒</span>
              </div>
              <h3 className="text-lg font-semibold">Privacy-first and secure</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Your data stays yours—backed by modern auth and a secure data layer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 w-full px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to drive smarter?
          </h2>
          <p className="text-muted-foreground mt-3">
            Open the app to get AI-guided actions tailored to your goals.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/app" className="h-12">Get started</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
