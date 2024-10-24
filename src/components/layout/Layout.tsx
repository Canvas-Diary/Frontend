import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Home from "../../assets/svg/home.svg?react";
import Sns from "../../assets/svg/sns.svg?react";
import Album from "../../assets/svg/album.svg?react";
import Who from "../../assets/svg/who.svg?react";
import RoutePaths from "../../constants/routePath";
import Navbar from "../common/Navbar";
import Appbar from "../common/Appbar";

const GNB = [
  { icon: <Home />, label: "홈", path: RoutePaths.home },
  { icon: <Sns />, label: "일기 공유", path: RoutePaths.explore },
  { icon: <Album />, label: "앨범", path: RoutePaths.album },
  { icon: <Who />, label: "마이페이지", path: RoutePaths.mypage },
];

/**
 * Appbar(선택) + Content + Navbar(선택) 로 이루어진 기본 layout
 * location.pathname 으로 경로를 가져와 Appbar와 Navbar 렌더링 여부를 선택함
 * @returns
 */
const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const shouldDeleteAppBar = () => {
    const pathsWithAppBar = [RoutePaths.home, RoutePaths.album];
    return pathsWithAppBar.includes(location.pathname);
  };

  const shouldDeleteNavBar = () => {
    return location.pathname.startsWith(RoutePaths.diary);
  };

  const getAppBarText = () => {
    switch (location.pathname) {
      case RoutePaths.explore:
        return "explore";
      case RoutePaths.mypage:
        return "마이페이지";
      case `${RoutePaths.diary}/0`:
        return "내 일기";
      default:
        return;
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      {!shouldDeleteAppBar() && (
        <Appbar
          text={getAppBarText()}
          backHandler={() => {
            navigate(-1);
          }}
          menuHandler={() => {}}
        />
      )}
      <Outlet></Outlet>
      {!shouldDeleteNavBar() && <Navbar NavList={GNB} />}
    </div>
  );
};

export default Layout;
