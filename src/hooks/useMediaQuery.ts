import { useEffect, useState } from "react";

interface UseMediaQuery {
  width: number;
  height: number;
  calculatedHeight: number;
}

const useMediaQuery = (): UseMediaQuery => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [calculatedHeight, setCalculatedHeight] = useState((window.innerWidth * 7) / 4);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setCalculatedHeight((window.innerHeight * 7) / 4);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, height, calculatedHeight };
};

export default useMediaQuery;
