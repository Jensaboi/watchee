import tmdbLogo from "../assets/tmdb-logo.png";
import imdbLogo from "../assets/imdb-logo.png";
import rottenTomatoLogo from "../assets/rotten-tomato-logo.png";
export default function MediaDetailsRatings({ data, tmdbRating }) {
  return (
    <ul className="flex flex-row items-center justify-center gap-md">
      <li className="flex flex-row gap-sm">
        <img className="h-5" src={tmdbLogo} />
        <span>{tmdbRating}</span>
      </li>
      <li className="flex flex-row gap-sm">
        <img className="h-5" src={imdbLogo} />
        <span>{data.imdbRating}</span>
      </li>
      <li className="flex flex-row gap-sm">
        <img className="h-5" src={rottenTomatoLogo} />
        <span>{data.rottenTomatoRating}</span>
      </li>
    </ul>
  );
}

export function MediaDetailsRatingsFallback() {
  return (
    <ul className="flex flex-row items-center justify-center gap-md">
      <li className="w-16 h-8 bg-bg-300 rounded-md"></li>
      <li className="w-16 h-8 bg-bg-300 rounded-md"></li>
      <li className="w-16 h-8 bg-bg-300 rounded-md"></li>
    </ul>
  );
}
