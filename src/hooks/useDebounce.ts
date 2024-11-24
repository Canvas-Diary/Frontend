import { useEffect, useState } from "react";

interface DebounceParams<T> {
  value: T;
  delay?: number;
}

const useDebounce = <T>({ value, delay = 300 }: DebounceParams<T>): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
