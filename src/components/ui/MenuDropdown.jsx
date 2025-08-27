import useToggle from "../../hooks/useToggle";
import { useRef, useEffect } from "react";

export default function MenuDropdown({ children, ...rest }) {
  const ref = useRef(null);

  const { isOpen, toggle, close, open } = useToggle();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={ref} className="relative" {...rest}>
      {children(open, close, toggle, isOpen)}
    </div>
  );
}
