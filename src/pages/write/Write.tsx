import { useLocation, useOutletContext } from "react-router-dom";
import { formatDateWithWeek } from "../../utils/util";
import { ContextProps } from "./Layout/DiaryWriteFlowLayout";
import { FADEINANIMATION } from "../../styles/animations";

const Write = () => {
  const location = useLocation();
  const date = location.state.date;
  const { diaryInfo, setDiaryInfo } = useOutletContext<ContextProps>();

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
        <button
          className="ml-auto"
          onClick={() => {
            setDiaryInfo({ ...diaryInfo, isPublic: !diaryInfo.isPublic });
          }}
        >
          토글
        </button>
      </div>
      <hr className={`${FADEINANIMATION[2]} w-full border border-gray-100`} />
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
