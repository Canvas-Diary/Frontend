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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isInView, elementRef } = useInView<HTMLDivElement>(0.7);
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialSelected = (params.get("order") as "LATEST" | "POPULARITY") || "LATEST";
  const [selected, setSelected] = useState<"LATEST" | "POPULARITY">(initialSelected);

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

  const handleChangeSelected = (selected: "LATEST" | "POPULARITY") => {
    setSelected(selected);
    navigate(`?order=${selected}`);
  };

  useEffect(() => {
    const savedScrollTop = sessionStorage.getItem(`exploreScrollTop_${selected}`);
    if (savedScrollTop && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = parseInt(savedScrollTop);
    }
  }, [selected]);

  useEffect(() => {
    const param = params.get("order");
    if (param === "LATEST" || param === "POPULARITY") setSelected(param);
    else if (param === null) {
    } else throw Error;
  }, [window.location.search]);

  // 스크롤 위치 저장
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        const otherSelected = selected === "LATEST" ? "POPULARITY" : "LATEST";
        const otherScrollTop = sessionStorage.getItem(`exploreScrollTop_${otherSelected}`);
        sessionStorage.setItem(`exploreScrollTop_${selected}`, scrollTop.toString());

        //개선 필요
        if (scrollTop > 50) {
          if (otherScrollTop !== null && parseInt(otherScrollTop) < 50) {
            sessionStorage.setItem(`exploreScrollTop_${otherSelected}`, "50");
          }
        }
      }
    };
    const scrollContainer = scrollContainerRef.current;
    scrollContainer?.addEventListener("scroll", handleScroll);

    // cleanup listener
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [selected]);

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [isInView]);

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
