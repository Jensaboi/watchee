import { fetchDetails, fetchTrailer, fetchAgeRatings } from "../lib/tmdbApi";
import { fetchOmdb } from "../lib/omdbApi";
import {
  useLoaderData,
  useNavigate,
  useParams,
  Outlet,
  Await,
} from "react-router-dom";
import { useTMDBConfig } from "../context/ConfigContext";
import { useGenres } from "../context/GenreContext";
import {
  getYearStr,
  formatRunTimeStr,
  getGenres,
  getAgeRating,
  getLanguageName,
} from "../lib/utility";
import Button from "../components/ui/Button";
import MediaTitle from "../components/MediaTitle";
import { MoveLeft, Plus, Star } from "lucide-react";
import MediaGenres from "../components/MediaGenres";
import MediaOverview from "../components/MediaOverview";
import MediaDetailsNav from "../components/MediaDetailsNav";
import MediaDetailsRatings, {
  MediaDetailsRatingsFallback,
} from "../components/MediaDetailsRatings";
import MediaDetailsSidebar from "../components/MediaDetailsSidebar";
import { Suspense } from "react";

export async function loader({ params }) {
  const { mediaType, id } = params;

  try {
    const media = await fetchDetails({ mediaType, id });
    const trailer = await fetchTrailer({ mediaType, id });
    const ageRatings = await fetchAgeRatings({ ...params });

    if (mediaType === "movie") {
      const omdb = fetchOmdb(media.imdb_id);
      return { media, trailer, ageRatings, omdb };
    }
    return { media, trailer, ageRatings, omdb: null };
  } catch (error) {
  } finally {
  }
  return null;
}

export default function MediaDetails() {
  const { media, trailer, ageRatings, omdb } = useLoaderData();
  const { config } = useTMDBConfig();
  const { movieGenres, tvGenres } = useGenres();
  const navigate = useNavigate();
  const { mediaType } = useParams();

  const allMediagenres = mediaType === "movie" ? movieGenres : tvGenres;

  console.log("details", media);
  //console.log("trailer", trailer);
  //console.log("ratings", ageRatings);
  //console.log("omdb", omdb);

  const title = media?.title || media?.name;
  const releaseDate = media?.release_date || media.first_air_date;
  return (
    <>
      <div className="relative p-lg w-full h-full min-h-[86vh]">
        <Button
          onClick={() => navigate(-1)}
          className="z-15 absolute"
          variant="icon"
        >
          <MoveLeft />
        </Button>
        {/* backdrop img */}
        <img
          alt=""
          src={config?.backdropBaseUrl?.[3] + media.backdrop_path}
          className="pointer-events-none absolute z-0 top-0 left-0 w-full h-full object-center object-cover max-h-[580px]"
        />
        {/* backdrop overlay */}
        <div className="absolute pointer-events-none z-1 top-0 left-0 w-full h-full max-h-[580px] bg-gradient-to-t from-bg-100 from-20% via-bg-100/85 via-50% to-bg-100/75 to-100%"></div>

        <section
          className="relative z-10 container mx-auto mt-2xl mb-2xl flex flex-col items-center gap-xl
        md:flex-row md:min-h-[500px]"
        >
          <img
            alt={`${title}`}
            src={config?.posterBaseUrl?.[3] + media.poster_path}
            className="object-cover object-center w-48 sm:w-60 md:w-74 lg:w-80 xl:w-86 rounded-md shadow-2xl border border-bg-300/20"
          />

          <div className="flex flex-col gap-lg md:justify-start md:items-start">
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

            {omdb && (
              <Suspense fallback={<MediaDetailsRatingsFallback />}>
                <Await resolve={omdb}>
                  {loadedRatings => (
                    <MediaDetailsRatings
                      data={loadedRatings}
                      tmdbRating={media.vote_average.toFixed(1)}
                    />
                  )}
                </Await>
              </Suspense>
            )}

            <MediaGenres genres={media.genres} />
            {media?.tagline && (
              <p className="text-center text-text-500">"{media.tagline}"</p>
            )}

            <MediaOverview overview={media.overview} />
          </div>
        </section>

        <section className="relative z-10 container mx-auto my-10">
          <div className="">
            <MediaDetailsNav />
            <Outlet />
          </div>
          <MediaDetailsSidebar
            budget={media.budget}
            revenue={media.revenue}
            OriginalLanguage={getLanguageName(
              media.spoken_languages,
              media.original_language
            )}
            releaseDate={releaseDate}
            status={media.status}
            ageRating={getAgeRating(mediaType, ageRatings)}
            spokenLanguages={media.spoken_languages}
          />
        </section>
      </div>
    </>
  );
}
