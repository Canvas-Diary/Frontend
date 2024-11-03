import ThumbnailGrid from "../components/pages/album/ThumbnailGrid";
import Dummy from "../assets/dummy/_Image.png";
import Appbar from "../components/common/Appbar";
import { useState } from "react";

const LatestData = {
  diaries: [
    {
      diaryId: "1",
      mainImageUrl: Dummy,
    },
    {
      diaryId: "2",
      mainImageUrl: Dummy,
    },
    {
      diaryId: "3",
      mainImageUrl: Dummy,
    },
    {
      diaryId: "4",
      mainImageUrl: Dummy,
    },
    {
      diaryId: "5",
      mainImageUrl: Dummy,
    },
    {
      diaryId: "6",
      mainImageUrl: Dummy,
    },
    {
      diaryId: "7",
      mainImageUrl: Dummy,
    },
    {
      diaryId: "8",
      mainImageUrl: Dummy,
    },
    {
      diaryId: "9",
      mainImageUrl: Dummy,
    },
    {
      diaryId: "10",
      mainImageUrl: Dummy,
    },
  ],
};

const PopularData = {
  diaries: [
    {
      diaryId: "11",
      mainImageUrl: Dummy,
    },
    {
      diaryId: "21",
      mainImageUrl: Dummy,
    },
    {
      diaryId: "12",
      mainImageUrl: Dummy,
    },
    {
      diaryId: "23",
      mainImageUrl: Dummy,
    },
    {
      diaryId: "14",
      mainImageUrl: Dummy,
    },
    {
      diaryId: "25",
      mainImageUrl: Dummy,
    },
  ],
};

const buttonPositions = {
  latest: "left-0",
  popular: "left-1/2",
};

/**
 * 탐색 화면
 * @returns
 */
const Explore = () => {
  const [selected, setSelected] = useState<"latest" | "popular">("latest");

  return (
    <div className="flex flex-grow flex-col overflow-scroll">
      <Appbar text="일기 공유"></Appbar>
      <div className="flex flex-col px-700">
        <div className="sticky top-0 flex w-full justify-around gap-500 bg-white font-BinggraeBold text-body-2">
          <button
            className="flex w-full items-center justify-center py-400"
            onClick={() => setSelected("latest")}
          >
            <div className={selected === "latest" ? "text-primary-normal" : "text-gray-400"}>
              최신순
            </div>
          </button>
          <button
            className="flex w-full items-center justify-center py-400"
            onClick={() => setSelected("popular")}
          >
            <div className={selected === "popular" ? "text-primary-normal" : "text-gray-400"}>
              인기순
            </div>
          </button>
          <div
            className={`absolute bottom-0 flex w-1/2 justify-center transition-all duration-300 ${buttonPositions[selected]}`}
          >
            <div className="h-[2px] w-[7.5rem] bg-primary-normal" />
          </div>
          <div className="absolute bottom-0 -z-10 h-[1px] w-full bg-gray-100" />
        </div>
        <ThumbnailGrid diaries={selected === "latest" ? LatestData.diaries : PopularData.diaries} />
      </div>
    </div>
  );
};

export default Explore;
