import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavBarProps {
  NavList: {
    icon: ReactNode;
    path: string;
    label: string;
    onClick: () => void;
  }[];
}

/**
 * 하단 공통 NavBar
 * @param NavList nav배열
 * @returns
 */
const Navbar = ({ NavList }: NavBarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="h-[5.25rem] flex-shrink-0 border-t-[1px] border-gray-100 bg-background dark:border-gray-800">
      <ul className="flex flex-row justify-center gap-600 px-800 pt-500">
        {NavList.map((element) => (
          <li
            key={element.label}
            className={`w-[4.375rem] ${
              currentPath === element.path ||
              (element.path !== "/" && currentPath.startsWith(element.path))
                ? "text-primary-normal"
                : "text-gray-100 dark:text-gray-700"
            }`}
          >
            <Link
              to={element.path}
              className="flex flex-col items-center justify-center gap-200"
              onClick={element.onClick}
            >
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
