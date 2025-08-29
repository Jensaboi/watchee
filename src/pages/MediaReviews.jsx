import { Await, useLoaderData } from "react-router";
import { fetchReviews } from "../lib/tmdbApi";
import { Suspense } from "react";

export async function loader({ params }) {
  console.log(params);
  const { mediaType, id } = params;

  try {
    const reviews = fetchReviews({ mediaType, id });
    return reviews;
  } catch (err) {}
  return null;
}

export default function MediaReviews() {
  const reviewsPromise = useLoaderData();

  return (
    <>
      <Suspense fallback={<p>Loading reviews...</p>}>
        <Await resolve={reviewsPromise}>
          {reviews => {
            console.log(reviews);
            return (
              <div>
                <h1>Media reviews</h1>
                <p>reviews</p>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
