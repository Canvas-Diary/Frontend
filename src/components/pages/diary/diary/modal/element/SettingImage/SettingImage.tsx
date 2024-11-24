import DeleteIcon from "@/assets/svg/delete.svg?react";
import StarIcon from "@/assets/svg/star.svg?react";
import DownloadIcon from "@/assets/svg/download.svg?react";
import { MODAL_STATE } from "@/constants/MODAL_STATE";
import { TOAST_MESSAGE } from "@/constants/TOAST_MESSAGE";
import { downloadFile } from "@/utils/util";
import { ImageContainer, SettingContainer, SettingItem } from "@/components/common/BottomSheet";
import { DiaryImage, DiaryInfo, ModalManager } from "@/types/types";
import { patchMainImage } from "@/api/api";
import { toast } from "sonner";

interface SttingImageProps {
  diaryInfo: DiaryInfo;
  selectedImage: DiaryImage | null;
  modalManager: ModalManager;
}

/**
 * 일기 페이지 이미지 설정 시 나오는 모달
 * @returns
 */
const SettingImage = ({
  diaryInfo,
  selectedImage,
  modalManager: { closeModal, openModal },
}: SttingImageProps) => {
  const onClickDownloadImage = () => {
    if (selectedImage) {
      downloadFile(selectedImage.imageUrl, selectedImage.imageId);
      toast(TOAST_MESSAGE.IMAGE_DOWNLOAD);
      closeModal();
    }
  };

  const onClickSetMainImage = async () => {
    if (selectedImage) {
      try {
        await patchMainImage({ diaryId: diaryInfo.diaryId, imageId: selectedImage.imageId });
        toast(TOAST_MESSAGE.IMAGE_MAIN);
        closeModal();
      } catch (error) {
        throw error;
      }
    }
  };

  const onClickDeleteImage = () => {
    openModal(MODAL_STATE.IMAGE_DELETE);
  };

  return (
    <SettingContainer>
      {selectedImage && <ImageContainer imgUrl={selectedImage.imageUrl} />}
      <div className="flex h-full flex-col gap-900">
        {diaryInfo.isMine && (
          <SettingItem
            icon={<StarIcon />}
            text={"대표 이미지로 설정하기"}
            onClick={onClickSetMainImage}
          />
        )}
        <SettingItem
          icon={<DownloadIcon />}
          text={"이미지 다운로드"}
          onClick={onClickDownloadImage}
        />
        {diaryInfo.isMine && (
          <SettingItem
            icon={<DeleteIcon />}
            text={"이미지 삭제하기"}
            className="text-status-negative"
            onClick={onClickDeleteImage}
          />
        )}
      </div>
    </SettingContainer>
  );
};

export default SettingImage;
