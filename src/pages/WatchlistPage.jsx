import { useWatchList } from "../context/WatchListProvider";
import { useRouteLoaderData } from "react-router";

export default function MyList() {
  const { watchList } = useWatchList();
  const { config } = useRouteLoaderData("root");

  const movies =
    watchList?.filter(item => item?.mediaType?.toLowerCase() === "movie") || [];
  const tvShows =
    watchList.filter(item => item?.mediaType?.toLowerCase() === "tv") || [];
  return (
    <>
      <div>
        <h2>Movies to watch</h2>
        <ul>
          {movies?.[0] ? (
            movies.map(item => {
              return (
                <li key={item.id}>
                  <img src="" />
                  <div>
                    <h3>{item?.name ?? item?.title}</h3>
                    <p>{item?.overview}</p>
                  </div>
                </li>
              );
            })
          ) : (
            <p>
              You have no movies in ur watch list! Add some movies to view ur
              watch list!
            </p>
          )}
        </ul>
        <h2>Shows to watch</h2>
        <ul>
          {tvShows?.[0] ? (
            tvShows.map(item => {
              return (
                <li key={item.id}>
                  <img src="" />
                  <div>
                    <h3>{item?.name ?? item?.title}</h3>
                    <p>{item?.overview}</p>
                  </div>
                </li>
              );
            })
          ) : (
            <p>
              You have no Shows in ur watch list! Add some Tv Shows to view ur
              watch list!
            </p>
          )}
        </ul>
      </div>
    </>
  );
}
