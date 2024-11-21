import { useLocation, useNavigate } from "react-router-dom";
import ImageCarousel from "../../components/pages/diary/ImageCarousel";
import Content from "../../components/pages/diary/Content";
import Appbar from "../../components/common/Appbar";
import { downloadFile, formatDateWithWeek } from "../../utils/util";
import { DiaryImage, DiaryInfo } from "../../types/types";
import { useEffect, useRef, useState } from "react";
import DiaryContentSettings from "../../components/common/BottomSheet/DiaryContentSettings";
import { deleteDiary, deleteImage, patchMainImage, putModifiedDiary } from "@/api/api";
import BottomSheet from "@/components/common/BottomSheet/BottomSheet";
import DeleteDiarySettings from "@/components/common/BottomSheet/DeleteDiarySettings";
import DiaryImageSettings from "@/components/common/BottomSheet/DiaryImageSettings";
import DeleteImageSettings from "@/components/common/BottomSheet/DeleteImageSettings";
import { toast, Toaster } from "sonner";
import ROUTE_PATH from "@/constants/ROUTE_PATH";

interface DiaryProps {
  diaryInfo: DiaryInfo;
  carouselHeight: number;
  isMyDiary: boolean;
  retry: () => void;
}

const debounceDelay = 300;

const MODAL_STATE = {
  NONE: null,
  CONTENT_SETTING: "DiaryContentSettings",
  IMAGE_SETTING: "DiaryImageSettings",
  CONTENT_DELETE: "DeleteDiarySettings",
  IMAGE_DELETE: "DeleteImageSettings",
  IMAGE_DOWNLOAD: "DiaryImageDownload",
};

const TOAST_TEXT = {
  IMAGE_DOWNLOAD: "이미지가 다운로드 되었어요",
  IMAGE_MAIN: "메인 이미지로 설정되었어요",
  IMAGE_DELETE: "이미지가 삭제되었어요",
  CONTENT_MODIFY: "일기가 수정되었어요",
};

/**
 * 일기 화면
 * @returns
 */
const Diary = ({ diaryInfo, carouselHeight, isMyDiary, retry }: DiaryProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeModal, setActiveModal] = useState<string | null>(MODAL_STATE.NONE);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPublic, setIsPublic] = useState(diaryInfo.isPublic);
  const [selectedImage, setSelectedImage] = useState<DiaryImage | null>(null);
  const [currentHeight] = useState(carouselHeight - 50);
  const [isAppbarVisible, setIsAppbarVisible] = useState(true);

  const browserPreventEvent = (event: () => void) => {
    history.pushState(null, "", location.pathname);
    event();
  };

  useEffect(() => {
    const handlePopstate = () => {
      browserPreventEvent(() => {
        if (location.state && location.state.from === ROUTE_PATH.DIARY) {
          navigate("/");
        } else navigate(-2);
      });
    };
    history.pushState(null, "", location.pathname);
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const onClickDownloadImage = () => {
    if (selectedImage) {
      downloadFile(selectedImage?.imageUrl, selectedImage?.imageId);
      toast(TOAST_TEXT.IMAGE_DOWNLOAD);
      setActiveModal(MODAL_STATE.NONE);
    }
  };

  const onClickSetMainImage = async () => {
    if (selectedImage) {
      try {
        await patchMainImage({ diaryId: diaryInfo.diaryId, imageId: selectedImage.imageId });
        toast(TOAST_TEXT.IMAGE_MAIN);
        setActiveModal(MODAL_STATE.NONE);
      } catch (error) {
        throw error;
      }
    }
  };

  const handleBackClick = () => {
    if (location.state && location.state.from === ROUTE_PATH.DIARY) navigate("/");
    else navigate(-1);
  };

  const handleMenuClick = () => {
    setActiveModal(MODAL_STATE.CONTENT_SETTING);
  };

  const handleLongPress = (image: DiaryImage) => {
    setSelectedImage(image);
    if (isMyDiary) setActiveModal(MODAL_STATE.IMAGE_SETTING);
    else setActiveModal(MODAL_STATE.IMAGE_DOWNLOAD);
  };

  const onClickDeleteImage = async () => {
    if (selectedImage) {
      try {
        await deleteImage({ diaryId: diaryInfo.diaryId, imageId: selectedImage.imageId });
        toast(TOAST_TEXT.IMAGE_DELETE);
        setActiveModal(MODAL_STATE.NONE);
        retry();
      } catch (error) {
        throw error;
      }
    }
  };

  const onChangeToggle = () => {
    setIsPublic((prev) => {
      const newIsPublic = !prev;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        try {
          await putModifiedDiary({
            diaryId: diaryInfo.diaryId,
            content: diaryInfo.content,
            isPublic: newIsPublic,
            weightedContents: diaryInfo.weightedContents,
          });
        } catch (error) {
          throw error;
        }
      }, debounceDelay);

      return newIsPublic;
    });
  };

  const onClickModify = () => {
    navigate("modify", { state: { diaryInfo } });
  };

  const onClickDelete = async () => {
    try {
      await deleteDiary(diaryInfo.diaryId);
      navigate("/");
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (location.state?.isModified) {
      toast(TOAST_TEXT.CONTENT_MODIFY);
    }
  }, [location.state]);

  return (
    <div className="flex h-full flex-col">
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "flex w-fit justify-center rounded-full border-none bg-primary-normal px-600 py-300 font-Binggrae text-body-2 text-white",
        }}
      />
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

      <BottomSheet
        onClose={() => setActiveModal(MODAL_STATE.NONE)}
        isOpen={activeModal === MODAL_STATE.CONTENT_SETTING}
      >
        <DiaryContentSettings
          isChecked={isPublic}
          onChangeToggle={onChangeToggle}
          onClickDelete={() => setActiveModal(MODAL_STATE.CONTENT_DELETE)}
          onClickModify={onClickModify}
        />
      </BottomSheet>
      <BottomSheet
        onClose={() => setActiveModal(MODAL_STATE.NONE)}
        isOpen={activeModal === MODAL_STATE.CONTENT_DELETE}
      >
        <DeleteDiarySettings
          onClickCancle={() => setActiveModal(MODAL_STATE.CONTENT_SETTING)}
          onClickDelete={onClickDelete}
          date={formatDateWithWeek(diaryInfo.date)}
        />
      </BottomSheet>
      <BottomSheet
        onClose={() => setActiveModal(MODAL_STATE.NONE)}
        isOpen={activeModal === MODAL_STATE.IMAGE_SETTING}
      >
        {selectedImage && (
          <DiaryImageSettings
            onClickDelete={() => setActiveModal(MODAL_STATE.IMAGE_DELETE)}
            onClickDownload={onClickDownloadImage}
            onClickSetMain={onClickSetMainImage}
            imgUrl={selectedImage.imageUrl}
          />
        )}
      </BottomSheet>
      <BottomSheet
        onClose={() => setActiveModal(MODAL_STATE.NONE)}
        isOpen={activeModal === MODAL_STATE.IMAGE_DELETE}
      >
        {selectedImage && (
          <DeleteImageSettings
            onClickCancle={() => setActiveModal(MODAL_STATE.IMAGE_SETTING)}
            onClickDelete={onClickDeleteImage}
            imgUrl={selectedImage.imageUrl}
            date={formatDateWithWeek(diaryInfo.date)}
          />
        )}
      </BottomSheet>
      <BottomSheet
        onClose={() => setActiveModal(MODAL_STATE.NONE)}
        isOpen={activeModal === MODAL_STATE.IMAGE_DOWNLOAD}
      >
        {selectedImage && (
          <DiaryImageSettings
            onClickDownload={onClickDownloadImage}
            imgUrl={selectedImage.imageUrl}
          />
        )}
      </BottomSheet>
    </div>
  );
};

export default Diary;
