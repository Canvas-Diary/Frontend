import { getReview } from "@/api/api";
import { ReviewDiaryInfo } from "@/types/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetReviewInfo = (content: string, date: string) => {
  const diaryInfoOption = {
    queryKey: ["reviewDiaryInfo", content, date],
    queryFn: () => getReview({ content, date }),
    retry: false,
  };

  const { data: reviewDiaryInfo } = useSuspenseQuery<ReviewDiaryInfo>(diaryInfoOption);

  return { reviewDiaryInfo };
};

export default useGetReviewInfo;
