
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import planets from "../data/planets";

const UniverseSection = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("DEFAULT");

  const categories = [
    "ALL",
    ...new Set(planets.map((planet) => planet.category)),
  ];

  const filteredPlanets = useMemo(() => {
    let result = planets.filter((planet) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        planet.name.toLowerCase().includes(searchText) ||
        planet.title.toLowerCase().includes(searchText) ||
        planet.description.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "ALL" || planet.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "AZ") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sort === "ZA") {
      result = [...result].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    return result;
  }, [search, category, sort]);

  return (
    <section className="relative overflow-hidden bg-[#03050B] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-[1600px]">

        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[10px] font-bold tracking-[0.4em] text-cyan-300">
              YOUR UNIVERSE AWAITS
            </p>

            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              Explore the{" "}
              <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent">
                Worlds
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
              Travel across extraordinary planets, discover their secrets
              and experience stories from the farthest corners of space.
            </p>
          </div>

          <p className="text-xs tracking-widest text-cyan-300">
            {filteredPlanets.length} WORLDS AVAILABLE
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px_180px]">

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search a planet or world..."
            className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-xl border border-white/10 bg-[#101522] px-5 py-4 text-sm text-white outline-none focus:border-cyan-400"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "ALL" ? "All categories" : item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-xl border border-white/10 bg-[#101522] px-5 py-4 text-sm text-white outline-none focus:border-cyan-400"
          >
            <option value="DEFAULT">Default order</option>
            <option value="AZ">Name: A–Z</option>
            <option value="ZA">Name: Z–A</option>
          </select>
        </div>

        {/* Planet cards */}
        {filteredPlanets.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPlanets.map((planet) => (
              <button
                key={planet.id}
                onClick={() => navigate(`/planet/${planet.id}`)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition duration-500 hover:-translate-y-2 hover:border-cyan-300/50 hover:shadow-[0_15px_50px_rgba(34,211,238,0.12)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={planet.image}
                    alt={planet.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#03050B] via-black/10 to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[9px] font-bold tracking-widest text-cyan-200 backdrop-blur-lg">
                    {planet.title}
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <p className="mb-2 text-[9px] font-bold tracking-[0.25em] text-cyan-300">
                      {planet.category}
                    </p>

                    <h3 className="text-3xl font-black tracking-tight">
                      {planet.name}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-300">
                      {planet.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs font-bold text-white transition group-hover:text-cyan-300">
                      EXPLORE WORLD
                      <span className="transition group-hover:translate-x-2">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 py-20 text-center">
            <h3 className="text-xl font-bold">No worlds found</h3>
            <p className="mt-2 text-sm text-slate-400">
              Try a different search or category.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default UniverseSection;
