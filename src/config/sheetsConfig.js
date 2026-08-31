/**
 * Google Sheets Headless CMS Configuration
 */

export const GOOGLE_SHEETS_CONFIG = {
  // Google Sheet ID from .env or config
  sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID || '',

  // Worksheets Tab Names
  tabs: {
    tournaments: 'Tournaments',
    hallOfFame: 'HallOfFame',
    blackBelts: 'BlackBelts'
  },

  // Cache duration (5 minutes)
  cacheDurationMs: 5 * 60 * 1000
};
