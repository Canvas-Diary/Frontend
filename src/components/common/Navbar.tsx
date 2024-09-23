import { Link, useLocation } from "react-router-dom";
import Home from "../../assets/svg/home.svg?react";
import Sns from "../../assets/svg/sns.svg?react";
import Album from "../../assets/svg/album.svg?react";
import Who from "../../assets/svg/who.svg?react";
import RoutePaths from "../../constants/routePath";

const GNB = [
  { icon: <Home />, label: "홈", path: RoutePaths.home },
  { icon: <Sns />, label: "일기 공유", path: RoutePaths.explore },
  { icon: <Album />, label: "앨범", path: RoutePaths.album },
  { icon: <Who />, label: "마이페이지", path: RoutePaths.mypage },
];

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="h-[5.25rem] border-t-[1px] border-gray-100 bg-white">
      <ul className="flex flex-row justify-center gap-600 px-800 pt-500">
        {GNB.map((element) => (
          <li
            key={element.label}
            className={`w-[4.375rem] ${
              currentPath === element.path ? "text-primary-normal" : "text-gray-100"
            }`}
          >
            <Link to={element.path} className="flex flex-col items-center justify-center gap-200">
              <div className="flex h-7 w-7 items-center justify-center">{element.icon}</div>
              <span className="font-Binggrae text-detail-2 font-regular">{element.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
