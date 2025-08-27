import { useState, useEffect, useContext, createContext } from "react";
import { fetchGenres } from "../lib/tmdbApi";
const GenreContext = createContext();

export default function GenreProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const fetch = async () => {
      try {
        const [movieGenres, tvGenres] = await Promise.all([
          fetchGenres({ mediaType: "movie" }),
          fetchGenres({ mediaType: "tv" }),
        ]);
        if (isMounted) setData({ movieGenres, tvGenres });
        if (isMounted) setError(null);
      } catch (err) {
        if (isMounted) setError(err);
        console.log(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetch();
    return () => {
      isMounted = false;
    };
  }, []);

  const { movieGenres = [], tvGenres = [] } = data;
  return (
    <GenreContext.Provider value={{ movieGenres, tvGenres, loading, error }}>
      {children}
    </GenreContext.Provider>
  );
}

export const useGenres = () => useContext(GenreContext);
