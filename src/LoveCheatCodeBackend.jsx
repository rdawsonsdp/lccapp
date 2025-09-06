import React, { useState } from 'react';
import LandingCarousel from './components/LandingCarousel';
import EnterInformationForm from './components/EnterInformationForm';
import LoveReadingPage from './components/LoveReadingPage';
import "./styles.css";

export default function LoveCheatCodeApp() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'form', 'reading'
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [youData, setYouData] = useState(null);
  const [loveInterestData, setLoveInterestData] = useState(null);

  const handleStart = () => {
    setCurrentPage('form');
  };

  const handleSkip = () => {
    setCurrentPage('form');
  };

  const handleRevealMatch = (you, loveInterest) => {
    setYouData(you);
    setLoveInterestData(loveInterest);
    setCurrentPage('reading');
  };

  const handleBackToForm = () => {
    setCurrentPage('form');
  };

  const handleSaveProfile = (profile) => {
    const newProfile = {
      ...profile,
      id: Date.now().toString()
    };
    setSavedProfiles(prev => [...prev, newProfile]);
  };

  const handleDeleteProfile = (profileId) => {
    setSavedProfiles(prev => prev.filter(p => p.id !== profileId));
  };

  const handleLoadProfile = (profile) => {
    // This will be handled by the form component
    console.log('Loading profile:', profile);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingCarousel 
            onStart={handleStart} 
            onSkip={handleSkip} 
          />
        );
      case 'form':
        return (
          <EnterInformationForm
            onRevealMatch={handleRevealMatch}
            savedProfiles={savedProfiles}
            onSaveProfile={handleSaveProfile}
            onDeleteProfile={handleDeleteProfile}
            onLoadProfile={handleLoadProfile}
          />
        );
      case 'reading':
        return (
          <LoveReadingPage
            youData={youData}
            loveInterestData={loveInterestData}
            onBack={handleBackToForm}
            savedProfiles={savedProfiles}
            currentProfileName={currentProfileName}
          />
        );
      default:
        return (
          <LandingCarousel 
            onStart={handleStart} 
            onSkip={handleSkip} 
          />
        );
    }
  };

  return (
    <div className="app">
      {renderCurrentPage()}
    </div>
  );
}