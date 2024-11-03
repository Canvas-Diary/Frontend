import ThumbnailGrid from "../components/pages/album/ThumbnailGrid";
import Appbar from "../components/common/Appbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../constants/routePath";
import { getExploreDiaries } from "../api/api";
import { SearchedDiaries } from "../types/types";

const buttonPositions = {
  LATEST: "left-0",
  POPULARITY: "left-1/2",
};

/**
 * 탐색 화면
 * @returns
 */
const Explore = () => {
  const [selected, setSelected] = useState<"LATEST" | "POPULARITY">("LATEST");
  const [diaries, setDiaries] = useState<SearchedDiaries | null>(null);
  const navigate = useNavigate();

  const onClickThumbnail = (diaryId: string) => {
    navigate(`${RoutePaths.diary}/${diaryId}`);
  };

  const fetchDiaries = async () => {
    try {
      const data = await getExploreDiaries({ page: 0, size: 18, order: selected });
      setDiaries(data);
    } catch (error) {
      console.error("Failed to fetch diaries:", error);
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, [selected]); // selected 값이 변경될 때마다 데이터 재요청

  return (
    <div className="flex flex-grow flex-col overflow-scroll">
      <Appbar text="일기 공유"></Appbar>
      <div className="flex flex-col px-700">
        <div className="sticky top-0 z-10 flex w-full justify-around gap-500 bg-white font-BinggraeBold text-body-2">
          <button
            className="flex w-full items-center justify-center py-400"
            onClick={() => setSelected("LATEST")}
          >
            <div className={selected === "LATEST" ? "text-primary-normal" : "text-gray-400"}>
              최신순
            </div>
          </button>
          <button
            className="flex w-full items-center justify-center py-400"
            onClick={() => setSelected("POPULARITY")}
          >
            <div className={selected === "POPULARITY" ? "text-primary-normal" : "text-gray-400"}>
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
        {diaries && <ThumbnailGrid diaries={diaries.content} onClickThumbnail={onClickThumbnail} />}
      </div>
    </div>
  );
};

export default Explore;
