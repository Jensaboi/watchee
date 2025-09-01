import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useTMDBConfig } from "../../context/ConfigContext";

export default function Carosuel({ mediaType, initialColNum = 3, data = [] }) {
  const [index, setIndex] = useState(0);
  const [colNum, setColNum] = useState(
    window.innerWidth < 420
      ? 2
      : window.innerWidth >= 420 && window.innerWidth < 768
        ? 3
        : window.innerWidth >= 768 && window.innerWidth < 1024
          ? 4
          : window.innerWidth >= 1024 && window.innerWidth < 1250
            ? 5
            : 6
  );

  const maxIndex = data.length / colNum;
  const { config } = useTMDBConfig();

  function handleLeftClick() {
    setIndex(prev => Math.max(prev - 1, 0));
  }

  function handleRightClick() {
    setIndex(prev => Math.min(prev + 1, maxIndex - 1));
  }
  /*  console.log("colNum", colNum);
  console.log("index", index);
  console.log("maxIndex", maxIndex - 1);
 */
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 420) {
        setColNum(2);
      } else if (window.innerWidth >= 420 && window.innerWidth < 768) {
        setColNum(3);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setColNum(4);
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1250) {
        setColNum(5);
      } else {
        setColNum(6);
      }
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (index > maxIndex - 1) {
      setIndex(maxIndex - 1);
    }
  }, [colNum]);

  return (
    <div className="relative w-full flex-center overflow-hidden">
      {index > 0 && (
        <button
          onClick={handleLeftClick}
          className="inline-flex items-center justify-center text-lg absolute top-0 left-0 z-2 p-xs bg-bg-300/80 hover:bg-bg-400/80 rounded-full w-[5%] h-full"
        >
          <ChevronLeft />
        </button>
      )}
      <div
        style={{ transform: `translateX(-${index * 100}%)` }}
        className="flex w-[90%] transistion-transform duration-400 ease-in-out"
      >
        {data.map(item => (
          <Link
            key={item.id}
            style={{ flexBasis: `${(100 / colNum).toFixed(2)}%` }}
            className="flex-shrink-0 rounded-lg px-xs sm:px-sm"
            to={`/${item?.media_type ? item.media_type : mediaType}/${item.id}`}
          >
            <img
              className="w-full h-full object-center rounded-md object-cover"
              src={config?.posterBaseUrl?.[5] + item?.poster_path}
            />
          </Link>
        ))}
      </div>
      {index < maxIndex - 1 && (
        <button
          onClick={handleRightClick}
          className="inline-flex items-center justify-center text-lg absolute top-0 z-2 right-0 p-xs bg-bg-300/80 hover:bg-bg-400/80 w-[5%] rounded-full h-full"
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
