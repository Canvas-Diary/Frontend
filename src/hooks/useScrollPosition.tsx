import { useEffect, useRef, useState } from "react";

/**
 * 훅을 사용하는 컴포넌트가 랜더링 될 때 ref에 scroll event 등록
 * currentY 값과 lastY 값 제공
 * @returns { currentY, lastY, elementRef }
 */
const useScrollPosition = <T extends HTMLElement>() => {
  const [currentY, setCurrentY] = useState(0);
  const lastY = useRef(0);
  const scrollContainerRef = useRef<T>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            const scrollTop = scrollContainerRef.current.scrollTop;

            lastY.current = currentY;
            setCurrentY(scrollTop);

            ticking.current = false;
          }
        });
        ticking.current = true;
      }
    };

    const currentRef = scrollContainerRef.current;
    currentRef?.addEventListener("scroll", handleScroll);

    return () => {
      currentRef?.removeEventListener("scroll", handleScroll);
    };
  }, [currentY]);

  return { currentY, lastY: lastY.current, scrollContainerRef };
};

export default useScrollPosition;
