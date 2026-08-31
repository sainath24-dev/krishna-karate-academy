import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../custom/useReducedMotion';
import './ScrollFloat.css';

export function ScrollFloat({
  children,
  animationDuration = 1,
  ease = 'cubic-bezier(0.16, 1, 0.3, 1)',
  stagger = 0.035,
  as = 'h2',
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isReduced]);

  const text = typeof children === 'string' ? children : String(children ?? '');
  const chars = text.split('');
  const Tag = as;

  return (
    <Tag
      ref={containerRef}
      className={`scroll-float-text ${className}`}
      style={style}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="scroll-float-char"
          style={{
            display: 'inline-block',
            transform: isVisible || isReduced ? 'translateY(0) scale(1)' : 'translateY(120%) scale(0.8)',
            opacity: isVisible || isReduced ? 1 : 0,
            transition: isReduced
              ? 'none'
              : `transform ${animationDuration}s ${ease} ${i * stagger}s, opacity ${animationDuration * 0.7}s ease ${i * stagger}s`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  );
}
