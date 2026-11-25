
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import stories from "../data/stories";
import planets from "../data/planets";

const ContinueWatching = () => {
  const [watchItems, setWatchItems] = useState([]);

  useEffect(() => {
    try {
      const savedProgress = JSON.parse(
        localStorage.getItem("orbitx-watch-progress") || "{}"
      );

      const items = stories
        .map((story) => {
          const episode = story.episodes?.find(
            (item) =>
              typeof savedProgress[item.id] === "number" &&
              savedProgress[item.id] > 0
          );

          if (!episode) return null;

          const planet = planets.find(
            (item) => item.id === story.planetId
          );

          return {
            ...story,
            episode,
            planet,
            resumeTime: savedProgress[episode.id],
          };
        })
        .filter(Boolean);

      setWatchItems(items);
    } catch (error) {
      console.error("Failed to load Continue Watching:", error);
      setWatchItems([]);
    }
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  if (watchItems.length === 0) return null;

  return (
    <section className="px-6 py-12 md:px-12">
      <div className="mb-7">
        <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
          PICK UP WHERE YOU LEFT OFF
        </p>

        <h2 className="mt-3 text-2xl font-black md:text-3xl">
          Continue Watching
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Your unfinished journeys through the universe.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {watchItems.map((story) => (
          <Link
            key={story.id}
            to={`/watch/${story.id}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-cyan-400/40"
          >
            <div className="relative h-48 overflow-hidden">
              {story.planet?.image && (
                <img
                  src={story.planet.image}
                  alt={story.planet.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#03050B] via-transparent to-transparent" />

              <span className="absolute bottom-4 left-4 rounded-full border border-cyan-400/30 bg-black/60 px-3 py-1 text-xs font-semibold text-cyan-300">
                {story.planet?.name || "SPACE DOCUMENTARY"}
              </span>
            </div>

            <div className="p-5">
              <p className="text-xs font-bold tracking-widest text-cyan-400">
                CONTINUE EPISODE
              </p>

              <h3 className="mt-2 text-lg font-bold">
                {story.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {story.episode.title}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm text-slate-400">
                  Resume at {formatTime(story.resumeTime)}
                </span>

                <span className="text-sm font-semibold text-cyan-400 transition group-hover:text-white">
                  RESUME →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ContinueWatching;
