import React, { useState } from 'react';
import { getCardImagePath } from '../utils/cardUtils';

export default function FlippableCard({ card, type, personData }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const getCardDescription = () => {
    if (type === "Birth Card") {
      const profile = personData.birthCardProfile;
      return {
        title: "Birth Card Profile",
        content: `Description: ${profile.description}\n\nHow They Love: ${profile.how_they_love}\n\nGreen Flags: ${profile.green_flags.join(', ')}\n\nRed Flags: ${profile.red_flags.join(', ')}`
      };
    } else {
      return {
        title: card.name || card.planet,
        content: String(card.activities || card.description || "No description available")
      };
    }
  };

  const description = getCardDescription();

  return (
    <div className="flippable-card-container">
      <div 
        className={`flippable-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleCardClick}
      >
        <div className="card-front">
          <img 
            src={getCardImagePath(card.code)} 
            alt={card.name || card.planet}
            className="card-image"
          />
          <div className="card-label">{card.name || card.planet}</div>
        </div>
        
        <div className="card-back">
          <div className="card-back-content">
            <h4 className="back-title">{description.title}</h4>
            <div className="back-description">
              {String(description.content || "No description available").split('\n').map((line, index) => (
                <p key={index} className="description-line">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
