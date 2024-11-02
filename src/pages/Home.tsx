import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Calendar from "../components/pages/home/Calendar";
import RoutePaths from "../constants/routePath";
import { formatDate, getTodayDate } from "../utils/util";
import { useEffect, useState } from "react";
import { getMonthlyDiariesByDate } from "../api/api";
import { diary } from "../types/types";

interface CalendarData {
  diaries: diary[];
}

/**
 * 메인 화면
 * @returns
 */
const Home = () => {
  const [calendarData, setCalendarData] = useState<CalendarData>({ diaries: [] });
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  const onClickCreateDiary = () => {
    navigate(RoutePaths.diaryWrite, { state: { date: getTodayDate() } });
  };

  const onClickDate = (id: number) => {
    navigate(`diary/${id}`);
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const prevMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      calendarInit(prevMonth);
      return prevMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const nextMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      calendarInit(nextMonth);
      return nextMonth;
    });
  };

  const calendarInit = async (currentDate: Date) => {
    const diaries = await getMonthlyDiariesByDate(formatDate(currentDate));
    setCalendarData(diaries);
  };

  useEffect(() => {
    calendarInit(new Date());
  }, []);

  return (
    <div className="flex h-full flex-grow flex-col justify-between overflow-scroll">
      <Calendar
        onClickDate={onClickDate}
        calendarData={calendarData}
        currentDate={currentDate}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
      ></Calendar>
      <div className="my-4 flex justify-center">
        <Button
          size="big"
          active={true}
          text="오늘 일기 작성하기"
          onClickHandler={onClickCreateDiary}
          bgColor="dark"
        />
      </div>
    </div>
  );
};

export default Home;
