# 🥋 Krishna Karate Academy — Google Sheets Live CMS Setup Guide

Sensei Krishna can manage and update **Tournaments**, **Student Medalists (Hall of Fame)**, and **Black Belt Holders** directly from Google Sheets on his phone or laptop.

---

## 🛡️ Why Google Sheets CMS is 100% Secure
- **Google Account & 2-Factor Authentication (2FA)**: Only Sensei Krishna can log in to his Google account to edit the sheet.
- **Strict Read-Only Access**: Public visitors on the website have **zero write access** and can never tamper with your data.
- **Instant Updates**: Whenever Sensei adds a new student win or upcoming tournament in the Google Sheets app on his phone, the website automatically loads it.

---

## 📋 3-Step Setup (Takes ~2 Minutes)

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Name it: `Krishna Karate Academy Live Data`.
3. Create **3 Tabs (Sheets)** with these exact names:
   - `Tournaments`
   - `HallOfFame`
   - `BlackBelts`

---

### Step 2: Add the Column Headers & Sample Data

#### Tab 1: `Tournaments`
| Title | Subtitle | TargetDate | Location | Categories | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Hyderabad Tournament | State & Open Invitational Championship | 2026-09-05 09:00:00 | Hyderabad, Telangana | Kata Forms Division, Kumite Sparring | Upcoming Tournament · 5 - 6 September |
| All-India National Championship — Aurangabad | National Level Federation Championship | 2026-12-05 08:30:00 | Aurangabad, Maharashtra | Cadet Forms, Team Sparring | Intensive Training Camp Active |

#### Tab 2: `HallOfFame`
| Name | Title | Event | Badge | Icon |
| :--- | :--- | :--- | :--- | :--- |
| Abhishek | International Gold Medalist | Hyderabad International Level Championship | INTL GOLD | 🥇 |
| Janvi | International Gold Medalist | Hyderabad International Level Championship | INTL GOLD | 🥇 |
| Sakshi | National Gold Medalist | Aurangabad All-India National Championship | NATIONAL GOLD | 🥇 |
| Akansha | International Silver Medalist | Hyderabad International Level Championship | INTL SILVER | 🥈 |
| Numan | National Gold Medalist | Hyderabad National Level Championship | NATIONAL GOLD | 🥇 |

#### Tab 3: `BlackBelts`
| Tier | Requirement | StudentName | StudentTitle | StudentStatus | Badge |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 3rd Dan Black Belt (San-Dan) | Chief Instructor & Master Grade | Sensei Krishna | Founder & Chief Instructor | Head Examiner · 15+ Yrs Experience | 3RD DAN |
| 1st Dan Black Belt (Sho-Dan) | Full 5-Year Dedicated Journey | Abhishek | Senior Black Belt Coach | Junior Instructor | 1ST DAN |
| 1st Dan Black Belt (Sho-Dan) | Full 5-Year Dedicated Journey | Sakshi | Senior Black Belt Athlete | State Gold Medalist | 1ST DAN |

---

### Step 3: Make Sheet Publicly Viewable & Copy Sheet ID

1. In your Google Sheet, click the green **Share** button in the top right.
2. Under **General Access**, change from *"Restricted"* to **"Anyone with the link can view"** (Viewer mode).
3. Copy the **Sheet ID** from the browser URL:
   `https://docs.google.com/spreadsheets/d/`**`1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`**`/edit`
4. In your project, open `src/config/sheetsConfig.js` and paste your Sheet ID:
   ```javascript
   export const GOOGLE_SHEETS_CONFIG = {
     sheetId: 'YOUR_COPIED_SHEET_ID_HERE',
     ...
   };
   ```
   *(Or set `VITE_GOOGLE_SHEET_ID=YOUR_COPIED_SHEET_ID_HERE` in your `.env` file).*

---

### 🚀 Done!
Whenever Sensei Krishna opens Google Sheets on his phone and types a new student or tournament, the website will automatically sync and update the countdown timer and Hall of Fame!
