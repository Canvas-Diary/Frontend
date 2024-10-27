import Circle from "../../../assets/svg/circle.svg?react";
import { FADEINANIMATION } from "../../../styles/animations";

interface StyleOptionProps {
  image: string;
  text: string;
  isSelected: boolean;
  index: number;
  onClick: () => void;
}

const StyleOption = ({ image, text, isSelected, index, onClick }: StyleOptionProps) => {
  return (
    <div
      className={`relative flex h-fit w-fit flex-col items-center justify-start gap-800 ${FADEINANIMATION[index]}`}
      onClick={onClick}
    >
      {isSelected && (
        <div className="absolute">
          <Circle></Circle>
        </div>
      )}
      <img src={image} alt={text} className="h-[5.5rem] w-[5.5rem] rounded-full" />
      <div>{text}</div>
    </div>
  );
};

export default StyleOption;
