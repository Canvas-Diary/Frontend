import { ReactNode, useEffect, useState } from "react";
import ArrowLeft from "../../../assets/svg/arrow_left.svg?react";
import ArrowRight from "../../../assets/svg/arrow_right.svg?react";
import afraid from "../../../assets/icon/afraid.png";
import angry from "../../../assets/icon/angry.png";
import defaultIcon from "../../../assets/icon/defaultIcon.png";
import dislike from "../../../assets/icon/dislike.png";
import happy from "../../../assets/icon/happy.png";
import non from "../../../assets/icon/non.png";
import sad from "../../../assets/icon/sad.png";
import shy from "../../../assets/icon/shy.png";
import surprised from "../../../assets/icon/surprised.png";
import wonder from "../../../assets/icon/wonder.png";
import { Diaries } from "../../../types/types";
import CalendarDate from "./CalendarDate";

const emotionImages: { [key: string]: string } = {
  JOY: happy,
  SADNESS: sad,
  ANGER: angry,
  FEAR: afraid,
  DISGUST: dislike,
  NONE: non,
  SHAMEhy: shy,
  SURPRISE: surprised,
  CURIOSITY: wonder,
  default: defaultIcon,
};

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
const months = [" 1", " 2", " 3", " 4", " 5", " 6", " 7", " 8", " 9", "10", "11", "12"];

interface CalendarProps {
  calendarData: Diaries;
  onClickDate: (id: string) => void;
  currentDate: Date;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
}

/**
 * 메인 화면의 일기 정보를 표시하는 달력
 * @param calendarData 일기 정보
 * @param onClickDate 날짜를 눌렀을 때 실행할 콜백 함수
 * @returns
 */
const Calendar = ({
  onClickDate,
  calendarData,
  currentDate,
  handlePrevMonth,
  handleNextMonth,
}: CalendarProps) => {
  const [calendarDays, setCalendarDays] = useState<ReactNode[]>([]);

  useEffect(() => {
    const calendar = generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    setCalendarDays(calendar);
  }, [calendarData, currentDate]);

  const generateCalendar = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const days = [];

    // 이전 달의 빈 칸 생성
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    // 달의 날짜 생성
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        year === new Date().getFullYear() &&
        month === new Date().getMonth() &&
        day === new Date().getDate();

      const isSunday = new Date(year, month, day).getDay() === 0;

      const matchingDiary = calendarData.diaries.find(
        (diary) =>
          diary.date ===
          `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      );

      const calendarDataInfo = {
        date: day,
        diaryId: matchingDiary
          ? matchingDiary.diaryId
          : `${year}-${month + 1}-${String(day).padStart(2, "0")}`,
        emotion: matchingDiary ? matchingDiary.emotion : "none",
        calendarIcon: matchingDiary ? emotionImages[matchingDiary.emotion] : emotionImages.default,
        isToday: isToday,
        isSunday: isSunday,
      };

      days.push(
        <CalendarDate
          key={calendarDataInfo.diaryId}
          onClickDate={onClickDate}
          calendarDataInfo={calendarDataInfo}
        />
      );
    }

    return days;
  };

  return (
    <div className="flex flex-col items-stretch gap-300">
      <div className="flex items-center justify-center gap-600 bg-primary-normal py-300">
        <button onClick={handlePrevMonth} className="text-white">
          <ArrowLeft></ArrowLeft>
        </button>
        <div className="px-600 py-200">
          <h2 className="font-BinggraeBold text-heading-1 text-white">{`${currentDate.getFullYear()}.${months[currentDate.getMonth()]}`}</h2>
        </div>
        <button onClick={handleNextMonth} className="text-white">
          <ArrowRight></ArrowRight>
        </button>
      </div>

      <div className="grid grid-cols-7 px-5 dark:text-gray-800">
        {daysOfWeek.map((day, index) => (
          <div className="flex justify-center py-[0.625rem]" key={index}>
            <div
              key={day}
              className={`flex h-8 w-10 items-center justify-center rounded-full bg-primary-light-2 font-Pretendard text-body-1 font-semibold text-primary-normal dark:bg-gray-600 ${day === "일" ? "text-status-negative" : "text-primary-normal dark:text-gray-200"}`}
            >
              {day}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-800 px-5">{calendarDays}</div>
    </div>
  );
};

export default Calendar;
