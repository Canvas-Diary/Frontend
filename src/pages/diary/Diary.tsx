import { useNavigate, useParams } from "react-router-dom";
import useFetchDiary from "@/hooks/query/useGetDiaryInfo";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";
import { MODAL_STATE } from "@/constants/MODAL_STATE";
import Appbar from "@/components/common/Appbar/Appbar";
import { useModalManager, useSelectedImage } from "@/hooks/diary";
import { DiaryContent, ImageCarousel, DiaryModalContainer } from "@/components/pages/diary/diary";

/**
 * 일기 화면
 * @returns
 */
const Diary = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams<{ diaryId: string }>();
  const [isAppbarVisible, setIsAppbarVisible] = useState(true);
  const { diaryInfo, refetch } = useFetchDiary(diaryId);

  const { modalManager } = useModalManager();
  const { calculatedHeight } = useMediaQuery();
  const { selectedImage, handleLongPress } = useSelectedImage(diaryInfo, modalManager);

  const handleBackClick = () => navigate(-1);

  const handleMenuClick = () => modalManager.openModal(MODAL_STATE.CONTENT_SETTING);

  return (
    <>
      {isAppbarVisible && (
        <Appbar
          className="fixed top-0 animate-fadeInSlideDown"
          backHandler={handleBackClick}
          menuHandler={diaryInfo.isMine ? handleMenuClick : undefined}
        />
      )}

      <ImageCarousel
        className="fixed top-0 w-full"
        images={diaryInfo.images}
        canAdd={diaryInfo.isMine}
        onLongPress={handleLongPress}
      />

      <div className="flex-shrink-0" style={{ height: calculatedHeight - 50 }} />
      <DiaryContent
        className="z-20 flex-grow"
        diaryInfo={diaryInfo}
        setAppbar={setIsAppbarVisible}
      />

      <DiaryModalContainer
        diaryInfo={diaryInfo}
        refetch={refetch}
        selectedImage={selectedImage}
        modalManager={modalManager}
      />
    </>
  );
};

export default Diary;
