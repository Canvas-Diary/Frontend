import { useState } from "react";
import Circle from "@/assets/svg/circle.svg?react";
import { FADEINANIMATION } from "../../../styles/animations";

interface StyleOptionProps {
  image: string;
  text: string;
  isSelected: boolean;
  index: number;
  onClick: () => void;
}

const StyleOption = ({ image, text, isSelected, index, onClick }: StyleOptionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
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
      {!isLoaded && (
        <div className="absolute left-0 top-0 h-[5.5rem] w-[5.5rem] rounded-full bg-gray-100"></div>
      )}
      <img
        src={image}
        alt={text}
        className="h-[5.5rem] w-[5.5rem] rounded-full"
        onLoad={() => setIsLoaded(true)}
      />
      <div>{text}</div>
    </div>
  );
};

export default StyleOption;
