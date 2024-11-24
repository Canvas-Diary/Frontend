import { MODAL_STATE } from "@/constants/MODAL_STATE";
import { DiaryImage, ModalManager } from "@/types/types";
import { useState } from "react";

const useSelectedImage = (diaryInfo: { isMine: boolean }, modalManager: ModalManager) => {
  const [selectedImage, setSelectedImage] = useState<DiaryImage | null>(null);

  const handleLongPress = (image: DiaryImage) => {
    setSelectedImage(image);
    if (diaryInfo.isMine) {
      modalManager.openModal(MODAL_STATE.IMAGE_SETTING);
    } else {
      modalManager.openModal(MODAL_STATE.IMAGE_DOWNLOAD);
    }
  };

  return { selectedImage, handleLongPress };
};

export default useSelectedImage;
