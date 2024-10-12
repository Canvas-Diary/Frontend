interface ButtonProps {
  size: "big" | "small";
  active: boolean;
  text: string;
  onClickHandler: () => void;
}

/**
 * 공통 Button
 * @param size  버튼 크기
 * @param active 활성화 상태
 * @param text 버튼 글귀
 * @param onClickHandler 버튼 클릭 콜백 함수
 * @returns
 */
const Button = ({ size, active, text, onClickHandler }: ButtonProps) => {
  return (
    <button
      className={`${size === "big" ? "w-[20.4375rem]" : "w-[9.6875rem]"} ${active ? "bg-primary-light-2 text-primary-normal dark:bg-primary-normal dark:text-white" : "bg-primary-light-1 text-primary-light-3"} rounded-200 py-600 font-Binggrae text-body-1 font-regular`}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
};

export default Button;
