import Button from "./ui/Button";
import MenuDropdown from "./ui/MenuDropdown";
import useDebouncedSearch from "../hooks/useDebouncedSearch";

import { Search, X, ChevronDown, ChevronUp } from "lucide-react";

export default function SearchAndResults({ close }) {
  const { query, setQuery, media, setMedia, loading, data, error } =
    useDebouncedSearch({ initialQuery: "" });
  return (
    <div className="relative">
      <div className="flex items-center gap-xs px-xs w-full bg-bg-100 h-[80px] md:h-fit">
        <div
          className="relative flex items-center justify-between w-full             focus:outline-none 
            focus-within:ring-2 focus-within:ring-bg-500
            transition rounded-full"
        >
          <MenuDropdown className="relative">
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
                  mt-[1px]
                  left-1
                  bg-bg-300
                  w-45
                  py-sm
                  rounded-sm
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
          </MenuDropdown>
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
      <ul className="absolute">
        <li>text</li>
        <li>text</li>
        <li>text</li>
        <li>text</li>
        <li>text</li>
      </ul>
    </div>
  );
}
