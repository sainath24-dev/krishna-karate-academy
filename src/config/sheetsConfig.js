/**
 * Google Sheets Headless CMS Configuration for Krishna Karate Academy
 *
 * Sensei Krishna can manage tournaments and student wins directly from Google Sheets on his phone.
 * The Google Sheet is protected by Google 2FA, while the website reads data safely in read-only mode.
 */

export const GOOGLE_SHEETS_CONFIG = {
  // Google Sheet ID (From the URL: https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit)
  // Set to empty string or valid ID. If empty or offline, fallback data is automatically used.
  sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID || '',

  // Sheet Tab Names
  tabs: {
    tournaments: 'Tournaments',
    hallOfFame: 'HallOfFame',
    blackBelts: 'BlackBelts'
  },

  // Cache duration in milliseconds (5 minutes to optimize performance and prevent rate-limiting)
  cacheDurationMs: 5 * 60 * 1000
};

export const DEFAULT_ACADEMY_DATA = {
  tournaments: [
    {
      id: 'hyd-tourn-2026',
      title: 'Hyderabad Tournament',
      subtitle: 'State & Open Invitational Martial Arts Championship · 5 – 6 September',
      targetDate: '2026-09-05T09:00:00',
      location: 'Hyderabad, Telangana',
      categories: ['Kata Forms Division', 'Sparring / Kumite', 'Junior & Senior Cadet Championship'],
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

  champions: [
    {
      id: 'c1',
      name: 'Abhishek',
      title: 'International Gold Medalist',
      event: 'Hyderabad International Level Championship',
      badge: 'INTL GOLD',
      icon: '🥇'
    },
    {
      id: 'c2',
      name: 'Janvi',
      title: 'International Gold Medalist',
      event: 'Hyderabad International Level Championship',
      badge: 'INTL GOLD',
      icon: '🥇'
    },
    {
      id: 'c3',
      name: 'Sakshi',
      title: 'National Gold Medalist',
      event: 'Aurangabad All-India National Championship',
      badge: 'NATIONAL GOLD',
      icon: '🥇'
    },
    {
      id: 'c4',
      name: 'Akansha',
      title: 'International Silver Medalist',
      event: 'Hyderabad International Level Championship',
      badge: 'INTL SILVER',
      icon: '🥈'
    },
    {
      id: 'c5',
      name: 'Numan',
      title: 'National Gold Medalist',
      event: 'Hyderabad National Level Championship',
      badge: 'NATIONAL GOLD',
      icon: '🥇'
    }
  ],

  blackBelts: [
    {
      tier: '3rd Dan Black Belt (San-Dan)',
      requirement: 'Chief Instructor & Master Grade',
      students: [
        {
          name: 'Krishna Kashinath Waldoddi',
          title: 'Founder & Chief Instructor',
          status: 'Head Examiner · 15+ Yrs Master Experience',
          badge: '3RD DAN'
        }
      ]
    },
    {
      tier: '1st Dan Black Belt (Sho-Dan)',
      requirement: 'Full 5-Year Journey Completion & Federation Accreditation',
      students: [
        {
          name: 'Abhishek',
          title: 'Senior Black Belt Coach',
          status: 'Junior Instructor',
          badge: '1ST DAN'
        },
        {
          name: 'Sakshi',
          title: 'Senior Black Belt Athlete',
          status: 'State Gold Medalist',
          badge: '1ST DAN'
        }
      ]
    }
  ]
};
