import { useEffect, useRef, useState } from "react";

/**
 * 훅을 사용하는 컴포넌트가 랜더링 될 때 ref에 옵저버 등록
 * 사용자 뷰에 threshold만큼 ref요소가 들어오면 isInView true 리턴
 * @param {number} threshold 임계점
 * @returns { isInView, elementRef }
 */
const useInView = <T extends Element>(threshold: number, onViewEscape?: () => void) => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            if (onViewEscape) onViewEscape();
            else setIsInView(false);
          }
        });
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef.current]);

  return { isInView, elementRef };
};

export default useInView;
