import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface EmotionBarChartProps {
  chartData: { dataKey: string; positive: number; negative: number; neutral: number }[];
}

const chartConfig = {
  positive: {
    label: "긍정",
    color: "#1FD18C",
  },
  negative: {
    label: "부정",
    color: "#E85E5D",
  },
  neutral: {
    label: "중립",
    color: "#64ACF3",
  },
} satisfies ChartConfig;

const EmotionBarChart = ({ chartData }: EmotionBarChartProps) => {
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
            <YAxis tickLine={false} axisLine={false} width={20} domain={[0, "dataMax"]} />
            <ChartTooltip content={<ChartTooltipContent />} trigger="click" />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="positive"
              stackId="a"
              fill="var(--color-positive)"
              radius={[0, 0, 4, 4]}
              barSize={10}
            />
            <Bar dataKey="negative" stackId="a" fill="var(--color-negative)" barSize={10} />
            <Bar
              dataKey="neutral"
              stackId="a"
              fill="var(--color-neutral)"
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EmotionBarChart;
