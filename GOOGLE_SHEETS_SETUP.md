# 🥋 Krishna Karate Academy — Google Sheets Live CMS Setup

I have already pre-built the entire spreadsheet for you: **[`Krishna_Karate_Academy_Data.xlsx`](file:///Users/sainath/Desktop/kka/Krishna_Karate_Academy_Data.xlsx)**.

It already contains all 3 tabs (`Tournaments`, `HallOfFame`, `BlackBelts`), column headers, and current academy data!

---

## ⚡ Super-Fast 1-Minute Setup

### Step 1: Upload the Spreadsheet to Google Drive
1. Open [Google Drive](https://drive.google.com).
2. Drag and drop **[`Krishna_Karate_Academy_Data.xlsx`](file:///Users/sainath/Desktop/kka/Krishna_Karate_Academy_Data.xlsx)** into Google Drive.
3. Double-click the uploaded file to open it in **Google Sheets**.

---

### Step 2: Make the Sheet Viewable
1. Click the green **Share** button in the top-right corner.
2. Under **General Access**, change from *"Restricted"* to **"Anyone with the link can view"** (Viewer mode).
3. Copy the link or extract the **Sheet ID** from the address bar:
   `https://docs.google.com/spreadsheets/d/`**`1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`**`/edit`

---

### Step 3: Paste the Sheet ID
Open [`.env`](file:///Users/sainath/Desktop/kka/.env) or [`src/config/sheetsConfig.js`](file:///Users/sainath/Desktop/kka/src/config/sheetsConfig.js) and paste your Sheet ID:

```env
VITE_GOOGLE_SHEET_ID=YOUR_COPIED_SHEET_ID_HERE
```

---

### 🎉 That's It!
Whenever Sensei Krishna opens Google Sheets on his phone and updates a tournament or adds a new medal winner, the website will automatically load and display it live worldwide!
