import {
  useNavigation,
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
} from "react-router";
import { fetchWithQueryFilters } from "../lib/tmdbApi";
import Dropdown from "../components/ui/Dropdown";
import Button from "../components/ui/Button";
import { ChevronDown, ChevronUp } from "lucide-react";

export async function loader({ request }) {
  const url = new URL(request.url);

  let mediaType = url.searchParams.get("mediaType");

  if (!mediaType) {
    url.searchParams.set("mediaType", "movie");
    mediaType = url.searchParams.get("mediaType");
  }

  try {
    const data = await fetchWithQueryFilters(mediaType, url.search);

    return { mediaType, data };
  } catch (error) {}
  return null;
}

export default function Discover() {
  const { mediaType, data } = useLoaderData();
  const navigation = useNavigation();
  const { config, movieGenres, tvGenres } = useRouteLoaderData("root");
  const [searchParams, setSearchParmas] = useSearchParams();
  console.log(navigation.state);
  console.log(data);
  function appendSearchParams(key, val) {
    searchParams.set(key, val);
    setSearchParmas(searchParams);
  }

  return (
    <>
      <section className="container mx-auto w-full h-full">
        <div className="flex ">
          <button
            onClick={() => appendSearchParams("mediaType", "movie")}
            className={mediaType === "movie" ? "active" : "not-active"}
          >
            Movies
          </button>
          <button
            onClick={() => appendSearchParams("mediaType", "tv")}
            className={mediaType === "tv" ? "active" : "not-active"}
          >
            {" "}
            Tv-shows
          </button>
          <button
            onClick={() => appendSearchParams("another", "something")}
            className={mediaType === "tv" ? "active" : "not-active"}
          >
            {" "}
            blabla
          </button>
        </div>
        <Dropdown>
          {({ isOpen, toggle, close }) => (
            <>
              <Button>{searchParams.get("")}</Button>
            </>
          )}
        </Dropdown>
      </section>
    </>
  );
}
