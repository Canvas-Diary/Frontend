import StyleOptionGrid from "../write/StyleOptionGrid";
import { FADEINANIMATION } from "../../../styles/animations";
import { useEffect } from "react";
import { getStyles } from "@/api/api";
import { NewDiaryInfo, Styles } from "@/types/types";

interface StyleProps {
  diaryInfo: NewDiaryInfo;
  setDiaryInfo: React.Dispatch<React.SetStateAction<NewDiaryInfo>>;
  styles: Styles | null;
  setStyles: React.Dispatch<React.SetStateAction<Styles | null>>;
}

const Style = ({ diaryInfo, setDiaryInfo, styles, setStyles }: StyleProps) => {
  useEffect(() => {
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
