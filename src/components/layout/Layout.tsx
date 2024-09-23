import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";

const Layout = () => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex-grow">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
};

export default Layout;
