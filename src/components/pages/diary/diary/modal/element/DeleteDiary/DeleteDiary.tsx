import { deleteDiary } from "@/api/api";
import { DeleteContainer, DeleteFooter } from "@/components/common/BottomSheet";
import { MODAL_STATE } from "@/constants/MODAL_STATE";
import { DiaryInfo, ModalManager } from "@/types/types";
import { formatDateWithWeek } from "@/utils/util";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DeleteDiaryProps {
  modalManager: ModalManager;
  diaryInfo: DiaryInfo;
}

/**
 * 일기 삭제 확인 모달
 * @returns
 */
const DeleteDiary = ({ diaryInfo, modalManager: { openModal } }: DeleteDiaryProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onClickCancle = () => {
    openModal(MODAL_STATE.CONTENT_SETTING);
  };

  const onClickDelete = async () => {
    try {
      await deleteDiary(diaryInfo.diaryId);
      toast("일기가 삭제되었어요");
      queryClient.removeQueries({ queryKey: ["diaryInfo", diaryInfo.diaryId] });
      navigate(`/no-diary/${diaryInfo.date}`, { replace: true });
    } catch (error) {
      throw error;
    }
  };
  return (
    <DeleteContainer>
      <div className="text-start text-heading-2 font-regular">
        일기를 <span className="text-primary-medium">삭제</span>하시겠어요?
      </div>
      <DeleteFooter
        onClickCancle={onClickCancle}
        onClickDelete={onClickDelete}
        date={formatDateWithWeek(diaryInfo.date)}
      />
    </DeleteContainer>
  );
};

export default DeleteDiary;
