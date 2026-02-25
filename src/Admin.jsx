import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Briefcase, CheckCircle, XCircle, UserPlus, Zap, Loader, AlertTriangle, RefreshCw, LogOut, CreditCard, Layers, DollarSign, List, Download, ChevronLeft, ChevronRight, FileText, Clock, UserCheck, CheckCircle2, Ban } from 'lucide-react';
import { base_url } from "./commonAPI's.json";
import CandidateDetails from './CandidateDetails';


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
const API_BASE_URL = `${base_url}/api`;

// Helper function to get current API headers with fresh token
const getApiHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'accept': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
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
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
.modal-container { background-color: white; border-radius: 1rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); width: 100%; max-width: 450px; overflow: hidden; transform: scale(1); transition: all 0.3s ease; display: flex; flex-direction: column; }
.modal-header { padding: 1.25rem 1.5rem; background-color: #f9fafb; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; justify-content: space-between; }
.modal-title { font-size: 1.25rem; font-weight: 700; color: #111827; margin: 0; }
.modal-close-button { background: none; border: none; color: #9ca3af; cursor: pointer; padding: 0.5rem; border-radius: 0.375rem; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
.modal-close-button:hover { background-color: #f3f4f6; color: #374151; }
.modal-body { padding: 1.5rem; flex: 1; }

@media (min-width: 768px) {
  .admin-container { flex-direction: row; }
  .admin-main-content { padding: 2rem; }
  .admin-content-wrapper { min-height: calc(100vh - 4rem); }
  .admin-sidebar { width: 256px; }
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  .recruiters-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .metrics-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1280px) {
  .metrics-grid { grid-template-columns: repeat(4, 1fr); }
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

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
      <div className="text-muted small">
        Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of <strong>{totalItems}</strong> items
      </div>

      <div className="d-flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm d-flex align-items-center gap-1 px-3 py-2"
          style={{
            backgroundColor: currentPage === 1 ? '#F3F4F6' : '#4F46E5',
            color: currentPage === 1 ? '#9CA3AF' : 'white',
            border: 'none',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}
          onMouseOver={(e) => currentPage !== 1 && (e.currentTarget.style.backgroundColor = '#4338CA')}
          onMouseOut={(e) => currentPage !== 1 && (e.currentTarget.style.backgroundColor = '#4F46E5')}
        >
          <ChevronLeft style={{ width: '16px', height: '16px' }} />
          Previous
        </button>

        <div className="d-flex gap-1">
          {startPage > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="btn btn-sm px-3 py-2"
                style={{
                  backgroundColor: '#F3F4F6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
              >
                1
              </button>
              {startPage > 2 && <span className="d-flex align-items-center px-2 text-muted">...</span>}
            </>
          )}

          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className="btn btn-sm px-3 py-2 fw-semibold"
              style={{
                backgroundColor: currentPage === number ? '#4F46E5' : '#F3F4F6',
                color: currentPage === number ? 'white' : '#374151',
                border: 'none',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                if (currentPage !== number) {
                  e.currentTarget.style.backgroundColor = '#E5E7EB';
                }
              }}
              onMouseOut={(e) => {
                if (currentPage !== number) {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }
              }}
            >
              {number}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="d-flex align-items-center px-2 text-muted">...</span>}
              <button
                onClick={() => onPageChange(totalPages)}
                className="btn btn-sm px-3 py-2"
                style={{
                  backgroundColor: '#F3F4F6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-sm d-flex align-items-center gap-1 px-3 py-2"
          style={{
            backgroundColor: currentPage === totalPages ? '#F3F4F6' : '#4F46E5',
            color: currentPage === totalPages ? '#9CA3AF' : 'white',
            border: 'none',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
          }}
          onMouseOver={(e) => currentPage !== totalPages && (e.currentTarget.style.backgroundColor = '#4338CA')}
          onMouseOut={(e) => currentPage !== totalPages && (e.currentTarget.style.backgroundColor = '#4F46E5')}
        >
          Next
          <ChevronRight style={{ width: '16px', height: '16px' }} />
        </button>
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
      <div className="border-t border-indigo-400 my-2 opacity-50"></div>
      <SidebarButton
        Icon={Layers}
        label="Subscription Plans"
        isActive={activeView === 'plans'}
        onClick={() => setActiveView('plans')}
      />
      <SidebarButton
        Icon={List}
        label="User Subscriptions"
        isActive={activeView === 'subscriptions'}
        onClick={() => setActiveView('subscriptions')}
      />
      <SidebarButton
        Icon={DollarSign}
        label="Billing History"
        isActive={activeView === 'billing'}
        onClick={() => setActiveView('billing')}
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

const MetricCard = ({ title, value, bg, text, Icon, onClick, isActive }) => (
  <div onClick={onClick} className="card border-0 h-100" style={{
    minHeight: '100px',
    backgroundColor: bg,
    color: text,
    borderRadius: '12px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    transform: isActive ? 'translateY(-4px) scale(1.02)' : 'none',
    boxShadow: isActive
      ? `0 20px 25px -5px ${text}40, 0 10px 10px -5px ${text}20`
      : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    border: isActive ? `2px solid ${text}` : '2px solid transparent',
    zIndex: isActive ? 10 : 1
  }}>
    <div className="card-body p-3 d-flex align-items-center">
      <div className="p-3 rounded-3 me-3 d-flex align-items-center justify-content-center" style={{
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(4px)',
        transition: 'background-color 0.3s ease'
      }}>
        {Icon && <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />}
      </div>
      <div className="flex-grow-1">
        <p className="text-xs fw-bold mb-0 opacity-80 text-uppercase" style={{ letterSpacing: '0.5px', fontSize: '0.7rem' }}>{title}</p>
        <h3 className="fw-bold mb-0" style={{ fontSize: '1.5rem', transform: isActive ? 'scale(1.05)' : 'none', transition: 'transform 0.3s ease' }}>{value}</h3>
      </div>
    </div>
  </div>
);

const CandidatesView = ({ candidates, updateCandidateStatus, openAssignModal, recruiters, isLoading, error, refetchData, activatingCandidateId, deactivatingCandidateId, onViewDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [activeTab, setActiveTab] = useState("All Records");

  // Derive counts for metrics
  // const submittedCount = candidates.length;
  // const approvedCount = candidates.filter(c => c.status === "approved").length;
  // const readyToAssignCount = candidates.filter(c => c.status === "ready_to_assign").length;
  // const assignedCount = candidates.filter(c => c.status === "assigned").length;
  // const openedCount = candidates.filter(c => c.status === "open").length;
  // const waitingForPaymentCount = candidates.filter(c => c.status === "waiting_payment").length;
  // const closedCount = candidates.filter(c => c.status === "closed").length;
  // const rejectedCount = candidates.filter(c => c.status === "rejected").length;

  const [submittedCount, approvedCount, readyToAssignCount, assignedCount, openedCount, waitingForPaymentCount, closedCount, rejectedCount] = useMemo(() => {
    return [
      candidates.length,
      candidates.filter(c => c.status === "approved").length,
      candidates.filter(c => c.status === "ready_to_assign").length,
      candidates.filter(c => c.status === "assigned").length,
      candidates.filter(c => c.status === "open").length,
      candidates.filter(c => c.status === "waiting_payment").length,
      candidates.filter(c => c.status === "closed").length,
      candidates.filter(c => c.status === "rejected").length
    ]
  }, [candidates])

  // Derive the active list based on selected tab
  const filteredCandidates = useMemo(() => {
    switch (activeTab) {
      case "Open": return candidates.filter(c => c.status === "open");
      case "Approved": return candidates.filter(c => c.status === "approved");
      case "Ready to Assign": return candidates.filter(c => c.status === "ready_to_assign");
      case "Assigned": return candidates.filter(c => c.status === "assigned");
      case "Waiting for Payment": return candidates.filter(c => c.status === "waiting_payment");
      case "Closed": return candidates.filter(c => c.status === "closed");
      case "Rejected": return candidates.filter(c => c.status === "rejected");
      case "All Records":
      default: return candidates;
    }
  }, [candidates, activeTab]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredCandidates.length, currentPage, totalPages]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const MetricCardList = [
    {
      title: "All Records",
      value: submittedCount,
      bg: '#EEF2FF',
      text: '#4338CA',
      Icon: FileText,
      onClick: () => setActiveTab("All Records")
    },
    {
      title: "Open",
      value: openedCount,
      bg: '#EFF6FF',
      text: '#1D4ED8',
      Icon: Clock,
      onClick: () => setActiveTab("Open")
    },
    {
      title: "Approved",
      value: approvedCount,
      bg: '#F0FDF4',
      text: '#15803D',
      Icon: CheckCircle2,
      onClick: () => setActiveTab("Approved")
    },
    {
      title: "Ready to Assign",
      value: readyToAssignCount,
      bg: '#F5F3FF',
      text: '#7C3AED',
      Icon: UserPlus,
      onClick: () => setActiveTab("Ready to Assign")
    },
    {
      title: "Assigned",
      value: assignedCount,
      bg: '#F0FDFA',
      text: '#0F766E',
      Icon: UserCheck,
      onClick: () => setActiveTab("Assigned")
    },
    {
      title: "Waiting for Payment",
      value: waitingForPaymentCount,
      bg: '#FFFBEB',
      text: '#B45309',
      Icon: DollarSign,
      onClick: () => setActiveTab("Waiting for Payment")
    },
    {
      title: "Closed",
      value: closedCount,
      bg: '#F9FAFB',
      text: '#374151',
      Icon: CheckCircle,
      onClick: () => setActiveTab("Closed")
    },
    {
      title: "Rejected",
      value: rejectedCount,
      bg: '#FEF2F2',
      text: '#B91C1C',
      Icon: Ban,
      onClick: () => setActiveTab("Rejected")
    }
  ]

  return (
    <div className="candidates-view">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#4F46E5', fontSize: '1.75rem' }}>
            Candidate Queue
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Total: {candidates.length} candidates</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small fw-medium">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="form-select form-select-sm border-0 shadow-sm"
              style={{ width: '70px', backgroundColor: '#f8fafc', borderRadius: '8px', fontWeight: '600' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
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
      </div>

      <div className="metrics-grid">
        {MetricCardList.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            bg={metric.bg}
            text={metric.text}
            Icon={metric.Icon}
            onClick={metric.onClick}
            isActive={activeTab === metric.title}
          />
        ))}
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

        {currentCandidates.map(candidate => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            updateStatus={updateCandidateStatus}
            openAssignModal={openAssignModal}
            recruiters={recruiters}
            isActivating={activatingCandidateId === candidate.id}
            isDeactivating={deactivatingCandidateId === candidate.id}
            onViewDetails={onViewDetails}
          />
        ))}
        {filteredCandidates.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredCandidates.length}
          />
        )}
      </div>










    </div>
  );
};

const CandidateCard = ({ candidate, updateStatus, openAssignModal, recruiters, isActivating, isDeactivating, onViewDetails }) => {
  const isActive = candidate.active !== false; // Default to true if not specified
  const isApproved = candidate.status === "approved";
  const isReadyToAssign = candidate.status === "ready_to_assign";
  const isAssigned = candidate.status === "assigned";
  const isOpen = candidate.status === "open";
  const isWaitingForPayment = candidate.status === "waiting_payment";
  const isClosed = candidate.status === "closed";
  const isRejected = candidate.status === "rejected";


  // Get recruiter info from the new API structure
  const recruiterInfo = candidate.recruiter_info;
  const assignmentStatus = candidate.assignment_status;

  const statusColors = {
    'active': { bg: '#D1FAE5', text: '#065F46', border: '#10B981' },
    'inactive': { bg: '#FEE2E2', text: '#991B1B', border: '#EF4444' },
    'submitted': { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' },
    'approved': { bg: '#D1FAE5', text: '#065F46', border: '#10B981' },
    'rejected': { bg: '#FEE2E2', text: '#991B1B', border: '#EF4444' },
    'default': { bg: '#F3F4F6', text: '#374151', border: '#9CA3AF' },
  };

  const priorityColors = {
    'high': { bg: '#FEE2E2', text: '#991B1B' },
    'medium': { bg: '#FEF3C7', text: '#92400E' },
    'low': { bg: '#E0E7FF', text: '#3730A3' },
  };

  const statusStyle = statusColors[candidate.status] || statusColors.default;

  // Format datetime
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card border-0 shadow-sm hover-shadow-lg transition-all" style={{ borderLeft: `4px solid #4F46E5` }}>
      <div className="card-body p-4">
        <div className="row align-items-start">
          <div className="col-md-8 mb-3 mb-md-0">
            <div className="d-flex align-items-center mb-2 flex-wrap gap-2">
              <button
                onClick={() => onViewDetails(candidate.profile_id)}
                className="btn btn-link p-0 text-decoration-none"
              >
                <h5 className="mb-0 fw-bold" style={{ color: '#4F46E5', cursor: 'pointer' }}>{candidate.email || 'No Email'}</h5>
              </button>
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
                  {candidate.status_display || candidate.status}
                </span>
              )}
              <span
                className="badge px-2 py-1 fw-semibold"
                style={{
                  backgroundColor: isActive ? '#D1FAE5' : '#FEE2E2',
                  color: isActive ? '#065F46' : '#991B1B',
                  fontSize: '0.7rem'
                }}
              >
                {isActive ? '● Active' : '● Inactive'}
              </span>
              {assignmentStatus && (
                <span
                  className="badge px-2 py-1 fw-semibold"
                  style={{
                    backgroundColor: priorityColors[assignmentStatus.priority]?.bg || '#F3F4F6',
                    color: priorityColors[assignmentStatus.priority]?.text || '#374151',
                    fontSize: '0.7rem'
                  }}
                >
                  {assignmentStatus.priority?.toUpperCase()} Priority
                </span>
              )}
            </div>

            <div className="d-flex flex-wrap gap-3 text-muted small mb-2">
              <span><strong>User ID:</strong> {candidate.id}</span>
              <span><strong>Profile ID:</strong> {candidate.profile_id || 'N/A'}</span>
            </div>

            {assignmentStatus && (
              <div className="mt-2 p-2 rounded" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="small">
                  <div className="mb-1">
                    <strong>Assignment Status:</strong>
                    <span className="ms-2 badge badge-sm" style={{
                      backgroundColor: assignmentStatus.status === 'active' ? '#D1FAE5' : '#FEE2E2',
                      color: assignmentStatus.status === 'active' ? '#065F46' : '#991B1B'
                    }}>
                      {assignmentStatus.status}
                    </span>
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                    <span className="me-3">📅 Assigned: {formatDateTime(assignmentStatus.assigned_at)}</span>
                    <span>⏰ Last Activity: {formatDateTime(assignmentStatus.last_activity)}</span>
                  </div>
                </div>
              </div>
            )}

            {recruiterInfo && (
              <div className="mt-2 p-2 rounded" style={{ backgroundColor: '#EEF2FF' }}>
                <div className="small">
                  <div className="fw-bold text-primary mb-1">
                    <Briefcase className="w-3 h-3 me-1" style={{ display: 'inline' }} />
                    Assigned Recruiter
                  </div>
                  <div className="d-flex flex-wrap gap-2 text-dark">
                    <span><strong>Name:</strong> {recruiterInfo.name}</span>
                    <span>|</span>
                    <span><strong>ID:</strong> {recruiterInfo.employee_id}</span>
                    <span>|</span>
                    <span><strong>Email:</strong> {recruiterInfo.email}</span>
                  </div>
                  <div className="d-flex flex-wrap gap-2 text-muted mt-1" style={{ fontSize: '0.75rem' }}>
                    <span>📞 {recruiterInfo.phone}</span>
                    <span>•</span>
                    <span>🏢 {recruiterInfo.department_display}</span>
                    <span>•</span>
                    <span>💼 {recruiterInfo.specialization_display}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-md-4 d-flex flex-wrap gap-2 justify-content-md-end align-items-start">
            {isOpen && (
              <>
                <ActionButton
                  Icon={CheckCircle}
                  disabled={isActivating}
                  label={isActivating ? "Activating..." : "Approve"}
                  onClick={() => updateStatus(candidate, 'approved')}
                  variant="approve"
                  size="sm"
                />
              </>
            )}
            <ActionButton
              Icon={XCircle}
              disabled={isDeactivating}
              label={isDeactivating ? "Deactivating..." : "Reject"}
              onClick={() => updateStatus(candidate, 'rejected')}
              variant="reject"
              size="sm"
            />


            {isReadyToAssign && (
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

const RecruitersView = ({ recruiters, candidates, openDetailsModal, isLoading, error, refetchData, toggleRecruiterActive }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate pagination
  const totalPages = Math.ceil(recruiters.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecruiters = recruiters.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when recruiters list changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [recruiters.length, currentPage, totalPages]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalRecruiters = recruiters.length;
  const activeRecruiters = recruiters.filter(r => r.active !== false).length;
  const inactiveRecruiters = recruiters.filter(r => r.active === false).length;

  return (
    <div className="recruiters-view">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#4F46E5', fontSize: '1.75rem' }}>
            Recruiter List
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Total: {recruiters.length} recruiters</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small fw-medium">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="form-select form-select-sm border-0 shadow-sm"
              style={{ width: '70px', backgroundColor: '#f8fafc', borderRadius: '8px', fontWeight: '600' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
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
      </div>

      <div className="metrics-grid">
        <MetricCard title="Total Recruiters" value={totalRecruiters} color="bg-indigo-100 text-indigo-800" Icon={Briefcase} />
        <MetricCard title="Active" value={activeRecruiters} color="bg-green-100 text-green-800" Icon={CheckCircle} />
        <MetricCard title="Inactive" value={inactiveRecruiters} color="bg-red-100 text-red-800" Icon={XCircle} />
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
        {currentRecruiters.map(recruiter => (
          <div key={recruiter.id} className="col-12 col-md-6">
            <RecruiterCard
              recruiter={recruiter}
              candidates={candidates}
              openDetailsModal={openDetailsModal}
              toggleRecruiterActive={toggleRecruiterActive}
            />
          </div>
        ))}
      </div>

      {recruiters.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={recruiters.length}
        />
      )}
    </div>
  );
};

const RecruiterCard = ({ recruiter, candidates, openDetailsModal, toggleRecruiterActive }) => {
  const assignedCount = candidates.filter(c => c.recruiterId === recruiter.id).length;
  const isAssigned = assignedCount > 0;
  const isActive = recruiter.active !== false; // Default to true if not specified

  return (
    <div className="card border-0 shadow-sm h-100" style={{ borderLeft: `4px solid #8B5CF6` }}>
      <div className="card-body p-4 d-flex flex-column">
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="flex-grow-1">
              <div className="d-flex align-items-center mb-2">
                <h5 className="fw-bold text-dark mb-0 me-2">{recruiter.email}</h5>
                <span
                  className="badge px-2 py-1 fw-semibold"
                  style={{
                    backgroundColor: isActive ? '#D1FAE5' : '#FEE2E2',
                    color: isActive ? '#065F46' : '#991B1B',
                    fontSize: '0.7rem'
                  }}
                >
                  {isActive ? '● Active' : '● Inactive'}
                </span>
              </div>
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

        <div className="pt-3 border-top d-flex justify-content-between gap-2">
          <div className="d-flex gap-2">
            {/* Activate/Deactivate Button */}
            {isActive ? (
              <button
                onClick={() => toggleRecruiterActive(recruiter, false)}
                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 px-2"
                style={{ fontSize: '0.8rem' }}
              >
                <XCircle className="w-4 h-4" style={{ width: '14px', height: '14px' }} />
                Deactivate
              </button>
            ) : (
              <button
                onClick={() => toggleRecruiterActive(recruiter, true)}
                className="btn btn-sm btn-outline-success d-flex align-items-center gap-1 px-2"
                style={{ fontSize: '0.8rem' }}
              >
                <CheckCircle className="w-4 h-4" style={{ width: '14px', height: '14px' }} />
                Activate
              </button>
            )}
          </div>

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
    if (!selectedCandidateId || !selectedRecruiterId) {
      setAssignError("Please select both a candidate and a recruiter.");
      return;
    }

    const candidate = candidates.find(c => c.id === selectedCandidateId);
    const recruiter = recruiters.find(r => r.id === selectedRecruiterId);

    // The API expects the candidate's profile_id and the recruiter's user_id.
    if (!candidate?.profile_id) {
      setAssignError("Selected candidate does not have a profile_id for assignment.");
      return;
    }

    if (!recruiter) {
      setAssignError("Selected recruiter not found.");
      return;
    }

    try {
      setIsAssigning(true);
      setAssignError(null);
      await onAssign(candidate.profile_id, recruiter);
      onClose();
    } catch (error) {
      console.error("Assignment failed:", error);
      setAssignError(`Failed to assign: ${error.message || 'Unknown error'}`);
    } finally {
      setIsAssigning(false);
    }
  };

  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId);
  const selectedRecruiter = recruiters.find(r => r.id === selectedRecruiterId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {assignError && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#FEF2F2',
          border: '1px solid #FEE2E2',
          borderRadius: '0.5rem',
          display: 'flex',
          gap: '0.75rem',
          maxHeight: '140px'
        }}>
          <AlertTriangle className="w-5 h-5" style={{ color: '#EF4444', flexShrink: 0 }} />
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#991B1B' }}>Assignment Error</p>
            <div style={{
              maxHeight: '80px',
              overflowY: 'auto',
              fontSize: '0.8125rem',
              color: '#B91C1C',
              marginTop: '0.25rem',
              wordBreak: 'break-word',
              lineHeight: '1.4'
            }}>
              {assignError}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
          Select Candidate
        </label>
        <select
          value={selectedCandidateId}
          onChange={(e) => setSelectedCandidateId(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid #D1D5DB',
            fontSize: '0.875rem',
            backgroundColor: '#F9FAFB',
            color: '#111827'
          }}
          disabled={!!initialCandidate || unassignedApprovedCandidates.length === 0}
        >
          {initialCandidate ? (
            <option value={initialCandidate.id}>{initialCandidate.email}</option>
          ) : (
            <>
              <option value="">
                {unassignedApprovedCandidates.length === 0
                  ? 'No Approved Candidates available'
                  : 'Choose an Approved Candidate'}
              </option>
              {unassignedApprovedCandidates.map(c => (
                <option key={c.id} value={c.id}>
                  {c.email} - {c.first_name} {c.last_name}
                </option>
              ))}
            </>
          )}
        </select>
        {selectedCandidate && (
          <div style={{ padding: '0.75rem', backgroundColor: '#EEF2FF', borderRadius: '0.5rem', border: '1px solid #E0E7FF' }}>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#4338CA' }}>
              <strong>Profile ID:</strong> {selectedCandidate.profile_id}
            </p>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
          Select Recruiter
        </label>
        <select
          value={selectedRecruiterId}
          onChange={(e) => setSelectedRecruiterId(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid #D1D5DB',
            fontSize: '0.875rem',
            backgroundColor: '#F9FAFB',
            color: '#111827'
          }}
          disabled={recruiters.length === 0}
        >
          <option value="">
            {recruiters.length === 0 ? 'No Recruiters available' : 'Choose a Recruiter'}
          </option>
          {recruiters.map(r => (
            <option key={r.id} value={r.id}>
              {r.name || r.user_name || r.email} - {r.department_display || r.department}
            </option>
          ))}
        </select>
        {selectedRecruiter && (
          <div style={{ padding: '0.75rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem', border: '1px solid #DCFCE7' }}>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#15803D' }}>
              <strong>Recruiter:</strong> {selectedRecruiter.name || selectedRecruiter.user_name}
            </p>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#15803D' }}>
              <strong>Available Slots:</strong> {selectedRecruiter.available_slots || 'N/A'}
            </p>
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.75rem',
        paddingTop: '1rem',
        borderTop: '1px solid #F3F4F6',
        marginTop: '0.5rem'
      }}>
        <button
          onClick={onClose}
          disabled={isAssigning}
          style={{
            padding: '0.625rem 1.25rem',
            borderRadius: '0.5rem',
            border: '1px solid #D1D5DB',
            backgroundColor: 'white',
            color: '#374151',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: isAssigning ? 'not-allowed' : 'pointer',
            opacity: isAssigning ? 0.6 : 1
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleAssignment}
          disabled={!selectedCandidateId || !selectedRecruiterId || isAssigning}
          style={{
            padding: '0.625rem 1.25rem',
            borderRadius: '0.5rem',
            border: 'none',
            backgroundColor: '#4F46E5',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: (!selectedCandidateId || !selectedRecruiterId || isAssigning) ? 'not-allowed' : 'pointer',
            opacity: (!selectedCandidateId || !selectedRecruiterId || isAssigning) ? 0.6 : 1
          }}
        >
          {isAssigning ? <Loader className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
          {isAssigning ? "Assigning..." : "Confirm Assignment"}
        </button>
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

// --- SUBSCRIPTION RELATED VIEWS ---

const PlanCard = ({ plan }) => {
  const isBase = plan.plan_type === 'base';
  const isActive = plan.is_active !== false;

  return (
    <div className="card border-0 shadow-sm h-100" style={{ borderLeft: `4px solid ${isBase ? '#4F46E5' : '#10B981'}` }}>
      <div className={`card-header text-center py-2 ${isBase ? 'bg-indigo-600' : 'bg-success'} text-white`}>
        <small className="fw-bold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
          {isBase ? 'Base Plan' : 'Add-on Plan'}
        </small>
      </div>

      <div className="card-body p-4 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="fw-bold text-dark mb-2">{plan.name}</h5>
            <span
              className="badge px-2 py-1"
              style={{
                backgroundColor: isActive ? '#D1FAE5' : '#FEE2E2',
                color: isActive ? '#065F46' : '#991B1B',
                fontSize: '0.7rem'
              }}
            >
              {isActive ? '● Active' : '● Inactive'}
            </span>
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex align-items-baseline">
            <span className="fs-2 fw-bold" style={{ color: '#4F46E5' }}>${plan.price || plan.base_price}</span>
            <span className="text-muted ms-2">/{plan.billing_cycle || 'month'}</span>
          </div>
        </div>

        <p className="text-muted small mb-3">
          {plan.description || "Professional subscription plan with full access to features."}
        </p>

        {(plan.features || ['Unlimited Access', 'Premium Support', 'Advanced Analytics']).length > 0 && (
          <div className="mb-3">
            <p className="small fw-semibold text-muted mb-2">Features:</p>
            <ul className="list-unstyled mb-0">
              {(plan.features || ['Unlimited Access', 'Premium Support', 'Advanced Analytics']).slice(0, 3).map((feature, idx) => (
                <li key={idx} className="small mb-2 d-flex align-items-start">
                  <CheckCircle className="text-success me-2 flex-shrink-0" style={{ width: '14px', height: '14px', marginTop: '2px' }} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-3 border-top">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">ID: {plan.id?.substring(0, 8)}</small>
            <Layers className="text-muted" style={{ width: '16px', height: '16px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};


// --- SUBSCRIPTION RELATED VIEWS ---

const PlansView = ({ plans, isLoading, error, refetchData }) => {
  const basePlansCount = plans.filter(p => p.plan_type === 'base').length;
  const addonPlansCount = plans.filter(p => p.plan_type === 'addon').length;
  const activePlansCount = plans.filter(p => p.is_active !== false).length;

  return (
    <div className="plans-view p-3">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom ">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#4F46E5', fontSize: '1.75rem' }}>
            Subscription Plans
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Total: {plans.length} plans</p>
        </div>
        <button
          onClick={refetchData}
          disabled={isLoading}
          className="btn d-flex align-items-center gap-2 px-4 py-2 fw-semibold"
          style={{
            backgroundColor: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '0.9rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(79, 70, 229, 0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#4338CA';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#4F46E5';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(79, 70, 229, 0.2)';
          }}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} style={{ width: '18px', height: '18px' }} />
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="metrics-grid">
        <MetricCard title="Base Plans" value={basePlansCount} color="bg-blue-100 text-blue-800" Icon={Layers} />
        <MetricCard title="Add-on Plans" value={addonPlansCount} color="bg-green-100 text-green-800" Icon={Zap} />
        <MetricCard title="Active Plans" value={activePlansCount} color="bg-indigo-100 text-indigo-800" Icon={CheckCircle} />
      </div>

      {isLoading && <div className="text-center p-4 text-indigo-600"><Loader className="w-6 h-6 inline-block animate-spin mr-2" /> Loading plans...</div>}
      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Error loading data: {error}</div>}

      <div className="row g-4 mt-2">
        {plans.length === 0 && !isLoading && !error && (
          <div className="col-12">
            <div className="text-center p-5 bg-light rounded-3 border border-2 border-dashed" style={{ borderColor: '#E5E7EB' }}>
              <Layers className="w-12 h-12 mx-auto mb-3 opacity-25" style={{ color: '#6B7280' }} />
              <p className="text-muted mb-0 fw-semibold">No plans found</p>
              <p className="text-muted small mb-0">Subscription plans will appear here once created</p>
            </div>
          </div>
        )}
        {plans.map(plan => (
          <div key={plan.id} className="col-12 col-md-6 col-xl-4">
            <PlanCard plan={plan} />
          </div>
        ))}
      </div>
    </div>
  );
};

const SubscriptionCard = ({ subscription }) => {
  const isActive = subscription.status === 'active';
  const userEmail = subscription.user_email || subscription.profile?.email || subscription.user_subscription?.user_email || 'N/A';
  const planName = subscription.plan?.name || subscription.plan_name || subscription.plan_details?.name || 'N/A';
  const startDate = subscription.started_at ? new Date(subscription.started_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A';
  const nextBilling = subscription.next_billing_date || 'N/A';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 transition-all hover:shadow-md hover:border-indigo-100">
      <div className="row align-items-center">
        <div className="col-lg-5 mb-3 mb-lg-0">
          <div className="d-flex align-items-center mb-1">
            <div className={`p-2 rounded-lg me-3 ${isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400'}`}>
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h6 className="mb-0 fw-bold text-gray-900">{userEmail}</h6>
              <span className="text-xs text-muted">ID: {subscription.id?.substring(0, 13)}...</span>
            </div>
          </div>
        </div>

        <div className="col-lg-3 mb-3 mb-lg-0">
          <div className="d-flex flex-column">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Plan Level</span>
            <div className="d-flex align-items-center">
              <span className="fw-bold text-indigo-600">{planName}</span>
              <span className={`ms-2 badge rounded-pill ${isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'} px-2`} style={{ fontSize: '0.6rem' }}>
                {subscription.status}
              </span>
            </div>
          </div>
        </div>

        <div className="col-lg-2 mb-3 mb-lg-0">
          <div className="d-flex flex-column text-start text-lg-center">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Cycle Details</span>
            <span className="text-sm fw-medium text-gray-700">Starts: {startDate}</span>
            <span className="text-xs text-muted">Next: {nextBilling}</span>
          </div>
        </div>

        <div className="col-lg-2 d-flex flex-column align-items-lg-end">
          <div className="text-end">
            <span className="fs-5 fw-bold text-dark">${subscription.price}</span>
            <span className="text-muted small">/mo</span>
          </div>
          {subscription.razorpay_subscription_id && (
            <span className="text-xs text-indigo-400 font-medium">#{subscription.razorpay_subscription_id.substring(0, 8)}</span>
          )}
        </div>
      </div>
    </div>
  );
};


const SubscriptionsView = ({ subscriptions, isLoading, error, refetchData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const activeCount = subscriptions.filter(s => s.status === 'active').length;
  const inactiveCount = subscriptions.filter(s => s.status === 'inactive').length;
  const totalRevenue = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + parseFloat(s.price || 0), 0);

  // Calculate pagination
  const totalPages = Math.ceil(subscriptions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubscriptions = subscriptions.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when subscriptions list changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [subscriptions.length, currentPage, totalPages]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="subscriptions-view p-3">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#4F46E5', fontSize: '1.75rem' }}>
            User Subscriptions
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Total: {subscriptions.length} subscriptions</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small fw-medium">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="form-select form-select-sm border-0 shadow-sm"
              style={{ width: '70px', backgroundColor: '#f8fafc', borderRadius: '8px', fontWeight: '600' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
          <button
            onClick={refetchData}
            disabled={isLoading}
            className="btn d-flex align-items-center gap-2 px-4 py-2 fw-semibold"
            style={{
              backgroundColor: '#4F46E5',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#4338CA';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#4F46E5';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(79, 70, 229, 0.2)';
            }}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} style={{ width: '18px', height: '18px' }} />
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <MetricCard title="Active Subscriptions" value={activeCount} color="bg-green-100 text-green-800" Icon={CheckCircle} />
        <MetricCard title="Inactive Subscriptions" value={inactiveCount} color="bg-gray-100 text-gray-800" Icon={XCircle} />
        <MetricCard title="Monthly Revenue" value={`$${totalRevenue.toFixed(2)}`} color="bg-indigo-100 text-indigo-800" Icon={DollarSign} />
      </div>

      {isLoading && <div className="text-center p-4 text-indigo-600"><Loader className="w-6 h-6 inline-block animate-spin mr-2" /> Loading subscriptions...</div>}
      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Error loading data: {error}</div>}

      <div className="d-flex flex-column gap-3 mt-4">
        {subscriptions.length === 0 && !isLoading && !error && (
          <div className="text-center p-5 bg-light rounded-3 border border-2 border-dashed" style={{ borderColor: '#E5E7EB' }}>
            <List className="w-12 h-12 mx-auto mb-3 opacity-25" style={{ color: '#6B7280' }} />
            <p className="text-muted mb-0 fw-semibold">No subscriptions found</p>
            <p className="text-muted small mb-0">User subscriptions will appear here once activated</p>
          </div>
        )}
        {currentSubscriptions.map(subscription => (
          <SubscriptionCard key={subscription.id} subscription={subscription} />
        ))}

        {subscriptions.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={subscriptions.length}
          />
        )}
      </div>
    </div>
  );
};

const BillingCard = ({ bill }) => {
  const isSuccess = bill.status === 'success';
  const userEmail = bill.user_subscription?.user_email || bill.profile?.email || 'N/A';
  const transactionDate = new Date(bill.created_at).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 transition-all hover:shadow-md">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-3 mb-lg-0">
          <div className="d-flex align-items-center">
            <div className={`p-2.5 rounded-xl me-3 ${isSuccess ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h6 className="mb-0 fw-bold text-gray-900">{userEmail}</h6>
              <div className="d-flex align-items-center mt-1">
                <span className="text-xs text-muted">{transactionDate}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className={`text-xs font-semibold ${isSuccess ? 'text-emerald-600' : 'text-amber-600'}`}>{bill.status.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-3 mb-lg-0">
          <div className="d-flex flex-column">
            <span className="text-xs text-muted mb-1">Transaction Ref</span>
            <code className="text-indigo-400 small">{bill.id?.substring(0, 16)}</code>
            {bill.razorpay_payment_id && (
              <span className="text-xs text-gray-400 mt-1">RZP: {bill.razorpay_payment_id.substring(0, 12)}</span>
            )}
          </div>
        </div>

        <div className="col-lg-2 d-flex flex-column align-items-lg-end text-lg-end">
          <div className="fs-4 fw-bold text-dark">${bill.amount}</div>
          {isSuccess ? (
            <div className="d-inline-flex align-items-center text-xs text-emerald-600 fw-medium">
              <CheckCircle className="w-3 h-3 me-1" />
              Verified
            </div>
          ) : (
            <div className="d-inline-flex align-items-center text-xs text-amber-600 fw-medium">
              <AlertTriangle className="w-3 h-3 me-1" />
              Pending
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const BillingHistoryView = ({ history, isLoading, error, refetchData }) => {
  const successCount = history.filter(h => h.status === 'success').length;
  const pendingCount = history.filter(h => h.status === 'pending').length;
  const totalAmount = history
    .filter(h => h.status === 'success')
    .reduce((sum, h) => sum + parseFloat(h.amount || 0), 0);

  const handleExportCSV = () => {
    if (history.length === 0) return;
    const headers = ["ID", "User Email", "Amount", "Status", "Date", "Razorpay ID"];
    const rows = history.map(bill => [
      bill.id,
      bill.user_subscription?.user_email || 'N/A',
      bill.amount,
      bill.status,
      new Date(bill.created_at).toLocaleString(),
      bill.razorpay_payment_id || 'N/A'
    ]);

    let csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `billing_history_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="billing-view p-3">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#4F46E5', fontSize: '1.75rem' }}>
            Billing History
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Total: {history.length} transactions</p>
        </div>
        <div className="d-flex gap-2">
          <button
            onClick={handleExportCSV}
            disabled={history.length === 0}
            className="btn btn-outline-secondary d-flex align-items-center gap-2 px-3 py-2 fw-semibold"
            style={{
              borderRadius: '12px',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Download className="w-4 h-4" style={{ width: '18px', height: '18px' }} />
            Export CSV
          </button>
          <button
            onClick={refetchData}
            disabled={isLoading}
            className="btn d-flex align-items-center gap-2 px-4 py-2 fw-semibold"
            style={{
              backgroundColor: '#4F46E5',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#4338CA';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#4F46E5';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(79, 70, 229, 0.2)';
            }}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} style={{ width: '18px', height: '18px' }} />
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <MetricCard title="Successful Payments" value={successCount} color="bg-green-100 text-green-800" Icon={CheckCircle} />
        <MetricCard title="Pending Payments" value={pendingCount} color="bg-yellow-100 text-yellow-800" Icon={Zap} />
        <MetricCard title="Total Revenue" value={`$${totalAmount.toFixed(2)}`} color="bg-indigo-100 text-indigo-800" Icon={DollarSign} />
      </div>

      {isLoading && <div className="text-center p-4 text-indigo-600"><Loader className="w-6 h-6 inline-block animate-spin mr-2" /> Loading billing records...</div>}
      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Error loading data: {error}</div>}

      <div className="d-flex flex-column gap-3 mt-4">
        {history.length === 0 && !isLoading && !error && (
          <div className="text-center p-5 bg-light rounded-3 border border-2 border-dashed" style={{ borderColor: '#E5E7EB' }}>
            <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-25" style={{ color: '#6B7280' }} />
            <p className="text-muted mb-0 fw-semibold">No billing history found</p>
            <p className="text-muted small mb-0">Payment transactions will appear here once processed</p>
          </div>
        )}
        {history.map(bill => (
          <BillingCard key={bill.id} bill={bill} />
        ))}
      </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

export default function Admin() {
  const primaryColor = '#4F46E5';
  const paleBackground = '#F0F8FF';
  const ADMIN_BASE_URL = `${base_url}/api/users/admin`
  const [activeView, setActiveView] = useState('candidates');
  const [candidates, setCandidates] = useState(initialCandidates);
  const [recruiters, setRecruiters] = useState(initialRecruiters);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null); // Candidate to assign
  const [selectedCandidateId, setSelectedCandidateId] = useState(null); // Candidate to view
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Subscription related states
  const [plans, setPlans] = useState([]);
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [billingHistory, setBillingHistory] = useState([]);
  const [isSubsLoading, setIsSubsLoading] = useState(false);
  const [subsError, setSubsError] = useState(null);
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
  const [activatingCandidateId, setActivatingCandidateId] = useState(null);
  const [deactivatingCandidateId, setDeactivatingCandidateId] = useState(null);

  useEffect(() => {
    // Prevent double fetch in React Strict Mode
    if (hasFetchedRef.current) return;

    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError("You are not logged in. Redirecting to login...");
        setLoading(false);
        setTimeout(() => navigate('/admin-login'), 2000);
        return;
      }

      try {
        const storedToken = localStorage.getItem("accessToken");
        if (!storedToken) {
          setError("Not logged in.");
          navigate("/admin-login");
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
        adminUser.image = `https://placehold.co/100x100/4F46E5/ffffff?text=${profile.first_name[0]}${profile.last_name[0]}`;
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

  // Calculate assigned candidates for the details modal
  const assignedCandidatesForDetails = useMemo(() => {
    if (!selectedRecruiter) return [];
    return candidates.filter(c => c.recruiterId === selectedRecruiter.id);
  }, [candidates, selectedRecruiter]);

  const fetchSubscriptionsData = useCallback(async () => {
    const storedToken = localStorage.getItem("accessToken");
    setIsSubsLoading(true);
    setSubsError(null);
    try {
      // 1. Fetch Plans
      const plansRes = await fetch(`${base_url}/api/subscriptions/plans/`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      if (plansRes.ok) {
        const plansData = await plansRes.json();
        setPlans(plansData);
      }

      // 2. Fetch User Subscriptions
      const subsRes = await fetch(`${base_url}/api/subscriptions/admin/subscriptions/`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      if (subsRes.ok) {
        const subsData = await subsRes.json();
        setAllSubscriptions(subsData);
      }

      // 3. Fetch Billing History
      const billingRes = await fetch(`${base_url}/api/subscriptions/billing-history/`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      if (billingRes.ok) {
        const billingData = await billingRes.json();
        setBillingHistory(billingData);
      }

    } catch (err) {
      console.error("Failed to fetch subscription data:", err);
      setSubsError("Failed to load subscription data.");
    } finally {
      setIsSubsLoading(false);
    }
  }, []);

  // Effect to fetch subscription data when relevant view is active
  useEffect(() => {
    if (['plans', 'subscriptions', 'billing'].includes(activeView)) {
      fetchSubscriptionsData();
    }
  }, [activeView, fetchSubscriptionsData]);

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
          fetchedCandidates.push({
            ...user,
            // Assign default status and recruiterId
            status: user.status || (user.active ? 'approved' : 'open'),
            recruiterId: user.recruiter_info?.id || null,
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
          return existing ? { ...fetched, status: fetched.status, recruiterId: fetched.recruiterId } : fetched;
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

    // Determine the action based on the new status
    // 'approved' -> 'activate', 'rejected' -> 'deactivate'
    const action = newStatus === "approved" ? "activate" : "deactivate";
    if (action === "activate") {
      setActivatingCandidateId(candidate.id);
    } else if (action === "deactivate") {
      setDeactivatingCandidateId(candidate.id);
    }
    const url = `${ADMIN_BASE_URL}/candidates/${profileId}/${action}/`;

    try {
      const storedToken = localStorage.getItem("accessToken");
      if (!storedToken) {
        setError("Not logged in.");
        return;
      }

      // Show loading state
      setCandidates(prev =>
        prev.map(c => (c.id === candidate.id ? { ...c, status: 'updating...' } : c))
      );

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} candidate`);
      }

      // Update local state on success
      // setCandidates(prev =>
      //   prev.map(c => (c.id === candidate.id ? { ...c, status: newStatus, active: newStatus === "approved" } : c))
      // );
      if (action === "activate") {
        setActivatingCandidateId(null);
      } else if (action === "deactivate") {
        setDeactivatingCandidateId(null);
      }

      // Refresh data to reflect status changes
      fetchUsers();

      console.log(`Successfully updated candidate ${profileId} to ${newStatus}`);
    } catch (err) {
      console.error(`Failed to update status for ${profileId}:`, err);
      // Revert status or show error message
      // setCandidates(prev =>
      //   prev.map(c => (c.id === candidate.id ? { ...c, status: candidate.status } : c)) // Revert
      // );
      setError(`Failed to update candidate status: ${err.message}`);
      if (action === "activate") {
        setActivatingCandidateId(null);
      } else if (action === "deactivate") {
        setDeactivatingCandidateId(null);
      }
    }
  }, [ADMIN_BASE_URL]);

  /**
   * Assigns a candidate to a recruiter using the provided API endpoint.
   * @param {string} candidateProfileId - The profile_id of the candidate.
      * @param {number} recruiterUserId - The user_id of the recruiter.
      */
  const handleAssignCandidate = useCallback(async (candidateProfileId, recruiter) => {
    const url = `${API_BASE_URL}/recruiters/assign/`;

    const payload = {
      profile: candidateProfileId,
      recruiter_id: recruiter.id,
      recruiter: recruiter
    };

    try {
      // Get fresh token from localStorage
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      const response = await fetchWithRetry(url, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Assuming success returns the updated assignment or a confirmation
      const result = await response.json();
      console.log(`Successfully assigned profile ${candidateProfileId} to recruiter ${recruiter.id}`, result);

      fetchUsers()

    } catch (err) {
      console.error("API Assignment failed:", err);
      throw new Error(`Assignment failed: ${err.message}`);
    }
  }, []);

  /**
   * Toggle candidate active/inactive status
   * @param {object} candidate - The candidate object
      * @param {boolean} activate - true to activate, false to deactivate
      */
  const toggleCandidateActive = useCallback(async (candidate, activate) => {
    const profileId = candidate.profile_id;
    if (!profileId) {
      alert("Cannot update status: Candidate profile ID is missing.");
      return;
    }

    const action = activate ? "activate" : "deactivate";
    const url = `${ADMIN_BASE_URL}/candidates/${profileId}/${action}/`;

    try {
      const storedToken = localStorage.getItem("accessToken");
      if (!storedToken) {
        setError("Not logged in.");
        navigate("/admin-login");
        return;
      }

      // Show loading state
      // setCandidates(prev =>
      //   prev.map(c => (c.id === candidate.id ? { ...c, active: 'updating...' } : c))
      // );

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} candidate`);
      }

      // Update local state on success
      // setCandidates(prev =>
      //   prev.map(c => (c.id === candidate.id ? { ...c, active: activate } : c))
      // );

      console.log(`Successfully ${activate ? 'activated' : 'deactivated'} candidate ${profileId}`);
    } catch (err) {
      console.error(`Failed to ${action} candidate:`, err);
      // Revert to previous state
      // setCandidates(prev =>
      //   prev.map(c => (c.id === candidate.id ? { ...c, active: candidate.active } : c))
      // );
      alert(`Failed to ${action} candidate: ${err.message}`);
    }
  }, [ADMIN_BASE_URL, navigate]);

  /**
   * Toggle recruiter active/inactive status
   * @param {object} recruiter - The recruiter object
      * @param {boolean} activate - true to activate, false to deactivate
      */
  const toggleRecruiterActive = useCallback(async (recruiter, activate) => {
    const recruiterId = recruiter.id;
    if (!recruiterId) {
      alert("Cannot update status: Recruiter ID is missing.");
      return;
    }

    const action = activate ? "activate" : "deactivate";
    const url = `${API_BASE_URL}/recruiters/${recruiterId}/${action}/`;

    try {
      const storedToken = localStorage.getItem("accessToken");
      if (!storedToken) {
        setError("Not logged in.");
        navigate("/admin-login");
        return;
      }

      // Show loading state
      setRecruiters(prev =>
        prev.map(r => (r.id === recruiterId ? { ...r, active: 'updating...' } : r))
      );

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} recruiter`);
      }

      // Update local state on success
      setRecruiters(prev =>
        prev.map(r => (r.id === recruiterId ? { ...r, active: activate } : r))
      );

      console.log(`Successfully ${activate ? 'activated' : 'deactivated'} recruiter ${recruiterId}`);
    } catch (err) {
      console.error(`Failed to ${action} recruiter:`, err);
      // Revert to previous state
      setRecruiters(prev =>
        prev.map(r => (r.id === recruiterId ? { ...r, active: recruiter.active } : r))
      );
      alert(`Failed to ${action} recruiter: ${err.message}`);
    }
  }, [API_BASE_URL, navigate]);

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
    navigate('/admin-login');
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
                openAssignModal={openAssignModal}
                recruiters={recruiters}
                isLoading={isLoading}
                error={activeView === 'candidates' ? error : null}
                refetchData={fetchUsers}
                activatingCandidateId={activatingCandidateId}
                deactivatingCandidateId={deactivatingCandidateId}
                onViewDetails={(id) => {
                  setSelectedCandidateId(id);
                  setActiveView('candidate-details');
                }}
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
                toggleRecruiterActive={toggleRecruiterActive}
              />
            )}
            {activeView === 'plans' && (
              <PlansView
                plans={plans}
                isLoading={isSubsLoading}
                error={subsError}
                refetchData={fetchSubscriptionsData}
              />
            )}
            {activeView === 'subscriptions' && (
              <SubscriptionsView
                subscriptions={allSubscriptions}
                isLoading={isSubsLoading}
                error={subsError}
                refetchData={fetchSubscriptionsData}
              />
            )}
            {activeView === 'billing' && (
              <BillingHistoryView
                history={billingHistory}
                isLoading={isSubsLoading}
                error={subsError}
                refetchData={fetchSubscriptionsData}
              />
            )}
            {activeView === 'candidate-details' && selectedCandidateId && (
              <CandidateDetails
                candidateId={selectedCandidateId}
                onBack={() => {
                  setActiveView('candidates');
                  setSelectedCandidateId(null);
                }}
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