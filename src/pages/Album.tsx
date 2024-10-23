import Tag from "../components/common/Tag";
import SearchBar from "../components/pages/album/SearchBar";
import ThumbnailGrid from "../components/pages/album/ThumbnailGrid";
import Dummy from "../assets/dummy/_Image.png";
import { useEffect, useRef, useState } from "react";

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

/**
 * 앨범 화면
 * @returns
 */
const Album = () => {
  const [isTagsVisible, setTagsVisible] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null); // 스크롤 컨테이너 ref
  const lastScrollY = useRef(0); // 이전 스크롤 위치 저장

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const currentScrollY = scrollContainerRef.current.scrollTop;

        if (currentScrollY > lastScrollY.current) {
          setTagsVisible(false); // 아래로 스크롤 시 태그 숨기기
        } else {
          setTagsVisible(true); // 위로 스크롤 시 태그 보이기
        }

        lastScrollY.current = currentScrollY; // 이전 스크롤 위치 업데이트
        console.log(`현재 스크롤 위치: ${currentScrollY}px`);
      }
    };

    const scrollContainer = scrollContainerRef.current;

    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex-grow overflow-scroll" ref={scrollContainerRef}>
      <div className="flex flex-col">
        <div
          className={`flex w-full items-center justify-center bg-transparent px-800 py-300 text-black dark:text-white`}
        >
          <span className="font-Binggrae text-body-1 font-regular">앨범</span>
        </div>
        <div className="flex flex-col px-700">
          <div className="sticky top-0 flex flex-col gap-500 bg-white py-400">
            <SearchBar onEnter={() => {}} />
            <div
              className={`absolute flex w-full gap-400 overflow-scroll bg-white py-500 transition-all duration-300 ${isTagsVisible ? "top-14 opacity-100" : "top-10 opacity-0"}`}
            >
              <Tag text="기쁨" selected={false} />
              <Tag text="슬픔" selected={false} />
              <Tag text="분노" selected={false} />
              <Tag text="공포" selected={false} />
              <Tag text="혐오" selected={false} />
              <Tag text="수치" selected={false} />
              <Tag text="놀람" selected={false} />
              <Tag text="궁금" selected={false} />
              <Tag text="무난" selected={false} />
            </div>
          </div>
          <div className="h-4"></div>
          <ThumbnailGrid diaries={AlbumData.diaries} />
        </div>
      </div>
    </div>
  );
};

export default Album;
