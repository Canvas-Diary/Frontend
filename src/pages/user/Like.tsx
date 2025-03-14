import { getLikedDiaries } from "@/api/api";
import Appbar from "@/components/common/Appbar/Appbar";
import { ThumbnailGrid, ThumbnailGridSkeleton } from "@/components/common/ThumbnailGrid";
import ROUTE_PATH from "@/constants/ROUTE_PATH";
import useInView from "@/hooks/useInView";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Like = () => {
  const { isInView, elementRef } = useInView<HTMLDivElement>(0.7);
  const navigate = useNavigate();

  /**
   * 일기 목록 가져오기
   * @param param0
   * @returns
   */
  const fetchDiaries = async ({ pageParam }: { pageParam: number }) => {
    const response = await getLikedDiaries({ page: pageParam, size: 12 });

    return response;
  };

  /**
   * useInfiniteQuery
   */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["likedDiaries"],
    queryFn: fetchDiaries,

    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.number + 1 : undefined;
    },
    select: (data) => (data.pages ?? []).flatMap((page) => page.content),
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });

  /**
   * 다음 페이지 로드
   */
  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView]);

  const onClickThumbnail = (diaryId: string) => {
    navigate(`${ROUTE_PATH.DIARY}/${diaryId}`);
  };

  return (
    <>
      <Appbar
        backHandler={() => {
          navigate(-1);
        }}
        text="좋아요 표시한 일기"
      ></Appbar>
      <div className="flex flex-grow flex-col overflow-scroll">
        <div className="flex flex-col px-700">
          {data && <ThumbnailGrid diaries={data} onClickThumbnail={onClickThumbnail} />}
          <div
            className="grid -translate-y-600 grid-cols-3 place-items-center gap-300 pb-800"
            ref={elementRef}
          >
            {hasNextPage && <ThumbnailGridSkeleton />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Like;
