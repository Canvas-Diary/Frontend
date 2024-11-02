import { useState, useRef, useEffect } from "react";
import { Image } from "../../../pages/diary/Diary";

interface ImageCarouselProps {
  images: Image[];
}

/**
 * 일기 화면의 생성된 이미지들 캐러셀
 * @param images 이미지 {id, url} 배열
 * @returns
 */
const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null); // 타입 지정

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

  return (
    <div className="relative flex flex-col items-center justify-end">
      <div className="flex w-full snap-x snap-mandatory overflow-x-scroll" ref={containerRef}>
        {images.map((img) => (
          <img
            key={img.imageId}
            src={img.imageUrl}
            alt=""
            className="h-auto w-full flex-shrink-0 snap-start"
          />
        ))}
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
      </ol>
    </div>
  );
};

export default ImageCarousel;
