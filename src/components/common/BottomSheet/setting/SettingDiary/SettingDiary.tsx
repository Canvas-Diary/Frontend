import PeopleIcon from "@/assets/svg/people.svg?react";
import EditIcon from "@/assets/svg/edit.svg?react";
import DeleteIcon from "@/assets/svg/delete.svg?react";
import Toggle from "@/components/common/Toggle/Toggle";
import Divider from "@/components/common/Divider/Divider";
import SettingContainer from "../../container/SettingContainer";
import SettingItem from "../SettingItem/SettingItem";

interface SettingDiaryProps {
  isChecked: boolean;
  onClickModify: () => void;
  onClickDelete: () => void;
  onChangeToggle: (isChecked: boolean) => void;
}

/**
 * 일기 페이지 설정 버튼 누를 시 나오는 모달
 * @returns
 */
const SettingDiary = ({
  isChecked,
  onClickModify,
  onClickDelete,
  onChangeToggle,
}: SettingDiaryProps) => {
  return (
    <SettingContainer>
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
        <SettingItem icon={<EditIcon />} text={"일기 수정하기"} onClick={onClickModify} />
        <SettingItem
          icon={<DeleteIcon />}
          text={"일기 삭제하기"}
          onClick={onClickDelete}
          className="text-status-negative"
        />
      </div>
    </SettingContainer>
  );
};

export default SettingDiary;
