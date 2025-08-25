import { NavLink } from "react-router-dom";
export default function PrimaryNav() {
  return (
    <nav>
      <ul className="flex gap-3">
        <li>
          <NavLink>Movies</NavLink>
        </li>
        <li>
          <NavLink>Shows</NavLink>
        </li>
        <li>
          <NavLink>Discover</NavLink>
        </li>
      </ul>
    </nav>
  );
}
