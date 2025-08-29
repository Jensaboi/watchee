import { Await, useLoaderData } from "react-router";
import { fetchWatchProviders } from "../lib/tmdbApi";
import { Suspense } from "react";

export async function loader({ params }) {
  const { mediaType, id } = params;
  try {
    const watchProviders = fetchWatchProviders({ mediaType, id });

    return watchProviders;
  } catch (err) {}
  return null;
}

export default function MediaWatchProviders() {
  const watchProvidersPromise = useLoaderData();

  return (
    <Suspense fallback={<p>Loading providers...</p>}>
      <Await resolve={watchProvidersPromise}>
        {watchProviders => {
          const providers = watchProviders["US"];
          console.log(providers);
          return (
            <div>
              <h3>Watch providers</h3>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
