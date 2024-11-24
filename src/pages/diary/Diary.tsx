import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetchDiary from "@/hooks/query/useGetDiaryInfo";
import { ModalContainer } from "@/components/pages/diary/diary/modal";
import useModalManager from "@/hooks/modal/useModalManager";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { MODAL_STATE } from "@/constants/MODAL_STATE";
import { DiaryImage } from "@/types/types";
import { TOAST_MESSAGE } from "@/constants/TOAST_MESSAGE";
import { toast } from "sonner";
import Appbar from "@/components/common/Appbar/Appbar";
import ImageCarousel from "@/components/pages/diary/diary/ImageCarousel";
import Content from "@/components/pages/diary/diary/Content";
import { formatDateWithWeek } from "@/utils/util";

/**
 * 일기 화면
 * @returns
 */
const Diary = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const { diaryInfo, refetch } = useFetchDiary(diaryId);

  const { modalManager } = useModalManager();
  const { openModal } = modalManager;
  const { calculatedHeight } = useMediaQuery();

  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState<DiaryImage | null>(null);
  const [currentHeight] = useState(calculatedHeight - 50);
  const [isAppbarVisible, setIsAppbarVisible] = useState(true);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMenuClick = () => {
    openModal(MODAL_STATE.CONTENT_SETTING);
  };

  const handleLongPress = (image: DiaryImage) => {
    setSelectedImage(image);
    if (diaryInfo.isMine) openModal(MODAL_STATE.IMAGE_SETTING);
    else openModal(MODAL_STATE.IMAGE_DOWNLOAD);
  };

  useEffect(() => {
    if (location.state?.isModified) {
      toast(TOAST_MESSAGE.CONTENT_MODIFY);
    }
  }, [location.state]);

  return (
    <div className="flex h-full flex-col">
      {isAppbarVisible && (
        <div className={`fixed top-0 z-50 w-full animate-fadeInSlideDown`}>
          <Appbar
            backHandler={handleBackClick}
            menuHandler={diaryInfo.isMine ? handleMenuClick : undefined}
          />
        </div>
      )}
      <div className="fixed top-0 w-full">
        <ImageCarousel
          images={diaryInfo.images}
          canAdd={diaryInfo.isMine}
          onLongPress={handleLongPress}
        />
      </div>

      <div className={`flex-shrink-0`} style={{ height: currentHeight }}></div>
      <div className="z-20 flex-grow">
        <Content
          date={formatDateWithWeek(diaryInfo.date)}
          emotion={diaryInfo.emotion}
          likedCount={diaryInfo.likedCount}
          isLiked={diaryInfo.isLiked}
          content={diaryInfo.content}
          setAppbar={setIsAppbarVisible}
        />
      </div>
      <ModalContainer
        diaryInfo={diaryInfo}
        refetch={refetch}
        selectedImage={selectedImage}
        modalManager={modalManager}
      />
    </div>
  );
};

export default Diary;
