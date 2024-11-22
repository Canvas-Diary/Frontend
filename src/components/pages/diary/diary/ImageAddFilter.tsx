import { useNavigate, useParams } from "react-router-dom";
import AddButton from "./AddButton";

const ImageAddFilter = () => {
  const navigate = useNavigate();
  const { diaryID } = useParams<{ diaryID: string }>();
  const onClickAddButton = () => {
    navigate(`/diary/${diaryID}/style`);
  };
  return (
    <div className="flex h-full w-full items-center justify-center bg-transparent bg-opacity-10 backdrop-blur-default">
      <AddButton onClickHandler={onClickAddButton}></AddButton>
    </div>
  );
};

export default ImageAddFilter;
