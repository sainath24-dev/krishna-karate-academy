import React, { useState, useEffect } from 'react';
import { useAcademyData } from '../../context/AcademyDataContext';
import './TournamentCountdown.css';

export function TournamentCountdown({ className = '' }) {
  const { tournaments } = useAcademyData();
  const [selectedTournament, setSelectedTournament] = useState(tournaments[0] || null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (tournaments && tournaments.length > 0) {
      // Keep selected or reset to first
      setSelectedTournament((prev) => {
        const found = tournaments.find((t) => t.id === prev?.id);
        return found || tournaments[0];
      });
    }
  }, [tournaments]);

  useEffect(() => {
    if (!selectedTournament) return;

    const calculateTime = () => {
      const target = new Date(selectedTournament.targetDate).getTime();
      const difference = target - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [selectedTournament]);

  const padZero = (n) => String(n).padStart(2, '0');

  if (!selectedTournament) return null;

  return (
    <div className={`tournament-countdown-block ${className}`}>
      {/* Tournament Selector Tabs */}
      <div className="countdown-tab-list" role="tablist">
        {tournaments.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={selectedTournament.id === t.id}
            className={`countdown-tab ${selectedTournament.id === t.id ? 'is-active' : ''}`}
            onClick={() => setSelectedTournament(t)}
          >
            <span className="tab-dot" />
            <span className="tab-title">{t.title}</span>
          </button>
        ))}
      </div>

      {/* Main Countdown Display */}
      <div className="countdown-hero-card">
        <div className="countdown-header-info">
          <div className="countdown-status-badge">
            <span className="status-indicator-ember" />
            <span>{selectedTournament.status}</span>
          </div>
          <h3 className="countdown-event-title">{selectedTournament.title}</h3>
          <p className="countdown-event-sub">{selectedTournament.subtitle}</p>
        </div>

        {/* JetBrains Mono Digits Grid */}
        <div className="countdown-digits-grid">
          <div className="countdown-digit-box">
            <span className="digit-value mono-text">{padZero(timeLeft.days)}</span>
            <span className="digit-label">DAYS</span>
          </div>
          <div className="digit-separator">:</div>
          <div className="countdown-digit-box">
            <span className="digit-value mono-text">{padZero(timeLeft.hours)}</span>
            <span className="digit-label">HOURS</span>
          </div>
          <div className="digit-separator">:</div>
          <div className="countdown-digit-box">
            <span className="digit-value mono-text">{padZero(timeLeft.minutes)}</span>
            <span className="digit-label">MINUTES</span>
          </div>
          <div className="digit-separator">:</div>
          <div className="countdown-digit-box">
            <span className="digit-value mono-text">{padZero(timeLeft.seconds)}</span>
            <span className="digit-label">SECONDS</span>
          </div>
        </div>

        {/* Location & Categories Meta */}
        <div className="countdown-meta-row">
          <div className="meta-col">
            <span className="meta-label">TOURNAMENT VENUE</span>
            <span className="meta-value">{selectedTournament.location}</span>
          </div>
          <div className="meta-col">
            <span className="meta-label">PARTICIPATING CATEGORIES</span>
            <div className="meta-tags">
              {(selectedTournament.categories || ['Kata Forms', 'Kumite Sparring']).map((cat, i) => (
                <span key={i} className="meta-tag mono-text">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
