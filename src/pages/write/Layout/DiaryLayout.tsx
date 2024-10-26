import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Appbar from "../../../components/common/Appbar";
import Button from "../../../components/common/Button";
import RoutePaths from "../../../constants/routePath";
import { useState } from "react";

const pageOrder = [
  RoutePaths.diaryWrite,
  RoutePaths.diaryStyle,
  RoutePaths.diaryReview,
  RoutePaths.diaryDraw,
];

export interface ContextProps {
  diaryInfo: {
    diary: string;
    isPublic: boolean;
    style: string;
  };
  setDiaryInfo: Function;
}

const DiaryLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [diaryInfo, setDiaryInfo] = useState({
    diary: "",
    isPublic: true,
    style: "",
  });

  const onClickNext = () => {
    const currentIndex = pageOrder.indexOf(location.pathname);
    if (currentIndex !== -1 && currentIndex < pageOrder.length - 1) {
      navigate(pageOrder[currentIndex + 1]);
    }
  };

  const handleActive = () => {
    const currentIndex = pageOrder.indexOf(location.pathname);

    switch (currentIndex) {
      case 0:
        if (diaryInfo.diary === "") return false;
        else return true;
      case 1:
        if (diaryInfo.style === "") return false;
        else return true;
    }

    return true;
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      <Appbar
        text="일기 작성"
        backHandler={() => {
          navigate(-1);
        }}
      ></Appbar>
      <div className="flex-grow overflow-scroll px-800 py-300">
        <Outlet context={{ diaryInfo, setDiaryInfo }} />
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
    </div>
  );
};

export default DiaryLayout;
