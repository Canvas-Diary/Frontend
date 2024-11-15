import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  weight: {
    label: "등장 횟수",
    color: "#6424A5",
  },
} satisfies ChartConfig;

const chartData = [
  { dataKey: "행복", weight: 8 },
  { dataKey: "아침", weight: 12 },
  { dataKey: "커피", weight: 8 },
  { dataKey: "학교", weight: 6 },
  { dataKey: "날씨", weight: 14 },
];

const KeywordBarChart = () => {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-80 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dataKey"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} trigger="click" />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="weight"
              fill="var(--color-weight)"
              radius={20}
              barSize={20}
              label={{ position: "top", fill: "var(--color-weight)", fontSize: 12 }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default KeywordBarChart;
