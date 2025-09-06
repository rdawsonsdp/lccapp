import React, { useState, useEffect } from "react";

import { 
  getPersonData, 
  getCompositeDescription, 
  getCardImagePath,
  getCardProfile 
} from "./utils/cardUtils";

function PersonProfile({ personData, onPersonDataChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");

  useEffect(() => {
    if (personData) {
      setEditName("Skye"); // Default name, could be made dynamic
      setEditAge(personData.age.toString());
    }
  }, [personData]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you could save the edited data
  };

  const handleDelete = () => {
    onPersonDataChange(null);
  };

  if (!personData) return null;

  return (
    <div className="profile-section">
      <div className="profile-item">
        <div>
          <div className="profile-label">Child's Name</div>
          {isEditing ? (
            <input 
              type="text" 
              value={editName} 
              onChange={(e) => setEditName(e.target.value)}
              className="profile-input"
            />
          ) : (
            <p className="profile-value">{editName}</p>
          )}
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => setIsEditing(!isEditing)}
        >
          Edit
        </button>
      </div>

      <div className="profile-item">
        <div>
          <div className="profile-label">Date of Birth</div>
          <p className="profile-value">{personData.birthdate}</p>
        </div>
        <button className="btn btn-primary">Edit</button>
      </div>

      <div className="profile-item">
        <div>
          <div className="profile-label">Age</div>
          {isEditing ? (
            <input 
              type="number" 
              value={editAge} 
              onChange={(e) => setEditAge(e.target.value)}
              className="profile-input"
            />
          ) : (
            <p className="profile-value">{personData.age}</p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-success" onClick={handleSave}>Save</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function PersonSpread({ label, onPersonDataChange }) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [personData, setPersonData] = useState(null);

  useEffect(() => {
    if (month && day && year) {
      const data = getPersonData(parseInt(month), parseInt(day), parseInt(year));
      setPersonData(data);
      onPersonDataChange(data);
    }
  }, [month, day, year, onPersonDataChange]);

  const handleCardClick = (card, type) => {
    let description = "";
    
    if (type === "Birth Card") {
      const profile = personData.birthCardProfile;
      description = `Description: ${profile.description}\n\nHow They Love: ${profile.how_they_love}\n\nGreen Flags: ${profile.green_flags.join(', ')}\n\nRed Flags: ${profile.red_flags.join(', ')}`;
    } else {
      description = card.activities || card.description || "No description available";
    }
    
    alert(description);
  };

  return (
    <>
      <PersonProfile personData={personData} onPersonDataChange={onPersonDataChange} />
      
      {personData && (
        <>
          <div className="spread-container">
            <h2>Yearly Energetic Outlook</h2>
            <h3>Skye's energetic outlook for age {personData.age}</h3>
            <div className="card-row">
              {personData.yearly_outlook.map((card, i) => (
                <div className="card-box" key={i}>
                  <div className="label">{card.name}</div>
                  <img 
                    src={getCardImagePath(card.code)} 
                    alt={card.name} 
                    onClick={() => handleCardClick(card, card.name)} 
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="spread-container">
            <h2>Card Ruling Each 52-day Planetary Period</h2>
            <h3>Current planetary influences throughout the year</h3>
            <div className="planet-row">
              {personData.planetary_cycles.map((card, i) => (
                <div className="planet-card" key={i}>
                  <div className="planet-date">{card.date}</div>
                  <div className="label">{card.planet}</div>
                  <img 
                    src={getCardImagePath(card.code)} 
                    alt={card.planet} 
                    onClick={() => handleCardClick(card, "Planetary")} 
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!personData && (
        <div className="spread-container">
          <h2>{label}</h2>
          <div className="input-row">
            <div className="input-group">
              <label>Month</label>
              <input 
                type="number" 
                min="1" 
                max="12" 
                value={month} 
                onChange={(e) => setMonth(e.target.value)} 
                placeholder="1-12"
                className="input-field"
              />
            </div>
            
            <div className="input-group">
              <label>Day</label>
              <input 
                type="number" 
                min="1" 
                max="31" 
                value={day} 
                onChange={(e) => setDay(e.target.value)} 
                placeholder="1-31"
                className="input-field"
              />
            </div>
            
            <div className="input-group">
              <label>Year</label>
              <input 
                type="number" 
                min="1900" 
                max="2100" 
                value={year} 
                onChange={(e) => setYear(e.target.value)} 
                placeholder="YYYY"
                className="input-field"
              />
            </div>
          </div>
          <div className="placeholder-message">
            <p>Please enter month, day, and year to see your Love Cheat Code reading.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default function DualSpreadUI() {
  const [personData, setPersonData] = useState(null);

  return (
    <div className="dual-ui">
      <PersonSpread label="Enter Birth Information" onPersonDataChange={setPersonData} />
    </div>
  );
}