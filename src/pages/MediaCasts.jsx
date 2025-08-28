import { fetchCredits } from "../lib/tmdbApi";
import { useLoaderData } from "react-router-dom";
export async function loader({ params }) {
  const { mediaType, id } = params;
  try {
    const credits = await fetchCredits({ mediaType, id });

    return credits;
  } catch (error) {
  } finally {
  }
  return null;
}

export default function MediaCasts() {
  const credits = useLoaderData();
  return (
    <div>
      <h2>Casts and Crew</h2>
    </div>
  );
}
