import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchLiveAcademyData } from '../services/googleSheetsService';
import { DEFAULT_ACADEMY_DATA, GOOGLE_SHEETS_CONFIG } from '../config/sheetsConfig';

const AcademyDataContext = createContext(null);

export function AcademyDataProvider({ children }) {
  const [academyData, setAcademyData] = useState(DEFAULT_ACADEMY_DATA);
  const [isLiveSync, setIsLiveSync] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  const loadData = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const { data, isLive } = await fetchLiveAcademyData(forceRefresh);
      setAcademyData(data);
      setIsLiveSync(isLive);
      setLastSyncTime(new Date());
    } catch {
      setAcademyData(DEFAULT_ACADEMY_DATA);
      setIsLiveSync(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshLiveSync = () => {
    return loadData(true);
  };

  return (
    <AcademyDataContext.Provider
      value={{
        tournaments: academyData.tournaments || DEFAULT_ACADEMY_DATA.tournaments,
        champions: academyData.champions || DEFAULT_ACADEMY_DATA.champions,
        blackBelts: academyData.blackBelts || DEFAULT_ACADEMY_DATA.blackBelts,
        isLiveSync,
        isLoading,
        lastSyncTime,
        refreshLiveSync,
        sheetConfig: GOOGLE_SHEETS_CONFIG
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
