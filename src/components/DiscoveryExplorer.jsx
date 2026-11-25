
import { useEffect, useState } from "react";
import { searchSpaceImages } from "../services/nasaServices";

function DiscoveryExplorer({ destination = "earth" }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadImages() {
      setLoading(true);
      setError("");
      setImages([]);

      try {
        const results = await searchSpaceImages(destination);

        if (!cancelled) {
          setImages(results);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load NASA images.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadImages();

    return () => {
      cancelled = true;
    };
  }, [destination]);

  return (
    <section className="mt-12 w-full text-white">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
          NASA Image Library
        </p>

        <h2 className="mt-2 text-2xl font-semibold">
          Explore {destination}
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Discover real space imagery from NASA's public image collection.
        </p>
      </div>

      {loading && (
        <p className="text-gray-300">
          Loading discoveries from NASA...
        </p>
      )}

      {error && (
        <p role="alert" className="text-red-400">
          {error}
        </p>
      )}

      {!loading && !error && images.length === 0 && (
        <p className="text-gray-400">
          No images were found. Try selecting another destination.
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <article
            key={image.id}
            className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              loading="lazy"
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-medium text-white">
                {image.title}
              </h3>

              {image.dateCreated && (
                <p className="mt-2 text-xs text-gray-400">
                  {new Date(image.dateCreated).toLocaleDateString()}
                </p>
              )}

              <p className="mt-3 text-sm leading-6 text-gray-300">
                {image.description
                  ? `${image.description.slice(0, 150)}${
                      image.description.length > 150 ? "..." : ""
                    }`
                  : "No description is available for this image."}
              </p>

              <a
                href={image.nasaUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm text-cyan-400 hover:text-cyan-300"
              >
                View on NASA →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DiscoveryExplorer;
