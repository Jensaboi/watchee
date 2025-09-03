import useDebouncedSearch from "../hooks/useDebouncedSearch";
import { useState } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useRouteLoaderData } from "react-router-dom";
import { getYearStr } from "../lib/utility";
import Button from "./ui/Button";
import Dropdown from "./ui/Dropdown";
import { fetchWithSearchQuery } from "../lib/tmdbApi";

export default function SearchAndResults({ closeModal }) {
  const [query, setQuery] = useState("");
  const [mediaType, setMediaType] = useState("multi");

  const { loading, data, error } = useDebouncedSearch(fetchWithSearchQuery, {
    query,
    mediaType,
  });

  const { config } = useRouteLoaderData("root");

  function closeSearch() {
    closeModal();
    setQuery("");
  }

  return (
    <Dropdown>
      {({ isOpen, close, open }) => (
        <>
          <div
            onClick={open}
            className="flex items-center gap-xs md:px-0 px-xs w-full bg-bg-100 h-[80px] md:h-fit hover:cursor-pointer"
          >
            <div className="relative flex items-center justify-between w-full focus:outline-none focus-within:ring-2 focus-within:ring-bg-500 transition rounded-full">
              <Dropdown className="relative">
                {({ isOpen, toggle }) => (
                  <>
                    <button
                      className="bg-bg-300 text-text-400 pl-5 pr-3 py-3 rounded-l-full flex-center gap-1"
                      onClick={toggle}
                    >
                      All
                      {isOpen ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                    {isOpen && (
                      <ul className="absolute top-1/1 mt-[2px] left-1 bg-bg-400 w-45 py-sm rounded-sm z-80 border-bg-bg-500">
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
                className="flex-1 w-full rounded-r-full bg-bg-300 text-base text-color-text-100 placeholder-text-400 px-3 py-3 pr-12 outline-none focus:outline-none"
              />
              <Search className="absolute top-3 right-3 text-text-400" />
            </div>
            <Button className="md:hidden" onClick={closeModal} variant="icon">
              <X />
            </Button>
          </div>
          {data[0] && isOpen && (
            <ul className="absolute z-60 top-1/1 left-0 rounded-md text-text-100 bg-bg-100 w-full py-2 max-h-[90vh] overflow-y-scroll md:max-h-[80vh]md:bg-bg-300 md:mt-[4px]">
              {data.map(item => {
                const releaseDate = item?.release_date || item?.first_air_date;
                const path = item?.poster_path || item?.profile_path;
                return (
                  <Link
                    onClick={() => {
                      closeSearch();
                      close();
                    }}
                    to={`/${item?.media_type}/${item?.id}`}
                    key={item?.id}
                    className="flex justify-start gap-sm p-sm hover:bg-bg-300 hover:md:bg-bg-500"
                  >
                    <img
                      alt=""
                      src={config.posterBaseUrl[0] + path}
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
                          {item?.media_type !== "person" &&
                            getYearStr(releaseDate)}
                          {item?.known_for_department}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </ul>
          )}
        </>
      )}
    </Dropdown>
  );
}
