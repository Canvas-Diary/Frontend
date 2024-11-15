import { useEffect, useState } from "react";
import ArrowLeft from "../../assets/svg/arrow_left.svg?react";
import ArrowRight from "../../assets/svg/arrow_right.svg?react";
import EmotionBarChart from "@/components/pages/stats/EmotionBarChart";
import EmotionPieChart from "@/components/pages/stats/EmotionPieChart";

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

interface EmotionStatsProps {
  value: string;
  text: string;
  handleNext: () => void;
  handlePrev: () => void;
}
//api 호출시 필요한 정보까지 Props로 받아서 데이터 처리
const EmotionStats = ({ value, text, handleNext, handlePrev }: EmotionStatsProps) => {
  const [barData, setBarData] = useState<
    {
      dataKey: string;
      positive: number;
      neutral: number;
      negative: number;
    }[]
  >([]);
  const [pieData, setPieData] = useState<
    {
      emotion: string;
      diaryCount: number;
      fill: string;
    }[]
  >([]);

  useEffect(() => {
    setBarData(value === "week" ? WeeklyEmotionBarData : MonthlyEmotionBarData);
    setPieData(value === "week" ? WeeklyEmotionPieData : MonthlyEmotionPieData);
  });

  return (
    <div className="flex flex-col gap-500 font-BinggraeBold text-heading-1 text-primary-normal">
      <div className="flex items-center justify-center gap-600">
        <button onClick={handleNext}>
          <ArrowLeft></ArrowLeft>
        </button>
        <div className="px-600 py-200">
          <h2>{text}</h2>
        </div>
        <button onClick={handlePrev}>
          <ArrowRight></ArrowRight>
        </button>
      </div>
      <div className="flex flex-col gap-800">
        <EmotionBarChart chartData={barData} />
        <EmotionPieChart chartData={pieData} />
      </div>
    </div>
  );
};

export default EmotionStats;
