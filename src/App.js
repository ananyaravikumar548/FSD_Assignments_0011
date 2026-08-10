import './App.css';
import { useState } from 'react';

function App() {
  const initialCard = {
    cardholder: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  };

  const [formValues, setFormValues] = useState(initialCard);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => {
      if (name === 'cardNumber') {
        return {
          ...prev,
          cardNumber: formatCardNumber(value),
        };
      }

      if (
        name === 'expMonth' ||
        name === 'expYear' ||
        name === 'cvc'
      ) {
        const maxLength = name === 'cvc' ? 3 : 2;

        return {
          ...prev,
          [name]: value.replace(/\D/g, '').slice(0, maxLength),
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const digitsOnly = formValues.cardNumber.replace(/\s/g, '');

    if (!formValues.cardholder.trim()) {
      newErrors.cardholder = "Can't be blank";
    }

    if (!formValues.cardNumber.trim()) {
      newErrors.cardNumber = "Can't be blank";
    } else if (!/^\d{16}$/.test(digitsOnly)) {
      newErrors.cardNumber =
        'Enter a valid 16-digit card number';
    }

    if (!formValues.expMonth.trim()) {
      newErrors.expMonth = "Can't be blank";
    } else if (
      Number(formValues.expMonth) < 1 ||
      Number(formValues.expMonth) > 12
    ) {
      newErrors.expMonth = 'Invalid month';
    }

    if (!formValues.expYear.trim()) {
      newErrors.expYear = "Can't be blank";
    }

    if (!formValues.cvc.trim()) {
      newErrors.cvc = "Can't be blank";
    } else if (!/^\d{3}$/.test(formValues.cvc)) {
      newErrors.cvc = 'Invalid CVC';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setShowSuccess(true);
  };

  const handleContinue = () => {
    setShowSuccess(false);
    setFormValues(initialCard);
  };

  const displayCardNumber =
    formValues.cardNumber || '0000 0000 0000 0000';

  const displayCardholder =
    formValues.cardholder.toUpperCase() ||
    'JANE APPLESEED';

  const displayMonth =
    formValues.expMonth || '00';

  const displayYear =
    formValues.expYear || '00';

  const displayCvc =
    formValues.cvc || '000';

  return (
    <main className="app-shell">

      <section className="card-panel">
        <div className="panel-gradient"></div>

        <div className="cards-stack">

          <article className="credit-card credit-card-front">

            <div className="card-brand">
              <span className="brand-dot brand-dot-large"></span>
              <span className="brand-dot brand-dot-small"></span>
            </div>

            <p className="card-number-text">
              {displayCardNumber}
            </p>

            <div className="card-front-footer">
              <span>{displayCardholder}</span>

              <span>
                {displayMonth}/{displayYear}
              </span>
            </div>

          </article>

          <article className="credit-card credit-card-back">

            <div className="card-strip"></div>

            <div className="card-cvc-box">
              {displayCvc}
            </div>

            <div className="card-back-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>

          </article>

        </div>
      </section>

      <section className="content-panel">

        {!showSuccess ? (

          <form
            className="card-form"
            onSubmit={handleSubmit}
          >

            <div className="form-control">
              <label>Cardholder Name</label>

              <input
                type="text"
                name="cardholder"
                placeholder="e.g. Jane Appleseed"
                value={formValues.cardholder}
                onChange={handleChange}
                className={
                  errors.cardholder
                    ? 'input-error'
                    : ''
                }
              />

              {errors.cardholder && (
                <p className="error-text">
                  {errors.cardholder}
                </p>
              )}
            </div>

            <div className="form-control">
              <label>Card Number</label>

              <input
                type="text"
                name="cardNumber"
                placeholder="e.g. 1234 5678 9123 0000"
                value={formValues.cardNumber}
                onChange={handleChange}
                className={
                  errors.cardNumber
                    ? 'input-error'
                    : ''
                }
              />

              {errors.cardNumber && (
                <p className="error-text">
                  {errors.cardNumber}
                </p>
              )}
            </div>

            <div className="row-fields">

              <div className="form-control">

                <label>Exp. Date (MM/YY)</label>

                <div className="inline-fields">

                  <input
                    type="text"
                    name="expMonth"
                    placeholder="MM"
                    value={formValues.expMonth}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="expYear"
                    placeholder="YY"
                    value={formValues.expYear}
                    onChange={handleChange}
                  />

                </div>

                {(errors.expMonth ||
                  errors.expYear) && (
                  <p className="error-text">
                    {errors.expMonth ||
                      errors.expYear}
                  </p>
                )}

              </div>

              <div className="form-control">

                <label>CVC</label>

                <input
                  type="text"
                  name="cvc"
                  placeholder="e.g. 123"
                  value={formValues.cvc}
                  onChange={handleChange}
                  className={
                    errors.cvc
                      ? 'input-error'
                      : ''
                  }
                />

                {errors.cvc && (
                  <p className="error-text">
                    {errors.cvc}
                  </p>
                )}

              </div>

            </div>

            <button
              type="submit"
              className="confirm-button"
            >
              Confirm
            </button>

          </form>

        ) : (

          <div className="success-panel">

            <div className="success-icon">
              ✓
            </div>

            <h1>Thank You!</h1>

            <p>
              We've added your card details.
            </p>

            <button
              className="confirm-button"
              onClick={handleContinue}
            >
              Continue
            </button>

          </div>

        )}

      </section>

    </main>
  );
}

export default App;