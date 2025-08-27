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
