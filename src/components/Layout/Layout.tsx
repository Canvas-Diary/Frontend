import { Outlet, useLocation } from "react-router-dom";
import Home from "@/assets/svg/home.svg?react";
import Sns from "@/assets/svg/sns.svg?react";
import Album from "@/assets/svg/album.svg?react";
import Who from "@/assets/svg/who.svg?react";
import ROUTE_PATH from "@/constants/ROUTE_PATH";
import Navbar from "@/components/common/Navbar/Navbar";

const GNB = [
  { icon: <Home />, label: "홈", path: ROUTE_PATH.HOME },
  { icon: <Sns />, label: "일기 공유", path: ROUTE_PATH.EXPLORE },
  { icon: <Album />, label: "앨범", path: ROUTE_PATH.ALBUM },
  { icon: <Who />, label: "마이페이지", path: ROUTE_PATH.MYPAGE },
];

const NO_NAVBAR_PAGE = [ROUTE_PATH.DIARY, ROUTE_PATH.LOGIN, ROUTE_PATH.NO_DIARY];

/**
 * Content + Navbar(선택) 로 이루어진 기본 layout
 * @returns
 */
const Layout = () => {
  const shouldHideNavBar = useShouldHideNavBar(NO_NAVBAR_PAGE);

  return (
    <div className="flex h-dvh w-full flex-col">
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
