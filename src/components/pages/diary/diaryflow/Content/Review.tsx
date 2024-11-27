import { FADEINANIMATION } from "@/styles/animations";
import { FlowDiaryInfo } from "@/types/types";
import ReviewContent from "../../../write/ReviewContent";
import { formatDateWithWeek } from "@/utils/util";
import DiaryFlowLayout from "../Layout";
import Button from "@/components/common/Button/Button";
import useGetReviewInfo from "@/hooks/query/useGetReviewInfo";
import ReviewSkeleton from "../skeleton/ReviewSkeleton";
import ApiBoundary from "@/components/boundary/ApiBoundary";

interface ReviewProps {
  diaryInfo: FlowDiaryInfo;
  onClickNext: () => void;
}

const Review = ({ diaryInfo, onClickNext }: ReviewProps) => {
  const onClickNextHandler = () => {
    onClickNext();
  };

  return (
    <>
      <DiaryFlowLayout>
        <ApiBoundary fallback={<ReviewSkeleton />} message="비슷한 일기를 찾지 못했어요...">
          <ReviewContainer diaryInfo={diaryInfo} />
        </ApiBoundary>
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

interface ReviewContainerProps {
  diaryInfo: FlowDiaryInfo;
}

const ReviewContainer = ({ diaryInfo }: ReviewContainerProps) => {
  const { reviewDiaryInfo } = useGetReviewInfo(diaryInfo.content, diaryInfo.date);
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
  );
};
