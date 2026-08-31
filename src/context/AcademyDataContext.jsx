import React, { createContext, useContext } from 'react';
import { ACADEMY_DATA, getWhatsAppUpdateRequestUrl } from '../data/academyData';

const AcademyDataContext = createContext(null);

export function AcademyDataProvider({ children }) {
  return (
    <AcademyDataContext.Provider
      value={{
        tournaments: ACADEMY_DATA.tournaments,
        beltRoadmap: ACADEMY_DATA.beltRoadmap,
        champions: ACADEMY_DATA.champions,
        blackBelts: ACADEMY_DATA.blackBelts,
        whatsAppUpdateUrl: getWhatsAppUpdateRequestUrl()
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
