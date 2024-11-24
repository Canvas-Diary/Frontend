import { DIARY_STEP } from "@/constants/DIARY_FLOW";
import { FlowDiaryInfo, Styles } from "@/types/types";
import { Draw, Modify, Review, Style, Write } from "./Content";

interface DiaryFlowContentProps {
  currentIndex: number;
  steps: string[];
  diaryInfo: FlowDiaryInfo;
  setDiaryInfo: React.Dispatch<React.SetStateAction<FlowDiaryInfo>>;
  onClickNext: () => void;
  styles: Styles | null;
  setStyles: React.Dispatch<React.SetStateAction<Styles | null>>;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiaryFlowContent = ({
  currentIndex,
  steps,
  diaryInfo,
  setDiaryInfo,
  onClickNext,
  styles,
  setStyles,
  isLoaded,
  setIsLoaded,
}: DiaryFlowContentProps) => {
  switch (steps[currentIndex]) {
    case DIARY_STEP.WRITE:
      return <Write diaryInfo={diaryInfo} setDiaryInfo={setDiaryInfo} onClickNext={onClickNext} />;
    case DIARY_STEP.STYLE:
      return (
        <Style
          diaryInfo={diaryInfo}
          setDiaryInfo={setDiaryInfo}
          styles={styles}
          setStyles={setStyles}
          setIsLoaded={setIsLoaded}
          onClickNext={onClickNext}
        />
      );
    case DIARY_STEP.REVIEW:
      return <Review diaryInfo={diaryInfo} onClickNext={onClickNext} />;
    case DIARY_STEP.DRAW:
      return (
        <Draw isLoaded={isLoaded} styles={styles} diaryInfo={diaryInfo} onClickNext={onClickNext} />
      );
    case DIARY_STEP.MODIFY:
      return <Modify diaryInfo={diaryInfo} setDiaryInfo={setDiaryInfo} onClickNext={onClickNext} />;
    default:
      return null;
  }
};

export default DiaryFlowContent;
