import { useEffect, useState, type RefObject } from "react";

export const useNearViewport = (ref: RefObject<Element | null>, rootMargin = "400px 0px"): boolean => {
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isNear) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsNear(true);
        observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, isNear]);

  return isNear;
};
