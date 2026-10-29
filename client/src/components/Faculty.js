import React, { useState } from "react";
import { departmentData } from "../data/departmentData";

export default function Faculty({ onOpenInquiry }) {
  const { faculty } = departmentData;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFacultyModal, setActiveFacultyModal] = useState(null);

  const filteredFaculty = faculty.filter((f) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      f.name.toLowerCase().includes(q) ||
      f.role.toLowerCase().includes(q) ||
      f.area.toLowerCase().includes(q) ||
      f.specialization.toLowerCase().includes(q)
    );
  });

  return (
    <section className="rv-section rv-faculty-section" id="faculty">
      <div className="rv-container">
        <div className="rv-section-header text-center">
          <span className="rv-section-eyebrow">DISTINGUISHED EDUCATORS</span>
          <h2 className="rv-section-title">Faculty Directory</h2>
          <p className="rv-section-lead">
            Learn directly from Ph.D. researchers, IEEE authors, and former industry software architects.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="rv-faculty-search-box">
          <div className="rv-search-input-wrapper">
            <span className="rv-search-icon">🔍</span>
            <input
              type="text"
              className="rv-search-input"
              placeholder="Search faculty by name, AI, Cloud, Full Stack, or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="rv-search-clear"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>
          <div className="rv-faculty-count">
            Showing {filteredFaculty.length} of {faculty.length} Mentors
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="rv-faculty-grid">
          {filteredFaculty.map((member) => (
            <div key={member.id} className="rv-faculty-card">
              <div className="rv-faculty-avatar-wrap">
                <div
                  className="rv-faculty-avatar"
                  style={{ backgroundColor: member.avatarBg }}
                >
                  {member.initials}
                </div>
                <div className="rv-faculty-exp">{member.experience}</div>
              </div>

              <div className="rv-faculty-info">
                <h3 className="rv-faculty-name">{member.name}</h3>
                <span className="rv-faculty-role">{member.role}</span>
                <span className="rv-faculty-degree">{member.degree}</span>

                <div className="rv-faculty-domain">
                  <strong>Domain:</strong> {member.area}
                </div>

                <div className="rv-faculty-pub-tag">
                  📑 {member.publications}
                </div>

                <div className="rv-faculty-footer">
                  <a
                    href={`mailto:${member.email}`}
                    className="rv-faculty-mail-btn"
                    title={`Email ${member.name}`}
                  >
                    ✉️ {member.email}
                  </a>
                  <button
                    type="button"
                    className="rv-btn-view-profile"
                    onClick={() => setActiveFacultyModal(member)}
                  >
                    View Bio
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFaculty.length === 0 && (
          <div className="rv-empty-state">
            <p>No faculty members match “{searchQuery}”.</p>
            <button
              type="button"
              className="rv-btn-secondary"
              onClick={() => setSearchQuery("")}
            >
              Reset Search
            </button>
          </div>
        )}
      </div>

      {/* Faculty Modal */}
      {activeFacultyModal && (
        <div className="rv-modal-overlay" onClick={() => setActiveFacultyModal(null)}>
          <div
            className="rv-modal-card rv-faculty-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="rv-modal-header">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rv-faculty-avatar-sm"
                  style={{ backgroundColor: activeFacultyModal.avatarBg }}
                >
                  {activeFacultyModal.initials}
                </div>
                <div>
                  <h3 className="rv-modal-title mb-0">{activeFacultyModal.name}</h3>
                  <span className="rv-modal-subtitle">{activeFacultyModal.role}</span>
                </div>
              </div>
              <button
                type="button"
                className="rv-modal-close"
                onClick={() => setActiveFacultyModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="rv-modal-body">
              <div className="rv-modal-bio-grid">
                <div>
                  <strong>Academic Credentials:</strong>
                  <p>{activeFacultyModal.degree}</p>
                </div>
                <div>
                  <strong>Experience:</strong>
                  <p>{activeFacultyModal.experience} in Academia & Industry</p>
                </div>
                <div>
                  <strong>Research & Publications:</strong>
                  <p>{activeFacultyModal.publications}</p>
                </div>
                <div>
                  <strong>Primary Focus Areas:</strong>
                  <p>{activeFacultyModal.specialization}</p>
                </div>
              </div>

              <div className="rv-modal-highlight-box mt-3">
                <strong>Student Mentorship & Guidance:</strong>
                <p className="mb-0 mt-1">
                  Faculty members at RV University maintain open office hours and actively supervise undergraduate capstone projects, research papers, and national hackathon teams.
                </p>
              </div>
            </div>

            <div className="rv-modal-footer">
              <a
                href={`mailto:${activeFacultyModal.email}`}
                className="rv-btn-secondary"
              >
                Send Email ({activeFacultyModal.email})
              </a>
              <button
                type="button"
                className="rv-btn-gold"
                onClick={() => {
                  setActiveFacultyModal(null);
                  onOpenInquiry();
                }}
              >
                Contact via Admissions
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

