import DeleteContainer from "../../container/DeleteContainer";
import DeleteFooter from "../DeleteFooter/DeleteFooter";

interface DeleteDiaryProps {
  onClickCancle: () => void;
  onClickDelete: () => void;
  date: string;
}

/**
 * 일기 삭제 확인 모달
 * @returns
 */
const DeleteDiary = ({ onClickCancle, onClickDelete, date }: DeleteDiaryProps) => {
  return (
    <DeleteContainer>
      <div className="text-start text-heading-2 font-regular">
        일기를 <span className="text-primary-medium">삭제</span>하시겠어요?
      </div>
      <DeleteFooter onClickCancle={onClickCancle} onClickDelete={onClickDelete} date={date} />
    </DeleteContainer>
  );
};

export default DeleteDiary;
