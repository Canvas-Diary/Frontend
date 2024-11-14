import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const KeywordStats = () => {
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
        <TabsContent value="week">Make changes to your account here.</TabsContent>
        <TabsContent value="month">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default KeywordStats;
