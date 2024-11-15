import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmotionStats from "../EmotionStats";
import { useState } from "react";

const months = [" 1", " 2", " 3", " 4", " 5", " 6", " 7", " 8", " 9", "10", "11", "12"];

const getWeekOfMonth = (date: any) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1); // 해당 달의 첫날
  const dayOfMonth = date.getDate(); // 해당 날짜의 일(day)

  const weekOfMonth = Math.ceil((dayOfMonth + firstDayOfMonth.getDay()) / 7);
  return weekOfMonth;
};

const EmotionStatsLayout = () => {
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
    <div className="flex w-full flex-col items-center justify-center bg-primary-light-1 px-800 py-500">
      <Tabs defaultValue="week" className="w-full text-center font-Binggrae">
        <TabsList className="mb-2 w-full">
          <TabsTrigger value="week" className="w-full">
            1주
          </TabsTrigger>
          <TabsTrigger value="month" className="w-full">
            1달
          </TabsTrigger>
        </TabsList>
        <TabsContent value="week">
          <EmotionStats
            value="week"
            text={`${months[currentWeek.getMonth()]}월 ${getWeekOfMonth(currentWeek)}주차`}
            handleNext={handleNextWeek}
            handlePrev={handlePrevWeek}
          />
        </TabsContent>
        <TabsContent value="month">
          <EmotionStats
            value="month"
            text={`${currentMonth.getFullYear()}년 ${months[currentMonth.getMonth()]}월`}
            handleNext={handleNextMonth}
            handlePrev={handlePrevMonth}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmotionStatsLayout;
