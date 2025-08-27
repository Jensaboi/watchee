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
        <h1 className="text-2xl text-yellow-300">Watchee</h1>
      </Link>
      <div className="hidden md:block w-full max-w-[600px] mx-10">
        <SearchAndResults />
      </div>
      <div className="md:hidden relative z-10 flex-center gap-xs">
        <Button variant="icon" onClick={search.toggle}>
          <Search color="white" />
        </Button>

        <MobileSearchModal isOpen={search.isOpen} close={search.close} />

        <Button variant="icon" onClick={nav.toggle}>
          <Hamburger isOpen={nav.isOpen} />
        </Button>
      </div>
      <PrimaryNav isOpen={nav.isOpen} />
    </header>
  );
}
