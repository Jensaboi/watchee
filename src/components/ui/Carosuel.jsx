import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
export default function Carosuel({ children, initialColNum = 3, data }) {
  const [index, setIndex] = useState(0);
  const [colNum, setColNum] = useState(initialColNum);

  function handleLeftClick() {
    setIndex(prev => prev - 1);
  }
  function handleRightCLick() {
    setIndex(prev => prev + 1);
  }
  return (
    <div className="relative w-full overflow-hidden flex-center">
      <button
        onClick={handleLeftClick}
        className="absolute top-0 left-0 z-2 p-xs bg-bg-300/80 hover:bg-bg-400/80 rounded-full h-full "
      >
        <ChevronLeft />
      </button>
      <div className={`flex w-[90%] gap-xl -translate-x-[${index}00%]`}>
        {children}
      </div>
      <button
        onClick={handleRightCLick}
        className="absolute top-0 z-2 right-0 p-xs bg-bg-300/80 hover:bg-bg-400/80 rounded-full h-full"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
