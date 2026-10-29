import React from "react";
import { departmentData } from "../data/departmentData";

export default function HodDesk({ onOpenInquiry }) {
  const { hod } = departmentData;

  return (
    <section className="rv-section rv-hod-section" id="hod">
      <div className="rv-container">
        <div className="rv-section-header text-center">
          <span className="rv-section-eyebrow">LEADERSHIP & VISION</span>
          <h2 className="rv-section-title">HOD’s Desk</h2>
          <p className="rv-section-lead">A warm welcome from the Head of the Department of Computer Applications</p>
        </div>

        <div className="rv-hod-wrapper">
          {/* HOD Profile Card */}
          <div className="rv-hod-sidebar">
            <div className="rv-hod-avatar-frame">
              <div className="rv-hod-avatar-fallback">
                <span>{hod.initials || "MK"}</span>
              </div>
              <div className="rv-hod-status-tag">Active Leadership</div>
            </div>
            <h3 className="rv-hod-name">{hod.name}</h3>
            <p className="rv-hod-role">{hod.role}</p>
            <p className="rv-hod-degree">{hod.degrees}</p>
            <div className="rv-hod-exp-badge">{hod.experience}</div>

            <div className="rv-hod-contact-box">
              <div className="rv-contact-item">
                <span className="rv-ci-icon">✉️</span>
                <span>{hod.contact.email}</span>
              </div>
              <div className="rv-contact-item">
                <span className="rv-ci-icon">📍</span>
                <span>{hod.contact.office}</span>
              </div>
              <div className="rv-contact-item">
                <span className="rv-ci-icon">⏰</span>
                <span>{hod.contact.hours}</span>
              </div>
            </div>

            <button 
              type="button" 
              className="rv-btn-outline-gold w-100 mt-3"
              onClick={onOpenInquiry}
            >
              Request Academic Counseling
            </button>
          </div>

          {/* HOD Letter & Vision */}
          <div className="rv-hod-letter-pane">
            <div className="rv-hod-quote-highlight">
              <span className="rv-quote-symbol">“</span>
              <p className="rv-hod-quote-text">{hod.quote}</p>
            </div>

            <div className="rv-hod-paragraphs">
              {hod.message.map((para, i) => (
                <p key={i} className="rv-hod-p">{para}</p>
              ))}
            </div>

            <div className="rv-hod-signature-block">
              <div className="rv-hod-signature-text">
                <strong>{hod.name}</strong>
                <span>Head, Department of Computer Applications</span>
                <span>RV University, Bengaluru</span>
              </div>
              <div className="rv-signature-badge">
                <span className="rv-seal-icon">🏛️</span>
                <span>RSST Trust · Estd 2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

