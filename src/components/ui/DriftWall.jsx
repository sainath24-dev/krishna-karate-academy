import React, { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from '../custom/useReducedMotion';
import './DriftWall.css';

export function DriftWall({
  items = [],
  columns = 5,
  tilt = 14,
  turn = -12,
  overlayColor = '#0B0A08',
  dim = 0.55,
  grayscale = true,
  className = ''
}) {
  const containerRef = useRef(null);
  const [driftOffset, setDriftOffset] = useState({ x: 0, y: 0 });
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const xRatio = (e.clientX / innerWidth - 0.5) * 2;
      const yRatio = (e.clientY / innerHeight - 0.5) * 2;
      setDriftOffset({
        x: xRatio * 20,
        y: yRatio * 15
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isReduced]);

  return (
    <div className={`driftwall-outer ${className}`}>
      <div
        ref={containerRef}
        className="driftwall-perspective-box"
        style={{
          transform: isReduced
            ? 'none'
            : `perspective(1200px) rotateX(${tilt + driftOffset.y * 0.2}deg) rotateY(${turn + driftOffset.x * 0.2}deg) translateZ(-40px)`
        }}
      >
        <div
          className="driftwall-grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`
          }}
        >
          {items.map((item, idx) => (
            <div key={idx} className="driftwall-item">
              <div className={`driftwall-card ${grayscale ? 'is-grayscale' : ''}`}>
                <div className="driftwall-img-wrap">
                  {item.src ? (
                    <img src={item.src} alt={item.student || item.title || `Medalist ${idx + 1}`} loading="lazy" />
                  ) : (
                    <div className="driftwall-placeholder">
                      <span className="driftwall-emblem">{item.medalIcon || '🏅'}</span>
                    </div>
                  )}
                  <div
                    className="driftwall-overlay"
                    style={{
                      background: overlayColor,
                      opacity: dim
                    }}
                  />
                </div>

                <div className="driftwall-badge-info">
                  <span className="driftwall-medal-icon">{item.medalIcon || '🏅'}</span>
                  <div className="driftwall-text-block">
                    <span className="driftwall-student-name">{item.student}</span>
                    <span className="driftwall-event-title">{item.event}</span>
                    <span className="driftwall-year mono-text">{item.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
