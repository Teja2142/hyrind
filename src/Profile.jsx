import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- START: Inline SVG Icon Definitions ---

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
const Delete = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const Upgrade = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);
// --- END: Inline SVG Icon Definitions ---

// --- Admin Dashboard Layout Styles ---
const styles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  background-color: #f3f4f6;
}
.admin-container {
  min-height: 100vh;
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
}
.admin-main-content {
  flex: 1;
  padding: 0;
  overflow-y: auto;
}
.admin-content-wrapper {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  min-height: calc(100vh - 64px);
  padding: 1.5rem;
}
.admin-sidebar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: #4f46e5;
  color: white;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  gap: 2rem;
}
.admin-profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #4338ca;
}
.admin-profile-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #a5b4fc;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.admin-profile-name {
  margin-top: 0.75rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  text-align: center;
}
.admin-profile-welcome {
  font-size: 0.75rem;
  color: #c7d2fe;
  text-align: center;
}
.admin-profile-recruiter {
  margin-top: 0.75rem;
  font-size: 0.75rem;
  color: white;
  text-align: center;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.sidebar-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.6rem 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border-radius: 0.5rem;
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
}
.sidebar-button-active {
  background-color: #3730a3;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  color: white;
}
.sidebar-button-inactive {
  color: #e0e7ff;
  background: none;
}
.sidebar-button-inactive:hover {
  background-color: #3730a3;
}
.sidebar-button-icon {
  width: 1.1rem;
  height: 1.1rem;
  margin-right: 0.55rem;
}
@media (min-width: 768px) {
  .admin-container {
    flex-direction: row;
  }
  .admin-main-content {
    padding: 2rem;
  }
  .admin-content-wrapper {
    min-height: calc(100vh - 4rem);
  }
  .admin-sidebar {
    width: 256px;
  }
}
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
`;

// date helpers
const formatDateToInput = (dateString) => {
  if (!dateString) return '';
  if (dateString.length === 7 && dateString.indexOf('/') === 2) {
    const [month, year] = dateString.split('/');
    return `${year}-${month}`;
  }
  return '';
};

const formatDateToApi = (dateString) => {
  if (!dateString || dateString.length !== 7 || dateString.indexOf('-') !== 4) return dateString;
  const [year, month] = dateString.split('-');
  return `${month}/${year}`;
};

// TextInput
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
  const primaryColor = '#4F46E5';

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
            <Icon className="h-5 w-5" style={{ color: primaryColor }} />
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

// ProfileField (view mode)
const ProfileField = ({ icon: Icon, label, value, isLink = false }) => {
  const primaryColor = '#4F46E5';
  return (
    <div className="d-flex align-items-center mb-3">
      <div className="p-2 me-3 rounded-circle" style={{ backgroundColor: primaryColor + '1A' }}>
        <Icon className="w-5 h-5" style={{ color: primaryColor }} />
      </div>
      <div>
        <p className="text-muted mb-0 small fw-semibold">{label}</p>
        {isLink && value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="fw-bold mb-0 text-decoration-none"
            style={{ color: primaryColor }}
          >
            {value.length > 30 ? value.substring(0, 30) + '...' : value}
          </a>
        ) : (
          <p className="fw-bold mb-0 text-dark" style={{ whiteSpace: 'pre-wrap' }}>
            {value || 'N/A'}
          </p>
        )}
      </div>
    </div>
  );
};

// Sidebar buttons
const SidebarButton = ({ Icon, label, onClick, variant = 'normal', isEditing }) => {
  const className =
    variant === 'primary'
      ? 'sidebar-button sidebar-button-active'
      : 'sidebar-button sidebar-button-inactive';

  
  return (
    <button type="button" onClick={onClick} className={className}>
      <Icon className="sidebar-button-icon" />
      {variant === 'primary' && typeof isEditing === 'boolean'
        ? isEditing ? 'Cancel Edit' : label
        : label}
    </button>
  );
};

// AdminSidebar with full name + actions
const AdminSidebar = ({ fullName, onLogout, onInterestForm, onToggleEdit, isEditing, onDeleteProfile,onUpgradeProfile }) => {
  const displayName = fullName && fullName.trim().length > 0 ? fullName : 'Candidate Profile';

  return (
    <div className="admin-sidebar">
      <div className="admin-profile-card">
        <div className="admin-profile-image d-flex align-items-center justify-content-center" style={{ backgroundColor: '#4F46E533' }}>
          <User width={40} height={40} />
        </div>
        <h3 className="admin-profile-name">{displayName}</h3>
        <p className="admin-profile-welcome">
          Manage your HYRIND registration & interest details.
        </p>
        <p className="admin-profile-recruiter"> Assigned Recruiter: {'Not assigned yet'}</p>
      </div>

      <nav className="sidebar-nav">
        {/* Update Profile toggle */}
        <SidebarButton
          Icon={Edit}
          label="Update Profile"
          onClick={onToggleEdit}
          variant="primary"
          isEditing={isEditing}
        />
        {/* Interest Form */}
        <SidebarButton
          Icon={Target}
          label="Interest Form"
          onClick={onInterestForm}
          variant="normal"
        />
        {/* Upgrade Profile */}
        <SidebarButton
          Icon={Upgrade}
          label="Upgrade Profile"
          onClick={onUpgradeProfile}
          variant="normal"
        />
        {/* Delete Profile */}
        <SidebarButton
          Icon={Delete}
          label="Delete Profile"
          onClick={onDeleteProfile}
          variant="normal"
        />
        {/* Logout */}
        <SidebarButton
          Icon={LogOut}
          label="Logout"
          onClick={onLogout}
          variant="normal"
        />
      </nav>
    </div>
  );
};

// --- Main Profile Component with admin dashboard layout ---
const Profile = () => {
  const navigate = useNavigate();
  const primaryColor = '#4F46E5';
  const paleBackground = '#F0F8FF';
  const BASE_API_URL = "http://127.0.0.1:8000/api/users/profiles/"; 

  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({});
  const [profileId, setProfileId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    username: '',
    password: ''
  });

  const degreeOptions = ["Bachelor's", "Master's", 'PhD'];
  const visaOptions = ['F1-OPT', 'F1-CPT', 'H1B', 'Green Card', 'Citizen', 'Other'];

  // validation
  const validate = (data) => {
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const nameRegex = /^[a-zA-Z\s'-]+$/; 
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!data.email || data.email.trim() === '') newErrors.email = 'Email is required.';
    if (!data.phone || data.phone.trim() === '') newErrors.phone = 'Phone is required.';

    if (data.email && !emailRegex.test(data.email)) newErrors.email = 'Invalid email format.';
    
    const phoneDigits = (data.phone || '').replace(/[^\d]/g, '');
    if (data.phone && phoneDigits.length !== 10) newErrors.phone = 'Phone must be 10 digits.';

    if (data.firstName && (!nameRegex.test(data.firstName.trim()) || data.firstName.length > 50))
      newErrors.firstName = 'Invalid name or max 50 chars.';
    if (data.lastName && (!nameRegex.test(data.lastName.trim()) || data.lastName.length > 50))
      newErrors.lastName = 'Invalid name or max 50 chars.';

    if (data.linkedinUrl && !urlRegex.test(data.linkedinUrl)) newErrors.linkedinUrl = 'Invalid URL format.';
    if (data.githubUrl && !urlRegex.test(data.githubUrl)) newErrors.githubUrl = 'Invalid URL format.';
    
    if (data.visaStatus === 'F1-OPT' && (!data.optEndDate || data.optEndDate.trim() === '')) {
      newErrors.optEndDate = 'OPT End Date is required for F1-OPT status.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // load profile

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError("You are not logged in. Redirecting to login...");
        setLoading(false);
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      try {
        const storedToken = localStorage.getItem("accessToken");
        if (!storedToken) {
          setError("Not logged in.");
          navigate("/login");
          return;
        }

        const parseJwt = (token) => {
          try {
            return JSON.parse(atob(token.split(".")[1]));
          } catch {
            return null;
          }
        };

        const decoded = parseJwt(storedToken);
        const userId = decoded?.user_id;

        const response = await fetch(`${BASE_API_URL}`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) throw new Error("Failed to load profiles");

        const profiles = await response.json();
        const profile = profiles.find((p) => p.user.id === Number(userId));

        if (!profile) {
          setError("Profile not found for current user.");
          return;
        }

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
  }, [navigate, BASE_API_URL]);

  // Auto-dismiss toast message
    useEffect(() => {
      if (submissionMessage) {
        const timer = setTimeout(() => {
          setSubmissionMessage('');
        }, 3000); // Disappear after 3 seconds
        return () => clearTimeout(timer);
      }
    }, [submissionMessage]);
  // actions
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const handleInterestForm = () => {
    navigate('/interest');
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let newValue = value;

    if (type === 'file') {
      newValue = files[0];
    } else if (type === 'checkbox') {
      newValue = checked;
    } else if (name === 'phone') {
      const digitsOnly = value.replace(/[^\d]/g, '');
      newValue = digitsOnly.substring(0, 10); 
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setSubmissionMessage('');
  };

  const handleToggleEdit = () => {
    if (!isEditing && profileData) {
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
        resumeFile: null,
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

    for (const [stateKey, apiKey] of Object.entries(fieldMap)) {
      let value = formData[stateKey];
      
      if (stateKey === 'phone') {
        value = (value || '').replace(/[^\d]/g, ''); 
      } else if (stateKey === 'graduationDate' || stateKey === 'optEndDate') {
        value = formatDateToApi(value);
      }
      if (stateKey === 'optEndDate' && formData.visaStatus !== 'F1-OPT') {
        continue;
      }
      if (typeof value === 'boolean') {
        value = value ? 'true' : 'false';
      }
      
      const originalKey = profileData[apiKey];
      if (value !== null && value !== undefined && value !== '' && value !== originalKey) {
        data.append(apiKey, value);
      }
    }

    if (formData.resumeFile) {
      data.append('resume_file', formData.resumeFile, formData.resumeFile.name);
    }
    
    let isDataEmpty = true;
    for (const pair of data.entries()) {
      if (pair[0] !== 'resume_file') {
        isDataEmpty = false;
        break;
      }
    }
    
    if (isDataEmpty && !formData.resumeFile) {
      setIsSubmitting(false);
      setSubmissionMessage('No changes detected to update.');
      setIsEditing(false);
      return;
    }

    try {
      const response = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
        body: data,
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfileData(updatedProfile);
        setIsSubmitting(false);
        setSubmissionMessage('Profile updated successfully!');
        setIsEditing(false);
        setErrors({});
      } else {
        const errorData = await response.json();
        setIsSubmitting(false);
        let errorMessage = errorData.detail || 'Update failed due to server error.';
        
        if (errorData) {
          const backendErrors = {};
          for (const key in errorData) {
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
    } catch (err) {
      setIsSubmitting(false);
      setSubmissionMessage('Network error. Could not connect to the backend.');
      console.error("Network Fetch Error:", err);
    }
  };

  const handleDeleteProfile = () => {
    // Show the delete confirmation modal
    setShowDeleteModal(true);
  };

  const confirmDeleteProfile = async () => {
    // Close modal and proceed with deletion
    setShowDeleteModal(false);
    setIsSubmitting(true);
    setSubmissionMessage('Deleting profile...');
    
    const token = localStorage.getItem('accessToken');
    const deleteUrl = `${BASE_API_URL}${profileId}/`;
    
    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });

      // DELETE typically returns 204 No Content or 200 OK
      if (response.ok) {
        // 204 No Content - successful deletion with no response body
        if (response.status === 204) {
          setSubmissionMessage('Profile deleted successfully! Redirecting...');
          setIsSubmitting(false);
          
          // Clear user data and redirect to login
          localStorage.removeItem('accessToken');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } 
        // 200 OK - successful deletion with response body
        else if (response.status === 200) {
          try {
            const data = await response.json();
            setSubmissionMessage(data.message || 'Profile deleted successfully! Redirecting...');
          } catch {
            setSubmissionMessage('Profile deleted successfully! Redirecting...');
          }
          setIsSubmitting(false);
          
          // Clear user data and redirect to login
          localStorage.removeItem('accessToken');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } else {
        // Handle error responses
        setIsSubmitting(false);
        try {
          const errorData = await response.json();
          const errorMessage = errorData.detail || errorData.message || 'Failed to delete profile.';
          setSubmissionMessage(errorMessage);
          console.error("Delete API Error:", errorData);
        } catch {
          setSubmissionMessage('Failed to delete profile. Please try again.');
        }
      }
    } catch (err) {
      setIsSubmitting(false);
      setSubmissionMessage('Network error. Could not connect to the backend.');
      console.error("Network Fetch Error:", err);
    }
  };
const handleUpgradeProfile = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!paymentData.username || !paymentData.password) {
      alert('Please fill in all fields');
      return;
    }

    // Here you would typically make an API call to process the payment
    // For now, we'll just show a success message
    try {
      setIsSubmitting(true);
      setSubmissionMessage('Processing payment...');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmissionMessage('Payment successful! Your profile has been upgraded.');
      setShowPaymentModal(false);
      setPaymentData({ username: '', password: '' });
      setIsSubmitting(false);
    } catch (err) {
      setSubmissionMessage('Payment failed. Please try again.');
      setIsSubmitting(false);
    }
  };
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: paleBackground }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ color: primaryColor }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: paleBackground }}>
        <div className="alert alert-danger p-4 shadow-lg rounded-3">
          <h4 className="alert-heading">Access Issue</h4>
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
  const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();

  return (
    <>
      <style>{styles}</style>
      <div className="admin-container">
        {/* Messages */}
        {submissionMessage && (
          <div className={`alert ${isSubmitting ? 'alert-info' : errors && Object.keys(errors).length > 0 ? 'alert-danger' : 'alert-success'} text-center mb-4 toast-alert shadow-sm position-fixed`}>
            {submissionMessage}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="position-fixed top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
            <div className="position-absolute top-50 start-50 translate-middle bg-white rounded-3 shadow-lg p-4" style={{ maxWidth: '500px', width: '90%' }}>
              <div className="text-center">
                <div className="mb-3">
                  <Delete width={48} height={48} style={{ color: '#DC2626' }} />
                </div>
                <h4 className="fw-bold mb-3" style={{ color: '#1F2937' }}>Delete Profile</h4>
                <p className="text-muted mb-4">
                  Are you sure you want to delete your profile? This action cannot be undone.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="btn btn-secondary px-4 py-2 fw-semibold"
                    style={{ minWidth: '100px' }}
                  >
                    No
                  </button>
                  <button
                    onClick={confirmDeleteProfile}
                    className="btn btn-danger px-4 py-2 fw-semibold"
                    style={{ minWidth: '100px' }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="position-fixed top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
            <div className="position-absolute top-50 start-50 translate-middle bg-white rounded-3 shadow-lg p-4" style={{ maxWidth: '500px', width: '90%' }}>
              <div>
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <Upgrade width={48} height={48} style={{ color: primaryColor }} />
                  </div>
                  <h4 className="fw-bold mb-2" style={{ color: '#1F2937' }}>Payment Mode</h4>
                  <p className="text-muted mb-0">Upgrade your profile for ₹499</p>
                </div>
                
                <form onSubmit={handlePaymentSubmit}>
                  <div className="mb-3">
                    <label htmlFor="payment-username" className="form-label fw-semibold">
                      Username <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <User width={20} height={20} style={{ color: primaryColor }} />
                      </span>
                      <input
                        type="text"
                        id="payment-username"
                        name="username"
                        value={paymentData.username}
                        onChange={handlePaymentChange}
                        className="form-control form-control-lg"
                        placeholder="Enter your username"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="payment-password" className="form-label fw-semibold">
                      Password <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: primaryColor }}>
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </span>
                      <input
                        type="password"
                        id="payment-password"
                        name="password"
                        value={paymentData.password}
                        onChange={handlePaymentChange}
                        className="form-control form-control-lg"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-light rounded-3 p-3 mb-4 text-center">
                    <p className="mb-1 text-muted small">Total Amount</p>
                    <h3 className="fw-bold mb-0" style={{ color: primaryColor }}>₹499</h3>
                  </div>

                  <div className="d-flex gap-3 justify-content-center">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPaymentModal(false);
                        setPaymentData({ username: '', password: '' });
                      }}
                      className="btn btn-secondary px-4 py-2 fw-semibold"
                      style={{ minWidth: '120px' }}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn px-4 py-2 fw-semibold text-white"
                      style={{ minWidth: '120px', backgroundColor: primaryColor, border: 'none' }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : 'Proceed to Pay'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* Sidebar with full name + actions */}
        <div>
          <AdminSidebar
            fullName={fullName}
            onLogout={handleLogout}
            onInterestForm={handleInterestForm}
            onToggleEdit={handleToggleEdit}
            isEditing={isEditing}
            onDeleteProfile={handleDeleteProfile}
            onUpgradeProfile={handleUpgradeProfile}
          />
        </div>

        {/* Main content */}
        <main className="admin-main-content">
          <div className="admin-content-wrapper">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 col-xl-10">
                  {/* Header - only title now */}
                  <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                    <h2 className="fw-bold mb-0" style={{ color: primaryColor }}>
                      {isEditing ? 'Edit Candidate Profile' : 'Candidate Profile'}
                    </h2>
                  </div>

                  {/* Profile summary */}
                  <div className="text-center mb-4">
                    <div 
                      className="mx-auto rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                      style={{ width: '100px', height: '100px', backgroundColor: primaryColor + '33' }}
                    >
                      <User className="w-10 h-10" style={{ color: primaryColor }} />
                    </div>
                    <h3 className="mt-3 fw-bold text-dark">
                      {fullName || 'Candidate'}
                    </h3>
                    <p className="text-muted mb-1">Profile ID: {profile.id}</p>
                    <p className="text-muted small">
                      {profile.degree} • {profile.major} • {profile.university}
                    </p>
                    <p className="text-muted small">
  Assigned Recruiter: { 'Not assigned yet'}
</p>

                  </div>



                  {/* Form / View */}
                  <form onSubmit={handleUpdateProfile} noValidate>
                    <div className="row g-4">
                      {isEditing ? (
                        <>
                          <div className="col-md-6">
                            <TextInput
                              label="First Name"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleEditChange}
                              error={errors.firstName}
                              icon={User}
                              required
                              maxLength={50}
                              placeholder="First Name"
                            />
                          </div>
                          <div className="col-md-6">
                            <TextInput
                              label="Last Name"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleEditChange}
                              error={errors.lastName}
                              icon={User}
                              required
                              maxLength={50}
                              placeholder="Last Name"
                            />
                          </div>
                          <div className="col-md-6">
                            <TextInput
                              label="Email Address"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleEditChange}
                              error={errors.email}
                              icon={Mail}
                              required
                              placeholder="you@example.com"
                            />
                          </div>
                          <div className="col-md-6">
                            <TextInput
                              label="Phone (10 Digits)"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleEditChange}
                              error={errors.phone}
                              icon={Phone}
                              required
                              maxLength={10}
                              placeholder="0000000000"
                            />
                          </div>
                          <div className="col-md-6">
                            <TextInput
                              label="University"
                              name="university"
                              value={formData.university}
                              onChange={handleEditChange}
                              error={errors.university}
                              icon={GraduationCap}
                              maxLength={100}
                              placeholder="University Name"
                            />
                          </div>
                          <div className="col-md-6">
                            <TextInput
                              label="Major"
                              name="major"
                              value={formData.major}
                              onChange={handleEditChange}
                              error={errors.major}
                              icon={GraduationCap}
                              maxLength={100}
                              placeholder="Major"
                            />
                          </div>
                          <div className="col-md-6">
                            <TextInput
                              label="Degree"
                              name="degree"
                              value={formData.degree}
                              onChange={handleEditChange}
                              error={errors.degree}
                              icon={GraduationCap}
                              options={degreeOptions}
                              placeholder="Select Degree"
                            />
                          </div>
                          <div className="col-md-6">
                            <TextInput
                              label="Graduation (MM/YYYY)"
                              name="graduationDate"
                              type="date"
                              value={formData.graduationDate}
                              onChange={handleEditChange}
                              error={errors.graduationDate}
                              icon={Calendar}
                              placeholder="MM/YYYY"
                            />
                          </div>
                          <div className="col-md-6">
                            <TextInput
                              label="Visa Status"
                              name="visaStatus"
                              value={formData.visaStatus}
                              onChange={handleEditChange}
                              error={errors.visaStatus}
                              icon={GraduationCap}
                              options={visaOptions}
                              placeholder="Select Status"
                            />
                          </div>
                          {formData.visaStatus === 'F1-OPT' && (
                            <div className="col-md-6">
                              <TextInput
                                label="OPT End Date (MM/YYYY)"
                                name="optEndDate"
                                type="date"
                                value={formData.optEndDate}
                                onChange={handleEditChange}
                                error={errors.optEndDate}
                                icon={Calendar}
                                required
                                placeholder="MM/YYYY"
                              />
                            </div>
                          )}
                          <div className="col-12">
                            <TextInput
                              label="Additional Notes"
                              name="additionalNotes"
                              value={formData.additionalNotes}
                              onChange={handleEditChange}
                              error={errors.additionalNotes}
                              isTextArea
                              maxLength={500}
                              placeholder="Enter any additional notes..."
                            />
                          </div>
                          <div className="col-md-6">
                            <TextInput
                              label="LinkedIn URL"
                              name="linkedinUrl"
                              type="url"
                              value={formData.linkedinUrl}
                              onChange={handleEditChange}
                              error={errors.linkedinUrl}
                              icon={LinkIcon}
                              maxLength={255}
                              placeholder="https://linkedin.com/..."
                            />
                          </div>
                          <div className="col-md-6">
                            <TextInput
                              label="GitHub URL"
                              name="githubUrl"
                              type="url"
                              value={formData.githubUrl}
                              onChange={handleEditChange}
                              error={errors.githubUrl}
                              icon={GitBranch}
                              maxLength={255}
                              placeholder="https://github.com/..."
                            />
                          </div>

                          {/* Resume upload */}
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
                                  <p className="text-success mt-2 mb-0 fw-semibold">
                                    Selected: {formData.resumeFile.name}
                                  </p>
                                ) : profile.resume_file && (
                                  <p className="text-muted mt-2 mb-0 fw-semibold">
                                    Current: <a href={profile.resume_file} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor }}>View File</a>
                                  </p>
                                )}
                              </div>
                              {errors.resumeFile && <div className="invalid-feedback d-block">{errors.resumeFile}</div>}
                            </div>
                          </div>

                          <div className="col-12 mt-3">
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
                          <div className="col-md-6">
                            <ProfileField icon={User} label="Full Name" value={fullName} />
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

                          <div className="col-12 mt-4 pt-3 border-top">
                            <h4 className="fw-semibold text-dark">Additional Information</h4>
                            <div className="row mt-3">
                              <div className="col-md-6 mb-3 mb-md-0">
                                <p className="text-muted mb-1 small fw-semibold">Resume File</p>
                                {profile.resume_file ? (
                                  <a
                                    href={profile.resume_file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-sm"
                                    style={{backgroundColor: primaryColor + '1A', color: primaryColor}}
                                  >
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
        </main>
      </div>
    </>
  );
};

export default Profile;
