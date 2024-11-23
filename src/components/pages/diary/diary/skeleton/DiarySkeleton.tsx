import { Skeleton } from "@/components/ui/skeleton";
import useMediaQuery from "@/hooks/useMediaQuery";

/**
 * 일기 로딩중 스켈레톤
 * @returns
 */
const DiarySkeleton = () => {
  const { calculatedHeight } = useMediaQuery();

  const height = `h-[${calculatedHeight}px]`;

  return (
    <>
      <div className="relative flex h-full flex-col items-center">
        <Skeleton className={`fixed top-0 w-full ${height}`}></Skeleton>

        <div
          className="absolute z-10 h-fit w-full"
          style={{ top: `calc(${calculatedHeight}px - 50px)` }}
        >
          <div className="flex flex-col items-center gap-600 rounded-t-400 bg-background px-800 pb-10 pt-700 shadow-default">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-300">
                <Skeleton className="h-[2.0625rem] w-[11.25rem] rounded-50"></Skeleton>
                <Skeleton className="h-[1.625rem] w-[3.5625rem] rounded-full"></Skeleton>
              </div>
            </div>
            <hr className="w-full border border-gray-100" />
            <div className="flex h-full w-full flex-col gap-200">
              <Skeleton className="h-[1.3125rem] w-[18rem] rounded-50"></Skeleton>
              <Skeleton className="h-[1.3125rem] w-[16rem] rounded-50"></Skeleton>
              <Skeleton className="h-[1.3125rem] w-[14rem] rounded-50"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiarySkeleton;
