import { Outlet, useLocation } from "react-router-dom";
import Home from "@/assets/svg/home.svg?react";
import Sns from "@/assets/svg/sns.svg?react";
import Album from "@/assets/svg/album.svg?react";
import Who from "@/assets/svg/who.svg?react";
import ROUTE_PATH from "@/constants/ROUTE_PATH";
import Navbar from "@/components/common/Navbar/Navbar";
import { Toaster } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

/**
 * Content + Navbar(선택) 로 이루어진 기본 layout
 * @returns
 */
const Layout = () => {
  const GNB = useGNB();
  const NO_NAVBAR_PAGE = [ROUTE_PATH.DIARY, ROUTE_PATH.LOGIN, ROUTE_PATH.NO_DIARY];
  const shouldHideNavBar = useShouldHideNavBar(NO_NAVBAR_PAGE);

  return (
    <div className="flex h-dvh w-full flex-col">
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "flex w-fit justify-center rounded-full border-none bg-primary-normal px-600 py-300 font-Binggrae text-body-2 text-white",
        }}
      />
      <Outlet />
      {!shouldHideNavBar && <Navbar NavList={GNB} />}
    </div>
  );
};

export default Layout;

/**
 * 특정 경로 배열에 대해, 현재 경로가 그 중 하나인지 확인
 * @param paths - 숨기고 싶은 경로 배열
 * @returns 현재 경로가 배열에 포함되면 true
 */
const useShouldHideNavBar = (paths: string[]) => {
  const location = useLocation();
  return paths.some((path) => location.pathname.startsWith(path));
};

/**
 * 각 Navbar 요소들에 대한 제어
 * @returns
 */
const useGNB = () => {
  const queryClient = useQueryClient();
  const [actionTrigger, setActionTrigger] = useState<
    "home" | "explore" | "album" | "mypage" | null
  >(null);

  const debouncedActionTrigger = useDebounce<string | null>({ value: actionTrigger, delay: 300 });

  /**
   * 각 탭을 누르면 캐시 초기화 디바운싱
   */
  useEffect(() => {
    console.log(debouncedActionTrigger, actionTrigger);
    if (debouncedActionTrigger === "home") {
      queryClient.removeQueries({ queryKey: ["calendarData"] });
    }

    if (debouncedActionTrigger === "explore") {
      queryClient.removeQueries({ queryKey: ["exploreDiaries"] });
    }

    if (debouncedActionTrigger === "album") {
      queryClient.removeQueries({ queryKey: ["albumDiaries"] });
    }

    if (debouncedActionTrigger === "mypage") {
    }
  }, [debouncedActionTrigger]);

  /**
   * 각 탭을 누르면 스크롤 저장 데이터 초기화, 디바운싱 로직 호출
   */
  const onClickHome = () => {
    sessionStorage.removeItem("currentDate");
    setActionTrigger("home");
  };
  const onClickExplore = () => {
    sessionStorage.removeItem("exploreSelected");
    sessionStorage.removeItem("exploreScrollTop_LATEST");
    sessionStorage.removeItem("exploreScrollTop_POPULARITY");
    setActionTrigger("explore");
  };
  const onClickAlbum = () => {
    sessionStorage.removeItem("scrollPosition");
    setActionTrigger("album");
  };
  const onClickMypage = () => {
    setActionTrigger("mypage");
  };
  return [
    {
      icon: <Home />,
      label: "홈",
      path: ROUTE_PATH.HOME,
      onClick: onClickHome,
    },
    {
      icon: <Sns />,
      label: "일기 공유",
      path: ROUTE_PATH.EXPLORE,
      onClick: onClickExplore,
    },
    {
      icon: <Album />,
      label: "앨범",
      path: ROUTE_PATH.ALBUM,
      onClick: onClickAlbum,
    },
    {
      icon: <Who />,
      label: "마이페이지",
      path: ROUTE_PATH.MYPAGE,
      onClick: onClickMypage,
    },
  ];
};
