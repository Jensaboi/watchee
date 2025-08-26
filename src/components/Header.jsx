import { Link } from "react-router-dom";
import useToggle from "../hooks/useToggle";

import PrimaryNav from "./PrimaryNav";
import Hamburger from "./Hamburger";
import Button from "./ui/Button";

import { Search } from "lucide-react";

export default function Header() {
  const nav = useToggle();
  const search = useToggle();

  return (
    <header className="flex flex-row justify-between items-center p-xl">
      <Link>
        <h1 className="text-2xl text-yellow-300">Watchee</h1>
      </Link>

      <div className="md:hidden relative z-10 flex-center gap-xs">
        <Button variant="icon" onClick={search.toggle}>
          <Search style={{ color: "#ffffff" }} />
        </Button>
        <Button variant="icon" onClick={nav.toggle}>
          <Hamburger isOpen={nav.isOpen} />
        </Button>
      </div>
      <PrimaryNav isOpen={nav.isOpen} />
    </header>
  );
}
