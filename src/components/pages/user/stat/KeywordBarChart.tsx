import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDarkModeStore } from "@/global/globalState";

const chartConfig = {
  value: {
    label: "등장 횟수",
    color: "#6424A5",
  },
} satisfies ChartConfig;

interface EmotionBarChartProps {
  chartData: { name: string; value: number }[];
}

const KeywordBarChart = ({ chartData }: EmotionBarChartProps) => {
  const dark = useDarkModeStore();

  return (
    <Card>
      <CardContent className="min-h-80">
        {chartData.length !== 0 && (
          <ChartContainer config={chartConfig} className="min-h-80 w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 4)}
              />
              <YAxis hide={true} domain={[0, (dataMax: string) => parseInt(dataMax) + 1]} />
              <ChartTooltip content={<ChartTooltipContent />} trigger="click" />
              <Bar
                dataKey="value"
                fill={dark ? "#A059F3" : "#6424A5"}
                radius={20}
                barSize={20}
                label={{ position: "top", fill: `${dark ? "#A059F3" : "#6424A5"}`, fontSize: 12 }}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default KeywordBarChart;
