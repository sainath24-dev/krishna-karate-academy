import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../custom/useReducedMotion';
import { generateDojoFloorTexture } from '../../assets/dojoCanvasGenerator';
import './ScrollExpand.css';

export function ScrollExpand({
  src,
  title = 'KRISHNA KARATE ACADEMY',
  scrollHint = 'Scroll to Enter',
  startWidth = 40,
  startHeight = 56,
  startRadius = 20,
  endRadius = 0,
  mediaZoom = 1.3,
  scrollDistance = 1.1,
  holdDistance = 0.25,
  overlayScrim = 0.55,
  useWindowScroll = true,
  className = ''
}) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [imgSrc, setImgSrc] = useState(src || '');
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (!src) {
      setImgSrc(generateDojoFloorTexture());
    }
  }, [src]);

  useEffect(() => {
    if (isReduced) {
      setProgress(1);
      return;
    }

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = container.clientHeight - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const currentProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReduced]);

  // Interpolated properties
  const currentWidth = startWidth + (100 - startWidth) * progress;
  const currentHeight = startHeight + (100 - startHeight) * progress;
  const currentRadius = startRadius * (1 - progress);
  const currentScale = 1 + (mediaZoom - 1) * (1 - progress);
  const hintOpacity = Math.max(0, 1 - progress * 4);

  return (
    <div
      ref={containerRef}
      className={`scroll-expand-track ${className}`}
      style={{ minHeight: `${(scrollDistance + holdDistance) * 100}vh` }}
    >
      <div className="scroll-expand-sticky">
        <div
          className="scroll-expand-frame"
          style={{
            width: `${currentWidth}vw`,
            height: `${currentHeight}vh`,
            borderRadius: `${currentRadius}px`,
            boxShadow: progress > 0.05 ? '0 0 50px rgba(0,0,0,0.8)' : '0 20px 40px rgba(0,0,0,0.6)'
          }}
        >
          <div
            className="scroll-expand-bg"
            style={{
              backgroundImage: `url(${imgSrc})`,
              transform: `scale(${currentScale})`
            }}
          />

          <div
            className="scroll-expand-scrim"
            style={{ opacity: overlayScrim }}
          />

          {/* Central Title */}
          <div className="scroll-expand-content">
            <h1 className="scroll-expand-title">{title}</h1>
            <p className="scroll-expand-sub">DISCIPLINE · FITNESS · SELF DEFENSE</p>
          </div>

          {/* Scroll Hint */}
          <div
            className="scroll-expand-hint"
            style={{ opacity: hintOpacity }}
          >
            <span className="scroll-expand-hint-text">{scrollHint}</span>
            <div className="scroll-expand-arrow">↓</div>
          </div>
        </div>
      </div>
    </div>
  );
}
