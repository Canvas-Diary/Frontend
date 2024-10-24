interface ButtonProps {
  size: "big" | "small";
  active: boolean;
  text: string;
  bgColor: "light" | "dark" | "gray";
  onClickHandler: () => void;
}

const bgColorStyle = {
  light: "bg-primary-light-2 text-primary-normal",
  dark: "bg-primary-normal text-white",
  gray: "bg-gray-100 text-gray-500",
  non: "bg-primary-light-1 text-primary-light-3",
};

/**
 * 공통 Button
 * @param size  버튼 크기
 * @param active 활성화 상태
 * @param text 버튼 글귀
 * @param bgColor 배경 색상
 * @param onClickHandler 버튼 클릭 콜백 함수
 * @returns
 */
const Button = ({ size, active, text, bgColor, onClickHandler }: ButtonProps) => {
  return (
    <button
      className={`${size === "big" ? "w-[20.4375rem]" : "w-[9.6875rem]"} ${active ? bgColorStyle[bgColor] : bgColorStyle.non} rounded-200 py-600 font-Binggrae text-body-1 font-regular`}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
};

export default Button;
