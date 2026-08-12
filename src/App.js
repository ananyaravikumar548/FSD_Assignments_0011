import { useState } from 'react';
import './App.css';

const LOCATION_DATA = {
  Karnataka: ['Bengaluru', 'Mysuru', 'Hubballi'],
  Delhi: ['New Delhi', 'North Delhi'],
  Maharashtra: ['Mumbai', 'Pune'],
};

const PROGRAMME_COURSES = {
  Undergraduate: ['B.Tech.', 'BBA', 'B.Des.', 'B.A. LL.B.'],
  Postgraduate: ['M.Tech.', 'MBA', 'M.Des.', 'LL.M.'],
  Doctoral: ['Ph.D.'],
};

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  phone: '',
  otp: '',
  state: '',
  city: '',
  campus: '',
  programme: '',
  course: '',
  captcha: '',
  consent: false,
};

const Field = ({ id, label, children, required = false, error = '' }) => (
  <div className="field-group">
    <label htmlFor={id} className="field-label">
      {label} {required && <span aria-hidden="true" className="required-asterisk">*</span>}
    </label>
    {children}
    {error && <span className="field-error-msg" id={`${id}-error`}>{error}</span>}
  </div>
);

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(INITIAL_FORM_STATE);

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = 'Full name is required';
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Valid email address is required';
    if (!data.phone.trim() || !/^\d{10}$/.test(data.phone)) newErrors.phone = '10-digit mobile number is required';
    if (!data.consent) newErrors.consent = 'You must agree to continue';
    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === 'checkbox' ? checked : value;

    setForm((prev) => {
      const nextForm = { ...prev, [name]: val };
      if (name === 'state') nextForm.city = '';
      if (name === 'programme') nextForm.course = '';
      return nextForm;
    });

    if (attempted) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAttempted(true);
    
    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM_STATE);
    setErrors({});
    setAttempted(false);
    setSubmitted(false);
  };

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand-mark">
          <img src="/image.png" alt="RV University Logo" />
          <div>
            <strong>RV<br /><em>UNIVERSITY</em></strong>
            <small>Go, change the world</small>
          </div>
        </div>
        <p>An initiative of RV EDUCATIONAL INSTITUTIONS</p>
      </header>

      <div className="sky-band" aria-hidden="true" />

      {/* Centered Single Form Container */}
      <main className="form-wrapper">
        <div className="admission-card">
          {submitted ? (
            <div className="success" role="alert">
              <span className="success-icon" aria-hidden="true">✓</span>
              <h2>Thank you!</h2>
              <p>We have received your interest. Our admissions team will be in touch soon.</p>
              <button type="button" onClick={handleReset}>
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-heading">
                <p>UNDERGRADUATE · POSTGRADUATE · DOCTORAL</p>
                <h1>Start your journey <span>with RV University</span></h1>
                <small>Admissions for the 2026 academic year are now open.</small>
              </div>

              {/* Section 1: Personal Details */}
              <fieldset className="form-section">
                <legend><h3>Your details</h3></legend>
                
                <Field id="name" label="Applicant name" required error={errors.name}>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                  />
                </Field>

                <Field id="email" label="Email address" required error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                  />
                </Field>

                <div className="phone-row">
                  <Field id="countryCode" label="Code">
                    <select id="countryCode" name="countryCode" aria-label="Country Code">
                      <option value="+91">+91 (IN)</option>
                    </select>
                  </Field>

                  <Field id="phone" label="Mobile number" required error={errors.phone}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter 10 digit number"
                      inputMode="numeric"
                      maxLength={10}
                      value={form.phone}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                    />
                  </Field>
                </div>

                <Field id="otp" label="One-time password">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="Enter OTP (if received)"
                    value={form.otp}
                    onChange={handleChange}
                  />
                </Field>
              </fieldset>

              {/* Section 2: Course Preferences */}
              <fieldset className="form-section course-section">
                <legend><h3>Your preference</h3></legend>
                <div className="select-grid">
                  <Field id="state" label="State">
                    <select id="state" name="state" value={form.state} onChange={handleChange}>
                      <option value="">Select state</option>
                      {Object.keys(LOCATION_DATA).map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </Field>

                  <Field id="city" label="City">
                    <select
                      id="city"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      disabled={!form.state}
                    >
                      <option value="">Select city</option>
                      {form.state && LOCATION_DATA[form.state]?.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </Field>

                  <Field id="campus" label="Campus">
                    <select id="campus" name="campus" value={form.campus} onChange={handleChange}>
                      <option value="">Choose campus</option>
                      <option value="JP Nagar">JP Nagar</option>
                      <option value="Jayanagar">Jayanagar</option>
                    </select>
                  </Field>

                  <Field id="programme" label="Programme">
                    <select id="programme" name="programme" value={form.programme} onChange={handleChange}>
                      <option value="">Choose programme</option>
                      {Object.keys(PROGRAMME_COURSES).map((prog) => (
                        <option key={prog} value={prog}>{prog}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field id="course" label="Course">
                  <select
                    id="course"
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    disabled={!form.programme}
                  >
                    <option value="">Select a course you are interested in</option>
                    {form.programme && PROGRAMME_COURSES[form.programme]?.map((course) => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </Field>
              </fieldset>

              {/* Section 3: Captcha */}
              <div className="captcha">
                <span className="captcha-code" aria-label="Captcha visual code">dfo55f</span>
                <button type="button" aria-label="Refresh captcha code">↻</button>
                <Field id="captcha" label="Verification code">
                  <input
                    id="captcha"
                    name="captcha"
                    type="text"
                    placeholder="Enter the code"
                    value={form.captcha}
                    onChange={handleChange}
                  />
                </Field>
              </div>

              {/* Consent & Submit */}
              <div className="consent-wrapper">
                <label htmlFor="consent" className="consent">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={handleChange}
                    aria-required="true"
                  />
                  <span>
                    I agree to receive information regarding my submitted application by signing up on RV University *
                  </span>
                </label>
                {errors.consent && <p className="field-error-msg">{errors.consent}</p>}
              </div>

              {attempted && Object.keys(errors).length > 0 && (
                <p className="form-error" role="alert">
                  Please correct the errors highlighted above before registering.
                </p>
              )}

              <button className="register" type="submit">
                Register
              </button>

              <div className="login-link">
                Already have an Account? <button type="button" className="link-btn">Login</button>
                <br />
                <button type="button" className="link-btn">Resend Verification Email</button>
              </div>
            </form>
          )}
        </div>
      </main>
      <footer />
    </div>
  );
}

export default App;