import React, { useState, useEffect } from 'react';

export default function EnterInformationForm({ onRevealMatch, savedProfiles, onSaveProfile, onDeleteProfile, onLoadProfile }) {
  const [youName, setYouName] = useState('');
  const [youMonth, setYouMonth] = useState('');
  const [youDay, setYouDay] = useState('');
  const [youYear, setYouYear] = useState('');
  
  const [loveInterestName, setLoveInterestName] = useState('');
  const [loveInterestMonth, setLoveInterestMonth] = useState('');
  const [loveInterestDay, setLoveInterestDay] = useState('');
  const [loveInterestYear, setLoveInterestYear] = useState('');

  const [selectedYouProfile, setSelectedYouProfile] = useState('');
  const [selectedLoveInterestProfile, setSelectedLoveInterestProfile] = useState('');

  // Generate month options
  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  // Generate day options (1-31)
  const days = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString()
  }));

  // Generate year options (1900-2024)
  const years = Array.from({ length: 125 }, (_, i) => {
    const year = 2024 - i;
    return { value: year.toString(), label: year.toString() };
  });

  const handleRevealMatch = () => {
    if (youName && youMonth && youDay && youYear && loveInterestName && loveInterestMonth && loveInterestDay && loveInterestYear) {
      const youData = {
        name: youName,
        month: parseInt(youMonth),
        day: parseInt(youDay),
        year: parseInt(youYear)
      };
      
      const loveInterestData = {
        name: loveInterestName,
        month: parseInt(loveInterestMonth),
        day: parseInt(loveInterestDay),
        year: parseInt(loveInterestYear)
      };

      // Create a profile name for this reading
      const profileName = `${youName} & ${loveInterestName}`;
      onRevealMatch(youData, loveInterestData, profileName);
    } else {
      alert('Please fill in all fields for both people.');
    }
  };

  const handleSaveYouProfile = () => {
    if (youName && youMonth && youDay && youYear) {
      const profile = {
        name: youName,
        month: youMonth,
        day: youDay,
        year: youYear,
        type: 'you'
      };
      onSaveProfile(profile);
    }
  };

  const handleSaveLoveInterestProfile = () => {
    if (loveInterestName && loveInterestMonth && loveInterestDay && loveInterestYear) {
      const profile = {
        name: loveInterestName,
        month: loveInterestMonth,
        day: loveInterestDay,
        year: loveInterestYear,
        type: 'loveInterest'
      };
      onSaveProfile(profile);
    }
  };

  const handleLoadYouProfile = (profileId) => {
    const profile = savedProfiles.find(p => p.id === profileId);
    if (profile) {
      setYouName(profile.name);
      setYouMonth(profile.month);
      setYouDay(profile.day);
      setYouYear(profile.year);
      onLoadProfile(profile);
    }
  };

  const handleLoadLoveInterestProfile = (profileId) => {
    const profile = savedProfiles.find(p => p.id === profileId);
    if (profile) {
      setLoveInterestName(profile.name);
      setLoveInterestMonth(profile.month);
      setLoveInterestDay(profile.day);
      setLoveInterestYear(profile.year);
      onLoadProfile(profile);
    }
  };

  return (
    <div className="enter-information-form">
      <div className="form-container">
        <h1 className="form-title">Enter Your Information</h1>
        
        <div className="form-sections">
          {/* You Section */}
          <div className="form-section">
            <h2 className="section-title">You</h2>
            
            <div className="saved-profiles">
              <label className="form-label">Saved Profiles</label>
              <select 
                className="form-select"
                value={selectedYouProfile}
                onChange={(e) => {
                  setSelectedYouProfile(e.target.value);
                  if (e.target.value) handleLoadYouProfile(e.target.value);
                }}
              >
                <option value="">Select a saved profile...</option>
                {savedProfiles.filter(p => p.type === 'you').map(profile => (
                  <option key={profile.id} value={profile.id}>
                    {profile.name} - {profile.month}/{profile.day}/{profile.year}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                value={youName}
                onChange={(e) => setYouName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="date-inputs">
              <div className="form-group">
                <label className="form-label">Month</label>
                <select 
                  className="form-select"
                  value={youMonth}
                  onChange={(e) => setYouMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Day</label>
                <select 
                  className="form-select"
                  value={youDay}
                  onChange={(e) => setYouDay(e.target.value)}
                >
                  <option value="">Select Day</option>
                  {days.map(day => (
                    <option key={day.value} value={day.value}>{day.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Year</label>
                <select 
                  className="form-select"
                  value={youYear}
                  onChange={(e) => setYouYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year.value} value={year.value}>{year.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn btn-primary" onClick={handleSaveYouProfile}>
                Save Profile
              </button>
            </div>
          </div>

          {/* Your Love Interest Section */}
          <div className="form-section">
            <h2 className="section-title">Your Love Interest</h2>
            
            <div className="saved-profiles">
              <label className="form-label">Saved Profiles</label>
              <select 
                className="form-select"
                value={selectedLoveInterestProfile}
                onChange={(e) => {
                  setSelectedLoveInterestProfile(e.target.value);
                  if (e.target.value) handleLoadLoveInterestProfile(e.target.value);
                }}
              >
                <option value="">Select a saved profile...</option>
                {savedProfiles.filter(p => p.type === 'loveInterest').map(profile => (
                  <option key={profile.id} value={profile.id}>
                    {profile.name} - {profile.month}/{profile.day}/{profile.year}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                value={loveInterestName}
                onChange={(e) => setLoveInterestName(e.target.value)}
                placeholder="Enter their name"
              />
            </div>

            <div className="date-inputs">
              <div className="form-group">
                <label className="form-label">Month</label>
                <select 
                  className="form-select"
                  value={loveInterestMonth}
                  onChange={(e) => setLoveInterestMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Day</label>
                <select 
                  className="form-select"
                  value={loveInterestDay}
                  onChange={(e) => setLoveInterestDay(e.target.value)}
                >
                  <option value="">Select Day</option>
                  {days.map(day => (
                    <option key={day.value} value={day.value}>{day.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Year</label>
                <select 
                  className="form-select"
                  value={loveInterestYear}
                  onChange={(e) => setLoveInterestYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year.value} value={year.value}>{year.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn btn-primary" onClick={handleSaveLoveInterestProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="cta-button reveal-button" onClick={handleRevealMatch}>
            Reveal My Match
          </button>
        </div>
      </div>
    </div>
  );
}
