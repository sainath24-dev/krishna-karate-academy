import { GOOGLE_SHEETS_CONFIG, DEFAULT_ACADEMY_DATA } from '../config/sheetsConfig';

/**
 * Robust CSV parser that correctly handles quoted strings with commas.
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
 * Fetches and parses a single worksheet tab as CSV from Google Sheets.
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
    throw new Error(`Google Sheets responded with HTTP status ${response.status}`);
  }

  const csvText = await response.text();
  return parseCSV(csvText);
}

/**
 * Fetches all academy data (Tournaments, HallOfFame, BlackBelts) from Google Sheets with caching.
 */
export async function fetchLiveAcademyData(forceRefresh = false) {
  const { sheetId, tabs, cacheDurationMs } = GOOGLE_SHEETS_CONFIG;

  // 1. If Sheet ID is not configured, immediately return default data
  if (!sheetId || sheetId.trim() === '') {
    return {
      data: DEFAULT_ACADEMY_DATA,
      isLive: false,
      source: 'local_defaults'
    };
  }

  const cacheKey = `kka_sheets_cache_${sheetId}`;

  // 2. Check cached data if not forcing refresh
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

  // 3. Fetch from Google Sheets
  try {
    const [tournRows, champRows, beltRows] = await Promise.allSettled([
      fetchSheetTab(sheetId, tabs.tournaments),
      fetchSheetTab(sheetId, tabs.hallOfFame),
      fetchSheetTab(sheetId, tabs.blackBelts)
    ]);

    const result = {
      tournaments: DEFAULT_ACADEMY_DATA.tournaments,
      champions: DEFAULT_ACADEMY_DATA.champions,
      blackBelts: DEFAULT_ACADEMY_DATA.blackBelts
    };

    // Parse Tournaments
    if (tournRows.status === 'fulfilled' && tournRows.value && tournRows.value.length > 0) {
      result.tournaments = tournRows.value.map((r, idx) => ({
        id: 'gs-tourn-' + idx,
        title: r.title || r.name || 'Karate Tournament',
        subtitle: r.subtitle || r.tagline || 'Championship Tournament',
        targetDate: r.targetdate || r.date || '2026-09-05T09:00:00',
        location: r.location || r.city || 'Bidar / Hyderabad',
        categories: (r.categories || 'Kata Forms, Kumite Sparring')
          .split(/[,;]/)
          .map((c) => c.trim())
          .filter(Boolean),
        status: r.status || 'Upcoming Tournament'
      }));
    }

    // Parse Hall of Fame / Champions
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

    // Parse Black Belt Register
    if (beltRows.status === 'fulfilled' && beltRows.value && beltRows.value.length > 0) {
      const tierMap = {};
      beltRows.value.forEach((r) => {
        const tier = r.tier || '1st Dan Black Belt (Sho-Dan)';
        if (!tierMap[tier]) {
          tierMap[tier] = {
            tier,
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

    // Save to Cache
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
    console.warn('Could not load Google Sheets live data, using local fallback:', error);
    return {
      data: DEFAULT_ACADEMY_DATA,
      isLive: false,
      source: 'fallback_error',
      error: error.message
    };
  }
}
