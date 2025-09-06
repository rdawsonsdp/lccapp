import React, { useState } from 'react';

const slides = [
  {
    id: 1,
    emoji: '💘',
    title: 'Decode Your Love Blueprint',
    description: 'Your Birth Card reveals how you love, who you attract, and why.\nReal insights, no fluff.'
  },
  {
    id: 2,
    emoji: '🔑',
    title: 'Compatibility, Unlocked',
    description: 'Green flags, red flags, and the chemistry in between.\nSee how your energies align.'
  },
  {
    id: 3,
    emoji: '💌',
    title: 'Share the Cheat Code',
    description: 'Compare with partners, friends, or your next crush.\nBecause love is better when you actually get each other.'
  }
];

export default function LandingCarousel({ onStart, onSkip }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="landing-carousel">
      <div className="carousel-container">
        <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide) => (
            <div key={slide.id} className="carousel-slide">
              <div className="slide-content">
                <div className="slide-emoji">{slide.emoji}</div>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-description">
                  {slide.description.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < slide.description.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-navigation">
          <button className="nav-arrow nav-arrow-left" onClick={prevSlide}>
            ‹
          </button>
          <button className="nav-arrow nav-arrow-right" onClick={nextSlide}>
            ›
          </button>
        </div>

        <div className="carousel-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <div className="carousel-actions">
          <button className="cta-button" onClick={onStart}>
            Get Started
          </button>
          <button className="skip-button" onClick={onSkip}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
