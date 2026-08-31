import React from 'react';
import { TournamentCountdown } from '../components/custom/TournamentCountdown';
import './06-MatchesBelts.css';

const BELT_ROADMAP = [
  { rank: 1, name: 'White Belt', color: '#f5f5f5', textColor: '#25282b', border: '#d1d5db', tag: 'Stage 1', desc: 'Foundation, basic stances, punches, and dojo etiquette' },
  { rank: 2, name: 'Yellow Belt', color: '#fbbf24', textColor: '#78350f', border: '#f59e0b', tag: 'Stage 2', desc: 'Core blocks, forward kicks, and defensive balance' },
  { rank: 3, name: 'Orange Belt', color: '#fb923c', textColor: '#7c2d12', border: '#ea580c', tag: 'Stage 3', desc: 'Agility footwork, side kicks, and speed drills' },
  { rank: 4, name: 'Green Belt', color: '#22c55e', textColor: '#14532d', border: '#16a34a', tag: 'Stage 4', desc: 'Combination strikes, roundhouse kicks, and basic kata' },
  { rank: 5, name: 'Blue Belt', color: '#3b82f6', textColor: '#1e3a8a', border: '#2563eb', tag: 'Stage 5', desc: 'Target pads, dynamic reflex training, and partner drills' },
  { rank: 6, name: 'Purple Belt', color: '#a855f7', textColor: '#581c87', border: '#9333ea', tag: 'Stage 6', desc: 'Controlled sparring, sweeping, and intermediate kata' },
  { rank: 7, name: 'Red Belt', color: '#ef4444', textColor: '#ffffff', border: '#dc2626', tag: 'Stage 7', desc: 'High impact power, combat defense, and advanced forms' },
  { rank: 8, name: 'Brown Belt', color: '#854d0e', textColor: '#ffffff', border: '#713f12', tag: 'Stage 8', desc: 'Senior kata mastery, tactical counter-striking' },
  { rank: 9, name: 'Brown Dan 1', color: '#713f12', textColor: '#ffffff', border: '#582f0e', tag: 'Stage 9', desc: 'Advanced sparring, multi-opponent situational defense' },
  { rank: 10, name: 'Brown Dan 2', color: '#582f0e', textColor: '#ffffff', border: '#3f2008', tag: 'Stage 10', desc: 'Leadership, assistant coaching, and endurance conditioning' },
  { rank: 11, name: 'Brown Dan 3', color: '#3f2008', textColor: '#ffffff', border: '#251204', tag: 'Stage 11', desc: 'Pre-Black Belt evaluation, master kata perfection' },
  { rank: 12, name: 'Black Belt (1st Dan)', color: '#111827', textColor: '#ffffff', border: '#e60000', tag: 'Mastery', desc: 'Official Board Certification · 5 Years of Dedication' }
];

const BELT_TIERS = [
  {
    tierName: '3RD DEGREE BLACK BELT (CHIEF INSTRUCTOR)',
    requirement: '15+ years of dedicated practice, international gold medal distinction, and founder of KKA Bidar',
    students: [
      {
        name: 'Krishna Kashinath Waldoddi',
        title: 'Founder & Chief Instructor',
        badge: '3RD DAN',
        status: 'Chennai Intl Gold Medalist',
        exp: '15+ Years'
      }
    ]
  },
  {
    tierName: '1ST DEGREE BLACK BELT (ACADEMY GRADUATES)',
    requirement: '5 Years of dedicated training through all 12 belt stages, rigorous Kata mastery, and board examination',
    students: [
      {
        name: 'KKA Black Belt Graduate',
        title: 'Black Belt · 1st Degree',
        badge: '1ST DAN',
        status: 'Certified Dan 1',
        exp: '5 Years Trained'
      },
      {
        name: 'KKA Black Belt Graduate',
        title: 'Black Belt · 1st Degree',
        badge: '1ST DAN',
        status: 'Certified Dan 1',
        exp: '5 Years Trained'
      },
      {
        name: 'KKA Black Belt Graduate',
        title: 'Black Belt · 1st Degree',
        badge: '1ST DAN',
        status: 'Certified Dan 1',
        exp: '5 Years Trained'
      }
    ]
  }
];

export function MatchesBeltsSection() {
  return (
    <section id="tournaments" className="matches-belts-section-wrapper">
      <div className="section-wrapper">
        {/* PART 1: UPCOMING TOURNAMENTS (FEATURING HYDERABAD 5-6 SEPT) */}
        <div className="tournaments-countdown-container">
          <div className="section-heading-block">
            <span className="eyebrow-uppercase">UPCOMING TOURNAMENTS</span>
            <h2 className="display-xl tournaments-heading">
              HYDERABAD TOURNAMENT (5 – 6 SEPTEMBER)
            </h2>
            <p className="body-md tournaments-sub">
              Our students actively prepare to represent Bidar at the upcoming <strong>Hyderabad Tournament on 5 – 6 September</strong>, 
              as well as State and National Championships.
            </p>
          </div>

          <div className="tournament-countdown-wrap">
            <TournamentCountdown />
          </div>
        </div>

        <hr className="divider-on-light" />

        {/* PART 2: 12-BELT PROGRESSION ROADMAP (5 YEARS DURATION) */}
        <div className="belt-roadmap-block">
          <div className="section-heading-block">
            <span className="eyebrow-uppercase">OFFICIAL 12-BELT SYLLABUS</span>
            <h3 className="display-xl tiers-title">THE 12-BELT PATHWAY TO BLACK BELT</h3>
            <p className="body-md tournaments-sub">
              A comprehensive <strong>5-Year Dedicated Journey</strong> through 12 rigorous martial arts belt stages to achieve the coveted Black Belt.
            </p>
            <div className="duration-pill-banner">
              <span className="duration-highlight">🥋 Total Duration: 5 Years For Black Belt</span>
              <span className="caption">Step-by-step examination and grading directly conducted by Sensei Krishna</span>
            </div>
          </div>

          <div className="belt-roadmap-grid">
            {BELT_ROADMAP.map((belt) => (
              <div key={belt.rank} className="belt-step-card">
                <div className="belt-step-header">
                  <span className="belt-rank-num">0{belt.rank < 10 ? belt.rank : belt.rank}</span>
                  <div
                    className="belt-visual-stripe"
                    style={{
                      backgroundColor: belt.color,
                      borderColor: belt.border
                    }}
                  />
                  <span className="badge-chip">{belt.tag}</span>
                </div>
                <h4 className="belt-name">{belt.name}</h4>
                <p className="belt-desc caption">{belt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider-on-light" />

        {/* PART 3: BLACK BELT REGISTER */}
        <div className="belt-tiers-block">
          <div className="section-heading-block">
            <span className="eyebrow-uppercase">BLACK BELT REGISTER</span>
            <h3 className="display-xl tiers-title">OUR BLACK BELT GRADUATES</h3>
            <p className="body-md tournaments-sub">
              Honoring students who have demonstrated perseverance, discipline, and skill 
              to complete the full 5-year curriculum and earn their official Black Belts.
            </p>
          </div>

          <div className="belt-tiers-list">
            {BELT_TIERS.map((tier, tierIdx) => (
              <div key={tierIdx} className="tier-group">
                <div className="tier-group-header">
                  <div className="tier-badge-strip">
                    <span className="tier-icon">🎖️</span>
                    <h4 className="tier-name">{tier.tierName}</h4>
                  </div>
                  <p className="tier-requirement body-sm">{tier.requirement}</p>
                </div>

                <div className="tier-students-grid">
                  {tier.students.map((student, sIdx) => (
                    <div key={sIdx} className="card-content-soft tier-student-card">
                      <div className="student-card-top">
                        <span className="badge-chip badge-chip-red">{student.badge}</span>
                        {student.badge === '3RD DAN' ? (
                          <img src="/sensei-krishna.jpg" alt="Sensei Krishna" className="student-badge-photo" />
                        ) : (
                          <span className="student-icon">🥋</span>
                        )}
                      </div>
                      <h5 className="student-name">{student.name}</h5>
                      <p className="student-title body-sm-strong">{student.title}</p>
                      <p className="student-status caption">{student.status} · {student.exp}</p>
                    </div>
                  ))}
                </div>

                {tierIdx < BELT_TIERS.length - 1 && <hr className="divider-on-light tier-divider" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
