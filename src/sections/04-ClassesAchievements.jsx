import React from 'react';
import { Stepper } from '../components/ui/Stepper';
import { useCountUp } from '../components/custom/useCountUp';
import './04-ClassesAchievements.css';

const BATCH_SCHEDULES = [
  {
    title: '18+ Adults Morning Class',
    subtitle: 'Men & Women (Ages 18+)',
    beltLabel: '18+ Morning Batch',
    beltColor: '#e60000',
    headline: 'STRENGTH, DISCIPLINE & COMBAT DEFENSE',
    description: 'Exclusive morning training for adult students, working professionals, and seniors aged 18 and above. Focuses on authentic martial arts, endurance, agility, and street combat self-defense.',
    schedule: [
      { days: 'Morning Batch (Mon to Sat)', time: '05:00 AM – 07:00 AM' },
      { days: 'Advanced Morning Sparring', time: '06:00 AM – 07:00 AM' }
    ],
    curriculum: [
      'Adult combat conditioning and core stamina',
      'Realistic street self-defense & reflex sparring',
      'Mental focus, stress release & leadership'
    ],
    duration: 'DAILY MORNING',
    gradingInfo: 'Strict Rule: 18+ Students Attend Morning Batch'
  },
  {
    title: '18- Kids & Teens Evening Class',
    subtitle: 'Children & Youth (Under 18)',
    beltLabel: '18- Evening Batch',
    beltColor: '#2B70C9',
    headline: 'DISCIPLINE, CONFIDENCE & TOURNAMENT FORMS',
    description: 'Dedicated after-school evening karate class for children and youth under 18. Structured training to build razor-sharp focus, anti-bullying confidence, fitness, and tournament Kata preparation.',
    schedule: [
      { days: 'Evening Batch (Mon to Sat)', time: '05:00 PM – 07:00 PM' }
    ],
    curriculum: [
      'Character building, focus & anti-bullying defense',
      'Tournament kata, pad kicks & agile sparring',
      'Step-by-step 12-belt syllabus progression'
    ],
    duration: 'DAILY EVENING',
    gradingInfo: 'Strict Rule: Under-18 Students Attend Evening Batch'
  },
  {
    title: 'Housewives Early Morning Class',
    subtitle: 'Special Women Fitness & Self-Defense',
    beltLabel: '4:00 AM Special Batch',
    beltColor: '#a855f7',
    headline: 'EARLY MORNING EMPOWERMENT & WELLNESS',
    description: 'A dedicated, secure early morning batch exclusively designed for housewives and homemakers. Start the day with energy, flexibility, peace of mind, and practical personal safety skills before household routines begin.',
    schedule: [
      { days: 'Early Morning (Mon to Sat)', time: '04:00 AM – 05:00 AM' }
    ],
    curriculum: [
      'Full body joint mobility, weight control & flexibility',
      'Practical situational self-defense techniques',
      'Mindfulness, breathing drills & energy revitalization'
    ],
    duration: '04:00 AM DAILY',
    gradingInfo: 'Customized pace for homemakers & women'
  }
];

const PACKAGES = [
  {
    name: 'BEGINNER PROGRAM',
    price: '₹1,000',
    period: '/ month',
    badge: 'NEW STUDENTS',
    featured: false,
    desc: 'Great starting point for new students beginning their 12-belt progression in Bidar.',
    features: [
      'Dedicated 1-Batch daily training (Morning / Evening / 4 AM)',
      'Includes 2–3 Days Free Trial',
      'Indian Martial Arts & Karate syllabus',
      'Quarterly belt promotion eligibility',
      'Safe, friendly and disciplined environment'
    ],
    ctaText: 'Enroll for ₹1,000'
  },
  {
    name: 'REGULAR TRAINING',
    price: '₹1,200',
    period: '/ month',
    badge: 'MOST POPULAR',
    featured: true,
    desc: 'Daily comprehensive training for dedicated students aiming for 5-year Black Belt progression.',
    features: [
      'Daily dedicated batch (18+ Morning / 18- Evening / 4 AM Housewives)',
      'Sparring, reflex & combat self-defense',
      'Hyderabad & National tournament coaching',
      'Direct personal guidance from Sensei Krishna',
      'Priority registration for belt examinations'
    ],
    ctaText: 'Join Regular for ₹1,200'
  },
  {
    name: 'ADMISSION & UNIFORM',
    price: '₹2,000',
    period: 'one-time',
    badge: 'STARTER KIT',
    featured: false,
    desc: 'One-time official academy registration and official Karate Gi training uniform.',
    features: [
      'Official Krishna Karate Academy Uniform (Gi)',
      'Official White Belt included',
      'Lifetime Academy Student Registration',
      'Student progress record & syllabus card',
      'Includes first 2–3 Days Free Trial'
    ],
    ctaText: 'Get Starter Kit'
  }
];

export function ClassesAchievementsSection() {
  const stat1 = useCountUp(3, 1500);
  const stat2 = useCountUp(20, 2000);
  const stat3 = useCountUp(80, 2200);
  const stat4 = useCountUp(15, 1800);

  return (
    <section id="classes" className="content-band-light classes-section-wrapper">
      <div className="section-wrapper">
        <div className="section-heading-block">
          <span className="eyebrow-uppercase">STRUCTURED BATCHES & TUITION</span>
          <h2 className="display-lg classes-heading">
            Class Batches, Attendance Rules & Fees
          </h2>
          <p className="body-md section-subtitle">
            Structured daily batches tailored for 18+ adults, under-18 youth, and housewives with transparent affordable fees.
          </p>
        </div>

        {/* STRICT 1-CLASS ATTENDANCE RULE CALLOUT */}
        <div className="attendance-policy-banner">
          <div className="policy-badge">
            <span>⚠️ STRICT ACADEMY RULE</span>
          </div>
          <div className="policy-content">
            <h3 className="policy-title">Strict Single-Class Policy (No Double Batches)</h3>
            <p className="policy-desc body-sm">
              <strong>No matter how much fee is paid, students can attend ONLY ONE dedicated class per day.</strong>{' '}
              18+ adults attend morning class, under-18 students attend evening class, and housewives attend the 4:00 AM early batch. 
              This ensures quality focus, proper bodily recovery, and authentic martial arts discipline.
            </p>
          </div>
        </div>

        {/* Stepper Level Walkthrough (6px Card) */}
        <div className="classes-stepper-container">
          <Stepper
            steps={BATCH_SCHEDULES}
            initialStep={0}
            backButtonText="Previous Batch"
            nextButtonText="Next Batch"
          />
        </div>

        <hr className="divider-on-light" />

        {/* 3 Training Package Cards (Vodafone Tier Specs) */}
        <div className="packages-block">
          <div className="packages-header">
            <span className="eyebrow-uppercase">CLEAR & AFFORDABLE TUITION</span>
            <h3 className="display-sm packages-title">MONTHLY TRAINING PACKAGES</h3>
          </div>

          <div className="packages-grid">
            {PACKAGES.map((pkg, i) => (
              <div
                key={i}
                className={`pricing-tier-card ${pkg.featured ? 'pricing-tier-featured' : 'pricing-tier-default'}`}
              >
                <div className="package-badge-wrap">
                  <span className={`badge-chip ${pkg.featured ? 'badge-chip-red' : ''}`}>
                    {pkg.badge}
                  </span>
                </div>

                <h4 className="package-name">{pkg.name}</h4>
                <p className="package-desc body-sm">{pkg.desc}</p>

                <div className="package-price-box">
                  <span className="package-price">{pkg.price}</span>
                  <span className="package-period caption">{pkg.period}</span>
                </div>

                <ul className="package-feature-list">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="package-feature-item body-sm">
                      <span className="feature-check">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={pkg.featured ? 'button-primary btn-package-cta' : 'btn-outline-ink btn-package-cta'}
                >
                  {pkg.ctaText}
                </a>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider-on-light" />

        {/* ACADEMY MILESTONES & ACHIEVEMENTS */}
        <div className="achievements-block">
          <div className="achievements-heading">
            <span className="eyebrow-uppercase">OUR 15-YEAR TRACK RECORD</span>
            <h3 className="display-sm achievements-title">ACADEMY MILESTONES & ACHIEVEMENTS</h3>
          </div>

          <div className="achievements-stats-grid">
            <div ref={stat1.elementRef} className="card-content-soft achievement-stat-card">
              <div className="stat-number-box">
                <span className="stat-count">{stat1.count}+</span>
              </div>
              <h4 className="stat-label">Black Belts Produced</h4>
              <p className="stat-sub caption">Disciplined students who completed 5 years of training and official Dan examinations</p>
            </div>

            <div ref={stat2.elementRef} className="card-content-soft achievement-stat-card">
              <div className="stat-number-box">
                <span className="stat-count">{stat2.count}+</span>
              </div>
              <h4 className="stat-label">Championship Medals</h4>
              <p className="stat-sub caption">Gold & Silver victories in International, National & State Tournaments</p>
            </div>

            <div ref={stat3.elementRef} className="card-content-soft achievement-stat-card">
              <div className="stat-number-box">
                <span className="stat-count">{stat3.count}+</span>
              </div>
              <h4 className="stat-label">Active Students</h4>
              <p className="stat-sub caption">Dedicated students currently training at our Bidar training center</p>
            </div>

            <div ref={stat4.elementRef} className="card-content-soft achievement-stat-card">
              <div className="stat-number-box">
                <span className="stat-count">{stat4.count}+</span>
              </div>
              <h4 className="stat-label">Years of Experience</h4>
              <p className="stat-sub caption">Continuous martial arts practice and coaching in Bidar, Karnataka</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
