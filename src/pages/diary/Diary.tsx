import { useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import non from "../../assets/icon/non.png";
import ImageCarousel from "../../components/pages/diary/ImageCarousel";
import Content from "../../components/pages/diary/Content";
import { useState, useEffect, useRef } from "react";
import img from "../../assets/dummy/_Image.png";

//임시 더미 데이터
const diaryData = {
  content: "일기 내용",
  emotion: "happy",
  likedCount: 5,
  isLiked: true,
  images: [{ imageId: 1, imageUrl: img }],
  isPublic: true,
  date: "2024-09-28",
};

/**
 * 일기 화면
 * @returns
 */
const Diary = () => {
  const params = useParams();
  const diaryID = params.diaryID;
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselHeight, setCarouselHeight] = useState(0);

  if (diaryID === "0") return <NoDiary />;

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(event.currentTarget.scrollTop);
  };

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselHeight(carouselRef.current.clientHeight);
    }
  }, [carouselRef]);

  return (
    <div className="relative flex h-full flex-col items-center">
      <div className="fixed top-0 w-full" ref={carouselRef}>
        <ImageCarousel images={diaryData.images} />
      </div>

      <div
        className="absolute z-10 h-fit w-full"
        onScroll={handleScroll}
        style={{ top: `calc(${carouselHeight}px - ${scrollPosition}px - 50px)` }}
      >
        <Content
          date={diaryData.date}
          emotion={diaryData.emotion}
          likedCount={diaryData.likedCount}
          isLiked={diaryData.isLiked}
          content={diaryData.content}
        />
      </div>
    </div>
  );
};

export default Diary;

/**
 * 아직 작성한 일기가 없는 경우
 * @returns
 */
const NoDiary = () => {
  return (
    <div className="flex h-full flex-col items-center">
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
          onClickHandler={() => {}}
          bgColor="light"
        />
      </div>
    </div>
  );
};
