const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchWithSearchQuery(
  { query, media, lang = "en-US" },
  signal
) {
  const response = await fetch(
    `${BASE_URL}/search/${media}?query=${query}&language=${lang}&page=1&api_key=${API_KEY}`,
    { signal }
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data.results;
}

export async function fetchGenres({ mediaType, lang = "en" }) {
  const response = await fetch(
    `${BASE_URL}/genre/${mediaType}/list?language=${lang}&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data.genres;
}

export async function fetchTmdbConfig() {
  const response = await fetch(`${BASE_URL}/configuration?api_key=${API_KEY}`);

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data;
}

export async function fetchDetails({ mediaType, id, lang = "en-US" }) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}?language=${lang}&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data;
}

export async function fetchTrailer({ mediaType, id, lang = "en-US" }) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}/videos?language=${lang}&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();
  const trailers = data?.results
    ?.filter(item => item.type.toLowerCase() === "trailer")
    ?.sort((a, b) => a.size - b.size);

  return trailers[trailers.length - 1] || null;
}

export async function fetchAgeRatings({ mediaType, id }) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}/${
      mediaType === "movie" ? "release_dates" : "content_ratings"
    }?api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();
  return data.results;
}

export async function fetchCredits({ mediaType, id, lang = "en-US" }) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}/credits?language=${lang}&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data;
}
