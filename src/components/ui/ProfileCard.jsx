import React, { useRef, useState } from 'react';
import './ProfileCard.css';

export function ProfileCard({
  name = 'Sensei Name',
  title = 'Head Instructor',
  handle = '3rd Degree Black Belt',
  status = '12 yrs coaching',
  contactText = 'View Profile',
  showUserInfo = true,
  avatarUrl,
  behindGlowEnabled = true,
  behindGlowColor = 'rgba(255, 75, 31, 0.5)',
  innerGradient = 'linear-gradient(145deg, #8C101766 0%, #C9A24B33 100%)',
  badge,
  onClick,
  className = '',
  style = {}
}) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.6
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      className={`profile-card-outer ${className}`}
      style={style}
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Ambient Behind Glow */}
      {behindGlowEnabled && (
        <div
          className="pc-behind-glow"
          style={{
            background: behindGlowColor,
            transform: `translate(${rotateY * 1.5}px, ${-rotateX * 1.5}px)`
          }}
        />
      )}

      <div
        ref={cardRef}
        className="profile-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          background: innerGradient
        }}
      >
        {/* Hot Metal Holo Shine */}
        <div
          className="pc-holo-glare"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 200, 100, 0.4) 0%, transparent 60%)`,
            opacity: glarePos.opacity
          }}
        />

        {/* Card Header & Avatar */}
        <div className="pc-card-inner">
          <div className="pc-avatar-container">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="pc-avatar" loading="lazy" />
            ) : (
              <div className="pc-avatar-placeholder">
                <span className="pc-avatar-emblem">🥋</span>
              </div>
            )}
            {badge && <div className="pc-badge">{badge}</div>}
          </div>

          {/* Details */}
          <div className="pc-details">
            <h3 className="pc-name">{name}</h3>
            <p className="pc-title">{title}</p>
          </div>

          {/* User Info Solid Panel */}
          {showUserInfo && (
            <div className="pc-user-info">
              <div className="pc-user-meta">
                <div className="pc-handle">{handle?.startsWith('@') ? handle : handle}</div>
                {status && <div className="pc-status">{status}</div>}
              </div>
              {contactText && (
                <button
                  type="button"
                  className="pc-contact-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                  }}
                >
                  {contactText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
