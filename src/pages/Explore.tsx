import ThumbnailGrid from "../components/pages/album/ThumbnailGrid";
import Dummy from "../assets/dummy/_Image.png";
import Appbar from "../components/common/Appbar";
import { useState } from "react";

const AlbumData = {
  diaries: [
    {
      diaryId: 1,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 2,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 3,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 4,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 5,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 6,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 7,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 8,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 9,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 10,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 11,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 21,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 12,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 23,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 14,
      mainImgUrl: Dummy,
    },
    {
      diaryId: 25,
      mainImgUrl: Dummy,
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
        <ThumbnailGrid diaries={AlbumData.diaries} />
      </div>
    </div>
  );
};

export default Explore;
