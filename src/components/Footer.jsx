import tmdbLogo from "../assets/tmdb-logo.png";
export default function Footer() {
  return (
    <footer className="p-10 flex-center gap-lg bg-bg-400">
      <p>
        Powered by The Movie Database{" "}
        <a
          className="text-blue-400 hover:underline"
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener"
        >
          (TMDB)
        </a>
      </p>
      <a
        className="hover:brightness-120 hover:scale-101"
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener"
      >
        <img width="40" src={tmdbLogo} alt="TMDb Logo" />
      </a>
    </footer>
  );
}
