import { useState, useRef, useEffect } from "react";
import { DiaryImage } from "../../../types/types";
import ImageAddFilter from "./ImageAddFilter";
import defaultImage from "../../../assets/images/defaultImage.png";

interface ImageCarouselProps {
  images: DiaryImage[];
  canAdd: boolean;
  onLongPress?: (image: DiaryImage) => void;
}

/**
 * 일기 화면의 생성된 이미지들 캐러셀
 * @param images 이미지 {id, url} 배열
 * @returns
 */
const ImageCarousel = ({ images, canAdd, onLongPress }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startLongPress = (img: DiaryImage) => {
    if (onLongPress) {
      longPressTimerRef.current = setTimeout(() => onLongPress(img), 500);
    }
  };

  const cancelLongPress = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollLeft;
      const imageWidth = containerRef.current.offsetWidth;
      const index = Math.round(scrollPosition / imageWidth);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div>
      {images.length > 0 ? (
        <div className="flex flex-col items-center justify-end">
          <div className="flex w-full snap-x snap-mandatory overflow-x-scroll" ref={containerRef}>
            {images.map((img) => (
              <div
                key={img.imageId}
                onTouchStart={() => startLongPress(img)}
                onTouchEnd={cancelLongPress}
                className="relative h-auto w-full flex-shrink-0 snap-start"
              >
                {!isLoaded && (
                  <div className="absolute left-0 top-0 h-full w-full bg-gray-100"></div>
                )}
                <img
                  src={img.imageUrl}
                  alt={img.imageId}
                  className="h-full w-full"
                  onLoad={() => setIsLoaded(true)}
                />
              </div>
            ))}
            {canAdd && (
              <div className="relative h-auto w-full flex-shrink-0 snap-start">
                <div className="absolute left-0 top-0 h-full w-full">
                  <ImageAddFilter></ImageAddFilter>
                </div>
                {!isLoaded && (
                  <div className="absolute left-0 top-0 h-full w-full bg-gray-100"></div>
                )}
                <img
                  src={images[images.length - 1].imageUrl}
                  alt={images[images.length - 1].imageId}
                  className="inset-0 h-full w-full"
                  onLoad={() => setIsLoaded(true)}
                />
              </div>
            )}
          </div>
          <ol className="absolute mb-[3.5rem] flex justify-center gap-2">
            {images.map((_, index) => (
              <li
                key={index}
                className={`h-[0.375rem] w-[0.375rem] rounded-full ${
                  index === currentIndex ? "bg-primary-normal" : "bg-white"
                }`}
              ></li>
            ))}
            {canAdd && (
              <li
                key={images.length}
                className={`h-[0.375rem] w-[0.375rem] rounded-full ${
                  images.length === currentIndex ? "bg-primary-normal" : "bg-white"
                }`}
              ></li>
            )}
          </ol>
        </div>
      ) : (
        <div className="relative h-auto w-full flex-shrink-0">
          <div className="absolute left-0 top-0 h-full w-full">
            <ImageAddFilter></ImageAddFilter>
          </div>
          <img src={defaultImage} alt="canvas-diary" className="inset-0 h-full w-full" />
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
