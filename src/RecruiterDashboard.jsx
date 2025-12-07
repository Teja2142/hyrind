import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================
// SVG ICONS
// ============================================
const LogOut = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const User = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Users = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Mail = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const Phone = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Edit = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const Save = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const Briefcase = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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

const Search = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ChevronLeft = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ============================================
// STYLES
// ============================================
const styles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  padding: 2rem;
  min-height: calc(100vh - 64px);
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

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border-radius: 0.5rem;
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
}

.sidebar-button-active {
  background-color: #3730a3;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  color: white;
}

.sidebar-button-inactive {
  color: #c7d2fe;
  background: none;
}

.sidebar-button-inactive:hover {
  background-color: #3730a3;
}

.sidebar-button-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
}

.toast-alert {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 2000;
  min-width: 280px;
  max-width: 460px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  animation: fadeSlideIn 0.35s ease-out forwards;
  text-align: center;
}

.search-box {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  max-width: 400px;
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.875rem;
  margin-left: 0.5rem;
  flex: 1;
}

.candidates-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.candidates-table thead {
  background-color: #f9fafb;
}

.candidates-table th,
.candidates-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.candidates-table th {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  font-weight: 600;
}

.candidates-table tbody tr:hover {
  background-color: #f3f4f6;
}

.pagination-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f9fafb;
  font-size: 0.875rem;
  border-top: 1px solid #e5e7eb;
}

.pagination-buttons {
  display: flex;
  gap: 0.5rem;
}

.pagination-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: white;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
  transition: all 0.2s;
}

.pagination-button:hover:not(:disabled) {
  background-color: #f3f4f6;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

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

@media (max-width: 576px) {
  .toast-alert {
    top: calc(60px + env(safe-area-inset-top, 0));
    right: 10px;
    left: 10px;
    min-width: auto;
    max-width: 100%;
    font-size: 0.9rem;
  }
}
`;

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Text Input Component
const TextInput = ({ label, name, type = 'text', value, onChange, error, icon: Icon, required = false, placeholder, maxLength, readOnly = false }) => {
  const primaryColor = '#4F46E5';
  
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fw-semibold text-dark">
        {label} {required && <span style={{ color: '#DC2626' }}>*</span>}
      </label>
      <div className={`${error ? 'border-danger bg-danger bg-opacity-10' : ''} rounded-3`}>
        <div className="d-flex align-items-center">
          {Icon && (
            <div className="p-2 rounded-2 me-2" style={{ backgroundColor: primaryColor + '1A' }}>
              <Icon className="h-5 w-5" style={{ color: primaryColor }} />
            </div>
          )}
          <div className="flex-grow-1">
            <input
              type={type}
              id={name}
              name={name}
              value={value || ''}
              onChange={onChange}
              className={`form-control ${error ? 'is-invalid' : ''}`}
              placeholder={placeholder}
              maxLength={maxLength}
              readOnly={readOnly}
            />
          </div>
        </div>
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

// Profile Field Component (View Mode)
const ProfileField = ({ icon: Icon, label, value }) => {
  const primaryColor = '#4F46E5';
  
  return (
    <div className="mb-3 p-3 border rounded-3" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="d-flex align-items-center mb-2">
        {Icon && <Icon className="me-2" style={{ color: primaryColor }} width={20} height={20} />}
        <span className="text-muted small fw-semibold">{label}</span>
      </div>
      <p className="mb-0 fw-semibold text-dark">{value || 'N/A'}</p>
    </div>
  );
};

// Sidebar Button Component
const SidebarButton = ({ Icon, label, onClick, variant = 'normal', isEditing, isActive }) => {
  const className = variant === 'primary' 
    ? 'sidebar-button sidebar-button-active' 
    : isActive 
      ? 'sidebar-button sidebar-button-active'
      : 'sidebar-button sidebar-button-inactive';

  return (
    <button type="button" onClick={onClick} className={className}>
      <Icon className="sidebar-button-icon" />
      {variant === 'primary' && typeof isEditing === 'boolean' ? (isEditing ? 'Cancel Edit' : label) : label}
    </button>
  );
};

// Sidebar Component
const AdminSidebar = ({ fullName, onLogout, onToggleEdit, isEditing, onDeleteProfile, activeView, setActiveView }) => {
  const displayName = fullName && fullName.trim().length > 0 ? fullName : 'Recruiter Profile';

  return (
    <div className="admin-sidebar">
      <div className="admin-profile-card">
        <div className="admin-profile-image d-flex align-items-center justify-content-center" style={{ backgroundColor: '#4F46E533' }}>
          <User width={40} height={40} />
        </div>
        <h3 className="admin-profile-name">{displayName}</h3>
        <p className="admin-profile-welcome">Manage your HYRIND recruiter profile.</p>
      </div>

      <nav className="sidebar-nav">
        <SidebarButton 
          Icon={User} 
          label="My Profile" 
          onClick={() => setActiveView('profile')} 
          variant={activeView === 'profile' ? 'primary' : 'normal'}
          isActive={activeView === 'profile'}
        />
        <SidebarButton 
          Icon={Users} 
          label="Candidates" 
          onClick={() => setActiveView('candidates')} 
          variant="normal"
          isActive={activeView === 'candidates'}
        />
        <SidebarButton Icon={Delete} label="Delete Profile" onClick={onDeleteProfile} variant="normal" />
        <SidebarButton Icon={LogOut} label="Logout" onClick={onLogout} variant="normal" />
      </nav>
    </div>
  );
};

// Candidates Table Component
const CandidatesTable = ({ candidates, page, setPage, pageSize = 10 }) => {
  const total = candidates.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const pageSlice = candidates.slice(startIndex, endIndex);

  return (
    <>
      <div className="border rounded-3 overflow-hidden">
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>University</th>
              <th>Major</th>
              <th>Visa Status</th>
            </tr>
          </thead>
          <tbody>
            {pageSlice.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  No candidates assigned yet.
                </td>
              </tr>
            ) : (
              pageSlice.map((candidate) => (
                <tr key={candidate.id}>
                  <td className="fw-semibold">{candidate.first_name} {candidate.last_name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.phone}</td>
                  <td>{candidate.university || 'N/A'}</td>
                  <td>{candidate.major || 'N/A'}</td>
                  <td>{candidate.visa_status || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination-row">
          <span>
            Showing {total === 0 ? 0 : startIndex + 1}–{endIndex} of {total} candidates
          </span>
          <div className="pagination-buttons">
            <button
              className="pagination-button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
            >
              <ChevronLeft size={16} className="me-1" />
              Previous
            </button>
            <button
              className="pagination-button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
            >
              Next
              <ChevronRight size={16} className="ms-1" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const primaryColor = '#4F46E5';
  const BASE_API_URL = "http://127.0.0.1:8000/api/recruiters/";
  const CANDIDATES_API_URL = "http://127.0.0.1:8000/api/users/profiles/";

  // State Management
  const [activeView, setActiveView] = useState('profile'); // 'profile' or 'candidates'
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
  
  // Candidates state
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [candidatesLoading, setCandidatesLoading] = useState(false);

  // ============================================
  // VALIDATION
  // ============================================
  const validate = (data) => {
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!data.name || data.name.trim() === '') newErrors.name = 'Name is required.';
    if (!data.email || data.email.trim() === '') newErrors.email = 'Email is required.';
    if (!data.phone || data.phone.trim() === '') newErrors.phone = 'Phone is required.';

    if (data.email && !emailRegex.test(data.email)) newErrors.email = 'Invalid email format.';

    const phoneDigits = (data.phone || '').replace(/[^\d]/g, '');
    if (data.phone && phoneDigits.length !== 10) newErrors.phone = 'Phone must be 10 digits.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============================================
  // FETCH PROFILE ON MOUNT
  // ============================================
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setError("You are not logged in. Redirecting to login...");
        setLoading(false);
        setTimeout(() => navigate('/recruiter-login'), 2000);
        return;
      }

      try {
        const response = await fetch(BASE_API_URL, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to load profiles");

        const profiles = await response.json();
        const profile = profiles[0];

        if (!profile) {
          setError("Profile not found.");
          return;
        }

        setProfileData(profile);
        setProfileId(profile.id);
        setFormData({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          active: profile.active,
          totalAssignments: profile.total_assignments,
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

  // ============================================
  // FETCH CANDIDATES
  // ============================================
  useEffect(() => {
    const fetchCandidates = async () => {
      if (activeView !== 'candidates') return;
      
      setCandidatesLoading(true);
      const token = localStorage.getItem('accessToken');

      try {
        const response = await fetch(CANDIDATES_API_URL, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to load candidates");

        const data = await response.json();
        setCandidates(data);
        setFilteredCandidates(data);
      } catch (err) {
        console.error("Fetch Candidates Error:", err);
        setCandidates([]);
        setFilteredCandidates([]);
      } finally {
        setCandidatesLoading(false);
      }
    };

    fetchCandidates();
  }, [activeView, CANDIDATES_API_URL]);

  // ============================================
  // SEARCH FILTER
  // ============================================
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCandidates(candidates);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = candidates.filter(
        (c) =>
          (c.first_name && c.first_name.toLowerCase().includes(query)) ||
          (c.last_name && c.last_name.toLowerCase().includes(query)) ||
          (c.email && c.email.toLowerCase().includes(query)) ||
          (c.major && c.major.toLowerCase().includes(query)) ||
          (c.university && c.university.toLowerCase().includes(query))
      );
      setFilteredCandidates(filtered);
    }
    setPage(1); // Reset to first page on search
  }, [searchQuery, candidates]);

  // ============================================
  // AUTO-DISMISS TOAST MESSAGE
  // ============================================
  useEffect(() => {
    if (submissionMessage) {
      const timer = setTimeout(() => setSubmissionMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [submissionMessage]);

  // ============================================
  // EVENT HANDLERS
  // ============================================
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/recruiter-login');
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (type === 'checkbox') {
      newValue = checked;
    } else if (name === 'phone') {
      newValue = value.replace(/[^\d]/g, '').substring(0, 10);
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setSubmissionMessage('');
  };

  const handleToggleEdit = () => {
    if (!isEditing && profileData) {
      setFormData({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        active: profileData.active,
        totalAssignments: profileData.total_assignments,
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
      name: 'name',
      email: 'email',
      phone: 'phone',
      active: 'active',
    };

    for (const [stateKey, apiKey] of Object.entries(fieldMap)) {
      let value = formData[stateKey];

      if (stateKey === 'phone') {
        value = (value || '').replace(/[^\d]/g, '');
      }
      if (typeof value === 'boolean') {
        value = value ? 'true' : 'false';
      }

      const originalValue = profileData[apiKey];
      if (value !== null && value !== undefined && value !== '' && value !== originalValue) {
        data.append(apiKey, value);
      }
    }

    let hasChanges = false;
    for (const pair of data.entries()) {
      hasChanges = true;
      break;
    }

    if (!hasChanges) {
      setIsSubmitting(false);
      setSubmissionMessage('No changes detected to update.');
      setIsEditing(false);
      return;
    }

    try {
      const response = await fetch(updateUrl, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
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
        
        const backendErrors = {};
        for (const key in errorData) {
          if (key !== 'detail') {
            backendErrors[key] = Array.isArray(errorData[key]) ? errorData[key].join(', ') : errorData[key];
          }
        }
        setErrors(prev => ({ ...prev, ...backendErrors }));
        setSubmissionMessage(errorData.detail || 'Update failed. Please review the errors.');
        console.error("API Error:", errorData);
      }
    } catch (err) {
      setIsSubmitting(false);
      setSubmissionMessage('Network error. Could not connect to the backend.');
      console.error("Network Fetch Error:", err);
    }
  };

  const handleDeleteProfile = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteProfile = async () => {
    setShowDeleteModal(false);
    setIsSubmitting(true);
    setSubmissionMessage('Deleting profile...');

    const token = localStorage.getItem('accessToken');
    const deleteUrl = `${BASE_API_URL}${profileId}/`;

    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setSubmissionMessage('Profile deleted successfully! Redirecting...');
        setIsSubmitting(false);
        localStorage.removeItem('accessToken');
        setTimeout(() => navigate('/recruiter-login'), 2000);
      } else {
        setIsSubmitting(false);
        try {
          const errorData = await response.json();
          setSubmissionMessage(errorData.detail || errorData.message || 'Failed to delete profile.');
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

  // ============================================
  // LOADING STATE
  // ============================================
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#F0F8FF' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ color: primaryColor }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading profile data...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // ERROR STATE
  // ============================================
  if (error || !profileData) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#F0F8FF' }}>
        <div className="alert alert-danger p-4 shadow-lg rounded-3">
          <h4 className="alert-heading">Access Issue</h4>
          <p>{error || "Could not load profile data."}</p>
          <button onClick={handleLogout} className="btn btn-sm btn-outline-danger mt-2">
            <LogOut className="w-4 h-4 me-1" /> Go to Login
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // MAIN RENDER
  // ============================================
  const profile = profileData;
  const fullName = profile.name || 'Recruiter';

  return (
    <>
      <style>{styles}</style>
      <div className="admin-container">
        
        {/* Toast Notification */}
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
                <p className="text-muted mb-4">Are you sure you want to delete your profile? This action cannot be undone.</p>
                <div className="d-flex gap-3 justify-content-center">
                  <button onClick={() => setShowDeleteModal(false)} className="btn btn-secondary px-4 py-2 fw-semibold" style={{ minWidth: '100px' }}>
                    No
                  </button>
                  <button onClick={confirmDeleteProfile} className="btn btn-danger px-4 py-2 fw-semibold" style={{ minWidth: '100px' }}>
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <div>
          <AdminSidebar
            fullName={fullName}
            onLogout={handleLogout}
            onToggleEdit={handleToggleEdit}
            isEditing={isEditing}
            onDeleteProfile={handleDeleteProfile}
            activeView={activeView}
            setActiveView={setActiveView}
          />
        </div>

        {/* Main Content */}
        <main className="admin-main-content">
          <div className="admin-content-wrapper">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 col-xl-10">
                  
                  {activeView === 'profile' ? (
                    <>
                      {/* PROFILE VIEW */}
                      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                        <h2 className="fw-bold mb-0" style={{ color: primaryColor }}>
                          {isEditing ? 'Edit Recruiter Profile' : 'Recruiter Profile'}
                        </h2>
                      </div>

                      <div className="text-center mb-4">
                        <div className="mx-auto rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '100px', height: '100px', backgroundColor: primaryColor + '33' }}>
                          <User className="w-10 h-10" style={{ color: primaryColor }} />
                        </div>
                        <h3 className="mt-3 fw-bold text-dark">{fullName}</h3>
                        <p className="text-muted mb-1">Profile ID: {profile.id}</p>
                        <p className="text-muted small">
                          Status: {profile.active ? '✓ Active' : '✗ Inactive'} • Total Assignments: {profile.total_assignments || 0}
                        </p>
                      </div>

                      <form onSubmit={handleUpdateProfile} noValidate>
                        <div className="row g-4">
                          {isEditing ? (
                            <>
                              <div className="col-md-12">
                                <TextInput label="Name" name="name" value={formData.name} onChange={handleEditChange} error={errors.name} icon={User} required maxLength={100} placeholder="Full Name" />
                              </div>
                              <div className="col-md-6">
                                <TextInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleEditChange} error={errors.email} icon={Mail} required placeholder="you@example.com" />
                              </div>
                              <div className="col-md-6">
                                <TextInput label="Phone (10 Digits)" name="phone" type="tel" value={formData.phone} onChange={handleEditChange} error={errors.phone} icon={Phone} required maxLength={10} placeholder="0000000000" />
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label className="form-label fw-semibold text-dark">Status</label>
                                  <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="active" name="active" checked={formData.active || false} onChange={handleEditChange} />
                                    <label className="form-check-label" htmlFor="active">{formData.active ? 'Active' : 'Inactive'}</label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <TextInput label="Total Assignments" name="totalAssignments" type="number" value={formData.totalAssignments} onChange={handleEditChange} icon={Briefcase} readOnly placeholder="0" />
                              </div>
                              <div className="col-12 mt-3">
                                <button type="submit" disabled={isSubmitting} className="btn btn-lg w-100 py-3 fw-bold rounded-pill" style={{ backgroundColor: '#10B981', borderColor: '#10B981', color: 'white' }}>
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
                              <div className="col-md-12">
                                <ProfileField icon={User} label="Name" value={profile.name} />
                              </div>
                              <div className="col-md-6">
                                <ProfileField icon={Mail} label="Email" value={profile.email} />
                              </div>
                              <div className="col-md-6">
                                <ProfileField icon={Phone} label="Phone" value={profile.phone} />
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3 p-3 border rounded-3" style={{ backgroundColor: '#F9FAFB' }}>
                                  <div className="d-flex align-items-center mb-2">
                                    <span className="me-2" style={{ fontSize: '20px' }}>●</span>
                                    <span className="text-muted small fw-semibold">Status</span>
                                  </div>
                                  <p className="mb-0 fw-semibold" style={{ color: profile.active ? '#10B981' : '#DC2626' }}>
                                    {profile.active ? '✓ Active' : '✗ Inactive'}
                                  </p>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <ProfileField icon={Briefcase} label="Total Assignments" value={profile.total_assignments || 0} />
                              </div>
                            </>
                          )}
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      {/* CANDIDATES VIEW */}
                      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                        <div>
                          <h2 className="fw-bold mb-0" style={{ color: primaryColor }}>Assigned Candidates</h2>
                          <p className="text-muted small mb-0 mt-1">View and manage your assigned candidates</p>
                        </div>
                      </div>

                      {/* Search Box */}
                      <div className="mb-4">
                        <div className="search-box">
                          <Search size={18} style={{ color: '#6B7280' }} />
                          <input
                            className="search-input"
                            placeholder="Search by name, email, major, or university..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Candidates Table */}
                      {candidatesLoading ? (
                        <div className="text-center py-5">
                          <div className="spinner-border text-primary" role="status" style={{ color: primaryColor }}>
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <p className="mt-3 text-muted">Loading candidates...</p>
                        </div>
                      ) : (
                        <CandidatesTable 
                          candidates={filteredCandidates} 
                          page={page} 
                          setPage={setPage}
                          pageSize={10}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RecruiterDashboard;