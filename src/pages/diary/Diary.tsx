import { useParams } from "react-router-dom";
import useFetchDiary from "@/hooks/query/useGetDiaryInfo";
import DiaryComponent from "@/components/pages/diary/diary/DiaryComponent";

/**
 * 일기 화면 레이아웃
 * 로딩, 일기 화면, 일기 없는 화면 관리
 * @returns
 */
const Diary = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const { diaryInfo, refetch } = useFetchDiary(diaryId!);

  return <DiaryComponent diaryInfo={diaryInfo} isMyDiary={diaryInfo.isMine} retry={refetch} />;
};

export default Diary;
