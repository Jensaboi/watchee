import { fetchDetails } from "../lib/tmdbApi";
import { fetchOmdb } from "../lib/omdbApi";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const { mediaType, id } = params;

  try {
    const details = await fetchDetails({ mediaType, id });
    const omdb = await fetchOmdb(details?.imdb_id);
    return { details, omdb };
  } catch (error) {
  } finally {
  }
  return null;
}

export default function MediaDetails() {
  const { details, omdb } = useLoaderData();
  console.log("details", details);
  console.log("omdb", omdb);
  return (
    <>
      <div className="w-full h-full min-h-[86vh]"></div>
    </>
  );
}
