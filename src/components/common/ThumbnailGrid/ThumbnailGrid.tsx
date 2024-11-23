import { SearchedDiary } from "@/types/types";
import Thumbnail from "./Thumbnail/Thumbnail";

interface ThumbnailGridProps {
  diaries: SearchedDiary[];
  onClickThumbnail: (diaryId: string) => void;
}

/**
 * 앨범 화면에서 보이는 썸내일 그리드
 * @param diaries diaryId, mainImgUrl 배열
 * @returns
 */
const ThumbnailGrid = ({ diaries, onClickThumbnail }: ThumbnailGridProps) => {
  return (
    <div className="grid grid-cols-3 place-items-center gap-300 py-800">
      {diaries.map((diary) => (
        <Thumbnail
          src={diary.mainImageUrl}
          alt={diary.mainImageUrl}
          onClickHandler={() => onClickThumbnail(diary.diaryId)}
          key={diary.diaryId}
        />
      ))}
    </div>
  );
};

export default ThumbnailGrid;
