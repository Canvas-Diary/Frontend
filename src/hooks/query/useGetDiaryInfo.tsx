import { useSuspenseQuery } from "@tanstack/react-query";
import { getDiaryInfoById } from "@/api/api";
import { DiaryInfo } from "@/types/types";

const useFetchDiary = (diaryId: string) => {
  const diaryInfoOption = {
    queryKey: ["diaryInfo", diaryId],
    queryFn: () => getDiaryInfoById(diaryId),
  };

  const { data: diaryInfo, refetch } = useSuspenseQuery<DiaryInfo>(diaryInfoOption);

  return { diaryInfo, refetch };
};

export default useFetchDiary;