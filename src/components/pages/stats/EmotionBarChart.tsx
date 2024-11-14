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

const EmotionBarChart = () => {
  return <Component></Component>;
};

export default EmotionBarChart;

const chartData = [
  { month: "January", positive: 1, neutral: 3, negative: 2 },
  { month: "February", positive: 1, neutral: 1, negative: 4 },
  { month: "March", positive: 2, neutral: 2, negative: 3 },
  { month: "April", positive: 1, neutral: 1, negative: 0 },
  { month: "May", positive: 2, neutral: 4, negative: 1 },
  { month: "June", positive: 3, neutral: 1, negative: 2 },
];
const chartConfig = {
  positive: {
    label: "positive",
    color: "hsl(var(--chart-1))",
  },
  negative: {
    label: "negative",
    color: "hsl(var(--chart-2))",
  },
  neutral: {
    label: "neutral",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function Component() {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-80 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} width={12} />
            <ChartTooltip content={<ChartTooltipContent />} trigger="click" />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="positive"
              stackId="a"
              fill="var(--color-positive)"
              radius={[0, 0, 4, 4]}
            />
            <Bar dataKey="negative" stackId="a" fill="var(--color-negative)" />
            <Bar dataKey="neutral" stackId="a" fill="var(--color-neutral)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
