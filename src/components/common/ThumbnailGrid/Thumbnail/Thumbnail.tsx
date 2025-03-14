import { useState } from "react";
import ThumbnailSkeleton from "../skeleton/ThumbnailSkeleton";

interface ThumbnailProps {
  src: string;
  alt: string;
  onClickHandler: () => void;
}

/**
 * 앨범 썸네일
 * @param src 이미지 img
 * @param alt 이미지 alt
 * @param onClickHandler
 * @returns
 */
const Thumbnail = ({ src, alt, onClickHandler }: ThumbnailProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-[11.125rem] w-[6.375rem] cursor-pointer" onClick={onClickHandler}>
      {!isLoaded && <ThumbnailSkeleton />}

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
