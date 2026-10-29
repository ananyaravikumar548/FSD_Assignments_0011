import React, { useState } from "react";

export default function InquiryModal({ isOpen, onClose, defaultProgram }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: defaultProgram || "BCA (Honours) in Software Engineering & Full Stack Web Development",
    message: ""
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 500);
  };

  const handleReset = () => {
    setStatus("idle");
    onClose();
  };

  return (
    <div className="rv-modal-overlay" onClick={onClose}>
      <div
        className="rv-modal-card rv-quick-inquiry-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="rv-modal-header">
          <div>
            <span className="rv-badge-pill-gold">ADMISSIONS 2026</span>
            <h3 className="rv-modal-title mt-1">RV University BCA Admission Inquiry</h3>
          </div>
          <button
            type="button"
            className="rv-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="rv-modal-body">
          {status === "success" ? (
            <div className="rv-form-success-box text-center py-4">
              <div className="rv-success-icon">🎉</div>
              <h4>Thank you, {formData.name}!</h4>
              <p>
                Your inquiry for <strong>{formData.program}</strong> has been registered. An admissions mentor from RV University will reach out to <strong>{formData.phone}</strong> with the brochure and scholarship details.
              </p>
              <button
                type="button"
                className="rv-btn-gold mt-3"
                onClick={handleReset}
              >
                Close & Explore Campus
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rv-inquiry-form">
              <p className="text-muted small mb-3">
                Fill in your details below to receive the official syllabus, fee structure, and scholarship eligibility criteria.
              </p>

              <div className="rv-form-group mb-3">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="rv-form-row mb-3">
                <div className="rv-form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="rv-form-group">
                  <label>Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="rv-form-group mb-3">
                <label>Interested BCA Specialization</label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                >
                  <option value="BCA (Honours) in Software Engineering & Full Stack Web Development">
                    BCA (Honours) in Software Engineering & Full Stack
                  </option>
                  <option value="BCA in Artificial Intelligence & Data Science">
                    BCA in Artificial Intelligence & Data Science
                  </option>
                  <option value="BCA in Cloud Computing & Cybersecurity">
                    BCA in Cloud Computing & Cybersecurity
                  </option>
                  <option value="BCA in UI/UX Design & Human-Computer Interaction">
                    BCA in UI/UX Design & HCI
                  </option>
                </select>
              </div>

              <div className="rv-form-group mb-3">
                <label>Any specific questions? (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="Ask about merit scholarships, hostel facilities, or placement records..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="rv-btn-gold w-100"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
