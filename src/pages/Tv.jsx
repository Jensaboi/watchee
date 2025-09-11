import {
  fetchPopular,
  fetchTopRated,
  fetchAiringThisWeek,
  fetchAiringToday,
} from "../lib/tmdbApi";
import { Await, useLoaderData } from "react-router";
import { Suspense } from "react";
import Carosuel from "../components/ui/Carosuel";

export async function loader() {
  const mediaType = "tv";

  try {
    const popularPromise = fetchPopular({ mediaType });
    const topRatedPromise = fetchTopRated({ mediaType });
    const showsTodayPromise = fetchAiringToday({ lang: "en-US" });
    const showsThisWeekPromise = fetchAiringThisWeek({ lang: "en-US" });

    return {
      showsTodayPromise,
      showsThisWeekPromise,
      popularPromise,
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

export default function Tv() {
  const mediaType = "tv";
  const {
    popularPromise,
    topRatedPromise,
    showsThisWeekPromise,
    showsTodayPromise,
  } = useLoaderData();

  return (
    <>
      <section className="container mx-auto">
        <h2 className="mb-8">Popular shows Right Now</h2>
        <Suspense fallback={<h2>loading...</h2>}>
          <Await resolve={popularPromise}>
            {popular => <Carosuel data={popular} mediaType={mediaType} />}
          </Await>
        </Suspense>
      </section>

      <section className="container mx-auto">
        <h2 className="mb-8">Shows Airing Today</h2>
        <Suspense fallback={<h2>loading...</h2>}>
          <Await resolve={showsTodayPromise}>
            {showsToday => <Carosuel data={showsToday} mediaType={mediaType} />}
          </Await>
        </Suspense>
      </section>

      <section className="container mx-auto">
        <h2 className="mb-8">Shows Airing This Week</h2>
        <Suspense fallback={<h2>loading...</h2>}>
          <Await resolve={showsThisWeekPromise}>
            {showsThisWeek => (
              <Carosuel data={showsThisWeek} mediaType={mediaType} />
            )}
          </Await>
        </Suspense>
      </section>

      <section className="container mx-auto">
        <h2 className="mb-8">Top Rated On TMD</h2>
        <Suspense fallback={<h2>loading...</h2>}>
          <Await resolve={topRatedPromise}>
            {topRated => <Carosuel data={topRated} mediaType={mediaType} />}
          </Await>
        </Suspense>
      </section>
    </>
  );
}
