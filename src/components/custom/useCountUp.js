import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useCountUp(targetNumber, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) {
      setCount(targetNumber);
      return;
    }

    if (!startOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, isReduced, startOnView, targetNumber]);

  useEffect(() => {
    if (!hasStarted || isReduced) return;

    let start = null;
    const startValue = 0;
    const endValue = typeof targetNumber === 'number' ? targetNumber : parseInt(targetNumber, 10);
    if (isNaN(endValue)) {
      setCount(targetNumber);
      return;
    }

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * (endValue - startValue) + startValue);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, targetNumber, duration, isReduced]);

  return { count, elementRef };
}
