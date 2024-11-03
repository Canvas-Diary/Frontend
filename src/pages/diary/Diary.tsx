import { useLocation, useNavigate } from "react-router-dom";
import ImageCarousel from "../../components/pages/diary/ImageCarousel";
import Content from "../../components/pages/diary/Content";
import { useState, useRef } from "react";
import Appbar from "../../components/common/Appbar";
import { formatDateWithWeek } from "../../utils/util";
import { DiaryInfo } from "../../types/types";
import RoutePaths from "../../constants/routePath";

interface DiaryProps {
  diaryInfo: DiaryInfo;
  carouselHeight: number;
}

/**
 * 일기 화면
 * @returns
 */
const Diary = ({ diaryInfo, carouselHeight }: DiaryProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(event.currentTarget.scrollTop);
  };

  return (
    <>
      <div className="fixed top-0 z-10 w-full">
        <Appbar
          backHandler={() => {
            if (location.state?.from === RoutePaths.diaryDraw) {
              navigate("/");
            } else {
              navigate(-1);
            }
          }}
          menuHandler={() => {}}
        ></Appbar>
      </div>
      <div className="relative flex h-full flex-col items-center">
        <div className="fixed top-0 w-full" ref={carouselRef}>
          <ImageCarousel images={diaryInfo.images} />
        </div>

        <div
          className="absolute z-10 h-fit w-full"
          onScroll={handleScroll}
          style={{ top: `calc(${carouselHeight}px - ${scrollPosition}px - 50px)` }}
        >
          <Content
            date={formatDateWithWeek(diaryInfo!.date)}
            emotion={diaryInfo.emotion}
            likedCount={diaryInfo.likedCount}
            isLiked={diaryInfo.isLiked}
            content={diaryInfo.content}
          />
        </div>
      </div>
    </>
  );
};

export default Diary;
