import { Skeleton } from "@/components/ui/skeleton";

const ReviewSkeleton = () => {
  return (
    <div>
      <div className="mb-4 flex flex-col justify-between gap-200">
        <Skeleton className="h-[2rem] w-[11.25rem] rounded-50"></Skeleton>
        <Skeleton className="h-[2rem] w-[9.25rem] rounded-50"></Skeleton>
      </div>
      <div className={`flex-grow pb-[2rem]`}>
        <div className="flex flex-col items-center gap-600 rounded-400 bg-white px-800 pb-10 pt-700 font-Binggrae shadow-default dark:bg-gray-700">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-300">
              <Skeleton className="h-[2.0625rem] w-[11.25rem] rounded-50"></Skeleton>
              <Skeleton className="h-[1.625rem] w-[3.5625rem] rounded-full"></Skeleton>
            </div>
          </div>
          <Skeleton className="aspect-[4/7] h-auto w-full"></Skeleton>
          <div className="flex h-full w-full flex-col gap-200">
            <Skeleton className="h-[1.3125rem] w-[18rem] rounded-50"></Skeleton>
            <Skeleton className="h-[1.3125rem] w-[16rem] rounded-50"></Skeleton>
            <Skeleton className="h-[1.3125rem] w-[14rem] rounded-50"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSkeleton;
