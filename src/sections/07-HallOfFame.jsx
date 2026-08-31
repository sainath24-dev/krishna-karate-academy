import React from 'react';
import './07-HallOfFame.css';

const STANDOUT_CHAMPIONS = [
  {
    name: 'Abhishek',
    title: 'International Gold Medalist',
    event: 'Hyderabad International Level Championship',
    badge: 'INTL GOLD',
    icon: '🥇'
  },
  {
    name: 'Janvi',
    title: 'International Gold Medalist',
    event: 'Hyderabad International Level Championship',
    badge: 'INTL GOLD',
    icon: '🥇'
  },
  {
    name: 'Sakshi',
    title: 'National Gold Medalist',
    event: 'Aurangabad All-India National Championship',
    badge: 'NATIONAL GOLD',
    icon: '🥇'
  },
  {
    name: 'Akansha',
    title: 'International Silver Medalist',
    event: 'Hyderabad International Level Championship',
    badge: 'INTL SILVER',
    icon: '🥈'
  },
  {
    name: 'Numan',
    title: 'National Gold Medalist',
    event: 'Hyderabad National Level Championship',
    badge: 'NATIONAL GOLD',
    icon: '🥇'
  }
];

export function HallOfFameSection() {
  return (
    <section id="hall-of-fame" className="content-band-light hall-of-fame-section-wrapper">
      <div className="section-wrapper">
        <div className="section-heading-block">
          <span className="eyebrow-uppercase">CHAMPION ACHIEVERS</span>
          <h2 className="display-lg fame-heading">
            Hall of Fame & Medal Winners
          </h2>
          <p className="body-md section-subtitle">
            Celebrating our students who brought home Gold and Silver medals
            representing Krishna Karate Academy Bidar across National and International championships.
          </p>
        </div>

        {/* 5 Real Champions Grid (6px Cards, Vodafone Spec) */}
        <div className="champions-grid">
          {STANDOUT_CHAMPIONS.map((champ, idx) => (
            <div key={idx} className="card-content-soft champion-card">
              <div className="champion-card-top">
                <span className="badge-chip badge-chip-red">{champ.badge}</span>
                <span className="champion-medal-icon">{champ.icon}</span>
              </div>
              <h3 className="champion-name">{champ.name}</h3>
              <p className="champion-title body-md-strong">{champ.title}</p>
              <p className="champion-event caption">{champ.event}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
