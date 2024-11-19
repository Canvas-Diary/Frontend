import { useEffect, useState } from "react";
import ArrowLeft from "../../assets/svg/arrow_left.svg?react";
import ArrowRight from "../../assets/svg/arrow_right.svg?react";
import KeywordBarChart from "@/components/pages/stats/KeywordBarChart";
import KeywordWordCloud from "@/components/pages/stats/KeywordWordCloud";
import { getKeywordStats } from "@/api/api";
import { formatDate } from "@/utils/util";
import { KeywordData } from "@/types/types";

interface KeywordStatsProps {
  value: "WEEK" | "MONTH";
  text: string;
  current: Date;
  handleNext: () => void;
  handlePrev: () => void;
}

const KeywordStats = ({ value, text, current, handleNext, handlePrev }: KeywordStatsProps) => {
  const [keyword, setKeyword] = useState<KeywordData[]>([]);

  useEffect(() => {
    const setEmotionData = async () => {
      const response = await getKeywordStats({ type: value, date: formatDate(current) });

      setKeyword(response.keywordData);
    };

    setEmotionData();
  }, [current]);

  return (
    <div className="flex flex-col gap-500 font-BinggraeBold text-heading-1 text-primary-normal">
      <div className="flex items-center justify-center gap-600">
        <button onClick={handlePrev}>
          <ArrowLeft></ArrowLeft>
        </button>
        <div className="px-600 py-200">
          <h2>{text}</h2>
        </div>
        <button onClick={handleNext}>
          <ArrowRight></ArrowRight>
        </button>
      </div>
      <div className="flex flex-col gap-800">
        <KeywordWordCloud chartData={keyword}></KeywordWordCloud>
        <KeywordBarChart
          chartData={keyword.length > 5 ? keyword.slice(0, 5) : keyword}
        ></KeywordBarChart>
      </div>
    </div>
  );
};

export default KeywordStats;
