import { NavLink } from "react-router-dom";

export default function PrimaryNav({ isOpen }) {
  return (
    <nav
      data-open={isOpen}
      className="
        bg-bg-200
        md:py-2
        md:px-0
        md:w-fit 
        md:bg-transparent 
        md:static
        md:h-1px
        md:top-auto md:left-auto
        md:data-[open=true]:translate-x-[0%] 
        md:data-[open=false]:translate-x-[0%]
        transition-transform 
        duration-300 
        ease-in-out 
        px-5 
        pt-20 
        fixed 
        top-0 
        left-0 
        h-full 
        w-full 
        data-[open=true]:translate-x-[40%] 
        data-[open=false]:translate-x-[100%]
        "
    >
      <ul className="flex h-full w-full flex-col gap-3xl md:gap-xs md:flex-row">
        <li>
          <NavLink
            to="/movie"
            className={({ isActive }) => {
              return isActive
                ? "bg-accent/10 text-accent p-md rounded-full"
                : "hover:bg-bg-300 transistion-color ease-in duration-300 p-md rounded-full";
            }}
          >
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tv"
            className={({ isActive }) => {
              return isActive
                ? "bg-accent/10 text-accent p-md rounded-full "
                : "hover:bg-bg-300 transistion-color ease-in duration-300 p-md rounded-full";
            }}
          >
            Tvshows
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/discover"
            className={({ isActive }) => {
              return isActive
                ? "bg-accent/10 text-accent p-md rounded-full "
                : "hover:bg-bg-300 transistion-color ease-in duration-300 p-md rounded-full";
            }}
          >
            Discover
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
