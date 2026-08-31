/**
 * Krishna Karate Academy Central Data Store
 *
 * Official verified records for Tournaments, 12-Belt Progression Roadmap,
 * Hall of Fame Student Medalists, and Black Belt Register.
 */

export const ACADEMY_DATA = {
  // UPCOMING TOURNAMENTS
  tournaments: [
    {
      id: 'hyd-tourn-2026',
      title: 'Hyderabad Tournament',
      subtitle: 'State & Open Invitational Martial Arts Championship · 5 – 6 September',
      targetDate: '2026-09-05T09:00:00',
      location: 'Hyderabad, Telangana',
      categories: ['Kata Forms Division', 'Kumite Sparring', 'Junior & Senior Cadet Championship'],
      status: 'Upcoming Tournament · 5 - 6 September'
    },
    {
      id: 'aurangabad-nat-2026',
      title: 'All-India National Karate Championship — Aurangabad',
      subtitle: 'National Level Federation Championship',
      targetDate: '2026-12-05T08:30:00',
      location: 'District Sports Complex, Aurangabad, Maharashtra',
      categories: ['National Cadet Forms', 'Team Sparring Championship', 'Senior Open Weight'],
      status: 'Intensive Training Camp Active'
    },
    {
      id: 'karnataka-state-2026',
      title: 'Karnataka State Martial Arts Championship',
      subtitle: 'Annual State Championship Tournament',
      targetDate: '2026-10-18T09:00:00',
      location: 'Indoor Stadium, Bidar / Bengaluru, Karnataka',
      categories: ['All 12 Belt Divisions (White to Black Belt)', 'Kids Under-18 Forms & Sparring'],
      status: 'Registration Open'
    }
  ],

  // 12-BELT PROGRESSION ROADMAP (5 YEARS DURATION)
  beltRoadmap: [
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
  ],

  // HALL OF FAME STUDENT MEDALISTS
  champions: [
    {
      id: 'champ-abhishek',
      name: 'Abhishek',
      title: 'International Gold Medalist',
      event: 'Hyderabad International Level Championship',
      badge: 'INTL GOLD',
      icon: '🥇'
    },
    {
      id: 'champ-janvi',
      name: 'Janvi',
      title: 'International Gold Medalist',
      event: 'Hyderabad International Level Championship',
      badge: 'INTL GOLD',
      icon: '🥇'
    },
    {
      id: 'champ-sakshi',
      name: 'Sakshi',
      title: 'National Gold Medalist',
      event: 'Aurangabad All-India National Championship',
      badge: 'NATIONAL GOLD',
      icon: '🥇'
    },
    {
      id: 'champ-akansha',
      name: 'Akansha',
      title: 'International Silver Medalist',
      event: 'Hyderabad International Level Championship',
      badge: 'INTL SILVER',
      icon: '🥈'
    },
    {
      id: 'champ-numan',
      name: 'Numan',
      title: 'National Gold Medalist',
      event: 'Hyderabad National Level Championship',
      badge: 'NATIONAL GOLD',
      icon: '🥇'
    }
  ],

  // BLACK BELT REGISTER
  blackBelts: [
    {
      tierName: '3RD DEGREE BLACK BELT (CHIEF INSTRUCTOR)',
      requirement: '15+ years of dedicated practice, international gold medal distinction, and founder of KKA Bidar',
      students: [
        {
          name: 'Krishna Kashinath Waldoddi',
          title: 'Founder & Chief Instructor',
          badge: '3RD DAN',
          status: 'Chennai Intl Gold Medalist · Head Examiner'
        }
      ]
    },
    {
      tierName: '1ST DEGREE BLACK BELT (ACADEMY GRADUATES)',
      requirement: 'Full 5-Year dedicated journey completion, rigorous Kata mastery, and board examination',
      students: [
        {
          name: 'Abhishek',
          title: 'Senior Black Belt Coach',
          badge: '1ST DAN',
          status: 'Junior Instructor'
        },
        {
          name: 'Sakshi',
          title: 'Senior Black Belt Athlete',
          badge: '1ST DAN',
          status: 'State Gold Medalist'
        }
      ]
    }
  ]
};
