import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'kka_dynamic_academy_data';

const DEFAULT_TOURNAMENTS = [
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
];

const DEFAULT_CHAMPIONS = [
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
];

const DEFAULT_BLACK_BELTS = [
  {
    tier: '3rd Dan Black Belt (San-Dan)',
    requirement: 'Chief Instructor & Master Grade',
    students: [
      {
        name: 'Sensei Krishna',
        title: 'Founder & Chief Instructor',
        status: 'Head Examiner · 15+ Yrs Master Experience'
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
        status: 'Junior Instructor'
      },
      {
        name: 'Sakshi',
        title: 'Senior Black Belt Athlete',
        status: 'State Gold Medalist'
      }
    ]
  }
];

const AcademyDataContext = createContext(null);

export function AcademyDataProvider({ children }) {
  const [tournaments, setTournaments] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.tournaments && parsed.tournaments.length) return parsed.tournaments;
      }
    } catch {}
    return DEFAULT_TOURNAMENTS;
  });

  const [champions, setChampions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.champions && parsed.champions.length) return parsed.champions;
      }
    } catch {}
    return DEFAULT_CHAMPIONS;
  });

  const [blackBelts, setBlackBelts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.blackBelts && parsed.blackBelts.length) return parsed.blackBelts;
      }
    } catch {}
    return DEFAULT_BLACK_BELTS;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      const payload = { tournaments, champions, blackBelts };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {}
  }, [tournaments, champions, blackBelts]);

  // Open via hash change or shortcut
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHash);
    if (window.location.hash === '#admin') setIsAdminOpen(true);

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // TOURNAMENT ACTIONS
  const addTournament = (item) => {
    const newTournament = {
      ...item,
      id: 'tourn-' + Date.now()
    };
    setTournaments((prev) => [newTournament, ...prev]);
  };

  const updateTournament = (id, updated) => {
    setTournaments((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTournament = (id) => {
    setTournaments((prev) => prev.filter((t) => t.id !== id));
  };

  // CHAMPIONS ACTIONS
  const addChampion = (item) => {
    const newChamp = {
      ...item,
      id: 'champ-' + Date.now()
    };
    setChampions((prev) => [newChamp, ...prev]);
  };

  const updateChampion = (id, updated) => {
    setChampions((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const deleteChampion = (id) => {
    setChampions((prev) => prev.filter((c) => c.id !== id));
  };

  // BLACK BELT ACTIONS
  const addBlackBelt = (tierIndex, student) => {
    setBlackBelts((prev) => {
      const copy = [...prev];
      if (copy[tierIndex]) {
        copy[tierIndex] = {
          ...copy[tierIndex],
          students: [...copy[tierIndex].students, student]
        };
      }
      return copy;
    });
  };

  const deleteBlackBelt = (tierIndex, studentIndex) => {
    setBlackBelts((prev) => {
      const copy = [...prev];
      if (copy[tierIndex]) {
        copy[tierIndex] = {
          ...copy[tierIndex],
          students: copy[tierIndex].students.filter((_, idx) => idx !== studentIndex)
        };
      }
      return copy;
    });
  };

  // BACKUP & RESET
  const resetToDefaults = () => {
    setTournaments(DEFAULT_TOURNAMENTS);
    setChampions(DEFAULT_CHAMPIONS);
    setBlackBelts(DEFAULT_BLACK_BELTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const exportDataJSON = () => {
    const payload = { tournaments, champions, blackBelts, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `krishna-karate-academy-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDataJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.tournaments) setTournaments(parsed.tournaments);
      if (parsed.champions) setChampions(parsed.champions);
      if (parsed.blackBelts) setBlackBelts(parsed.blackBelts);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AcademyDataContext.Provider
      value={{
        tournaments,
        champions,
        blackBelts,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        setIsAuthenticated,
        addTournament,
        updateTournament,
        deleteTournament,
        addChampion,
        updateChampion,
        deleteChampion,
        addBlackBelt,
        deleteBlackBelt,
        resetToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </AcademyDataContext.Provider>
  );
}

export function useAcademyData() {
  const context = useContext(AcademyDataContext);
  if (!context) {
    throw new Error('useAcademyData must be used within an AcademyDataProvider');
  }
  return context;
}
