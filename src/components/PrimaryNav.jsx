import { NavLink } from "react-router-dom";
export default function PrimaryNav() {
  return (
    <nav>
      <ul className="">
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
