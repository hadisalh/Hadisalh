import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChatView } from './pages/ChatView';
import { JournalView } from './pages/JournalView';
import { InspirationView } from './pages/InspirationView';
import { RelaxView } from './pages/RelaxView';
import { ConsultationView } from './pages/ConsultationView';
import { RuqyahView } from './pages/RuqyahView';
import { HomeView } from './pages/HomeView';
import { AdhkarView } from './pages/AdhkarView';
import type { JournalEntry, GuidanceResponse } from './types';
import { OnboardingTour } from './components/OnboardingTour';

export type View = 'home' | 'chat' | 'journal' | 'inspiration' | 'relax' | 'consultation' | 'ruqyah' | 'adhkar';

const viewLabels: Record<View, string> = {
  home: 'آية ترشدك',
  chat: 'الدردشة الإرشادية',
  journal: 'دفتر هدايتي',
  inspiration: 'ركن الإلهام',
  relax: 'واحة السكينة',
  consultation: 'الاستشارة الإسلامية',
  ruqyah: 'الرقية الشرعية',
  adhkar: 'أدعية وأذكار'
};

const JOURNAL_STORAGE_KEY = 'ayah-guidance-journal';
const ONBOARDING_STORAGE_KEY = 'ayah-guidance-onboarding-v1-shown';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<View>('home');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isTourOpen, setIsTourOpen] = useState(false);
  
  // Load journal entries from localStorage on initial render
  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem(JOURNAL_STORAGE_KEY);
      if (storedEntries) {
        setJournalEntries(JSON.parse(storedEntries));
      }
    } catch (e) {
      console.error("Failed to load journal from localStorage", e);
    }

    try {
      const tourShown = localStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (!tourShown) {
        setIsTourOpen(true);
      }
    } catch (e) {
      console.error("Failed to check onboarding status from localStorage", e);
      // Fallback to show it if localStorage is unavailable
      setIsTourOpen(true);
    }
  }, []);

  // Save journal entries to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(journalEntries));
    } catch (e) {
      console.error("Failed to save journal to localStorage", e);
    }
  }, [journalEntries]);

  const addToJournal = (problem: string, guidance: GuidanceResponse) => {
    const newEntry: JournalEntry = {
      id: new Date().toISOString(),
      problem,
      guidance,
    };
    // Add to the beginning of the array
    setJournalEntries(prev => [newEntry, ...prev]);
  };
  
  const handleViewChange = (view: View) => {
    setActiveView(view);
    setIsSidebarOpen(false);
  };

  const handleCloseTour = () => {
    setIsTourOpen(false);
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    } catch (e) {
      console.error("Failed to save onboarding status to localStorage", e);
    }
  };

  const renderActiveView = () => {
    switch(activeView) {
      case 'home':
        return <HomeView onNavigate={handleViewChange} />;
      case 'chat':
        return <ChatView addToJournal={addToJournal} />;
      case 'journal':
        return <JournalView entries={journalEntries} />;
      case 'adhkar':
        return <AdhkarView />;
      case 'inspiration':
        return <InspirationView />;
      case 'relax':
        return <RelaxView />;
      case 'consultation':
        return <ConsultationView />;
      case 'ruqyah':
        return <RuqyahView />;
      default:
        return <HomeView onNavigate={handleViewChange} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans" dir="rtl">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeView={activeView}
        onViewChange={handleViewChange}
        journalEntryCount={journalEntries.length}
      />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)}
          activeViewLabel={viewLabels[activeView]}
        />
        <main className="flex-grow overflow-y-auto">
          {renderActiveView()}
        </main>
        {isTourOpen && activeView === 'home' && <OnboardingTour onClose={handleCloseTour} />}
      </div>
    </div>
  );
};

export default App;