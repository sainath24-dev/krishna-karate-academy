import React from 'react';
import { AcademyDataProvider } from './context/AcademyDataContext';
import { ClickSpark } from './components/ui/ClickSpark';
import { Navigation } from './components/ui/Navigation';
import { HeroSection } from './sections/01-Hero';
import { AboutSection } from './sections/02-About';
import { FacilitySection } from './sections/03-Facility';
import { ClassesAchievementsSection } from './sections/04-ClassesAchievements';
import { MatchesBeltsSection } from './sections/06-MatchesBelts';
import { HallOfFameSection } from './sections/07-HallOfFame';
import { ContactSection } from './sections/08-Contact';

export default function App() {
  return (
    <AcademyDataProvider>
      <ClickSpark
        sparkColor="#e60000"
        sparkSize={12}
        sparkRadius={18}
        sparkCount={6}
        duration={380}
        extraSparkColors={['#25282b', '#ffffff']}
      >
        <div className="dojo-app-root">
          <Navigation />
          <main>
            <HeroSection />
            <AboutSection />
            <FacilitySection />
            <ClassesAchievementsSection />
            <MatchesBeltsSection />
            <HallOfFameSection />
            <ContactSection />
          </main>
        </div>
      </ClickSpark>
    </AcademyDataProvider>
  );
}
