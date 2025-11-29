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

// --- END: Inline SVG Icon Definitions ---

// Helper component for displaying profile field data
const ProfileField = ({ icon: Icon, label, value }) => (
    <div className="d-flex align-items-center mb-3">
        <div className="p-2 me-3 rounded-circle" style={{ backgroundColor: '#4682B41A' }}>
            <Icon className="w-5 h-5 text-secondary" style={{ color: '#4682B4' }} />
        </div>
        <div>
            <p className="text-muted mb-0 small fw-semibold">{label}</p>
            <p className="fw-bold mb-0 text-dark">{value || 'N/A'}</p>
        </div>
    </div>
);

// Main Profile Component
const Profile = () => {
  const navigate = useNavigate();
  const primaryColor = '#4682B4'; // Steel Blue
  const paleBackground = '#F0F8FF'; // Alice Blue
  
  // API URL for fetching profile data
  const PROFILE_API_URL = "http://127.0.0.1:8000/api/users/profiles/"; 

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check for token and fetch data on mount
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
        const response = await fetch(PROFILE_API_URL, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            // --- AUTHORIZATION HEADER USING BEARER TOKEN ---
            'Authorization': `Bearer ${token}`, 
            // Note: X-CSRFTOKEN is typically not needed for GET requests with Bearer tokens
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          // Assuming the API returns an array, and we need the first item (the user's profile)
          if (Array.isArray(data) && data.length > 0) {
            setProfileData(data[0]);
          } else {
            setError("Profile data is empty or malformed.");
          }
        } else {
          // Handle 401 Unauthorized, 403 Forbidden etc.
          const errorData = await response.json();
          const message = errorData.detail || "Failed to fetch profile. Your session may have expired.";
          setError(message);
          
          // Clear token and redirect if unauthorized
          if (response.status === 401 || response.status === 403) {
            handleLogout();
          }
        }
      } catch (err) {
        setError(`Network error: Could not connect to the profile service.`);
        console.error("Fetch Profile Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
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

  if (error) {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: paleBackground }}>
            <div className="alert alert-danger p-4 shadow-lg rounded-3">
                <h4 className="alert-heading">Access Denied!</h4>
                <p>{error}</p>
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
  if (!profile) return null; // Should be caught by error state, but safety first

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-4" style={{ backgroundColor: paleBackground }}>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                
                {/* Header and Logout */}
                <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-3">
                  <h2 className="card-title fw-bold" style={{ color: primaryColor }}>
                    User Profile
                  </h2>
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-sm btn-outline-danger"
                  >
                    <LogOut className="w-4 h-4 me-1" /> Logout
                  </button>
                </div>
                
                {/* Profile Photo Placeholder (optional, added for visual appeal) */}
                <div className="text-center mb-5">
                    <div 
                        className="mx-auto rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                        style={{ width: '100px', height: '100px', backgroundColor: primaryColor + '33' }}
                    >
                        <User className="w-10 h-10" style={{ color: primaryColor }} />
                    </div>
                    <h3 className="mt-3 fw-bold text-dark">{profile.first_name} {profile.last_name}</h3>
                    <p className="text-muted">{profile.email}</p>
                </div>

                {/* Profile Details Grid */}
                <div className="row g-4">
                    <div className="col-md-6">
                        <ProfileField 
                            icon={User} 
                            label="Full Name" 
                            value={`${profile.first_name} ${profile.last_name}`} 
                        />
                    </div>
                    <div className="col-md-6">
                        <ProfileField 
                            icon={Mail} 
                            label="Email" 
                            value={profile.email} 
                        />
                    </div>
                    <div className="col-md-6">
                        <ProfileField 
                            icon={Phone} 
                            label="Phone" 
                            value={profile.phone} 
                        />
                    </div>
                    <div className="col-md-6">
                        <ProfileField 
                            icon={GraduationCap} 
                            label="University" 
                            value={profile.university} 
                        />
                    </div>
                    <div className="col-md-6">
                        <ProfileField 
                            icon={GraduationCap} 
                            label="Degree" 
                            value={`${profile.degree} in ${profile.major}`} 
                        />
                    </div>
                    <div className="col-md-6">
                        <ProfileField 
                            icon={GraduationCap} 
                            label="Visa Status" 
                            value={profile.visa_status} 
                        />
                    </div>
                    <div className="col-md-6">
                        <ProfileField 
                            icon={LinkIcon} 
                            label="LinkedIn" 
                            value={profile.linkedin_url ? 
                                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" style={{color: primaryColor}}>View Profile</a> 
                                : 'N/A'
                            } 
                        />
                    </div>
                    <div className="col-md-6">
                        <ProfileField 
                            icon={GitBranch} 
                            label="GitHub" 
                            value={profile.github_url ? 
                                <a href={profile.github_url} target="_blank" rel="noopener noreferrer" style={{color: primaryColor}}>View Profile</a> 
                                : 'N/A'
                            } 
                        />
                    </div>
                </div>

                {/* Resume and Notes */}
                <div className="mt-4 pt-4 border-top">
                    <h4 className="fw-semibold text-dark">Additional Information</h4>
                    <div className="row mt-3">
                        <div className="col-md-6">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;