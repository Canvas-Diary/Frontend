import ReviewContent from "../../components/pages/write/ReviewContent";
import { FADEINANIMATION } from "../../styles/animations";

const Review = () => {
  return (
    <div className="flex h-full flex-col gap-[2rem] font-Binggrae text-gray-900">
      <div className={`${FADEINANIMATION[0]} font-BinggraeBold text-title-2`}>
        <span className="text-primary-medium">한달 전</span>에<br />
        비슷한 일기를 작성했어요
      </div>
      <div className={`${FADEINANIMATION[1]} flex-grow pb-[2rem]`}>
        <ReviewContent
          date="2024"
          emotion=""
          content="일기"
          likedCount={10}
          isLiked={false}
        ></ReviewContent>
      </div>
    </div>
  );
};

export default Review;
