import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, CheckCircle, XCircle, UserPlus, Zap, Loader, AlertTriangle, RefreshCw, LogOut } from 'lucide-react';

// --- HELPER FUNCTIONS ---
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

// --- API CONFIGURATION ---
// NOTE: Replace these placeholder values with actual dynamic values in a real application.
const API_BASE_URL = 'http://127.0.0.1:8000/api';
const PLACEHOLDER_AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0ODY1NjEwLCJpYXQiOjE3NjQ4NjM4MTAsImp0aSI6ImRlMGJjNGQzZWM5NTQxNGI4NTZmNThiMTJkOTlhZGRiIiwidXNlcl9pZCI6IjEwIn0.SLlu_vFK7mmm96LUCaqEnuF948Edspxjy3GLA97oJoM';
const PLACEHOLDER_CSRF_TOKEN = 'eL0NJos1AcwHGVv9rppEKP75j7QyYFECQFsxIPspyVzBRG66AcYhshJ7Cfq2Cc4T';

const API_HEADERS = {
  'accept': 'application/json',
  'Authorization': `Bearer ${PLACEHOLDER_AUTH_TOKEN}`,
  'X-CSRFTOKEN': PLACEHOLDER_CSRF_TOKEN,
  'Content-Type': 'application/json',
};

// --- DUMMY DATA (Only used for structure/initial state until real data loads) ---
const adminUser = {
  name: 'RaviTeja (Admin)',
  image: 'https://placehold.co/100x100/4F46E5/ffffff?text=AD',
};

// Simplified Recruiter structure based on User object
// In a real app, you would fetch recruiter-specific data.
const initialRecruiters = [];
const initialCandidates = [];

// --- STYLES (Tailwind classes will be used, but keeping custom CSS for structure) ---
const styles = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; background-color: #f3f4f6; }
.admin-container { min-height: 100vh; background-color: #f3f4f6; display: flex; flex-direction: column; }
.admin-main-content { flex: 1; padding: 0; overflow-y: auto; }
.admin-content-wrapper { background-color: white; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); min-height: calc(100vh - 64px); }
.admin-sidebar { display: flex; flex-direction: column; width: 100%; height: 100%; padding: 1rem; background-color: #4f46e5; color: white; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); gap: 2rem; }
.admin-profile-card { display: flex; flex-direction: column; align-items: center; padding: 1rem; border-bottom: 1px solid #4338ca; }
.admin-profile-image { width: 80px; height: 80px; border-radius: 50%; border: 4px solid #a5b4fc; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
.admin-profile-name { margin-top: 0.75rem; font-size: 1.25rem; font-weight: bold; color: white; }
.admin-profile-welcome { font-size: 0.875rem; color: #c7d2fe; }
.sidebar-nav { display: flex; flex-direction: column; gap: 0.75rem; }
.sidebar-button { display: flex; align-items: center; width: 100%; padding: 0.75rem; font-weight: 600; transition: all 0.2s ease; border-radius: 0.5rem; background: none; color: inherit; border: none; cursor: pointer; font-size: 0.875rem; }
.sidebar-button-active { background-color: #3730a3; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); color: white; }
.sidebar-button-inactive { color: #c7d2fe; background: none; }
.sidebar-button-inactive:hover { background-color: #3730a3; }
.sidebar-button-icon { width: 1.25rem; height: 1.25rem; margin-right: 0.75rem; }
.candidates-view, .recruiters-view { padding: 1.5rem; }
.candidates-title, .recruiters-title { font-size: 1.875rem; font-weight: 800; color: #374151; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e5e7eb; }
.metrics-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 2rem; }
.metric-card { padding: 1rem; border-radius: 0.75rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); display: flex; align-items: center; }
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 50; display: flex; align-items: center; justify-content: center; }
.modal-container { background-color: white; border-radius: 0.75rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); width: 100%; max-width: 32rem; padding: 1.5rem; margin: 1rem; transform: scale(1); transition: all 0.3s ease; }
@media (min-width: 768px) {
  .admin-container { flex-direction: row; }
  .admin-main-content { padding: 2rem; }
  .admin-content-wrapper { min-height: calc(100vh - 4rem); }
  .admin-sidebar { width: 256px; }
  .metrics-grid { grid-template-columns: repeat(3, 1fr); }
  .recruiters-grid { grid-template-columns: repeat(2, 1fr); }
}
`;

/**
 * Custom fetch function with retry logic
 * @param {string} url - The API endpoint URL
 * @param {object} options - Fetch options
 * @param {number} retries - Number of times to retry
 */
const fetchWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        // Throw an error if the response status is not OK (200-299)
        const errorBody = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Body: ${errorBody}`);
      }
      return response;
    } catch (error) {
      if (i === retries - 1) {
        // Last retry failed, throw the error
        console.error(`Fetch failed for ${url} after ${retries} attempts.`, error);
        throw error;
      }
      // Wait exponentially before retrying
      const delay = Math.pow(2, i) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};


// --- UTILITY COMPONENTS ---

const ActionButton = ({ Icon, label, onClick, variant = 'primary', disabled = false, size = 'sm' }) => {
  const variants = {
    approve: { bg: '#10B981', hoverBg: '#059669', color: '#FFFFFF' },
    reject: { bg: '#EF4444', hoverBg: '#DC2626', color: '#FFFFFF' },
    assign: { bg: '#3B82F6', hoverBg: '#2563EB', color: '#FFFFFF' },
    primary: { bg: '#4F46E5', hoverBg: '#4338CA', color: '#FFFFFF' },
    secondary: { bg: '#6B7280', hoverBg: '#4B5563', color: '#FFFFFF' },
  };

  const style = variants[variant] || variants.primary;
  const sizeClass = size === 'sm' ? 'px-3 py-1.5' : 'px-4 py-2';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${size} d-inline-flex align-items-center gap-1 fw-semibold`}
      style={{
        backgroundColor: style.bg,
        color: style.color,
        border: 'none',
        borderRadius: '6px',
        fontSize: size === 'sm' ? '0.875rem' : '1rem',
        transition: 'all 0.2s ease',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      onMouseOver={(e) => !disabled && (e.currentTarget.style.backgroundColor = style.hoverBg)}
      onMouseOut={(e) => !disabled && (e.currentTarget.style.backgroundColor = style.bg)}
    >
      {Icon && <Icon className="w-4 h-4" style={{ width: '16px', height: '16px' }} />}
      <span>{label}</span>
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button onClick={onClose} className="modal-close-button">
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- VIEWS & CONTENT ---

const AdminSidebar = ({ activeView, setActiveView, admin }) => (
  <div className="admin-sidebar">
    <div className="admin-profile-card">
      <img src={admin.image} alt="Admin" className="admin-profile-image" />
      <h3 className="admin-profile-name">{admin.name}</h3>
      <p className="admin-profile-welcome">Admin Panel</p>
    </div>

    <nav className="sidebar-nav">
      <SidebarButton
        Icon={Users}
        label="Candidates"
        isActive={activeView === 'candidates'}
        onClick={() => setActiveView('candidates')}
      />
      <SidebarButton
        Icon={Briefcase}
        label="Recruiters"
        isActive={activeView === 'recruiters'}
        onClick={() => setActiveView('recruiters')}
      />
    </nav>
  </div>
);

const SidebarButton = ({ Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`sidebar-button ${isActive ? 'sidebar-button-active' : 'sidebar-button-inactive'}`}
  >
    <Icon className="sidebar-button-icon" />
    {label}
  </button>
);

const MetricCard = ({ title, value, color, Icon }) => (
  <div className={`p-4 rounded-xl shadow-lg flex items-center ${color}`}>
    <Icon className="w-8 h-8 opacity-70 mr-4" />
    <div className="flex flex-col">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

const CandidatesView = ({ candidates, updateCandidateStatus, approvedCandidates, openAssignModal, recruiters, isLoading, error, refetchData }) => {
  const submittedCount = candidates.filter(c => c.status === 'submitted').length;
  const approvedCount = candidates.filter(c => c.status === 'approved').length;
  const readyToAssignCount = approvedCandidates.length;

  return (
    <div className="candidates-view">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#4F46E5', fontSize: '1.75rem' }}>
            Candidate Queue
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Total: {candidates.length} candidates</p>
        </div>
        <button 
          onClick={refetchData} 
          disabled={isLoading}
          className="btn btn-sm d-flex align-items-center gap-2 px-3 py-2 fw-semibold"
          style={{ 
            backgroundColor: '#4F46E5', 
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338CA'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4F46E5'}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      
      <div className="metrics-grid">
        <MetricCard title="Submitted (New)" value={submittedCount} color="bg-yellow-100 text-yellow-800" Icon={Zap} />
        <MetricCard title="Approved" value={approvedCount} color="bg-green-100 text-green-800" Icon={CheckCircle} />
        <MetricCard title="Ready to Assign" value={readyToAssignCount} color="bg-blue-100 text-blue-800" Icon={UserPlus} />
      </div>

      {isLoading && <div className="text-center p-4 text-indigo-600"><Loader className="w-6 h-6 inline-block animate-spin mr-2" /> Loading candidates...</div>}
      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Error loading data: {error}</div>}

      <div className="d-flex flex-column gap-3 mt-4">
        {candidates.length === 0 && !isLoading && !error && (
            <div className="text-center p-5 bg-light rounded-3 border border-2 border-dashed" style={{ borderColor: '#E5E7EB' }}>
              <Users className="w-12 h-12 mx-auto mb-3 opacity-25" style={{ color: '#6B7280' }} />
              <p className="text-muted mb-0 fw-semibold">No candidates found</p>
              <p className="text-muted small mb-0">Candidates will appear here once they register</p>
            </div>
        )}
        {candidates.map(candidate => (
          <CandidateCard 
            key={candidate.id} 
            candidate={candidate} 
            updateStatus={updateCandidateStatus} 
            openAssignModal={openAssignModal}
            recruiters={recruiters}
          />
        ))}
      </div>
    </div>
  );
};

const CandidateCard = ({ candidate, updateStatus, openAssignModal, recruiters }) => {
  const isSubmitted = candidate.status === 'submitted';
  const isApproved = candidate.status === 'approved';
  const recruiter = recruiters.find(r => r.id === candidate.recruiterId);
  
  const statusColors = {
    'submitted': { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' },
    'approved': { bg: '#D1FAE5', text: '#065F46', border: '#10B981' },
    'rejected': { bg: '#FEE2E2', text: '#991B1B', border: '#EF4444' },
    'default': { bg: '#F3F4F6', text: '#374151', border: '#9CA3AF' },
  };

  const statusStyle = statusColors[candidate.status] || statusColors.default;

  return (
    <div className="card border-0 shadow-sm hover-shadow-lg transition-all" style={{ borderLeft: `4px solid #4F46E5` }}>
      <div className="card-body p-4">
        <div className="row align-items-center">
          <div className="col-md-8 mb-3 mb-md-0">
            <div className="d-flex align-items-center mb-2">
              <h5 className="mb-0 fw-bold text-dark me-3">{candidate.email}</h5>
              {candidate.status && (
                <span 
                  className="badge px-3 py-1 fw-semibold text-uppercase" 
                  style={{ 
                    backgroundColor: statusStyle.bg, 
                    color: statusStyle.text,
                    fontSize: '0.7rem',
                    letterSpacing: '0.5px'
                  }}
                >
                  {candidate.status}
                </span>
              )}
            </div>
            <div className="d-flex flex-wrap gap-3 text-muted small">
              <span><strong>User ID:</strong> {candidate.id}</span>
              <span><strong>Profile ID:</strong> {candidate.profile_id || 'N/A'}</span>
            </div>
            {recruiter && (
              <div className="mt-2">
                <span className="badge bg-primary-subtle text-primary px-2 py-1">
                  <Briefcase className="w-3 h-3 me-1" style={{ display: 'inline' }} />
                  Assigned to: {recruiter.email}
                </span>
              </div>
            )}
          </div>

          <div className="col-md-4 d-flex flex-wrap gap-2 justify-content-md-end align-items-start">
            {isSubmitted && (
              <>
                <ActionButton 
                  Icon={CheckCircle} 
                  label="Approve" 
                  onClick={() => updateStatus(candidate, 'approved')}
                  variant="approve"
                  size="sm"
                />
                <ActionButton 
                  Icon={XCircle} 
                  label="Reject" 
                  onClick={() => updateStatus(candidate, 'rejected')}
                  variant="reject"
                  size="sm"
                />
              </>
            )}

            {isApproved && !recruiter && (
              <ActionButton 
                Icon={UserPlus} 
                label="Assign Recruiter" 
                onClick={() => openAssignModal(candidate)}
                variant="assign"
                size="sm"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RecruitersView = ({ recruiters, candidates, openDetailsModal, isLoading, error, refetchData }) => {
  return (
    <div className="recruiters-view">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#4F46E5', fontSize: '1.75rem' }}>
            Recruiter List
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Total: {recruiters.length} recruiters</p>
        </div>
        <button 
          onClick={refetchData} 
          disabled={isLoading}
          className="btn btn-sm d-flex align-items-center gap-2 px-3 py-2 fw-semibold"
          style={{ 
            backgroundColor: '#4F46E5', 
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338CA'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4F46E5'}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {isLoading && <div className="text-center p-4 text-indigo-600"><Loader className="w-6 h-6 inline-block animate-spin mr-2" /> Loading recruiters...</div>}
      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Error loading data: {error}</div>}

      <div className="row g-4 mt-2">
        {recruiters.length === 0 && !isLoading && !error && (
            <div className="col-12">
              <div className="text-center p-5 bg-light rounded-3 border border-2 border-dashed" style={{ borderColor: '#E5E7EB' }}>
                <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-25" style={{ color: '#6B7280' }} />
                <p className="text-muted mb-0 fw-semibold">No recruiters found</p>
                <p className="text-muted small mb-0">Recruiters will appear here once they are added</p>
              </div>
            </div>
        )}
        {recruiters.map(recruiter => (
          <div key={recruiter.id} className="col-12 col-md-6">
            <RecruiterCard 
              recruiter={recruiter} 
              candidates={candidates}
              openDetailsModal={openDetailsModal}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const RecruiterCard = ({ recruiter, candidates, openDetailsModal }) => {
  const assignedCount = candidates.filter(c => c.recruiterId === recruiter.id).length;
  const isAssigned = assignedCount > 0;

  return (
    <div className="card border-0 shadow-sm h-100" style={{ borderLeft: `4px solid #8B5CF6` }}>
      <div className="card-body p-4 d-flex flex-column">
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="flex-grow-1">
              <h5 className="fw-bold text-dark mb-1">{recruiter.email}</h5>
              <p className="text-muted small mb-0">User ID: {recruiter.id}</p>
            </div>
            <span 
              className={`badge px-3 py-2 fw-semibold`}
              style={{
                backgroundColor: isAssigned ? '#F3E8FF' : '#F3F4F6',
                color: isAssigned ? '#7C3AED' : '#6B7280',
                fontSize: '0.75rem'
              }}
            >
              {isAssigned ? `${assignedCount} Assigned` : 'Unassigned'}
            </span>
          </div>
          
          {isAssigned && (
            <div className="mb-3">
              <div className="d-flex align-items-center gap-2 text-muted small">
                <Users className="w-4 h-4" />
                <span>{assignedCount} candidate{assignedCount !== 1 ? 's' : ''} assigned</span>
              </div>
            </div>
          )}
        </div>

        <div className="pt-3 border-top d-flex justify-content-end">
          {isAssigned && (
            <button
              onClick={() => openDetailsModal(recruiter)}
              className="btn btn-sm btn-primary d-flex align-items-center gap-2 px-3"
              style={{ backgroundColor: '#4F46E5', border: 'none' }}
            >
              <Users className="w-4 h-4" />
              View Assignments
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


const AssignCandidateContent = ({ candidates, recruiters, onAssign, onClose, initialCandidate }) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState(initialCandidate?.id || '');
  const [selectedRecruiterId, setSelectedRecruiterId] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignError, setAssignError] = useState(null);
  
  const unassignedApprovedCandidates = candidates.filter(c => c.status === 'approved' && !c.recruiterId);
  
  // Update state if initialCandidate changes (e.g., modal opens from a specific candidate card)
  useEffect(() => {
    if (initialCandidate) {
      setSelectedCandidateId(initialCandidate.id);
    }
  }, [initialCandidate]);

  const handleAssignment = async () => {
    if (!selectedCandidateId || !selectedRecruiterId) return;

    const candidate = candidates.find(c => c.id === selectedCandidateId);
    const recruiter = recruiters.find(r => r.id === selectedRecruiterId);
    
    // The API expects the candidate's profile_id and the recruiter's user_id.
    if (!candidate?.profile_id) {
        setAssignError("Selected candidate does not have a profile_id for assignment.");
        return;
    }

    try {
        setIsAssigning(true);
        setAssignError(null);
        await onAssign(candidate.profile_id, recruiter.id);
        onClose();
    } catch (error) {
        console.error("Assignment failed:", error);
        setAssignError(`Failed to assign: ${error.message || 'Unknown error'}`);
    } finally {
        setIsAssigning(false);
    }
  };

  return (
    <div className="p-2">
      {assignError && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg text-sm">{assignError}</div>}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Candidate</label>
        <select
          value={selectedCandidateId}
          onChange={(e) => setSelectedCandidateId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          disabled={!!initialCandidate || unassignedApprovedCandidates.length === 0}
        >
          {initialCandidate ? (
            <option value={initialCandidate.id}>{initialCandidate.email}</option>
          ) : (
            <>
              <option value="">{unassignedApprovedCandidates.length === 0 ? 'No Approved Candidates available' : 'Choose an Approved Candidate'}</option>
              {unassignedApprovedCandidates.map(c => (
                <option key={c.id} value={c.id}>{c.email}</option>
              ))}
            </>
          )}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Recruiter</label>
        <select
          value={selectedRecruiterId}
          onChange={(e) => setSelectedRecruiterId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        >
          <option value="">Choose a Recruiter</option>
          {recruiters.map(r => (
            <option key={r.id} value={r.id}>{r.email} (ID: {r.id})</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <ActionButton 
            label="Cancel" 
            onClick={onClose} 
            className="bg-gray-500 hover:bg-gray-600"
        />
        <ActionButton 
          Icon={isAssigning ? Loader : UserPlus}
          label={isAssigning ? "Assigning..." : "Confirm Assignment"}
          onClick={handleAssignment} 
          disabled={!selectedCandidateId || !selectedRecruiterId || isAssigning}
          className="bg-indigo-600 hover:bg-indigo-700"
        />
      </div>
    </div>
  );
};

const RecruiterDetailsContent = ({ recruiter, assignedCandidates, onClose }) => (
  <div className="p-2">
    <p className="text-sm font-medium text-gray-700 mb-3">Candidates assigned to {recruiter.email} (ID: {recruiter.id}):</p>
    
    {assignedCandidates.length === 0 ? (
      <p className="text-center text-gray-500 italic p-4 bg-gray-50 rounded-lg">
        This recruiter currently has no candidates assigned.
      </p>
    ) : (
      <div className="assigned-candidates-list flex flex-col gap-2 max-h-64 overflow-y-auto">
        {assignedCandidates.map(candidate => (
          <div key={candidate.id} className="p-3 bg-indigo-50 border-l-4 border-indigo-600 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-gray-800">{candidate.email}</p>
              <p className="text-xs text-gray-500">Profile ID: {candidate.profile_id}</p>
            </div>
            <span className="px-2 py-0.5 text-xs font-medium text-white bg-green-500 rounded-full capitalize">
              {candidate.status || 'N/A'}
            </span>
          </div>
        ))}
      </div>
    )}

    <div className="flex justify-end mt-4">
      <ActionButton onClick={onClose} label="Close" className="bg-indigo-600 hover:bg-indigo-700" />
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function Admin() {
    const primaryColor = '#4F46E5';
  const paleBackground = '#F0F8FF';
  const ADMIN_BASE_URL ="http://127.0.0.1:8000/api/users/admin" 
  const [activeView, setActiveView] = useState('candidates');
  const [candidates, setCandidates] = useState(initialCandidates);
  const [recruiters, setRecruiters] = useState(initialRecruiters);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null); // Candidate to assign
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
const [profileId, setProfileId] = useState(null);
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  university: '',
  degree: '',
  major: '',
  visaStatus: '',
  resume: null,
});
const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
  const hasFetchedRef = useRef(false);

useEffect(() => {
      // Prevent double fetch in React Strict Mode
      if (hasFetchedRef.current) return;
      
      const fetchProfile = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError("You are not logged in. Redirecting to login...");
          setLoading(false);
          setTimeout(() => navigate('/AdminLogin'), 2000);
          return;
        }
  
        try {
          const storedToken = localStorage.getItem("accessToken");
          if (!storedToken) {
            setError("Not logged in.");
            navigate("/AdminLogin");
            return;
          }
  
          const response = await fetch(`${ADMIN_BASE_URL}/profile/`, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
          });
  
          if (!response.ok) throw new Error("Failed to load profiles");
  
          const profile = await response.json();
  
          if (!profile) {
            setError("Profile not found for current user.");
            return;
          }
  
          setProfileData(profile);
          console.log(profile);
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
          adminUser.name = profile.first_name + " " + profile.last_name;
          adminUser.image =`https://placehold.co/100x100/4F46E5/ffffff?text=${profile.first_name[0]}${profile.last_name[0]}`;
          fetchUsers();
        } catch (err) {
          setError("Failed to fetch profile.");
          console.error("Fetch Profile Error:", err);
        } finally {
          setLoading(false);
        }
      };
  
      hasFetchedRef.current = true;
      fetchProfile();
    }, [navigate]);
  

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
  // Filter candidates who are approved and not yet assigned
  const approvedCandidates = useMemo(() => 
    candidates.filter(c => c.status === 'approved' && !c.recruiterId && c.profile_id),
    [candidates]
  );
  
  // Calculate assigned candidates for the details modal
  const assignedCandidatesForDetails = useMemo(() => {
    if (!selectedRecruiter) return [];
    return candidates.filter(c => c.recruiterId === selectedRecruiter.id);
  }, [candidates, selectedRecruiter]);

  /**
   * Fetches all users and classifies them into candidates and recruiters.
   * NOTE: This is a placeholder logic based on the minimal '/users/' response.
   * In a real system, you'd use dedicated endpoints for candidates and recruiters.
   */
  const fetchUsers = useCallback(async () => {
    const storedToken = localStorage.getItem("accessToken");
    setIsLoading(true);
    setError(null);
    try {
      const condidatesUrl = `${API_BASE_URL}/users/`;
      const response = await fetch(condidatesUrl, {
        method: 'GET',
         headers: {
              accept: "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
      });
      const condidatesData = await response.json();

      // Simple classification logic (requires external state/data for 'status')
      const fetchedCandidates = [];

      condidatesData.forEach(user => {
        // Assume users with a profile_id are potential candidates
        if (user.profile_id) {
            // Use functional update to access current candidates state
            // This will be handled below using setCandidates with a callback
            fetchedCandidates.push({
                ...user,
                // Assign default status and recruiterId, will merge with existing state below
                status: 'submitted', 
                recruiterId: null,
            });
        }
      });
      const recruitersUrl = `${API_BASE_URL}/recruiters/`;
      const response1 = await fetch(recruitersUrl, {
        method: 'GET',
         headers: {
              accept: "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
      });
      const recruitersData = await response1.json();

      // Simple classification logic (requires external state/data for 'status')
      const fetchedRecruiters = [];

      recruitersData.forEach(user => {
        // Assume users with a profile_id are potential candidates
        if (user.id) {
            fetchedRecruiters.push({
                ...user,
                // Assign default status and recruiterId
                status: 'submitted', 
                recruiterId: null,
            });
        }
      });
      
      // Use functional updates to merge with existing state
      setCandidates(prevCandidates => {
        return fetchedCandidates.map(fetched => {
          const existing = prevCandidates.find(c => c.id === fetched.id);
          return existing ? { ...fetched, status: existing.status, recruiterId: existing.recruiterId } : fetched;
        });
      });
      
      setRecruiters(fetchedRecruiters);

    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('Could not connect to the API or process user data.');
      // Keep old data if fetch fails
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependency on candidates to retain local state data (status, recruiterId)


  /**
   * Placeholder function to update candidate status (Approve/Reject)
   * This is highly system-specific and needs the actual API endpoint structure.
   * Assuming a PATCH to /candidates/{profile_id}/status/
   */
  const updateCandidateStatus = useCallback(async (candidate, newStatus) => {
    const profileId = candidate.profile_id;
    if (!profileId) {
        alert("Cannot update status: Candidate profile ID is missing.");
        return;
    }
    
    const url = `${ADMIN_BASE_URL}/candidates/${profileId}/${newStatus=="approved"?"activate":"deactivate"}`;
    
    try {
        // Simulate loading state change
        setCandidates(prev => 
            prev.map(c => (c.id === candidate.id ? { ...c, status: 'updating...' } : c))
        );
        
        // In a real application, you would send a PATCH/PUT request here.
        // For demonstration, we'll simulate success and update local state.
        console.log(`Simulating PATCH to ${url} with status: ${newStatus}`);
        await new Promise(resolve => setTimeout(resolve, 500)); 

        // Update local state on success
        setCandidates(prev => 
            prev.map(c => (c.id === candidate.id ? { ...c, status: newStatus } : c))
        );
    } catch (err) {
        console.error(`Failed to update status for ${profileId}:`, err);
        // Revert status or show error message
        setCandidates(prev => 
            prev.map(c => (c.id === candidate.id ? { ...c, status: candidate.status } : c)) // Revert
        );
        alert(`Failed to update candidate status: ${err.message}`);
    }
  }, []);

  /**
   * Assigns a candidate to a recruiter using the provided API endpoint.
   * @param {string} candidateProfileId - The profile_id of the candidate.
   * @param {number} recruiterUserId - The user_id of the recruiter.
   */
  const handleAssignCandidate = useCallback(async (candidateProfileId, recruiterUserId) => {
    const url = `${API_BASE_URL}/recruiters/assign/`;
    
    const payload = {
      profile: candidateProfileId,
      recruiter_id: recruiterUserId,
      // Leaving 'recruiter' object empty or generic, as it may be optional or auto-populated by the backend
      recruiter: {
         "name": "string",
         "email": "user@example.com",
         "phone": "string",
         "active": true
      }
    };

    try {
        const response = await fetchWithRetry(url, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(payload),
        });
        
        // Assuming success returns the updated assignment or a confirmation
        await response.json(); 
        console.log(`Successfully assigned profile ${candidateProfileId} to recruiter ${recruiterUserId}`);

        // Update local state immediately upon success
        setCandidates(prevC => {
            const assignedCandidate = prevC.find(c => c.profile_id === candidateProfileId);
            if (assignedCandidate) {
                // Ensure the status is 'approved' and assign the recruiter's user ID as the recruiterId
                return prevC.map(c => 
                    (c.profile_id === candidateProfileId ? { ...c, recruiterId: recruiterUserId, status: 'approved' } : c)
                );
            }
            return prevC;
        });

    } catch (err) {
        console.error("API Assignment failed:", err);
        throw new Error(`Assignment failed: ${err.message}`);
    }
  }, []);

  // Modal handlers
  const openAssignModal = useCallback((candidate = null) => {
    setSelectedCandidate(candidate);
    setIsAssignModalOpen(true);
  }, []);
  
  const closeAssignModal = useCallback(() => {
    setIsAssignModalOpen(false);
    setSelectedCandidate(null);
  }, []);

  const openDetailsModal = useCallback((recruiter) => {
    setSelectedRecruiter(recruiter);
    setIsDetailsModalOpen(true);
  }, []);
  
  const closeDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(false);
    setSelectedRecruiter(null);
  }, []);
    const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/AdminLogin');
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

  if (!profileData) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: paleBackground }}>
       
        <div className="alert alert-danger p-4 shadow-lg rounded-3">
          <h4 className="alert-heading">Access Issue</h4>
          <p>{"Could not load profile data."}</p>
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
    {error && (
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1060 }}>
        <div className="bg-white rounded-3 shadow-lg p-4 position-relative" style={{ maxWidth: '500px', width: '90%' }}>
          <button 
            onClick={() => setError(null)} 
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close"
          ></button>
          <div className="text-center mt-3">
            <div className="mb-3">
              <AlertTriangle width={48} height={48} style={{ color: '#DC2626' }} />
            </div>
            <h4 className="fw-bold mb-3" style={{ color: '#1F2937' }}>Access Issue</h4>
            <p className="text-muted mb-4">{error}</p>
            <div className="d-flex gap-3 justify-content-center">
              <button 
                onClick={() => setError(null)} 
                className="btn btn-secondary px-4 py-2 fw-semibold"
                style={{ minWidth: '100px' }}
              >
                Close
              </button>
              <button 
                onClick={handleLogout} 
                className="btn btn-danger px-4 py-2 fw-semibold"
                style={{ minWidth: '100px' }}
              >
                <LogOut className="w-4 h-4 me-1" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
      <style>{styles}</style>
      <div className="admin-container">
        
        {/* Sidebar */}
        <div className="bg-indigo-600">
          <AdminSidebar 
            activeView={activeView} 
            setActiveView={setActiveView} 
            admin={adminUser} 
          />
        </div>

        {/* Main Content Area */}
        <main className="admin-main-content">
          <div className="admin-content-wrapper">
            {activeView === 'candidates' && (
              <CandidatesView 
                candidates={candidates} 
                updateCandidateStatus={updateCandidateStatus} 
                approvedCandidates={approvedCandidates}
                openAssignModal={openAssignModal}
                recruiters={recruiters}
                isLoading={isLoading}
                error={activeView === 'candidates' ? error : null}
                refetchData={fetchUsers}
              />
            )}
            {activeView === 'recruiters' && (
              <RecruitersView 
                recruiters={recruiters} 
                candidates={candidates}
                openDetailsModal={openDetailsModal}
                isLoading={isLoading}
                error={activeView === 'recruiters' ? error : null}
                refetchData={fetchUsers}
              />
            )}
          </div>
        </main>
        
        {/* Modals */}
        <Modal 
          isOpen={isAssignModalOpen} 
          onClose={closeAssignModal} 
          title="Assign Candidate to Recruiter"
        >
          <AssignCandidateContent 
            candidates={candidates} 
            recruiters={recruiters} 
            onAssign={handleAssignCandidate} 
            onClose={closeAssignModal}
            initialCandidate={selectedCandidate}
          />
        </Modal>

        <Modal 
          isOpen={isDetailsModalOpen} 
          onClose={closeDetailsModal} 
          title={`Assigned Candidates for ${selectedRecruiter?.email}`}
        >
          {selectedRecruiter && (
            <RecruiterDetailsContent
              recruiter={selectedRecruiter}
              assignedCandidates={assignedCandidatesForDetails}
              onClose={closeDetailsModal}
            />
          )}
        </Modal>
      </div>
    </>
  );
}