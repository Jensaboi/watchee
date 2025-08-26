import { useState } from "react";
export default function useToggle(initialVal = false) {
  const [isOpen, setIsOpen] = useState(initialVal);

  function toggle() {
    setIsOpen(prev => !prev);
  }

  function close() {
    setIsOpen(false);
  }
  function open() {
    setIsOpen(true);
  }

  return { isOpen, toggle, close, open };
}
