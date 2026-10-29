import React, { useState } from "react";
import { departmentData } from "../data/departmentData";

export default function Programs({ onSelectProgramForInquiry }) {
  const { programs } = departmentData;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeCurriculumModal, setActiveCurriculumModal] = useState(null);

  const categories = [
    { key: "all", label: "All Specializations" },
    { key: "software", label: "Full Stack & Software" },
    { key: "ai", label: "AI & Data Science" },
    { key: "cloud", label: "Cloud & Cybersecurity" },
    { key: "design", label: "UI/UX & HCI" }
  ];

  const filteredPrograms =
    selectedCategory === "all"
      ? programs
      : programs.filter((p) => p.category === selectedCategory);

  return (
    <section className="rv-section rv-programs-section" id="programs">
      <div className="rv-container">
        <div className="rv-section-header text-center">
          <span className="rv-section-eyebrow">ACADEMIC EXCELLENCE (NEP 2020)</span>
          <h2 className="rv-section-title">BCA Programs & Specializations</h2>
          <p className="rv-section-lead">
            Flexible 3-Year BCA & 4-Year BCA (Honours with Research) curricula crafted alongside industry leaders.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="rv-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={`rv-filter-chip ${selectedCategory === cat.key ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="rv-programs-grid">
          {filteredPrograms.map((prog) => (
            <div key={prog.id} className="rv-program-card">
              <div className="rv-prog-header">
                <span className="rv-prog-badge">{prog.badge}</span>
                <span className="rv-prog-duration">{prog.duration}</span>
              </div>

              <h3 className="rv-prog-title">{prog.title}</h3>
              <p className="rv-prog-short">{prog.shortDesc}</p>

              <div className="rv-prog-meta-box">
                <div className="rv-meta-row">
                  <strong>Eligibility:</strong>
                  <span>{prog.eligibility}</span>
                </div>
              </div>

              {/* Key Skills */}
              <div className="rv-skills-block">
                <span className="rv-skills-label">Core Technologies Taught:</span>
                <div className="rv-skills-tags">
                  {prog.keySkills.map((skill, sIdx) => (
                    <span key={sIdx} className="rv-skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Career Roles */}
              <div className="rv-career-block">
                <span className="rv-career-label">Career Prospects:</span>
                <p className="rv-career-list">{prog.careers.join(" · ")}</p>
              </div>

              {/* Action Buttons */}
              <div className="rv-prog-actions">
                <button
                  type="button"
                  className="rv-btn-outline-dark"
                  onClick={() => setActiveCurriculumModal(prog)}
                >
                  View Curriculum (Sem 1-8)
                </button>
                <button
                  type="button"
                  className="rv-btn-gold-sm"
                  onClick={() => onSelectProgramForInquiry(prog.title)}
                >
                  Apply for this Track
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum Modal */}
      {activeCurriculumModal && (
        <div className="rv-modal-overlay" onClick={() => setActiveCurriculumModal(null)}>
          <div
            className="rv-modal-card rv-curriculum-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="rv-modal-header">
              <div>
                <span className="rv-modal-subtitle">{activeCurriculumModal.duration}</span>
                <h3 className="rv-modal-title">{activeCurriculumModal.title}</h3>
              </div>
              <button
                type="button"
                className="rv-modal-close"
                onClick={() => setActiveCurriculumModal(null)}
                aria-label="Close Modal"
              >
                ✕
              </button>
            </div>

            <div className="rv-modal-body">
              <p className="rv-curriculum-intro">
                Detailed semester scheme designed under the National Education Policy (NEP 2020) with multiple exit certificates (Diploma after Yr 1, Advanced Diploma after Yr 2, BCA after Yr 3, BCA Honours after Yr 4).
              </p>

              <div className="rv-semester-timeline">
                {activeCurriculumModal.curriculum.map((semItem, idx) => (
                  <div key={idx} className="rv-sem-block">
                    <div className="rv-sem-badge">{semItem.sem}</div>
                    <ul className="rv-sem-subjects">
                      {semItem.subjects.map((sub, subIdx) => (
                        <li key={subIdx}>
                          <span className="rv-check-icon">✓</span> {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rv-modal-footer">
              <a
                href="#downloads"
                className="rv-btn-secondary"
                onClick={() => setActiveCurriculumModal(null)}
              >
                Download Detailed Syllabus PDF
              </a>
              <button
                type="button"
                className="rv-btn-gold"
                onClick={() => {
                  const title = activeCurriculumModal.title;
                  setActiveCurriculumModal(null);
                  onSelectProgramForInquiry(title);
                }}
              >
                Inquire About Admission
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

