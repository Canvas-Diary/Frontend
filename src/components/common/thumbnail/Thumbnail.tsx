import { useState } from "react";

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
      {!isLoaded && (
        <div className="absolute left-0 top-0 h-full w-full rounded bg-gray-100 dark:bg-gray-600"></div>
      )}

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
