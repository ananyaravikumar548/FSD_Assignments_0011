import React, { useState } from "react";
import { departmentData } from "../data/departmentData";

export default function Placements({ onOpenInquiry }) {
  const { placements } = departmentData;
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="rv-section rv-placements-section" id="placements">
      <div className="rv-container">
        <div className="rv-section-header text-center">
          <span className="rv-section-eyebrow">CAREER ACCELERATION</span>
          <h2 className="rv-section-title">Placements & Corporate Relations</h2>
          <p className="rv-section-lead">
            Empowering students to step directly into dream technology roles with leading multinational corporations and high-growth unicorns.
          </p>
        </div>

        {/* Big Numbers Banner */}
        <div className="rv-placement-banner">
          <div className="rv-pb-item">
            <span className="rv-pb-val">{placements.highestPackage}</span>
            <span className="rv-pb-lbl">Highest Package</span>
            <span className="rv-pb-sub">{placements.highestCompany}</span>
          </div>
          <div className="rv-pb-divider" />
          <div className="rv-pb-item">
            <span className="rv-pb-val">{placements.averagePackage}</span>
            <span className="rv-pb-lbl">Average Package</span>
            <span className="rv-pb-sub">Top 50% Median: {placements.medianPackage}</span>
          </div>
          <div className="rv-pb-divider" />
          <div className="rv-pb-item">
            <span className="rv-pb-val">{placements.placementRate}</span>
            <span className="rv-pb-lbl">Placement Success</span>
            <span className="rv-pb-sub">{placements.totalOffers}</span>
          </div>
        </div>

        {/* Top Recruiters Grid */}
        <div className="rv-recruiters-block mt-5">
          <h3 className="rv-sub-headline text-center mb-4">Marquee Hiring Partners</h3>
          <div className="rv-recruiters-grid">
            {placements.topRecruiters.map((rec, i) => (
              <div key={i} className="rv-recruiter-card">
                <span className="rv-rec-name">{rec.name}</span>
                <span className="rv-rec-role">{rec.role}</span>
                <span className="rv-rec-tag">{rec.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni Testimonials Carousel */}
        <div className="rv-testimonials-block mt-5">
          <h3 className="rv-sub-headline text-center mb-4">Student Success Stories</h3>
          <div className="rv-testimonial-card">
            <div className="rv-test-quote-icon">“</div>
            <p className="rv-test-quote">
              {placements.testimonials[activeTestimonial].quote}
            </p>
            <div className="rv-test-author-row">
              <div>
                <strong className="rv-test-author-name">
                  {placements.testimonials[activeTestimonial].name}
                </strong>
                <span className="rv-test-batch">
                  {placements.testimonials[activeTestimonial].batch}
                </span>
              </div>
              <div className="rv-test-placed-badge">
                🎉 Placed at {placements.testimonials[activeTestimonial].placedAt}
              </div>
            </div>

            <div className="rv-test-nav-dots">
              {placements.testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`rv-test-dot ${idx === activeTestimonial ? "active" : ""}`}
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`Testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="rv-placements-cta mt-5">
          <div className="rv-pcta-text">
            <h4>Ready to build your career with RV University BCA?</h4>
            <p className="mb-0">Admissions open for Academic Year 2026-2027 with merit scholarships.</p>
          </div>
          <button
            type="button"
            className="rv-btn-gold"
            onClick={onOpenInquiry}
          >
            Apply for Admission
          </button>
        </div>
      </div>
    </section>
  );
}

