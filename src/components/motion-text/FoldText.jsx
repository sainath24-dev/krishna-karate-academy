import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../custom/useReducedMotion';
import './FoldText.css';

export function FoldText({
  text = '',
  splitBy = 'word', // 'word' | 'char'
  hinge = 'top', // 'top' | 'bottom' | 'left' | 'right'
  color = '#EFE7D3',
  fontSize = 'clamp(1.5rem, 3vw, 2.5rem)',
  fontWeight = 700,
  stagger = 0.04,
  duration = 0.7,
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
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isReduced]);

  const units = splitBy === 'char' ? text.split('') : text.split(' ');

  const getHingeOrigin = () => {
    switch (hinge) {
      case 'top':
        return 'center top';
      case 'bottom':
        return 'center bottom';
      case 'left':
        return 'left center';
      case 'right':
        return 'right center';
      default:
        return 'center top';
    }
  };

  const getInitialTransform = () => {
    switch (hinge) {
      case 'top':
        return 'rotateX(-90deg)';
      case 'bottom':
        return 'rotateX(90deg)';
      case 'left':
        return 'rotateY(90deg)';
      case 'right':
        return 'rotateY(-90deg)';
      default:
        return 'rotateX(-90deg)';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fold-text-container ${className}`}
      style={{
        color,
        fontSize,
        fontWeight,
        ...style
      }}
      aria-label={text}
    >
      {units.map((unit, index) => {
        const isSpace = unit === ' ';
        return (
          <span
            key={index}
            className="fold-text-unit-wrapper"
            style={{
              perspective: '1000px',
              display: 'inline-block',
              marginRight: splitBy === 'word' ? '0.35em' : '0'
            }}
          >
            <span
              className="fold-text-unit"
              style={{
                display: 'inline-block',
                transformOrigin: getHingeOrigin(),
                transform: isVisible || isReduced ? 'none' : getInitialTransform(),
                opacity: isVisible || isReduced ? 1 : 0,
                transition: isReduced
                  ? 'none'
                  : `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${index * stagger}s, opacity ${duration * 0.8}s ease ${index * stagger}s`
              }}
            >
              {isSpace ? '\u00A0' : unit}
            </span>
          </span>
        );
      })}
    </div>
  );
}
