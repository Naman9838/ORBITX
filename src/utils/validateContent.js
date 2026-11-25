
export const validateContent = (planets, stories) => {
  const errors = [];

  // 1. Check planet IDs
  const planetIds = new Set();

  planets.forEach((planet) => {
    if (!planet.id) {
      errors.push("A planet is missing its ID.");
    } else if (planetIds.has(planet.id)) {
      errors.push(`Duplicate planet ID: ${planet.id}`);
    } else {
      planetIds.add(planet.id);
    }
  });

  // 2. Check documentary IDs and planet references
  const storyIds = new Set();
  const episodeIds = new Set();

  stories.forEach((story) => {
    if (!story.id) {
      errors.push("A documentary is missing its ID.");
    } else if (storyIds.has(story.id)) {
      errors.push(`Duplicate documentary ID: ${story.id}`);
    } else {
      storyIds.add(story.id);
    }

    if (!planetIds.has(story.planetId)) {
      errors.push(
        `${story.title || "Unnamed documentary"} references a planet that does not exist: ${story.planetId}`
      );
    }

    // 3. Check documentary episodes
    if (!Array.isArray(story.episodes) || story.episodes.length === 0) {
      errors.push(
        `${story.title || "Unnamed documentary"} has no episodes.`
      );
      return;
    }

    story.episodes.forEach((episode) => {
      if (!episode.id) {
        errors.push(
          `${story.title} contains an episode without an ID.`
        );
      } else if (episodeIds.has(episode.id)) {
        errors.push(`Duplicate episode ID: ${episode.id}`);
      } else {
        episodeIds.add(episode.id);
      }

      if (!episode.title) {
        errors.push(
          `An episode in ${story.title} is missing its title.`
        );
      }

      if (
        typeof episode.videoUrl !== "string" ||
        !episode.videoUrl.trim()
      ) {
        errors.push(
          `An episode in ${story.title} is missing its video URL.`
        );
      }
    });
  });

  return errors;
};
