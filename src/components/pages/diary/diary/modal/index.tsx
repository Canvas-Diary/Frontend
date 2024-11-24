import { BottomSheet } from "@/components/common/BottomSheet";
import { DeleteDiary, DeleteImage, SettingDiary, SettingImage } from "./element";
import { MODAL_STATE } from "@/constants/MODAL_STATE";
import { DiaryImage, DiaryInfo, ModalManager } from "@/types/types";

interface ModalProps {
  diaryInfo: DiaryInfo;
  refetch: () => void;
  selectedImage: DiaryImage | null;
  modalManager: ModalManager;
}

/**
 * 일기 설정 컨테이너
 * @returns
 */
const ModalContainer = ({ diaryInfo, refetch, selectedImage, modalManager }: ModalProps) => {
  const { closeModal, activeModal } = modalManager;
  const useModalElements = useModalElementsuseModalElements({
    diaryInfo,
    modalManager,
    selectedImage,
    refetch,
  });

  return (
    <>
      {Object.keys(useModalElements).map((modalState) => (
        <BottomSheet key={modalState} onClose={closeModal} isOpen={activeModal === modalState}>
          {useModalElements[modalState]}
        </BottomSheet>
      ))}
    </>
  );
};

export default ModalContainer;

/**
 * MODAL_STATE에 따라 Container에 채우는 컴포넌트 오브젝트
 * @returns
 */
const useModalElementsuseModalElements = ({
  diaryInfo,
  refetch,
  selectedImage,
  modalManager,
}: ModalProps) => {
  return {
    [MODAL_STATE.CONTENT_SETTING]: (
      <SettingDiary diaryInfo={diaryInfo} modalManager={modalManager} />
    ),
    [MODAL_STATE.CONTENT_DELETE]: <DeleteDiary diaryInfo={diaryInfo} modalManager={modalManager} />,
    [MODAL_STATE.IMAGE_SETTING]: (
      <SettingImage
        diaryInfo={diaryInfo}
        modalManager={modalManager}
        selectedImage={selectedImage}
      />
    ),
    [MODAL_STATE.IMAGE_DELETE]: (
      <DeleteImage
        diaryInfo={diaryInfo}
        modalManager={modalManager}
        selectedImage={selectedImage}
        refetch={refetch}
      />
    ),
    [MODAL_STATE.IMAGE_DOWNLOAD]: (
      <SettingImage
        diaryInfo={diaryInfo}
        modalManager={modalManager}
        selectedImage={selectedImage}
      />
    ),
  };
};
