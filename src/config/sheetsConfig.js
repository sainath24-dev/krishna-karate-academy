/**
 * Google Sheets Headless CMS Configuration
 *
 * Connected Live Sheet: https://docs.google.com/spreadsheets/d/1J-3lSAbx2JtJSNdjPeyFZp6BWZuKNk_1/edit
 */

export const GOOGLE_SHEETS_CONFIG = {
  // Live Google Sheet ID
  sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID || '1J-3lSAbx2JtJSNdjPeyFZp6BWZuKNk_1',

  // Worksheets Tab Names
  tabs: {
    tournaments: 'Tournaments',
    hallOfFame: 'HallOfFame',
    blackBelts: 'BlackBelts'
  },

  // Cache duration (2 minutes for fast updates while preventing rate-limits)
  cacheDurationMs: 2 * 60 * 1000
};
