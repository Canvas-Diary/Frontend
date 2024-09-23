import BackIcon from "../../assets/svg/back-button.svg?react";
import MenuIcon from "../../assets/svg/menu-dots.svg?react";

interface AppBarProps {
  text?: string;
  backHandler: () => void;
  menuHandler: () => void;
}

const Appbar = ({ text, backHandler, menuHandler }: AppBarProps) => {
  return (
    <div className="flex items-center justify-between px-800 py-300 text-black dark:text-white">
      <button className="h-7 w-8" onClick={backHandler}>
        <BackIcon />
      </button>
      {text && <span className="font-Binggrae text-body-1 font-regular">{text}</span>}
      <button className="h-7 w-8" onClick={menuHandler}>
        <MenuIcon />
      </button>
    </div>
  );
};

export default Appbar;
