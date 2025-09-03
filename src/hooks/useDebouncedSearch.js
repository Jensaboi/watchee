import { useState, useEffect } from "react";

export default function useDebouncedSearch(fetchFn, params, delay = 200) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const timerId = setTimeout(() => {
      const fetch = async () => {
        setLoading(true);

        try {
          const queryData = await fetchFn({ ...params }, controller.signal);

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
  }, [...Object.values(params), delay]);

  return { loading, data, error };
}
