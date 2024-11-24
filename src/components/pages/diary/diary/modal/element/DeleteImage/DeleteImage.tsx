import { deleteImage } from "@/api/api";
import { DeleteContainer, DeleteFooter, ImageContainer } from "@/components/common/BottomSheet";
import { MODAL_STATE } from "@/constants/MODAL_STATE";
import { TOAST_MESSAGE } from "@/constants/TOAST_MESSAGE";
import { DiaryImage, DiaryInfo, ModalManager } from "@/types/types";
import { formatDateWithWeek } from "@/utils/util";
import { toast } from "sonner";

interface DeleteImageProps {
  selectedImage: DiaryImage;
  modalManager: ModalManager;
  diaryInfo: DiaryInfo;
  retry: () => void;
}

/**
 * 이미지 삭제 확인 모달
 * @returns
 */
const DeleteImage = ({
  selectedImage,
  diaryInfo,
  retry,
  modalManager: { closeModal, openModal },
}: DeleteImageProps) => {
  const onClickCancle = () => {
    openModal(MODAL_STATE.IMAGE_SETTING);
  };

  const onClickDeleteImage = async () => {
    if (selectedImage) {
      try {
        await deleteImage({ diaryId: diaryInfo.diaryId, imageId: selectedImage.imageId });
        toast(TOAST_MESSAGE.IMAGE_DELETE);
        closeModal();
        retry();
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <DeleteContainer>
      <ImageContainer imgUrl={selectedImage.imageUrl} />
      <div className="text-start text-heading-2 font-regular">
        이미지를 <span className="text-primary-medium">삭제</span>하시겠어요?
      </div>
      <DeleteFooter
        onClickCancle={onClickCancle}
        onClickDelete={onClickDeleteImage}
        date={formatDateWithWeek(diaryInfo.date)}
      />
    </DeleteContainer>
  );
};

export default DeleteImage;
