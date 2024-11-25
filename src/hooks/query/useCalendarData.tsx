import { getMonthlyDiariesByDate } from "@/api/api";
import { formatDate } from "@/utils/util";
import { useQuery } from "@tanstack/react-query";

const useCalendarData = (currentDate: Date) => {
  const formattedDate = formatDate(currentDate);

  const { data: calendarData } = useQuery({
    queryKey: ["calendarData", formattedDate],
    queryFn: () => getMonthlyDiariesByDate(formattedDate),
    staleTime: 1000 * 60 * 5,
  });

  const isActiveToday = calendarData
    ? calendarData.diaries.some(
        (diary) =>
          diary.date ===
          `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`
      )
    : false;

  return { calendarData, isActiveToday };
};

export default useCalendarData;
