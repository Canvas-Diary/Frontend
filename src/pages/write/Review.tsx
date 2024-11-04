import { useEffect, useState } from "react";
import ReviewContent from "../../components/pages/write/ReviewContent";
import { FADEINANIMATION } from "../../styles/animations";
import { DiaryInfo } from "../../types/types";
import { getMyDiaryInfoById } from "../../api/api";

const dummyId = "0192f5d7-c29d-5b55-4b74-f1c412201dea";

const Review = () => {
  const [diaryInfo, setDiaryInfo] = useState<DiaryInfo | null>(null);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const data = await getMyDiaryInfoById(dummyId);
        setDiaryInfo(data);
      } catch (error) {
        setDiaryInfo(null);
      }
    };

    fetchDiary();
  }, []);

  return (
    <div className="flex h-full flex-col gap-[2rem] font-Binggrae text-gray-900">
      <div className={`${FADEINANIMATION[0]} font-BinggraeBold text-title-2`}>
        <span className="text-primary-medium">한달 전</span>에<br />
        비슷한 일기를 작성했어요
      </div>
      <div className={`${FADEINANIMATION[1]} flex-grow pb-[2rem]`}>
        {diaryInfo && (
          <ReviewContent
            date={diaryInfo.date}
            emotion={diaryInfo.emotion}
            content={diaryInfo.content}
            likedCount={diaryInfo.likedCount}
            isLiked={diaryInfo.isLiked}
            images={diaryInfo.images}
          ></ReviewContent>
        )}
      </div>
    </div>
  );
};

export default Review;
