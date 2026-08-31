import React, { useState } from 'react';
import './02-About.css';

const PILLARS = [
  {
    number: '01',
    title: 'RESPECT & COURTESY',
    tagline: 'Strength Begins With Humility',
    tag: 'CORE FOUNDATION',
    desc: 'Respect for parents, coaches, elders, and training partners. Martial arts teaches that true power never needs to boast.'
  },
  {
    number: '02',
    title: 'UNWAVERING DISCIPLINE',
    tagline: 'Consistency Over Motivation',
    tag: 'DAILY HABIT',
    desc: 'Waking up early, showing up to the mat on time, and putting in focused practice every single day without excuses.'
  },
  {
    number: '03',
    title: 'HONEST EFFORT (100%)',
    tagline: 'Give Your All in Every Stance',
    tag: 'PROGRESS MINDSET',
    desc: 'No shortcuts. Real improvement, belt promotions, and championship gold come from giving 100% effort in every drill.'
  },
  {
    number: '04',
    title: 'SELF-CONTROL & PEACE',
    tagline: 'Karate Is Strictly For Protection',
    tag: 'DEFENSE CODE',
    desc: 'We strictly teach peaceful resolution and de-escalation. Karate skills are for defending yourself and protecting others.'
  },
  {
    number: '05',
    title: 'COURAGE & CONFIDENCE',
    tagline: 'Face Life Without Fear',
    tag: 'UNSTOPPABLE MIND',
    desc: 'Overcoming stage fright, peer pressure, and self-doubt. Developing the inner mental strength to face any challenge in life.'
  }
];

export function AboutSection() {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <section id="about" className="content-band-light about-section-wrapper">
      <div className="section-wrapper">
        {/* PART 1 — 5 PILLARS OF DISCIPLINE & CHARACTER */}
        <div className="about-philosophy-block">
          <div className="section-heading-block">
            <span className="eyebrow-uppercase">THE 5 PILLARS OF KRISHNA KARATE</span>
            <h2 className="display-lg philosophy-heading">
              Building Character, Focus & Real Self-Defense
            </h2>
            <p className="body-md section-subtitle">
              Karate is far more than physical strikes. Our training is built on 5 fundamental pillars that shape confident, disciplined, and respectful leaders.
            </p>
          </div>

          {/* Interactive 5 Pillars Grid */}
          <div className="pillars-grid">
            {PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className={`pillar-card ${activePillar === idx ? 'is-active-pillar' : ''}`}
                onMouseEnter={() => setActivePillar(idx)}
                onClick={() => setActivePillar(idx)}
              >
                <div className="pillar-card-top">
                  <span className="pillar-number">{pillar.number}</span>
                  <span className="badge-chip badge-chip-red">{pillar.tag}</span>
                </div>

                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-tagline body-sm-strong">{pillar.tagline}</p>
                <p className="pillar-desc body-sm">{pillar.desc}</p>

                <div className="pillar-bottom-bar" />
              </div>
            ))}
          </div>

          {/* Quick Impact Highlight Strip */}
          <div className="philosophy-impact-strip">
            <div className="impact-item">
              <span className="impact-check">✓</span>
              <div>
                <strong className="impact-title">100% Practical Self-Defense</strong>
                <span className="impact-sub caption">Life-saving awareness for kids and youth</span>
              </div>
            </div>
            <div className="impact-item">
              <span className="impact-check">✓</span>
              <div>
                <strong className="impact-title">Positive Anti-Bullying Mindset</strong>
                <span className="impact-sub caption">Builds confidence to stand tall and speak up</span>
              </div>
            </div>
            <div className="impact-item">
              <span className="impact-check">✓</span>
              <div>
                <strong className="impact-title">Full Body Fitness & Agility</strong>
                <span className="impact-sub caption">Boosts stamina, flexibility, and core health</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="divider-on-light" />

        {/* PART 2 — THE FOUNDER (2-SECTION LAYOUT: UPPER BIG IMAGE + LOWER INFORMATION) */}
        <div className="about-founders-block">
          <div className="section-heading-block">
            <span className="eyebrow-uppercase">FOUNDER & CHIEF INSTRUCTOR</span>
            <h2 className="display-lg philosophy-heading">
              15+ Years of Dedicated Martial Arts Legacy
            </h2>
          </div>

          <div className="founder-grand-card">
            {/* UPPER SECTION: BIG HERO IMAGE */}
            <div className="founder-upper-image-section">
              <img
                src="/sensei-krishna.jpg"
                alt="Sensei Krishna Kashinath Waldoddi"
                className="founder-big-hero-photo"
              />
              <div className="founder-image-gradient-overlay" />
              <div className="founder-floating-badge">
                <span className="badge-chip badge-chip-red">3RD DAN BLACK BELT</span>
              </div>
            </div>

            {/* LOWER SECTION: INFORMATION & DETAILS */}
            <div className="founder-lower-info-section">
              <div className="founder-info-header">
                <div>
                  <h3 className="founder-full-name display-sm">KRISHNA KASHINATH WALDODDI</h3>
                  <p className="founder-official-title body-md-strong">
                    Founder & Chief Instructor · Krishna Martial Art Karate School
                  </p>
                </div>
                <div className="founder-creds-strip">
                  <span className="badge-chip">Chennai Intl Gold Medalist</span>
                  <span className="badge-chip">ESTD Jan 1, 2012</span>
                  <span className="badge-chip">15+ Years Exp</span>
                </div>
              </div>

              <hr className="divider-on-light founder-inner-divider" />

              <div className="founder-info-columns">
                <div className="founder-story-column body-md">
                  <h4 className="story-subhead display-xs">It started with one mat and one belief.</h4>
                  <p>
                    Founded on <strong>January 1, 2012</strong> by Sensei Krishna Kashinath Waldoddi in Bidar, Karnataka, 
                    Krishna Karate Academy was established to make authentic martial arts, fitness, and life-saving self-defense accessible to all.
                  </p>
                  <p>
                    Over 15+ years, Sensei Krishna has trained over 80+ active students, produced official Black Belt graduates, 
                    and won 20+ National and International Medals across Hyderabad, Aurangabad, and Chennai.
                  </p>
                </div>

                <div className="founder-motto-column">
                  <div className="founder-quote-box">
                    <div className="quote-red-indicator" />
                    <div>
                      <p className="quote-text body-md-strong">
                        “WE ARE THE BEST — Karate is about building strong character, self-control, and unstoppable confidence.”
                      </p>
                      <span className="quote-author caption-uppercase">— Sensei Krishna Kashinath Waldoddi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
