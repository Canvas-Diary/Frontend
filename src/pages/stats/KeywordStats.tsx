import { useEffect, useState } from "react";
import ArrowLeft from "../../assets/svg/arrow_left.svg?react";
import ArrowRight from "../../assets/svg/arrow_right.svg?react";
import KeywordBarChart from "@/components/pages/stats/KeywordBarChart";
import KeywordWordCloud from "@/components/pages/stats/KeywordWordCloud";

interface KeywordStatsProps {
  value: string;
  text: string;
  handleNext: () => void;
  handlePrev: () => void;
}

const MonthlyKeywordData = [
  { name: "행복", value: 8 },
  { name: "아침", value: 12 },
  { name: "커피", value: 8 },
  { name: "학교", value: 6 },
  { name: "날씨", value: 14 },
  { name: "행복", value: 8 },
  { name: "아침", value: 12 },
  { name: "커피", value: 8 },
  { name: "학교", value: 6 },
  { name: "날씨", value: 14 },
  { name: "행복", value: 8 },
  { name: "아침", value: 12 },
  { name: "커피", value: 8 },
  { name: "학교", value: 6 },
  { name: "날씨", value: 14 },
  { name: "행복", value: 8 },
  { name: "아침", value: 12 },
  { name: "커피", value: 8 },
  { name: "학교", value: 6 },
  { name: "날씨", value: 14 },
];
const WeeklyKeywordData = [
  { name: "행복", value: 1 },
  { name: "아침", value: 2 },
  { name: "커피", value: 3 },
  { name: "학교", value: 2 },
  { name: "날씨", value: 4 },
];

const KeywordStats = ({ value, text, handleNext, handlePrev }: KeywordStatsProps) => {
  const [keyword, setKeyword] = useState<
    {
      name: string;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    setKeyword(value === "week" ? WeeklyKeywordData : MonthlyKeywordData);
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
        <KeywordWordCloud chartData={keyword}></KeywordWordCloud>
        <KeywordBarChart chartData={keyword.slice(0, 5)}></KeywordBarChart>
      </div>
    </div>
  );
};

export default KeywordStats;
