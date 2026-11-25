
const NASA_IMAGES_API = "https://images-api.nasa.gov/search";

const searchTerms = {
  earth: "Earth from space",
  moon: "Moon lunar surface",
  mars: "Mars rover",
};

export async function searchSpaceImages(destination) {
  const query = searchTerms[destination] ?? "space";

  const params = new URLSearchParams({
    q: query,
    media_type: "image",
    page_size: "12",
  });

  const response = await fetch(
    `${NASA_IMAGES_API}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `NASA image search failed: ${response.status}`
    );
  }

  const result = await response.json();
  const items = result.collection?.items ?? [];

  return items.flatMap((item) => {
    const metadata = item.data?.[0];
    const imageUrl = item.links?.find(
      (link) => link.render === "image"
    )?.href;

    if (!metadata || !imageUrl) {
      return [];
    }

    return [
      {
        id: metadata.nasa_id,
        title: metadata.title,
        dateCreated: metadata.date_created,
        description: metadata.description,
        imageUrl,
        nasaUrl: `https://images.nasa.gov/details/${metadata.nasa_id}`,
      },
    ];
  });
}
