import StyleOption from "./StyleOption";
import { Style } from "../../../types/types";

interface StyleOptionGridProps {
  selectedStyle: string;
  onClickStyle: Function;
  styles: Style[];
}

const StyleOptionGrid = ({ selectedStyle, onClickStyle, styles }: StyleOptionGridProps) => {
  const handleClick = (styleText: string) => {
    onClickStyle(styleText);
  };

  return (
    <div className="grid grid-cols-3 place-items-center gap-900 overflow-scroll">
      {styles.map((style, index) => (
        <StyleOption
          key={style.name}
          image={style.imageUrl}
          text={style.koreanName}
          index={index}
          isSelected={style.name === selectedStyle}
          onClick={() => handleClick(style.name)}
        />
      ))}
    </div>
  );
};
export default StyleOptionGrid;
