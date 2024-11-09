import { useLocation, useNavigate } from "react-router-dom";
import ImageCarousel from "../../components/pages/diary/ImageCarousel";
import Content from "../../components/pages/diary/Content";
import Appbar from "../../components/common/Appbar";
import { formatDateWithWeek } from "../../utils/util";
import { DiaryInfo } from "../../types/types";
import RoutePaths from "../../constants/routePath";
import { useState } from "react";
import DiaryContentSettings from "../../components/common/BottomSheet/DiaryContentSettings";

interface DiaryProps {
  diaryInfo: DiaryInfo;
  carouselHeight: number;
  isMyDiary: boolean;
}

/**
 * 일기 화면
 * @returns
 */
const Diary = ({ diaryInfo, carouselHeight, isMyDiary }: DiaryProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick = () => {
    setIsModalOpen(true);
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
        <DiaryContentSettings
          onClose={() => setIsModalOpen(false)}
          onChangeToggle={() => {}}
          onClickDelete={() => {}}
          onClickModify={() => {
            navigate("modify", { state: { diaryInfo: diaryInfo } });
          }}
        ></DiaryContentSettings>
      )}
    </div>
  );
};

export default Diary;
