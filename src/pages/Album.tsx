import Tag from "../components/common/Tag";
import SearchBar from "../components/pages/album/SearchBar";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appbar from "../components/common/Appbar";
import { getSearchedDiaries } from "../api/api";
import ThumbnailGrid from "../components/common/ThumbnailGrid";
import { SearchedDiary } from "../types/types";
import RoutePaths from "../constants/routePath";
import useInView from "../hooks/useInView";

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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const [isTagsVisible, setTagsVisible] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchContent, setSearchContent] = useState<string>("");
  const [page, setPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [albumData, setAlbumData] = useState<SearchedDiary[]>([]);
  const { isInView, elementRef } = useInView<HTMLDivElement>(0.9);

  /**
   * 선택된 태그를 파라미터로 검색, 이미 선택된 태그이면 파라미터 삭제
   * @param tag 선택된 태그
   */
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      if (!searchContent) {
        navigate("");
      } else {
        navigate(`?search=${searchContent}`);
      }
    } else {
      setSelectedTag(tag);
      if (searchContent) {
        navigate(`?tag=${tag}&search=${searchContent}`);
      } else {
        navigate(`?tag=${tag}`);
      }
    }
  };

  /**
   * 검색어에 따라 파라미터 설정
   * @param content 검색어
   */
  const handleSearch = (content: string) => {
    setSearchContent(content);
    if (content && selectedTag) {
      navigate(`?search=${content}&tag=${selectedTag}`);
    } else if (content) {
      navigate(`?search=${content}`);
    } else if (selectedTag) {
      navigate(`?tag=${selectedTag}`);
    } else {
      navigate("");
    }
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            const currentScrollY = scrollContainerRef.current.scrollTop;

            // 태그 가시성 제어
            if (currentScrollY > lastScrollY.current) {
              setTagsVisible(false);
            } else {
              setTagsVisible(true);
            }

            sessionStorage.setItem("scrollPosition", currentScrollY.toString());
            sessionStorage.setItem("currentPage", (page + 1).toString());

            lastScrollY.current = currentScrollY;

            ticking = false;
          }
        });
        ticking = true;
      }
    };

    scrollContainerRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * 페이지 진입 시 스크롤 위치 가져오는 함수 + 페이지도 가져와야 할듯
   */
  const getScrollPosition = () => {
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");

    if (savedScrollPosition && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = parseInt(savedScrollPosition, 10);
      lastScrollY.current = parseInt(savedScrollPosition, 10);
    }
  };

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get("tag");
    const search = params.get("search");

    if (tag) {
      setSelectedTag(tag);
    } else {
      setSelectedTag(null);
    }

    if (search) {
      setSearchContent(search);
    } else {
      setSearchContent("");
    }

    const searchDiaries = async () => {
      setIsSearching(true);
      const response = await getSearchedDiaries({
        page: 0,
        size: 6,
        tag: tag ? tagsMap[tag] : null,
        content: search,
      });
      setAlbumData(response.content);
      setIsSearching(false);
    };

    searchDiaries();
    getScrollPosition();
  }, [searchContent, selectedTag]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get("tag");
    const search = params.get("search");

    const loadPageData = async (newPage: number) => {
      const response = await getSearchedDiaries({
        page: newPage,
        size: 6,
        tag: tag ? tagsMap[tag] : null,
        content: search,
      });

      const newPageData = response.content;
      setAlbumData((prev) => [...prev, ...newPageData]);

      if (!response.hasNext) {
        setIsEnd(true);
        return;
      }
    };

    // 검색이 완료된 후에만 무한 스크롤 실행
    if (isInView && !isSearching) {
      const newPage = page + 1;
      setPage(newPage);
      loadPageData(newPage);
    }
  }, [isInView, isSearching]);

  const onClickThumbnail = (diaryId: string) => {
    navigate(`${RoutePaths.diary}/${diaryId}?type=my`);
  };

  return (
    <div className="flex flex-grow flex-col overflow-scroll" ref={scrollContainerRef}>
      <Appbar text="앨범"></Appbar>
      <div className="flex flex-col px-700">
        <div className="sticky top-0 z-10 flex flex-col gap-500 bg-white py-400">
          <SearchBar onEnter={handleSearch} content={searchContent} />
          <div
            className={`absolute flex w-full gap-400 overflow-scroll bg-white py-500 transition-all duration-300 ${isTagsVisible ? "top-[3.3rem] opacity-100" : "top-10 opacity-0"}`}
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
          <div className="grid grid-cols-3 place-items-center gap-300" ref={elementRef}>
            <div className="h-[11.125rem] w-[6.375rem] bg-gray-100"></div>
            <div className="h-[11.125rem] w-[6.375rem] bg-gray-100"></div>
            <div className="h-[11.125rem] w-[6.375rem] bg-gray-100"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Album;
