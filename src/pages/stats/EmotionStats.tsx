import EmotionBarChart from "@/components/pages/stats/EmotionBarChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmotionStats = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-primary-light-1 px-800 py-500">
      <Tabs defaultValue="week" className="w-full text-center font-Binggrae">
        <TabsList className="w-80">
          <TabsTrigger value="week" className="w-full">
            1주
          </TabsTrigger>
          <TabsTrigger value="month" className="w-full">
            1달
          </TabsTrigger>
        </TabsList>
        <TabsContent value="week">
          <div>
            <div>월 선택</div>
            <div>
              <EmotionBarChart></EmotionBarChart>
            </div>
            <div>원 그래프</div>
          </div>
        </TabsContent>
        <TabsContent value="month">
          <div></div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmotionStats;
