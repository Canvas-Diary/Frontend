import Appbar from "@/components/common/Appbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmotionStats from "../EmotionStats";
import KeywordStats from "../KeywordStats";

const buttonPositions = {
  Emotion: "left-0",
  Keyword: "left-1/2",
};

const StatsLayout = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Emotion");
  const handleChangeSelected = (selected: string) => {
    setSelected(selected);
    navigate(`?order=${selected}`);
  };

  return (
    <div className="flex-grow overflow-scroll">
      <Appbar text="통계"></Appbar>
      <div className="sticky top-0 z-10 flex w-full justify-around gap-500 bg-white font-BinggraeBold text-body-2">
        <button
          className="flex w-full items-center justify-center py-400"
          onClick={() => handleChangeSelected("Emotion")}
        >
          <div className={selected === "Emotion" ? "text-primary-normal" : "text-gray-400"}>
            감정
          </div>
        </button>
        <button
          className="flex w-full items-center justify-center py-400"
          onClick={() => handleChangeSelected("Keyword")}
        >
          <div className={selected === "Keyword" ? "text-primary-normal" : "text-gray-400"}>
            키워드
          </div>
        </button>
        <div
          className={`absolute bottom-0 flex w-1/2 justify-center transition-all duration-300 ${buttonPositions[selected as "Emotion" | "Keyword"]}`}
        >
          <div className="h-[2px] w-[7.5rem] bg-primary-normal" />
        </div>
        <div className="absolute bottom-0 -z-10 h-[1px] w-full bg-gray-100" />
      </div>

      {selected === "Emotion" ? <EmotionStats></EmotionStats> : <KeywordStats></KeywordStats>}
    </div>
  );
};

export default StatsLayout;
