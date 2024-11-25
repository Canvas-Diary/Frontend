import { FlowDiaryInfo, Styles } from "@/types/types";
import { getTodayDate } from "@/utils/util";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Appbar from "@/components/common/Appbar/Appbar";
import DiaryFlowModalContainer from "@/components/pages/diary/diaryflow/modal";
import { DIARY_FLOW, DIARY_STEP, Flow, Step } from "@/constants/DIARY_FLOW";
import DiaryFlowContent from "@/components/pages/diary/diaryflow";

const stepsByFlow = {
  [DIARY_FLOW.CREATE]: [DIARY_STEP.WRITE, DIARY_STEP.STYLE, DIARY_STEP.REVIEW, DIARY_STEP.DRAW],
  [DIARY_FLOW.ADD]: [DIARY_STEP.STYLE, DIARY_STEP.DRAW],
  [DIARY_FLOW.MODIFY]: [DIARY_STEP.MODIFY],
};

const DiaryFlow = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(search);
  const flow = urlParams.get("flow") as Flow;
  const steps = stepsByFlow[flow];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [styles, setStyles] = useState<Styles | null>(null);
  const [diaryInfo, setDiaryInfo] = useState<FlowDiaryInfo>({
    date: getTodayDate(),
    content: "",
    isPublic: true,
    style: "",
    weightedContents: [],
  });

  const onClickNext = () => {
    if (currentIndex < steps.length) setCurrentIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentIndex > 0 && currentIndex !== 2) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <Appbar text="일기 작성" backHandler={handleBack} />
      <DiaryFlowContent
        currentIndex={currentIndex}
        steps={steps}
        diaryInfo={diaryInfo}
        setDiaryInfo={setDiaryInfo}
        onClickNext={onClickNext}
        styles={styles}
        setStyles={setStyles}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
      />
      <DiaryFlowModalContainer
        currentIndex={currentIndex}
        currentStep={steps[currentIndex] as Step}
      />
    </>
  );
};

export default DiaryFlow;
