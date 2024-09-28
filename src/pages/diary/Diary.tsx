import { useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import non from "../../assets/icon/non.png";

const Diary = () => {
  const params = useParams();
  const diaryID = params.diaryID;

  if (diaryID === "0") return <NoDiary />;

  return <div>Diary ID: {diaryID}</div>;
};

export default Diary;

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
        <Button size="big" active={true} text="일기 작성하기" onClickHandler={() => {}} />
      </div>
    </div>
  );
};
