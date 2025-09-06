import React, { useState, useEffect } from 'react';
import { getPersonData, getCompositeDescription, getCardImagePath } from '../utils/cardUtils';
import FlippableCard from './FlippableCard';
import ChatGPTBox from './ChatGPTBox';

export default function LoveReadingPage({ youData, loveInterestData, onBack, savedProfiles, currentProfileName }) {
  const [youPersonData, setYouPersonData] = useState(null);
  const [loveInterestPersonData, setLoveInterestPersonData] = useState(null);
  const [youAge, setYouAge] = useState(youData ? new Date().getFullYear() - youData.year : 0);
  const [loveInterestAge, setLoveInterestAge] = useState(loveInterestData ? new Date().getFullYear() - loveInterestData.year : 0);

  useEffect(() => {
    if (youData) {
      const data = getPersonData(youData.month, youData.day, youData.year);
      setYouPersonData(data);
    }
  }, [youData]);

  useEffect(() => {
    if (loveInterestData) {
      const data = getPersonData(loveInterestData.month, loveInterestData.day, loveInterestData.year);
      setLoveInterestPersonData(data);
    }
  }, [loveInterestData]);

  const updateYouAge = (newAge) => {
    setYouAge(newAge);
    if (youData) {
      const data = getPersonData(youData.month, youData.day, youData.year);
      setYouPersonData(data);
    }
  };

  const updateLoveInterestAge = (newAge) => {
    setLoveInterestAge(newAge);
    if (loveInterestData) {
      const data = getPersonData(loveInterestData.month, loveInterestData.day, loveInterestData.year);
      setLoveInterestPersonData(data);
    }
  };

  const getComposite = () => {
    if (!youPersonData || !loveInterestPersonData) {
      return "Please enter both birth dates to see your composite reading.";
    }
    return getCompositeDescription(youPersonData.birthCard, loveInterestPersonData.birthCard);
  };

  const getCurrentPlanetaryPeriod = (planetaryCycles) => {
    if (!planetaryCycles) return null;
    
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Find the current period based on today's date
    for (let i = 0; i < planetaryCycles.length; i++) {
      const periodDate = new Date(planetaryCycles[i].date);
      const nextPeriodDate = i < planetaryCycles.length - 1 
        ? new Date(planetaryCycles[i + 1].date)
        : new Date(currentYear + 1, 0, 1);
      
      if (now >= periodDate && now < nextPeriodDate) {
        return i;
      }
    }
    
    return 0; // Default to first period
  };

  return (
    <div className="love-reading-page">
      <div className="reading-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Form
        </button>
        <h1 className="reading-title">Your Love Reading</h1>
      </div>

      <div className="reading-panels">
        {/* Left Panel - You */}
        <div className="reading-panel left-panel">
          <div className="panel-header">
            <h2 className="panel-title">You</h2>
            <div className="person-info">
              <div className="info-item">
                <label>Name:</label>
                <input 
                  type="text" 
                  value={youData?.name || ''} 
                  className="editable-name"
                  readOnly
                />
              </div>
              <div className="info-item">
                <label>Date of Birth:</label>
                <span>{youData ? `${youData.month}/${youData.day}/${youData.year}` : ''}</span>
              </div>
              <div className="info-item">
                <label>Age:</label>
                <input 
                  type="number" 
                  value={youAge} 
                  onChange={(e) => updateYouAge(parseInt(e.target.value))}
                  className="age-input"
                  min="0"
                  max="120"
                />
              </div>
            </div>
          </div>

          {youPersonData && (
            <>
              <div className="card-section">
                <h3 className="section-title">Yearly Energetic Outlook</h3>
                <div className="card-grid">
                  {youPersonData.yearly_outlook.map((card, i) => (
                    <FlippableCard
                      key={i}
                      card={card}
                      type={card.name}
                      personData={youPersonData}
                    />
                  ))}
                </div>
              </div>

              <div className="card-section">
                <h3 className="section-title">Card Ruling Each 52-day Planetary Period</h3>
                <div className="card-grid">
                  {youPersonData.planetary_cycles.map((card, i) => {
                    const isCurrent = getCurrentPlanetaryPeriod(youPersonData.planetary_cycles) === i;
                    return (
                      <div key={i} className={`planet-card-container ${isCurrent ? 'current' : ''}`}>
                        <div className="planet-date">{card.date}</div>
                        <FlippableCard
                          card={card}
                          type="Planetary"
                          personData={youPersonData}
                        />
                        <div className="planet-label">{card.planet}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Panel - Your Love Interest */}
        <div className="reading-panel right-panel">
          <div className="panel-header">
            <h2 className="panel-title">Your Love Interest</h2>
            <div className="person-info">
              <div className="info-item">
                <label>Name:</label>
                <input 
                  type="text" 
                  value={loveInterestData?.name || ''} 
                  className="editable-name"
                  readOnly
                />
              </div>
              <div className="info-item">
                <label>Date of Birth:</label>
                <span>{loveInterestData ? `${loveInterestData.month}/${loveInterestData.day}/${loveInterestData.year}` : ''}</span>
              </div>
              <div className="info-item">
                <label>Age:</label>
                <input 
                  type="number" 
                  value={loveInterestAge} 
                  onChange={(e) => updateLoveInterestAge(parseInt(e.target.value))}
                  className="age-input"
                  min="0"
                  max="120"
                />
              </div>
            </div>
          </div>

          {loveInterestPersonData && (
            <>
              <div className="card-section">
                <h3 className="section-title">Yearly Energetic Outlook</h3>
                <div className="card-grid">
                  {loveInterestPersonData.yearly_outlook.map((card, i) => (
                    <FlippableCard
                      key={i}
                      card={card}
                      type={card.name}
                      personData={loveInterestPersonData}
                    />
                  ))}
                </div>
              </div>

              <div className="card-section">
                <h3 className="section-title">Cards of Your 52-Day Energetic Cycles</h3>
                <div className="card-grid">
                  {loveInterestPersonData.planetary_cycles.map((card, i) => {
                    const isCurrent = getCurrentPlanetaryPeriod(loveInterestPersonData.planetary_cycles) === i;
                    return (
                      <div key={i} className={`planet-card-container ${isCurrent ? 'current' : ''}`}>
                        <div className="planet-date">{card.date}</div>
                        <FlippableCard
                          card={card}
                          type="Planetary"
                          personData={loveInterestPersonData}
                        />
                        <div className="planet-label">{card.planet}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Center Panel - Composite */}
      <div className="composite-panel">
        <h2 className="composite-title">Your Relationship Vibe</h2>
        <div className="composite-content">
          <p>{getComposite()}</p>
        </div>
      </div>

      {/* ChatGPT Q&A Box */}
      <ChatGPTBox 
        personAData={youPersonData}
        personBData={loveInterestPersonData}
        compositeData={getComposite()}
        savedProfiles={savedProfiles}
        currentProfileName={currentProfileName}
      />
    </div>
  );
}
