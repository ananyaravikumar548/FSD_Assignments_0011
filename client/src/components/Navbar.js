import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "HOD's Desk", href: "#hod", id: "hod" },
  { label: "Programs", href: "#programs", id: "programs" },
  { label: "Faculty", href: "#faculty", id: "faculty" },
  { label: "Laboratories", href: "#laboratories", id: "laboratories" },
  { label: "Research", href: "#research", id: "research" },
  { label: "Placements", href: "#placements", id: "placements" },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "Events", href: "#events", id: "events" },
  { label: "Downloads", href: "#downloads", id: "downloads" },
  { label: "Contact", href: "#contact", id: "contact" }
];

export default function Navbar({ onOpenInquiry }) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check current visible section for active spy
      const sections = navLinks.map(link => document.getElementById(link.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollPosition) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`rv-header-sticky ${scrolled ? "rv-header-scrolled" : ""}`}>
      <div className="rv-nav-container">
        {/* Brand Area */}
        <a href="#home" className="rv-brand-block" onClick={() => handleLinkClick("home")}>
          <div className="rv-logo-badge">
            <span className="rv-emblem-text">RV</span>
            <span className="rv-emblem-sub">UNIVERSITY</span>
          </div>
          <div className="rv-brand-text">
            <span className="rv-dept-prefix">Department of</span>
            <span className="rv-dept-name">Computer Applications</span>
            <div className="rv-brand-underline"></div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="rv-nav-desktop" aria-label="Main Navigation">
          <ul className="rv-nav-list">
            {navLinks.map((item) => (
              <li key={item.id} className="rv-nav-item">
                <a
                  href={item.href}
                  className={`rv-nav-link ${activeSection === item.id ? "active" : ""}`}
                  onClick={() => handleLinkClick(item.id)}
                >
                  {item.label}
                  {activeSection === item.id && <span className="rv-link-dot" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="rv-nav-actions">
          <button 
            type="button" 
            className="rv-apply-btn"
            onClick={onOpenInquiry}
          >
            Apply Now
          </button>

          <button
            type="button"
            className="rv-mobile-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="rv-mobile-drawer">
          <ul className="rv-mobile-list">
            {navLinks.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`rv-mobile-link ${activeSection === item.id ? "active" : ""}`}
                  onClick={() => handleLinkClick(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="rv-mobile-action-item">
              <button
                type="button"
                className="rv-mobile-apply-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
              >
                Apply for BCA Admission 2026
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
