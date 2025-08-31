import { Suspense } from "react";
import { Await, useLoaderData, useSearchParams } from "react-router";
import { fetchWatchProviders } from "../lib/tmdbApi";
import { useTMDBConfig } from "../context/ConfigContext";
import { X } from "lucide-react";

import Button from "../components/ui/Button";
import Dropdown from "../components/ui/Dropdown";

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
  const { config } = useTMDBConfig();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Suspense fallback={<p>Loading providers...</p>}>
      <Await resolve={watchProvidersPromise}>
        {watchProviders => {
          const modifiedProviders = [];
          for (const [key, val] of Object.entries(watchProviders["US"])) {
            if (Array.isArray(val)) {
              const modifiedArr = val.map(item => ({ ...item, type: key }));
              modifiedProviders.push(...modifiedArr);
            }
          }

          const filter = searchParams.get("filter");

          const providers = filter
            ? modifiedProviders.filter(item => item.type === filter)
            : modifiedProviders;
          console.log(providers);
          return (
            <div>
              <nav>
                <ul className="flex items-center justify-start gap-lg">
                  <li>
                    <button
                      className={`${filter === "flatrate" ? "text-accent" : ""} bg-bg-300 p-sm px-lg rounded-md`}
                      onClick={() => setSearchParams("filter=flatrate")}
                    >
                      Streaming
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${filter === "buy" ? "text-accent" : ""} bg-bg-300 p-sm px-lg rounded-md`}
                      onClick={() => setSearchParams("filter=buy")}
                    >
                      Buy
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${filter === "rent" ? "text-accent" : ""} bg-bg-300 p-sm px-lg rounded-md`}
                      onClick={() => setSearchParams("filter=rent")}
                    >
                      Rent
                    </button>
                  </li>
                  {filter && (
                    <li>
                      <Button
                        variant="icon"
                        onClick={() => setSearchParams("")}
                      >
                        <X />
                      </Button>
                    </li>
                  )}
                </ul>
              </nav>
              <ul className="mt-10 flex items-center flex-wrap gap-lg">
                {providers.map((item, i) => (
                  <li key={i}>
                    <Dropdown>
                      {({ isOpen, toggle, open, close }) => (
                        <>
                          <a
                            className="text-blue-400 hover:underline"
                            href={watchProviders["US"].link}
                            target="_blank"
                            rel="noopener"
                          >
                            <img
                              onMouseEnter={open}
                              onMouseLeave={close}
                              className="size-14 rounded-md"
                              src={config.logoBaseUrl?.[1] + item.logo_path}
                            />
                          </a>
                          {isOpen && (
                            <div className="bg-bg-500 mt-[4px] p-md rounded-sm absolute whitespace-nowrap z-50">
                              <p>{item.provider_name}</p>
                              <p>
                                {item.type === "flatrate"
                                  ? "Subscription"
                                  : item.type}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </Dropdown>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
