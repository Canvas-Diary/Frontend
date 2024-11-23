import { useNavigate, useParams } from "react-router-dom";
import AddButton from "./AddButton";
import ROUTE_PATH from "@/constants/ROUTE_PATH";

const ImageAddFilter = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams<{ diaryId: string }>();
  const onClickAddButton = () => {
    navigate(ROUTE_PATH.DIARY_FLOW.ADD, { state: { diaryId } });
  };
  return (
    <div className="flex h-full w-full items-center justify-center bg-transparent bg-opacity-10 backdrop-blur-default">
      <AddButton onClickHandler={onClickAddButton}></AddButton>
    </div>
  );
};

export default ImageAddFilter;
