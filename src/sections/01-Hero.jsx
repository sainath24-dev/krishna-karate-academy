import React, { useRef, useEffect } from 'react';
import './01-Hero.css';

export function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Loop within 0 to 8.5 seconds
    const handleTimeUpdate = () => {
      if (video.currentTime >= 8.5) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <section id="hero" className="hero-master-container">
      {/* Cinematic Animated Karate Video Background (8-9s Loop) */}
      <div className="hero-video-layer" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-background-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-bg.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
      </div>

      {/* Spacious Hero Content Perfectly Centered Across All Screen Ratios */}
      <div className="hero-center-content">
        {/* Category Pill Chip */}
        <div className="badge-chip hero-badge-chip">
          <span className="badge-chip-dot" />
          <span>ESTD 2012 · BIDAR, KARNATAKA</span>
        </div>

        {/* Grand Display Headline with KRISHNA (Black), KARATE (Red), ACADEMY (Black) */}
        <h1 className="display-hero hero-main-title">
          <span className="title-word-krishna">KRISHNA</span>{' '}
          <span className="title-word-karate">KARATE</span>{' '}
          <span className="title-word-academy">ACADEMY</span>
        </h1>

        {/* Sub-Headline */}
        <p className="display-md hero-sub-title">
          We Are The Best — Building Discipline, Real Self-Defense & Championship Spirit in Bidar.
        </p>

        {/* 60px Pill Buttons */}
        <div className="hero-action-buttons">
          <a href="#contact" className="button-primary hero-btn-primary">
            <span>Free 2–3 Days Trial</span>
            <span className="btn-arrow">→</span>
          </a>
          <a href="#classes" className="button-outline-dark hero-btn-secondary">
            <span>View Classes & Fees</span>
          </a>
        </div>
      </div>
    </section>
  );
}
