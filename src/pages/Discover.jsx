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

export async function loader({ request }) {
  const url = new URL(request.url);
  const mediaType = url.searchParams.get("mediaType");
  url.searchParams.delete("mediaType");
  console.log(url.search);
  console.log(mediaType);
  try {
    const data = await fetchWithQueryFilters({ mediaType, search });
    return data;
  } catch (error) {}
  return null;
}

export default function Discover() {
  const data = useLoaderData();
  const { config, movieGenres, tvGenres } = useRouteLoaderData("root");
  const [searchParams, setSearchParmas] = useSearchParams();

  function handleSubmit(e) {
    e.preventDefault();
  }
  console.log(data);
  return (
    <>
      <section>
        <Form onSubmit={handleSubmit}>
          <select>
            <option value="name">name</option>
            <option value="apple">apple</option>
          </select>
        </Form>
      </section>
    </>
  );
}
