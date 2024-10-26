import { useLocation, useOutletContext } from "react-router-dom";
import { formatDate } from "../../utils/util";
import { ContextProps } from "./Layout/DiaryLayout";

const Write = () => {
  const location = useLocation();
  const date = location.state.date;
  const { diaryInfo, setDiaryInfo } = useOutletContext<ContextProps>();

  return (
    <div className="flex h-full flex-col gap-600 font-Binggrae text-gray-900">
      <div className="font-BinggraeBold text-title-2">{formatDate(date)}</div>
      <div className="flex items-center gap-300 text-body-2">
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
      <hr className="w-full border border-gray-100" />
      <textarea
        className="flex-grow font-Binggrae text-body-2"
        value={diaryInfo.diary}
        onChange={(e) => {
          setDiaryInfo({ ...diaryInfo, diary: e.target.value });
        }}
      ></textarea>
    </div>
  );
};

export default Write;
