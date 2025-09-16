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

  const sortBy = searchParams.get("sort_by");
  let genreFilters =
    searchParams
      .get("with_genres")
      ?.split(",")
      ?.filter(item => item !== "") || [];

  const existingGenresForMediaType =
    mediaType === "movie" ? movieGenres : tvGenres;

  let pageNavArr = [];
  for (let i = 0; i < 5; i++) {
    if (i + currentPage > totalPages) {
      break;
    } else {
      pageNavArr.push(i + currentPage);
    }
  }

  function addSearchFilters(key, value) {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  }

  function filterByGenres(key, value) {
    if (genreFilters.includes(value)) {
      genreFilters = genreFilters.filter(item => item !== value);

      searchParams.set(key, genreFilters.join(","));
      setSearchParams(searchParams);
    } else {
      genreFilters.push(value);

      searchParams.set(key, genreFilters.join(","));
      setSearchParams(searchParams);
    }
  }
  //console.log(existingGenresForMediaType);
  //console.log("data", data);
  //console.log("genreFilters", genreFilters);
  return (
    <>
      <section className="container p-lg mx-auto w-full h-full max-w-[1250px]">
        <div className="flex items-center gap-lg flex-wrap">
          <h2>Filters</h2>
          <nav>
            <ul className="flex items-center gap-md">
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

          <Dropdown className="relative">
            {({ isOpen, toggle, close }) => (
              <>
                <Button onClick={toggle} variant="icon">
                  Genres
                </Button>
                <div
                  className={`${isOpen ? "block" : "hidden"} absolute bg-bg-300 p-lg z-50 rounded-md mt-2`}
                >
                  <div className="p-md">
                    <p>Filter with genres:</p>
                  </div>
                  <div className="grid grid-cols-2 min-w-80 gap-lg z-20">
                    {existingGenresForMediaType.map(item => (
                      <label htmlFor={item.id} key={item.id}>
                        {item.name.toLowerCase() === "science fiction"
                          ? "Sci-fi"
                          : item.name}
                        <input
                          id={item.id}
                          name={item.id}
                          value={item.id.toString()}
                          checked={genreFilters.includes(item.id.toString())}
                          type="checkbox"
                          onChange={e =>
                            filterByGenres("with_genres", e.target.value)
                          }
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </Dropdown>

          <Dropdown>
            {({ isOpen, toggle }) => (
              <>
                <Button onClick={toggle} variant="icon">
                  Vote count
                </Button>
                <div
                  className={`${isOpen ? "block" : "hidden"} absolute z-50 bg-bg-300 p-lg rounded-md mt-2`}
                >
                  text
                </div>
              </>
            )}
          </Dropdown>

          <Dropdown>
            {({ isOpen, toggle }) => (
              <>
                <Button onClick={toggle} variant="icon">
                  Release year
                </Button>
                <div
                  className={`${isOpen ? "block" : "hidden"} z-50 absolute bg-bg-300 p-lg rounded-md mt-2`}
                >
                  text
                </div>
              </>
            )}
          </Dropdown>
        </div>

        <div className="flex gap-sm p-md">
          <label htmlFor="sort_by">sort by:</label>
          <select
            onChange={e => {
              addSearchFilters("sort_by", e.target.value);
            }}
            name="sort_by"
            id="sort_by"
            defaultValue={sortBy || ""}
            className="bg-bg-300 rounded-md"
          >
            <option value={""}>--Choose filter</option>
            <option value="popularity.desc">Most Popular</option>
            <option value="popularity.asc">Less Popular</option>
            <option value="primary_release_date.asc">Oldest</option>
            <option value="primary_release_date.desc">Newest</option>
          </select>
        </div>

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
            disabled={currentPage <= 1}
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
