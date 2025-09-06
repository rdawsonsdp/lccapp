import React from 'react';

export default function CardModal({ isOpen, onClose, card, type, personData }) {
  if (!isOpen) return null;

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
        content: card.activities || card.description || "No description available"
      };
    }
  };

  const description = getCardDescription();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{description.title}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <div className="modal-card-container">
            <div className="modal-card-front">
              <img 
                src={`/cards/${card.code.replace('♥', 'H').replace('♣', 'C').replace('♦', 'D').replace('♠', 'S')}.png`} 
                alt={card.name || card.planet}
                className="modal-card-image"
              />
              <div className="modal-card-label">{card.name || card.planet}</div>
            </div>
            
            <div className="modal-card-back">
              <div className="modal-description">
                {String(description.content || "No description available").split('\n').map((line, index) => (
                  <p key={index} className="modal-description-line">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
