import { useState, useEffect } from "react";
import { fetchWithSearchQuery } from "../utility/tmdbApi";

export default function useDebouncedSearch(
  { initialQuery = "", initialMedia = "multi", lang = "en-US" },
  delay = 200
) {
  const [query, setQuery] = useState(initialQuery);
  const [media, setMedia] = useState(initialMedia);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setData([]);
      return;
    }
    const controller = new AbortController();

    const timerId = setTimeout(() => {
      const fetch = async () => {
        setLoading(true);

        try {
          const queryData = await fetchWithSearchQuery(
            { query, media, lang },
            controller.signal
          );

          setData(queryData);
          setError(null);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err);
          }
        } finally {
          setLoading(false);
        }
      };

      fetch();
    }, delay);

    return () => {
      clearTimeout(timerId);
      controller.abort();
    };
  }, [query, media, lang, delay]);

  return { query, setQuery, media, setMedia, loading, data, error };
}
