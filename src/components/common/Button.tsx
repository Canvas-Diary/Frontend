interface ButtonProps {
  size: "big" | "small";
  active: boolean;
  text: string;
  onClickHandler: () => void;
}

const Button = ({ size, active, text, onClickHandler }: ButtonProps) => {
  return (
    <button
      className={`${size === "big" ? "w-[20.4375rem]" : "w-[9.6875rem]"} ${active ? "bg-primary-light-2 text-primary-normal dark:bg-primary-normal dark:text-white" : "bg-primary-light-1 text-primary-light-3"} rounded-200 bg-primary-light-2 py-600 font-Binggrae text-body-1 font-regular text-primary-normal`}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
};

export default Button;
