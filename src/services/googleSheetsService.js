import { GOOGLE_SHEETS_CONFIG } from '../config/sheetsConfig';
import { ACADEMY_DATA } from '../data/academyData';

/**
 * Robust CSV parser that handles quotes, commas, and varied headers.
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

  // Normalize header names by removing special chars and spaces
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
 * Finds the first matching value from multiple possible column header aliases.
 */
function getColumnValue(row, ...aliases) {
  for (const alias of aliases) {
    const normalized = alias.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (row[normalized] !== undefined && row[normalized] !== '') {
      return row[normalized];
    }
  }
  return '';
}

/**
 * Formats user-entered date strings into valid ISO format.
 */
function parseFlexibleDate(dateStr) {
  if (!dateStr) return '2026-09-05T09:00:00';
  const clean = dateStr.trim();

  // If already standard ISO
  if (!isNaN(Date.parse(clean))) {
    return new Date(clean).toISOString();
  }

  // Handle DD-MM-YYYY or DD/MM/YYYY
  const parts = clean.split(/[-/.\s]/);
  if (parts.length >= 3) {
    if (parts[0].length === 2 && parts[2].length === 4) {
      // DD/MM/YYYY -> YYYY-MM-DD
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}T09:00:00`;
    }
  }

  return '2026-09-05T09:00:00';
}

/**
 * Formats user-entered medal values into standardized badges and emojis.
 */
function parseMedalBadge(rawBadge) {
  const text = (rawBadge || '').toUpperCase();
  if (text.includes('INTL') && text.includes('GOLD')) return { badge: 'INTL GOLD', icon: '🥇' };
  if (text.includes('NATIONAL') && text.includes('GOLD')) return { badge: 'NATIONAL GOLD', icon: '🥇' };
  if (text.includes('STATE') && text.includes('GOLD')) return { badge: 'STATE GOLD', icon: '🥇' };
  if (text.includes('GOLD') || text.includes('1ST')) return { badge: 'GOLD MEDAL', icon: '🥇' };
  if (text.includes('SILVER') || text.includes('2ND')) return { badge: 'INTL SILVER', icon: '🥈' };
  if (text.includes('BRONZE') || text.includes('3RD')) return { badge: 'BRONZE MEDAL', icon: '🥉' };
  return { badge: rawBadge || 'CHAMPION', icon: '🥇' };
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
 * Fetches and parses all academy data from Google Sheets with intelligent column mapping.
 */
export async function fetchLiveAcademyData(forceRefresh = false) {
  const { sheetId, tabs, cacheDurationMs } = GOOGLE_SHEETS_CONFIG;

  if (!sheetId || sheetId.trim() === '') {
    return {
      data: ACADEMY_DATA,
      isLive: false,
      source: 'local_defaults'
    };
  }

  const cacheKey = `kka_sheets_cache_${sheetId}`;

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

    // 1. Parse Tournaments Tab with flexible aliases
    if (tournRows.status === 'fulfilled' && tournRows.value && tournRows.value.length > 0) {
      result.tournaments = tournRows.value.map((r, idx) => {
        const title = getColumnValue(r, 'title', 'tournament', 'tournamentname', 'name', 'event') || 'Karate Tournament';
        const subtitle = getColumnValue(r, 'subtitle', 'tagline', 'description', 'level') || 'Championship Tournament';
        const rawDate = getColumnValue(r, 'targetdate', 'date', 'tournamentdate', 'eventdate', 'timing');
        const location = getColumnValue(r, 'location', 'venue', 'city', 'place', 'address') || 'Bidar / Hyderabad';
        const categoriesRaw = getColumnValue(r, 'categories', 'category', 'divisions', 'events') || 'Kata Forms Division, Kumite Sparring';
        const status = getColumnValue(r, 'status', 'badge', 'state', 'notes') || 'Upcoming Tournament';

        return {
          id: 'gs-tourn-' + idx,
          title,
          subtitle,
          targetDate: parseFlexibleDate(rawDate),
          location,
          categories: categoriesRaw.split(/[,;]/).map((c) => c.trim()).filter(Boolean),
          status
        };
      });
    }

    // 2. Parse Hall of Fame Tab with flexible aliases
    if (champRows.status === 'fulfilled' && champRows.value && champRows.value.length > 0) {
      result.champions = champRows.value.map((r, idx) => {
        const name = getColumnValue(r, 'name', 'studentname', 'student', 'winner', 'athlete') || 'Student Achiever';
        const rawMedal = getColumnValue(r, 'badge', 'medal', 'medalwon', 'award', 'rank', 'position');
        const { badge, icon } = parseMedalBadge(rawMedal);
        const title = getColumnValue(r, 'title', 'studenttitle', 'achievement') || (badge + 'ist');
        const event = getColumnValue(r, 'event', 'tournament', 'championship', 'competition') || 'National Championship';

        return {
          id: 'gs-champ-' + idx,
          name,
          title,
          event,
          badge,
          icon
        };
      });
    }

    // 3. Parse Black Belts Tab with flexible aliases
    if (beltRows.status === 'fulfilled' && beltRows.value && beltRows.value.length > 0) {
      const tierMap = {};
      beltRows.value.forEach((r) => {
        const tier = getColumnValue(r, 'tier', 'dan', 'belttier', 'degree', 'level') || '1st Dan Black Belt (Sho-Dan)';
        const requirement = getColumnValue(r, 'requirement', 'criteria', 'qualification', 'details') || '5-Year Dedicated Journey Completion';
        const studentName = getColumnValue(r, 'studentname', 'name', 'student', 'graduate');
        const studentTitle = getColumnValue(r, 'studenttitle', 'title', 'role') || 'Black Belt Graduate';
        const studentStatus = getColumnValue(r, 'studentstatus', 'status', 'experience', 'exp') || 'Certified Black Belt';
        const badge = getColumnValue(r, 'badge', 'danrank', 'tag') || 'BLACK BELT';

        if (!tierMap[tier]) {
          tierMap[tier] = {
            tierName: tier,
            requirement,
            students: []
          };
        }
        if (studentName) {
          tierMap[tier].students.push({
            name: studentName,
            title: studentTitle,
            status: studentStatus,
            badge
          });
        }
      });
      result.blackBelts = Object.values(tierMap);
    }

    // Save to session cache
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: result }));
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
