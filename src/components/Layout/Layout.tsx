import { Outlet, useLocation } from "react-router-dom";
import Home from "@/assets/svg/home.svg?react";
import Sns from "@/assets/svg/sns.svg?react";
import Album from "@/assets/svg/album.svg?react";
import Who from "@/assets/svg/who.svg?react";
import ROUTE_PATH from "@/constants/ROUTE_PATH";
import Navbar from "@/components/common/Navbar";

const GNB = [
  { icon: <Home />, label: "홈", path: ROUTE_PATH.HOME },
  { icon: <Sns />, label: "일기 공유", path: ROUTE_PATH.EXPLORE },
  { icon: <Album />, label: "앨범", path: ROUTE_PATH.ALBUM },
  { icon: <Who />, label: "마이페이지", path: ROUTE_PATH.MYPAGE },
];

/**
 * Content + Navbar(선택) 로 이루어진 기본 layout
 * location.pathname 으로 경로를 가져와 Navbar 렌더링 여부를 선택함
 * @returns
 */
const Layout = () => {
  const location = useLocation();
  const shouldDeleteNavBar = () => {
    return location.pathname.startsWith(ROUTE_PATH.DIARY);
  };

  return (
    <div className="flex h-dvh w-full flex-col">
      <Outlet />
      {!shouldDeleteNavBar() && <Navbar NavList={GNB} />}
    </div>
  );
};

export default Layout;
