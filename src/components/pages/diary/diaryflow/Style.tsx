import { useEffect } from "react";
import { getStyles } from "@/api/api";
import { FlowDiaryInfo, Styles } from "@/types/types";
import { FADEINANIMATION } from "@/styles/animations";
import StyleOptionGrid from "../../write/StyleOptionGrid";
import { useLocation } from "react-router-dom";

interface StyleProps {
  diaryInfo: FlowDiaryInfo;
  setDiaryInfo: React.Dispatch<React.SetStateAction<FlowDiaryInfo>>;
  styles: Styles | null;
  setStyles: React.Dispatch<React.SetStateAction<Styles | null>>;
}

const Style = ({ diaryInfo, setDiaryInfo, styles, setStyles }: StyleProps) => {
  const location = useLocation();
  const diaryID = location.state.diaryID;
  useEffect(() => {
    if (diaryID)
      setDiaryInfo((prev) => {
        return { ...prev, diaryId: diaryID };
      });

    const styleInit = async () => {
      const styleData = await getStyles();
      setStyles(styleData);
    };

    styleInit();
  }, []);

  return (
    <div className="flex h-full flex-col gap-[2rem] font-Binggrae text-gray-900 dark:text-gray-50">
      <div className={`${FADEINANIMATION[0]} font-BinggraeBold text-title-2`}>
        <span className="text-primary-medium dark:text-primary-light-3">화풍</span>을 선택해 주세요
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
    </div>
  );
};

export default Style;
