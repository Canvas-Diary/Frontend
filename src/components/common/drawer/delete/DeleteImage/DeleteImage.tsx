import DeleteContainer from "../DeleteContainer/DeleteContainer";
import DeleteFooter from "../DeleteFooter/DeleteFooter";

interface DeleteImageProps {
  onClickCancle: () => void;
  onClickDelete: () => void;
  imgUrl: string;
  date: string;
}

/**
 * 이미지 삭제 확인 모달
 * @returns
 */
const DeleteImage = ({ onClickCancle, onClickDelete, imgUrl, date }: DeleteImageProps) => {
  return (
    <DeleteContainer>
      <div className="flex justify-center">
        <img src={imgUrl} alt="" height={308} width={176} />
      </div>
      <div className="text-start text-heading-2 font-regular">
        이미지를 <span className="text-primary-medium">삭제</span>하시겠어요?
      </div>
      <DeleteFooter onClickCancle={onClickCancle} onClickDelete={onClickDelete} date={date} />
    </DeleteContainer>
  );
};

export default DeleteImage;
