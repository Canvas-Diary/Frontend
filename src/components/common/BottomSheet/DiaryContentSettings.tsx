import PeopleIcon from "@/assets/svg/people.svg?react";
import EditIcon from "@/assets/svg/edit.svg?react";
import DeleteIcon from "@/assets/svg/delete.svg?react";
import Divider from "../Divider";
import Toggle from "../Toggle";

interface DiaryContentSettingsProps {
  isChecked: boolean;
  onClickModify: () => void;
  onClickDelete: () => void;
  onChangeToggle: (isChecked: boolean) => void;
}

/**
 * 일기 페이지 설정 버튼 누를 시 나오는 모달
 * @returns
 */
const DiaryContentSettings = ({
  isChecked,
  onClickModify,
  onClickDelete,
  onChangeToggle,
}: DiaryContentSettingsProps) => {
  return (
    <div className="flex w-full flex-col gap-600 font-Binggrae text-body-2 font-regular text-gray-700 dark:text-gray-200">
      <div className="flex items-center gap-500">
        <PeopleIcon />
        <span>공개 여부</span>
        <span className="text-primary-medium">{isChecked ? "공개" : "비공개"}</span>
        <div className="ml-auto flex items-center">
          <Toggle onClickHandler={onChangeToggle} isChecked={isChecked} />
        </div>
      </div>
      <Divider />
      <div className="flex h-full flex-col gap-900">
        <button className="flex gap-500 text-start" onClick={onClickModify}>
          <EditIcon />
          <span>일기 수정하기</span>
        </button>
        <button className="flex gap-500 text-start text-status-negative" onClick={onClickDelete}>
          <DeleteIcon />
          <span>일기 삭제하기</span>
        </button>
      </div>
    </div>
  );
};

export default DiaryContentSettings;
