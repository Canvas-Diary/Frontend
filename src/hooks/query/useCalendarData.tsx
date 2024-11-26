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

  const todayString = new Date().toISOString().split("T")[0];
  const isActiveToday = !calendarData?.diaries.some((diary) => diary.date === todayString);

  return { calendarData, isActiveToday };
};

export default useCalendarData;
