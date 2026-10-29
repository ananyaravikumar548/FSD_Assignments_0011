import React, { useState, useEffect } from "react";
import { departmentData } from "../data/departmentData";

export default function Hero({ onOpenInquiry }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = departmentData.heroSlides;
  const cards = departmentData.heroCards;

  // Auto slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[currentSlide];

  return (
    <section className="rv-hero-section" id="home">
      {/* Background Graphic & Student Photo Layer */}
      <div className="rv-hero-bg-layer">
        <div className="rv-hero-gradient-overlay" />
        <div className="rv-hero-student-wrapper">
          <img
            src="/images/hero-student-crop.jpg"
            alt="RV University BCA Student"
            className="rv-hero-student-img"
            loading="eager"
            onError={(e) => {
              // Fallback to full banner or placeholder if crop is missing
              e.currentTarget.src = "/images/hero-banner.jpg";
            }}
          />
        </div>
      </div>

      {/* Hero Carousel Navigation Controls (Matching Screenshot Chevrons) */}
      <button
        type="button"
        className="rv-hero-arrow rv-hero-arrow-left"
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        &#8249;
      </button>

      <button
        type="button"
        className="rv-hero-arrow rv-hero-arrow-right"
        onClick={handleNext}
        aria-label="Next Slide"
      >
        &#8250;
      </button>

      {/* Hero Main Content */}
      <div className="rv-container rv-hero-content-box">
        <div className="rv-hero-text-col">
          {/* Badge: RV UNIVERSITY */}
          <div className="rv-hero-badge-pill">
            {activeSlide.badge}
          </div>

          {/* Heading */}
          <h1 className="rv-hero-headline">
            <span className="rv-hero-head-lead">{activeSlide.titleLead}</span>
            <span className="rv-hero-head-accent">{activeSlide.titleAccent}</span>
          </h1>

          {/* Subtitle */}
          <p className="rv-hero-subtitle">
            {activeSlide.subtext}
          </p>

          {/* Action Buttons */}
          <div className="rv-hero-btn-group">
            <a href={activeSlide.primaryLink} className="rv-btn-gold">
              {activeSlide.primaryBtn}
            </a>
            <a href={activeSlide.secondaryLink} className="rv-btn-glass">
              {activeSlide.secondaryBtn}
            </a>
            <button
              type="button"
              className="rv-btn-inquiry"
              onClick={onOpenInquiry}
            >
              Admission Inquiry 2026
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="rv-hero-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`rv-hero-dot ${idx === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Floating Cards (Matching bottom cards preview in screenshot) */}
      <div className="rv-hero-bottom-deck">
        <div className="rv-container">
          <div className="rv-hero-cards-grid">
            {cards.map((card) => (
              <a
                key={card.id}
                href={`#${card.targetId}`}
                className="rv-hero-card-item"
              >
                <div className="rv-card-icon">{card.icon}</div>
                <div className="rv-card-body">
                  <h3 className="rv-card-title">{card.title}</h3>
                  <p className="rv-card-desc">{card.desc}</p>
                  <span className="rv-card-link">
                    {card.linkText} <span className="rv-arrow-right">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

