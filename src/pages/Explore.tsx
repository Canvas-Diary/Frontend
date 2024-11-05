import ThumbnailGrid from "../components/common/ThumbnailGrid";
import Appbar from "../components/common/Appbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../constants/routePath";
import { getExploreDiaries } from "../api/api";
import { SearchedDiaries, SearchedDiary } from "../types/types";
import useInView from "../hooks/useInView";
import useScrollPosition from "../hooks/useScrollPosition";

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
  const { currentY, scrollContainerRef } = useScrollPosition<HTMLDivElement>();
  const { isInView, elementRef } = useInView<HTMLDivElement>(0.7);
  const [page, setPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [diaries, setDiaries] = useState<SearchedDiary[]>([]);
  const navigate = useNavigate();

  const onClickThumbnail = (diaryId: string) => {
    navigate(`${RoutePaths.diary}/${diaryId}`);
  };

  useEffect(() => {
    /**
     * 검색 조건에 맞는 초기 AlbumData 설정
     */
    const fetchInitDiaries = async () => {
      //selected 변경 시 젤 위로 스크롤
      if (scrollContainerRef.current)
        scrollContainerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      setIsSearching(true);
      setPage(0);

      const response = await getExploreDiaries({
        page: 0,
        size: 12,
        order: selected,
      });

      setDiaries(response.content);
      setIsSearching(false);
      setIsEnd(!response.hasNext);
    };

    fetchInitDiaries();
  }, [selected]);

  useEffect(() => {
    /**
     * 검색 조건에 맞는 newPage AlbumData 추가
     * @param newPage 새로 추가할 AlbumData Page
     */
    const loadPageData = async (newPage: number) => {
      const response = await getExploreDiaries({
        page: newPage,
        size: 12,
        order: selected,
      });

      const newPageData = response.content;
      setDiaries((prev) => [...prev, ...newPageData]);

      if (!response.hasNext) {
        setIsEnd(true);
      }
    };

    //사용자가 끝까지 스크롤 한 경우 && 초기 페이지 로딩이 완료된 경우
    if (isInView && !isSearching) {
      const newPage = page + 1;
      setPage(newPage);
      loadPageData(newPage);
    }
  }, [isInView, isSearching]);

  return (
    <div className="flex flex-grow flex-col overflow-scroll" ref={scrollContainerRef}>
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
        {diaries && <ThumbnailGrid diaries={diaries} onClickThumbnail={onClickThumbnail} />}
        {!isEnd && diaries && (
          <div
            className="grid -translate-y-600 grid-cols-3 place-items-center gap-300 pb-800"
            ref={elementRef}
          >
            <div className="h-[11.125rem] w-[6.375rem] rounded bg-gray-100"></div>
            <div className="h-[11.125rem] w-[6.375rem] rounded bg-gray-100"></div>
            <div className="h-[11.125rem] w-[6.375rem] rounded bg-gray-100"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
