import { useEffect, useState } from "react";
import PeopleIcon from "@/assets/svg/people.svg?react";
import EditIcon from "@/assets/svg/edit.svg?react";
import DeleteIcon from "@/assets/svg/delete.svg?react";
import Toggle from "@/components/common/Toggle/Toggle";
import Divider from "@/components/common/Divider/Divider";
import { SettingContainer, SettingItem } from "@/components/common/BottomSheet";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "@/constants/ROUTE_PATH";
import { DiaryInfo, ModalManager } from "@/types/types";
import { MODAL_STATE } from "@/constants/MODAL_STATE";
import useDebounce from "@/hooks/useDebounce";
import { putModifiedDiary } from "@/api/api";
import { useQueryClient } from "@tanstack/react-query";

interface SettingDiaryProps {
  diaryInfo: DiaryInfo;
  modalManager: ModalManager;
}

/**
 * 일기 페이지 설정 버튼 누를 시 나오는 모달
 * @returns
 */
const SettingDiary = ({ diaryInfo, modalManager: { openModal } }: SettingDiaryProps) => {
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState(diaryInfo.isPublic);
  const queryClient = useQueryClient();

  const debouncedIsPublic = useDebounce<boolean>({ value: isPublic });

  const onChangeToggle = () => {
    queryClient.clear();
    setIsPublic((prev: any) => !prev);
  };

  useEffect(() => {
    const updateDiaryVisibility = async () => {
      try {
        await putModifiedDiary({
          diaryId: diaryInfo.diaryId,
          content: diaryInfo.content,
          isPublic: debouncedIsPublic,
          weightedContents: diaryInfo.weightedContents,
        });
      } catch (error) {
        throw error;
      }
    };

    updateDiaryVisibility();
  }, [debouncedIsPublic]);

  const onClickModify = () => {
    navigate(ROUTE_PATH.DIARY_FLOW.MODIFY, { state: { diaryInfo } });
  };

  const onClickDelete = () => {
    openModal(MODAL_STATE.CONTENT_DELETE);
  };

  return (
    <SettingContainer>
      <div className="flex items-center gap-500">
        <PeopleIcon />
        <span>공개 여부</span>
        <span className="text-primary-medium">{isPublic ? "공개" : "비공개"}</span>
        <div className="ml-auto flex items-center">
          <Toggle onClickHandler={onChangeToggle} isChecked={isPublic} />
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
