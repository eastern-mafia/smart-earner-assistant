import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

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
            AI guidance • Real time • For drivers
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Earn smarter on Uber with AI-guided actions
          </h1>
          <p className="text-muted-foreground mt-4 text-lg md:text-xl">
            See what to do next in real time so you can focus on the road.
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

      <section className="w-full px-6 py-16">
        <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-2">
          <div className="bg-card rounded-xl border p-6">
            <h2 className="text-xl font-semibold">The problem</h2>
            <p className="text-muted-foreground mt-3">
              Drivers juggle many demands during a shift. They watch traffic. They plan the next ride. They handle events they did not expect. They also need to remember to take a break.
            </p>
          </div>
          <div className="bg-card rounded-xl border p-6">
            <h2 className="text-xl font-semibold">Our solution</h2>
            <p className="text-muted-foreground mt-3">
              We model supply and demand based on rides, requests, and idle drivers. We use this data to predict where demand will spike. We then suggest where to move to cut idle time and find better rides.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-8">
        <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-2">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-lg font-semibold">Break guidance</h3>
            <p className="text-muted-foreground mt-3">
              The app tracks how long you have been driving. It suggests a break at the right moment.
            </p>
          </div>
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-lg font-semibold">Simple interface</h3>
            <p className="text-muted-foreground mt-3">
              You see AI suggestions as they are predicted by the Python backend. Use the map to view your location and demand in any area.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl text-center">See it in action</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <figure className="bg-card rounded-xl border p-4 flex flex-col items-center">
              <div className="relative w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-lg border">
                <Image src="/app_main.png" alt="Main app screen with AI suggestions" fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
              </div>
              <figcaption className="text-muted-foreground mt-3 text-sm">Main screen with clear next steps</figcaption>
            </figure>
            <figure className="bg-card rounded-xl border p-4 flex flex-col items-center">
              <div className="relative w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-lg border">
                <Image src="/map.png" alt="Map view showing demand and location" fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
              </div>
              <figcaption className="text-muted-foreground mt-3 text-sm">Map view of demand and location</figcaption>
            </figure>
            <figure className="bg-card rounded-xl border p-4 flex flex-col items-center">
              <div className="relative w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-lg border">
                <Image src="/break.png" alt="Break screen with steps to follow" fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
              </div>
              <figcaption className="text-muted-foreground mt-3 text-sm">Configurable break with steps to follow</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 w-full px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to drive smarter?
          </h2>
          <p className="text-muted-foreground mt-3">
            Open the app to get clear actions that help you earn more.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild>
              <Link href="/app" className="h-12">Open the app</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/algorithm" className="h-12">See algorithm</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
