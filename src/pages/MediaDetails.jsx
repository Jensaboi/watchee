import { fetchDetails, fetchTrailer, fetchAgeRatings } from "../lib/tmdbApi";
import { fetchOmdb } from "../lib/omdbApi";

import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useTMDBConfig } from "../context/ConfigContext";
import { useGenres } from "../context/GenreContext";

import {
  getYearStr,
  formatRunTimeStr,
  getGenres,
  getAgeRating,
} from "../lib/utility";

import Button from "../components/ui/Button";
import MediaTitle from "../components/MediaTitle";

import { MoveLeft, Plus, Star } from "lucide-react";
import MediaGenres from "../components/MediaGenres";

export async function loader({ params }) {
  const { mediaType, id } = params;

  try {
    const media = await fetchDetails({ mediaType, id });
    const trailer = await fetchTrailer({ mediaType, id });
    const ageRatings = await fetchAgeRatings({ ...params });

    if (mediaType === "movie") {
      const omdb = await fetchOmdb(media.imdb_id);
      return { media, trailer, ageRatings, omdb };
    }
    return { media, trailer, ageRatings };
  } catch (error) {
  } finally {
  }
  return null;
}

export default function MediaDetails() {
  const { media, trailer, ageRatings } = useLoaderData();
  const { config } = useTMDBConfig();
  const { movieGenres, tvGenres } = useGenres();
  const navigate = useNavigate();
  const { mediaType, id } = useParams();

  const allMediagenres = mediaType === "movie" ? movieGenres : tvGenres;

  console.log("details", media);
  //console.log("trailer", trailer);
  //console.log("ratings", ageRatings);

  const title = media?.title || media?.name;
  const releaseDate = media?.release_date || media.first_air_date;
  return (
    <>
      <div className="relative p-lg w-full h-full min-h-[86vh]">
        <Button
          onClick={() => navigate(-1)}
          className="z-3 relative"
          variant="icon"
        >
          <MoveLeft />
        </Button>
        {/* backdrop img */}
        <img
          alt=""
          src={config?.backdropBaseUrl?.[3] + media.backdrop_path}
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
        <section className="relative z-10 container mx-auto mt-1 flex flex-col items-center gap-xl">
          <img
            alt={`${title}`}
            src={config?.posterBaseUrl?.[3] + media.poster_path}
            className="object-cover object-center w-52 sm:w-60 rounded-md shadow-2xl border border-bg-300/20"
          />
          <div className="flex flex-col gap-lg">
            <MediaTitle
              title={title}
              year={getYearStr(releaseDate)}
              runtime={formatRunTimeStr(media?.runtime)}
              ageRating={getAgeRating(mediaType, ageRatings)}
            />

            <div className="flex-center gap-sm">
              <Button variant="solid" size="md">
                Play trailer
              </Button>
              <Button variant="icon">
                <Plus />
              </Button>
              <Button variant="icon">
                <Star />
              </Button>
            </div>

            <MediaGenres genres={media.genres} />
          </div>
        </section>
      </div>
    </>
  );
}
