import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Calendar from "../components/pages/home/Calendar";
import RoutePaths from "../constants/routePath";
import { formatDate, getTodayDate } from "../utils/util";
import { useEffect, useState } from "react";
import { getMonthlyDiariesByDate } from "../api/api";
import { Diaries } from "../types/types";

/**
 * 메인 화면
 * @returns
 */
const Home = () => {
  const [calendarData, setCalendarData] = useState<Diaries>({ diaries: [] });
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  const onClickCreateDiary = () => {
    navigate(RoutePaths.diaryWrite, { state: { date: getTodayDate() } });
  };

  const onClickDate = (id: string) => {
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

  // useEffect(() => {
  //   // URL의 쿼리 문자열에서 access_token과 refresh_token을 획득
  //   const queryString = window.location.search;
  //   const params = new URLSearchParams(queryString);

  //   const accessToken = params.get("access");
  //   const refreshToken = params.get("refresh");

  //   if (accessToken && refreshToken) {
  //     localStorage.setItem("access_token", accessToken);
  //     localStorage.setItem("refresh_token", refreshToken);
  //     window.location.href = "/";
  //   } else {
  //     const token = localStorage.getItem("access_token");
  //     if (!token) {
  //       navigate(RoutePaths.login);
  //       return;
  //     }
  //   }

  //   calendarInit(new Date());
  // }, [navigate]);

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
