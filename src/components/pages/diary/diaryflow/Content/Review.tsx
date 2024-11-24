import { getReview } from "@/api/api";
import { FADEINANIMATION } from "@/styles/animations";
import { FlowDiaryInfo, ReviewDiaryInfo } from "@/types/types";
import { useEffect, useState } from "react";
import ReviewContent from "../../../write/ReviewContent";
import { formatDateWithWeek } from "@/utils/util";
import DiaryFlowLayout from "../Layout";
import Button from "@/components/common/Button/Button";

interface ReviewProps {
  diaryInfo: FlowDiaryInfo;
  onClickNext: () => void;
}

const Review = ({ diaryInfo, onClickNext }: ReviewProps) => {
  const [reviewDiaryInfo, setReviewDiaryInfo] = useState<ReviewDiaryInfo | null>(null);

  const onClickNextHandler = () => {
    onClickNext();
  };

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const data = await getReview({ content: diaryInfo.content, date: diaryInfo.date });
        setReviewDiaryInfo(data);
      } catch (error) {
        setReviewDiaryInfo(null);
      }
    };

    fetchDiary();
  }, []);

  const typeText = (type: "YEAR" | "MONTH" | "KEYWORD") => {
    switch (type) {
      case "KEYWORD":
        return "비슷한 내용";
      case "MONTH":
        return "한달 전";
      case "YEAR":
        return "일년 전";
    }
  };

  return (
    <>
      <DiaryFlowLayout>
        {reviewDiaryInfo && (
          <>
            <div className={`${FADEINANIMATION[0]} font-BinggraeBold text-title-2`}>
              <span className="text-primary-medium dark:text-primary-light-3">
                {typeText(reviewDiaryInfo.type)}
              </span>
              의<br />
              일기를 확인해보세요
            </div>
            <div className={`${FADEINANIMATION[1]} flex-grow pb-[2rem]`}>
              <ReviewContent
                date={formatDateWithWeek(reviewDiaryInfo.date)}
                emotion={reviewDiaryInfo.emotion}
                content={reviewDiaryInfo.content}
                likedCount={reviewDiaryInfo.likedCount}
                isLiked={reviewDiaryInfo.isLiked}
                images={reviewDiaryInfo.images}
              ></ReviewContent>
            </div>
          </>
        )}
      </DiaryFlowLayout>
      <Button
        className="mx-auto mb-4"
        size="big"
        active={true}
        text="다음으로"
        onClickHandler={onClickNextHandler}
        bgColor="dark"
      />
    </>
  );
};

export default Review;
