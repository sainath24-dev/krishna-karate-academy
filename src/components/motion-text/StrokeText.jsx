import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../custom/useReducedMotion';
import './StrokeText.css';

export function StrokeText({
  text = 'KRISHNA KARATE ACADEMY',
  strokeColor = '#C9A24B',
  fillColor = '#EFE7D3',
  strokeWidth = 1.6,
  drawDuration = 1.8,
  fillDelay = 0.15,
  stagger = 0.045,
  trigger = 'mount', // 'mount' | 'scroll'
  fillMode = 'wipe', // 'wipe' | 'fade'
  fontSize = 104,
  fontWeight = 800,
  letterSpacing = -2,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(trigger === 'mount');
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (trigger === 'mount' || isReduced) {
      setHasTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [trigger, isReduced]);

  // Approximate SVG viewBox dimensions based on text length and font size
  const charWidth = fontSize * 0.58;
  const totalWidth = Math.max(text.length * charWidth + 100, 800);
  const totalHeight = fontSize * 1.4;

  return (
    <div
      ref={containerRef}
      className={`stroke-text-wrapper ${className}`}
      style={style}
    >
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="stroke-text-svg"
        preserveAspectRatio="xMidYMid meet"
        aria-label={text}
        role="img"
      >
        <defs>
          <clipPath id={`wipe-clip-${text.replace(/\s+/g, '-').toLowerCase()}`}>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              className={`stroke-text__clip-rect ${hasTriggered ? 'is-wiping' : ''}`}
              style={{
                animationDuration: `${drawDuration * 0.9}s`,
                animationDelay: `${fillDelay}s`
              }}
            />
          </clipPath>
        </defs>

        {/* Base Stroke Layer */}
        <text
          x="50%"
          y="70%"
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight={fontWeight}
          letterSpacing={letterSpacing}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          className={`stroke-text__stroke ${hasTriggered ? 'is-drawing' : ''}`}
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: isReduced || hasTriggered ? 0 : 1000,
            transition: isReduced ? 'none' : `stroke-dashoffset ${drawDuration}s cubic-bezier(0.16, 1, 0.3, 1)`
          }}
        >
          {text}
        </text>

        {/* Ink Flooding / Wipe Fill Layer */}
        <text
          x="50%"
          y="70%"
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight={fontWeight}
          letterSpacing={letterSpacing}
          fill={fillColor}
          stroke="transparent"
          clipPath={fillMode === 'wipe' ? `url(#wipe-clip-${text.replace(/\s+/g, '-').toLowerCase()})` : undefined}
          className={`stroke-text__fill ${hasTriggered ? 'is-filled' : ''}`}
          style={{
            opacity: hasTriggered ? 1 : 0,
            transition: isReduced ? 'none' : `opacity ${drawDuration * 0.6}s ease ${drawDuration * 0.4 + fillDelay}s`
          }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
