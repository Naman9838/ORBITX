
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const featuredPlanets = [
  {
    id: 1,
    name: "THE BLUE FRONTIER",
    planet: "Ocean World",
    category: "ORBITX ORIGINAL",
    episodes: "6 Episodes",
    duration: "42 min",
    description:
      "Journey into a mysterious ocean world and discover the forces that shaped its atmosphere, oceans and extraordinary evolution.",
    image:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1800",
    color: "cyan",
    code: "OX-001",
  },
  {
    id: 2,
    name: "THE RED KINGDOM",
    planet: "Mars",
    category: "PLANETARY HISTORY",
    episodes: "4 Episodes",
    duration: "38 min",
    description:
      "Explore a world of ancient rivers, towering volcanoes and lost oceans. Discover how Mars became the planet we know today.",
    image:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1800",
    color: "orange",
    code: "OX-002",
  },
  {
    id: 3,
    name: "BEYOND THE ICE",
    planet: "Frozen World",
    category: "COSMIC STORIES",
    episodes: "5 Episodes",
    duration: "45 min",
    description:
      "Travel across frozen landscapes and uncover the secrets hidden beneath the surface of distant icy worlds.",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1800",
    color: "blue",
    code: "OX-003",
  },
  {
    id: 4,
    name: "GIANTS OF SPACE",
    planet: "Gas Giants",
    category: "SPACE DOCUMENTARY",
    episodes: "7 Episodes",
    duration: "50 min",
    description:
      "Enter the realm of colossal planets, spectacular storms and magnificent rings in the outer reaches of space.",
    image:
      "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=1800",
    color: "amber",
    code: "OX-004",
  },
];

const FeaturedPlanet = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const activePlanet = featuredPlanets[activeIndex];

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % featuredPlanets.length);
  };

  const previousSlide = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + featuredPlanets.length) % featuredPlanets.length
    );
  };

  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-[#03050B] text-white md:min-h-[760px]">

      {/* Cinematic background */}
      <div className="absolute inset-0 -z-20">
        <img
          key={activePlanet.id}
          src={activePlanet.image}
          alt={activePlanet.planet}
          className="h-full w-full scale-105 object-cover opacity-35 transition-all duration-1000"
        />
      </div>

      {/* Atmospheric lighting */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#03050B] via-[#03050B]/85 to-[#03050B]/35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#03050B] via-transparent to-[#03050B]/60" />

      <div className="pointer-events-none absolute -right-40 top-10 -z-10 h-[550px] w-[550px] rounded-full border border-cyan-300/10 shadow-[0_0_120px_rgba(34,211,238,0.08)]" />

      <div className="pointer-events-none absolute -right-20 top-32 -z-10 h-[400px] w-[400px] rounded-full border border-white/5" />

      <div className="pointer-events-none absolute left-1/3 top-1/4 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 pb-20 pt-20 md:px-12 md:pb-24 md:pt-28">

        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

          {/* Featured story */}
          <div className="relative z-10 max-w-2xl">

            {/* Top label */}
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>

              <span className="text-[10px] font-bold tracking-[0.28em] text-cyan-200">
                {activePlanet.category}
              </span>

              <span className="h-3 w-px bg-white/20" />

              <span className="text-[10px] tracking-widest text-slate-400">
                {activePlanet.code}
              </span>
            </div>

            <p className="mb-5 text-xs font-medium uppercase tracking-[0.45em] text-slate-400">
              A journey beyond the known
            </p>

            {/* Main title */}
            <h1 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.055em] md:text-7xl xl:text-8xl">
              {activePlanet.name.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={
                    index === activePlanet.name.split(" ").length - 1
                      ? "block bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent"
                      : "block text-white"
                  }
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Planet metadata */}
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-slate-300 md:text-sm">
              <span className="font-semibold text-cyan-300">
                {activePlanet.planet}
              </span>

              <span className="text-cyan-400/50">✦</span>
              <span>{activePlanet.episodes}</span>

              <span className="text-cyan-400/50">✦</span>
              <span>{activePlanet.duration}</span>

              <span className="rounded border border-white/15 px-2 py-1 text-[9px] font-bold tracking-wider text-slate-300">
                4K ULTRA HD
              </span>
            </div>

            {/* Description */}
            <p className="mt-7 max-w-lg text-sm leading-8 text-slate-300 md:text-base">
              {activePlanet.description}
            </p>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap items-center gap-4">

              <button
                onClick={() => navigate(`/watch/${activePlanet.id}`)}
                className="group relative flex items-center gap-4 overflow-hidden rounded-lg bg-cyan-300 px-7 py-4 font-bold text-[#031018] shadow-[0_0_30px_rgba(34,211,238,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-cyan-200 hover:shadow-[0_0_45px_rgba(34,211,238,0.4)]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition group-hover:scale-110">
                  ▶
                </span>
                <span>Play Story</span>
              </button>

              <button
                onClick={() => navigate(`/planet/${activePlanet.id}`)}
                className="group flex items-center gap-3 rounded-lg border border-white/20 bg-white/[0.06] px-7 py-4 font-semibold text-white backdrop-blur-xl transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
              >
                <span className="text-lg text-cyan-300">ⓘ</span>
                More Info
                <span className="transition group-hover:translate-x-1">→</span>
              </button>

            </div>

            {/* Bottom identity */}
            <div className="mt-14 flex items-center gap-4">
              <div className="h-px w-12 bg-cyan-400/60" />
              <p className="text-[9px] font-bold tracking-[0.35em] text-slate-500">
                DISCOVER THE UNIVERSE · ORBITX
              </p>
            </div>
          </div>

          {/* Featured worlds carousel */}
          <div className="relative">

            {/* Carousel heading */}
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="mb-2 text-[10px] font-bold tracking-[0.35em] text-cyan-300">
                  YOUR NEXT DESTINATION
                </p>

                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Featured Worlds
                </h2>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={previousSlide}
                  aria-label="Previous planet"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-xl text-white backdrop-blur-lg transition hover:border-cyan-300 hover:bg-cyan-300/10 hover:text-cyan-300"
                >
                  ‹
                </button>

                <button
                  onClick={nextSlide}
                  aria-label="Next planet"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-xl text-white backdrop-blur-lg transition hover:border-cyan-300 hover:bg-cyan-300/10 hover:text-cyan-300"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-4">

              {featuredPlanets.map((planet, index) => (
                <button
                  key={planet.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-500 ${
                    activeIndex === index
                      ? "border-cyan-300/80 shadow-[0_0_35px_rgba(34,211,238,0.16)]"
                      : "border-white/10 hover:-translate-y-1 hover:border-white/40"
                  }`}
                >

                  <div className="relative aspect-[16/11] overflow-hidden">

                    <img
                      src={planet.image}
                      alt={planet.planet}
                      className={`h-full w-full object-cover transition duration-700 group-hover:scale-110 ${
                        activeIndex === index
                          ? "scale-105 opacity-100"
                          : "opacity-55 group-hover:opacity-100"
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#03050B] via-black/10 to-transparent" />

                    <div className="absolute inset-0 bg-cyan-400/0 transition duration-500 group-hover:bg-cyan-400/[0.06]" />

                    {/* Active indicator */}
                    {activeIndex === index && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-cyan-300 shadow-[0_0_15px_#22D3EE]" />
                    )}

                    <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xs text-white backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">

                      <p className="mb-2 text-[9px] font-bold tracking-[0.2em] text-cyan-300">
                        {planet.category}
                      </p>

                      <h3 className="text-sm font-bold text-white md:text-lg">
                        {planet.planet}
                      </h3>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {planet.episodes} · {planet.duration}
                      </p>
                    </div>
                  </div>

                  {/* Active card bottom line */}
                  <div className="h-[2px] w-full bg-white/5">
                    <div
                      className={`h-full transition-all duration-500 ${
                        activeIndex === index
                          ? "w-full bg-cyan-300"
                          : "w-0 bg-cyan-300 group-hover:w-full"
                      }`}
                    />
                  </div>
                </button>
              ))}

            </div>

            {/* Carousel footer */}
            <div className="mt-7 flex items-center justify-between">

              <div className="flex items-center gap-2">
                {featuredPlanets.map((planet, index) => (
                  <button
                    key={planet.id}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show ${planet.planet}`}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      activeIndex === index
                        ? "w-12 bg-cyan-300"
                        : "w-5 bg-white/20 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <p className="text-[10px] font-bold tracking-[0.25em] text-slate-500">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="mx-2 text-cyan-400">/</span>
                04 WORLDS
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom atmospheric fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-[#03050B] to-transparent" />

    </section>
  );
};

export default FeaturedPlanet;
