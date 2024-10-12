import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Calendar from "../components/pages/home/Calendar";

//임시 더미 데이터
const CalendarData = {
  diaries: [
    {
      diaryId: 1,
      date: "2024-09-10",
      emotion: "angry",
    },
    {
      diaryId: 2,
      date: "2024-09-11",
      emotion: "afraid",
    },
    {
      diaryId: 3,
      date: "2024-09-12",
      emotion: "dislike",
    },
    {
      diaryId: 4,
      date: "2024-09-13",
      emotion: "happy",
    },
    {
      diaryId: 5,
      date: "2024-09-14",
      emotion: "non",
    },
    {
      diaryId: 6,
      date: "2024-09-15",
      emotion: "sad",
    },
    {
      diaryId: 7,
      date: "2024-09-16",
      emotion: "shy",
    },
    {
      diaryId: 8,
      date: "2024-09-17",
      emotion: "surprised",
    },
    {
      diaryId: 9,
      date: "2024-09-18",
      emotion: "wonder",
    },
    {
      diaryId: 10,
      date: "2024-09-19",
      emotion: "angry",
    },
    {
      diaryId: 11,
      date: "2024-09-20",
      emotion: "afraid",
    },
    {
      diaryId: 12,
      date: "2024-09-21",
      emotion: "dislike",
    },
    {
      diaryId: 13,
      date: "2024-09-22",
      emotion: "happy",
    },
    {
      diaryId: 14,
      date: "2024-09-23",
      emotion: "non",
    },
    {
      diaryId: 15,
      date: "2024-09-24",
      emotion: "sad",
    },
    {
      diaryId: 16,
      date: "2024-09-25",
      emotion: "shy",
    },
  ],
};

/**
 * 메인 화면
 * @returns
 */
const Home = () => {
  const navigate = useNavigate();
  const onClickCreateDiary = () => {
    //일기 작성하기
  };

  const onClickDate = (id: number) => {
    navigate(`diary/${id}`);
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <Calendar onClickDate={onClickDate} calendarData={CalendarData}></Calendar>
      <div className="mb-4 flex justify-center">
        <Button
          size="big"
          active={true}
          text="오늘 일기 작성하기"
          onClickHandler={onClickCreateDiary}
        />
      </div>
    </div>
  );
};

export default Home;
