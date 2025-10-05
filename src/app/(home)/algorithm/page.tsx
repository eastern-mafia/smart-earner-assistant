import Image from "next/image";

export const metadata = {
  title: "Algorithm | DriveNet",
  description: "Supply-demand model for determining optimal driver actions",
};

export default function AlgorithmPage() {
  return (
    <main className="mb-16 w-full font-light">
      <section className="w-full px-6 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            How the algorithm works
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl text-lg md:text-xl">
            This page describes the technical design behind our simulation and
            planning system for on-demand mobility. All content is static and
            representative of the production approach.
          </p>
        </div>
      </section>

      <section className="w-full px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              1. Data generation
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We use Python tooling to synthesize realistic supply and demand
              signals. Order arrivals follow an inhomogeneous Poisson process
              \(\lambda(t, z)\) parameterized by time-of-day and zone features.
              Driver supply is sampled from historical-like distributions and
              bootstrapped to match target fleet size.
            </p>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              For every order we generate origins, destinations, trip distances,
              and service-time components using mixture models with map-matched
              speeds. We fix random seeds for reproducibility and export
              datasets as Parquet/CSV for downstream training and simulation.
            </p>
          </div>
          <div className="bg-card relative aspect-[16/10] w-full overflow-hidden rounded-lg border">
            <Image
              src="/sample.png"
              alt="Placeholder for the data generation diagram"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 w-full px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              2. Simulation of Uber drivers and orders
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We run a discrete-event simulator with a global clock advancing in
              steps of \(\Delta t\). Each driver follows a state machine:
              <em>
                {" "}
                idle → enroute-to-pickup → pick-up → enroute-to-dropoff →
                dropoff → reposition/break
              </em>
              . Orders are dispatched using a cost function combining ETA,
              detour, and surge-adjusted value.
            </p>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Matching uses a greedy heuristic with optional Hungarian
              refinement per zone/time-slice. Travel times are estimated from a
              speed profile over the road graph. Cancellations, no-shows, and
              driver breaks are sampled from calibrated distributions.
            </p>
          </div>
          <div className="bg-card relative order-2 aspect-[16/10] w-full overflow-hidden rounded-lg border md:order-1">
            <Image
              src="/sample.png"
              alt="Placeholder for the driver/order simulation"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              3. AI based suggestions and planning
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We train Python-based models to recommend driver repositioning and
              acceptance thresholds. Inputs include zone embeddings, temporal
              features, surge multipliers, and recent supply/demand deltas. The
              model outputs a next-zone action and a soft acceptance policy.
            </p>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Training is offline with counterfactual evaluation. Rewards
              balance earnings per hour, pickup ETA, and customer wait time. The
              trained policy is evaluated inside the simulator and exported for
              inference as a lightweight artifact.
            </p>
          </div>
          <div className="bg-card relative aspect-[16/10] w-full overflow-hidden rounded-lg border">
            <Image
              src="/sample.png"
              alt="Placeholder for the AI planning overview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 w-full px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              4. Testing and validation
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We validate with simulation A/B tests and offline metrics: revenue
              per hour, utilization, pickup ETA, cancellation rate, and fairness
              across zones. All scenarios are seeded for reproducibility and run
              as deterministic batches.
            </p>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Unit tests cover dispatch, state transitions, and timekeeping.
              Scenario tests stress extreme demand spikes, sparse supply, and
              network slowdowns. Reports are exported with summary tables and
              time-series dashboards for review.
            </p>
          </div>
          <div className="bg-card relative order-2 aspect-[16/10] w-full overflow-hidden rounded-lg border md:order-1">
            <Image
              src="/sample.png"
              alt="Placeholder for the testing and validation"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
