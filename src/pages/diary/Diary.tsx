import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import non from "../../assets/icon/non.png";
import ImageCarousel from "../../components/pages/diary/ImageCarousel";
import Content from "../../components/pages/diary/Content";
import { useState, useEffect, useRef } from "react";
import Appbar from "../../components/common/Appbar";
import RoutePaths from "../../constants/routePath";
import { formatDateWithWeek, getTodayDate } from "../../utils/util";
import { getDiaryInfoById } from "../../api/api";
import { DiaryInfo } from "../../types/types";

/**
 * 일기 화면
 * @returns
 */
const Diary = () => {
  const params = useParams();
  const diaryID = params.diaryID;
  const navigate = useNavigate();

  const [diaryInfo, setDiaryInfo] = useState<DiaryInfo | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselHeight, setCarouselHeight] = useState(0);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(event.currentTarget.scrollTop);
  };

  useEffect(() => {
    const diaryInit = async (diaryId: string) => {
      const diaryInfo = await getDiaryInfoById(diaryId);
      setDiaryInfo(diaryInfo);
    };

    diaryInit(diaryID!);
  }, []);

  useEffect(() => {
    const width = window.innerWidth;
    const calculatedHeight = (width * 7) / 4;
    setCarouselHeight(calculatedHeight);
  }, []);

  return (
    <>
      {diaryInfo ? (
        <>
          <div className="fixed top-0 z-10 w-full">
            <Appbar
              backHandler={() => {
                navigate(-1);
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
                date={formatDateWithWeek(diaryInfo.date)}
                emotion={diaryInfo.emotion}
                likedCount={diaryInfo.likedCount}
                isLiked={diaryInfo.isLiked}
                content={diaryInfo.content}
              />
            </div>
          </div>
        </>
      ) : (
        <NoDiary />
      )}
    </>
  );
};

export default Diary;

/**
 * 아직 작성한 일기가 없는 경우
 * @returns
 */
const NoDiary = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center">
      <Appbar
        backHandler={() => {
          navigate(-1);
        }}
      ></Appbar>
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-col items-center gap-600">
          <img src={non} alt="non" className="h-[2.75rem] w-[2.75rem]" />
          <p>아직 일기를 작성하지 않았어요</p>
        </div>
      </div>
      <div className="mb-[1.875rem]">
        <Button
          size="big"
          active={true}
          text="일기 작성하기"
          onClickHandler={() => {
            navigate(RoutePaths.diaryWrite, { state: { date: getTodayDate() } });
          }}
          bgColor="light"
        />
      </div>
    </div>
  );
};
