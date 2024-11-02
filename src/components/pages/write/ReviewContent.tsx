import Tag from "../../common/Tag";
import ImageCarousel from "../diary/ImageCarousel";
import img from "../../../assets/dummy/_Image.png";
import HeartIcon from "../../../assets/svg/heart.svg?react";

interface ContentProps {
  date: string;
  emotion: string;
  likedCount: number;
  isLiked: boolean;
  content: string;
}

/**
 * 일기 화면 하단의 일기 정보
 * @param date 일기 날짜
 * @param emotion 태그에 표시될 감정
 * @param likedCount 좋아요 개수
 * @param isLiked 좋아요 누른 여부
 * @param content 일기 내용
 * @returns
 */
const ReviewContent = ({ date, emotion, likedCount, isLiked, content }: ContentProps) => {
  return (
    <div className="flex flex-col items-center gap-600 rounded-400 bg-white px-800 pb-10 pt-700 font-Binggrae shadow-default">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-300">
          <div className="font-BinggraeBold text-title-2">{date}</div>
          <div>
            <Tag text={emotion} selected={true}></Tag>
          </div>
        </div>
        <div
          className={`${isLiked ? "text-primary-normal" : ""} flex flex-col items-center justify-center`}
        >
          <HeartIcon />
          <div className="text-detail-1">{likedCount}</div>
        </div>
      </div>
      <ImageCarousel
        images={[
          { imageId: "1", isMain: true, imageUrl: img },
          { imageId: "2", isMain: false, imageUrl: img },
        ]}
      />
      <div className="text-body-2 font-regular">{content}</div>
    </div>
  );
};

export default ReviewContent;
