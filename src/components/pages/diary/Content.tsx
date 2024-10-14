import Tag from "../../common/Tag";

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
const Content = ({ date, emotion, likedCount, isLiked, content }: ContentProps) => {
  return (
    <div className="flex flex-col items-center gap-600 rounded-t-400 bg-white px-800 pb-10 pt-700">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-300">
          <div className="font-Binggrae text-title-2 font-bold">{date}</div>
          <div>
            <Tag text={emotion} selected={true}></Tag>
          </div>
        </div>
        <div>heart{likedCount}</div>
      </div>
      <hr className="w-full border border-gray-100" />
      <div className="font-Binggrae text-body-2 font-regular">{content}</div>
    </div>
  );
};

export default Content;
