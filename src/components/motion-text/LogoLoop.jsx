import React from 'react';
import './LogoLoop.css';

export function LogoLoop({
  logos = [],
  speed = 90,
  direction = 'left',
  logoHeight = 44,
  gap = 48,
  hoverSpeed = 0,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = '#0B0A08',
  className = '',
  style = {}
}) {
  // Triple the list for seamless infinite loop
  const displayLogos = [...logos, ...logos, ...logos];
  const duration = Math.max(12, 1000 / speed);

  return (
    <div
      className={`logoloop-container ${className}`}
      style={{
        '--gap': `${gap}px`,
        '--logo-height': `${logoHeight}px`,
        '--duration': `${duration}s`,
        '--fade-color': fadeOutColor,
        ...style
      }}
    >
      {fadeOut && <div className="logoloop-fade logoloop-fade-left" />}
      {fadeOut && <div className="logoloop-fade logoloop-fade-right" />}

      <div
        className={`logoloop-track ${direction === 'right' ? 'reverse' : ''}`}
      >
        {displayLogos.map((logo, idx) => (
          <div
            key={idx}
            className={`logoloop__item ${scaleOnHover ? 'scale-hover' : ''}`}
          >
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                title={logo.alt || logo.name}
              >
                {logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.alt || logo.name || 'Federation Logo'}
                    style={{ height: `${logoHeight}px` }}
                    loading="lazy"
                  />
                ) : (
                  <div className="logo-badge-fallback">
                    <span className="logo-badge-title">{logo.name}</span>
                    {logo.sub && <span className="logo-badge-sub">{logo.sub}</span>}
                  </div>
                )}
              </a>
            ) : logo.src ? (
              <img
                src={logo.src}
                alt={logo.alt || logo.name || 'Federation Logo'}
                style={{ height: `${logoHeight}px` }}
                loading="lazy"
              />
            ) : (
              <div className="logo-badge-fallback">
                <span className="logo-badge-title">{logo.name}</span>
                {logo.sub && <span className="logo-badge-sub">{logo.sub}</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
