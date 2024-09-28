import { ReactNode, useEffect, useState } from "react";
import ArrowLeft from "../../../assets/svg/arrow_left.svg?react";
import ArrowRight from "../../../assets/svg/arrow_right.svg?react";

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
const months = [" 1", " 2", " 3", " 4", " 5", " 6", " 7", " 8", " 9", "10", "11", "12"];

interface CalendarProps {
  onClickDate: () => void;
}

const Calendar = ({ onClickDate }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<ReactNode[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

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
      days.push(
        <div
          key={day}
          className={`flex cursor-pointer flex-col items-center gap-300`}
          onClick={() => handleDayClick(day)}
        >
          <div className="h-11 w-11 rounded-100 bg-black"></div>
          <div
            className={`text-center font-Binggrae text-detail-1 font-regular ${isToday && "w-10 rounded-300 bg-primary-normal font-bold text-white"}`}
          >
            {day}
          </div>
        </div>
      );
    }

    setCalendarDays(days);
  };

  const handleDayClick = (day: number) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setSelectedDate(selected.toLocaleDateString(undefined, options));
    onClickDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const prevMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      return prevMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const nextMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      return nextMonth;
    });
  };

  return (
    <div className="flex flex-col items-stretch gap-300">
      <div className="flex items-center justify-center gap-600 bg-primary-normal py-300">
        <button onClick={handlePrevMonth} className="text-white">
          <ArrowLeft></ArrowLeft>
        </button>
        <div className="px-600 py-200">
          <h2 className="font-Binggrae text-heading-1 font-bold text-white">{`${currentDate.getFullYear()}.${months[currentDate.getMonth()]}`}</h2>
        </div>
        <button onClick={handleNextMonth} className="text-white">
          <ArrowRight></ArrowRight>
        </button>
      </div>

      <div className="grid grid-cols-7 px-5">
        {daysOfWeek.map((day, index) => (
          <div className="flex justify-center py-[0.625rem]" key={index}>
            <div
              key={day}
              className="flex h-8 w-10 items-center justify-center rounded-full bg-primary-light-2 font-Pretendard text-body-1 font-semibold text-primary-normal"
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
