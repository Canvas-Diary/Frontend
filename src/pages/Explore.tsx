import ThumbnailGrid from "../components/common/ThumbnailGrid";
import Appbar from "../components/common/Appbar";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../constants/routePath";
import { getExploreDiaries } from "../api/api";
import useInView from "../hooks/useInView";
import { useInfiniteQuery } from "@tanstack/react-query";

const buttonPositions = {
  LATEST: "left-0",
  POPULARITY: "left-1/2",
};

const Explore = () => {
  const [selected, setSelected] = useState<"LATEST" | "POPULARITY">("LATEST");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isInView, elementRef } = useInView<HTMLDivElement>(0.7);
  const navigate = useNavigate();

  const onClickThumbnail = (diaryId: string) => {
    navigate(`${RoutePaths.diary}/${diaryId}`);
  };

  const fetchDiaries = async ({ pageParam }: { pageParam: number }) => {
    const response = await getExploreDiaries({
      page: pageParam,
      size: 12,
      order: selected,
    });
    return response;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["exploreDiaries", selected],
    queryFn: fetchDiaries,

    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.number + 1 : undefined;
    },
    select: (data) => (data.pages ?? []).flatMap((page) => page.content),
    initialPageParam: 0,
  });

  useEffect(() => {
    console.log("isInView", isInView);
    if (isInView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [isInView]);

  const handleChangeSelected = (order: "LATEST" | "POPULARITY") => {
    setSelected(order);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="flex flex-grow flex-col overflow-scroll" ref={scrollContainerRef}>
      <Appbar text="일기 공유" />
      <div className="flex flex-col px-700">
        <div className="sticky top-0 z-10 flex w-full justify-around gap-500 bg-white font-BinggraeBold text-body-2">
          <button
            className="flex w-full items-center justify-center py-400"
            onClick={() => handleChangeSelected("LATEST")}
          >
            <div className={selected === "LATEST" ? "text-primary-normal" : "text-gray-400"}>
              최신순
            </div>
          </button>
          <button
            className="flex w-full items-center justify-center py-400"
            onClick={() => handleChangeSelected("POPULARITY")}
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
        {data && <ThumbnailGrid diaries={data} onClickThumbnail={onClickThumbnail} />}

        <div
          className="grid -translate-y-600 grid-cols-3 place-items-center gap-300 pb-800"
          ref={elementRef}
        >
          {hasNextPage && (
            <>
              <div className="h-[11.125rem] w-[6.375rem] rounded bg-gray-100"></div>
              <div className="h-[11.125rem] w-[6.375rem] rounded bg-gray-100"></div>
              <div className="h-[11.125rem] w-[6.375rem] rounded bg-gray-100"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
