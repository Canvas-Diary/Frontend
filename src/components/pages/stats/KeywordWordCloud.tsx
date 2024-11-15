import { Card, CardContent } from "@/components/ui/card";
import * as echarts from "echarts";
import "echarts-wordcloud";
import { useEffect, useRef, useState } from "react";

const chartData = [
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

const KeywordWordCloud = () => {
  const [wordCloudData, setWordCloudData] = useState<{}[]>(chartData);

  const fetchData = async () => {
    setWordCloudData(chartData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartRef = useRef(null);

  useEffect(() => {
    if (wordCloudData === null) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      series: [
        {
          type: "wordCloud",
          gridSize: 8,
          sizeRange: [14, 48],
          rotationRange: [0, 0],
          shape: "circle",
          textStyle: {
            fontFamily: "Binggrae",
            color: function () {
              const colors = ["#6424A5", "#A059F3", "#BB87FF"];
              return colors[Math.floor(Math.random() * colors.length)];
            },
          },

          data: wordCloudData,
        },
      ],
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [wordCloudData]);

  return (
    <Card>
      <CardContent>
        <div ref={chartRef} className="min-h-80 w-full animate-fadeIn"></div>
      </CardContent>
    </Card>
  );
};

export default KeywordWordCloud;
