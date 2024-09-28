import { useParams } from "react-router-dom";

const Diary = () => {
  const params = useParams();
  const diaryID = params.diaryID;

  return (
    <div>{diaryID === "0" ? <div>No Diary Available</div> : <div>Diary ID: {diaryID}</div>}</div>
  );
};

export default Diary;
