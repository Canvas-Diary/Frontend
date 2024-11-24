import { getReview } from "@/api/api";
import { FADEINANIMATION } from "@/styles/animations";
import { FlowDiaryInfo, ReviewDiaryInfo } from "@/types/types";
import { useEffect, useState } from "react";
import ReviewContent from "../../write/ReviewContent";
import { formatDateWithWeek } from "@/utils/util";

interface ReviewProps {
  diaryInfo: FlowDiaryInfo;
}

const Review = ({ diaryInfo }: ReviewProps) => {
  const [reviewDiaryInfo, setReviewDiaryInfo] = useState<ReviewDiaryInfo | null>(null);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const data = await getReview({ content: diaryInfo!.content, date: diaryInfo!.date });
        setReviewDiaryInfo(data);
      } catch (error) {
        setReviewDiaryInfo(null);
      }
    };

    fetchDiary();
  }, []);

  return (
    <div className="flex h-full flex-col gap-[2rem] font-Binggrae text-gray-900 dark:text-gray-50">
      <div className={`${FADEINANIMATION[0]} font-BinggraeBold text-title-2`}>
        <span className="text-primary-medium dark:text-primary-light-3">한달 전</span>에<br />
        비슷한 일기를 작성했어요
      </div>
      <div className={`${FADEINANIMATION[1]} flex-grow pb-[2rem]`}>
        {reviewDiaryInfo && (
          <ReviewContent
            date={formatDateWithWeek(reviewDiaryInfo.date)}
            emotion={reviewDiaryInfo.emotion}
            content={reviewDiaryInfo.content}
            likedCount={reviewDiaryInfo.likedCount}
            isLiked={reviewDiaryInfo.isLiked}
            images={reviewDiaryInfo.images}
          ></ReviewContent>
        )}
      </div>
    </div>
  );
};

export default Review;
