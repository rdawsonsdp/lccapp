import React, { useState } from 'react';
import { getCardImagePath } from '../utils/cardUtils';
import CardModal from './CardModal';

export default function FlippableCard({ card, type, personData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    <>
      <div className="flippable-card-container">
        <div className="flippable-card" onClick={handleCardClick}>
          <div className="card-front">
            <img 
              src={getCardImagePath(card.code)} 
              alt={card.name || card.planet}
              className="card-image"
            />
            <div className="card-label">{card.name || card.planet}</div>
          </div>
        </div>
      </div>
      
      <CardModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        card={card}
        type={type}
        personData={personData}
      />
    </>
  );
}
