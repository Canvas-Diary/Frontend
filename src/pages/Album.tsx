import Tag from "../components/common/Tag";
import SearchBar from "../components/pages/album/SearchBar";
import ThumbnailGrid from "../components/pages/album/ThumbnailGrid";
import Dummy from "../assets/dummy/_Image.png";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Appbar from "../components/common/Appbar";

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

const tags = ["기쁨", "슬픔", "분노", "공포", "혐오", "수치", "놀람", "궁금", "무난"];

/**
 * 앨범 화면
 * @returns
 */
const Album = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const [isTagsVisible, setTagsVisible] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchContent, setSearchContent] = useState<string>("");

  /**
   * 선택된 태그를 파라미터로 검색, 이미 선택된 태그이면 파라미터 삭제
   * @param tag 선택된 태그
   */
  const handleTagClick = (tag: string) => {
    // 태그가 선택된 상태에서 클릭하면 태그를 초기화
    if (selectedTag === tag) {
      setSelectedTag(null);
      if (!searchContent) {
        navigate(""); // 검색어와 태그가 모두 없으면 쿼리 파라미터를 없애고 기본 URL로 이동
      } else {
        navigate(`?search=${searchContent}`); // 검색어가 있으면 그에 맞춰 쿼리 업데이트
      }
    } else {
      // 새로운 태그를 선택한 경우
      setSelectedTag(tag);
      // 태그와 검색어가 모두 있을 경우, 둘 다 쿼리 파라미터에 포함
      if (searchContent) {
        navigate(`?tag=${tag}&search=${searchContent}`);
      } else {
        navigate(`?tag=${tag}`); // 검색어가 없으면 태그만 쿼리 파라미터에 포함
      }
    }
  };

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
            console.log("Scroll");

            if (currentScrollY > lastScrollY.current) {
              setTagsVisible(false);
            } else {
              setTagsVisible(true);
            }

            sessionStorage.setItem("scrollPosition", currentScrollY.toString());
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

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");

    if (savedScrollPosition && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = parseInt(savedScrollPosition, 10);
      lastScrollY.current = parseInt(savedScrollPosition, 10);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tagFromUrl = params.get("tag");
    if (tagFromUrl && tags.includes(tagFromUrl)) {
      setSelectedTag(tagFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    console.log(selectedTag, searchContent);
  }, [selectedTag, searchContent]);

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
        <ThumbnailGrid diaries={AlbumData.diaries} />
      </div>
    </div>
  );
};

export default Album;
