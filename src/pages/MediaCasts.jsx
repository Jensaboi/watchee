import { Suspense } from "react";
import { fetchCredits } from "../lib/tmdbApi";
import { Await, useLoaderData } from "react-router-dom";
import { getMovieDirector, getStoryCreators, getWriters } from "../lib/utility";
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
  const credits = useLoaderData();

  return (
    <Suspense fallback={<p>Loading Credits...</p>}>
      <Await resolve={credits}>
        {resolvedCredits => {
          const casts = resolvedCredits.cast;
          const crew = resolvedCredits.crew;
          const director = getMovieDirector(crew);
          const writers = getWriters(crew);
          const storyCreators = getStoryCreators(crew);
          const stars = casts.slice(0, 3);
          console.log(stars);
          console.log("story", storyCreators);
          console.log("writ", writers);
          console.log("resolved", resolvedCredits);
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
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
