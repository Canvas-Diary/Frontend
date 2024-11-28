import { getMonthlyDiariesByDate } from "@/api/api";
import { formatDate } from "@/utils/util";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useCalendarData = (currentDate: Date) => {
  const formattedDate = formatDate(currentDate);
  const [isActiveToday, setIsActiveToday] = useState(true);

  const { data: calendarData } = useQuery({
    queryKey: ["calendarData", formattedDate],
    queryFn: () => getMonthlyDiariesByDate(formattedDate),
    staleTime: 1000 * 60 * 5,
  });

  const todayString = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .replace(/\. /g, "-")
    .replace(".", "");

  useEffect(() => {
    if (calendarData) {
      const hasTodayDiary = calendarData.diaries.some((diary) => diary.date === todayString);

      // 오늘 날짜의 상태를 유지하기 위한 조건
      setIsActiveToday((prev: boolean) => prev && !hasTodayDiary);
    }
  }, [calendarData, todayString]);

  return { calendarData, isActiveToday };
};

export default useCalendarData;
