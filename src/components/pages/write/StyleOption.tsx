import Circle from "../../../assets/svg/circle.svg?react";

interface StyleOptionProps {
  image: string;
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const StyleOption = ({ image, text, isSelected, onClick }: StyleOptionProps) => {
  return (
    <div
      className="relative flex h-fit w-fit flex-col items-center justify-start gap-800"
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
