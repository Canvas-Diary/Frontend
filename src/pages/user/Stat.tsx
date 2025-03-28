import Appbar from "@/components/common/Appbar/Appbar";
import EmotionStatsLayout from "@/components/pages/user/stat/Layout/EmotionStatsLayout";
import KeywordStatsLayout from "@/components/pages/user/stat/Layout/KeywordStatsLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const buttonPositions = {
  emotion: "left-0",
  keyword: "left-1/2",
};

const Stat = () => {
  const [selected, setSelected] = useState("emotion");
  const naviagte = useNavigate();
  const handleChangeSelected = (selected: string) => {
    setSelected(selected);
  };

  return (
    <div className="flex-grow overflow-scroll">
      <Appbar backHandler={() => naviagte(-1)} text="통계"></Appbar>
      <div className="sticky top-0 z-10 flex w-full justify-around gap-500 bg-background font-BinggraeBold text-body-2">
        <button
          className="flex w-full items-center justify-center py-400"
          onClick={() => handleChangeSelected("emotion")}
        >
          <div
            className={
              selected === "emotion" ? "text-primary-normal" : "text-gray-400 dark:text-gray-500"
            }
          >
            감정
          </div>
        </button>
        <button
          className="flex w-full items-center justify-center py-400"
          onClick={() => handleChangeSelected("keyword")}
        >
          <div
            className={
              selected === "keyword" ? "text-primary-normal" : "text-gray-400 dark:text-gray-500"
            }
          >
            키워드
          </div>
        </button>
        <div
          className={`absolute bottom-0 flex w-1/2 justify-center transition-all duration-300 ${buttonPositions[selected as "emotion" | "keyword"]}`}
        >
          <div className="h-[2px] w-[7.5rem] bg-primary-normal" />
        </div>
        <div className="absolute bottom-0 -z-10 h-[1px] w-full bg-gray-100 dark:bg-gray-500" />
      </div>

      {selected === "emotion" ? <EmotionStatsLayout /> : <KeywordStatsLayout />}
    </div>
  );
};

export default Stat;
