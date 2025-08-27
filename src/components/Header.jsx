import { Link } from "react-router-dom";
import useToggle from "../hooks/useToggle";

import PrimaryNav from "./PrimaryNav";
import MobileSearchModal from "./MobileSearchModal";
import Hamburger from "./Hamburger";
import Button from "./ui/Button";

import { Search } from "lucide-react";
import SearchAndResults from "./SearchAndResults";

export default function Header() {
  const nav = useToggle();
  const search = useToggle();

  return (
    <header className="flex flex-row justify-between items-center p-xl h-[80px]">
      <Link>
        <h1 className="text-2xl text-accent">Watchee</h1>
      </Link>
      <div className="hidden md:block mx-3xl w-full max-w-[600px]">
        <SearchAndResults />
      </div>
      <div className="md:hidden relative flex-center gap-xs">
        <Button variant="icon" onClick={search.toggle}>
          <Search color="white" />
        </Button>

        <MobileSearchModal isOpen={search.isOpen} close={search.close} />

        <Button className="z-30" variant="icon" onClick={nav.toggle}>
          <Hamburger isOpen={nav.isOpen} />
        </Button>
      </div>
      <PrimaryNav isOpen={nav.isOpen} />
    </header>
  );
}
