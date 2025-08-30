import { Suspense } from "react";
import { fetchCredits } from "../lib/tmdbApi";
import { Await, Link, useLoaderData } from "react-router-dom";
import { getMovieDirector, getStoryCreators, getWriters } from "../lib/utility";
import PersonCard from "../components/PersonCard";
import { useTMDBConfig } from "../context/ConfigContext";
import imgPlaceHolder from "../assets/placeholder.png";
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
            <div>
              <div>
                <h3>Director</h3>
                <p>{director.name}</p>
                <h3>Writers</h3>
                <ul>
                  {writers.map(item => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
                <h3>Story by</h3>
                <ul>
                  {storyCreators.map(item => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
                <h3>Stars</h3>
                <ul>
                  {stars.map(item => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>

                <ul className="flex w-full gap-xl overflow-hidden overflow-x-scroll">
                  {casts.map(item => (
                    <li key={item.id}>
                      <Link to={`/person/${item.id}`}>
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
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
