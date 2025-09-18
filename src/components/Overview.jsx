import useToggle from "../hooks/useToggle";
import { ChevronDown, ChevronUp } from "lucide-react";
export default function Overview({ overview }) {
  const { isOpen, toggle } = useToggle();
  return (
    <div>
      <p
        className={`${isOpen ? "" : "line-clamp-3"} tracking-wide leading-relaxed`}
      >
        {overview}
      </p>
      <button
        className="text-text-400 inline-flex items-center justify-center"
        onClick={toggle}
      >
        {isOpen ? "View less" : "View more"}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
    </div>
  );
}
