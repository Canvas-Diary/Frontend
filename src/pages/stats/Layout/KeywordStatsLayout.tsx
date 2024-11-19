import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KeywordStats from "../KeywordStats";
import { useState } from "react";

const months = [" 1", " 2", " 3", " 4", " 5", " 6", " 7", " 8", " 9", "10", "11", "12"];

function getWeekRange(date: Date): string {
  // 주의 첫날(일요일) 구하기
  const firstDayOfWeek = new Date(date);
  const dayOfWeek = firstDayOfWeek.getDay();
  const diffToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - diffToSunday);

  // 주의 마지막날(토요일) 구하기
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

  const formatDate = (d: Date): string => {
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${month}.${day}`;
  };

  // 주간 범위 반환
  return `${formatDate(firstDayOfWeek)} ~ ${formatDate(lastDayOfWeek)}`;
}

const KeywordStatsLayout = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => {
      const prevWeek = new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 7);
      return prevWeek;
    });
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => {
      const nextWeek = new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 7);
      return nextWeek;
    });
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      const prevMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      return prevMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const nextMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      return nextMonth;
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center bg-primary-light-1 px-800 py-500 dark:bg-background">
      <Tabs defaultValue="WEEK" className="w-full text-center font-Binggrae text-body-2">
        <TabsList className="mb-500 w-full">
          <TabsTrigger value="WEEK" className="w-full">
            1주
          </TabsTrigger>
          <TabsTrigger value="MONTH" className="w-full">
            1달
          </TabsTrigger>
        </TabsList>
        <TabsContent value="WEEK">
          <KeywordStats
            value="WEEK"
            current={currentWeek}
            text={`${getWeekRange(currentWeek)}`}
            handleNext={handleNextWeek}
            handlePrev={handlePrevWeek}
          />
        </TabsContent>
        <TabsContent value="MONTH">
          <KeywordStats
            value="MONTH"
            current={currentMonth}
            text={`${currentMonth.getFullYear()}년 ${months[currentMonth.getMonth()]}월`}
            handleNext={handleNextMonth}
            handlePrev={handlePrevMonth}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KeywordStatsLayout;
