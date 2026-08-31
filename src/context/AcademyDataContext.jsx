import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchLiveAcademyData } from '../services/googleSheetsService';
import { ACADEMY_DATA } from '../data/academyData';
import { GOOGLE_SHEETS_CONFIG } from '../config/sheetsConfig';

const AcademyDataContext = createContext(null);

export function AcademyDataProvider({ children }) {
  const [data, setData] = useState(ACADEMY_DATA);
  const [isLiveSync, setIsLiveSync] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async (force = false) => {
    setIsLoading(true);
    try {
      const response = await fetchLiveAcademyData(force);
      setData(response.data || ACADEMY_DATA);
      setIsLiveSync(response.isLive);
    } catch {
      setData(ACADEMY_DATA);
      setIsLiveSync(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <AcademyDataContext.Provider
      value={{
        tournaments: data.tournaments || ACADEMY_DATA.tournaments,
        beltRoadmap: ACADEMY_DATA.beltRoadmap,
        champions: data.champions || ACADEMY_DATA.champions,
        blackBelts: data.blackBelts || ACADEMY_DATA.blackBelts,
        isLiveSync,
        isLoading,
        refreshLiveSync: () => loadData(true),
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
