import { Await, useLoaderData } from "react-router";
import { fetchReviews } from "../lib/tmdbApi";
import { Suspense } from "react";
import { useRouteLoaderData } from "react-router";
import ReviewCard from "../components/ReviewCard";
import placeHolderImg from "../assets/placeholder.png";
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
              <div className="flex items-center flex-row flex-wrap">
                {reviews.map(item => (
                  <ReviewCard
                    profileAvatar={
                      item.author_details.avatar_path
                        ? config.profileBaseUrl[0] +
                          item.author_details.avatar_path
                        : placeHolderImg
                    }
                    author={item.author}
                    body={item.content}
                    date={item.created_at}
                    key={item.id}
                  />
                ))}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
