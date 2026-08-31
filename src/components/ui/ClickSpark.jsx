import React, { useRef } from 'react';
import { useReducedMotion } from '../custom/useReducedMotion';

export function ClickSpark({
  children,
  sparkColor = '#C9A24B',
  sparkSize = 12,
  sparkRadius = 18,
  sparkCount = 6,
  duration = 380,
  extraSparkColors = ['#FF4B1F', '#FFF5EA']
}) {
  const containerRef = useRef(null);
  const isReduced = useReducedMotion();

  const handleClick = (e) => {
    if (isReduced) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const colors = [sparkColor, ...extraSparkColors];

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      const angle = (i / sparkCount) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
      const distance = sparkRadius * (0.8 + Math.random() * 0.8);
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = sparkSize * (0.6 + Math.random() * 0.6);

      spark.style.position = 'absolute';
      spark.style.left = `${clickX}px`;
      spark.style.top = `${clickY}px`;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.backgroundColor = color;
      spark.style.borderRadius = '50%';
      spark.style.boxShadow = `0 0 10px ${color}, 0 0 20px #FF4B1F`;
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '9999';
      spark.style.transform = 'translate(-50%, -50%) scale(1)';
      spark.style.transition = `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration}ms ease-out`;

      container.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => {
        if (container.contains(spark)) {
          container.removeChild(spark);
        }
      }, duration + 50);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      style={{ position: 'relative', width: '100%', minHeight: '100vh' }}
    >
      {children}
    </div>
  );
}
