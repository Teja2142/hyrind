import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
const TextInput = ({ label, name, type = 'text', value, onChange, error, icon: Icon, required = false }) => (
  <div className="mb-4">
    <label className="form-label fw-semibold text-dark" htmlFor={name}>
      {label}
      {required && <span className="text-danger ms-1">*</span>}
    </label>
    <div className="input-group">
      {Icon && (
        <span className="input-group-text">
          <Icon className="h-5 w-5 text-secondary" />
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
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  </div>
);

// Main Login Component
const Login = ({ onNavigate, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear validation error on change
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call for login
    console.log("--- LOGIN SUBMITTED ---");
    console.log({
      email: formData.email,
      passwordLength: formData.password.length,
      rememberMe: formData.rememberMe,
    });
    console.log("-----------------------");

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock Authentication Logic
    if (formData.email === 'test@example.com' && formData.password === 'password123') {
      setIsSubmitting(false);
      if (onLoginSuccess) {
        onLoginSuccess(); // Call success callback if provided
      }
    } else {
      // Simulate incorrect credentials
      setIsSubmitting(false);
      setErrors({ general: 'Invalid email or password. Please try again.' });
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-6">
            <div className="card shadow-lg border-0 rounded-3">
              <div className="card-body p-4 p-md-5">
                
                {/* Header */}
                <div className="text-center mb-5">
                  <div className="d-flex justify-content-center mb-4">
                    <div className="p-3 bg-primary bg-opacity-10 rounded-3">
                      <LogIn className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h2 className="card-title fw-bold text-primary mb-3">
                    Candidate Sign In
                  </h2>
                  <p className="text-muted">
                    Access your profile and track your application status.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* General Error Alert */}
                  {errors.general && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                      <div className="flex-shrink-0 me-2">
                        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                          <use xlinkHref="#exclamation-triangle-fill"/>
                        </svg>
                      </div>
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
                      />
                      <label htmlFor="rememberMe" className="form-check-label text-dark">
                        Remember Me
                      </label>
                    </div>

                    <div>
                      <a href="#" className="text-primary text-decoration-none fw-semibold">
                        Forgot Password?
                      </a>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid mb-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-lg py-3 fw-bold"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Logging In...
                        </>
                      ) : (
                        <>
                          <LogIn className="w-5 h-5 me-2" />
                          Sign In
                        </>
                      )}
                    </button>
                  </div>

                  {/* Registration Link */}
                  <div className="text-center pt-3 border-top">
                    <p className="text-muted mb-0">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate && onNavigate('/register')}
                        className="btn btn-link text-primary fw-semibold text-decoration-none p-0"
                      >
                        Register Here
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
  );
};

export default Login;