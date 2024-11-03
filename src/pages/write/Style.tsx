import { useOutletContext } from "react-router-dom";
import StyleOptionGrid from "../../components/pages/write/StyleOptionGrid";
import { ContextProps } from "./Layout/DiaryWriteFlowLayout";
import { FADEINANIMATION } from "../../styles/animations";
import { useEffect, useState } from "react";
import { Styles } from "../../types/types";
import { getStyles } from "../../api/api";

const Style = () => {
  const { diaryInfo, setDiaryInfo } = useOutletContext<ContextProps>();
  const [styles, setStyle] = useState<Styles | null>(null);

  useEffect(() => {
    const styleInit = async () => {
      const styleData = await getStyles();
      setStyle(styleData);
    };

    styleInit();
  }, []);

  return (
    <div className="flex h-full flex-col gap-[2rem] font-Binggrae text-gray-900">
      <div className={`${FADEINANIMATION[0]} font-BinggraeBold text-title-2`}>
        <span className="text-primary-medium">화풍</span>을 선택해 주세요
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
