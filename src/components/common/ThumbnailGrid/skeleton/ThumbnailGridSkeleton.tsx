import { Skeleton } from "@/components/ui/skeleton";

const ThumbnailGridSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[11.125rem] w-[6.375rem] rounded"></Skeleton>
      <Skeleton className="h-[11.125rem] w-[6.375rem] rounded"></Skeleton>
      <Skeleton className="h-[11.125rem] w-[6.375rem] rounded"></Skeleton>
    </>
  );
};

export default ThumbnailGridSkeleton;
