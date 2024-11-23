import { ButtonHTMLAttributes, ReactNode } from "react";

interface SettingItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  text: string;
  onClick: () => void;
}

const SettingItem = ({ icon, text, onClick, ...props }: SettingItemProps) => {
  return (
    <button {...props} onClick={onClick} className={`flex gap-500 text-start ${props.className}`}>
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default SettingItem;
