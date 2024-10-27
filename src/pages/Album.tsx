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

  /**
   * 선택된 태그를 파라미터로 검색, 이미 선택된 태그이면 파라미터 삭제
   * @param tag 선택된 태그
   */
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      navigate("");
    } else {
      setSelectedTag(tag);
      navigate(`?tag=${tag}`);
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
    const params = new URLSearchParams(location.search); // 쿼리 파라미터를 가져옴
    const tagFromUrl = params.get("tag");
    if (tagFromUrl && tags.includes(tagFromUrl)) {
      setSelectedTag(tagFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex flex-grow flex-col overflow-scroll" ref={scrollContainerRef}>
      <Appbar text="앨범"></Appbar>
      <div className="flex flex-col px-700">
        <div className="sticky top-0 flex flex-col gap-500 bg-white py-400">
          <SearchBar onEnter={() => {}} />
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
