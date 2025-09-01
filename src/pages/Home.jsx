import useApi from "../hooks/useApi";
import {
  fetchNowPlaying,
  fetchTopRated,
  fetchPopular,
  fetchUpcoming,
} from "../lib/tmdbApi";
import { Link } from "react-router";
import Carosuel from "../components/ui/Carosuel";
import { useTMDBConfig } from "../context/ConfigContext";
import { useGenres } from "../context/GenreContext";

export default function Home() {
  const { config } = useTMDBConfig();
  const { movieGenres, tvGenres } = useGenres();
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
      <section className="container mx-auto">
        <Carosuel mediaType="movie" data={popularMovies} />
      </section>
    </>
  );
}
