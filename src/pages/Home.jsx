import {
  fetchNowPlaying,
  fetchTopRated,
  fetchPopular,
  fetchUpcoming,
} from "../lib/tmdbApi";
import { useRouteLoaderData, useLoaderData, Await } from "react-router";
import Carosuel from "../components/ui/Carosuel";
import { Suspense } from "react";

export async function loader() {
  try {
    const topRatedMoviesPromise = fetchTopRated({ mediaType: "movie" });
    const topRatedShowsPromise = fetchTopRated({ mediaType: "tv" });
    return { topRatedMoviesPromise, topRatedShowsPromise };
  } catch (error) {
    throw Error({
      message: error.message,
      status: error.status,
      statusText: error.statusText,
    });
  }
}

export default function Home() {
  const { config, movieGenres, tvGenres } = useRouteLoaderData("root");
  const { topRatedMoviesPromise, topRatedShowsPromise } = useLoaderData();

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
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={topRatedMoviesPromise}>
          {topRatedMovies => (
            <section className="container mx-auto my-4">
              <h2 className="mb-8">Top rated Movies</h2>
              <Carosuel mediaType={"movie"} data={topRatedMovies} />
            </section>
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={topRatedShowsPromise}>
          {topRatedShows => (
            <section className="container mx-auto my-4">
              <h2 className="mb-8">Top rated Movies</h2>
              <Carosuel mediaType={"tv"} data={topRatedShows} />
            </section>
          )}
        </Await>
      </Suspense>
    </>
  );
}
