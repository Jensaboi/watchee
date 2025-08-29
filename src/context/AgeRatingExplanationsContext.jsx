import { useState, useEffect, useContext, createContext } from "react";
import { fetchAgeRatingExplanation } from "../lib/tmdbApi";

const ageRatingExplanationContext = createContext();

export default function AgeRatingExplanationProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const [movieRatingExplanations, tvRatingExplanations] =
          await Promise.all([
            fetchAgeRatingExplanation({ mediaType: "movie" }),
            fetchAgeRatingExplanation({ mediaType: "tv" }),
          ]);

        setData({ movieRatingExplanations, tvRatingExplanations });
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);
  const { movieRatingExplanations = [], tvRatingExplanations = [] } = data;
  return (
    <ageRatingExplanationContext.Provider
      value={{ movieRatingExplanations, tvRatingExplanations, loading, error }}
    >
      {children}
    </ageRatingExplanationContext.Provider>
  );
}

export const useAgeExplanations = () => useContext(ageRatingExplanationContext);
