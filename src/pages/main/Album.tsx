import EmotionTag from "../../components/common/EmotionTag";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appbar from "../../components/common/Appbar";
import { getSearchedDiaries } from "../../api/api";
import ThumbnailGrid from "../../components/common/ThumbnailGrid";
import ROUTE_PATH from "../../constants/ROUTE_PATH";
import useInView from "../../hooks/useInView";
import useScrollPosition from "../../hooks/useScrollPosition";
import { createQueryParams } from "../../utils/util";
import { useInfiniteQuery } from "@tanstack/react-query";
import SearchBar from "@/components/pages/main/album/SearchBar";

const tags = ["기쁨", "슬픔", "분노", "공포", "혐오", "수치", "놀람", "궁금", "무난"];

const tagsMap: { [key: string]: string } = {
  기쁨: "JOY",
  슬픔: "SADNESS",
  분노: "ANGER",
  공포: "FEAR",
  혐오: "DISGUST",
  수치: "SHAME",
  놀람: "SURPRISE",
  궁금: "CURIOSITY",
  무난: "NONE",
};

/**
 * 앨범 화면
 * @returns
 */
const Album = () => {
  const navigate = useNavigate();
  const { currentY, lastY, scrollContainerRef } = useScrollPosition<HTMLDivElement>();
  const [isTagsVisible, setTagsVisible] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchContent, setSearchContent] = useState<string>("");
  const { isInView, elementRef } = useInView<HTMLDivElement>(0.7);

  /**
   * 일기 목록 가져오기
   * @param param0
   * @returns
   */
  const fetchDiaries = async ({ pageParam }: { pageParam: number }) => {
    const response = await getSearchedDiaries({
      page: pageParam,
      size: 12,
      tag: selectedTag ? tagsMap[selectedTag] : null,
      content: searchContent || "",
    });

    return response;
  };

  /**
   * useInfiniteQuery
   */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["albumDiaries", selectedTag, searchContent],
    queryFn: fetchDiaries,

    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.number + 1 : undefined;
    },
    select: (data) => (data.pages ?? []).flatMap((page) => page.content),
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });

  /**
   * 선택된 태그를 파라미터로 검색, 이미 선택된 태그이면 파라미터 삭제
   * @param tag 선택된 태그
   */
  const handleTagClick = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    setSelectedTag(newTag);

    const params = {
      tag: newTag,
      search: searchContent || undefined,
    };

    navigate(`?${createQueryParams(params)}`);
  };

  /**
   * 검색어에 따라 파라미터 설정
   * @param content 검색어
   */
  const handleSearch = (content: string) => {
    setSearchContent(content);

    const params = {
      search: content || undefined,
      tag: selectedTag || undefined,
    };

    navigate(`?${createQueryParams(params)}`);
  };

  /**
   * 스크롤 상태에 따라 태그 가시성 결정
   */
  useEffect(() => {
    if (currentY > lastY) {
      setTagsVisible(false);
    } else {
      setTagsVisible(true);
    }
  }, [currentY]);

  /**
   * url 변경 시 적용
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get("tag");
    const search = params.get("search");

    setSelectedTag(tag || null);
    setSearchContent(search || "");
  }, [window.location.search]);

  /**
   * 스크롤 위치 불러오기
   */
  useEffect(() => {
    const savedScrollTop = sessionStorage.getItem("scrollPosition");
    if (savedScrollTop && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = parseInt(savedScrollTop);
    }
  }, []);

  /**
   * 다음 페이지 로드
   */
  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView]);

  const onClickThumbnail = (diaryId: string) => {
    navigate(`${ROUTE_PATH.DIARY}/${diaryId}`);
  };

  return (
    <div className="flex flex-grow flex-col overflow-scroll" ref={scrollContainerRef}>
      <Appbar text="앨범"></Appbar>
      <div className="flex flex-col px-700">
        <div className="sticky top-0 z-10 flex flex-col gap-500 bg-background py-400">
          <SearchBar onEnter={handleSearch} content={searchContent} />
          <div
            className={`absolute flex w-full gap-400 overflow-scroll bg-background py-500 transition-all duration-300 ${isTagsVisible ? "top-[3.3rem] opacity-100" : "pointer-events-none top-10 opacity-0"}`}
          >
            {tags.map((tag, index) => (
              <EmotionTag
                key={index}
                text={tag}
                selected={selectedTag === tag}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </div>
        </div>
        <div className="h-4"></div>
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

export default Album;
