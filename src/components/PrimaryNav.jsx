import { NavLink } from "react-router-dom";
import useToggle from "../hooks/useToggle";
import Hamburger from "./Hamburger";
import Button from "./ui/Button";

export default function PrimaryNav() {
  const { isOpen, toggle } = useToggle();
  console.log(isOpen);
  return (
    <>
      <Button className="relative z-10" onClick={toggle}>
        <Hamburger isOpen={isOpen} />
      </Button>
      <nav
        data-open={isOpen}
        className="bg-bg-200 transition-transform duration-300 ease-in-out px-5 pt-20 fixed top-0 right-0 h-full w-full data-[open=true]:translate-x-[30%] data-[open=false]:translate-x-[100%]"
      >
        <ul className="flex flex-col gap-lg">
          <li>
            <NavLink
              to="/movie"
              className={({ isActive }) => {
                isActive ? "text-text-100" : "text-text-200";
              }}
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tv"
              className={({ isActive }) => {
                isActive ? "text-text-100" : "text-text-200";
              }}
            >
              Tvshows
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/discover"
              className={({ isActive }) => {
                isActive ? "text-text-100" : "text-text-200";
              }}
            >
              Discover
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
