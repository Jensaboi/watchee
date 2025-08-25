import PrimaryNav from "./PrimaryNav";
export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center p-5">
      <h1 className="text-2xl text-indigo-800">Watchee</h1>
      <PrimaryNav />
    </header>
  );
}
