import React, { useState, useEffect } from 'react';
// Import the useNavigate hook
import { Link, useNavigate } from 'react-router-dom';
import { base_url } from "./commonAPI's.json";

// --- Start: Inline SVG Icon Definitions ---

const LogIn = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

const Eye = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.06 13.06 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.37-1.42" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const Mail = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// --- End: Inline SVG Icon Definitions ---

// Password Input Component
const PasswordInput = ({ label, name, value, onChange, error }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(prev => !prev);
  const primaryColor = '#4682B4';

  return (
    <div className="mb-4">
      <label className="form-label fw-semibold text-dark" htmlFor={name}>
        {label}
      </label>
      <div className="input-group">
        <input
          type={isVisible ? 'text' : 'password'}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
          required
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="btn btn-outline-secondary"
          style={{ borderColor: primaryColor, color: primaryColor }}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
          {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </div>
    </div>
  );
};

// Text Input Component
const TextInput = ({ label, name, type = 'text', value, onChange, error, icon: Icon, required = false }) => {
  const primaryColor = '#4682B4';

  return (
    <div className="mb-4">
      <label className="form-label fw-semibold text-dark" htmlFor={name}>
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      <div className="input-group">
        {Icon && (
          <span className="input-group-text border-end-0 bg-white" style={{ borderColor: primaryColor }}>
            <Icon className="h-5 w-5" style={{ color: primaryColor }} />
          </span>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
          required={required}
          style={{ borderColor: error ? '' : primaryColor }}
        />
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </div>
    </div>
  );
};

// Main Login Component
const Login = ({ onLoginSuccess }) => {
  const primaryColor = '#4682B4'; // Steel Blue
  const paleBackground = '#F0F8FF'; // Alice Blue

  const navigate = useNavigate();

  const LOGIN_API_URL = `${base_url}/api/users/login/`;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format (e.g., user@domain.com).';
    }

    // if (!formData.password) {
    //   newErrors.password = 'Password is required.';
    // } else if (formData.password.length < 8) {
    //   newErrors.password = 'Password must be at least 8 characters.';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setSubmissionMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setSubmissionMessage('Please correct the highlighted errors before signing in.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage('Logging In...');

    const apiPayload = {
      email: formData.email,
      password: formData.password,
      remember_me: formData.rememberMe,
    };

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      if (response.ok) {
        const result = await response.json();
        setIsSubmitting(false);
        setSubmissionMessage(`Sign in successful! Welcome.`);

        console.log("API Success:", result);

        // ✅ Save tokens properly
        if (result.access) {
          localStorage.setItem('accessToken', result.access);
        }
        if (result.refresh) {
          localStorage.setItem('refreshToken', result.refresh);
        }
        localStorage.setItem('profileType', 'Candidate');

        // ✅ Redirect to profile
        navigate('/profile');

        // Optional success callback
        if (onLoginSuccess) {
          onLoginSuccess(result.access);
        }

      } else {
        const errorData = await response.json();
        setIsSubmitting(false);

        let errorMessage = errorData.detail || errorData.error || 'Invalid email or password.';
        setErrors({ general: errorMessage });
        setSubmissionMessage(errorMessage);
        console.error("API Error:", errorData);
      }

    } catch (error) {
      setIsSubmitting(false);
      setSubmissionMessage(`Network error. Could not connect to the backend at ${LOGIN_API_URL}.`);
      setErrors({ general: `Network error. Please check your connection or contact support.` });
      console.error("Network Fetch Error:", error);
    }
  };

  // Auto-dismiss toast message
  useEffect(() => {
    if (submissionMessage) {
      const timer = setTimeout(() => {
        setSubmissionMessage('');
      }, 3000); // Disappear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [submissionMessage]);


  return (
    <>
      <style>
        {
          `
        /* Base toast style */
.toast-alert {
  top: 70px;                 /* below navbar */
  right: 20px;               /* right side on larger screens */
  z-index: 2000;
  min-width: 280px;
  max-width: 460px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  animation: fadeSlideIn 0.35s ease-out forwards;
  text-align: center;
}

/* Small screens: prevent overflow & improve readability */
@media (max-width: 576px) {
  .toast-alert {
    top: calc(60px + env(safe-area-inset-top, 0)); /* safer for notches */
    right: 10px;
    left: 10px;                 /* stretch between left & right */
    min-width: auto;
    max-width: 100%;
    font-size: 0.9rem;          /* slightly smaller text */
  }
}

/* Animation for toast */
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
`
        }
      </style>
      {/* Submission Message Area - Toast Style */}
      {submissionMessage && (
        <div
          className={`alert ${isSubmitting
              ? "alert-info"
              : errors && Object.keys(errors).length > 0
                ? "alert-danger"
                : "alert-success"
            } toast-alert shadow-sm position-fixed`}
          role="alert"
        >
          {submissionMessage}
        </div>
      )}
      <div className="min-vh-100 d-flex align-items-center justify-content-center py-4" style={{ backgroundColor: paleBackground }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8 col-xl-6">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4 p-md-5">

                  {/* Header */}
                  <div className="text-center mb-5">
                    <div className="d-flex justify-content-center mb-4">
                      <div className="p-3 rounded-circle" style={{ backgroundColor: primaryColor + '1A' }}>
                        <LogIn className="h-8 w-8" style={{ color: primaryColor }} />
                      </div>
                    </div>
                    <h2 className="card-title fw-bold mb-3" style={{ color: primaryColor }}>
                      Candidate Sign In
                    </h2>
                    <p className="text-muted lead">
                      Access your profile and track your application status.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* General Error Alert */}
                    {errors.general && (
                      <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <span className="me-2 fw-bold fs-5">!</span>
                        <div>
                          {errors.general}
                        </div>
                      </div>
                    )}



                    {/* Email Input */}
                    <TextInput
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      icon={Mail}
                      required
                    />

                    {/* Password Input */}
                    <PasswordInput
                      label="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      error={errors.password}
                    />

                    {/* Remember Me & Forgot Password */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input
                          id="rememberMe"
                          name="rememberMe"
                          type="checkbox"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          className="form-check-input"
                          style={{ borderColor: primaryColor, color: primaryColor, backgroundColor: formData.rememberMe ? primaryColor : 'white' }}
                        />
                        <label htmlFor="rememberMe" className="form-check-label text-dark">
                          Remember Me
                        </label>
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={() => console.log('Forgot Password functionality triggered.')}
                          className="btn btn-link text-decoration-none fw-semibold p-0"
                          style={{ color: primaryColor }}
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </div>

                    {/* Candidate Sign In Button */}
                    <div className="d-grid mb-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-lg py-3 fw-bold rounded-pill"
                        style={{ backgroundColor: primaryColor, borderColor: primaryColor, color: 'white' }}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            {submissionMessage}
                          </>
                        ) : (
                          <>
                            <LogIn className="w-5 h-5 me-2" />
                            Sign In
                          </>
                        )}
                      </button>
                    </div>

                    {/* Admin Login Link (replaces recruiter button) 
                  <div className="text-center mb-4">
                    <button
                      type="button"
                      onClick={() => navigate('/admin')}  // adjust route if needed
                      className="btn btn-link fw-semibold text-decoration-none p-0"
                      style={{ color: primaryColor }}
                    >
                      Admin
                    </button>
                  </div>
                  */}

                    {/* Registration Link */}
                    <div className="text-center pt-3 border-top">
                      <p className="text-muted mb-0">
                        Don't have an account?{' '}
                        <button
                          type="button"
                          onClick={() => navigate('/register')}
                          className="btn btn-link fw-semibold text-decoration-none p-0 mt-0 mb-1"
                          style={{ color: primaryColor }}
                        >
                          Register Here
                        </button>
                      </p>
                    </div>
                    {/* Login as Recruiter and Admin  */}
                    <div className="text-center pt-3 border-top d-flex justify-content-around  align-items-center">
                      <p className="text-muted mb-0">
                        Are you a recruiter?{' '}
                        <button
                          type="button"
                          onClick={() => navigate('/recruiter-login')}
                          className="btn btn-link fw-semibold text-decoration-none p-0 mt-0 mb-1"
                          style={{ color: primaryColor }}
                        >
                          Login Here
                        </button>
                      </p>
                      <p className="text-muted mb-0">
                        Are you a Admin?{' '}
                        <button
                          type="button"
                          onClick={() => navigate('/admin-login')}
                          className="btn btn-link fw-semibold text-decoration-none p-0 mt-0 mb-1"
                          style={{ color: primaryColor }}
                        >
                          Login Here
                        </button>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Login;
