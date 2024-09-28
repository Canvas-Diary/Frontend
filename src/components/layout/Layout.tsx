import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import Appbar from "../common/Appbar";

const Layout = () => {
  const location = useLocation();

  const shouldDeleteAppBar = () => {
    const pathsWithAppBar = ["/", "/album"];
    return pathsWithAppBar.includes(location.pathname);
  };

  const getAppBarText = () => {
    switch (location.pathname) {
      case "/explore":
        return "explore";
      case "/mypage":
        return "마이페이지";
      default:
        return "";
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      {!shouldDeleteAppBar() && (
        <Appbar text={getAppBarText()} backHandler={() => {}} menuHandler={() => {}} />
      )}
      <div className="flex-grow overflow-scroll">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
};

export default Layout;
