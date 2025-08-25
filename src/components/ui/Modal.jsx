import { useEffect } from "react";
import { createPortal } from "react-dom";
export default function Modal({ isOpen = false, close, children }) {
  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "escape") {
        close();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);
    }

    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      // Reset scroll when component unmounts
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(<div className="">{children}</div>, document.body);
}
