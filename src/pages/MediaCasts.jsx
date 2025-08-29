import { Suspense } from "react";
import { fetchCredits } from "../lib/tmdbApi";
import { Await, useLoaderData } from "react-router-dom";
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
          return <div>text</div>;
        }}
      </Await>
    </Suspense>
  );
}
