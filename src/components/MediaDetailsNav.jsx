import { NavLink } from "react-router-dom";

export default function MediaDetailsNav() {
  return (
    <nav className="mx-auto">
      <ul className="flex flex-row gap-md">
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? "bg-accent/10 text-accent p-md rounded-full "
                : "hover:bg-bg-400 transistion-color ease-in duration-300 p-md rounded-full";
            }}
            to=""
            end
          >
            Credits
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? "bg-accent/10 text-accent p-md rounded-full "
                : "hover:bg-bg-400 transistion-color ease-in duration-300 p-md rounded-full";
            }}
            to="watch"
            end
          >
            Watch
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? "bg-accent/10 text-accent p-md rounded-full "
                : "hover:bg-bg-400 transistion-color ease-in duration-300 p-md rounded-full";
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
