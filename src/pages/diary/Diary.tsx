import { useLocation, useNavigate } from "react-router-dom";
import ImageCarousel from "../../components/pages/diary/ImageCarousel";
import Content from "../../components/pages/diary/Content";
import Appbar from "../../components/common/Appbar";
import { formatDateWithWeek } from "../../utils/util";
import { DiaryImage, DiaryInfo } from "../../types/types";
import RoutePaths from "../../constants/routePath";
import { useEffect, useRef, useState } from "react";
import DiaryContentSettings from "../../components/common/BottomSheet/DiaryContentSettings";
import { deleteDiary, deleteImage, putModifiedDiary } from "@/api/api";
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

/**
 * 일기 화면
 * @returns
 */
const Diary = ({ diaryInfo, carouselHeight, isMyDiary }: DiaryProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeModal, setActiveModal] = useState<null | string>(null);
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
    //이미지 다운로드
  };

  const onClickSetMainImage = () => {
    toast("메인 이미지로 설정되었어요");
    setActiveModal(null);
  };

  const handleMenuClick = () => {
    setActiveModal("DiaryContentSettings");
  };

  const handleLongPress = (image: DiaryImage) => {
    setSelectedImage(image);
    setActiveModal("DiaryImageSettings");
  };

  const onClickDeleteImage = async () => {
    if (selectedImage) {
      try {
        await deleteImage({ diaryId: diaryInfo.diaryId, imageId: selectedImage.imageId });
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
    navigate("modify", { state: { diaryInfo: diaryInfo } });
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
      toast("일기가 수정되었어요");
    }
  }, [location.state]);

  return (
    <div className="h-screen overflow-scroll">
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
          menuHandler={handleMenuClick}
        ></Appbar>
      </div>
      <div className="fixed top-0">
        <ImageCarousel images={diaryInfo.images} canAdd={isMyDiary} onLongPress={handleLongPress} />
      </div>
      <div style={{ height: carouselHeight - 50 }}></div>
      <div className="relative z-10">
        <Content
          date={formatDateWithWeek(diaryInfo.date)}
          emotion={diaryInfo.emotion}
          likedCount={diaryInfo.likedCount}
          isLiked={diaryInfo.isLiked}
          content={diaryInfo.content}
        />
      </div>
      {/*하단부터 모달 리팩토링 하고싶음*/}
      <BottomSheet
        onClose={() => setActiveModal(null)}
        isOpen={activeModal === "DiaryContentSettings"}
      >
        <DiaryContentSettings
          isChecked={isPublic}
          onChangeToggle={onChangeToggle}
          onClickDelete={() => setActiveModal("DeleteDiarySettings")}
          onClickModify={onClickModify}
        ></DiaryContentSettings>
      </BottomSheet>
      <BottomSheet
        onClose={() => setActiveModal(null)}
        isOpen={activeModal === "DeleteDiarySettings"}
      >
        <DeleteDiarySettings
          onClickCancle={() => setActiveModal("DiaryContentSettings")}
          onClickDelete={onClickDelete}
          date={formatDateWithWeek(diaryInfo.date)}
        ></DeleteDiarySettings>
      </BottomSheet>
      <BottomSheet
        onClose={() => setActiveModal(null)}
        isOpen={activeModal === "DiaryImageSettings"}
      >
        {selectedImage && (
          <DiaryImageSettings
            onClickDelete={() => setActiveModal("DeleteImageSettings")}
            onClickDownload={onClickDownloadImage}
            onClickSetMain={onClickSetMainImage}
            imgUrl={selectedImage.imageUrl}
          ></DiaryImageSettings>
        )}
      </BottomSheet>
      <BottomSheet
        onClose={() => setActiveModal(null)}
        isOpen={activeModal === "DeleteImageSettings"}
      >
        {selectedImage && (
          <DeleteImageSettings
            onClickCancle={() => setActiveModal("DiaryImageSettings")}
            onClickDelete={onClickDeleteImage}
            imgUrl={selectedImage.imageUrl}
            date={formatDateWithWeek(diaryInfo.date)}
          ></DeleteImageSettings>
        )}
      </BottomSheet>
    </div>
  );
};

export default Diary;
