import React from "react";
import { departmentData } from "../data/departmentData";

export default function Research() {
  const { research } = departmentData;

  return (
    <section className="rv-section rv-research-section" id="research">
      <div className="rv-container">
        <div className="rv-section-header text-center">
          <span className="rv-section-eyebrow">INNOVATION & DISCOVERY</span>
          <h2 className="rv-section-title">Research & Student Innovation</h2>
          <p className="rv-section-lead">
            Fostering an entrepreneurial ecosystem where undergraduate BCA students author patents, publish Scopus papers, and launch technology startups.
          </p>
        </div>

        {/* Research Metrics */}
        <div className="rv-research-stats-grid">
          {research.stats.map((stat, idx) => (
            <div key={idx} className="rv-rstat-card">
              <span className="rv-rstat-number">{stat.value}</span>
              <span className="rv-rstat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Focus Domains */}
        <div className="rv-domains-section mt-5">
          <h3 className="rv-sub-headline text-center mb-4">Core Research Thrust Areas</h3>
          <div className="rv-domains-grid">
            {research.domains.map((dom, i) => (
              <div key={i} className="rv-domain-card">
                <div className="rv-domain-number">0{i + 1}</div>
                <h4 className="rv-domain-title">{dom.title}</h4>
                <p className="rv-domain-desc">{dom.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Student Projects */}
        <div className="rv-projects-section mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <h3 className="rv-sub-headline mb-1">Featured Student Capstone Projects</h3>
              <p className="text-muted mb-0">Built, deployed, and tested by BCA undergraduate innovators.</p>
            </div>
            <span className="rv-badge-pill-gold">Incubated @ RVU AIC</span>
          </div>

          <div className="rv-projects-grid">
            {research.featuredProjects.map((proj, idx) => (
              <div key={idx} className="rv-project-card">
                <div className="rv-proj-team-tag">{proj.team}</div>
                <h4 className="rv-proj-title">{proj.title}</h4>
                <p className="rv-proj-desc">{proj.desc}</p>
                <div className="rv-proj-tech-pill">
                  <span>🛠️</span> {proj.tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

