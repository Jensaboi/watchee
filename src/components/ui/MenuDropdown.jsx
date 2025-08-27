import useToggle from "../../hooks/useToggle";
import { useRef, useEffect } from "react";

export default function MenuDropdown({ children, ...rest }) {
  const ref = useRef(null);

  const { isOpen, toggle, close, open } = useToggle();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={ref} className="relative" {...rest}>
      {children({ isOpen, toggle, open, close })}
    </div>
  );
}
