
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import planets from "../data/planets";
import Starfield from "../components/Starfield";
import stories from "../data/stories";

const PlanetDetail = () => {
  const { planetId } = useParams();
  const location = useLocation();

  // Find the matching planet
  const planet = planets.find(
    (item) => item.id === planetId
  );

  // Find documentaries associated with this planet
  const planetStories = stories.filter(
    (story) => story.planetId === planetId
  );

  // Find other planets
  const relatedPlanets = planets.filter(
    (item) => item.id !== planetId
  );

  // Handle invalid planet IDs
  if (!planet) {
    return (
      <div className="min-h-screen bg-[#03050B] p-10 text-white">
        <h1 className="text-3xl font-bold">
          Planet not found
        </h1>

        <Link
          to="/discover"
          className="mt-5 inline-block text-cyan-400 hover:text-cyan-200"
        >
          ← Back to Discover
        </Link>
      </div>
    );
  }

  return (
    <motion.main
      key={location.pathname}
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="min-h-screen overflow-hidden bg-[#03050B] text-white"
    >

      {/* ================================= */}
      {/* PLANET HERO SECTION */}
      {/* ================================= */}

      <section className="relative flex min-h-[650px] items-center overflow-hidden">

        {/* Planet Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={planet.image}
            alt={planet.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#03050B] via-[#03050B]/75 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#03050B] via-transparent to-[#03050B]/30" />
        </div>

        {/* Starfield */}
        <Starfield />

        {/* Hero Content */}
        <div className="relative z-20 mx-auto w-full max-w-[1600px] px-6 py-24 md:px-12">

          <Link
            to="/discover"
            className="mb-12 inline-flex items-center gap-3 text-sm text-slate-300 transition hover:text-cyan-300"
          >
            <span>←</span>
            Back to Discover
          </Link>

          <p className="mb-5 text-xs font-bold tracking-[0.4em] text-cyan-300">
            {planet.category}
          </p>

          <h1 className="max-w-3xl text-6xl font-black tracking-tight md:text-8xl">
            {planet.name}
          </h1>

          <h2 className="mt-4 text-xl font-semibold tracking-[0.2em] text-amber-300 md:text-2xl">
            {planet.title}
          </h2>

          <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
            {planet.description}
          </p>

          <button
            onClick={() =>
              document.getElementById("planet-facts")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="mt-9 rounded-lg bg-cyan-300 px-7 py-4 font-bold text-[#031018] transition hover:bg-cyan-200"
          >
            Explore Planet ↓
          </button>

        </div>

        {/* Planet Identification */}
        <div className="absolute bottom-8 right-8 z-10 hidden text-right md:block">
          <p className="text-[10px] tracking-[0.3em] text-slate-400">
            ORBITX PLANETARY DATABASE
          </p>

          <p className="mt-2 text-sm font-bold tracking-widest text-cyan-300">
            PLANET ID · {planet.id}
          </p>
        </div>

      </section>

      {/* ================================= */}
      {/* PLANET INTELLIGENCE SECTION */}
      {/* ================================= */}

      <section
        id="planet-facts"
        className="relative mx-auto max-w-[1600px] px-6 py-20 md:px-12"
      >

        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.35em] text-cyan-400">
            PLANETARY INTELLIGENCE
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Understanding {planet.name}
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            Explore the scientific characteristics and physical properties
            of this extraordinary world.
          </p>
        </div>

        {/* Planet Facts */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/[0.05]">
            <p className="text-sm text-slate-400">
              Diameter
            </p>

            <h3 className="mt-4 text-xl font-bold text-white md:text-2xl">
              {planet.facts.diameter}
            </h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/[0.05]">
            <p className="text-sm text-slate-400">
              Gravity
            </p>

            <h3 className="mt-4 text-xl font-bold text-white md:text-2xl">
              {planet.facts.gravity}
            </h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/[0.05]">
            <p className="text-sm text-slate-400">
              Day Length
            </p>

            <h3 className="mt-4 text-xl font-bold text-white md:text-2xl">
              {planet.facts.day}
            </h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/[0.05]">
            <p className="text-sm text-slate-400">
              Distance from Sun
            </p>

            <h3 className="mt-4 text-xl font-bold text-white md:text-2xl">
              {planet.facts.distance}
            </h3>
          </div>

        </div>

      </section>

      {/* ================================= */}
      {/* DOCUMENTARY COLLECTION */}
      {/* ================================= */}

      <section className="px-6 py-20 md:px-16">

        <div className="mx-auto max-w-7xl">

          <p className="mb-4 text-xs tracking-[0.35em] text-cyan-400">
            EXPLORE THE STORY
          </p>

          <h2 className="mb-4 text-3xl font-semibold text-white md:text-5xl">
            Documentaries from {planet.name}
          </h2>

          <p className="mb-12 max-w-2xl text-gray-400">
            Go beyond the surface and discover the stories, mysteries and
            scientific discoveries behind this world.
          </p>

          {planetStories.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

              {planetStories.map((story) => (
                <div
                  key={story.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:border-cyan-400/50"
                >

                  <p className="mb-3 text-xs tracking-widest text-cyan-400">
                    {story.category}
                  </p>

                  <h3 className="mb-2 text-2xl font-semibold text-white">
                    {story.title}
                  </h3>

                  <p className="mb-4 text-sm text-gray-400">
                    {story.subtitle}
                  </p>

                  <p className="mb-6 leading-relaxed text-gray-300">
                    {story.description}
                  </p>

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-sm text-gray-500">
                      {story.episodes.length} Episodes
                      {story.duration && ` · ${story.duration}`}
                    </span>

                    <Link
                      to={`/watch/${story.id}`}
                      className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                    >
                      WATCH NOW →
                    </Link>

                  </div>

                </div>
              ))}

            </div>
          ) : (
            <p className="text-gray-400">
              No documentaries are available for this planet yet.
            </p>
          )}

        </div>

      </section>

      {/* ================================= */}
      {/* EXPLORE OTHER PLANETS */}
      {/* ================================= */}

      <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-12">

        <div className="mb-10">

          <p className="text-xs font-bold tracking-[0.35em] text-cyan-400">
            CONTINUE YOUR JOURNEY
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Explore Other Worlds
          </h2>

          <p className="mt-3 text-slate-400">
            There is always another world waiting to be discovered.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {relatedPlanets.map((item) => (
            <Link
              key={item.id}
              to={`/planet/${item.id}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B101A] transition duration-500 hover:-translate-y-2 hover:border-cyan-400/50"
            >

              <div className="relative h-64 overflow-hidden">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#03050B] via-transparent to-transparent" />

                <span className="absolute left-5 top-5 rounded-full border border-cyan-300/30 bg-black/50 px-3 py-1 text-[10px] font-bold tracking-widest text-cyan-300 backdrop-blur-md">
                  {item.category}
                </span>

                <div className="absolute bottom-5 left-5">

                  <h3 className="text-2xl font-bold text-white">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-300">
                    {item.title}
                  </p>

                </div>

              </div>

              <div className="flex items-center justify-between p-5">

                <span className="text-sm text-slate-400">
                  Discover this world
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-cyan-300 transition group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:text-black">
                  →
                </span>

              </div>

            </Link>
          ))}

        </div>

      </section>

    </motion.main>
  );
};

export default PlanetDetail;
