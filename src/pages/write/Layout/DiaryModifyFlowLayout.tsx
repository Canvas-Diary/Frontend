import { Outlet, useNavigate } from "react-router-dom";
import Appbar from "../../../components/common/Appbar";
import MobileLayout from "../../Layout/MobileLayout";
import Button from "../../../components/common/Button";
import { useState } from "react";
// import RoutePaths from "../../../constants/routePath";

// const modifyOrder = [RoutePaths.diaryWrite];
// const addImageOrder = [RoutePaths.diaryReview, RoutePaths.diaryDraw];

const DiaryModifyFlowLayout = () => {
  const navigate = useNavigate();
  const [diaryInfo, setDiaryInfo] = useState({});

  const onClickNext = async () => {};

  const handleActive = () => {
    return true;
  };

  return (
    <MobileLayout>
      <Appbar text="일기 수정" backHandler={() => navigate(-1)}></Appbar>
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
    </MobileLayout>
  );
};

export default DiaryModifyFlowLayout;
