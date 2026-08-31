import React from 'react';
import './05-Teachers.css';

const INSTRUCTORS = [
  {
    name: 'Sensei Krishna Kashinath Waldoddi',
    title: 'Founder & Chief Instructor',
    handle: '3rd Degree Black Belt (3rd Dan)',
    badge: 'CHIEF INSTRUCTOR',
    isChief: true,
    specialty: 'Indian Martial Arts, Authentic Karate, Practical Self Defense & Black Belt Training',
    tournaments: [
      'Chennai International Level Championship — Gold Medalist',
      'Founder of Krishna Karate Academy Bidar (ESTD Jan 1, 2012)',
      'Coach of 20+ National & International Gold Medalists'
    ],
    bio: 'Founded Krishna Karate Academy in 2012 in Bidar. Dedicated over 15 years to empowering students with discipline, physical fitness, and real self-defense with the motto: "We Are The Best".'
  },
  {
    name: 'KKA Senior Forms Coach',
    title: 'Kata & Foundation Specialist',
    handle: 'Black Belt Instructor',
    badge: 'FORMS SPECIALIST',
    isChief: false,
    specialty: 'Precision Forms, Kids Foundation, Stance Balance & Coordination',
    tournaments: [
      'State Karate Championship Gold Medalist',
      'Specialized in Children & Beginner Foundation',
      'Lead Technical Examiner for Academy Belt Gradings'
    ],
    bio: 'Focuses on building perfect posture, clean striking techniques, and focus in children and new students under the direct mentorship of Sensei Krishna.'
  },
  {
    name: 'KKA Sparring & Fitness Lead',
    title: 'Sparring & Combat Self-Defense',
    handle: 'Black Belt Competitor',
    badge: 'SPARRING COACH',
    isChief: false,
    specialty: 'Fast Counter-Strikes, Reflex Timing, Agility Drills & Self Defense',
    tournaments: [
      'National Level Championship Medal Winner',
      'Active Tournament Squad Lead',
      'Specialist in Youth Agility & Reaction Drills'
    ],
    bio: 'Conducts high-energy sparring drills, reflex conditioning, and tournament fight camps to prepare KKA athletes for state and national championships.'
  }
];

export function TeachersSection() {
  return (
    <section id="masters" className="content-band-soft teachers-section-wrapper">
      <div className="section-wrapper">
        <div className="section-heading-block">
          <span className="eyebrow-uppercase">EXPERT INSTRUCTION</span>
          <h2 className="display-lg teachers-heading">
            Dedicated Instructors & Coaches
          </h2>
          <p className="body-md section-subtitle">
            Experienced black belt instructors dedicated to helping every student build confidence, technique, and discipline.
          </p>
        </div>

        {/* 3 Instructors Story Cards (6px Cards, Vodafone Spec) */}
        <div className="instructors-grid">
          {INSTRUCTORS.map((instructor, idx) => (
            <div
              key={idx}
              className={`card-content instructor-story-card ${instructor.isChief ? 'is-chief-card' : ''}`}
            >
              <div className="instructor-card-header">
                <span className={`badge-chip ${instructor.isChief ? 'badge-chip-red' : ''}`}>
                  {instructor.badge}
                </span>
                <span className="instructor-avatar-icon">🥋</span>
              </div>

              <div className="instructor-info-block">
                <h3 className="instructor-name">{instructor.name}</h3>
                <p className="instructor-title body-md-strong">{instructor.title}</p>
                <span className="instructor-rank caption">{instructor.handle}</span>
              </div>

              <p className="instructor-bio body-sm">{instructor.bio}</p>

              <div className="instructor-specialty-box">
                <span className="specialty-label caption-uppercase">SPECIALTY:</span>
                <p className="specialty-text body-sm-strong">{instructor.specialty}</p>
              </div>

              <div className="instructor-honors-list">
                <span className="honors-label caption-uppercase">KEY ACHIEVEMENTS:</span>
                <ul>
                  {instructor.tournaments.map((t, i) => (
                    <li key={i} className="body-sm">
                      <span className="honor-bullet">★</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
