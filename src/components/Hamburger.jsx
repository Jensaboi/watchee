export default function Hamburger({ isOpen }) {
  return (
    <div className="relative h-4 w-6">
      <span
        data-open={isOpen}
        className="bg-text-100 transition-all delay-75 duration-300 ease-in-out  data-[open=true]:rotate-[-45deg] data-[open=true]:top-2 block rounded-xs absolute top-0 w-full h-[2px]"
      ></span>
      <span
        data-open={isOpen}
        className="bg-text-100 transition-all duration-200 ease-in-out block data-[open=true]:opacity-0 rounded-xs absolute top-2 w-full h-[2px]"
      ></span>
      <span
        data-open={isOpen}
        className="bg-text-100 transition-all delay-75 duration-300 ease-in-out data-[open=true]:rotate-45 data-[open=true]:top-2 block rounded-xs absolute top-4 w-full h-[2px]"
      ></span>
    </div>
  );
}
