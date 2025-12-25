import React, { useState, useEffect } from 'react';
// Import Link and useNavigate
import { Link, useNavigate } from 'react-router-dom'; 
import { base_url } from "./commonAPI's.json";

// --- Start: Inline SVG Icon Definitions (Lucide Icons used for aesthetics) ---

const User = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Mail = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Lock = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);


const Phone = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const GraduationCap = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M12 15V7M2 10l10-5 10 5" />
    <path d="M6 12v6M18 12v6M2 10l10 5 10-5M12 15l10-5M2 10l10-5 10 5" />
  </svg>
);

const Calendar = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const Upload = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const LinkIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const GitBranch = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
);

const ScrollText = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 2v7h-6v7h-2V7H8V2h12zm-2 2H8v5h4v5h6V9h-4V4z" />
    <path d="M16 20h2v2h-2v-2z" />
    <path d="M8 20h2v2H8v-2z" />
  </svg>
);

const Users = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LogIn = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

// --- End: Inline SVG Icon Definitions ---


// Enhanced Generic Input Component
const TextInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  placeholder,
  maxLength,
  isTextArea = false,
  countryCode,
}) => {
  const isDate = type === 'date';

  // Simplified country codes for visual/select purposes
  const countryCodes = [
    { name: "USA", code: "+1", iso: "us" },
    { name: "India", code: "+91", iso: "in" },
    { name: "Canada", code: "+1", iso: "ca" },
    { name: "UK", code: "+44", iso: "gb" },
    { name: "Mexico", code: "+52", iso: "mx" },
  ];
  
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold text-dark" htmlFor={name}>
        {label}
        {required && <span className="text-danger ms-1">*</span>}
        {maxLength && isTextArea && (
          <span className="text-muted ms-2 text-sm">
            ({maxLength - (value?.length || 0)} chars left)
          </span>
        )}
      </label>

      <div className={`input-group ${name ==='phone'?'flex-nowrap':''}`}>
        {Icon && (
          <span className="input-group-text bg-white border-end-0">
            <Icon className="h-5 w-5 text-primary opacity-75" />
          </span>
        )}

        {isTextArea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            rows="3"
            className={`form-control ${error ? 'is-invalid border-danger' : 'border-start-0'}`}
            required={required}
            placeholder={placeholder}
          />
        ) : name === 'phone' ? (
          <>
          <div className="row w-100">
            {/* Country code select - Not used in curl, but good practice */}
            <div className="col-4">
              <select
              className="form-select form-select-lg border-start-0 border-end-0 w-100"
              aria-label="Country Code"
              name='countryCode'
              value={countryCode} // Controlled by parent state
              onChange={onChange}
              required
            >
              {countryCodes.map((country) => (
                // Only showing the code for brevity in the select
                <option key={`${country.iso}-${country.code}`} value={country.code}>
                   {country.code}
                </option>
              ))}
            </select>
            </div>

            {/* Phone number input (10 digits expected by curl) */}
         <div className="col-8">
             <input
              type='tel'
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              maxLength={maxLength}
              placeholder={placeholder}
              className={`form-control form-control-lg col-9 ${
                error ? 'is-invalid border-danger' : 'border-start-0'
              }`}
              required={required}
              inputMode="numeric"
            />
         </div>
            </div>
          </>
        ) : (
          <input
            // Date input type is handled here using type='month' to get YYYY-MM
            type={isDate ? 'month' : type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`form-control form-control-lg ${
              error ? 'is-invalid border-danger' : 'border-start-0'
            }`}
            required={required}
            // For password fields, 'password' type keeps the input secure
            inputMode={type === 'password' ? 'text' : 'text'} 
            min={isDate ? '1950-01' : undefined}
            max={isDate ? '2050-12' : undefined}
          />
        )}
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};


// Utility function to convert YYYY-MM format from type='month' input to MM/YYYY format
const formatDateToMMYYYY = (dateString) => {
    if (!dateString || dateString.length !== 7 || dateString.indexOf('-') !== 4) return dateString;
    const [year, month] = dateString.split('-');
    return `${month}/${year}`;
};


// Main Register Component
const Register = () => {
  const navigate = useNavigate(); 
  // CORRECTED API endpoint to match user's curl request
  const REGISTER_API_URL = `https://api.hyrind.com/api/users/register/`; 
  
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '', // NEW: Added password field
    confirmPassword: '', // NEW: Added confirm_password field (camelCase in state)
    phone: '',
    university: '',
    degree: '',
    major: '',
    visaStatus: 'Citizen',
    graduationDate: '', // YYYY-MM from input, converted to MM/YYYY for API
    optEndDate: '', // YYYY-MM from input, converted to MM/YYYY for API - Conditional
    resumeFile: null,
    referralSource: 'Google',
    consentToTerms: false,
    linkedinUrl: '',
    githubUrl: '',
    additionalNotes: '',
    countryCode: '+1', // Default country code (for select)
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const degreeOptions = ['Bachelor\'s', 'Master\'s', 'PhD'];
  const visaOptions = ['F1-OPT', 'F1-CPT', 'H1B', 'Green Card', 'Citizen', 'Other'];
  const referralOptions = ['Google', 'LinkedIn', 'Friend', 'University', 'Other'];
  
  // Custom pale blue/white theme colors
  const primaryColor = '#4682B4'; // Steel Blue
  const paleBackground = '#F0F8FF'; // Alice Blue

  // Utility function for validation
  const validate = () => {
    let newErrors = {};
    
    // Regex Definitions
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const nameRegex = /^[a-zA-Z\s'-]+$/; 
    const dateRegex = /^\d{4}-\d{2}$/; // YYYY-MM format from input type="month"
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    // --- A. Required Fields Check ---
    const requiredFields = [
        'firstName', 'lastName', 'email', 'phone', 'university', 'degree', 
        'major', 'visaStatus', 'graduationDate', 'consentToTerms', 
        'password', 'confirmPassword' // NEW: Added password fields
    ];
    
    if (formData.visaStatus === 'F1-OPT') {
      requiredFields.push('optEndDate');
    }

    requiredFields.forEach(field => {
      if (field === 'consentToTerms') {
        if (!formData[field]) newErrors[field] = 'You must agree to the terms.';
      } else if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
        newErrors[field] = 'This field is required.';
      }
    });

    if (!formData.resumeFile) {
        newErrors.resumeFile = 'Resume file upload is required.';
    }

    // --- B. Specific Format/Length Validations ---

    // Name Validation
    if (formData.firstName && (!nameRegex.test(formData.firstName.trim()) || formData.firstName.length > 50)) {
        newErrors.firstName = 'Invalid name or max 50 characters.';
    }
    if (formData.lastName && (!nameRegex.test(formData.lastName.trim()) || formData.lastName.length > 50)) {
        newErrors.lastName = 'Invalid name or max 50 characters.';
    }

    // Email Validation
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format (e.g., user@domain.com).';
    }

    // Password Validation (must match curl requirements: Naveen@2142 suggests special chars and complexity)
    if (formData.password) {
        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters.';
        }
        // Check for complexity (optional but good practice, the curl password implies it)
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
            newErrors.password = 'Must contain upper, lower, number, and special character.';
        }
    }
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
    }


    // Phone Validation (Expect 10 digits as per curl)
    if (formData.phone) {
        const digitsOnly = formData.phone.replace(/[^\d]/g, '');
        if (digitsOnly.length !== 10) { 
            newErrors.phone = 'Phone number must be exactly 10 digits.';
        }
    }

    // University/Major length
    if (formData.university.length > 100) newErrors.university = 'Max 100 characters.';
    if (formData.major.length > 100) newErrors.major = 'Max 100 characters.';

    // Date (Checks if the required YYYY-MM format is present after month input)
    if (formData.graduationDate && !dateRegex.test(formData.graduationDate)) {
      newErrors.graduationDate = 'Date must be in MM/YYYY format.';
    }
    if (formData.visaStatus === 'F1-OPT' && formData.optEndDate && !dateRegex.test(formData.optEndDate)) {
      newErrors.optEndDate = 'Date must be in MM/YYYY format.';
    }

    // File size and type
    if (formData.resumeFile) {
      if (formData.resumeFile.size > 5 * 1024 * 1024) { // 5MB limit
        newErrors.resumeFile = 'File size must be max 5MB.';
      }
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
      if (!allowedTypes.includes(formData.resumeFile.type)) {
        newErrors.resumeFile = 'File must be PDF or DOCX/DOC.';
      }
    }

    // URL validation
    if (formData.linkedinUrl && !urlRegex.test(formData.linkedinUrl)) {
      newErrors.linkedinUrl = 'Invalid URL format (must start with http:// or https://).';
    }
    if (formData.githubUrl && !urlRegex.test(formData.githubUrl)) {
      newErrors.githubUrl = 'Invalid URL format (must start with http:// or https://).';
    }
    
    // Notes length
    if (formData.additionalNotes.length > 500) {
      newErrors.additionalNotes = 'Max 500 characters.';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let newValue = value;

    if (type === 'file') {
        newValue = files[0];
    } else if (type === 'checkbox') {
        newValue = checked;
    } else if (name === 'phone') {
        // Only allow digits for phone input
        const digitsOnly = value.replace(/[^\d]/g, '');
        newValue = digitsOnly.substring(0, 10); // Limit to 10 digits
    } else if (name === 'firstName' || name === 'lastName') {
        // Name validation during input
        const cleanValue = value.replace(/[^a-zA-Z\s'-]/g, '');
        newValue = cleanValue;
    }


    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));
    
    // Clear validation error on change
    setErrors(prev => ({ ...prev, [name]: '' }));
    setSubmissionMessage(''); // Clear previous message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
        setSubmissionMessage('Please correct the highlighted errors before submitting.');
        return;
    }

    setIsSubmitting(true);
    setSubmissionMessage('Submitting registration...');

    // --- PREPARE FOR MULTIPART/FORM-DATA SUBMISSION ---
    // This matches the structure and file upload of your curl command.
    const data = new FormData();

    // Mapping object for camelCase (React state) to snake_case (API/curl)
    const fieldMap = {
        firstName: 'first_name',
        lastName: 'last_name',
        email: 'email',
        password: 'password', // Matching curl field
        confirmPassword: 'confirm_password', // Matching curl field
        phone: 'phone', // Matching curl field
        university: 'university',
        degree: 'degree',
        major: 'major',
        visaStatus: 'visa_status',
        graduationDate: 'graduation_date',
        optEndDate: 'opt_end_date',
        referralSource: 'referral_source',
        // consentToTerms is handled explicitly below to send 'true'/'false'
        consentToTerms: 'consent_to_terms',
        // LinkedIn and Github URLs were not in the curl but included in the form/logic, keeping them as optional
        linkedinUrl: 'linkedin_url', 
        githubUrl: 'github_url', 
        additionalNotes: 'additional_notes',
    };

    for (const [stateKey, apiKey] of Object.entries(fieldMap)) {
        let value = formData[stateKey];
        
        // Handle phone (strip mask/non-digits before sending to match curl 10-digit format)
        if (stateKey === 'phone') {
            value = value.replace(/[^\d]/g, ''); 
        } 
        
        // Handle dates (convert YYYY-MM to MM/YYYY to match curl format)
        else if (stateKey === 'graduationDate' || stateKey === 'optEndDate') {
            value = formatDateToMMYYYY(value);
        }
        
        // Handle optional optEndDate
        if (stateKey === 'optEndDate' && formData.visaStatus !== 'F1-OPT') {
            continue; // Skip if not F1-OPT
        }

        // Handle boolean (FormData requires string representation 'true'/'false')
        if (typeof value === 'boolean') {
            value = value ? 'true' : 'false';
        }
        
        if (value !== null && value !== '') {
            data.append(apiKey, value);
        }
    }
    
    // Mandatory: Append the actual resume file with the correct key 'resume_file'
    if (formData.resumeFile) {
        // The curl uses 'resume_file' as the key and expects the file data
        data.append('resume_file', formData.resumeFile, formData.resumeFile.name);
    }
    
    console.log("FormData Payload ready for API.");

    try {
        // Use an empty string for the CSRF token since we are running in an iframe, 
        // the actual token might need to be retrieved via another API call or cookie, 
        // but for a public registration endpoint, it might not be required.
        const csrfToken = ''; 
        const response = await fetch(REGISTER_API_URL, {
            method: 'POST',
            // IMPORTANT: Do NOT set Content-Type header when using FormData. 
            // Fetch sets the correct 'multipart/form-data' boundary automatically.
            headers: {
                'Accept': 'application/json',
                // 'X-CSRFTOKEN': csrfToken, 
            },
            body: data, 
        });

        if (response.ok) {
            const result = await response.json();
            setIsSubmitting(false);
            setSubmissionMessage(`Registration successful! ${result.message || 'Check your email for confirmation.'}`);
            console.log("API Success:", result);
            resetForm();  
            // Optionally clear the form or redirect
            // setFormData(initialFormState); 
            
        } else {
            // Handle HTTP error status (e.g., 400 Bad Request)
            const errorData = await response.json();
            setIsSubmitting(false);
            let errorMessage = errorData.detail || errorData.error || 'Registration failed due to server error.';
            
            // Try to extract validation errors from the backend response
            if (errorData) {
                const backendErrors = {};
                for (const key in errorData) {
                    // Try to map backend snake_case keys back to camelCase state keys if possible
                    const frontendKey = Object.keys(fieldMap).find(k => fieldMap[k] === key) || key; 
                    backendErrors[frontendKey] = Array.isArray(errorData[key]) ? errorData[key].join(', ') : errorData[key];
                }
                setErrors(prev => ({ ...prev, ...backendErrors }));
                errorMessage = errorData.detail || 'Registration failed. Please review the errors.';
            }

            setSubmissionMessage(errorMessage);
            console.error("API Error:", errorData);
        }
    } catch (error) {
        // Handle network errors (e.g., server offline, CORS issue)
        setIsSubmitting(false);
        setSubmissionMessage(`Network error. Could not connect to the backend at ${REGISTER_API_URL}.`);
        console.error("Network Fetch Error:", error);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setSubmissionMessage('');
    setIsSubmitting(false);
    navigate('/login');
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
    // Pale Blue/White Background Theme
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


    <div className="min-vh-100 d-flex align-items-center justify-content-center py-4" style={{ backgroundColor: paleBackground }}>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                
                {/* Header */}
                <div className="text-center mb-5">
                  <div className="d-flex justify-content-center mb-4">
                    <div className="p-3 rounded-circle" style={{ backgroundColor: primaryColor + '1A' }}>
                      <GraduationCap className="h-8 w-8" style={{ color: primaryColor }} />
                    </div>
                  </div>
                  <h2 className="card-title fw-bold mb-2" style={{ color: primaryColor }}>
                    Candidate Application Form
                  </h2>
                  <p className="text-muted lead">
                    Please provide your professional and academic details.
                  </p>
                </div>

               

                <form noValidate onSubmit={handleSubmit}>
                  <div className="row g-4">
                    
                    {/* --- ACCOUNT AND PERSONAL DETAILS SECTION --- */}

                    {/* First Name */}
                    <div className="col-md-6">
                      <TextInput
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        icon={User}
                        required
                        maxLength={50}
                        placeholder="John"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="col-md-6">
                      <TextInput
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        icon={User}
                        required
                        maxLength={50}
                        placeholder="Doe"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="col-md-6">
                      <TextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        icon={Mail}
                        required
                        placeholder="you@example.com"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="col-md-6">
                      <TextInput
                        label="Phone (10 Digits)"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        icon={Phone}
                        required
                        countryCode={formData.countryCode}
                        placeholder="0000000000"
                        maxLength={10} // Display/input limit
                      />
                    </div>
                    
                    {/* Password */}
                    <div className="col-md-6">
                      <TextInput
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        icon={Lock}
                        required
                        placeholder="Secure Password (Min 8 chars)"
                      />
                    </div>
                    
                    {/* Confirm Password */}
                    <div className="col-md-6">
                      <TextInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        icon={Lock}
                        required
                        placeholder="Confirm Secure Password"
                      />
                    </div>

                    <hr className="my-3"/>

                    {/* --- ACADEMIC DETAILS SECTION --- */}

                    {/* University */}
                    <div className="col-md-6">
                      <TextInput
                        label="University (Max 100 chars)"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        error={errors.university}
                        icon={GraduationCap}
                        required
                        maxLength={100}
                        placeholder="State University"
                      />
                    </div>

                    {/* Major */}
                    <div className="col-md-6">
                      <TextInput
                        label="Major (Max 100 chars)"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                        error={errors.major}
                        icon={GraduationCap}
                        required
                        maxLength={100}
                        placeholder="Computer Science"
                      />
                    </div>

                    {/* Degree Dropdown */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold text-dark" htmlFor="degree">
                          Degree<span className="text-danger ms-1">*</span>
                        </label>
                        <select
                          id="degree"
                          name="degree"
                          value={formData.degree}
                          onChange={handleChange}
                          className={`form-select form-select-lg ${errors.degree ? 'is-invalid' : ''}`}
                          required
                        >
                          <option value="" disabled>Select Degree</option>
                          {degreeOptions.map(degree => (
                            <option key={degree} value={degree}>{degree}</option>
                          ))}
                        </select>
                        {errors.degree && <div className="invalid-feedback d-block">{errors.degree}</div>}
                      </div>
                    </div>

                    {/* Graduation Date (MM/YYYY) */}
                    <div className="col-md-6">
                      <TextInput
                        label="Graduation (MM/YYYY)"
                        name="graduationDate"
                        type="date" // This uses type='month' for YYYY-MM which is converted in handleSubmit
                        value={formData.graduationDate}
                        onChange={handleChange}
                        error={errors.graduationDate}
                        icon={Calendar}
                        required
                      />
                    </div>
                    
                    {/* Graduation Date (MM/YYYY)
                    <div className="col-md-6">
                      <TextInput
                        label="End Date (MM/YYYY)"
                        name="optEndDate"
                        type="date" // This uses type='month' for YYYY-MM which is converted in handleSubmit
                        value={formData.optEndDate}
                        onChange={handleChange}
                        error={errors.optEndDate}
                        icon={Calendar}
                        required
                      />
                    </div>
                     */}
                    
                    <hr className="my-3"/>

                    {/* --- LEGAL/VISA/RESUME SECTION --- */}

                    {/* Visa Status Dropdown */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold text-dark" htmlFor="visaStatus">
                          Visa Status<span className="text-danger ms-1">*</span>
                        </label>
                        <select
                          id="visaStatus"
                          name="visaStatus"
                          value={formData.visaStatus}
                          onChange={handleChange}
                          className={`form-select form-select-lg ${errors.visaStatus ? 'is-invalid' : ''}`}
                          required
                        >
                          {visaOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        {errors.visaStatus && <div className="invalid-feedback d-block">{errors.visaStatus}</div>}
                      </div>
                    </div>

                    {/* OPT End Date (Conditional) */}
                    {(formData.visaStatus === 'F1-OPT') && (
                      <div className="col-md-6">
                        <TextInput
                          label="OPT End Date (MM/YYYY)"
                          name="optEndDate"
                          type="date" // This uses type='month' for YYYY-MM which is converted in handleSubmit
                          value={formData.optEndDate}
                          onChange={handleChange}
                          error={errors.optEndDate}
                          icon={Calendar}
                          required={formData.visaStatus === 'F1-OPT'}
                        />
                      </div>
                    )}
                    
                    {/* Referral Source Dropdown */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold text-dark" htmlFor="referralSource">
                          Referral Source
                        </label>
                        <select
                          id="referralSource"
                          name="referralSource"
                          value={formData.referralSource}
                          onChange={handleChange}
                          className={`form-select form-select-lg ${errors.referralSource ? 'is-invalid' : ''}`}
                        >
                          {referralOptions.map(source => (
                            <option key={source} value={source}>{source}</option>
                          ))}
                        </select>
                        {errors.referralSource && <div className="invalid-feedback d-block">{errors.referralSource}</div>}
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold text-dark" htmlFor="resumeFile">
                          Resume Upload (PDF/DOCX, Max 5MB)<span className="text-danger ms-1">*</span>
                        </label>
                        <div className={`border rounded-3 p-3 ${errors.resumeFile ? 'border-danger bg-danger bg-opacity-10' : 'border-secondary border-opacity-25'}`}>
                          <div className="d-flex align-items-center">
                            <div className="p-2 rounded-2 me-3" style={{ backgroundColor: primaryColor + '1A' }}>
                              <Upload className="h-5 w-5" style={{ color: primaryColor }} />
                            </div>
                            <div className="flex-grow-1">
                              <input
                                type="file"
                                id="resumeFile"
                                name="resumeFile"
                                onChange={handleChange}
                                className="form-control form-control-lg"
                                accept=".pdf,.docx,.doc"
                                required
                              />
                            </div>
                            <div className="ms-3">
                              {formData.resumeFile ? (
                                <span className="badge bg-success rounded-pill px-3 py-2">Uploaded</span>
                              ) : (
                                <span className="badge bg-secondary rounded-pill px-3 py-2">Pending</span>
                              )}
                            </div>
                          </div>
                          {formData.resumeFile && (
                            <p className="text-success mt-2 mb-0 d-flex align-items-center fw-semibold">
                              <span className="me-2" style={{ color: primaryColor }}>&bull;</span>
                              Selected: {formData.resumeFile.name} ({(formData.resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                          )}
                        </div>
                        {errors.resumeFile && <div className="invalid-feedback d-block">{errors.resumeFile}</div>}
                      </div>
                    </div>
                    
                    <hr className="my-3"/>

                    {/* --- OPTIONAL LINKS / NOTES SECTION --- */}

                    {/* LinkedIn URL */}
                    <div className="col-md-6">
                      <TextInput
                        label="LinkedIn Profile URL (Optional)"
                        name="linkedinUrl"
                        type="url"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        error={errors.linkedinUrl}
                        icon={LinkIcon}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>

                    {/* GitHub URL */}
                    <div className="col-md-6">
                      <TextInput
                        label="GitHub Profile URL (Optional)"
                        name="githubUrl"
                        type="url"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        error={errors.githubUrl}
                        icon={GitBranch}
                        placeholder="https://github.com/..."
                      />
                    </div>

                    {/* Additional Notes */}
                    <div className="col-12">
                      <TextInput
                        label="Additional Notes (Max 500 chars, Optional)"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        error={errors.additionalNotes}
                        icon={ScrollText}
                        isTextArea
                        maxLength={500}
                      />
                    </div>
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div className="mt-4 p-4 rounded-3 border" style={{ backgroundColor: primaryColor + '0A', borderColor: primaryColor + '33' }}>
                    <div className="form-check">
                      <input
                        id="consentToTerms"
                        name="consentToTerms"
                        type="checkbox"
                        checked={formData.consentToTerms}
                        onChange={handleChange}
                        className={`form-check-input ${errors.consentToTerms ? 'is-invalid' : ''}`}
                        style={{ borderColor: primaryColor, color: primaryColor, backgroundColor: formData.consentToTerms ? primaryColor : 'white' }}
                      />
                      <label htmlFor="consentToTerms" className="form-check-label text-dark fw-medium">
                        I hereby confirm that all information provided is accurate and agree to the{' '}
                        <a 
                          href="/TermsConditions" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-decoration-none fw-bold" 
                          style={{ color: primaryColor }}
                        >
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a 
                          href="/PrivacyPolicy" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-decoration-none fw-bold" 
                          style={{ color: primaryColor }}
                        >
                          Privacy Policy
                        </a>
                        .
                        <span className="text-danger ms-1">*</span>
                      </label>
                      {errors.consentToTerms && <div className="invalid-feedback d-block">{errors.consentToTerms}</div>}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-lg w-100 py-3 fw-bold rounded-pill"
                      style={{ backgroundColor: primaryColor, borderColor: primaryColor, color: 'white' }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          {submissionMessage || 'Submitting Application...'}
                        </>
                      ) : (
                        <>
                          <Users className="w-6 h-6 me-2" />
                          Submit Application
                        </>
                      )}
                    </button>
                  </div>

                  {/* Login Link */}
                  <div className="text-center mt-4 pt-4 border-top">
                    <p className="text-muted">
                      Need to log in instead?{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="btn btn-link fw-bold text-decoration-none p-0"
                        style={{ color: primaryColor }}
                      >
                        <LogIn className="w-4 h-4 me-1" />
                        Sign In Here
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

export default Register;