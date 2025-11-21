import React, { useState, useMemo, useCallback } from 'react';
import { Users, Briefcase, CheckCircle, XCircle, UserPlus, Zap } from 'lucide-react';

// --- DUMMY DATA ---
const generateId = () => Math.random().toString(36).substring(2, 9);

const initialCandidates = [
  { id: generateId(), name: 'GanaPathi', email: 'ganapathi@gmail.com', major: 'Computer Science', status: 'submitted', recruiterId: null },
  { id: generateId(), name: 'Nagarju', email: 'nagaraju@gmail.com', major: 'Electrical Engineering', status: 'approved', recruiterId: 'r1' },
  { id: generateId(), name: 'Paramesh', email: 'paramesh@gmail.com', major: 'Data Analytics', status: 'submitted', recruiterId: null },
  { id: generateId(), name: 'Harsha', email: 'harsha@gmail.com', major: 'Mechanical Engineering', status: 'rejected', recruiterId: null },
  { id: generateId(), name: 'Chaitanya', email: 'chaitanya@gmail.com', major: 'Finance', status: 'approved', recruiterId: 'r2' },
];

const initialRecruiters = [
  { id: 'r1', name: 'Naveen Teja', email: 'naveen.teja@hyrind.com', assignedCount: 1, lastLogin: '2 hours ago' },
  { id: 'r2', name: 'Bharathi', email: 'bharathi@hyrind.com', assignedCount: 1, lastLogin: '1 day ago' },
  { id: 'r3', name: 'Haritha', email: 'haritha@hyrind.com', assignedCount: 0, lastLogin: '3 days ago' },
];

const adminUser = {
  name: 'RaviTeja (CEO)',
  image: 'https://placehold.co/100x100/4F46E5/ffffff?text=RT',
};

// --- STYLES ---
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
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
}

.admin-profile-welcome {
  font-size: 0.875rem;
  color: #c7d2fe;
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

.candidates-view {
  padding: 1.5rem;
}

.candidates-title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #374151;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.metric-card {
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.metric-card-yellow {
  background-color: #fef3c7;
  color: #92400e;
}

.metric-card-green {
  background-color: #d1fae5;
  color: #065f46;
}

.metric-card-blue {
  background-color: #dbeafe;
  color: #1e40af;
}

.metric-icon {
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
  opacity: 0.7;
}

.metric-content {
  display: flex;
  flex-direction: column;
}

.metric-title {
  font-size: 0.875rem;
  font-weight: 500;
}

.metric-value {
  font-size: 1.875rem;
  font-weight: bold;
}

.candidates-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.candidate-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.candidate-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.candidate-info {
  flex: 1;
  min-width: 0;
}

.candidate-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.candidate-details {
  font-size: 0.875rem;
  color: #6b7280;
}

.candidate-recruiter {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: #2563eb;
  font-weight: 500;
}

.candidate-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  border-radius: 9999px;
  text-transform: capitalize;
}

.status-submitted {
  background-color: #f59e0b;
}

.status-approved {
  background-color: #10b981;
}

.status-rejected {
  background-color: #ef4444;
}

.action-button {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  border-radius: 9999px;
  transition: all 0.15s ease;
  transform: scale(1);
  border: none;
  cursor: pointer;
}

.action-button:hover {
  transform: scale(1.02);
}

.action-button-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
}

.action-button-green {
  background-color: #10b981;
}

.action-button-green:hover {
  background-color: #059669;
}

.action-button-red {
  background-color: #ef4444;
}

.action-button-red:hover {
  background-color: #dc2626;
}

.action-button-blue {
  background-color: #3b82f6;
}

.action-button-blue:hover {
  background-color: #2563eb;
}

.action-button-gray {
  background-color: #374151;
}

.action-button-gray:hover {
  background-color: #1f2937;
}

.recruiters-view {
  padding: 1.5rem;
}

.recruiters-title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #374151;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.recruiters-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.recruiter-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #6366f1;
}

.recruiter-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.recruiter-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
}

.recruiter-email {
  font-size: 0.875rem;
  color: #6b7280;
}

.recruiter-status {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
}

.status-assigned {
  background-color: #e0e7ff;
  color: #3730a3;
}

.status-unassigned {
  background-color: #f3f4f6;
  color: #4b5563;
}

.recruiter-footer {
  margin-top: auto;
  display: flex;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.recruiter-last-login {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-left: auto;
  align-self: flex-end;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 32rem;
  padding: 1.5rem;
  margin: 1rem;
  transform: scale(1);
  transition: all 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #374151;
}

.modal-close-button {
  padding: 0.5rem;
  border-radius: 9999px;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
}

.modal-close-button:hover {
  background-color: #f3f4f6;
}

.modal-body {
  padding: 1rem 0;
  max-height: 70vh;
  overflow-y: auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.form-select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.form-select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.modal-actions {
  padding-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.cancel-button {
  padding: 0.5rem 1rem;
  color: #374151;
  background-color: #e5e7eb;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cancel-button:hover {
  background-color: #d1d5db;
}

.confirm-button {
  padding: 0.5rem 1rem;
  color: white;
  background-color: #4f46e5;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.confirm-button:hover {
  background-color: #4338ca;
}

.confirm-button:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}

.recruiter-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.details-description {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
}

.empty-state {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.assigned-candidates-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.assigned-candidate-item {
  padding: 0.75rem;
  background-color: #e0e7ff;
  border-left: 4px solid #4f46e5;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.assigned-candidate-name {
  font-weight: 600;
  color: #374151;
}

.assigned-candidate-major {
  font-size: 0.75rem;
  color: #6b7280;
}

.assigned-candidate-status {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  background-color: #4f46e5;
  border-radius: 9999px;
  text-transform: capitalize;
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
  
  .metrics-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .recruiters-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
`;

// --- API SIMULATION ---
const simulateBackendCall = (action) => new Promise(resolve => {
  console.log(`Simulating API call for: ${action}...`);
  setTimeout(() => {
    console.log(`API call for ${action} succeeded.`);
    resolve();
  }, 500);
});

// --- COMPONENTS ---

// 1. Sidebar Profile and Navigation
const AdminSidebar = ({ activeView, setActiveView, admin }) => (
  <div className="admin-sidebar">
    <div className="admin-profile-card">
      <img
        src={admin.image}
        alt="Admin"
        className="admin-profile-image"
      />
      <h3 className="admin-profile-name">{admin.name}</h3>
      <p className="admin-profile-welcome">Welcome back!</p>
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

// 2. Main Candidate View
const CandidatesView = ({ candidates, updateCandidateStatus, approvedCandidates, openAssignModal }) => (
  <div className="candidates-view">
    <h2 className="candidates-title">Candidate Queue ({candidates.length})</h2>
    
    <div className="metrics-grid">
      <MetricCard title="Submitted (New)" value={candidates.filter(c => c.status === 'submitted').length} color="metric-card-yellow" Icon={Zap} />
      <MetricCard title="Approved" value={candidates.filter(c => c.status === 'approved').length} color="metric-card-green" Icon={CheckCircle} />
      <MetricCard title="Ready to Assign" value={approvedCandidates.length} color="metric-card-blue" Icon={UserPlus} />
    </div>

    <div className="candidates-list">
      {candidates.map(candidate => (
        <CandidateCard 
          key={candidate.id} 
          candidate={candidate} 
          updateStatus={updateCandidateStatus} 
          openAssignModal={openAssignModal}
        />
      ))}
    </div>
  </div>
);

const MetricCard = ({ title, value, color, Icon }) => (
  <div className={`metric-card ${color}`}>
    <Icon className="metric-icon" />
    <div className="metric-content">
      <p className="metric-title">{title}</p>
      <p className="metric-value">{value}</p>
    </div>
  </div>
);

const CandidateCard = ({ candidate, updateStatus, openAssignModal }) => {
  const isSubmitted = candidate.status === 'submitted';
  const isApproved = candidate.status === 'approved';
  const isRejected = candidate.status === 'rejected';
  
  const statusColor = isSubmitted ? 'status-submitted' : isApproved ? 'status-approved' : 'status-rejected';

  return (
    <div className="candidate-card">
      <div className="candidate-info">
        <p className="candidate-name">{candidate.name}</p>
        <p className="candidate-details">{candidate.email} | {candidate.major}</p>
        {candidate.recruiterId && <p className="candidate-recruiter">Assigned to: {candidate.recruiterId}</p>}
      </div>

      <div className="candidate-actions">
        <span className={`status-badge ${statusColor}`}>
          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
        </span>

        {isSubmitted && (
          <>
            <ActionButton 
              Icon={CheckCircle} 
              label="Approve" 
              onClick={() => updateStatus(candidate.id, 'approved')}
              className="action-button-green"
            />
            <ActionButton 
              Icon={XCircle} 
              label="Reject" 
              onClick={() => updateStatus(candidate.id, 'rejected')}
              className="action-button-red"
            />
          </>
        )}

        {isApproved && !candidate.recruiterId && (
          <ActionButton 
            Icon={UserPlus} 
            label="Assign Recruiter" 
            onClick={() => openAssignModal(candidate.id)}
            className="action-button-blue"
          />
        )}
      </div>
    </div>
  );
};

// 3. Main Recruiters View
const RecruitersView = ({ recruiters, candidates, openAssignModal, openDetailsModal }) => (
  <div className="recruiters-view">
    <h2 className="recruiters-title">Recruiter Management ({recruiters.length})</h2>

    <div className="recruiters-grid">
      {recruiters.map(recruiter => (
        <RecruiterCard 
          key={recruiter.id} 
          recruiter={recruiter} 
          openAssignModal={openAssignModal}
          openDetailsModal={openDetailsModal}
        />
      ))}
    </div>
  </div>
);

const RecruiterCard = ({ recruiter, openAssignModal, openDetailsModal }) => {
  const isAssigned = recruiter.assignedCount > 0;

  return (
    <div className="recruiter-card">
      <div className="recruiter-header">
        <div>
          <h3 className="recruiter-name">{recruiter.name}</h3>
          <p className="recruiter-email">{recruiter.email}</p>
        </div>
        <span className={`recruiter-status ${isAssigned ? 'status-assigned' : 'status-unassigned'}`}>
          {isAssigned ? `Assigned (${recruiter.assignedCount})` : 'Unassigned'}
        </span>
      </div>

      <div className="recruiter-footer">
        {isAssigned ? (
          <ActionButton 
            label="View Details" 
            onClick={() => openDetailsModal(recruiter)} 
            className="action-button-blue"
          />
        ) : (
          <ActionButton 
            label="Assign Candidate" 
            onClick={() => openAssignModal(null, recruiter.id)} 
            className="action-button-green"
          />
        )}
        <p className="recruiter-last-login">Last seen: {recruiter.lastLogin}</p>
      </div>
    </div>
  );
};

// 4. Action Button Utility
const ActionButton = ({ Icon, label, onClick, className = 'action-button-gray' }) => (
  <button
    onClick={onClick}
    className={`action-button ${className}`}
  >
    {Icon && <Icon className="action-button-icon" />}
    {label}
  </button>
);

// 5. Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button onClick={onClose} className="modal-close-button">
            <XCircle className="modal-close-icon" />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// 6. Assignment Modal Content
const AssignCandidateContent = ({ candidates, recruiters, onAssign, onClose }) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState('');
  const [selectedRecruiterId, setSelectedRecruiterId] = useState('');
  
  const unassignedApprovedCandidates = candidates.filter(c => c.status === 'approved' && !c.recruiterId);
  
  const handleAssignment = () => {
    if (selectedCandidateId && selectedRecruiterId) {
      onAssign(selectedCandidateId, selectedRecruiterId);
      onClose();
    }
  };

  return (
    <div>
      <div className="form-group">
        <label className="form-label">Select Candidate</label>
        <select
          value={selectedCandidateId}
          onChange={(e) => setSelectedCandidateId(e.target.value)}
          className="form-select"
          disabled={unassignedApprovedCandidates.length === 0}
        >
          <option value="">
            {unassignedApprovedCandidates.length === 0 ? 'No Approved Candidates available' : 'Choose an Approved Candidate'}
          </option>
          {unassignedApprovedCandidates.map(c => (
            <option key={c.id} value={c.id}>{c.name} ({c.major})</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Select Recruiter</label>
        <select
          value={selectedRecruiterId}
          onChange={(e) => setSelectedRecruiterId(e.target.value)}
          className="form-select"
        >
          <option value="">Choose a Recruiter</option>
          {recruiters.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>

      <div className="modal-actions">
        <button onClick={onClose} className="cancel-button">Cancel</button>
        <button 
          onClick={handleAssignment} 
          disabled={!selectedCandidateId || !selectedRecruiterId}
          className="confirm-button"
        >
          {`Assign${selectedCandidateId && selectedRecruiterId ? ` ${candidates.find(c => c.id === selectedCandidateId)?.name} to ${recruiters.find(r => r.id === selectedRecruiterId)?.name}` : ''}`}
        </button>
      </div>
    </div>
  );
};

// 7. Recruiter Details Modal Content
const RecruiterDetailsContent = ({ recruiter, assignedCandidates, onClose }) => (
  <div className="recruiter-details">
    <p className="details-description">Candidates managed by {recruiter.name}:</p>
    
    {assignedCandidates.length === 0 ? (
      <p className="empty-state">
        This recruiter currently has no candidates assigned.
      </p>
    ) : (
      <div className="assigned-candidates-list">
        {assignedCandidates.map(candidate => (
          <div key={candidate.id} className="assigned-candidate-item">
            <div>
              <p className="assigned-candidate-name">{candidate.name}</p>
              <p className="assigned-candidate-major">{candidate.major}</p>
            </div>
            <span className="assigned-candidate-status">
              {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    )}

    <div className="modal-actions">
      <button onClick={onClose} className="confirm-button">Close</button>
    </div>
  </div>
);

// 8. Main App Component
export default function Admin() {
  const [activeView, setActiveView] = useState('candidates');
  const [candidates, setCandidates] = useState(initialCandidates);
  const [recruiters, setRecruiters] = useState(initialRecruiters);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  const approvedCandidates = useMemo(() => 
    candidates.filter(c => c.status === 'approved' && !c.recruiterId),
    [candidates]
  );
  
  const assignedCandidatesForDetails = useMemo(() => {
    if (!selectedRecruiter) return [];
    return candidates.filter(c => c.recruiterId === selectedRecruiter.id);
  }, [candidates, selectedRecruiter]);

  const updateCandidateStatus = useCallback(async (id, newStatus) => {
    await simulateBackendCall(`Update Candidate ${id} Status to ${newStatus}`);
    setCandidates(prev => 
      prev.map(c => (c.id === id ? { ...c, status: newStatus } : c))
    );
  }, []);

  const handleAssignCandidate = useCallback(async (candidateId, recruiterId) => {
    await simulateBackendCall(`Assign Candidate ${candidateId} to Recruiter ${recruiterId}`);
    
    setCandidates(prevC => 
      prevC.map(c => (c.id === candidateId ? { ...c, recruiterId } : c))
    );
    
    setRecruiters(prevR => 
      prevR.map(r => (r.id === recruiterId ? { ...r, assignedCount: r.assignedCount + 1 } : r))
    );
  }, []);

  const openAssignModal = useCallback((candidateId = null, recruiterId = null) => {
    setIsAssignModalOpen(true);
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
        <div>
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
              />
            )}
            {activeView === 'recruiters' && (
              <RecruitersView 
                recruiters={recruiters} 
                candidates={candidates}
                openAssignModal={openAssignModal}
                openDetailsModal={openDetailsModal}
              />
            )}
          </div>
        </main>
        
        {/* Modals */}
        <Modal 
          isOpen={isAssignModalOpen} 
          onClose={() => setIsAssignModalOpen(false)} 
          title="Assign Candidate to Recruiter"
        >
          <AssignCandidateContent 
            candidates={candidates} 
            recruiters={recruiters} 
            onAssign={handleAssignCandidate} 
            onClose={() => setIsAssignModalOpen(false)} 
          />
        </Modal>

        <Modal 
          isOpen={isDetailsModalOpen} 
          onClose={closeDetailsModal} 
          title={`Assigned Candidates for ${selectedRecruiter?.name}`}
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