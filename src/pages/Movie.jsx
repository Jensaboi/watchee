import {
  fetchPopular,
  fetchTopRated,
  fetchNowPlaying,
  fetchUpcoming,
} from "../lib/tmdbApi";
import { Await, useLoaderData } from "react-router";
import { Suspense } from "react";
import Carosuel from "../components/ui/Carosuel";

export async function loader() {
  const mediaType = "movie";

  try {
    const nowPlayingPromise = fetchNowPlaying({ mediaType });
    const popularPromise = fetchPopular({ mediaType });
    const upComingPromise = fetchUpcoming({ mediaType });
    const topRatedPromise = fetchTopRated({ mediaType });

    return {
      nowPlayingPromise,
      popularPromise,
      upComingPromise,
      topRatedPromise,
    };
  } catch (error) {
    throw Error({
      message: error.message,
      status: error.status,
      statusText: error.statusText,
    });
  }
}

export default function Movie() {
  const mediaType = "movie";
  const {
    nowPlayingPromise,
    popularPromise,
    upComingPromise,
    topRatedPromise,
  } = useLoaderData();

  return (
    <>
      <Suspense fallback={<h2>loading...</h2>}>
        <Await resolve={nowPlayingPromise}>
          {nowPlaying =>
            nowPlaying?.[0] && (
              <section className="container mx-auto">
                <h2 className="mb-8">Movies Now In Cinema</h2>
                <Carosuel data={nowPlaying} mediaType={mediaType} />
              </section>
            )
          }
        </Await>
      </Suspense>

      <Suspense fallback={<h2>loading...</h2>}>
        <Await resolve={popularPromise}>
          {popular =>
            popular?.[0] && (
              <section className="container mx-auto">
                <h2 className="mb-8">Popular Movies Right Now</h2>
                <Carosuel data={popular} mediaType={mediaType} />
              </section>
            )
          }
        </Await>
      </Suspense>

      <Suspense fallback={<h2>loading...</h2>}>
        <Await resolve={upComingPromise}>
          {upComing =>
            upComing?.[0] && (
              <section className="container mx-auto">
                <h2 className="mb-8">Upcoming movies</h2>
                <Carosuel data={upComing} mediaType={mediaType} />
              </section>
            )
          }
        </Await>
      </Suspense>

      <Suspense fallback={<h2>loading...</h2>}>
        <Await resolve={topRatedPromise}>
          {topRated =>
            topRated?.[0] && (
              <section className="container mx-auto">
                <h2 className="mb-8">Top Rated Movies On TMD</h2>{" "}
                <Carosuel data={topRated} mediaType={mediaType} />
              </section>
            )
          }
        </Await>
      </Suspense>
    </>
  );
}
