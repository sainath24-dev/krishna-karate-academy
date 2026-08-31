import React, { useState, useEffect } from 'react';
import './DepthCarousel.css';

export function DepthCarousel({
  items = [],
  activeIndex: controlledIndex,
  onIndexChange,
  tiltDirection = 'center',
  tint = '#0B0A08',
  className = '',
  style = {}
}) {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIdx = controlledIndex !== undefined ? controlledIndex : internalIndex;

  useEffect(() => {
    if (controlledIndex !== undefined) {
      setInternalIndex(controlledIndex);
    }
  }, [controlledIndex]);

  const handleSelect = (idx) => {
    setInternalIndex(idx);
    onIndexChange?.(idx);
  };

  const handlePrev = () => {
    const nextIdx = (activeIdx - 1 + items.length) % items.length;
    handleSelect(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % items.length;
    handleSelect(nextIdx);
  };

  return (
    <div className={`depth-carousel-wrapper ${className}`} style={style}>
      <div className="depth-carousel-track">
        {items.map((item, idx) => {
          const offset = idx - activeIdx;
          const absOffset = Math.abs(offset);
          const isCenter = offset === 0;

          // 3D placement math
          const translateX = offset * 260;
          const translateZ = -absOffset * 180;
          let rotateY = offset * -25;
          if (tiltDirection === 'right') rotateY += 10;
          if (tiltDirection === 'left') rotateY -= 10;

          const opacity = Math.max(0, 1 - absOffset * 0.35);
          const zIndex = 20 - absOffset;

          return (
            <div
              key={idx}
              className={`depth-slide ${isCenter ? 'is-active' : ''}`}
              onClick={() => handleSelect(idx)}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                zIndex,
                opacity
              }}
            >
              <div className="depth-slide-card">
                <div className="depth-slide-img-box">
                  {item.src ? (
                    <img src={item.src} alt={item.title || `Gallery slide ${idx + 1}`} loading="lazy" />
                  ) : (
                    <div className="depth-slide-placeholder" style={{ background: item.bg || '#1c1512' }}>
                      <span className="depth-placeholder-emblem">{item.emblem || '🥋'}</span>
                    </div>
                  )}
                  <div
                    className="depth-slide-tint"
                    style={{
                      background: isCenter ? 'transparent' : `linear-gradient(to top, ${tint}, rgba(11,10,8,0.6))`
                    }}
                  />
                </div>

                <div className="depth-slide-info">
                  <div className="depth-slide-tag mono-text">{item.tag || `0${idx + 1}`}</div>
                  <h4 className="depth-slide-title">{item.title}</h4>
                  {item.desc && <p className="depth-slide-desc">{item.desc}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="depth-carousel-controls">
        <button
          type="button"
          className="depth-nav-btn depth-prev"
          onClick={handlePrev}
          aria-label="Previous Slide"
        >
          ←
        </button>

        <div className="depth-pagination-dots">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`depth-dot ${i === activeIdx ? 'is-active' : ''}`}
              onClick={() => handleSelect(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="depth-nav-btn depth-next"
          onClick={handleNext}
          aria-label="Next Slide"
        >
          →
        </button>
      </div>
    </div>
  );
}
