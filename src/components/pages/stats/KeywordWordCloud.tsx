import { Card, CardContent } from "@/components/ui/card";
import * as echarts from "echarts";
import "echarts-wordcloud";
import { useEffect, useRef } from "react";

interface KeywordWordCloudProps {
  chartData: { name: string; value: number }[];
}

const KeywordWordCloud = ({ chartData }: KeywordWordCloudProps) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartData === null) return;

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

          data: chartData,
        },
      ],
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [chartData]);

  return (
    <Card>
      <CardContent>
        <div ref={chartRef} className="min-h-80 w-full animate-fadeIn"></div>
      </CardContent>
    </Card>
  );
};

export default KeywordWordCloud;
