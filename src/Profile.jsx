import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- START: Inline SVG Icon Definitions (Expanded for Edit Form) ---

const LogOut = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

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

const Edit = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const Save = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const Upload = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
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

const Target = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// --- END: Inline SVG Icon Definitions ---

// Utility to convert MM/YYYY date format (from API) to YYYY-MM (for input type='month')
const formatDateToInput = (dateString) => {
    if (!dateString) return '';
    // Expected format: MM/YYYY
    if (dateString.length === 7 && dateString.indexOf('/') === 2) {
        const [month, year] = dateString.split('/');
        return `${year}-${month}`;
    }
    return '';
};

// Utility to convert YYYY-MM format (from input) to MM/YYYY (for API)
const formatDateToApi = (dateString) => {
    if (!dateString || dateString.length !== 7 || dateString.indexOf('-') !== 4) return dateString;
    const [year, month] = dateString.split('-');
    return `${month}/${year}`;
};

// --- Reusable TextInput Component (Adapted from Register.jsx) ---
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
  readOnly = false,
  options = null,
}) => {
  const isDate = type === 'date';
  const primaryColor = '#4682B4';

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

      <div className="input-group">
        {Icon && (
          <span className="input-group-text bg-white border-end-0">
            <Icon className="h-5 w-5 text-primary opacity-75" style={{ color: primaryColor }} />
          </span>
        )}
        
        {options ? (
          <select
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            className={`form-select form-select-lg ${error ? 'is-invalid' : 'border-start-0'}`}
            required={required}
            disabled={readOnly}
          >
            <option value="" disabled>Select {label}</option>
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : isTextArea ? (
          <textarea
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            maxLength={maxLength}
            rows="3"
            className={`form-control ${error ? 'is-invalid border-danger' : 'border-start-0'}`}
            required={required}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        ) : (
          <input
            type={isDate ? 'month' : type}
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`form-control form-control-lg ${
              error ? 'is-invalid border-danger' : 'border-start-0'
            }`}
            required={required}
            readOnly={readOnly}
          />
        )}
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

// Helper component for displaying profile field data
const ProfileField = ({ icon: Icon, label, value, isLink = false }) => {
    const primaryColor = '#4682B4';
    return (
        <div className="d-flex align-items-center mb-3">
            <div className="p-2 me-3 rounded-circle" style={{ backgroundColor: primaryColor + '1A' }}>
                <Icon className="w-5 h-5 text-secondary" style={{ color: primaryColor }} />
            </div>
            <div>
                <p className="text-muted mb-0 small fw-semibold">{label}</p>
                {isLink && value ? (
                    <a href={value} target="_blank" rel="noopener noreferrer" className="fw-bold mb-0 text-decoration-none" style={{ color: primaryColor }}>
                        {value.length > 30 ? value.substring(0, 30) + '...' : value}
                    </a>
                ) : (
                    <p className="fw-bold mb-0 text-dark" style={{ whiteSpace: 'pre-wrap' }}>{value || 'N/A'}</p>
                )}
            </div>
        </div>
    );
};

// Main Profile Component
const Profile = () => {
  const navigate = useNavigate();
  const primaryColor = '#4682B4'; // Steel Blue
  const paleBackground = '#F0F8FF'; // Alice Blue
  
  // API URL for fetching profile data. The base URL suggests an endpoint that returns the logged-in user's profile based on the token.
  // We assume the non-ID endpoint returns the current user's profile array (which has an ID) or a single object.
  const BASE_API_URL = "http://127.0.0.1:8000/api/users/profiles/"; 

  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({}); // Used for editing
  const [profileId, setProfileId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Constants for form
  const degreeOptions = ['Bachelor\'s', 'Master\'s', 'PhD'];
  const visaOptions = ['F1-OPT', 'F1-CPT', 'H1B', 'Green Card', 'Citizen', 'Other'];
  const referralOptions = ['Google', 'LinkedIn', 'Friend', 'University', 'Other'];

  // --- Validation Logic (Minimal for PATCH) ---
  const validate = (data) => {
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const nameRegex = /^[a-zA-Z\s'-]+$/; 
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    // Check required fields (Email and Phone must be present in PATCH if user tries to update)
    if (!data.email || data.email.trim() === '') newErrors.email = 'Email is required.';
    if (!data.phone || data.phone.trim() === '') newErrors.phone = 'Phone is required.';

    if (data.email && !emailRegex.test(data.email)) newErrors.email = 'Invalid email format.';
    
    // Simple phone validation (10 digits expected)
    const phoneDigits = (data.phone || '').replace(/[^\d]/g, '');
    if (data.phone && phoneDigits.length !== 10) newErrors.phone = 'Phone must be 10 digits.';

    if (data.firstName && (!nameRegex.test(data.firstName.trim()) || data.firstName.length > 50)) newErrors.firstName = 'Invalid name or max 50 chars.';
    if (data.lastName && (!nameRegex.test(data.lastName.trim()) || data.lastName.length > 50)) newErrors.lastName = 'Invalid name or max 50 chars.';

    if (data.linkedinUrl && !urlRegex.test(data.linkedinUrl)) newErrors.linkedinUrl = 'Invalid URL format.';
    if (data.githubUrl && !urlRegex.test(data.githubUrl)) newErrors.githubUrl = 'Invalid URL format.';
    
    // Check conditional required field
    if (data.visaStatus === 'F1-OPT' && (!data.optEndDate || data.optEndDate.trim() === '')) {
      newErrors.optEndDate = 'OPT End Date is required for F1-OPT status.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Fetch Profile Data ---
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setError("You are not logged in. Redirecting to login...");
        setLoading(false);
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      // We assume the initial fetch to the base URL returns the single logged-in user's profile
      // or an array containing it. We'll use the ID from this response for future PATCH/GET calls.
      // --- Decode JWT to extract user_id ---
      function parseJwt (token) {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          return null;
        }
      }

      try {
          const storedToken = localStorage.getItem("accessToken");

          if (!storedToken) {
              setError("Not logged in.");
              navigate("/login");
              return;
          }

          // Decode JWT to get user_id
          const parseJwt = (token) => {
              try {
                  return JSON.parse(atob(token.split(".")[1]));
              } catch (e) {
                  return null;
              }
          };

          const decoded = parseJwt(storedToken);
          const userId = decoded?.user_id;

          // STEP 1 — Get all profiles
          const response = await fetch(BASE_API_URL, {
              method: "GET",
              headers: {
                  accept: "application/json",
                  Authorization: `Bearer ${storedToken}`,
              },
          });

          if (!response.ok) throw new Error("Failed to load profiles");

          const profiles = await response.json();

          // STEP 2 — Find the profile tied to logged-in user
          // 🔥 THIS IS THE ONLY CORRECT MATCHING LINE
          const profile = profiles.find((p) => p.user.id === Number(userId));

          if (!profile) {
              setError("Profile not found for current user.");
              return;
          }

          // STEP 3 — Set states
          setProfileData(profile);
          setProfileId(profile.id);

          setFormData({
              firstName: profile.first_name,
              lastName: profile.last_name,
              email: profile.email,
              phone: profile.phone,
              university: profile.university,
              degree: profile.degree,
              major: profile.major,
              visaStatus: profile.visa_status,
              graduationDate: formatDateToInput(profile.graduation_date),
              optEndDate: formatDateToInput(profile.opt_end_date),
              consentToTerms: profile.consent_to_terms,
              referralSource: profile.referral_source,
              linkedinUrl: profile.linkedin_url,
              githubUrl: profile.github_url,
              additionalNotes: profile.additional_notes,
          });

      } catch (err) {
          setError("Failed to fetch profile.");
          console.error("Fetch Profile Error:", err);
      } finally {
          setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // --- Handlers ---

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const handleInterestForm = () => {
    navigate('/interest'); // Assuming the Interest component is at /interest
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let newValue = value;

    if (type === 'file') {
        newValue = files[0];
    } else if (type === 'checkbox') {
        newValue = checked;
    } else if (name === 'phone') {
        // Only allow digits for phone input
        const digitsOnly = value.replace(/[^\d]/g, '');
        newValue = digitsOnly.substring(0, 10); 
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setSubmissionMessage('');
  };

  const handleToggleEdit = () => {
    // When switching to edit mode, ensure form data is synchronized with current profile data
    if (!isEditing) {
        setFormData({
            firstName: profileData.first_name,
            lastName: profileData.last_name,
            email: profileData.email,
            phone: profileData.phone,
            university: profileData.university,
            degree: profileData.degree,
            major: profileData.major,
            visaStatus: profileData.visa_status,
            graduationDate: formatDateToInput(profileData.graduation_date), 
            optEndDate: formatDateToInput(profileData.opt_end_date), 
            resumeFile: null, // Always reset file input
            consentToTerms: profileData.consent_to_terms,
            referralSource: profileData.referral_source,
            linkedinUrl: profileData.linkedin_url,
            githubUrl: profileData.github_url,
            additionalNotes: profileData.additional_notes,
        });
        setErrors({});
        setSubmissionMessage('');
    }
    setIsEditing(prev => !prev);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!validate(formData)) {
        setSubmissionMessage('Please correct the highlighted errors.');
        return;
    }

    setIsSubmitting(true);
    setSubmissionMessage('Saving changes...');
    const token = localStorage.getItem('accessToken');
    const updateUrl = `${BASE_API_URL}${profileId}/`;

    // --- Prepare FormData for PATCH (Multipart/form-data required for file upload) ---
    const data = new FormData();
    const fieldMap = {
        firstName: 'first_name',
        lastName: 'last_name',
        email: 'email',
        phone: 'phone',
        university: 'university',
        degree: 'degree',
        major: 'major',
        visaStatus: 'visa_status',
        graduationDate: 'graduation_date',
        optEndDate: 'opt_end_date',
        consentToTerms: 'consent_to_terms',
        referralSource: 'referral_source',
        linkedinUrl: 'linkedin_url', 
        githubUrl: 'github_url', 
        additionalNotes: 'additional_notes',
    };

    // Only append fields that have changed OR are required and must be sent
    for (const [stateKey, apiKey] of Object.entries(fieldMap)) {
        let value = formData[stateKey];
        
        // Handle phone (strip mask/non-digits before sending)
        if (stateKey === 'phone') {
            value = (value || '').replace(/[^\d]/g, ''); 
        } 
        
        // Handle dates (convert YYYY-MM to MM/YYYY for API)
        else if (stateKey === 'graduationDate' || stateKey === 'optEndDate') {
            value = formatDateToApi(value);
        }
        
        // Skip OPT End Date if status is not F1-OPT
        if (stateKey === 'optEndDate' && formData.visaStatus !== 'F1-OPT') {
            continue;
        }

        // Handle boolean (FormData requires string representation 'true'/'false')
        if (typeof value === 'boolean') {
            value = value ? 'true' : 'false';
        }
        
        // Only append non-null/non-empty values or values different from the original profile data
        const originalKey = profileData[apiKey];
        if (value !== null && value !== undefined && value !== '' && value !== originalKey) {
            data.append(apiKey, value);
        }
    }

    // Handle resume file upload separately
    if (formData.resumeFile) {
        data.append('resume_file', formData.resumeFile, formData.resumeFile.name);
    }
    
    // Check if any fields were actually updated
    let isDataEmpty = true;
    for (const pair of data.entries()) {
        if (pair[0] !== 'resume_file') { // Count file separately as it's an action, not a data field change
            isDataEmpty = false;
            break;
        }
    }
    
    if (isDataEmpty && !formData.resumeFile) {
        setIsSubmitting(false);
        setSubmissionMessage('No changes detected to update.');
        setIsEditing(false); // Go back to view mode
        return;
    }


    try {
        const response = await fetch(updateUrl, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
            // Do NOT set 'Content-Type': 'multipart/form-data' - fetch sets it automatically
            body: data, 
        });

        if (response.ok) {
            const updatedProfile = await response.json();
            setProfileData(updatedProfile); // Update local profile state
            setIsSubmitting(false);
            setSubmissionMessage(`Profile updated successfully!`);
            setIsEditing(false); // Exit edit mode
            setErrors({});
        } else {
            const errorData = await response.json();
            setIsSubmitting(false);
            let errorMessage = errorData.detail || 'Update failed due to server error.';
            
            if (errorData) {
                const backendErrors = {};
                for (const key in errorData) {
                    // Try to map backend snake_case keys back to camelCase state keys (simplified)
                    if (key !== 'detail') {
                         backendErrors[key] = Array.isArray(errorData[key]) ? errorData[key].join(', ') : errorData[key];
                    }
                }
                setErrors(prev => ({ ...prev, ...backendErrors }));
                errorMessage = errorData.detail || 'Update failed. Please review the errors.';
            }

            setSubmissionMessage(errorMessage);
            console.error("API Error:", errorData);
        }
    } catch (error) {
        setIsSubmitting(false);
        setSubmissionMessage(`Network error. Could not connect to the backend.`);
        console.error("Network Fetch Error:", error);
    }
  };


  if (loading) {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: paleBackground }}>
            <div className="text-center">
                <div className="spinner-border text-primary" role="status" style={{ color: primaryColor }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading your profile data...</p>
            </div>
        </div>
    );
  }

  if (error || !profileData) {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: paleBackground }}>
            <div className="alert alert-danger p-4 shadow-lg rounded-3">
                <h4 className="alert-heading">Access Denied!</h4>
                <p>{error || "Could not load profile data."}</p>
                <button 
                    onClick={handleLogout} 
                    className="btn btn-sm btn-outline-danger mt-2"
                >
                    <LogOut className="w-4 h-4 me-1" /> Go to Login
                </button>
            </div>
        </div>
    );
  }

  const profile = profileData;

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-4" style={{ backgroundColor: paleBackground }}>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                
                {/* Header and Action Buttons */}
                <div className="d-flex justify-content-between align-items-start mb-5 border-bottom pb-3 flex-column flex-sm-row">
                  <h2 className="card-title fw-bold mb-3 mb-sm-0" style={{ color: primaryColor }}>
                    {isEditing ? 'Edit Profile' : 'User Profile'}
                  </h2>
                  <div className="d-flex gap-2 flex-wrap justify-content-end">
                    
                    {/* Logout Button */}
                    <button 
                      onClick={handleLogout} 
                      className="btn btn-sm btn-outline-danger fw-semibold"
                    >
                      <LogOut className="w-4 h-4 me-1" /> Logout
                    </button>

                    {/* Interest Form Button */}
                    <button 
                      onClick={handleInterestForm} 
                      className="btn btn-sm fw-semibold"
                      style={{backgroundColor: primaryColor + '1A', color: primaryColor}}
                    >
                      <Target className="w-4 h-4 me-1" /> Interest Form
                    </button>
                    
                    {/* Update Profile Button / Cancel Button */}
                    <button 
                      onClick={handleToggleEdit} 
                      className={`btn btn-sm fw-semibold ${isEditing ? 'btn-outline-secondary' : 'btn-success'}`}
                      style={{ backgroundColor: isEditing ? 'white' : '#10B981', color: isEditing ? '#495057' : 'white', borderColor: isEditing ? '#ccc' : '#10B981'}}
                      disabled={isSubmitting}
                    >
                      {isEditing ? (
                        <>Cancel Edit</>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 me-1" /> Update Profile
                        </>
                      )}
                    </button>

                  </div>
                </div>
                
                {/* Profile Photo Placeholder */}
                <div className="text-center mb-5">
                    <div 
                        className="mx-auto rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                        style={{ width: '100px', height: '100px', backgroundColor: primaryColor + '33' }}
                    >
                        <User className="w-10 h-10" style={{ color: primaryColor }} />
                    </div>
                    <h3 className="mt-3 fw-bold text-dark">{profile.first_name} {profile.last_name}</h3>
                    <p className="text-muted">Profile ID: {profile.id}</p>
                </div>

                {/* Submission Message Area */}
                {submissionMessage && (
                    <div className={`alert ${isSubmitting ? 'alert-info' : errors && Object.keys(errors).length > 0 ? 'alert-danger' : 'alert-success'} text-center mb-4`}>
                        {submissionMessage}
                    </div>
                )}
                
                <form onSubmit={handleUpdateProfile} noValidate>
                    <div className="row g-4">
                        
                        {/* Conditional Rendering: View vs. Edit */}
                        
                        {isEditing ? (
                            <>
                                {/* EDIT MODE FORM */}
                                <div className="col-md-6">
                                    <TextInput label="First Name" name="firstName" value={formData.firstName} onChange={handleEditChange} error={errors.firstName} icon={User} required maxLength={50} placeholder="First Name" />
                                </div>
                                <div className="col-md-6">
                                    <TextInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleEditChange} error={errors.lastName} icon={User} required maxLength={50} placeholder="Last Name" />
                                </div>
                                <div className="col-md-6">
                                    {/* Email is often non-editable, but API says it's required for PUT/PATCH */}
                                    <TextInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleEditChange} error={errors.email} icon={Mail} required placeholder="you@example.com" />
                                </div>
                                <div className="col-md-6">
                                    <TextInput label="Phone (10 Digits)" name="phone" type="tel" value={formData.phone} onChange={handleEditChange} error={errors.phone} icon={Phone} required maxLength={10} placeholder="0000000000" />
                                </div>
                                <div className="col-md-6">
                                    <TextInput label="University" name="university" value={formData.university} onChange={handleEditChange} error={errors.university} icon={GraduationCap} maxLength={100} placeholder="University Name" />
                                </div>
                                <div className="col-md-6">
                                    <TextInput label="Major" name="major" value={formData.major} onChange={handleEditChange} error={errors.major} icon={GraduationCap} maxLength={100} placeholder="Major" />
                                </div>
                                <div className="col-md-6">
                                    <TextInput label="Degree" name="degree" value={formData.degree} onChange={handleEditChange} error={errors.degree} icon={GraduationCap} options={degreeOptions} placeholder="Select Degree" />
                                </div>
                                <div className="col-md-6">
                                    <TextInput label="Graduation (MM/YYYY)" name="graduationDate" type="date" value={formData.graduationDate} onChange={handleEditChange} error={errors.graduationDate} icon={Calendar} placeholder="MM/YYYY" />
                                </div>
                                <div className="col-md-6">
                                    <TextInput label="Visa Status" name="visaStatus" value={formData.visaStatus} onChange={handleEditChange} error={errors.visaStatus} icon={GraduationCap} options={visaOptions} placeholder="Select Status" />
                                </div>
                                {formData.visaStatus === 'F1-OPT' && (
                                    <div className="col-md-6">
                                        <TextInput label="OPT End Date (MM/YYYY)" name="optEndDate" type="date" value={formData.optEndDate} onChange={handleEditChange} error={errors.optEndDate} icon={Calendar} required={formData.visaStatus === 'F1-OPT'} placeholder="MM/YYYY" />
                                    </div>
                                )}
                                <div className="col-12">
                                    <TextInput label="Additional Notes" name="additionalNotes" value={formData.additionalNotes} onChange={handleEditChange} error={errors.additionalNotes} isTextArea maxLength={500} placeholder="Enter any additional notes..." />
                                </div>
                                <div className="col-md-6">
                                    <TextInput label="LinkedIn URL" name="linkedinUrl" type="url" value={formData.linkedinUrl} onChange={handleEditChange} error={errors.linkedinUrl} icon={LinkIcon} maxLength={255} placeholder="https://linkedin.com/..." />
                                </div>
                                <div className="col-md-6">
                                    <TextInput label="GitHub URL" name="githubUrl" type="url" value={formData.githubUrl} onChange={handleEditChange} error={errors.githubUrl} icon={GitBranch} maxLength={255} placeholder="https://github.com/..." />
                                </div>
                                
                                {/* Resume File Upload (for PATCH, only new file needs to be sent) */}
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-dark" htmlFor="resumeFile">
                                            Update Resume (PDF/DOCX, Max 5MB)
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
                                                        onChange={handleEditChange}
                                                        className="form-control form-control-lg"
                                                        accept=".pdf,.docx,.doc"
                                                    />
                                                </div>
                                            </div>
                                            {(formData.resumeFile && formData.resumeFile.name) ? (
                                                <p className="text-success mt-2 mb-0 d-flex align-items-center fw-semibold">
                                                  Selected: {formData.resumeFile.name}
                                                </p>
                                            ) : profile.resume_file && (
                                                <p className="text-muted mt-2 mb-0 d-flex align-items-center fw-semibold">
                                                  Current: <a href={profile.resume_file} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor }}>View File</a>
                                                </p>
                                            )}
                                        </div>
                                        {errors.resumeFile && <div className="invalid-feedback d-block">{errors.resumeFile}</div>}
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div className="col-12 mt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn btn-lg w-100 py-3 fw-bold rounded-pill"
                                        style={{ backgroundColor: '#10B981', borderColor: '#10B981', color: 'white' }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                {submissionMessage || 'Updating...'}
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-6 h-6 me-2" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* VIEW MODE DISPLAY */}
                                <div className="col-md-6">
                                    <ProfileField icon={User} label="Full Name" value={`${profile.first_name} ${profile.last_name}`} />
                                </div>
                                <div className="col-md-6">
                                    <ProfileField icon={Mail} label="Email" value={profile.email} />
                                </div>
                                <div className="col-md-6">
                                    <ProfileField icon={Phone} label="Phone" value={profile.phone} />
                                </div>
                                <div className="col-md-6">
                                    <ProfileField icon={GraduationCap} label="University" value={profile.university} />
                                </div>
                                <div className="col-md-6">
                                    <ProfileField icon={GraduationCap} label="Degree / Major" value={`${profile.degree} in ${profile.major}`} />
                                </div>
                                <div className="col-md-6">
                                    <ProfileField icon={Calendar} label="Graduation Date" value={profile.graduation_date} />
                                </div>
                                <div className="col-md-6">
                                    <ProfileField icon={GraduationCap} label="Visa Status" value={profile.visa_status} />
                                </div>
                                {profile.visa_status === 'F1-OPT' && (
                                    <div className="col-md-6">
                                        <ProfileField icon={Calendar} label="OPT End Date" value={profile.opt_end_date} />
                                    </div>
                                )}
                                <div className="col-md-6">
                                    <ProfileField icon={LinkIcon} label="LinkedIn" value={profile.linkedin_url} isLink />
                                </div>
                                <div className="col-md-6">
                                    <ProfileField icon={GitBranch} label="GitHub" value={profile.github_url} isLink />
                                </div>

                                {/* Resume and Notes in View Mode */}
                                <div className="col-12 mt-4 pt-4 border-top">
                                    <h4 className="fw-semibold text-dark">Additional Information</h4>
                                    <div className="row mt-3">
                                        <div className="col-md-6 mb-3 mb-md-0">
                                            <p className="text-muted mb-1 small fw-semibold">Resume File</p>
                                            {profile.resume_file ? (
                                                <a href={profile.resume_file} target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{backgroundColor: primaryColor + '1A', color: primaryColor}}>
                                                    View Uploaded Resume
                                                </a>
                                            ) : (
                                                <span className="text-danger">No File Uploaded</span>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <p className="text-muted mb-1 small fw-semibold">Notes</p>
                                            <p className="text-dark small border p-2 rounded-3" style={{ whiteSpace: 'pre-wrap', minHeight: '50px' }}>
                                                {profile.additional_notes || 'No additional notes provided.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
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

export default Profile;