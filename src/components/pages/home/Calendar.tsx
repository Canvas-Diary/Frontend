import { ReactNode, useEffect, useState } from "react";
import ArrowLeft from "../../../assets/svg/arrow_left.svg?react";
import ArrowRight from "../../../assets/svg/arrow_right.svg?react";
import { diary } from "../../../types/types";
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

const emotionImages: { [key: string]: string } = {
  happy: happy,
  sad: sad,
  angry: angry,
  afraid: afraid,
  dislike: dislike,
  non: non,
  shy: shy,
  surprised: surprised,
  wonder: wonder,
  default: defaultIcon,
};

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
const months = [" 1", " 2", " 3", " 4", " 5", " 6", " 7", " 8", " 9", "10", "11", "12"];

interface CalendarProps {
  calendarData: {
    diaries: diary[];
  };
  onClickDate: (id: number) => void;
}

/**
 * 메인 화면의 일기 정보를 표시하는 달력
 * @param calendarData 일기 정보
 * @param onClickDate 날짜를 눌렀을 때 실행할 콜백 함수
 * @returns
 */
const Calendar = ({ onClickDate, calendarData }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<ReactNode[]>([]);

  const diaryMap = calendarData.diaries.reduce(
    (acc, diary) => {
      const day = new Date(diary.date).getDate();
      acc[day] = { id: diary.diaryId, emotion: diary.emotion };
      return acc;
    },
    {} as { [day: number]: { id: number; emotion: string } }
  );

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

      const diary = diaryMap[day];
      const emotionImage = diary ? emotionImages[diary.emotion] : emotionImages.default;
      const id = diary ? diary.id : 0;

      days.push(
        <div
          key={day}
          className={`flex cursor-pointer flex-col items-center gap-300`}
          onClick={() => handleDayClick(id)}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-100">
            <img src={emotionImage} alt={diary ? diary.emotion : "null"} />
          </div>
          <div
            className={`text-center text-detail-1 font-regular ${isToday && "font-BinggraeBold w-10 rounded-300 bg-primary-normal text-white"}`}
          >
            {day}
          </div>
        </div>
      );
    }

    setCalendarDays(days);
  };

  const handleDayClick = (id: number) => {
    onClickDate(id);
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
          <h2 className="font-BinggraeBold text-heading-1 text-white">{`${currentDate.getFullYear()}.${months[currentDate.getMonth()]}`}</h2>
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
