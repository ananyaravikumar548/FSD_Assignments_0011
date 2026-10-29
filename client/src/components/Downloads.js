import React, { useState } from "react";
import { departmentData } from "../data/departmentData";

export default function Downloads() {
  const { downloads } = departmentData;
  const [downloadNotice, setDownloadNotice] = useState(null);

  const handleDownload = (doc) => {
    setDownloadNotice(`Starting download: ${doc.title} (${doc.size})`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 4500);
  };

  return (
    <section className="rv-section rv-downloads-section" id="downloads">
      <div className="rv-container">
        <div className="rv-section-header text-center">
          <span className="rv-section-eyebrow">RESOURCES & DOCUMENTS</span>
          <h2 className="rv-section-title">Downloads Center</h2>
          <p className="rv-section-lead">
            Access official syllabus handbooks, academic schemes under NEP 2020, and departmental brochures.
          </p>
        </div>

        {downloadNotice && (
          <div className="rv-alert-banner">
            <span>📥</span> {downloadNotice}
          </div>
        )}

        <div className="rv-downloads-grid">
          {downloads.map((doc) => (
            <div key={doc.id} className="rv-download-card">
              <div className="rv-dl-icon-pane">
                <span className="rv-dl-file-icon">📄</span>
                <span className="rv-dl-type">{doc.type}</span>
              </div>

              <div className="rv-dl-content">
                <div className="rv-dl-badge">{doc.category}</div>
                <h3 className="rv-dl-title">{doc.title}</h3>
                <p className="rv-dl-desc">{doc.description}</p>
                <div className="rv-dl-meta">
                  <span className="rv-dl-size">File Size: {doc.size}</span>
                  <span className="rv-dl-verified">✓ Official RVU Document</span>
                </div>
              </div>

              <div className="rv-dl-action">
                <button
                  type="button"
                  className="rv-btn-outline-gold"
                  onClick={() => handleDownload(doc)}
                >
                  Download {doc.type.split(" ")[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

