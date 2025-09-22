import { createContext, useContext, useEffect, useState } from "react";

const watchListContext = createContext();

export default function WatchListProvider({ children }) {
  const [watchList, setWatchList] = useState(
    localStorage.getItem("watchList")
      ? JSON.parse(localStorage.getItem("watchList"))
      : []
  );

  function addToWatchList(mediaObj, mediaType = null) {
    mediaObj.mediaType = mediaType;
    if (watchList.some(item => item.id === mediaObj.id)) return;
    setWatchList(prev => [...prev, mediaObj]);
  }

  function removeFromWatchList(mediaObj, mediaType) {
    if (!watchList.some(item => item.id === mediaObj.id)) return;
    setWatchList(prev => prev.filter(item => item.id !== mediaObj.id));
  }

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
    console.log("Watchlist:", watchList);
  }, [watchList]);

  return (
    <watchListContext.Provider
      value={{ watchList, addToWatchList, removeFromWatchList }}
    >
      {children}
    </watchListContext.Provider>
  );
}

export const useWatchList = () => useContext(watchListContext);
