import { useEffect, useState } from "react";
import ArrowLeft from "../../assets/svg/arrow_left.svg?react";
import ArrowRight from "../../assets/svg/arrow_right.svg?react";
import EmotionBarChart from "@/components/pages/stats/EmotionBarChart";
import EmotionPieChart from "@/components/pages/stats/EmotionPieChart";
import { getEmotionStats } from "@/api/api";
import { formatDate } from "@/utils/util";
import { EmotionBarData, EmotionPieData } from "@/types/types";

interface FormatToPropsProps {
  barData: EmotionBarData;
  pieData: EmotionPieData;
  type: "WEEK" | "MONTH";
}

//개선 필요
/**
 * api 응답값을 chart 의 Props 형식에 맞게 포멧팅
 * @param param0
 * @returns
 */
const formatToProps = ({ barData, pieData, type }: FormatToPropsProps) => {
  const dataMap = Object.fromEntries(barData.map((item) => [Number(item.dataKey), item]));
  const updatedBarData = [];
  for (let i = 5; i >= 0; i--) {
    if (dataMap[i]) {
      let key = type === "WEEK" ? `${dataMap[i].dataKey}주전` : `${dataMap[i].dataKey}달전`;

      if (i === 0) key = type === "WEEK" ? "이번주" : "이번달";
      else if (i === 1) key = type === "WEEK" ? "저번주" : "저번달";

      updatedBarData.push({
        ...dataMap[i],
        dataKey: `${key}`,
      });
    } else {
      let key = type === "WEEK" ? `${i}주전` : `${i}달전`;
      if (i === 0) key = type === "WEEK" ? "이번주" : "이번달";
      else if (i === 1) key = type === "WEEK" ? "저번주" : "저번달";
      updatedBarData.push({
        dataKey: `${key}`,
        positive: 0,
        neutral: 0,
        negative: 0,
      });
    }
  }

  const updatedPieData = pieData.map((item) => ({
    ...item,
    fill: `var(--color-${item.emotion})`,
  }));

  return { barData: updatedBarData, pieData: updatedPieData };
};

interface EmotionStatsProps {
  value: "WEEK" | "MONTH";
  text: string;
  current: Date;
  handleNext: () => void;
  handlePrev: () => void;
}

//api 호출시 필요한 정보까지 Props로 받아서 데이터 처리
const EmotionStats = ({ value, text, current, handleNext, handlePrev }: EmotionStatsProps) => {
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
    const setEmotionData = async () => {
      const response = await getEmotionStats({ type: value, date: formatDate(current) });
      const formatedResponse = formatToProps({
        barData: response.barData,
        pieData: response.pieData,
        type: value,
      });

      setBarData(formatedResponse.barData);
      setPieData(formatedResponse.pieData);
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
        <EmotionBarChart chartData={barData} />
        <EmotionPieChart chartData={pieData} />
      </div>
    </div>
  );
};

export default EmotionStats;
