import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import MediaCard from "../MediaCard";
import PersonCard from "../PersonCard";
import placeHolderImg from "../../assets/placeholder.png";
import Button from "./Button";
import { useRouteLoaderData } from "react-router";

export default function Carosuel({ mediaType = null, data = [] }) {
  const { config, movieGenres, tvGenres } = useRouteLoaderData("root");
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

  function handleLeftClick() {
    setIndex(prev => Math.max(prev - 1, 0));
  }

  function handleRightClick() {
    setIndex(prev => Math.min(prev + 1, maxIndex - 1));
  }

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
        <Button onClick={handleLeftClick} className="left-0" variant="carosuel">
          <ChevronLeft />
        </Button>
      )}
      <div
        style={{ transform: `translateX(-${index * 100}%)` }}
        className="flex w-full sm:w-[96%] transistion-transform duration-400 ease-in-out"
      >
        {data.map(item => (
          <Link
            key={item.id}
            style={{ flexBasis: `${(100 / colNum).toFixed(2)}%` }}
            className="flex-shrink-0 rounded-lg px-xs sm:px-sm"
            to={`/${mediaType}/${item.id}`}
          >
            {mediaType === "person" ? (
              <PersonCard
                imgUrl={
                  item.profile_path
                    ? config.profileBaseUrl[2] + item.profile_path
                    : placeHolderImg
                }
                name={item.name}
                character={item.character}
              />
            ) : (
              <MediaCard
                imgUrl={
                  item.poster_path
                    ? config.posterBaseUrl[5] + item.poster_path
                    : placeHolderImg
                }
                title={item?.name || item.title}
              />
            )}
          </Link>
        ))}
      </div>
      {index < maxIndex - 1 && (
        <Button
          onClick={handleRightClick}
          className="right-0"
          variant="carosuel"
        >
          <ChevronRight />
        </Button>
      )}
    </div>
  );
}
