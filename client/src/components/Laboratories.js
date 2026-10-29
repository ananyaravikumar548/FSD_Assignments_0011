import React, { useState } from "react";
import { departmentData } from "../data/departmentData";

export default function Laboratories() {
  const { laboratories } = departmentData;
  const [activeLabId, setActiveLabId] = useState(laboratories[0].id);

  const selectedLab = laboratories.find((l) => l.id === activeLabId) || laboratories[0];

  return (
    <section className="rv-section rv-labs-section" id="laboratories">
      <div className="rv-container">
        <div className="rv-section-header text-center">
          <span className="rv-section-eyebrow">HIGH-TECH INFRASTRUCTURE</span>
          <h2 className="rv-section-title">Specialized Computing Laboratories</h2>
          <p className="rv-section-lead">
            Hands-on learning environments equipped with NVIDIA RTX GPUs, Apple Silicon, AWS Cloud sandboxes, and enterprise network racks.
          </p>
        </div>

        {/* Lab Switcher Tabs */}
        <div className="rv-lab-tabs">
          {laboratories.map((lab) => (
            <button
              key={lab.id}
              type="button"
              className={`rv-lab-tab-btn ${activeLabId === lab.id ? "active" : ""}`}
              onClick={() => setActiveLabId(lab.id)}
            >
              <span className="rv-lab-tab-icon">{lab.icon}</span>
              <span className="rv-lab-tab-name">{lab.name.split("&")[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Lab Feature Panel */}
        <div className="rv-lab-display-card">
          <div className="rv-lab-display-header">
            <div className="rv-lab-title-group">
              <span className="rv-lab-main-icon">{selectedLab.icon}</span>
              <div>
                <h3 className="rv-lab-headline">{selectedLab.name}</h3>
                <span className="rv-lab-capacity-tag">Capacity: {selectedLab.capacity}</span>
              </div>
            </div>
            <span className="rv-lab-status-badge">🟢 24/7 Academic Access</span>
          </div>

          <p className="rv-lab-desc">{selectedLab.description}</p>

          <div className="rv-lab-specs-grid">
            <div className="rv-spec-card">
              <div className="rv-spec-title">
                <span>🖥️</span> Hardware Specifications
              </div>
              <p className="rv-spec-content">{selectedLab.hardware}</p>
            </div>

            <div className="rv-spec-card">
              <div className="rv-spec-title">
                <span>⚙️</span> Software Stacks & Toolchains
              </div>
              <p className="rv-spec-content">{selectedLab.software}</p>
            </div>
          </div>

          <div className="rv-lab-perks-row">
            <div className="rv-perk-item">
              <span className="rv-perk-bullet">⚡</span>
              <span>10 Gbps High-Speed Fiber Backbone & Campus Wi-Fi 6</span>
            </div>
            <div className="rv-perk-item">
              <span className="rv-perk-bullet">🔒</span>
              <span>Isolated VLAN Sandbox for Cyber drills & Ethical Hacking</span>
            </div>
            <div className="rv-perk-item">
              <span className="rv-perk-bullet">☁️</span>
              <span>Free Cloud Credits: AWS Educate, Azure Dev Tools, GitHub Campus Pack</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

