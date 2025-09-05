import {
  useNavigation,
  useLoaderData,
  useRouteLoaderData,
  NavLink,
  Form,
  Link,
} from "react-router";
import { fetchWithQueryFilters } from "../lib/tmdbApi";
import Dropdown from "../components/ui/Dropdown";
import Button from "../components/ui/Button";
import MediaCard from "../components/MediaCard";
import { ChevronDown, ChevronUp } from "lucide-react";

export async function loader({ request, params }) {
  const { mediaType } = params;
  const url = new URL(request.url);
  const searchFilters = url.search;

  try {
    const data = await fetchWithQueryFilters(mediaType, searchFilters || "?");
    return { mediaType, data };
  } catch (error) {}
  return null;
}

export default function Discover() {
  const { mediaType, data } = useLoaderData();
  const navigation = useNavigation();
  const { config, movieGenres, tvGenres } = useRouteLoaderData("root");

  console.log(navigation.state);
  console.log("data", data);

  console.log(movieGenres);
  console.log(tvGenres);
  return (
    <>
      <section className="container p-lg mx-auto w-full h-full max-w-[1250px]">
        <div className="flex items-center">
          <h2>Filters</h2>
          <nav className="container mx-auto p-lg">
            <ul className="flex items-center gap-lg">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "not-active"
                  }
                  to="/discover/movie"
                >
                  Movies
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "not-active"
                  }
                  to="/discover/tv"
                >
                  Tvshows
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <Form>
          <Dropdown>
            {({ isOpen, toggle, close }) => (
              <>
                <Button></Button>
              </>
            )}
          </Dropdown>
        </Form>

        <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-md">
          {navigation.state === "loading" ? (
            <LoadingSkeleton />
          ) : (
            data.results.map(item => (
              <li key={item.id}>
                <Link to={`/${mediaType}/${item.id}`}>
                  <MediaCard
                    imgUrl={config.posterBaseUrl[3] + item.poster_path}
                    title={item?.name || item?.title}
                  />
                </Link>
              </li>
            ))
          )}
        </ol>
      </section>
    </>
  );
}

export function LoadingSkeleton() {
  return (
    <>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
      <div className="w-full max-w-60 h-70 rounded-md bg-bg-300"></div>
    </>
  );
}
