import {
  Form,
  useActionData,
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
} from "react-router";
import { fetchWithQueryFilters } from "../lib/tmdbApi";
import Dropdown from "../components/ui/Dropdown";
import Button from "../components/ui/Button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export async function loader({ request }) {
  const url = new URL(request.url);

  const mediaType = url.searchParams.get("mediaType");

  const paramsArr = [
    ...url.searchParams.entries().map(([key, val]) => `${key}=${val}`),
  ];

  try {
    const data = await fetchWithQueryFilters(mediaType, paramsArr);
    return data;
  } catch (error) {}
  return null;
}

export default function Discover() {
  const data = useLoaderData();

  const { config, movieGenres, tvGenres } = useRouteLoaderData("root");
  const [searchParams, setSearchParmas] = useSearchParams();

  function updatePage(pageCount) {
    searchParams.set("page", pageCount);
    setSearchParmas(searchParams);
  }

  return (
    <>
      <section className="container mx-auto w-full h-full">
        <Form>
          <div>
            <label htmlFor="mediaType">movie</label>
            <input
              defaultChecked
              id="mediaType"
              name="mediaType"
              value="movie"
              type="radio"
            />
            <label htmlFor="mediaType">tv</label>
            <input id="mediaType" name="mediaType" value="tv" type="radio" />
          </div>
          <div>
            <label htmlFor="sort_by">Sort by:</label>
            <select name="sort_by" id="sort_by">
              <option defaultValue={true} value="popularity.desc">
                Popularity desc
              </option>
              <option value="popularity.asc">Popularity asc</option>
              <option value="vote_average.desc">Vote average desc</option>
              <option value="vote_average.asc">Vote average asc</option>
            </select>
          </div>
          <div>
            <label htmlFor="vote_average.gte">vote average lowest:</label>
            <input
              name="vote_average.gte"
              id="vote_average.gte"
              type="number"
              max={10}
              min={0}
              defaultValue={0}
            />
            <label htmlFor="vote_average.lte">vote average highest:</label>
            <input
              name="vote_average.lte"
              id="vote_average.lte"
              type="number"
              max={10}
              min={0}
              defaultValue={10}
            />
          </div>
          <button type="submit">submit</button>
        </Form>
        <button
          onClick={() => {
            updatePage(data?.page + 1);
          }}
        >
          Page {data?.page}
        </button>
      </section>
      <div className="container mx-auto grid grid-cols-6 gap-md">
        {data.results.map(item => (
          <img src={config.posterBaseUrl[2] + item.poster_path} />
        ))}
      </div>
    </>
  );
}
