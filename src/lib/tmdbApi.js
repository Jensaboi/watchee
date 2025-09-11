const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchWithSearchQuery(
  { query, mediaType, lang = "en-US" },
  signal
) {
  if (!query && typeof query === "string" && !query.trim()) {
    return [];
  }

  const response = await fetch(
    `${BASE_URL}/search/${mediaType}?query=${query}&language=${lang}&page=1&api_key=${API_KEY}`,
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

  const configObj = {
    posterBaseUrl: [
      data.images.secure_base_url + data.images.poster_sizes[0],
      data.images.secure_base_url + data.images.poster_sizes[1],
      data.images.secure_base_url + data.images.poster_sizes[2],
      data.images.secure_base_url + data.images.poster_sizes[3],
      data.images.secure_base_url + data.images.poster_sizes[4],
      data.images.secure_base_url + data.images.poster_sizes[5],
      data.images.secure_base_url + data.images.poster_sizes[6],
    ],
    backdropBaseUrl: [
      data.images.secure_base_url + data.images.backdrop_sizes[0],
      data.images.secure_base_url + data.images.backdrop_sizes[1],
      data.images.secure_base_url + data.images.backdrop_sizes[2],
      data.images.secure_base_url + data.images.backdrop_sizes[3],
    ],
    profileBaseUrl: [
      data.images.secure_base_url + data.images.profile_sizes[0],
      data.images.secure_base_url + data.images.profile_sizes[1],
      data.images.secure_base_url + data.images.profile_sizes[2],
      data.images.secure_base_url + data.images.profile_sizes[3],
    ],
    logoBaseUrl: [
      data.images.secure_base_url + data.images.logo_sizes[0],
      data.images.secure_base_url + data.images.logo_sizes[1],
      data.images.secure_base_url + data.images.logo_sizes[2],
    ],
  };

  return configObj;
}

export async function fetchDetails({ mediaType, id, lang = "en-US" }) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}?language=${lang}&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data;
}

export async function fetchVideos({ mediaType, id, lang = "en-US" }) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}/videos?language=${lang}&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data.results;
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

export async function fetchWatchProviders({ mediaType, id }) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}/watch/providers?&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data.results;
}

export async function fetchAgeRatingExplanation({ mediaType }) {
  const response = await fetch(
    `${BASE_URL}/certification/${mediaType}/list?api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data.certifications;
}

export async function fetchReviews({ mediaType, id, lang = "en-US" }) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}/reviews?language=${lang}&page=1&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data.results;
}

export async function fetchSimilar({ mediaType, id, lang = "en-US" }) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}/similar?language=${lang}&page=1&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data.results;
}

export async function fetchRecommendations({ mediaType, id, lang = "en-US" }) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}/recommendations?language=${lang}&page=1&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data.results;
}

export async function fetchNowPlaying({
  mediaType,
  region = "us",
  lang = "en-US",
}) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/now_playing?language=${lang}&page=1&region=${region}&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data.results;
}

export async function fetchPopular({ mediaType, lang = "en-US" }) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/popular?language=${lang}&page=1&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data.results;
}

export async function fetchTopRated({ mediaType, lang = "en-US" }) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/top_rated?language=${lang}&page=1&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data.results;
}

export async function fetchUpcoming({ mediaType, lang = "en-US" }) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/upcoming?language=${lang}&page=1&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data.results;
}

export async function fetchAiringToday({ lang = "en-US" }) {
  const response = await fetch(
    `${BASE_URL}/tv/airing_today?language=${lang}&page=1&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data.results;
}

export async function fetchAiringThisWeek({ lang = "en-US" }) {
  const response = await fetch(
    `${BASE_URL}/tv/on_the_air?language=${lang}&page=1&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data.results;
}

export async function fetchWithQueryFilters(mediaType, searchParams) {
  console.log(
    `${BASE_URL}/discover/${mediaType}${searchParams}&  include_adult=false&api_key=${API_KEY}`
  );
  const response = await fetch(
    `${BASE_URL}/discover/${mediaType}${searchParams}&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  return data;
}
