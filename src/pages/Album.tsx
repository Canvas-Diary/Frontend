import Tag from "../components/common/Tag";
import SearchBar from "../components/pages/album/SearchBar";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appbar from "../components/common/Appbar";
import { getSearchedDiaries } from "../api/api";
import ThumbnailGrid from "../components/pages/album/ThumbnailGrid";
import { SearchedDiaries } from "../types/types";

const tags = ["기쁨", "슬픔", "분노", "공포", "혐오", "수치", "놀람", "궁금", "무난"];

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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState<SearchedDiaries | null>();

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

  // Intersection Observer 설정
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loading) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.current!.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, loading]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            const currentScrollY = scrollContainerRef.current.scrollTop;
            const currentScrollBottom = currentScrollY + scrollContainerRef.current.clientHeight;
            const scrollHeight = scrollContainerRef.current.scrollHeight;

            // 태그 가시성 제어
            if (currentScrollY > lastScrollY.current) {
              setTagsVisible(false);
            } else {
              setTagsVisible(true);
            }

            sessionStorage.setItem("scrollPosition", currentScrollY.toString());
            sessionStorage.setItem("currentPage", (page + 1).toString());

            lastScrollY.current = currentScrollY;

            if (currentScrollBottom >= scrollHeight - 10 && !loading) {
              setLoading(true);
              setPage((prevPage) => prevPage + 1);
            }

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
  }, [loading]);

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

  /**
   * 무한 스크롤 구현할 예정
   */
  useEffect(() => {}, [page]);

  /**
   * 태그와 검색어로 필터링해서 검색 결과 가져오기
   */
  useEffect(() => {
    console.log(selectedTag, searchContent);
  }, [selectedTag, searchContent]);

  /**
   * 앨범 화면 최초 진입 시 데이터 가져오는 함수(임시)
   */
  const albumInit = async () => {
    const response = await getSearchedDiaries({ page: 0, size: 18 });
    setAlbumData(response);
  };

  useEffect(() => {
    albumInit();
    getScrollPosition();
  }, []);

  return (
    <div className="flex flex-grow flex-col overflow-scroll" ref={scrollContainerRef}>
      <Appbar text="앨범"></Appbar>
      <div className="flex flex-col px-700">
        <div className="sticky top-0 z-10 flex flex-col gap-500 bg-white py-400">
          <SearchBar onEnter={handleSearch} />
          <div
            className={`absolute flex w-full gap-400 overflow-scroll bg-white py-500 transition-all duration-300 ${isTagsVisible ? "top-14 opacity-100" : "top-10 opacity-0"}`}
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
        {albumData && <ThumbnailGrid diaries={albumData.content} />}
        <div ref={loadMoreRef} style={{ height: "20px", background: "transparent" }} />
      </div>
    </div>
  );
};

export default Album;
