import { fetchDetails } from "../lib/tmdbApi";
import { fetchOmdb } from "../lib/omdbApi";
import { useLoaderData } from "react-router-dom";
import { useTMDBConfig } from "../context/ConfigContext";
import { useGenres } from "../context/GenreContext";

export async function loader({ params }) {
  const { mediaType, id } = params;

  try {
    const film = await fetchDetails({ mediaType, id });
    return film;
  } catch (error) {
  } finally {
  }
  return null;
}

export default function MediaDetails() {
  const film = useLoaderData();
  const { config } = useTMDBConfig();
  const { movieGenres, tvGenres } = useGenres();

  console.log(config.backdropBaseUrl);
  console.log("details", film);

  const title = film?.title || film?.name;
  return (
    <>
      <div className="relative w-full h-full min-h-[86vh]">
        {/* backdrop img */}
        <img
          alt=""
          src={config?.backdropBaseUrl?.[3] + film.backdrop_path}
          className="
            pointer-events-none
            absolute
            z-0
            top-0
            left-0
            w-full
            h-full
            object-center
            object-cover
            max-h-[580px]
          "
        />
        {/* backdrop overlay */}
        <div
          className="
            absolute
            pointer-events-none
            z-1
            top-0
            left-0
            w-full 
            h-full 
            max-h-[580px]
            bg-gradient-to-t 
            from-bg-100 from-20% 
            via-bg-100/85 via-50% 
            to-bg-100/75 to-100%
            "
        ></div>
        <section className="relative z-10 container mx-auto flex flex-col items-center p-lg">
          <img
            alt={`${title}`}
            src={config?.posterBaseUrl?.[3] + film.poster_path}
            className="object-cover object-center w-60 rounded-md shadow-2xl border border-bg-300/20"
          />
        </section>
      </div>
    </>
  );
}
