import Button from "@/components/common/Button/Button";

interface DeleteFooterProps {
  onClickCancle: () => void;
  onClickDelete: () => void;
  date: string;
}

/**
 * 삭제 확인 창 Footer
 * @returns
 */
const DeleteFooter = ({ onClickCancle, onClickDelete, date }: DeleteFooterProps) => {
  return (
    <>
      <div className="text-start font-BinggraeBold text-body-1">{date}</div>
      <div className="flex justify-between">
        <Button
          size="small"
          active={true}
          text="취소하기"
          onClickHandler={onClickCancle}
          bgColor="gray"
        />
        <Button
          size="small"
          active={true}
          text="삭제하기"
          onClickHandler={onClickDelete}
          bgColor="dark"
        />
      </div>
    </>
  );
};

export default DeleteFooter;
