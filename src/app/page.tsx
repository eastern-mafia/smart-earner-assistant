export default function HomePage() {
  return (
    <main className="mb-16 w-full">
      <section className="from-background to-secondary/30 w-full bg-gradient-to-b px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <span className="border-border bg-card/60 text-muted-foreground inline-flex items-center rounded-full border px-3 py-1 text-sm">
            Live sync • Multi-user • Convex + Next.js
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
            Collaborate on todos in real time
          </h1>
          <p className="text-muted-foreground mt-4 text-lg md:text-xl">
            A minimal, fast todo list with live updates—no refreshes required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/app"
              className="bg-primary text-primary-foreground inline-flex items-center justify-center rounded-md px-5 py-3 shadow transition hover:opacity-90"
            >
              Open the app
            </a>
            <a
              href="#features"
              className="border-input bg-background text-foreground hover:bg-accent/40 inline-flex items-center justify-center rounded-md border px-5 py-3 shadow-sm transition"
            >
              See features
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="w-full px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card rounded-xl border p-6">
              <div className="bg-primary/10 text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                <span>⚡</span>
              </div>
              <h3 className="text-lg font-semibold">Real-time sync</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Todos update instantly across all connected devices.
              </p>
            </div>
            <div className="bg-card rounded-xl border p-6">
              <div className="bg-primary/10 text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                <span>👥</span>
              </div>
              <h3 className="text-lg font-semibold">
                Multi-user collaboration
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Invite teammates and work together on shared lists.
              </p>
            </div>
            <div className="bg-card rounded-xl border p-6">
              <div className="bg-primary/10 text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                <span>🔒</span>
              </div>
              <h3 className="text-lg font-semibold">Secure by default</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Backed by modern auth and a serverless data layer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 w-full px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to try it?
          </h2>
          <p className="text-muted-foreground mt-3">
            Create and share a list with your team in seconds.
          </p>
          <div className="mt-6">
            <a
              href="/app"
              className="bg-primary text-primary-foreground inline-flex items-center justify-center rounded-md px-5 py-3 shadow transition hover:opacity-90"
            >
              Get started
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
