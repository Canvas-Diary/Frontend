import { Skeleton } from "@/components/ui/skeleton";

const StatsFallback = () => {
  return (
    <div className="flex w-full flex-col bg-primary-light-1 px-800 py-500 dark:bg-background">
      <Skeleton className="mb-500 h-10 w-full rounded-md p-1" />
      <div className="flex flex-col gap-500">
        <Skeleton className="h-10 w-full" />
        <div className="flex flex-col gap-800">
          <Skeleton className="h-80 w-full rounded-300" />
          <Skeleton className="h-80 w-full rounded-300" />
        </div>
      </div>
    </div>
  );
};

export default StatsFallback;
