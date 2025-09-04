
import React, { useState, useEffect } from "react";
import { Input } from "./components/ui/input";

import { 
  getPersonData, 
  getCompositeDescription, 
  getCardImagePath,
  getCardProfile 
} from "./utils/cardUtils";

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
    <div className="spread-container">
      <h2>{label}</h2>
      
      <div className="input-row">
        <div className="input-group">
          <label>Month</label>
          <Input 
            type="number" 
            min="1" 
            max="12" 
            value={month} 
            onChange={(e) => setMonth(e.target.value)} 
            placeholder="1-12"
          />
        </div>
        
        <div className="input-group">
          <label>Day</label>
          <Input 
            type="number" 
            min="1" 
            max="31" 
            value={day} 
            onChange={(e) => setDay(e.target.value)} 
            placeholder="1-31"
          />
        </div>
        
        <div className="input-group">
          <label>Year</label>
          <Input 
            type="number" 
            min="1900" 
            max="2100" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            placeholder="YYYY"
          />
        </div>
      </div>

      {personData && (
        <>
          <div className="person-info">
            <p><strong>Birthdate:</strong> {personData.birthdate}</p>
            <p><strong>Age:</strong> {personData.age}</p>
            <p><strong>Birth Card:</strong> {personData.birthCard}</p>
          </div>

          <h3>Yearly Energetic Outlook (6 Cards)</h3>
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

          <h3>Your 52-Day Energetic Cycles (7 Cards)</h3>
          <div className="planet-row">
            {personData.planetary_cycles.map((card, i) => (
              <div className="planet-card" key={i}>
                <div className="label">{card.planet}</div>
                <img 
                  src={getCardImagePath(card.code)} 
                  alt={card.planet} 
                  onClick={() => handleCardClick(card, "Planetary")} 
                />
              </div>
            ))}
          </div>
        </>
      )}

      {!personData && (
        <div className="placeholder-message">
          <p>Please enter month, day, and year to see your Love Cheat Code reading.</p>
        </div>
      )}
    </div>
  );
}

export default function DualSpreadUI() {
  const [personAData, setPersonAData] = useState(null);
  const [personBData, setPersonBData] = useState(null);

  const getComposite = () => {
    if (!personAData || !personBData) {
      return "Please enter both birth dates to see your composite reading.";
    }
    
    return getCompositeDescription(personAData.birthCard, personBData.birthCard);
  };

  return (
    <div className="dual-ui">
      <PersonSpread label="Person A" onPersonDataChange={setPersonAData} />
      <PersonSpread label="Person B" onPersonDataChange={setPersonBData} />
      
      <div className="composite-output">
        <h2>Your Vibe</h2>
        <p>{getComposite()}</p>
        <p>This composite reading shows how your energies combine and what this means for your relationship.</p>
      </div>
    </div>
  );
}
