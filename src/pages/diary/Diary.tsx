import { useLocation, useNavigate } from "react-router-dom";
import ImageCarousel from "../../components/pages/diary/ImageCarousel";
import Content from "../../components/pages/diary/Content";
import Appbar from "../../components/common/Appbar";
import { formatDateWithWeek } from "../../utils/util";
import { DiaryImage, DiaryInfo } from "../../types/types";
import RoutePaths from "../../constants/routePath";
import { useEffect, useRef, useState } from "react";
import DiaryContentSettings from "../../components/common/BottomSheet/DiaryContentSettings";
import { deleteDiary, deleteImage, patchMainImage, putModifiedDiary } from "@/api/api";
import BottomSheet from "@/components/common/BottomSheet/BottomSheet";
import DeleteDiarySettings from "@/components/common/BottomSheet/DeleteDiarySettings";
import DiaryImageSettings from "@/components/common/BottomSheet/DiaryImageSettings";
import DeleteImageSettings from "@/components/common/BottomSheet/DeleteImageSettings";
import { toast, Toaster } from "sonner";

interface DiaryProps {
  diaryInfo: DiaryInfo;
  carouselHeight: number;
  isMyDiary: boolean;
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
const Diary = ({ diaryInfo, carouselHeight, isMyDiary }: DiaryProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeModal, setActiveModal] = useState<string | null>(MODAL_STATE.NONE);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPublic, setIsPublic] = useState(diaryInfo.isPublic);
  const [selectedImage, setSelectedImage] = useState<DiaryImage | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const onClickDownloadImage = () => {
    toast(TOAST_TEXT.IMAGE_DOWNLOAD);
    setActiveModal(MODAL_STATE.NONE);
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
    <div className="flex h-screen flex-col overflow-scroll">
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "flex w-fit justify-center rounded-full border-none bg-primary-normal px-600 py-300 font-Binggrae text-body-2 text-white",
        }}
      />
      <div className="fixed top-0 z-10 w-full">
        <Appbar
          backHandler={() => {
            if (location.state?.from === RoutePaths.diaryDraw) {
              navigate("/");
            } else if (location.state?.isModified === true) {
              navigate("/");
            } else {
              navigate(-1);
            }
          }}
          menuHandler={isMyDiary ? handleMenuClick : undefined}
        />
      </div>
      <div className="fixed top-0">
        <ImageCarousel images={diaryInfo.images} canAdd={isMyDiary} onLongPress={handleLongPress} />
      </div>

      <div style={{ height: carouselHeight - 50 }} className="flex-shrink-0"></div>
      <div className="relative z-10 flex-grow">
        <Content
          date={formatDateWithWeek(diaryInfo.date)}
          emotion={diaryInfo.emotion}
          likedCount={diaryInfo.likedCount}
          isLiked={diaryInfo.isLiked}
          content={diaryInfo.content}
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
