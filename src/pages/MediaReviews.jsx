import { Await, useLoaderData } from "react-router";
import { fetchReviews } from "../lib/tmdbApi";
import { Suspense } from "react";
import { useRouteLoaderData } from "react-router";
import ReviewCard from "../components/ReviewCard";

export async function loader({ params }) {
  const { mediaType, id } = params;

  try {
    const reviews = fetchReviews({ mediaType, id });
    return reviews;
  } catch (err) {}
  return null;
}

export default function MediaReviews() {
  const reviewsPromise = useLoaderData();
  const { config } = useRouteLoaderData("root");
  return (
    <>
      <Suspense fallback={<p>Loading reviews...</p>}>
        <Await resolve={reviewsPromise}>
          {reviews => {
            console.log(reviews);
            return (
              <div>
                {reviews.map(item => (
                  <ReviewCard key={item.id} />
                ))}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
