import React, { useState } from "react";
import { departmentData } from "../data/departmentData";

export default function Gallery() {
  const { gallery } = departmentData;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = ["all", "Labs", "Hackathons", "Projects", "Seminars", "Campus"];

  const filteredItems =
    selectedCategory === "all"
      ? gallery
      : gallery.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase());

  // Visual gradients / styling for gallery cards
  const gradientThemes = [
    "linear-gradient(135deg, #1f2d3d 0%, #0f172a 100%)",
    "linear-gradient(135deg, #7c1a3e 0%, #4a0d24 100%)",
    "linear-gradient(135deg, #0e3b43 0%, #041f24 100%)",
    "linear-gradient(135deg, #3d2b56 0%, #1f1430 100%)",
    "linear-gradient(135deg, #8a4a12 0%, #4a2405 100%)",
    "linear-gradient(135deg, #1b3a4b 0%, #001219 100%)"
  ];

  return (
    <section className="rv-section rv-gallery-section" id="gallery">
      <div className="rv-container">
        <div className="rv-section-header text-center">
          <span className="rv-section-eyebrow">LIFE @ RVU BCA</span>
          <h2 className="rv-section-title">Department Gallery</h2>
          <p className="rv-section-lead">
            Glimpses of modern coding studios, hackathons, cultural vibrancy, and campus collaborations.
          </p>
        </div>

        {/* Filters */}
        <div className="rv-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`rv-filter-chip ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "all" ? "All Highlights" : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="rv-gallery-grid">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="rv-gallery-card"
              style={{ background: gradientThemes[idx % gradientThemes.length] }}
              onClick={() => setLightboxImage(item)}
            >
              <div className="rv-gal-overlay">
                <span className="rv-gal-tag">{item.tag}</span>
                <h4 className="rv-gal-title">{item.title}</h4>
                <p className="rv-gal-caption">{item.caption}</p>
                <span className="rv-gal-zoom">🔍 Click to Inspect</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="rv-modal-overlay" onClick={() => setLightboxImage(null)}>
          <div
            className="rv-modal-card rv-gallery-lightbox"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="rv-modal-close"
              onClick={() => setLightboxImage(null)}
            >
              ✕
            </button>
            <div className="rv-lightbox-banner">
              <span className="rv-badge-pill-gold">{lightboxImage.tag}</span>
              <h3>{lightboxImage.title}</h3>
              <p>{lightboxImage.caption}</p>
            </div>
            <div className="rv-lightbox-footer">
              <span className="text-muted">Department of Computer Applications · RV University</span>
              <button
                type="button"
                className="rv-btn-secondary"
                onClick={() => setLightboxImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

