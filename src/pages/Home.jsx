import useApi from "../hooks/useApi";
import {
  fetchNowPlaying,
  fetchTopRated,
  fetchPopular,
  fetchUpcoming,
} from "../lib/tmdbApi";

export default function Home() {
  const {
    data: popularMovies,
    loading: popularMoviesLoading,
    error: popularMoviesError,
  } = useApi(fetchPopular, { mediaType: "movie" });

  const {
    data: upcomingMovies,
    loading: upcomingMoviesLoading,
    error: upcomingMoviesError,
  } = useApi(fetchUpcoming, { mediaType: "movie" });

  console.log(popularMovies);
  return (
    <>
      <section className="container mx-auto mt-25 p-xl ">
        <h1 className="text-center">
          Explore Movies, Shows, And the people who bring them to life.
        </h1>
        <p className="text-center">
          Whether you’re chasing old favorites or discovering something new,
          it’s all here.
        </p>
      </section>
    </>
  );
}
