import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const EmotionPie = () => {
  return <Component></Component>;
};

export default EmotionPie;

const chartData = [
  { emotion: "JOY", diaryCount: 275, fill: "var(--color-JOY)" },
  { emotion: "SADNESS", diaryCount: 200, fill: "var(--color-SADNESS)" },
  { emotion: "ANGER", diaryCount: 187, fill: "var(--color-ANGER)" },
  { emotion: "FEAR", diaryCount: 173, fill: "var(--color-FEAR)" },
  { emotion: "DISGUST", diaryCount: 90, fill: "var(--color-DISGUST)" },
  { emotion: "SHAME", diaryCount: 200, fill: "var(--color-SHAME)" },
  { emotion: "SURPRISE", diaryCount: 187, fill: "var(--color-SURPRISE)" },
  { emotion: "CURIOSITY", diaryCount: 173, fill: "var(--color-CURIOSITY)" },
  { emotion: "NONE", diaryCount: 90, fill: "var(--color-NONE)" },
];

const chartConfig = {
  diaryCount: {
    label: "일기 개수",
  },
  JOY: {
    label: "기쁨",
    color: "hsl(var(--chart-1))",
  },
  SADNESS: {
    label: "슬픔",
    color: "hsl(var(--chart-2))",
  },
  ANGER: {
    label: "분노",
    color: "hsl(var(--chart-3))",
  },
  FEAR: {
    label: "공포",
    color: "hsl(var(--chart-4))",
  },
  DISGUST: {
    label: "혐오",
    color: "hsl(var(--chart-5))",
  },
  SHAME: {
    label: "수치",
    color: "hsl(var(--chart-2))",
  },
  SURPRISE: {
    label: "놀람",
    color: "hsl(var(--chart-3))",
  },
  CURIOSITY: {
    label: "궁금",
    color: "hsl(var(--chart-4))",
  },
  NONE: {
    label: "무난",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function Component() {
  return (
    <Card>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="mx-auto min-h-[400px] w-full">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="diaryCount"
              nameKey="emotion"
              innerRadius={70}
              outerRadius={100}
            />
            <ChartLegend
              content={<ChartLegendContent className="mt-900 grid grid-cols-2" />}
            ></ChartLegend>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
