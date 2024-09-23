import BackIcon from "../../assets/svg/back-button.svg?react";
import MenuIcon from "../../assets/svg/menu-dots.svg?react";

const Appbar = () => {
  return (
    <div className="flex items-center justify-between px-800 py-300">
      <button className="h-7 w-8">
        <BackIcon />
      </button>
      <span className="font-Binggrae text-body-1 font-regular">Text</span>
      <button className="h-7 w-8">
        <MenuIcon />
      </button>
    </div>
  );
};

export default Appbar;
