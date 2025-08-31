import { Suspense } from "react";
import {
  useLoaderData,
  useNavigate,
  useParams,
  Outlet,
  Await,
} from "react-router-dom";

import { fetchDetails, fetchVideos, fetchAgeRatings } from "../lib/tmdbApi";
import { fetchOmdb } from "../lib/omdbApi";

import useToggle from "../hooks/useToggle";
import { useTMDBConfig } from "../context/ConfigContext";
import { useGenres } from "../context/GenreContext";
import { useAgeExplanations } from "../context/AgeRatingExplanationsContext";
import {
  getYearStr,
  formatRunTimeStr,
  getGenres,
  getAgeRating,
  getLanguageName,
  getAgeRatingExplanation,
  getTrailers,
} from "../lib/utility";
import Button from "../components/ui/Button";
import VideoPlayerModal from "../components/VideoPlayerModal";
import MediaTitle from "../components/MediaTitle";
import MediaGenres from "../components/MediaGenres";
import MediaOverview from "../components/MediaOverview";
import MediaDetailsNav from "../components/MediaDetailsNav";
import MediaDetailsRatings, {
  MediaDetailsRatingsFallback,
} from "../components/MediaDetailsRatings";
import MediaDetailsSidebar from "../components/MediaDetailsSidebar";
import { MoveLeft, Plus, Star } from "lucide-react";

export async function loader({ params }) {
  const { mediaType, id } = params;

  try {
    const media = await fetchDetails({ mediaType, id });
    const ageRatings = await fetchAgeRatings({ ...params });

    return {
      media,
      videosPromise: fetchVideos({ mediaType, id }),
      ageRatings,
      omdb: mediaType === "movie" ? fetchOmdb(media.imdb_id) : null,
    };
  } catch (error) {
  } finally {
  }
  return null;
}

export default function MediaDetails() {
  const { media, videosPromise, ageRatings, omdb } = useLoaderData();
  const { config } = useTMDBConfig();
  const { movieGenres, tvGenres } = useGenres();
  const navigate = useNavigate();
  const { mediaType } = useParams();
  const { movieRatingExplanations, tvRatingExplanations } =
    useAgeExplanations();
  const allMediagenres = mediaType === "movie" ? movieGenres : tvGenres;
  const trailerPlayer = useToggle();

  //console.log("details", media);
  //console.log("videos", videosPromise);
  //console.log("ratings", ageRatings);
  //console.log("omdb", omdb);
  //console.log(movieRatingExplanations);

  let ageRatingExplanations =
    mediaType === "movie" ? movieRatingExplanations : tvRatingExplanations;

  const title = media?.title || media?.name;
  const releaseDate = media?.release_date || media.first_air_date;
  const ageRating = getAgeRating(mediaType, ageRatings);
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
        {media.backdrop_path && (
          <img
            alt=""
            src={config?.backdropBaseUrl?.[3] + media.backdrop_path}
            className="pointer-events-none absolute z-0 top-0 left-0 w-full h-full object-center object-cover max-h-[580px]"
          />
        )}
        {/* backdrop overlay */}
        <div className="absolute pointer-events-none z-1 top-0 left-0 w-full h-full max-h-[580px] bg-gradient-to-t from-bg-100 from-20% via-bg-100/85 via-50% to-bg-100/75 to-100%"></div>

        <section
          className="relative z-10 container mx-auto mt-2xl mb-2xl flex flex-col items-center gap-xl
        md:flex-row md:min-h-[500px]"
        >
          <img
            alt={`${title}`}
            src={config?.posterBaseUrl?.[3] + media.poster_path}
            className="object-cover object-center w-48 sm:w-60 md:w-74 lg:w-80 aspect-7/10 max-h-112 xl:w-86 rounded-md shadow-2xl border border-bg-300/20"
          />

          <div className="flex flex-col gap-lg md:justify-start md:items-start">
            <MediaTitle
              title={title}
              year={getYearStr(releaseDate)}
              runtime={formatRunTimeStr(media?.runtime)}
              ageRating={ageRating}
            />

            <div className="flex-center gap-sm">
              <Suspense
                fallback={
                  <span className="w-[114px] h-[40px] rounded-full bg-bg-300"></span>
                }
              >
                <Await resolve={videosPromise}>
                  {videos => {
                    const trailers = getTrailers(videos);
                    const trailer = trailers[0];
                    return (
                      <>
                        <Button
                          onClick={trailerPlayer.toggle}
                          variant="solid"
                          size="md"
                        >
                          Play trailer
                        </Button>
                        <VideoPlayerModal
                          src={`https://www.youtube.com/embed/${trailer.key}`}
                          headerText={`${title} trailer`}
                          isOpen={trailerPlayer.isOpen}
                          close={trailerPlayer.close}
                        />
                      </>
                    );
                  }}
                </Await>
              </Suspense>
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
                  {resolvedOmdb => (
                    <MediaDetailsRatings
                      data={resolvedOmdb}
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

        <section
          className="relative z-10 container mx-auto my-10 flex flex-col
                            md:flex-row gap-10
        "
        >
          <div className="flex-1 min-w-0 pt-5">
            <MediaDetailsNav className="mb-10" />
            <Outlet context={media} />
          </div>

          <MediaDetailsSidebar
            budget={media.budget}
            revenue={media.revenue}
            OriginalLanguage={getLanguageName(
              media.spoken_languages,
              media.original_language
            )}
            releaseDate={releaseDate}
            ended={media?.last_air_date}
            status={media.status}
            ageRating={getAgeRating(mediaType, ageRatings)}
            ageRatingExplanation={
              getAgeRatingExplanation(ageRating, ageRatingExplanations).short
            }
            spokenLanguages={media.spoken_languages}
            awards={
              omdb && (
                <Suspense fallback={<p>loading awards...</p>}>
                  <Await resolve={omdb}>
                    {resolvedOmdb => (
                      <div>
                        <h3>Awards</h3>
                        <p>{resolvedOmdb.awards || "Unknown"}</p>
                      </div>
                    )}
                  </Await>
                </Suspense>
              )
            }
          />
        </section>
      </div>
    </>
  );
}
