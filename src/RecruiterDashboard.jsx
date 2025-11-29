import React, { useState, useMemo, useCallback } from 'react';
import { Users, CheckCircle, UserPlus, Zap, Search, ChevronLeft, ChevronRight } from 'lucide-react';

// --- DUMMY DATA ---
const generateId = () => Math.random().toString(36).substring(2, 9);

const initialCandidates = [
  {
    id: generateId(),
    name: 'GanaPathi',
    email: 'ganapathi@gmail.com',
    major: 'Computer Science',
    stage: 'interested',          // from Interest Form
    status: 'submitted',          // not yet approved
    source: 'Interest Form',
    createdAt: '2025-11-25',
  },
  {
    id: generateId(),
    name: 'Nagarju',
    email: 'nagaraju@gmail.com',
    major: 'Electrical Engineering',
    stage: 'registered',          // registered/approved candidate
    status: 'approved',
    source: 'Portal Registration',
    createdAt: '2025-11-20',
  },
  {
    id: generateId(),
    name: 'Paramesh',
    email: 'paramesh@gmail.com',
    major: 'Data Analytics',
    stage: 'interested',
    status: 'submitted',
    source: 'Interest Form',
    createdAt: '2025-11-26',
  },
  {
    id: generateId(),
    name: 'Harsha',
    email: 'harsha@gmail.com',
    major: 'Mechanical Engineering',
    stage: 'registered',
    status: 'active',
    source: 'Portal Registration',
    createdAt: '2025-11-15',
  },
  {
    id: generateId(),
    name: 'Chaitanya',
    email: 'chaitanya@gmail.com',
    major: 'Finance',
    stage: 'interested',
    status: 'submitted',
    source: 'Interest Form',
    createdAt: '2025-11-24',
  },
];

const recruiterUser = {
  name: 'Recruiter – HYRIND',
  image: 'https://placehold.co/100x100/4F46E5/ffffff?text=HR',
};

// --- STYLES (same look as your Admin dashboard, but table-focused) ---
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

.recruiter-container {
  min-height: 100vh;
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
}

.recruiter-main-content {
  flex: 1;
  padding: 0;
  overflow-y: auto;
}

.recruiter-content-wrapper {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  min-height: calc(100vh - 64px);
}

/* Sidebar */

.recruiter-sidebar {
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

.recruiter-profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #4338ca;
}

.recruiter-profile-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #a5b4fc;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.recruiter-profile-name {
  margin-top: 0.75rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
}

.recruiter-profile-welcome {
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

/* Header + Filters */

.candidates-view {
  padding: 1.5rem;
}

.candidates-title-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.75rem;
}

.candidates-title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #374151;
}

.candidates-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
}

.filters-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.tab-button {
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background-color: #e5e7eb;
  color: #374151;
}

.tab-button-active {
  background-color: #4f46e5;
  color: white;
}

.search-box {
  display: flex;
  align-items: center;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  margin-left: auto;
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.8rem;
  margin-left: 0.35rem;
}

/* Metrics */

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
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

/* TABLE */

.candidates-table-wrapper {
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.candidates-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.candidates-table thead {
  background-color: #f9fafb;
}

.candidates-table th,
.candidates-table td {
  padding: 0.75rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.candidates-table th {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}

.candidates-table tbody tr:hover {
  background-color: #f3f4f6;
}

/* badges + action */

.stage-badge {
  padding: 0.25rem 0.6rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
  border-radius: 9999px;
  text-transform: capitalize;
}

.stage-interested {
  background-color: #f59e0b;
}

.stage-registered {
  background-color: #10b981;
}

.status-pill {
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 500;
  color: #374151;
  background-color: #e5e7eb;
}

.action-button {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  background-color: #3b82f6;
  transition: background-color 0.15s ease, transform 0.15s ease;
}

.action-button:hover {
  background-color: #2563eb;
  transform: scale(1.02);
}

.action-button-icon {
  width: 0.9rem;
  height: 0.9rem;
  margin-right: 0.25rem;
}

/* pagination */

.pagination-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f9fafb;
  font-size: 0.8rem;
}

.pagination-buttons {
  display: flex;
  gap: 0.5rem;
}

.pagination-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  background-color: white;
  cursor: pointer;
  font-size: 0.75rem;
  color: #374151;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* empty */

.empty-state {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  margin-top: 0.75rem;
}

@media (min-width: 768px) {
  .recruiter-container {
    flex-direction: row;
  }
  
  .recruiter-main-content {
    padding: 2rem;
  }
  
  .recruiter-content-wrapper {
    min-height: calc(100vh - 4rem);
  }
  
  .recruiter-sidebar {
    width: 256px;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
`;

// --- API SIMULATION ---
const simulateBackendCall = (action) =>
  new Promise((resolve) => {
    console.log(`Simulating API call for: ${action}...`);
    setTimeout(() => {
      console.log(`API call for ${action} succeeded.`);
      resolve();
    }, 400);
  });

// --- COMPONENTS ---

const SidebarButton = ({ Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`sidebar-button ${
      isActive ? 'sidebar-button-active' : 'sidebar-button-inactive'
    }`}
  >
    <Icon className="sidebar-button-icon" />
    {label}
  </button>
);

const RecruiterSidebar = ({ activeView, setActiveView, recruiter }) => (
  <div className="recruiter-sidebar">
    <div className="recruiter-profile-card">
      <img
        src={recruiter.image}
        alt="Recruiter"
        className="recruiter-profile-image"
      />
      <h3 className="recruiter-profile-name">{recruiter.name}</h3>
      <p className="recruiter-profile-welcome">
        Track interest and registrations in one place.
      </p>
    </div>

    <nav className="sidebar-nav">
      <SidebarButton
        Icon={Users}
        label="All Candidates"
        isActive={activeView === 'all'}
        onClick={() => setActiveView('all')}
      />
      <SidebarButton
        Icon={Zap}
        label="Interested (Interest Form)"
        isActive={activeView === 'interested'}
        onClick={() => setActiveView('interested')}
      />
      <SidebarButton
        Icon={CheckCircle}
        label="Registered / Approved"
        isActive={activeView === 'registered'}
        onClick={() => setActiveView('registered')}
      />
    </nav>
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

const CandidatesTable = ({
  candidates,
  page,
  pageSize,
  setPage,
  onMarkContacted,
}) => {
  const total = candidates.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const pageSlice = candidates.slice(startIndex, endIndex);

  return (
    <>
      <div className="candidates-table-wrapper">
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Name / Email</th>
              <th>Major</th>
              <th>Stage</th>
              <th>Status</th>
              <th>Source</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageSlice.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">
                    No candidates for this filter / page.
                  </div>
                </td>
              </tr>
            ) : (
              pageSlice.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#111827' }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {c.email}
                    </div>
                  </td>
                  <td>{c.major}</td>
                  <td>
                    <span
                      className={`stage-badge ${
                        c.stage === 'interested'
                          ? 'stage-interested'
                          : 'stage-registered'
                      }`}
                    >
                      {c.stage}
                    </span>
                  </td>
                  <td>
                    <span className="status-pill">{c.status}</span>
                  </td>
                  <td>{c.source}</td>
                  <td>{c.createdAt}</td>
                  <td>
                    {c.stage === 'interested' && c.status === 'submitted' && (
                      <button
                        className="action-button"
                        onClick={() => onMarkContacted(c.id)}
                      >
                        <UserPlus className="action-button-icon" />
                        Mark Contacted
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination-row">
          <span>
            Showing {total === 0 ? 0 : startIndex + 1}–{endIndex} of {total}{' '}
            candidates
          </span>
          <div className="pagination-buttons">
            <button
              className="pagination-button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
            >
              <ChevronLeft size={14} />
              Prev
            </button>
            <button
              className="pagination-button"
              onClick={() =>
                setPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={safePage === totalPages}
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const CandidatesView = ({
  candidates,
  activeView,
  searchQuery,
  setSearchQuery,
  onMarkContacted,
  page,
  setPage,
}) => {
  const totalInterested = useMemo(
    () => candidates.filter((c) => c.stage === 'interested').length,
    [candidates]
  );
  const totalRegistered = useMemo(
    () => candidates.filter((c) => c.stage === 'registered').length,
    [candidates]
  );
  const totalEngaged = useMemo(
    () =>
      candidates.filter(
        (c) => c.status === 'approved' || c.status === 'active'
      ).length,
    [candidates]
  );

  const filteredCandidates = useMemo(() => {
    let list = candidates;
    if (activeView === 'interested') {
      list = list.filter((c) => c.stage === 'interested');
    } else if (activeView === 'registered') {
      list = list.filter((c) => c.stage === 'registered');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.major.toLowerCase().includes(q)
      );
    }

    return list;
  }, [candidates, activeView, searchQuery]);

  // reset to page 1 when filter changes size heavily
  React.useEffect(() => {
    setPage(1);
  }, [activeView, searchQuery, setPage]);

  return (
    <div className="candidates-view">
      <div className="candidates-title-row">
        <div>
          <h2 className="candidates-title">Recruiter Dashboard</h2>
          <p className="candidates-subtitle">
            Table view for thousands of candidates from Interest Form & Portal
            Registration.
          </p>
        </div>

        <div className="filters-row">
          <button
            className={`tab-button ${
              activeView === 'all' ? 'tab-button-active' : ''
            }`}
            onClick={() => setSearchQuery((q) => q) /* keep, just visual */}
          >
            All
          </button>
          <button
            className={`tab-button ${
              activeView === 'interested' ? 'tab-button-active' : ''
            }`}
            onClick={() => {}}
          >
            Interested
          </button>
          <button
            className={`tab-button ${
              activeView === 'registered' ? 'tab-button-active' : ''
            }`}
            onClick={() => {}}
          >
            Registered
          </button>

          <div className="search-box">
            <Search size={14} />
            <input
              className="search-input"
              placeholder="Search name / email / major"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="metrics-grid">
        <MetricCard
          title="Interested (Interest Form)"
          value={totalInterested}
          color="metric-card-yellow"
          Icon={Zap}
        />
        <MetricCard
          title="Registered / Approved"
          value={totalRegistered}
          color="metric-card-green"
          Icon={CheckCircle}
        />
        <MetricCard
          title="Engaged (Approved / Active)"
          value={totalEngaged}
          color="metric-card-blue"
          Icon={Users}
        />
      </div>

      <CandidatesTable
        candidates={filteredCandidates}
        page={page}
        pageSize={10}
        setPage={setPage}
        onMarkContacted={onMarkContacted}
      />
    </div>
  );
};

// --- MAIN EXPORT ---
export default function RecruiterDashboard() {
  const [activeView, setActiveView] = useState('all'); // 'all' | 'interested' | 'registered'
  const [candidates, setCandidates] = useState(initialCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleMarkContacted = useCallback(async (candidateId) => {
    await simulateBackendCall(`Mark candidate ${candidateId} contacted`);
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId && c.status === 'submitted'
          ? { ...c, status: 'contacted' }
          : c
      )
    );
  }, []);

  // keep sidebar view and table filter in sync
  const effectiveView = activeView;
  const setViewFromSidebar = (view) => {
    setActiveView(view);
    setPage(1);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="recruiter-container">
        {/* Sidebar */}
        <div>
          <RecruiterSidebar
            activeView={effectiveView}
            setActiveView={setViewFromSidebar}
            recruiter={recruiterUser}
          />
        </div>

        {/* Main Content */}
        <main className="recruiter-main-content">
          <div className="recruiter-content-wrapper">
            <CandidatesView
              candidates={candidates}
              activeView={effectiveView}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onMarkContacted={handleMarkContacted}
              page={page}
              setPage={setPage}
            />
          </div>
        </main>
      </div>
    </>
  );
}