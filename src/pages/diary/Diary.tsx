import { useLocation, useNavigate } from "react-router-dom";
import ImageCarousel from "../../components/pages/diary/ImageCarousel";
import Content from "../../components/pages/diary/Content";
import Appbar from "../../components/common/Appbar";
import { formatDateWithWeek } from "../../utils/util";
import { DiaryInfo } from "../../types/types";
import RoutePaths from "../../constants/routePath";
import { useEffect, useRef, useState } from "react";
import DiaryContentSettings from "../../components/common/BottomSheet/DiaryContentSettings";
import { deleteDiary, putModifiedDiary } from "@/api/api";
import BottomSheet from "@/components/common/BottomSheet/BottomSheet";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPublic, setIsPublic] = useState(diaryInfo.isPublic);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMenuClick = () => {
    setIsModalOpen(true);
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

  return (
    <div className="h-screen overflow-scroll">
      <div className="fixed top-0 z-10 w-full">
        <Appbar
          backHandler={() => {
            if (location.state?.from === RoutePaths.diaryDraw) {
              navigate("/");
            } else {
              navigate(-1);
            }
          }}
          menuHandler={handleMenuClick}
        ></Appbar>
      </div>

      <div className="fixed top-0">
        <ImageCarousel images={diaryInfo.images} canAdd={isMyDiary} />
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
      {isModalOpen && (
        <BottomSheet onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
          <DiaryContentSettings
            isChecked={isPublic}
            onChangeToggle={onChangeToggle}
            onClickDelete={onClickDelete}
            onClickModify={onClickModify}
          ></DiaryContentSettings>
        </BottomSheet>
      )}
    </div>
  );
};

export default Diary;
