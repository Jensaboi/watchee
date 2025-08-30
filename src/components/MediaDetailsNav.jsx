import { NavLink } from "react-router-dom";

export default function MediaDetailsNav({ className }) {
  return (
    <nav className={`${className} `}>
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
            Cast & Crew
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
            Watch at
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
