
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import planets from "../data/planets";
import stories from "../data/stories";

const Watch = () => {
  const { storyId } = useParams();

  // Find the documentary associated with this planet
  const story = stories.find((item) => item.id === storyId);

  const planet = planets.find(
    (item) => item.id === story?.planetId
  );

  const [activeEpisode, setActiveEpisode] = useState(
    story?.episodes[0] || null
  );

  const [progress, setProgress] = useState({});
  const videoRef = useRef(null);

  // Load previously saved watch progress
  useEffect(() => {
    try {
      const savedProgress = JSON.parse(
        localStorage.getItem("orbitx-watch-progress") || "{}"
      );

      if (
        savedProgress &&
        typeof savedProgress === "object" &&
        !Array.isArray(savedProgress)
      ) {
        setProgress(savedProgress);
      }
    } catch (error) {
      console.error("Failed to load watch progress:", error);
      setProgress({});
    }
  }, []);

  // Restore the selected episode's saved position
  const restorePosition = () => {
    const savedTime = progress[activeEpisode?.id];

    if (
      videoRef.current &&
      typeof savedTime === "number" &&
      savedTime > 0 &&
      Number.isFinite(videoRef.current.duration) &&
      savedTime < videoRef.current.duration
    ) {
      videoRef.current.currentTime = savedTime;
    }
  };

  // Save the current playback position
  const handleTimeUpdate = () => {
    if (!videoRef.current || !activeEpisode) return;

    const currentTime = videoRef.current.currentTime;

    setProgress((previous) => {
      const updated = {
        ...previous,
        [activeEpisode.id]: currentTime,
      };

      localStorage.setItem(
        "orbitx-watch-progress",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  if (!story || !planet) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#03050B] text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Documentary not found
          </h1>

          <Link
            to="/discover"
            className="mt-5 inline-block text-cyan-400 hover:text-cyan-200"
          >
            Back to Discover
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#03050B] text-white">

      {/* Navigation */}
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-12">
        <Link
          to="/discover"
          className="text-xl font-black tracking-[0.2em]"
        >
          ORBIT<span className="text-cyan-400">X</span>
        </Link>

        <Link
          to={`/planet/${planet.id}`}
          className="text-sm text-slate-400 transition hover:text-cyan-400"
        >
          Back to {planet.name}
        </Link>
      </header>

      <div className="mx-auto max-w-[1500px] px-6 py-10 md:px-12">

        {/* Documentary information */}
        <div className="mb-7">
          <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
            {story.category}
          </p>

          <h1 className="mt-3 text-3xl font-black md:text-5xl">
            {story.title}
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-slate-400">
            {story.description}
          </p>
        </div>

        {/* Player and episode list */}
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

          {/* Video player */}
          <section>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">

              {activeEpisode && (
                activeEpisode.videoProvider === "youtube" ? (
                  <iframe
                    key={activeEpisode.id}
                    className="aspect-video w-full"
                    src={`https://www.youtube.com/embed/${activeEpisode.videoId}`}
                    title={activeEpisode.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <video
                    key={activeEpisode.id}
                    ref={videoRef}
                    src={activeEpisode.videoUrl}
                    controls
                    playsInline
                    onLoadedMetadata={restorePosition}
                    onTimeUpdate={handleTimeUpdate}
                    className="aspect-video w-full"
                  />
                )
              )}

            </div>

            {/* Currently playing episode */}
            {activeEpisode && (
              <div className="mt-6">
                <p className="text-xs font-bold tracking-widest text-cyan-400">
                  NOW PLAYING
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {activeEpisode.title}
                </h2>

                <p className="mt-3 leading-7 text-slate-400">
                  {activeEpisode.description}
                </p>
              </div>
            )}
          </section>

          {/* Episode selector */}
          <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="mb-5">
              <p className="text-xs font-bold tracking-widest text-cyan-400">
                SERIES GUIDE
              </p>

              <h2 className="mt-2 text-xl font-bold">
                Episodes
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {story.episodes.length} episodes
              </p>
            </div>

            <div className="space-y-3">
              {story.episodes.map((episode, index) => (
                <button
                  key={episode.id}
                  onClick={() => setActiveEpisode(episode)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    activeEpisode?.id === episode.id
                      ? "border-cyan-400/60 bg-cyan-400/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold tracking-wider text-cyan-400">
                      EPISODE {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-xs text-slate-500">
                      {episode.duration}
                    </span>
                  </div>

                  <h3 className="mt-3 font-semibold">
                    {episode.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {episode.description}
                  </p>

                  {activeEpisode?.id === episode.id && (
                    <p className="mt-3 text-xs font-semibold text-cyan-400">
                      ▶ SELECTED
                    </p>
                  )}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Watch;
