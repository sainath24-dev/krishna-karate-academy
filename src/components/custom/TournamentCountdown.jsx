import React, { useState, useEffect } from 'react';
import './TournamentCountdown.css';

const TOURNAMENTS = [
  {
    id: 'hyd-tourn-2026',
    title: 'Hyderabad Tournament',
    subtitle: 'State & Open Invitational Martial Arts Championship · 5 – 6 September',
    targetDate: new Date('2026-09-05T09:00:00'),
    location: 'Hyderabad, Telangana',
    categories: ['Kata Forms Division', 'Sparring / Kumite', 'Junior & Senior Cadet Championship'],
    status: 'Upcoming Tournament · 5 - 6 September'
  },
  {
    id: 'aurangabad-nat-2026',
    title: 'All-India National Karate Championship — Aurangabad',
    subtitle: 'National Level Federation Championship',
    targetDate: new Date('2026-12-05T08:30:00'),
    location: 'District Sports Complex, Aurangabad, Maharashtra',
    categories: ['National Cadet Forms', 'Team Sparring Championship', 'Senior Open Weight'],
    status: 'Intensive Training Camp Active'
  },
  {
    id: 'karnataka-state-2026',
    title: 'Karnataka State Martial Arts Championship',
    subtitle: 'Annual State Championship Tournament',
    targetDate: new Date('2026-10-18T09:00:00'),
    location: 'Indoor Stadium, Bidar / Bengaluru, Karnataka',
    categories: ['All 12 Belt Divisions (White to Black Belt)', 'Kids Under-18 Forms & Sparring'],
    status: 'Registration Open'
  }
];

export function TournamentCountdown({ className = '' }) {
  const [selectedTournament, setSelectedTournament] = useState(TOURNAMENTS[0]);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const difference = selectedTournament.targetDate.getTime() - new Date().getTime();

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

  return (
    <div className={`tournament-countdown-block ${className}`}>
      {/* Tournament Selector Tabs */}
      <div className="countdown-tab-list" role="tablist">
        {TOURNAMENTS.map((t) => (
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
              {selectedTournament.categories.map((cat, i) => (
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
