import { Suspense } from "react";
import { fetchCredits } from "../lib/tmdbApi";
import { Await, Link, useLoaderData } from "react-router-dom";
import { getMovieDirector, getStoryCreators, getWriters } from "../lib/utility";
import { useTMDBConfig } from "../context/ConfigContext";
import imgPlaceHolder from "../assets/placeholder.png";

import PersonCard from "../components/PersonCard";
import Badge from "../components/ui/Badge";
import Carosuel from "../components/ui/Carosuel";

export async function loader({ params }) {
  const { mediaType, id } = params;
  try {
    const credits = fetchCredits({ mediaType, id });

    return credits;
  } catch (error) {
  } finally {
  }
  return null;
}

export default function MediaCasts() {
  const creditsPromise = useLoaderData();
  const { config, loading } = useTMDBConfig();
  console.log(loading);
  if (loading) {
    return <p>loading....</p>;
  }
  return (
    <Suspense fallback={<p>Loading Credits...</p>}>
      <Await resolve={creditsPromise}>
        {credits => {
          const casts = credits.cast;
          const crew = credits.crew;
          const director = getMovieDirector(crew);
          const writers = getWriters(crew);
          const storyCreators = getStoryCreators(crew);
          const stars = casts.slice(0, 3);
          //console.log(stars);
          //console.log("story", storyCreators);
          //console.log("writ", writers);
          console.log(config?.profileBaseUrl);
          return (
            <div className="flex flex-col gap-15">
              <div className="flex flex-col gap-2xl">
                <div className="p-sm border-b border-bg-300 flex flex-wrap items-center gap-lg">
                  <h3>Director</h3>
                  <Link
                    to={`/person/${director.id}`}
                    key={director.id}
                    className={`text-blue-400 font-normal`}
                  >
                    {director.name}
                  </Link>
                </div>
                <div className="p-sm border-b border-bg-300 flex flex-wrap items-center gap-lg">
                  <h3>Writers</h3>
                  <ul className="flex flex-wrap gap-md items-center">
                    {writers.map((item, i) => (
                      <>
                        {i > 0 && <Badge variant="dot" />}
                        <Link
                          to={`/person/${item.id}`}
                          key={item.id}
                          className={`text-blue-400 font-normal`}
                        >
                          {item.name}
                        </Link>
                      </>
                    ))}
                  </ul>
                </div>
                <div className="p-sm border-b border-bg-300 flex flex-wrap items-center gap-lg">
                  <h3>Story by</h3>
                  <ul className="flex flex-wrap gap-md items-center">
                    {storyCreators.map((item, i) => (
                      <>
                        {i > 0 && <Badge variant="dot" />}
                        <Link
                          to={`/person/${item.id}`}
                          key={item.id}
                          className={`text-blue-400 font-normal`}
                        >
                          {item.name}
                        </Link>
                      </>
                    ))}
                  </ul>
                </div>
                <div className="p-sm border-b border-bg-300 flex flex-wrap items-center gap-lg">
                  <h3>Stars</h3>
                  <ul className="flex flex-wrap gap-md items-center">
                    {stars.map((item, i) => (
                      <>
                        {i > 0 && <Badge variant="dot" />}
                        <Link
                          to={`/person/${item.id}`}
                          key={item.id}
                          className={`text-blue-400 font-normal`}
                        >
                          {item.name}
                        </Link>
                      </>
                    ))}
                  </ul>
                </div>
              </div>

              <Carosuel>
                {casts.map(item => (
                  <Link key={item.id} to={`/person/${item.id}`}>
                    <PersonCard
                      imgUrl={
                        config
                          ? config?.profileBaseUrl?.[1] + item.profile_path
                          : imgPlaceHolder
                      }
                      name={item.name}
                      knownFor={item.known_for_department}
                    />
                  </Link>
                ))}
              </Carosuel>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
