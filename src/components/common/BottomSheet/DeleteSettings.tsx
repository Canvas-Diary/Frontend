import Button from "../Button";
import BottomSheet from "./BottomSheet";

const DeleteSettings = () => {
  return (
    <BottomSheet>
      <div className="flex w-full flex-col gap-600 font-Binggrae text-body-2 font-regular text-gray-900">
        <div className="text-heading-2 font-regular">
          일기를 <span className="text-primary-medium">삭제</span>하시겠어요?
        </div>
        <div className="text-body-1 font-bold">일기 날짜</div>
        <div className="flex justify-between">
          <Button
            size="small"
            active={true}
            text="취소하기"
            onClickHandler={() => {}}
            bgColor="gray"
          />
          <Button
            size="small"
            active={true}
            text="삭제하기"
            onClickHandler={() => {}}
            bgColor="dark"
          />
        </div>
      </div>
    </BottomSheet>
  );
};

export default DeleteSettings;
