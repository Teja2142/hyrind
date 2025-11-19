import React, { useState } from 'react';
// Import Link and useNavigate
import { Link, useNavigate } from 'react-router-dom'; 

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
const TextInput = ({ label, name, type = 'text', value, onChange, error, icon: Icon, required = false, placeholder, maxLength, isTextArea = false }) => {
  const isDate = type === 'date';

  return (
    <div className="mb-3">
      <label className="form-label fw-semibold text-dark" htmlFor={name}>
        {label}
        {required && <span className="text-danger ms-1">*</span>}
        {maxLength && isTextArea && <span className="text-muted ms-2 text-sm">({maxLength - (value?.length || 0)} chars left)</span>}
      </label>
      <div className="input-group">
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
        ) : (
          <input
            type={isDate ? 'text' : type} // Treat date as text input to allow MM/YYYY mask
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            // Add a placeholder to guide the user for date input format
            placeholder={isDate ? 'MM/YYYY' : placeholder}
            onFocus={isDate ? (e) => (e.target.type = 'month') : undefined} // Switch to month picker on focus
            onBlur={isDate ? (e) => (e.target.type = 'text') : undefined} // Switch back to text on blur
            className={`form-control form-control-lg ${error ? 'is-invalid border-danger' : 'border-start-0'}`}
            required={required}
            // Only set inputMode to numeric for phone field
            inputMode={name === 'phone' ? 'numeric' : 'text'}
            // For month input, we use a simple text input with a mask to force MM/YYYY
            min={isDate ? "1950-01" : undefined}
            max={isDate ? "2050-12" : undefined}
          />
        )}
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </div>
    </div>
  );
};


// Main Register Component
// FIX APPLIED: Removed { navigate } prop which caused the redeclaration error
const Register = () => {
  const navigate = useNavigate(); // This is the correct way to get the function in RRDv6+
  // Define the target API endpoint
  const REGISTER_API_URL = "http://127.0.0.1:8000/api/register/";
  
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    university: '',
    degree: '',
    major: '',
    visaStatus: 'Citizen',
    graduationDate: '', // MM/YYYY
    optEndDate: '', // MM/YYYY - Conditional
    resumeFile: null,
    referralSource: 'Google',
    consentToTerms: false,
    linkedinUrl: '',
    githubUrl: '',
    additionalNotes: '',
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
    
    // Stricter Email Regex: Requires @ and domain part (e.g., example.com)
    // The user requested checking for '@gamil.com', '@theirdomain.com/.in'. This regex covers that structure generally.
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    
    // Name Regex: Only allows letters, spaces, hyphens, and apostrophes
    const nameRegex = /^[a-zA-Z\s'-]+$/; 
    
    // Phone Regex: Exactly 15 chars for the +1-XXX-XXX-XXXX format
    const phoneRegex = /^\+1-\d{3}-\d{3}-\d{4}$/; 
    
    const dateRegex = /^\d{4}-\d{2}$/; // YYYY-MM format from input type="month"
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    // --- A. Required Fields Check ---
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'university', 'degree', 'major', 'visaStatus', 'graduationDate', 'consentToTerms'];
    
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
    if (formData.firstName) {
        if (!nameRegex.test(formData.firstName.trim())) {
            newErrors.firstName = 'Name can only contain letters, spaces, hyphens, and apostrophes.';
        } else if (formData.firstName.length > 50) {
            newErrors.firstName = 'Max 50 characters.';
        }
    }
    if (formData.lastName) {
        if (!nameRegex.test(formData.lastName.trim())) {
            newErrors.lastName = 'Name can only contain letters, spaces, hyphens, and apostrophes.';
        } else if (formData.lastName.length > 50) {
            newErrors.lastName = 'Max 50 characters.';
        }
    }

    // Email Validation
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format (e.g., user@domain.com).';
    }

    // Phone Validation
    if (formData.phone) {
        const digitsOnly = formData.phone.replace(/[^\d]/g, '');
        if (digitsOnly.length !== 11) { // 1 (for +1) + 10 digits
            newErrors.phone = 'Phone number must be exactly 10 digits.';
        } else if (!phoneRegex.test(formData.phone)) {
            // This is primarily a double-check if the mask logic failed, ensuring final format is correct
            newErrors.phone = 'Format must be +1-XXX-XXX-XXXX.';
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
        // 1. Filter out all non-digit characters. This blocks alphabets.
        const originalDigits = value.replace(/[^\d]/g, '');
        // We only care about the last 10 digits the user intends to enter
        const userDigits = originalDigits.length > 1 ? originalDigits.substring(1) : originalDigits;
        const tenDigits = userDigits.substring(0, 10);

        // 2. Apply the +1-XXX-XXX-XXXX format mask logic
        if (tenDigits.length === 0) {
            newValue = '';
        } else if (tenDigits.length <= 3) {
            newValue = `+1-${tenDigits}`;
        } else if (tenDigits.length <= 6) {
            newValue = `+1-${tenDigits.substring(0, 3)}-${tenDigits.substring(3)}`;
        } else {
            newValue = `+1-${tenDigits.substring(0, 3)}-${tenDigits.substring(3, 6)}-${tenDigits.substring(6)}`;
        }

    } else if (name === 'firstName' || name === 'lastName') {
        // Name validation during input (only allow letters, spaces, hyphens, apostrophes)
        // Note: The stricter check is in the validate() function, this just prevents numbers/symbols from being typed
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

    // Prepare data payload for the backend
    const apiPayload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        // Remove +1- prefix/masking for clean submission (assuming backend expects 10 digits or E.164)
        phone_number: formData.phone.replace(/[^\d]/g, ''), 
        university: formData.university,
        degree: formData.degree,
        major: formData.major,
        visa_status: formData.visaStatus,
        // Convert YYYY-MM date string to MM/YYYY format if needed, or just send YYYY-MM
        graduation_date: formData.graduationDate, 
        opt_end_date: formData.visaStatus === 'F1-OPT' ? formData.optEndDate : null,
        referral_source: formData.referralSource,
        linkedin_url: formData.linkedinUrl,
        github_url: formData.githubUrl,
        additional_notes: formData.additionalNotes,
        // consent_to_terms: formData.consentToTerms, // Backend usually confirms this based on submission
        // Note: File upload requires FormData, but for JSON API, we typically send the metadata and upload the file separately/later.
        // For this example, we log file name but don't try to upload the binary data via JSON.
        resume_file_name: formData.resumeFile ? formData.resumeFile.name : null,
    };

    try {
        const response = await fetch(REGISTER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any necessary authorization headers (e.g., 'Authorization': 'Bearer token')
            },
            body: JSON.stringify(apiPayload),
        });

        if (response.ok) {
            const result = await response.json();
            setIsSubmitting(false);
            // Assuming the backend returns a helpful message
            setSubmissionMessage(`Registration successful! ${result.message || ''}`);
            // Clear the form upon success
            // setFormData(initialFormState);
            console.log("API Success:", result);
            
        } else {
            // Handle HTTP error status (e.g., 400 Bad Request, 500 Server Error)
            const errorData = await response.json();
            setIsSubmitting(false);
            let errorMessage = errorData.detail || errorData.error || 'Registration failed due to server error.';
            
            // Try to extract validation errors from the backend response and merge with front-end errors
            if (errorData.errors) {
                const backendErrors = {};
                for (const key in errorData.errors) {
                    backendErrors[key] = errorData.errors[key].join(', ');
                }
                setErrors(prev => ({ ...prev, ...backendErrors }));
                errorMessage = 'Registration failed. Please review the errors.';
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

  return (
    // Pale Blue/White Background Theme
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

                {/* Submission Message Area */}
                {submissionMessage && (
                    <div className={`alert ${isSubmitting ? 'alert-info' : errors && Object.keys(errors).length > 0 ? 'alert-danger' : 'alert-success'} text-center mb-4`}>
                        {submissionMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    
                    {/* --- PERSONAL DETAILS SECTION --- */}

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
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        icon={Phone}
                        required
                        placeholder="+1-000-000-0000"
                        maxLength={15} // Length of the mask
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
                        type="date"
                        value={formData.graduationDate}
                        onChange={handleChange}
                        error={errors.graduationDate}
                        icon={Calendar}
                        required
                      />
                    </div>
                    
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
                          type="date"
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
                        label="LinkedIn Profile URL"
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
                        label="GitHub Profile URL"
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
                        label="Additional Notes (Max 500 chars)"
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
  );
};

export default Register;