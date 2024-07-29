import { useState, useEffect } from "react";

export default function useDebounce(
  upper: number,
  lower: number,
  setter: any,
  delay: number
) {
  const [debouncedValue, setDebouncedValue] = useState<number>(+lower);

  useEffect(() => {
    if (!upper || !lower) return;
    const handler = setTimeout(() => {
      if (+upper < +lower) {
        setDebouncedValue(+upper);
        setter(+upper);
      } else {
        setDebouncedValue(+lower);
        setter(+lower);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [upper]);

  return debouncedValue;
}
