import { NavLink } from "react-router-dom";

export default function PrimaryNav({ isOpen }) {
  return (
    <nav
      data-open={isOpen}
      className="bg-bg-200 md:p-0 md:w-fit md:bg-transparent md:static md:data-[open=true]:translate-x-[0%] md:data-[open=false]:translate-x-[0%] transition-transform duration-300 ease-in-out px-5 pt-20 fixed top-0 left-0 h-full w-full data-[open=true]:translate-x-[40%] data-[open=false]:translate-x-[100%]"
    >
      <ul className="flex flex-col gap-xl md:flex-row">
        <li>
          <NavLink
            to="/movie"
            className={({ isActive }) => {
              return isActive
                ? "text-text-100 text-base font-medium"
                : "text-text-300 text-base font-medium";
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
                ? "text-text-100 text-base font-medium"
                : "text-text-300 text-base font-medium";
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
                ? "text-text-100 text-base font-medium"
                : "text-text-300 text-base font-medium";
            }}
          >
            Discover
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
