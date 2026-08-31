import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../custom/useReducedMotion';
import './CurvedLoop.css';

export function CurvedLoop({
  marqueeText = 'DRAG TO EXPLORE ✦ DRAG TO EXPLORE ✦',
  speed = 1.5,
  curveAmount = 220,
  direction = 'left',
  interactive = true,
  className = '',
  style = {}
}) {
  const isReduced = useReducedMotion();
  const [offset, setOffset] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const velocity = useRef(0);
  const animFrameId = useRef(null);

  const repeatedText = `${marqueeText} `.repeat(8);
  const pathId = `curved-path-${Math.random().toString(36).substr(2, 9)}`;

  // SVG dimensions
  const viewBoxWidth = 1440;
  const viewBoxHeight = 240;
  const startY = 180;
  const peakY = Math.max(10, startY - curveAmount);

  // Path data for smooth quadratic curve
  const pathD = `M -200 ${startY} Q ${viewBoxWidth / 2} ${peakY} ${viewBoxWidth + 200} ${startY}`;

  useEffect(() => {
    if (isReduced) return;

    let lastTime = performance.now();

    const loop = (time) => {
      const delta = (time - lastTime) / 16.66;
      lastTime = time;

      if (!isDragging.current) {
        const baseSpeed = (direction === 'left' ? -0.8 : 0.8) * speed;
        setOffset((prev) => (prev + baseSpeed * delta + velocity.current) % 10000);
        velocity.current *= 0.95; // damp drag velocity
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [direction, speed, isReduced]);

  const handlePointerDown = (e) => {
    if (!interactive) return;
    isDragging.current = true;
    startX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    startOffset.current = offset;
    velocity.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || !interactive) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    const diff = currentX - startX.current;
    velocity.current = diff * 0.15;
    setOffset(startOffset.current + diff * 1.5);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className={`curved-loop-jacket ${interactive ? 'is-interactive' : ''}`}
      style={style}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      role="marquee"
      aria-label={marqueeText}
    >
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className={`curved-loop-svg ${className}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>
        <text className="curved-loop-text">
          <textPath
            href={`#${pathId}`}
            startOffset={`${offset}px`}
            method="align"
            spacing="auto"
          >
            {repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
