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
          {/*<div className="bg-card relative aspect-[16/10] w-full overflow-hidden rounded-lg border">
            <Image
              src="/sample.png"
              alt="Placeholder for the data generation diagram"
              fill
              className="object-cover"
              priority
            />
          </div>*/}

          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              0. Our solution
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We belive the best way to optimise the experience of the Uber
              Earners is to minimise the time they spend in between orders, and
              ensuring they take breaks from time to time.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Our approach aims to forecast where demand will be in the next
              time period, and create an optimised assignment of drivers to best
              satify this demand. Then we put the drivers "in motion" towards
              areas of higher demand. This ensures small idle times and higher
              surge rates, both of which maximise earnings per hour.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              1. Data generation
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We use Python tooling to synthesize realistic supply and demand of
              drivers and riders. Locations are modeled as hexagons and the
              generation of demand follows a poisson distribution with mean
              dependant on time of day and day of the week. After analysing the
              provided data, we realised that most of the rides start and end in
              similar locations. We modeled this feature by randomly assigning
              hexagons as "hot-spots", area for which we significantly boost the
              amount of rides starting and ending at. We also add a small amount
              of noise to each demand value.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Most assumptions should hold when considering eats instead of
              rides. The "hot-spots" are even more proeminent for starting
              locations, as all rides start at predefined restaurants. Thus,
              adapting the model to eats is a matter of tweaking data
              generation.
            </p>
          </div>
          <div className="bg-card relative aspect-[16/10] w-full overflow-hidden rounded-lg border">
            <Image
              src="/gen.png"
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
              We simulate how demand and supply interact in a event based
              setting. There are queues for drivers and riders who are currently
              waiting. Whenever a driver ends a ride, or a new driver starts a
              shift, the algorithm tries to find a good match for a rider that
              is wating, and if it does not find one, he is placed in the queue.
              Same for when a ride is created.
            </p>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Matching is based on the waiting times of both parties and the
              distance between them. Our simulation also models drivers ending
              their shifts and adds a small amount of noise to the duration of
              rides, to account for time to move inside the hexagons.
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
              We train a machine learning model to predict demand based on
              historic generated data. Even though our assumptions about the
              behaviour of the demand might be innacurate, using real-life data
              and a more approriate model is definetely doable in a real-world
              scenario.
            </p>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              We use the model to predict how demand is going to look like in
              the following hour. With this data, we compute optimal suggestions
              for where the drivers should move to anticipate demand. This way,
              the idle time, measured as the period in which the driver is
              moving to the passenger, is greatly reduced, compared to a driver
              that idles in the spot he finished the previous ride.
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
    </main>
  );
}
