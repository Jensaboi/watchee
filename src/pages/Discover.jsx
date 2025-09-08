import {
  useNavigation,
  useLoaderData,
  useRouteLoaderData,
  NavLink,
  Form,
  Link,
  useSearchParams,
  useParams,
} from "react-router";
import { fetchWithQueryFilters } from "../lib/tmdbApi";
import Dropdown from "../components/ui/Dropdown";
import Button from "../components/ui/Button";
import MediaCard from "../components/MediaCard";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import placeholderImg from "../assets/placeholder.png";
export async function loader({ request, params }) {
  const { mediaType } = params;
  const url = new URL(request.url);
  const searchFilters = url.search;
  try {
    const data = await fetchWithQueryFilters(mediaType, searchFilters || "?");
    return { data };
  } catch (error) {}
  return null;
}

export default function Discover() {
  const { data } = useLoaderData();
  const { mediaType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const { config, movieGenres, tvGenres } = useRouteLoaderData("root");
  const totalPages = data.total_pages;
  const currentPage = data.page;
  let pageNavArr = [];
  for (let i = 0; i < 5; i++) {
    if (i + currentPage > totalPages) {
      break;
    } else {
      pageNavArr.push(i + currentPage);
    }
  }

  console.log("data", data);
  console.log(searchParams.toString());
  //console.log(movieGenres);
  //console.log(tvGenres);

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
          <div>
            <label htmlFor="sort_by">sort by:</label>
            <select
              onChange={e => {
                setSearchParams(`sort_by=${e.target.value}`);
              }}
              name="sort_by"
              id="sort_by"
            >
              <option value="popularity.desc">Most Popular</option>
              <option value="popularity.asc">Less Popular</option>
              <option value="primary_release_date.asc">Newest</option>
              <option value="primary_release_date.desc">Oldest</option>
            </select>
          </div>
        </Form>

        <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-md">
          {navigation.state === "loading" ? (
            <LoadingSkeleton />
          ) : (
            data.results.map(item => (
              <li key={item.id}>
                <Link to={`/${mediaType}/${item.id}`}>
                  <MediaCard
                    imgUrl={
                      item.poster_path
                        ? config.posterBaseUrl[3] + item.poster_path
                        : placeholderImg
                    }
                    title={item?.name || item?.title}
                  />
                </Link>
              </li>
            ))
          )}
        </ol>
        <nav className="mt-10 w-full p-xl border-t border-t-bg-400 flex justify-between">
          <Button
            onClick={() => setSearchParams({ page: currentPage - 1 })}
            variant="page"
          >
            <ChevronLeft />
          </Button>
          <ol className="flex-center gap-sm">
            {pageNavArr.map((item, i) => (
              <li key={item}>
                <Button
                  className={item === currentPage ? "border-text-100" : ""}
                  variant="page"
                  onClick={() => setSearchParams({ page: item })}
                >
                  {item}
                </Button>
              </li>
            ))}
          </ol>
          <Button
            onClick={() => setSearchParams({ page: currentPage + 1 })}
            variant="page"
          >
            <ChevronRight />
          </Button>
        </nav>
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
