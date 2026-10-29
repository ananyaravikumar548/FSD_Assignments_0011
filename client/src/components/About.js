import React from "react";
import { departmentData } from "../data/departmentData";

export default function About() {
  const { about, heroStats, university } = departmentData;

  return (
    <section className="rv-section rv-about-section" id="about">
      <div className="rv-container">
        <div className="rv-section-header text-center">
          <span className="rv-section-eyebrow">ABOUT THE DEPARTMENT</span>
          <h2 className="rv-section-title">{about.heading}</h2>
          <p className="rv-section-lead">{about.lead}</p>
        </div>

        {/* Stats Strip */}
        <div className="rv-stats-bar">
          {heroStats.map((stat, i) => (
            <div key={i} className="rv-stat-box">
              <span className="rv-stat-value">{stat.value}</span>
              <span className="rv-stat-label">{stat.label}</span>
              <span className="rv-stat-sub">{stat.subtitle}</span>
            </div>
          ))}
        </div>

        {/* About Main Content */}
        <div className="rv-about-grid">
          <div className="rv-about-text-pane">
            <div className="rv-badge-pill-outline">{university.trust}</div>
            <h3 className="rv-about-subhead">Empowering Future Technologists in Bengaluru</h3>
            {about.paragraphs.map((p, index) => (
              <p key={index} className="rv-about-p">{p}</p>
            ))}

            <div className="rv-quote-callout">
              <span className="rv-quote-mark">“</span>
              <p>
                Our goal is not just teaching code syntax, but mentoring students to build scalable distributed architectures, explore intelligent AI workflows, and shape the future of computing.
              </p>
              <cite>— Department Academic Council, RV University</cite>
            </div>
          </div>

          <div className="rv-pillars-pane">
            <h3 className="rv-pillars-title">The Four Core Pillars of RVU BCA</h3>
            <div className="rv-pillars-list">
              {about.pillars.map((pillar, idx) => (
                <div key={idx} className="rv-pillar-card">
                  <div className="rv-pillar-icon">{pillar.icon}</div>
                  <div className="rv-pillar-info">
                    <h4>{pillar.title}</h4>
                    <p>{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

