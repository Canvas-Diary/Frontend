import ReviewContent from "../../components/pages/write/ReviewContent";

const Review = () => {
  return (
    <div className="flex h-full flex-col gap-[2rem] font-Binggrae text-gray-900">
      <div className="font-BinggraeBold text-title-2">
        <span className="text-primary-medium">한달 전</span>에<br />
        비슷한 일기를 작성했어요
      </div>
      <div className="flex-grow">
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
