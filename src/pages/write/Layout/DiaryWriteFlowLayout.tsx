import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Appbar from "../../../components/common/Appbar";
import Button from "../../../components/common/Button";
import RoutePaths from "../../../constants/routePath";
import { useState } from "react";
import { createDiaryAndGetId } from "../../../api/api";
import { useErrorBoundary } from "react-error-boundary";
import MobileLayout from "../../Layout/MobileLayout";
import { getTodayDate } from "../../../utils/util";
import { NewDiaryInfo } from "../../../types/types";

const pageOrder = [
  RoutePaths.diaryWrite,
  RoutePaths.diaryStyle,
  RoutePaths.diaryReview,
  RoutePaths.diaryDraw,
];

export interface ContextProps {
  diaryInfo: NewDiaryInfo;
  setDiaryInfo: Function;
  diaryId: string;
}

const DiaryWriteFlowLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showBoundary } = useErrorBoundary();
  const [diaryId, setDiaryId] = useState("0");
  const [diaryInfo, setDiaryInfo] = useState<NewDiaryInfo>({
    date: getTodayDate(),
    content: "",
    isPublic: true,
    style: "",
  });

  const onClickNext = async () => {
    const currentIndex = pageOrder.indexOf(location.pathname);

    if (currentIndex !== -1 && currentIndex < pageOrder.length - 1) {
      if (currentIndex === 1) {
        createDiaryAndGetId(diaryInfo)
          .then((id) => {
            setDiaryId(id);
          })
          .catch((error) => {
            showBoundary(error);
          });
        navigate(pageOrder[currentIndex + 1]);
      } else {
        navigate(pageOrder[currentIndex + 1]);
      }
    } else {
      navigate(`${RoutePaths.diary}/${diaryId}`, { state: { from: RoutePaths.diaryDraw } });
    }
  };

  const handleBack = () => {
    const currentIndex = pageOrder.indexOf(location.pathname);

    switch (currentIndex) {
      case 2:
        //do nothing
        break;
      default:
        navigate(-1);
        break;
    }
  };

  const handleActive = () => {
    const currentIndex = pageOrder.indexOf(location.pathname);

    switch (currentIndex) {
      case 0:
        if (diaryInfo.content.length < 10) return false;
        else return true;
      case 1:
        if (diaryInfo.style === "") return false;
        else return true;
      case 3:
        if (diaryId === "0") return false;
        else return true;
    }

    return true;
  };

  return (
    <MobileLayout>
      <Appbar text="일기 작성" backHandler={handleBack}></Appbar>
      <div className="flex-grow overflow-scroll px-800 py-300">
        <Outlet context={{ diaryInfo, setDiaryInfo, diaryId }} />
      </div>
      <div className="my-4 flex justify-center">
        <Button
          size="big"
          active={handleActive()}
          text="다음으로"
          onClickHandler={onClickNext}
          bgColor="dark"
        />
      </div>
    </MobileLayout>
  );
};

export default DiaryWriteFlowLayout;