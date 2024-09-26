import Thumbnail from "./Thumbnail";

const diarys = [
  { imgURL: "1", day: "9월 21일" },
  { imgURL: "2", day: "9월 22일" },
  { imgURL: "3", day: "9월 23일" },
  { imgURL: "4", day: "9월 24일" },
  { imgURL: "5", day: "9월 25일" },
  { imgURL: "6", day: "9월 26일" },
];

const ThumbnailGrid = () => {
  return (
    <div className="grid grid-cols-3 place-items-center gap-300">
      {diarys.map((diary) => (
        <Thumbnail src={diary.imgURL} alt={diary.day} />
      ))}
    </div>
  );
};

export default ThumbnailGrid;
