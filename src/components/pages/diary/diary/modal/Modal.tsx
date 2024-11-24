import { BottomSheet } from "@/components/common/BottomSheet";
import { DeleteDiary, DeleteImage, SettingDiary, SettingImage } from "./element";
import { MODAL_STATE } from "@/constants/MODAL_STATE";
import { DiaryImage, DiaryInfo, ModalManager } from "@/types/types";

interface ModalProps {
  diaryInfo: DiaryInfo;
  retry: () => void;
  selectedImage: DiaryImage | null;
  modalManager: ModalManager;
}

const Modal = ({ diaryInfo, retry, selectedImage, modalManager }: ModalProps) => {
  const { closeModal, activeModal } = modalManager;

  return (
    <>
      <BottomSheet onClose={closeModal} isOpen={activeModal === MODAL_STATE.CONTENT_SETTING}>
        <SettingDiary diaryInfo={diaryInfo} modalManager={modalManager} />
      </BottomSheet>
      <BottomSheet onClose={closeModal} isOpen={activeModal === MODAL_STATE.CONTENT_DELETE}>
        <DeleteDiary diaryInfo={diaryInfo} modalManager={modalManager} />
      </BottomSheet>
      <BottomSheet onClose={closeModal} isOpen={activeModal === MODAL_STATE.IMAGE_SETTING}>
        <SettingImage
          diaryInfo={diaryInfo}
          selectedImage={selectedImage!}
          modalManager={modalManager}
        />
      </BottomSheet>
      <BottomSheet onClose={closeModal} isOpen={activeModal === MODAL_STATE.IMAGE_DELETE}>
        <DeleteImage
          diaryInfo={diaryInfo}
          selectedImage={selectedImage!}
          modalManager={modalManager}
          retry={retry}
        />
      </BottomSheet>
      <BottomSheet onClose={closeModal} isOpen={activeModal === MODAL_STATE.IMAGE_DOWNLOAD}>
        <SettingImage
          diaryInfo={diaryInfo}
          selectedImage={selectedImage!}
          modalManager={modalManager}
        />
      </BottomSheet>
    </>
  );
};

export default Modal;
