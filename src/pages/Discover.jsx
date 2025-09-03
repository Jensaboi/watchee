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
  console.log(url);
  console.log(Object.entries(url.searchParams));

  try {
    const data = await fetchWithQueryFilters();
    return data;
  } catch (error) {}
  return null;
}

export default function Discover() {
  const data = useLoaderData();
  const { config, movieGenres, tvGenres } = useRouteLoaderData("root");
  const [searchParams, setSearchParmas] = useSearchParams();

  return (
    <>
      <section></section>
    </>
  );
}
