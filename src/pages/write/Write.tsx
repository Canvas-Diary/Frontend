import { useLocation, useOutletContext } from "react-router-dom";
import { formatDateWithWeek } from "../../utils/util";
import { ContextProps } from "./Layout/DiaryWriteFlowLayout";
import { FADEINANIMATION } from "../../styles/animations";
import { useEffect } from "react";
import Toggle from "../../components/common/Toggle";
import Divider from "../../components/common/Divider";

const Write = () => {
  const location = useLocation();
  const date = location.state.date;
  const { diaryInfo, setDiaryInfo } = useOutletContext<ContextProps>();

  useEffect(() => {
    setDiaryInfo({ ...diaryInfo, date: date });
  }, []);

  return (
    <div className="flex h-full flex-col gap-600 font-Binggrae text-gray-900">
      <div className={`${FADEINANIMATION[0]} font-BinggraeBold text-title-2`}>
        {formatDateWithWeek(date)}
      </div>
      <div className={`${FADEINANIMATION[1]} flex items-center gap-300 text-body-2`}>
        <div className="font-Binggrae text-gray-500">공개 여부</div>
        <div className="flex items-center justify-center rounded-50 bg-primary-light-2 px-300 py-200">
          {diaryInfo.isPublic ? "공개" : "비공개"}
        </div>
        <div className="ml-auto">
          <Toggle
            onClickHandler={() => setDiaryInfo({ ...diaryInfo, isPublic: !diaryInfo.isPublic })}
            isChecked={diaryInfo.isPublic}
          ></Toggle>
        </div>
      </div>
      <Divider style={FADEINANIMATION[2]} />
      <textarea
        className={`${FADEINANIMATION[3]} flex-grow font-Binggrae text-body-2`}
        value={diaryInfo.content}
        onChange={(e) => {
          setDiaryInfo({ ...diaryInfo, content: e.target.value });
        }}
        placeholder="10자 이상 입력해주세요"
      ></textarea>
    </div>
  );
};

export default Write;
