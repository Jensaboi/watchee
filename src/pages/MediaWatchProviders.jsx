import { Suspense } from "react";
import {
  Await,
  useLoaderData,
  useParams,
  useRouteLoaderData,
  useSearchParams,
} from "react-router";
import { fetchWatchProviders } from "../lib/tmdbApi";
import { X } from "lucide-react";

import Button from "../components/ui/Button";
import Dropdown from "../components/ui/Dropdown";
import { getLangNameWithInitials } from "../lib/utility";

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
  const { config, allCountries } = useRouteLoaderData("root");
  const [searchParams, setSearchParams] = useSearchParams();
  const { mediaType } = useParams();

  function addSearchFilters(key, value) {
    searchParams.set(key, value);
    setSearchParams(searchParams, { replace: true, preventScrollReset: true });
  }

  return (
    <Suspense fallback={<p>Loading providers...</p>}>
      <Await resolve={watchProvidersPromise}>
        {watchProviders => {
          let countryStr = searchParams.get("country") || "US";
          const modifiedProviders = [];
          const possibleCountries = [];

          for (const countryKey in watchProviders) {
            possibleCountries.push(countryKey);
          }

          if (
            possibleCountries[0] === undefined ||
            possibleCountries === null
          ) {
            return (
              <div>
                <p>
                  Sorry cant find providers for this{" "}
                  {mediaType === "movie" ? mediaType : "Tv show"}
                </p>
              </div>
            );
          }

          if (!possibleCountries.includes(countryStr)) {
            countryStr = possibleCountries[0];
          }

          for (const [key, val] of Object.entries(watchProviders[countryStr])) {
            if (Array.isArray(val)) {
              const modifiedArr = val.map(item => ({ ...item, type: key }));

              modifiedProviders.push(...modifiedArr);
            }
          }

          const filter = searchParams.get("filter");

          const providers = filter
            ? modifiedProviders.filter(item => item.type === filter)
            : modifiedProviders;

          return (
            <div>
              <nav className="flex gap-lg">
                <select
                  defaultValue={countryStr}
                  onChange={e => addSearchFilters("country", e.target.value)}
                  className="bg-bg-300"
                >
                  {possibleCountries.map((item, i) => (
                    <option key={i + item} value={item}>
                      {getLangNameWithInitials(item, allCountries)
                        ?.english_name || "Unknown"}
                    </option>
                  ))}
                </select>
                <ul className="flex items-center justify-start gap-lg">
                  <li>
                    <button
                      className={`${filter === "flatrate" ? "text-accent" : ""} bg-bg-300 p-sm px-lg rounded-md`}
                      onClick={() => addSearchFilters("filter", "flatrate")}
                    >
                      Streaming
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${filter === "buy" ? "text-accent" : ""} bg-bg-300 p-sm px-lg rounded-md`}
                      onClick={() => addSearchFilters("filter", "buy")}
                    >
                      Buy
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${filter === "rent" ? "text-accent" : ""} bg-bg-300 p-sm px-lg rounded-md`}
                      onClick={() => addSearchFilters("filter", "rent")}
                    >
                      Rent
                    </button>
                  </li>
                  {filter && (
                    <li>
                      <Button
                        variant="icon"
                        onClick={() => addSearchFilters("filter", "")}
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
                            href={watchProviders[countryStr].link}
                            target="_blank"
                            rel="noopener"
                          >
                            <img
                              onMouseEnter={open}
                              onMouseLeave={close}
                              className="size-14 rounded-md"
                              src={config.logoBaseUrl[1] + item.logo_path}
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
