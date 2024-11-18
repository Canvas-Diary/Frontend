interface CalendarDateProps {
  onClickDate: (id: string) => void;
  calendarDataInfo: {
    date: number;
    diaryId: string;
    emotion: string;
    calendarIcon: string;
    isToday: boolean;
    isSunday: boolean;
  };
}

const CalendarDate = ({ onClickDate, calendarDataInfo }: CalendarDateProps) => {
  return (
    <div
      className="flex cursor-pointer flex-col items-center gap-300"
      onClick={() => onClickDate(calendarDataInfo.diaryId)}
    >
      <div className="relative flex h-11 w-11 items-center justify-center rounded-100">
        <img
          src={calendarDataInfo.calendarIcon}
          alt={calendarDataInfo.emotion}
          className="animate-fadeIn"
        />
      </div>

      <div
        className={`text-center font-Binggrae text-detail-1 ${calendarDataInfo.isSunday && "text-status-negative"} ${calendarDataInfo.isToday && "w-10 rounded-300 bg-primary-normal font-BinggraeBold text-background"}`}
      >
        {calendarDataInfo.date}
      </div>
    </div>
  );
};

export default CalendarDate;
