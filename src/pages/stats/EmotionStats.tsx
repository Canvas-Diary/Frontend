import EmotionBarChart from "@/components/pages/stats/EmotionBarChart";
import EmotionPieChart from "@/components/pages/stats/EmotionPieChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WeeklyEmotionBarData = [
  { dataKey: "5주전", positive: 1, neutral: 3, negative: 2 },
  { dataKey: "4주전", positive: 1, neutral: 1, negative: 4 },
  { dataKey: "3주전", positive: 2, neutral: 2, negative: 3 },
  { dataKey: "2주전", positive: 1, neutral: 1, negative: 0 },
  { dataKey: "저번주", positive: 2, neutral: 4, negative: 1 },
  { dataKey: "이번주", positive: 3, neutral: 1, negative: 2 },
];

const MonthlyEmotionBarData = [
  { dataKey: "5달전", positive: 8, neutral: 10, negative: 11 },
  { dataKey: "4달전", positive: 12, neutral: 7, negative: 14 },
  { dataKey: "3달전", positive: 8, neutral: 20, negative: 1 },
  { dataKey: "2달전", positive: 8, neutral: 10, negative: 12 },
  { dataKey: "저번달", positive: 18, neutral: 2, negative: 8 },
  { dataKey: "이번달", positive: 8, neutral: 10, negative: 14 },
];

const WeeklyEmotionPieData = [
  { emotion: "JOY", diaryCount: 2, fill: "var(--color-JOY)" },
  { emotion: "SADNESS", diaryCount: 2, fill: "var(--color-SADNESS)" },
  { emotion: "ANGER", diaryCount: 1, fill: "var(--color-ANGER)" },
  { emotion: "FEAR", diaryCount: 1, fill: "var(--color-FEAR)" },
  { emotion: "DISGUST", diaryCount: 1, fill: "var(--color-DISGUST)" },
  { emotion: "SHAME", diaryCount: 2, fill: "var(--color-SHAME)" },
  { emotion: "SURPRISE", diaryCount: 1, fill: "var(--color-SURPRISE)" },
  { emotion: "CURIOSITY", diaryCount: 1, fill: "var(--color-CURIOSITY)" },
  { emotion: "NONE", diaryCount: 1, fill: "var(--color-NONE)" },
];

const MonthlyEmotionPieData = [
  { emotion: "JOY", diaryCount: 27, fill: "var(--color-JOY)" },
  { emotion: "SADNESS", diaryCount: 20, fill: "var(--color-SADNESS)" },
  { emotion: "ANGER", diaryCount: 18, fill: "var(--color-ANGER)" },
  { emotion: "FEAR", diaryCount: 17, fill: "var(--color-FEAR)" },
  { emotion: "DISGUST", diaryCount: 9, fill: "var(--color-DISGUST)" },
  { emotion: "SHAME", diaryCount: 20, fill: "var(--color-SHAME)" },
  { emotion: "SURPRISE", diaryCount: 18, fill: "var(--color-SURPRISE)" },
  { emotion: "CURIOSITY", diaryCount: 17, fill: "var(--color-CURIOSITY)" },
  { emotion: "NONE", diaryCount: 9, fill: "var(--color-NONE)" },
];

const EmotionStats = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-primary-light-1 px-800 pb-1000 pt-500">
      <Tabs defaultValue="week" className="w-full text-center font-Binggrae">
        <TabsList className="mb-2 w-full">
          <TabsTrigger value="week" className="w-full">
            1주
          </TabsTrigger>
          <TabsTrigger value="month" className="w-full">
            1달
          </TabsTrigger>
        </TabsList>
        <TabsContent value="week" className="flex flex-col gap-800">
          <div>주 선택</div>
          <EmotionBarChart chartData={WeeklyEmotionBarData}></EmotionBarChart>
          <EmotionPieChart chartData={WeeklyEmotionPieData}></EmotionPieChart>
        </TabsContent>
        <TabsContent value="month" className="flex flex-col gap-800">
          <div>월 선택</div>
          <EmotionBarChart chartData={MonthlyEmotionBarData}></EmotionBarChart>
          <EmotionPieChart chartData={MonthlyEmotionPieData}></EmotionPieChart>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmotionStats;
