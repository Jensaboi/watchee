import useToggle from "../hooks/useToggle";
import { ChevronDown, ChevronUp } from "lucide-react";
export default function Overview({ overview }) {
  const { isOpen, toggle } = useToggle();
  return (
    <div>
      <p
        className={`${isOpen ? "" : "line-clamp-3"} tracking-wide leading-relaxed font-normal text-sm`}
      >
        {overview}
      </p>
      <button
        className="text-text-400 text-sm font-normal inline-flex items-center justify-center"
        onClick={toggle}
      >
        {isOpen ? "View less" : "View more"}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
    </div>
  );
}
