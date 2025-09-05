import { NavLink } from "react-router-dom";

export default function PrimaryNav({ close, isOpen }) {
  return (
    <nav
      data-open={isOpen}
      className="
        z-20
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
            onClick={close}
            to="/movie"
            className={({ isActive }) => {
              return isActive ? "active" : "not-active";
            }}
            end
          >
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={close}
            to="/tv"
            className={({ isActive }) => {
              return isActive ? "active" : "not-active";
            }}
            end
          >
            Tvshows
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={close}
            to="/discover/movie"
            className={({ isActive }) => {
              return isActive ? "active" : "not-active";
            }}
            end
          >
            Discover
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
