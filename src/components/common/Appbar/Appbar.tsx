import BackIcon from "@/assets/svg/back-button.svg?react";
import MenuIcon from "@/assets/svg/menu-dots.svg?react";
import { ReactNode } from "react";

interface AppBarProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  backHandler?: () => void;
  menuHandler?: () => void;
}

/**
 * 상단 AppBar
 * @param text 가운데 글귀
 * @param backHandler 뒤로가기 콜백 함수
 * @param menuHandler 메뉴버튼 콜백 함수
 * @param props 추가적인 div 속성
 * @returns
 */
const Appbar = ({ text, backHandler, menuHandler, className, ...props }: AppBarProps) => {
  return (
    <div
      className={`z-50 flex w-full items-center justify-between bg-transparent px-500 py-300 ${className}`}
      {...props}
    >
      <div className="w-7">
        {backHandler && <AppbarButton icon={<BackIcon />} onClickHandler={backHandler} />}
      </div>
      {text && <span className="font-Binggrae text-body-1 font-regular">{text}</span>}
      <div className="w-7">
        {menuHandler && <AppbarButton icon={<MenuIcon />} onClickHandler={menuHandler} />}
      </div>
    </div>
  );
};

export default Appbar;

interface AppbarButtonProps {
  icon: ReactNode;
  onClickHandler: () => void;
}

const AppbarButton = ({ icon, onClickHandler }: AppbarButtonProps) => {
  return (
    <button className="flex items-center justify-center text-white" onClick={onClickHandler}>
      {icon}
    </button>
  );
};
