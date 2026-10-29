import React from "react";
import { departmentData } from "../data/departmentData";

export default function Footer() {
  const { university } = departmentData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="rv-site-footer">
      <div className="rv-container">
        <div className="rv-footer-grid">
          {/* Brand Col */}
          <div className="rv-footer-brand-col">
            <div className="rv-brand-block mb-3">
              <div className="rv-logo-badge">
                <span className="rv-emblem-text">RV</span>
                <span className="rv-emblem-sub">UNIVERSITY</span>
              </div>
              <div className="rv-brand-text">
                <span className="rv-dept-prefix text-white-50">Department of</span>
                <span className="rv-dept-name text-white">Computer Applications</span>
              </div>
            </div>
            <p className="rv-footer-desc">
              Part of the esteemed Rashtreeya Sikshana Samithi Trust (RSST). RV University is a state private university recognized by UGC, empowering the next generation of computing professionals in Bengaluru.
            </p>
            <div className="rv-footer-trust-tag">
              🏛️ 80+ Years of Excellence in Education
            </div>
          </div>

          {/* Quick Links */}
          <div className="rv-footer-col">
            <h4 className="rv-footer-title">Quick Links</h4>
            <ul className="rv-footer-links">
              <li><a href="#about">About Department</a></li>
              <li><a href="#hod">HOD's Desk</a></li>
              <li><a href="#programs">BCA Specializations</a></li>
              <li><a href="#faculty">Faculty Directory</a></li>
              <li><a href="#laboratories">Computing Labs</a></li>
              <li><a href="#placements">Placements Hub</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="rv-footer-col">
            <h4 className="rv-footer-title">Resources</h4>
            <ul className="rv-footer-links">
              <li><a href="#downloads">Curriculum & Syllabus</a></li>
              <li><a href="#events">RV Hacks & Events</a></li>
              <li><a href="#research">Research & Incubation</a></li>
              <li><a href="#gallery">Life @ RVU Gallery</a></li>
              <li><a href="#contact">Admission FAQs</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="rv-footer-col">
            <h4 className="rv-footer-title">Campus Location</h4>
            <p className="rv-footer-addr">
              <strong>RV University Campus</strong><br />
              RV Vidyaniketan, 8th Mile,<br />
              Mysuru Road, Bengaluru - 560059,<br />
              Karnataka, India.
            </p>
            <p className="rv-footer-contact">
              <strong>Email:</strong> {university.email}<br />
              <strong>Phone:</strong> {university.phone}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="rv-footer-bottom">
          <div className="rv-fb-copy">
            © {new Date().getFullYear()} RV University · Department of Computer Applications. All Rights Reserved.
          </div>
          <button
            type="button"
            className="rv-back-to-top"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
