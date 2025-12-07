import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Users, Briefcase, CheckCircle, XCircle, UserPlus, Zap, Loader, AlertTriangle, RefreshCw } from 'lucide-react';

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

const ActionButton = ({ Icon, label, onClick, className = 'bg-gray-700 hover:bg-gray-600', disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`action-button inline-flex items-center px-3 py-1 text-sm font-medium text-white rounded-full transition duration-150 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {Icon && <Icon className="w-4 h-4 mr-1" />}
    {label}
  </button>
);

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
    className={`sidebar-button flex items-center w-full p-3 font-semibold transition duration-200 rounded-lg hover:bg-indigo-700 ${isActive ? 'bg-indigo-800 text-white shadow-lg' : 'text-indigo-200 hover:text-white'}`}
  >
    <Icon className="w-5 h-5 mr-3" />
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
      <h2 className="candidates-title flex justify-between items-center">
        Candidate Queue ({candidates.length})
        <ActionButton Icon={RefreshCw} label="Refresh" onClick={refetchData} className="bg-gray-500 hover:bg-gray-700" disabled={isLoading} />
      </h2>
      
      <div className="metrics-grid">
        <MetricCard title="Submitted (New)" value={submittedCount} color="bg-yellow-100 text-yellow-800" Icon={Zap} />
        <MetricCard title="Approved" value={approvedCount} color="bg-green-100 text-green-800" Icon={CheckCircle} />
        <MetricCard title="Ready to Assign" value={readyToAssignCount} color="bg-blue-100 text-blue-800" Icon={UserPlus} />
      </div>

      {isLoading && <div className="text-center p-4 text-indigo-600"><Loader className="w-6 h-6 inline-block animate-spin mr-2" /> Loading candidates...</div>}
      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Error loading data: {error}</div>}

      <div className="flex flex-col gap-3">
        {candidates.length === 0 && !isLoading && !error && (
            <p className="text-center text-gray-500 italic p-4 bg-gray-50 rounded-lg">No candidates found.</p>
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
    'submitted': 'bg-yellow-500',
    'approved': 'bg-green-500',
    'rejected': 'bg-red-500',
    'default': 'bg-gray-500',
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center transition duration-300 hover:shadow-lg border-l-4 border-indigo-500">
      <div className="flex-1 min-w-0 mb-2 md:mb-0">
        <p className="text-lg font-semibold text-gray-800 truncate">{candidate.email}</p>
        <p className="text-sm text-gray-500">User ID: {candidate.id}</p>
        <p className="text-xs text-indigo-600 font-medium mt-1">Profile ID: {candidate.profile_id || 'N/A'}</p>
        {candidate.status && (
          <span className={`px-2 py-0.5 mt-1 text-xs font-semibold text-white rounded-full capitalize ${statusColors[candidate.status] || statusColors.default}`}>
            {candidate.status}
          </span>
        )}
        {recruiter && <p className="text-sm mt-1 text-blue-600">Assigned to: {recruiter.email}</p>}
      </div>

      <div className="flex flex-wrap gap-2">
        {isSubmitted && (
          <>
            <ActionButton 
              Icon={CheckCircle} 
              label="Approve" 
              onClick={() => updateStatus(candidate, 'approved')}
              className="bg-green-500 hover:bg-green-600"
            />
            <ActionButton 
              Icon={XCircle} 
              label="Reject" 
              onClick={() => updateStatus(candidate, 'rejected')}
              className="bg-red-500 hover:bg-red-600"
            />
          </>
        )}

        {isApproved && !recruiter && (
          <ActionButton 
            Icon={UserPlus} 
            label="Assign Recruiter" 
            onClick={() => openAssignModal(candidate)}
            className="bg-blue-500 hover:bg-blue-600"
          />
        )}
      </div>
    </div>
  );
};

const RecruitersView = ({ recruiters, candidates, openDetailsModal, isLoading, error, refetchData }) => {
  return (
    <div className="recruiters-view">
      <h2 className="recruiters-title flex justify-between items-center">
        Recruiter List ({recruiters.length})
        <ActionButton Icon={RefreshCw} label="Refresh" onClick={refetchData} className="bg-gray-500 hover:bg-gray-700" disabled={isLoading} />
      </h2>

      {isLoading && <div className="text-center p-4 text-indigo-600"><Loader className="w-6 h-6 inline-block animate-spin mr-2" /> Loading recruiters...</div>}
      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Error loading data: {error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {recruiters.length === 0 && !isLoading && !error && (
            <p className="text-center text-gray-500 italic p-4 bg-gray-50 rounded-lg col-span-full">No recruiters found.</p>
        )}
        {recruiters.map(recruiter => (
          <RecruiterCard 
            key={recruiter.id} 
            recruiter={recruiter} 
            candidates={candidates}
            openDetailsModal={openDetailsModal}
          />
        ))}
      </div>
    </div>
  );
};

const RecruiterCard = ({ recruiter, candidates, openDetailsModal }) => {
  const assignedCount = candidates.filter(c => c.recruiterId === recruiter.id).length;
  const isAssigned = assignedCount > 0;

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border-l-4 border-purple-500 flex flex-col justify-between">
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800">{recruiter.email}</h3>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isAssigned ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
            {isAssigned ? `Assigned (${assignedCount})` : 'Unassigned'}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">User ID: {recruiter.id}</p>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
        {isAssigned && (
          <ActionButton 
            label="View Assignments" 
            onClick={() => openDetailsModal(recruiter)} 
            className="bg-blue-500 hover:bg-blue-600"
          />
        )}
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
  const [activeView, setActiveView] = useState('candidates');
  const [candidates, setCandidates] = useState(initialCandidates);
  const [recruiters, setRecruiters] = useState(initialRecruiters);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null); // Candidate to assign
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setIsLoading(true);
    setError(null);
    try {
      const url = `${API_BASE_URL}/users/`;
      const response = await fetchWithRetry(url, {
        method: 'GET',
        headers: API_HEADERS,
      });
      const data = await response.json();

      // Simple classification logic (requires external state/data for 'status')
      const fetchedCandidates = [];
      const fetchedRecruiters = [];

      data.forEach(user => {
        // Assume users with a profile_id are potential candidates
        if (user.profile_id) {
            // Merge with existing candidate data to retain 'status' and 'recruiterId'
            const existingCandidate = candidates.find(c => c.id === user.id) || {};
            
            // Default to 'submitted' if status is unknown for a new candidate
            let status = existingCandidate.status || 'submitted';
            
            // Simulate status changes if profile_id exists
            if (user.email.includes('recruit')) {
                // Heuristic to simulate a recruiter's status/profile association
                status = 'approved';
            }
            
            fetchedCandidates.push({
                ...user,
                // Assign a placeholder status and recruiterId based on previous state or default
                status: existingCandidate.status || 'submitted', 
                recruiterId: existingCandidate.recruiterId || null,
            });
        }
        
        // Assume users with certain characteristics (e.g., admin/staff roles or specific emails) are recruiters
        // For now, let's treat a subset of users as recruiters based on a placeholder list/logic.
        // A better approach would be filtering by a 'is_recruiter' field or hitting a '/recruiters/' endpoint.
        if (user.id % 2 === 0) { // Simple arbitrary assignment for demonstration
            fetchedRecruiters.push(user);
        }
      });
      
      setCandidates(fetchedCandidates);
      setRecruiters(fetchedRecruiters);

    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('Could not connect to the API or process user data.');
      // Keep old data if fetch fails
    } finally {
      setIsLoading(false);
    }
  }, [candidates]); // Dependency on candidates to retain local state data (status, recruiterId)

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /**
   * Placeholder function to update candidate status (Approve/Reject)
   * This is highly system-specific and needs the actual API endpoint structure.
   * Assuming a PATCH to /candidates/{profile_id}/status/
   */
  const updateCandidateStatus = useCallback(async (candidate, newStatus) => {
    // You need an endpoint like /candidates/{profile_id}/status/
    const profileId = candidate.profile_id;
    if (!profileId) {
        alert("Cannot update status: Candidate profile ID is missing.");
        return;
    }
    
    // NOTE: This endpoint is hypothetical based on standard REST practices.
    const url = `${API_BASE_URL}/candidates/${profileId}/status/`;
    
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

  return (
    <>
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