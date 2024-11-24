import { useLocation, useNavigate } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";
import Content from "./Content";
import Appbar from "../../../common/Appbar/Appbar";
import { formatDateWithWeek } from "../../../../utils/util";
import { DiaryImage, DiaryInfo } from "../../../../types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useModalManager from "@/hooks/modal/useModalManager";
import { MODAL_STATE } from "@/constants/MODAL_STATE";
import { TOAST_MESSAGE } from "@/constants/TOAST_MESSAGE";
import { Modal } from "./modal";
import useMediaQuery from "@/hooks/useMediaQuery";

interface DiaryProps {
  diaryInfo: DiaryInfo;
  isMyDiary: boolean;
  retry: () => void;
}

/**
 * 일기 화면
 * @returns
 */
const DiaryComponent = ({ diaryInfo, isMyDiary, retry }: DiaryProps) => {
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
    console.log("HI");
    openModal(MODAL_STATE.CONTENT_SETTING);
  };

  const handleLongPress = (image: DiaryImage) => {
    setSelectedImage(image);
    if (isMyDiary) openModal(MODAL_STATE.IMAGE_SETTING);
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
            menuHandler={isMyDiary ? handleMenuClick : undefined}
          />
        </div>
      )}
      <div className="fixed top-0 w-full">
        <ImageCarousel images={diaryInfo.images} canAdd={isMyDiary} onLongPress={handleLongPress} />
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
      <Modal
        diaryInfo={diaryInfo}
        retry={retry}
        selectedImage={selectedImage}
        modalManager={modalManager}
      />
    </div>
  );
};

export default DiaryComponent;
