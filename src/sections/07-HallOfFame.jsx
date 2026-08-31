import React from 'react';
import { useAcademyData } from '../context/AcademyDataContext';
import './07-HallOfFame.css';

export function HallOfFameSection() {
  const { champions } = useAcademyData();

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

        {/* Dynamic Champions Grid */}
        <div className="champions-grid">
          {champions.map((champ, idx) => (
            <div key={champ.id || idx} className="card-content-soft champion-card">
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
