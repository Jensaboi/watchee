import { Suspense } from "react";
import { fetchCredits } from "../lib/tmdbApi";
import { Await, Link, useLoaderData, useOutletContext } from "react-router-dom";
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
  const { config } = useTMDBConfig();
  const media = useOutletContext();

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
          const creators = media?.created_by;

          return (
            <div className="flex flex-col gap-20">
              <div className="flex flex-col gap-2xl">
                {director && (
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
                )}

                {creators?.[0] && (
                  <div className="p-sm border-b border-bg-300 flex flex-wrap items-center gap-lg">
                    <h3>{creators.length > 1 ? "Creators" : "Creator"}</h3>
                    <ul className="flex flex-wrap gap-sm items-center">
                      {creators.map((item, i) => (
                        <li
                          className="flex flex-row gap-sm items-center"
                          key={item.id}
                        >
                          {i > 0 && <Badge variant="dot" />}
                          <Link
                            to={`/person/${item.id}`}
                            className={`text-blue-400 font-normal`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {writers[0] && (
                  <div className="p-sm border-b border-bg-300 flex flex-wrap items-center gap-lg">
                    <h3>Writers</h3>
                    <ul className="flex flex-wrap gap-sm items-center">
                      {writers.map((item, i) => (
                        <li
                          className="flex flex-row gap-sm items-center"
                          key={item.id}
                        >
                          {i > 0 && <Badge variant="dot" />}
                          <Link
                            to={`/person/${item.id}`}
                            className="text-blue-400 font-normal"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {storyCreators[0] && (
                  <div className="p-sm border-b border-bg-300 flex flex-wrap items-center gap-lg">
                    <h3>Story by</h3>
                    <ul className="flex flex-wrap gap-sm items-center">
                      {storyCreators.map((item, i) => (
                        <li
                          className="flex flex-row gap-sm items-center"
                          key={item.id}
                        >
                          {i > 0 && <Badge variant="dot" />}
                          <Link
                            to={`/person/${item.id}`}
                            className={`text-blue-400 font-normal`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {stars[0] && (
                  <div className="p-sm border-b border-bg-300 flex flex-wrap items-center gap-lg">
                    <h3>Stars</h3>
                    <ul className="flex flex-wrap gap-sm items-center">
                      {stars.map((item, i) => (
                        <li
                          className="flex flex-row gap-sm items-center"
                          key={item.id}
                        >
                          {i > 0 && <Badge variant="dot" />}
                          <Link
                            to={`/person/${item.id}`}
                            className={`text-blue-400 font-normal`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Carosuel mediaType="person" data={casts} />
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
