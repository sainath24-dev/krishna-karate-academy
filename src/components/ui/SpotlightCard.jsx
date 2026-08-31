import React, { useRef, useState } from 'react';
import './SpotlightCard.css';

export function SpotlightCard({
  children,
  spotlightColor = 'rgba(255, 75, 31, 0.16)',
  className = '',
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setOpacity(1);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      className={`card-spotlight ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--spotlight-color': spotlightColor,
        ...style
      }}
      {...props}
    >
      <div
        className="spotlight-layer"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, var(--spotlight-color), transparent 80%)`
        }}
      />
      <div className="card-spotlight-content">{children}</div>
    </div>
  );
}
