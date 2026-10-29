import React, { useState } from "react";
import { departmentData } from "../data/departmentData";

export default function Contact({ prefilledProgram, onResetPrefill }) {
  const { university, faqs } = departmentData;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: prefilledProgram || "BCA (Honours) in Software Engineering & Full Stack Web Development",
    year: "2026",
    message: ""
  });

  const [activeFaq, setActiveFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg("Please fill in your name, email, and phone number.");
      return;
    }

    setLoading(true);

    // Fast simulated submit (or POST to backend if available)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onResetPrefill) onResetPrefill();
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      program: "BCA (Honours) in Software Engineering & Full Stack Web Development",
      year: "2026",
      message: ""
    });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section className="rv-section rv-contact-section" id="contact">
      <div className="rv-container">
        <div className="rv-section-header text-center">
          <span className="rv-section-eyebrow">GET IN TOUCH</span>
          <h2 className="rv-section-title">Admission Inquiry & Contact</h2>
          <p className="rv-section-lead">
            Have questions about BCA admissions, scholarships, or the curriculum? Connect directly with our departmental academic counselors.
          </p>
        </div>

        <div className="rv-contact-grid">
          {/* Contact Details Card */}
          <div className="rv-contact-info-pane">
            <h3 className="rv-sub-headline">Department Office</h3>
            <p className="text-muted">
              Located on the lush green RV Vidyaniketan campus in Bengaluru, easily accessible via Mysore Road Metro.
            </p>

            <div className="rv-contact-details-list">
              <div className="rv-cd-item">
                <span className="rv-cd-icon">📍</span>
                <div>
                  <strong>Campus Address:</strong>
                  <p>{university.address}</p>
                </div>
              </div>

              <div className="rv-cd-item">
                <span className="rv-cd-icon">📞</span>
                <div>
                  <strong>Admissions Helpline:</strong>
                  <p>{university.phone}</p>
                </div>
              </div>

              <div className="rv-cd-item">
                <span className="rv-cd-icon">✉️</span>
                <div>
                  <strong>Direct Email:</strong>
                  <p>{university.email} · {university.hodEmail}</p>
                </div>
              </div>

              <div className="rv-cd-item">
                <span className="rv-cd-icon">🏛️</span>
                <div>
                  <strong>Affiliation & Trust:</strong>
                  <p>{university.trust} (State Private University established by Karnataka Act No. 34 of 2019)</p>
                </div>
              </div>
            </div>

            <div className="rv-metro-hint">
              <span>🚇</span>
              <span>Nearest Metro Station: <strong>Kengeri Bus Terminal / RV College Metro</strong> (Purple Line)</span>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="rv-contact-form-pane">
            <h3 className="rv-sub-headline mb-3">Instant BCA Admission Inquiry</h3>

            {submitted ? (
              <div className="rv-form-success-box">
                <div className="rv-success-icon">🎉</div>
                <h4>Inquiry Received Successfully!</h4>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Our BCA academic counseling team will reach out to you at <strong>{formData.email}</strong> / <strong>{formData.phone}</strong> with the detailed brochure and fee structure within 24 hours.
                </p>
                <div className="rv-success-actions">
                  <button
                    type="button"
                    className="rv-btn-outline-gold"
                    onClick={handleReset}
                  >
                    Submit Another Inquiry
                  </button>
                  <a href="#downloads" className="rv-btn-secondary">
                    Browse Syllabus Downloads
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rv-inquiry-form">
                {errorMsg && <div className="rv-form-error">{errorMsg}</div>}

                <div className="rv-form-row">
                  <div className="rv-form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="rv-form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="rv-form-row">
                  <div className="rv-form-group">
                    <label htmlFor="phone">Mobile Number *</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="rv-form-group">
                    <label htmlFor="year">Admission Year</label>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                    >
                      <option value="2026">2026 - 2027 (Upcoming)</option>
                      <option value="2027">2027 - 2028 (Lateral / Advance)</option>
                    </select>
                  </div>
                </div>

                <div className="rv-form-group">
                  <label htmlFor="program">Specialization Track Preference</label>
                  <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
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

                <div className="rv-form-group">
                  <label htmlFor="message">Questions or Specific Interests (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    placeholder="Tell us about your background, career goals, or scholarship questions..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="rv-btn-gold w-100"
                  disabled={loading}
                >
                  {loading ? "Submitting Inquiry..." : "Submit Admission Inquiry"}
                </button>
                <small className="rv-form-disclaimer">
                  🔒 Your contact information is safe. We respect your privacy and will only communicate regarding RV University admissions.
                </small>
              </form>
            )}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="rv-faqs-block mt-5">
          <div className="rv-section-header text-center mb-4">
            <span className="rv-section-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
            <h3 className="rv-sub-headline">Everything You Need to Know</h3>
          </div>

          <div className="rv-faq-accordion">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`rv-faq-item ${activeFaq === idx ? "open" : ""}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="rv-faq-question">
                  <span>{faq.q}</span>
                  <span className="rv-faq-toggle-icon">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </div>
                {activeFaq === idx && (
                  <div className="rv-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

