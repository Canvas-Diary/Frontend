import BackIcon from "../../assets/svg/back-button.svg?react";
import MenuIcon from "../../assets/svg/menu-dots.svg?react";

interface AppBarProps {
  text?: string;
  backHandler?: () => void;
  menuHandler?: () => void;
}

/**
 * 상단 AppBar
 * @param text 가운데 글귀
 * @param backHandler 뒤로가기 콜백 함수
 * @param menuHandler 메뉴버튼 콜백 함수
 * @returns
 */
const Appbar = ({ text, backHandler, menuHandler }: AppBarProps) => {
  return (
    <div className="relative z-50 flex w-full items-center justify-between bg-transparent px-800 py-300 text-black dark:text-white">
      <button className={`h-7 w-8 ${backHandler ? "visible" : "invisible"}`} onClick={backHandler}>
        <BackIcon />
      </button>

      {text && <span className="font-Binggrae text-body-1 font-regular">{text}</span>}

      <button className={`h-7 w-8 ${menuHandler ? "visible" : "invisible"}`} onClick={menuHandler}>
        <MenuIcon />
      </button>
    </div>
  );
};

export default Appbar;
