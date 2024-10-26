import StyleOption from "./StyleOption";
import dummy from "../../../assets/dummy/_Image.png";
import { useState } from "react";

const styles = [
  { id: 1, image: dummy, text: "수채화1" },
  { id: 2, image: dummy, text: "수채화2" },
  { id: 3, image: dummy, text: "수채화3" },
  { id: 4, image: dummy, text: "수채화4" },
  { id: 5, image: dummy, text: "수채화5" },
];

interface StyleOptionGridProps {
  selectedStyle: string;
  onClickStyle: Function;
}

const StyleOptionGrid = ({ selectedStyle, onClickStyle }: StyleOptionGridProps) => {
  const handleClick = (styleText: string) => {
    onClickStyle(styleText);
  };

  return (
    <div className="grid grid-cols-3 place-items-center gap-900 overflow-scroll">
      {styles.map((style) => (
        <StyleOption
          key={style.id}
          image={style.image}
          text={style.text}
          isSelected={style.text === selectedStyle}
          onClick={() => handleClick(style.text)}
        />
      ))}
    </div>
  );
};
export default StyleOptionGrid;
