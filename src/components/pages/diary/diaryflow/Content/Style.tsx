import { useEffect } from "react";
import { createDiaryAndGetId, getStyles, postImageToDiary } from "@/api/api";
import { FlowDiaryInfo, Styles } from "@/types/types";
import { FADEINANIMATION } from "@/styles/animations";
import StyleOptionGrid from "../../../write/StyleOptionGrid";
import { useLocation } from "react-router-dom";
import DiaryFlowLayout from "../Layout";
import Button from "@/components/common/Button/Button";
import { DIARY_FLOW, Flow } from "@/constants/DIARY_FLOW";
import { useErrorBoundary } from "react-error-boundary";

interface StyleProps {
  diaryInfo: FlowDiaryInfo;
  setDiaryInfo: React.Dispatch<React.SetStateAction<FlowDiaryInfo>>;
  styles: Styles | null;
  setStyles: React.Dispatch<React.SetStateAction<Styles | null>>;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  onClickNext: () => void;
}

const Style = ({
  diaryInfo,
  setDiaryInfo,
  styles,
  setStyles,
  setIsLoaded,
  onClickNext,
}: StyleProps) => {
  const location = useLocation();
  const diaryId = location.state.diaryId;
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const flow = urlParams.get("flow") as Flow;
  const { showBoundary } = useErrorBoundary();

  const onClickNextHandler = () => {
    if (flow === DIARY_FLOW.ADD) {
      postImageToDiary({ diaryId: diaryInfo.diaryId!, style: diaryInfo.style })
        .then(() => {
          setIsLoaded(true);
        })
        .catch((error) => {
          throw error;
        });
    } else if (flow === DIARY_FLOW.CREATE) {
      createDiaryAndGetId(diaryInfo)
        .then((id) => {
          setDiaryInfo((prev) => {
            return { ...prev, diaryId: id };
          });
          setIsLoaded(true);
        })
        .catch((error) => {
          showBoundary(error);
        });
    }
    onClickNext();
  };

  useEffect(() => {
    if (diaryId)
      setDiaryInfo((prev) => {
        return { ...prev, diaryId: diaryId };
      });

    const styleInit = async () => {
      const styleData = await getStyles();
      setStyles(styleData);
    };

    styleInit();
  }, []);

  return (
    <>
      <DiaryFlowLayout>
        <div className={`${FADEINANIMATION[0]} font-BinggraeBold text-title-2`}>
          <span className="text-primary-medium dark:text-primary-light-3">화풍</span>을 선택해
          주세요
        </div>
        {styles && (
          <StyleOptionGrid
            styles={styles.styles}
            onClickStyle={(style: string) => {
              setDiaryInfo({ ...diaryInfo, style: style });
            }}
            selectedStyle={diaryInfo.style}
          />
        )}
      </DiaryFlowLayout>
      <Button
        className="mx-auto mb-4"
        size="big"
        active={diaryInfo.style !== ""}
        text="다음으로"
        onClickHandler={onClickNextHandler}
        bgColor="dark"
      />
    </>
  );
};

export default Style;
