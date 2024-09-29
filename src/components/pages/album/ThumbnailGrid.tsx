import Thumbnail from "./Thumbnail";

//일기 더미 데이터
const diarys = [
  { diaryId: 1, imgURL: "1", day: "9월 21일" },
  { diaryId: 2, imgURL: "2", day: "9월 22일" },
  { diaryId: 3, imgURL: "3", day: "9월 23일" },
  { diaryId: 4, imgURL: "4", day: "9월 24일" },
  { diaryId: 5, imgURL: "5", day: "9월 25일" },
  { diaryId: 6, imgURL: "6", day: "9월 26일" },
];

const ThumbnailGrid = () => {
  return (
    <div className="grid grid-cols-3 place-items-center gap-300">
      {diarys.map((diary) => (
        <Thumbnail src={diary.imgURL} alt={diary.day} key={diary.diaryId} />
      ))}
    </div>
  );
};

export default ThumbnailGrid;
