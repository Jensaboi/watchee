import Button from "./ui/Button";
import Dropdown from "./ui/Dropdown";
import useDebouncedSearch from "../hooks/useDebouncedSearch";
import { useTMDBConfig } from "../context/ConfigContext";
import { useGenres } from "../context/GenreContext";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { getYearStr } from "../lib/utility";

export default function SearchAndResults({ close }) {
  const { query, setQuery, media, setMedia, loading, data, error } =
    useDebouncedSearch({ initialQuery: "" });

  const { config } = useTMDBConfig();

  const { movieGenres, tvGenres } = useGenres();

  function closeSearch() {
    close();
    setQuery("");
  }
  return (
    <div className="relative">
      <div className="flex items-center gap-xs md:px-0 px-xs w-full bg-bg-100 h-[80px] md:h-fit">
        <div
          className="relative 
            flex items-center 
            justify-between 
            w-full             
            focus:outline-none 
            focus-within:ring-2 
            focus-within:ring-bg-500
            transition rounded-full"
        >
          <Dropdown className="relative">
            {({ isOpen, toggle, open, close }) => (
              <>
                <button
                  className="bg-bg-300 
                  px-5 py-3 
                  rounded-l-full
                  flex-center gap-xs"
                  onClick={toggle}
                >
                  All
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {isOpen && (
                  <ul
                    className="absolute 
                  top-1/1
                  mt-[2px]
                  left-1
                  bg-bg-500
                  w-45
                  py-sm
                  rounded-sm
                  z-20
                  border-bg-bg-500
                  "
                  >
                    <li className="p-md text-text-100 hover:bg-bg-500 cursor-pointer">
                      All
                    </li>
                    <li className="p-md text-text-100 hover:bg-bg-500 cursor-pointer">
                      Movies
                    </li>
                    <li className="p-md text-text-100 hover:bg-bg-500 cursor-pointer">
                      Tv-shows
                    </li>
                    <li className="p-md text-text-100 hover:bg-bg-500 cursor-pointer">
                      People
                    </li>
                  </ul>
                )}
              </>
            )}
          </Dropdown>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.currentTarget.value)}
            className="
            flex-1
            w-full rounded-r-full 
            bg-bg-300
            text-base
            text-color-text-100
            placeholder-text-400
            px-3 py-3 
            pr-12
            outline-none focus:outline-none
            "
          />
          <Search className="absolute top-3 right-3 text-text-400" />
        </div>
        <Button className="md:hidden" onClick={close} variant="icon">
          <X />
        </Button>
      </div>
      {data[0] && (
        <ul
          className="absolute 
            top-1/1 
            left-0 
            rounded-md 
            text-text-100 
            bg-bg-100 
            w-full 
            py-2 
            max-h-[90vh] 
            overflow-y-scroll
            md:max-h-[80vh]
            md:bg-bg-300
            md:mt-[2px] 
            "
        >
          {data.map(item => {
            const releaseDate = item?.release_date || item?.first_air_date;
            return (
              <li onClick={closeSearch}>
                <Link
                  to={`/${item?.media_type}/${item?.id}`}
                  key={item?.id}
                  className="flex justify-start gap-sm p-sm hover:bg-bg-300 hover:md:bg-bg-500"
                >
                  <img
                    alt=""
                    src={config?.posterBaseUrl?.[0] + item?.poster_path}
                    className="w-full max-w-[48px] object-center object-cover rounded-sm shadow-lg"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="text-base font-normal">
                      {item?.name || item?.title}
                    </h3>
                    <div className="flex justify-start items-center gap-sm">
                      <span className="text-text-500 md:text-text-400 text-base">
                        {item?.media_type?.toLowerCase() === "tv" && "TVshow"}
                        {item?.media_type?.toLowerCase() !== "tv" &&
                          item?.media_type?.charAt(0)?.toUpperCase() +
                            item?.media_type?.slice(1)}
                      </span>
                      <span className="size-1 rounded-full bg-text-500 md:text-text-400"></span>
                      <span className="text-text-500 md:text-text-400 text-base">
                        {getYearStr(releaseDate)}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
