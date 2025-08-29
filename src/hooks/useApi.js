import { useState, useEffect } from "react";
import { cache } from "../lib/constants";

export default function useApi(fetchFn, params = {}, deps = []) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fetchFn || Object.values(params).some(item => item === undefined)) {
      return;
    }

    const controller = new AbortController();

    const fetch = async () => {
      setLoading(true);

      const key = `${fetchFn.name}-${JSON.stringify(params)}`;

      if (cache[key]) {
        setData(cache[key]);
        setLoading(false);
        return;
      }

      try {
        const resultData = await fetchFn(params, controller.signal);

        cache[key] = resultData;

        setData(resultData);
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

    return () => controller.abort();
  }, [fetchFn, ...Object.values(params), ...deps]);

  return { data, loading, error };
}
