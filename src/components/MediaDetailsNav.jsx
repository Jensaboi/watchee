import { NavLink } from "react-router-dom";

export default function MediaDetailsNav({ className }) {
  return (
    <nav className={`${className} `}>
      <ul className="flex flex-row gap-xs sm:gap-md">
        <li>
          <NavLink
            replace
            className={({ isActive }) => {
              return isActive ? "active" : "not-active";
            }}
            to=""
            end
          >
            Credits
          </NavLink>
        </li>
        <li>
          <NavLink
            replace
            className={({ isActive }) => {
              return isActive ? "active" : "not-active";
            }}
            to="watch"
            end
          >
            Watch at
          </NavLink>
        </li>
        <li>
          <NavLink
            replace
            className={({ isActive }) => {
              return isActive ? "active" : "not-active";
            }}
            to="reviews"
            end
          >
            Reviews
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
