import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base_url } from "./commonAPI's.json";

// --- Start: Inline SVG Icon Definitions ---

const ShieldCheck = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
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

const User = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// --- End: Inline SVG Icon Definitions ---

// Password Input Component
const PasswordInput = ({ label, name, value, onChange, error }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(prev => !prev);
  const primaryColor = '#DC143C'; // Crimson for admin

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
  const primaryColor = '#DC143C'; // Crimson for admin
  
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

// Main Admin Login Component
const AdminLogin = ({ onLoginSuccess }) => {
  const primaryColor = '#DC143C'; // Crimson
  const paleBackground = '#FFF5F5'; // Light crimson background

  const navigate = useNavigate(); 
  
  const ADMIN_LOGIN_API_URL = `${base_url}/api/admin/login/`;

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const validate = () => {
    let newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required.';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } 
    // else if (formData.password.length < 8) {
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
    setSubmissionMessage('Authenticating Admin...');

    const apiPayload = {
      username: formData.username,
      password: formData.password,
      // remember_me: formData.rememberMe,
    };

    try {
      const response = await fetch(ADMIN_LOGIN_API_URL, {
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
        setSubmissionMessage(`Admin authentication successful! Welcome.`);

        console.log("API Success:", result);

        // ✅ Save tokens properly
        if (result.access) {
          localStorage.setItem('accessToken', result.access);
        }
        if (result.refresh) {
          localStorage.setItem('refreshToken', result.refresh);
        }
        localStorage.setItem('profileType', 'Admin');

        // ✅ Redirect to admin dashboard
        navigate('/admin');

        // Optional success callback
        if (onLoginSuccess) {
          onLoginSuccess(result.access);
        }

      } else {
        const errorData = await response.json();
        setIsSubmitting(false);

        let errorMessage = errorData.detail || errorData.error || 'Invalid username or password.';
        setErrors({ general: errorMessage });
        setSubmissionMessage(errorMessage);
        console.error("API Error:", errorData);
      }

    } catch (error) {
      setIsSubmitting(false);
      setSubmissionMessage(`Network error. Could not connect to the backend at ${ADMIN_LOGIN_API_URL}.`);
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

/* Admin-specific gradient background */
.admin-gradient-bg {
  background: linear-gradient(135deg, #FFF5F5 0%, #FFE4E6 50%, #FECDD3 100%);
}

/* Admin card with subtle shadow */
.admin-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(220, 20, 60, 0.1);
}
`
        }
      </style>
      {/* Submission Message Area - Toast Style */}
      {submissionMessage && (
        <div
          className={`alert ${
            isSubmitting
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
      <div className="min-vh-100 d-flex align-items-center justify-content-center py-4 admin-gradient-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8 col-xl-6">
              <div className="card shadow-lg border-0 rounded-4 admin-card">
                <div className="card-body p-4 p-md-5">
                  
                  {/* Header */}
                  <div className="text-center mb-5">
                    <div className="d-flex justify-content-center mb-4">
                      <div className="p-3 rounded-circle" style={{ backgroundColor: primaryColor + '1A' }}>
                        <ShieldCheck className="h-8 w-8" style={{ color: primaryColor }} />
                      </div>
                    </div>
                    <h2 className="card-title fw-bold mb-3" style={{ color: primaryColor }}>
                      Admin Portal
                    </h2>
                    <p className="text-muted lead">
                      Secure access to administrative dashboard.
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

                    {/* Username Input */}
                    <TextInput
                      label="Admin Username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      error={errors.username}
                      icon={User}
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
                          onClick={() => console.log('Admin password reset functionality triggered.')}
                          className="btn btn-link text-decoration-none fw-semibold p-0"
                          style={{ color: primaryColor }}
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </div>

                    {/* Admin Sign In Button */}
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
                            <ShieldCheck className="w-5 h-5 me-2" />
                            Admin Sign In
                          </>
                        )}
                      </button>
                    </div>

                    {/* Back to Candidate Login */}
                    <div className="text-center pt-3 border-top">
                      <p className="text-muted mb-0">
                        Not an admin?{' '}
                        <button
                          type="button"
                          onClick={() => navigate('/login')}
                          className="btn btn-link fw-semibold text-decoration-none p-0 mt-0 mb-1"
                          style={{ color: primaryColor }}
                        >
                          Candidate Login
                        </button>
                      </p>
                    </div>

                    {/* Recruiter Login Link */}
                    <div className="text-center pt-3 border-top">
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

export default AdminLogin;
