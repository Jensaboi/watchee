import { Link } from "react-router-dom";
import PrimaryNav from "./PrimaryNav";
export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center p-lg">
      <Link>
        <h1 className="text-2xl text-yellow-300">Watchee</h1>
      </Link>
      <PrimaryNav />
    </header>
  );
}
