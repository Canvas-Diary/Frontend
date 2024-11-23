import EmotionTag from "../../common/EmotionTag/EmotionTag";
import ImageCarousel from "../diary/diary/ImageCarousel";
import HeartIcon from "@/assets/svg/heart.svg?react";
import { DiaryImage } from "../../../types/types";

interface ContentProps {
  date: string;
  emotion: string;
  likedCount: number;
  isLiked: boolean;
  content: string;
  images: DiaryImage[];
}

const tagsMap: { [key: string]: string } = {
  JOY: "기쁨",
  SADNESS: "슬픔",
  ANGER: "분노",
  FEAR: "공포",
  DISGUST: "혐오",
  NONE: "무난",
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
 * @param images 이미지 목록
 * @returns
 */
const ReviewContent = ({ date, emotion, likedCount, isLiked, content, images }: ContentProps) => {
  return (
    <div className="flex flex-col items-center gap-600 rounded-400 bg-white px-800 pb-10 pt-700 font-Binggrae shadow-default dark:bg-gray-700">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-300">
          <div className="font-BinggraeBold text-title-2">{date}</div>
          <div>
            <EmotionTag text={tagsMap[emotion]} selected={true}></EmotionTag>
          </div>
        </div>
        <div
          className={`${isLiked ? "text-primary-normal" : "text-gray-200"} flex flex-col items-center justify-center`}
        >
          <HeartIcon />
          <div className="text-detail-1">{likedCount}</div>
        </div>
      </div>
      <ImageCarousel images={images} canAdd={false} />
      <div className="w-full whitespace-pre-wrap text-start text-body-2 font-regular">
        {content}
      </div>
    </div>
  );
};

export default ReviewContent;
