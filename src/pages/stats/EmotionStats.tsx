import EmotionBarChart from "@/components/pages/stats/EmotionBarChart";
import EmotionPie from "@/components/pages/stats/EmotionPie";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmotionStats = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-primary-light-1 px-800 pb-1000 pt-500">
      <Tabs defaultValue="week" className="w-full text-center font-Binggrae">
        <TabsList className="w-full">
          <TabsTrigger value="week" className="w-full">
            1주
          </TabsTrigger>
          <TabsTrigger value="month" className="w-full">
            1달
          </TabsTrigger>
        </TabsList>
        <TabsContent value="week" className="flex flex-col gap-800">
          <div>주 선택</div>
          <div>
            <EmotionBarChart></EmotionBarChart>
          </div>
          <div>
            <EmotionPie></EmotionPie>
          </div>
        </TabsContent>
        <TabsContent value="month" className="flex flex-col gap-800">
          <div>월 선택</div>
          <div>
            <EmotionBarChart></EmotionBarChart>
          </div>
          <div>
            <EmotionPie></EmotionPie>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmotionStats;
