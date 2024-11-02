import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../../../constants/routePath";

interface ThumbnailProps {
  src: string;
  alt: string;
  diaryId: number;
}

/**
 * 앨범 썸네일
 * @param src 이미지 img
 * @param alt 이미지 alt
 * @param diaryId 일기 ID
 * @returns
 */
const Thumbnail = ({ src, alt, diaryId }: ThumbnailProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`${RoutePaths.diary}/${diaryId}`);
  };

  return (
    <div className="relative h-[11.125rem] w-[6.375rem] cursor-pointer" onClick={onClickHandler}>
      {!isLoaded && <div className="absolute left-0 top-0 h-full w-full bg-gray-100"></div>}

      <img
        src={src}
        alt={alt}
        className={`h-full w-full rounded transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default Thumbnail;
