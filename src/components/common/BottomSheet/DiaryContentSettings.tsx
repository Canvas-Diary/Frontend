import BottomSheet from "./BottomSheet";
import PeopleIcon from "../../../assets/svg/people.svg?react";
import EditIcon from "../../../assets/svg/edit.svg?react";
import DeleteIcon from "../../../assets/svg/delete.svg?react";

//토글 버튼 구현해야 함

/**
 * 일기 페이지 설정 버튼 누를 시 나오는 모달
 * @returns
 */
const DiaryContentSettings = () => {
  return (
    <BottomSheet>
      <div className="flex w-full flex-col gap-600 font-Binggrae text-body-2 font-regular text-gray-700">
        <div className="flex gap-500">
          <PeopleIcon />
          <span>공개 여부</span>
          <span className="text-primary-medium">공개</span>
          <button className="ml-auto">토글버튼</button>
        </div>
        <hr className="w-full border border-gray-100" />
        <div className="flex h-full flex-col gap-900">
          <button className="flex gap-500 text-start">
            <EditIcon />
            <span>일기 수정하기</span>
          </button>
          <button className="flex gap-500 text-start text-status-negative">
            <DeleteIcon />
            <span>일기 삭제하기</span>
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default DiaryContentSettings;
