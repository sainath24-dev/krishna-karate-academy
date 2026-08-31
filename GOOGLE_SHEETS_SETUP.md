# 🥋 Google Sheets Headless CMS Guide

The Google Sheets CMS is active.

---

## 📁 Ready-to-Upload File
The spreadsheet **[`Krishna_Karate_Academy_Data.xlsx`](file:///Users/sainath/Desktop/kka/Krishna_Karate_Academy_Data.xlsx)** is pre-formatted with all 3 worksheets:
1. `Tournaments`
2. `HallOfFame`
3. `BlackBelts`

---

## ⚡ 1-Minute Activation:

1. **Upload to Google Drive**:  
   Drag and drop **[`Krishna_Karate_Academy_Data.xlsx`](file:///Users/sainath/Desktop/kka/Krishna_Karate_Academy_Data.xlsx)** into [Google Drive](https://drive.google.com).
2. **Open in Google Sheets & Share**:  
   Double-click to open → Click **Share** (top-right) → Change from *"Restricted"* to **"Anyone with the link can view"** (Viewer mode).
3. **Copy the Sheet ID**:  
   From the URL: `https://docs.google.com/spreadsheets/d/`**`PASTE_THIS_ID_HERE`**`/edit`
4. **Set in [`.env`](file:///Users/sainath/Desktop/kka/.env)**:
   ```env
   VITE_GOOGLE_SHEET_ID=YOUR_SHEET_ID_HERE
   ```

---

## 🔄 How Live Sync Works:
- When a `VITE_GOOGLE_SHEET_ID` is set, the website automatically loads the latest rows from Google Sheets on page load (with a 5-minute session cache).
- If offline or before the Sheet ID is added, the website automatically falls back to [`src/data/academyData.js`](file:///Users/sainath/Desktop/kka/src/data/academyData.js) so it always renders cleanly.
