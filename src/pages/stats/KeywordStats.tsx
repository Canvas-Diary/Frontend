import { useState } from "react";
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

const KeywordStats = ({ value, text, handleNext, handlePrev }: KeywordStatsProps) => {
  const [keyWord, setKeyWord] = useState<
    {
      dataKey: string;
      positive: number;
      neutral: number;
      negative: number;
    }[]
  >([]);

  return (
    <div className="flex flex-col gap-500">
      <div className="flex items-center justify-center gap-600 text-primary-normal">
        <button onClick={handleNext}>
          <ArrowLeft></ArrowLeft>
        </button>
        <div className="px-600 py-200">
          <h2 className="font-BinggraeBold">{text}</h2>
        </div>
        <button onClick={handlePrev}>
          <ArrowRight></ArrowRight>
        </button>
      </div>
      <div className="flex flex-col gap-800">
        <KeywordWordCloud></KeywordWordCloud>
        <KeywordBarChart></KeywordBarChart>
      </div>
    </div>
  );
};

export default KeywordStats;
