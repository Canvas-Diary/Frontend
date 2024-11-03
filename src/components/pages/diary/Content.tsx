import Tag from "../../common/Tag";
import HeartIcon from "../../../assets/svg/heart.svg?react";
import { useEffect, useRef, useState } from "react";
import { addLike, removeLike } from "../../../api/api";
import { useParams } from "react-router-dom";

interface ContentProps {
  date: string;
  emotion: string;
  likedCount: number;
  isLiked: boolean;
  content: string;
}

const debounceDelay = 300;

/**
 * 일기 화면 하단의 일기 정보
 * @param date 일기 날짜
 * @param emotion 태그에 표시될 감정
 * @param likedCount 좋아요 개수
 * @param isLiked 좋아요 누른 여부
 * @param content 일기 내용
 * @returns
 */
const Content = ({ date, emotion, likedCount, isLiked, content }: ContentProps) => {
  const [currentIsLiked, setCurrentIsLiked] = useState(isLiked);
  const [currentLikedCount, setCurrentLikedCount] = useState(likedCount);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { diaryID } = useParams<{ diaryID: string }>();

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
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-600 rounded-t-400 bg-white px-800 pb-10 pt-700 font-Binggrae shadow-default">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-300">
          <div className="font-BinggraeBold text-title-2">{date}</div>
          <div>
            <Tag text={emotion} selected={true}></Tag>
          </div>
        </div>
        <div
          className={`${currentIsLiked ? "text-primary-normal" : ""} flex flex-col items-center justify-center`}
          onClick={handleOnClick}
        >
          <HeartIcon />
          <div className="text-detail-1">{currentLikedCount}</div>
        </div>
      </div>
      <hr className="w-full border border-gray-100" />
      <div className="text-body-2 font-regular">{content}</div>
    </div>
  );
};

export default Content;
