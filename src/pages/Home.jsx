import {
  fetchNowPlaying,
  fetchTopRated,
  fetchPopular,
  fetchUpcoming,
} from "../lib/tmdbApi";
import { Link, useRouteLoaderData } from "react-router";
import Carosuel from "../components/ui/Carosuel";

export async function loader() {
  try {
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
      <section className="container mx-auto"></section>
    </>
  );
}
