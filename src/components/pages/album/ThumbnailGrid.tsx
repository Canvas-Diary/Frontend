import Thumbnail from "./Thumbnail";

interface ThumbnailGridProps {
  diaries: {
    diaryId: number;
    mainImgUrl: string;
  }[];
}

/**
 * 앨범 화면에서 보이는 썸내일 그리드
 * @param diaries diaryId, mainImgUrl 배열
 * @returns
 */
const ThumbnailGrid = ({ diaries }: ThumbnailGridProps) => {
  return (
    <div className="grid grid-cols-3 place-items-center gap-300 py-800">
      {diaries.map((diary) => (
        <Thumbnail
          src={diary.mainImgUrl}
          alt={diary.mainImgUrl}
          diaryId={diary.diaryId}
          key={diary.diaryId}
        />
      ))}
    </div>
  );
};

export default ThumbnailGrid;
