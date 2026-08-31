import { GOOGLE_SHEETS_CONFIG } from '../config/sheetsConfig';
import { ACADEMY_DATA } from '../data/academyData';

/**
 * Robust CSV parser that correctly handles quoted strings and commas.
 */
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const parseLine = (line) => {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' || char === "'") {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim().replace(/^["']|["']$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim().replace(/^["']|["']$/g, ''));
    return values;
  };

  const headers = parseLine(lines[0]).map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;

    const values = parseLine(rawLine);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] !== undefined ? values[index] : '';
    });
    rows.push(row);
  }

  return rows;
}

/**
 * Fetches a single worksheet tab as CSV from Google Sheets.
 */
async function fetchSheetTab(sheetId, tabName) {
  if (!sheetId) return null;

  const url = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(
    sheetId
  )}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'text/csv' }
  });

  if (!response.ok) {
    throw new Error(`Google Sheets HTTP Error: ${response.status}`);
  }

  const csvText = await response.text();
  return parseCSV(csvText);
}

/**
 * Fetches all academy data (Tournaments, HallOfFame, BlackBelts) from Google Sheets with caching.
 */
export async function fetchLiveAcademyData(forceRefresh = false) {
  const { sheetId, tabs, cacheDurationMs } = GOOGLE_SHEETS_CONFIG;

  // If Sheet ID is not yet provided in .env, return local verified defaults seamlessly
  if (!sheetId || sheetId.trim() === '') {
    return {
      data: ACADEMY_DATA,
      isLive: false,
      source: 'local_defaults'
    };
  }

  const cacheKey = `kka_sheets_cache_${sheetId}`;

  // Check cached data if not forcing refresh
  if (!forceRefresh) {
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < cacheDurationMs) {
          return { data, isLive: true, source: 'cache' };
        }
      }
    } catch {}
  }

  try {
    const [tournRows, champRows, beltRows] = await Promise.allSettled([
      fetchSheetTab(sheetId, tabs.tournaments),
      fetchSheetTab(sheetId, tabs.hallOfFame),
      fetchSheetTab(sheetId, tabs.blackBelts)
    ]);

    const result = {
      tournaments: ACADEMY_DATA.tournaments,
      champions: ACADEMY_DATA.champions,
      blackBelts: ACADEMY_DATA.blackBelts
    };

    // Parse Tournaments Tab
    if (tournRows.status === 'fulfilled' && tournRows.value && tournRows.value.length > 0) {
      result.tournaments = tournRows.value.map((r, idx) => ({
        id: 'gs-tourn-' + idx,
        title: r.title || r.name || 'Karate Tournament',
        subtitle: r.subtitle || r.tagline || 'Championship Tournament',
        targetDate: r.targetdate || r.date || '2026-09-05T09:00:00',
        location: r.location || r.city || 'Bidar / Hyderabad',
        categories: (r.categories || 'Kata Forms Division, Kumite Sparring')
          .split(/[,;]/)
          .map((c) => c.trim())
          .filter(Boolean),
        status: r.status || 'Upcoming Tournament'
      }));
    }

    // Parse Hall of Fame Tab
    if (champRows.status === 'fulfilled' && champRows.value && champRows.value.length > 0) {
      result.champions = champRows.value.map((r, idx) => {
        const badge = (r.badge || 'INTL GOLD').toUpperCase();
        let icon = r.icon || '🥇';
        if (badge.includes('SILVER')) icon = '🥈';
        else if (badge.includes('BRONZE')) icon = '🥉';

        return {
          id: 'gs-champ-' + idx,
          name: r.name || r.studentname || 'Student Achiever',
          title: r.title || 'Medal Winner',
          event: r.event || r.tournament || 'National Championship',
          badge,
          icon
        };
      });
    }

    // Parse Black Belts Tab
    if (beltRows.status === 'fulfilled' && beltRows.value && beltRows.value.length > 0) {
      const tierMap = {};
      beltRows.value.forEach((r) => {
        const tier = r.tier || '1st Dan Black Belt (Sho-Dan)';
        if (!tierMap[tier]) {
          tierMap[tier] = {
            tierName: tier,
            requirement: r.requirement || '5-Year Dedicated Journey Completion',
            students: []
          };
        }
        if (r.studentname || r.name) {
          tierMap[tier].students.push({
            name: r.studentname || r.name,
            title: r.studenttitle || r.title || 'Black Belt Graduate',
            status: r.studentstatus || r.status || 'Certified Black Belt',
            badge: r.badge || 'BLACK BELT'
          });
        }
      });
      result.blackBelts = Object.values(tierMap);
    }

    // Save to session cache
    try {
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data: result })
      );
    } catch {}

    return {
      data: result,
      isLive: true,
      source: 'google_sheets'
    };
  } catch (error) {
    console.warn('Could not load live Google Sheets data, using default records:', error);
    return {
      data: ACADEMY_DATA,
      isLive: false,
      source: 'fallback'
    };
  }
}
