import Tag from "../components/common/Tag";
import SearchBar from "../components/pages/album/SearchBar";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appbar from "../components/common/Appbar";
import { getSearchedDiaries } from "../api/api";
import ThumbnailGrid from "../components/common/ThumbnailGrid";
import { SearchedDiary } from "../types/types";
import RoutePaths from "../constants/routePath";
import useInView from "../hooks/useInView";
import useScrollPosition from "../hooks/useScrollPosition";
import { createQueryParams } from "../utils/util";

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
  const [page, setPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [albumData, setAlbumData] = useState<SearchedDiary[]>([]);
  const { isInView, elementRef } = useInView<HTMLDivElement>(0.7);

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

  // /**
  //  * 페이지 진입 시 스크롤 위치 가져오는 함수
  //  */
  // const getScrollPosition = () => {
  //   const savedScrollPosition = sessionStorage.getItem("scrollPosition");

  //   if (savedScrollPosition && scrollContainerRef.current) {
  //     const parsedPosition = parseInt(savedScrollPosition, 10);

  //     scrollContainerRef.current.scrollTo({
  //       top: parsedPosition,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get("tag");
    const search = params.get("search");

    setSelectedTag(tag || null);
    setSearchContent(search || "");

    /**
     * 검색 조건에 맞는 초기 AlbumData 설정
     */
    const fetchInitDiaries = async () => {
      setIsSearching(true);
      setPage(0);

      const response = await getSearchedDiaries({
        page: 0,
        size: 12,
        tag: tag ? tagsMap[tag] : null,
        content: search || "",
      });

      setAlbumData(response.content);
      setIsSearching(false);
      setIsEnd(!response.hasNext);
    };

    fetchInitDiaries();
  }, [window.location.search]);

  useEffect(() => {
    /**
     * 검색 조건에 맞는 newPage AlbumData 추가
     * @param newPage 새로 추가할 AlbumData Page
     */
    const loadPageData = async (newPage: number) => {
      const response = await getSearchedDiaries({
        page: newPage,
        size: 12,
        tag: selectedTag ? tagsMap[selectedTag] : null,
        content: searchContent,
      });

      const newPageData = response.content;
      setAlbumData((prev) => [...prev, ...newPageData]);

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

  const onClickThumbnail = (diaryId: string) => {
    navigate(`${RoutePaths.diary}/${diaryId}`);
  };

  return (
    <div className="flex flex-grow flex-col overflow-scroll" ref={scrollContainerRef}>
      <Appbar text="앨범"></Appbar>
      <div className="flex flex-col px-700">
        <div className="sticky top-0 z-10 flex flex-col gap-500 bg-white py-400">
          <SearchBar onEnter={handleSearch} content={searchContent} />
          <div
            className={`absolute flex w-full gap-400 overflow-scroll bg-white py-500 transition-all duration-300 ${isTagsVisible ? "top-[3.3rem] opacity-100" : "pointer-events-none top-10 opacity-0"}`}
          >
            {tags.map((tag, index) => (
              <Tag
                key={index}
                text={tag}
                selected={selectedTag === tag}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </div>
        </div>
        <div className="h-4"></div>
        {albumData && <ThumbnailGrid diaries={albumData} onClickThumbnail={onClickThumbnail} />}
        {!isEnd && albumData && (
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

export default Album;
