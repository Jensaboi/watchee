import { Outlet } from "react-router-dom";
import ScrollToTop from "./hooks/scrollToTop";
import {
  fetchTmdbConfig,
  fetchGenres,
  fetchAgeRatingExplanation,
  fetchCountries,
} from "./lib/tmdbApi";

export async function loader() {
  try {
    const [
      config,
      movieGenres,
      tvGenres,
      movieRatingExplanations,
      tvRatingExplanations,
      allCountries,
    ] = await Promise.all([
      fetchTmdbConfig(),
      fetchGenres({ mediaType: "movie" }),
      fetchGenres({ mediaType: "tv" }),
      fetchAgeRatingExplanation({ mediaType: "movie" }),
      fetchAgeRatingExplanation({ mediaType: "tv" }),
      fetchCountries({ lang: "en-US" }),
    ]);

    return {
      config,
      movieGenres,
      tvGenres,
      movieRatingExplanations,
      tvRatingExplanations,
      allCountries,
    };
  } catch (error) {
    throw Error(`ERROR:${error.message} status: ${error.status}`);
  }
  return null;
}
function App() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default App;
