import ThumbnailGrid from "../components/common/ThumbnailGrid";
import Appbar from "../components/common/Appbar";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "../constants/ROUTE_PATH";
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
  const initialSelected =
    (sessionStorage.getItem("exploreSelected") as "LATEST" | "POPULARITY") || "LATEST";
  const [selected, setSelected] = useState<"LATEST" | "POPULARITY">(initialSelected);

  /**
   * 일기 조회 화면으로 이동
   * @param diaryId
   */
  const onClickThumbnail = (diaryId: string) => {
    navigate(`${ROUTE_PATH.DIARY}/${diaryId}`);
  };

  /**
   * 로딩할 페이지 일기 목록 가져오기
   * @param param0
   * @returns
   */
  const fetchDiaries = async ({ pageParam }: { pageParam: number }) => {
    const response = await getExploreDiaries({
      page: pageParam,
      size: 12,
      order: selected,
    });
    return response;
  };

  /**
   * useInfiniteQuery
   */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["exploreDiaries", selected],
    queryFn: fetchDiaries,

    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.number + 1 : undefined;
    },
    select: (data) => (data.pages ?? []).flatMap((page) => page.content),
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5, // 데이터가 5분 동안은 최신 상태로 간주하여 캐시된 데이터를 재사용
  });

  /**
   * selected 변경
   * @param selected
   */
  const handleChangeSelected = (selected: "LATEST" | "POPULARITY") => {
    sessionStorage.setItem("exploreSelected", selected);
    setSelected(selected);
    navigate(`?order=${selected}`);
  };

  /**
   * selected 변경 시 적용
   */
  useEffect(() => {
    const savedScrollTop = sessionStorage.getItem(`exploreScrollTop_${selected}`);
    if (savedScrollTop && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = parseInt(savedScrollTop);
    }
  }, [selected]);

  /**
   * url 변경 시 selected 적용
   */
  useEffect(() => {
    const param = params.get("order");
    if (param === "LATEST" || param === "POPULARITY") setSelected(param);
    else if (param === null) {
    } else throw Error;
  }, [window.location.search]);

  /**
   * 스크롤 위치 추적, 저장
   */
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        const otherSelected = selected === "LATEST" ? "POPULARITY" : "LATEST";
        const otherScrollTop = sessionStorage.getItem(`exploreScrollTop_${otherSelected}`);
        sessionStorage.setItem(`exploreScrollTop_${selected}`, scrollTop.toString());

        //개선 필요
        if (scrollTop > 50) {
          if (otherScrollTop === null || parseInt(otherScrollTop) < 50) {
            sessionStorage.setItem(`exploreScrollTop_${otherSelected}`, "50");
          }
        }
      }
    };
    const scrollContainer = scrollContainerRef.current;
    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [selected]);

  /**
   * 다음 페이지 로드
   */
  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [isInView]);

  return (
    <div className="flex flex-grow flex-col overflow-scroll" ref={scrollContainerRef}>
      <Appbar text="일기 공유" />
      <div className="flex flex-col px-700">
        <div className="sticky -top-[1px] z-10 flex w-full justify-around gap-500 bg-background font-BinggraeBold text-body-2">
          <button
            className="flex w-full items-center justify-center py-400"
            onClick={() => handleChangeSelected("LATEST")}
          >
            <div
              className={
                selected === "LATEST" ? "text-primary-normal" : "text-gray-400 dark:text-gray-500"
              }
            >
              최신순
            </div>
          </button>
          <button
            className="flex w-full items-center justify-center py-400"
            onClick={() => handleChangeSelected("POPULARITY")}
          >
            <div
              className={
                selected === "POPULARITY"
                  ? "text-primary-normal"
                  : "text-gray-400 dark:text-gray-500"
              }
            >
              인기순
            </div>
          </button>
          <div
            className={`absolute bottom-0 flex w-1/2 justify-center transition-all duration-300 ${buttonPositions[selected]}`}
          >
            <div className="h-[2px] w-[7.5rem] bg-primary-normal" />
          </div>
          <div className="absolute bottom-0 -z-10 h-[1px] w-full bg-gray-100 dark:bg-gray-500" />
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
