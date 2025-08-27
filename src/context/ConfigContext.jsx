import { createContext, useContext, useEffect, useState } from "react";
import { fetchTmdbConfig } from "../lib/tmdbApi";

const ConfigContext = createContext();

export default function ConfigProvider({ children }) {
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      try {
        const data = await fetchTmdbConfig();

        const configObj = {
          posterBaseUrl: [
            data.images.secure_base_url + data.images.poster_sizes[0],
            data.images.secure_base_url + data.images.poster_sizes[1],
            data.images.secure_base_url + data.images.poster_sizes[2],
            data.images.secure_base_url + data.images.poster_sizes[3],
            data.images.secure_base_url + data.images.poster_sizes[4],
            data.images.secure_base_url + data.images.poster_sizes[5],
            data.images.secure_base_url + data.images.poster_sizes[6],
          ],
          backdropBaseUrl: [
            data.images.secure_base_url + data.images.backdrop_sizes[0],
            data.images.secure_base_url + data.images.backdrop_sizes[1],
            data.images.secure_base_url + data.images.backdrop_sizes[2],
            data.images.secure_base_url + data.images.backdrop_sizes[3],
          ],
          profileBaseUrl: [
            data.images.secure_base_url + data.images.profile_sizes[0],
            data.images.secure_base_url + data.images.profile_sizes[1],
            data.images.secure_base_url + data.images.profile_sizes[2],
            data.images.secure_base_url + data.images.profile_sizes[3],
          ],
          logoBaseUrl: [
            data.images.secure_base_url + data.images.logo_sizes[0],
            data.images.secure_base_url + data.images.logo_sizes[1],
            data.images.secure_base_url + data.images.logo_sizes[2],
          ],
        };

        setConfig(configObj);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading, error }}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useTMDBConfig = () => useContext(ConfigContext);
