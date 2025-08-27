const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com";

export async function fetchOmdb(id) {
  const response = await fetch(`${BASE_URL}/?i=${id}&apikey=${API_KEY}`);

  if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);

  const data = await response.json();

  const rottenTomato = data?.Ratings?.find(
    item => item.Source.toLowerCase() === "rotten tomatoes"
  );
  const resultsObj = {
    imdbRating: data?.imdbRating || null,
    rottenTomatoRating: rottenTomato?.Value || null,
    awards: data?.Awards || null,
    ageRating: data?.Rating || null,
    director: data?.Director || null,
    writers: data?.Writers || null,
    poster: data?.Poster || null,
  };

  return resultsObj;
}
