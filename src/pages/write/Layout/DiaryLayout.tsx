import { Outlet } from "react-router-dom";
import Appbar from "../../../components/common/Appbar";

const DiaryLayout = () => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Appbar text="text" backHandler={() => {}}></Appbar>
      <Outlet />
    </div>
  );
};

export default DiaryLayout;
