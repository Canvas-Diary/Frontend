import EmotionTag from "../../common/EmotionTag";
import HeartIcon from "../../../assets/svg/heart.svg?react";
import { useEffect, useRef, useState } from "react";
import { addLike, removeLike } from "../../../api/api";
import { useParams } from "react-router-dom";
import Divider from "../../common/Divider";

interface ContentProps {
  date: string;
  emotion: string;
  likedCount: number;
  isLiked: boolean;
  content: string;
  setAppbar: (value: boolean) => void;
}

const debounceDelay = 300;

const tagsMap: { [key: string]: string } = {
  JOY: "기쁨",
  SADNESS: "슬픔",
  ANGER: "분노",
  FEAR: "공포",
  DISGUST: "혐오",
  NONE: "NONE",
  SHAMEhy: "수치",
  SURPRISE: "놀람",
  CURIOSITY: "궁금",
};

/**
 * 일기 화면 하단의 일기 정보
 * @param date 일기 날짜
 * @param emotion 태그에 표시될 감정
 * @param likedCount 좋아요 개수
 * @param isLiked 좋아요 누른 여부
 * @param content 일기 내용
 * @param setAppbar
 * @returns
 */
const Content = ({ date, emotion, likedCount, isLiked, content, setAppbar }: ContentProps) => {
  const [currentIsLiked, setCurrentIsLiked] = useState(isLiked);
  const [currentLikedCount, setCurrentLikedCount] = useState(likedCount);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { diaryID } = useParams<{ diaryID: string }>();
  const stickyRef = useRef<HTMLDivElement>(null);

  const handleOnClick = () => {
    setCurrentIsLiked((prev) => !prev);
    setCurrentLikedCount((prev) => prev + (currentIsLiked ? -1 : 1));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      //업데이트 이전임
      if (currentIsLiked) removeLike(diaryID!);
      else addLike(diaryID!);
    }, debounceDelay);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const top = stickyRef.current.getBoundingClientRect().top - 50;
        setAppbar(top > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex h-full flex-col items-center gap-600 rounded-t-400 bg-background px-800 pb-10 font-Binggrae shadow-default">
      <div
        className="sticky top-0 flex w-full flex-col gap-600 bg-background pt-700"
        ref={stickyRef}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-300">
            <div className="font-BinggraeBold text-title-2">{date}</div>
            <div>
              <EmotionTag text={tagsMap[emotion]} selected={true}></EmotionTag>
            </div>
          </div>
          <div
            className={`${currentIsLiked ? "text-primary-normal dark:text-primary-medium" : "text-gray-200"} flex flex-col items-center justify-center`}
            onClick={handleOnClick}
          >
            <HeartIcon />
            <div className="text-detail-1">{currentLikedCount}</div>
          </div>
        </div>
        <Divider />
      </div>
      <div className="w-full whitespace-pre-wrap text-start text-body-2 font-regular">
        {content}
      </div>
    </div>
  );
};

export default Content;
