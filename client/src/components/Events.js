import React, { useState } from "react";
import { departmentData } from "../data/departmentData";

export default function Events({ onRegisterEvent }) {
  const { events } = departmentData;
  const [activeTab, setActiveTab] = useState("all");

  const filteredEvents =
    activeTab === "all"
      ? events
      : events.filter((e) => e.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <section className="rv-section rv-events-section" id="events">
      <div className="rv-container">
        <div className="rv-section-header text-center">
          <span className="rv-section-eyebrow">CAMPUS BUZZ & CODING LEAGUES</span>
          <h2 className="rv-section-title">Department Events & Hackathons</h2>
          <p className="rv-section-lead">
            Experience 36-hour coding marathons, hands-on GenAI workshops, and national collegiate tech competitions.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="rv-filter-bar">
          <button
            type="button"
            className={`rv-filter-chip ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Events ({events.length})
          </button>
          <button
            type="button"
            className={`rv-filter-chip ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Events
          </button>
          <button
            type="button"
            className={`rv-filter-chip ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Past Highlights
          </button>
        </div>

        {/* Events Grid */}
        <div className="rv-events-grid">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="rv-event-card">
              <div className="rv-evt-header">
                <span className={`rv-evt-status ${evt.status === "Upcoming" ? "badge-upcoming" : "badge-past"}`}>
                  {evt.status}
                </span>
                <span className="rv-evt-category">{evt.category}</span>
              </div>

              <h3 className="rv-evt-title">{evt.title}</h3>
              <p className="rv-evt-desc">{evt.desc}</p>

              <div className="rv-evt-meta">
                <div className="rv-evt-meta-item">
                  <span className="rv-emi-icon">📅</span>
                  <span>{evt.date}</span>
                </div>
                <div className="rv-evt-meta-item">
                  <span className="rv-emi-icon">📍</span>
                  <span>{evt.venue}</span>
                </div>
                {evt.prize && (
                  <div className="rv-evt-meta-item">
                    <span className="rv-emi-icon">🏆</span>
                    <strong>{evt.prize}</strong>
                  </div>
                )}
                {evt.speaker && (
                  <div className="rv-evt-meta-item">
                    <span className="rv-emi-icon">🎙️</span>
                    <span>{evt.speaker}</span>
                  </div>
                )}
              </div>

              <div className="rv-evt-footer">
                {evt.status === "Upcoming" ? (
                  <button
                    type="button"
                    className="rv-btn-gold-sm w-100"
                    onClick={() => onRegisterEvent(evt.title)}
                  >
                    Register for Event
                  </button>
                ) : (
                  <span className="rv-evt-concluded-tag">Event Concluded · View Archive</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

