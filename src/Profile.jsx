import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { base_url } from "./commonAPI's.json";
import CredentialForm from './CredentialForm';
import ClientIntakeForm from './ClientIntakeForm';



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
const FileText = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
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
}
/* New Payment Modal Styles */
.payment-modal-overlay {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 1050;
  transition: all 0.3s ease;
}
.payment-card {
  border: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 90vh; /* Prevent overflow on small screens */
}

/* Client Intake Sheet Message - Enhanced UI */
.client-intake-sheet-message {
  background: linear-gradient(to right, #EFF6FF 0%, #DBEAFE 100%);
  border-left: 4px solid #4f46e5;
  padding: 1.25rem 1.5rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #E0E7FF;
}

.client-intake-sheet-message::before {
  content: "ℹ️";
  font-size: 1.25rem;
  flex-shrink: 0;
  filter: grayscale(0);
}

.client-intake-sheet-message p {
  margin: 0;
  color: #1e293b;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.2px;
  line-height: 1.6;
  text-align: left;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .client-intake-sheet-message {
    padding: 1rem;
    gap: 0.5rem;
  }
  
  .client-intake-sheet-message::before {
    font-size: 1.1rem;
  }
  
  .client-intake-sheet-message p {
    font-size: 0.85rem;
  }
}

.payment-header {
  background: #ffffff;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  color: #1f2937;
  text-align: center;
  position: relative;
  flex-shrink: 0;
}
.payment-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.payment-amount-large {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0.25rem 0;
  color: #4f46e5;
  letter-spacing: -1px;
}
.payment-body {
  padding: 1.5rem;
  background-color: #ffffff;
  /* overflow-y: auto; removed global scroll */
  flex-grow: 1;
}
.service-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.service-item:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}
.service-item.selected {
  border-color: #4f46e5;
  background-color: #eff6ff;
  box-shadow: 0 0 0 1px #4f46e5;
}
.service-info h5 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1e293b;
}
.service-info p {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0;
}
.service-price {
  font-weight: 700;
  color: #4f46e5;
  font-size: 1.1rem;
}
.cart-summary {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px dashed #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.1rem;
  color: #1e293b;
}
.payment-input-group {
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}
.payment-input-group:focus-within {
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  transform: translateY(-1px);
}
.payment-input-icon {
  background-color: #f8fafc;
  border: none;
  color: #64748b;
  padding-left: 1rem;
  padding-right: 0.75rem;
}
.payment-input {
  border: none !important;
  font-size: 1.05rem;
  font-weight: 500;
  color: #1e293b;
  padding: 0.8rem 0.5rem;
  background-color: #f8fafc;
}
.payment-input:focus {
  background-color: #ffffff;
  box-shadow: none;
}
.payment-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}
.secure-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px dashed #e2e8f0;
}
@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

/* Custom Scrollbar Styles */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.service-list-container {
  max-height: 280px;
  overflow-y: auto;
  padding-right: 0.5rem; /* space for scrollbar */
  margin-right: -0.5rem; /* compensate for padding */
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
            className={`form-control form-control-lg ${error ? 'is-invalid border-danger' : 'border-start-0'
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
const AdminSidebar = ({ fullName, onLogout, onCredential, onIntake, onToggleEdit, isEditing, onDeleteProfile, onUpgradeProfile, isSubscribed, hasAddonPlans }) => {

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

        {/* client intake sheet */}
        <SidebarButton
          Icon={FileText}
          label="Client Intake Sheet"
          onClick={onIntake}
          variant="normal"
        />

        {/* Upgrade Profile - Show for non-subscribers OR Add Services for subscribers with addon plans */}
        {!isSubscribed ? (
          <SidebarButton
            Icon={Upgrade}
            label="Upgrade Profile"
            onClick={onUpgradeProfile}
            variant="normal"
          />
        ) : hasAddonPlans ? (
          <SidebarButton
            Icon={Upgrade}
            label="Add Services"
            onClick={onUpgradeProfile}
            variant="normal"
          />
        ) : null}

        {/* Credential sheet*/}
        {!isSubscribed && <SidebarButton
          Icon={Target}
          label="Credential Sheet"
          onClick={onCredential}
          variant="normal"
        />}


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

// Subscription Status Banner with Timer, Details and Cancel Button
const SubscriptionStatusBanner = ({ isSubscribed, subscriptionData, onCancelSubscription, isCancelling }) => {
  const [timeRemaining, setTimeRemaining] = React.useState('');

  React.useEffect(() => {
    // Only show if user has active subscription
    if (!isSubscribed) {
      return;
    }

    const calculateTimeRemaining = () => {
      if (!subscriptionData.next_billing_date) return '';

      const now = new Date();
      const billingDate = new Date(subscriptionData.next_billing_date);
      const diff = billingDate - now;

      if (diff <= 0) return 'Billing due';

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) return `${days}d ${hours}h remaining`;
      if (hours > 0) return `${hours}h ${minutes}m remaining`;
      return `${minutes}m remaining`;
    };

    // Update timer every minute
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 60000);

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());

    return () => clearInterval(timer);
  }, [subscriptionData.next_billing_date, isSubscribed]);

  // Don't show banner if no subscription
  if (!isSubscribed) {
    return null;
  }

  const statusColors = {
    active: { bg: '#10B981', border: '#059669', text: 'Active Subscription' },
    past_due: { bg: '#EF4444', border: '#DC2626', text: 'Payment Overdue' },
    paused: { bg: '#F59E0B', border: '#D97706', text: 'Subscription Paused' },
    cancelled: { bg: '#6B7280', border: '#4B5563', text: 'Subscription Cancelled' }
  };

  const status = statusColors[subscriptionData.status] || statusColors.active;
  const basePlanName = subscriptionData.base_subscription?.plan_details?.name || 'Base Plan';
  const addons = subscriptionData.addons || [];
  const monthlyCost = parseFloat(subscriptionData.monthly_cost) || 0;

  return (
    <div
      className="mb-4 p-3 rounded-3 border-2"
      style={{
        backgroundColor: status.bg + '10',
        borderLeft: `4px solid ${status.bg}`,
        borderColor: status.border + '40'
      }}
    >
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: status.bg,
              color: 'white'
            }}
          >
            <Upgrade width={20} height={20} />
          </div>
          <div>
            <h6 className="mb-0 fw-bold" style={{ color: status.bg }}>
              {status.text}
            </h6>
            <p className="mb-0 small text-muted">
              Monthly Cost: <strong style={{ color: '#4F46E5' }}>${monthlyCost.toFixed(2)}</strong>
            </p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          {subscriptionData.next_billing_date && (
            <div className="text-end">
              <div className="small text-muted">Next billing</div>
              <div className="fw-bold" style={{ color: status.bg }}>
                {timeRemaining || new Date(subscriptionData.next_billing_date).toLocaleDateString()}
              </div>
            </div>
          )}

          {/* Cancel Subscription Button - Only show for active subscriptions */}
          {subscriptionData.status === 'active' && onCancelSubscription && (
            <button
              onClick={onCancelSubscription}
              disabled={isCancelling}
              className="btn btn-sm btn-outline-danger"
              style={{
                borderRadius: '8px',
                fontSize: '0.8rem',
                padding: '0.4rem 0.8rem'
              }}
            >
              {isCancelling ? 'Cancelling...' : 'Cancel'}
            </button>
          )}
        </div>
      </div>

      {/* Subscription Details */}
      <div className="mt-3 pt-2 border-top">
        {/* Base Plan */}
        <div className="d-flex align-items-center gap-2 mb-2">
          <span
            className="badge"
            style={{
              backgroundColor: '#4F46E5',
              color: 'white',
              fontSize: '0.65rem',
              padding: '0.25rem 0.5rem'
            }}
          >
            BASE
          </span>
          <span className="small fw-semibold text-dark">{basePlanName}</span>
          <span className="small text-muted">
            (${parseFloat(subscriptionData.base_subscription?.price || 0).toFixed(2)}/month)
          </span>
        </div>

        {/* Add-ons */}
        {addons.length > 0 && (
          <div className="mt-2">
            <div className="small text-muted mb-1">Active Add-ons:</div>
            <div className="d-flex flex-wrap gap-2">
              {addons.map((addon, index) => (
                <div
                  key={addon.id || index}
                  className="d-flex align-items-center gap-1 px-2 py-1 rounded"
                  style={{ backgroundColor: '#10B98120', border: '1px solid #10B98140' }}
                >
                  <span
                    className="badge"
                    style={{
                      backgroundColor: '#10B981',
                      color: 'white',
                      fontSize: '0.6rem',
                      padding: '0.15rem 0.35rem'
                    }}
                  >
                    ADD-ON
                  </span>
                  <span className="small fw-medium" style={{ color: '#065F46' }}>
                    {addon.plan_details?.name || 'Add-on Service'}
                  </span>
                  <span className="small text-muted">
                    (${parseFloat(addon.price || 0).toFixed(2)}/mo)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {subscriptionData.marketing_start_date && (
        <div className="mt-2 pt-2 border-top small text-muted">
          Marketing started: {new Date(subscriptionData.marketing_start_date).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

// --- Main Profile Component with admin dashboard layout ---
const Profile = () => {
  const navigate = useNavigate();
  const primaryColor = '#4F46E5';
  const paleBackground = '#F0F8FF';
  const BASE_API_URL = `${base_url}`;

  // Dynamic plans from API (replaces hardcoded AVAILABLE_SERVICES)
  const [availablePlans, setAvailablePlans] = useState([]);
  const [basePlan, setBasePlan] = useState(null);
  const [addonPlans, setAddonPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const plansFetchedRef = useRef(false); // Prevent double API calls

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
  const [selectedServices, setSelectedServices] = useState([]); // Will be set when plans load
  const [cartTotal, setCartTotal] = useState(0);

  // Subscription state
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCancellingSubscription, setIsCancellingSubscription] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [activeSubscriptions, setActiveSubscriptions] = useState([]); // Store created subscription IDs
  const [subscribedPlanIds, setSubscribedPlanIds] = useState([]); // Plan IDs user already has
  const [subscriptionData, setSubscriptionData] = useState({
    status: 'inactive',
    next_billing_date: null,
    marketing_start_date: null,
    recruiter: null,
    monthly_cost: 0,
    base_subscription: null,
    addons: [],
    total_subscriptions: 0,
    active_subscriptions: 0
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: ''
  });

  // Consent checkboxes state
  const [acceptedRefundPolicy, setAcceptedRefundPolicy] = useState(false);
  const [acceptedTermsConditions, setAcceptedTermsConditions] = useState(false);
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  const [showCredentialForm, setShowCredentialForm] = useState(false);
  const [showIntakeForm, setShowIntakeForm] = useState(false);



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
  const hasFetchedRef = useRef(false);
  useEffect(() => {

    const fetchProfile = async () => {
      // Check ref first to prevent double calls in StrictMode
      if (hasFetchedRef.current) return;
      hasFetchedRef.current = true;

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
        const response = await fetch(`${BASE_API_URL}/api/users/me`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) throw new Error("Failed to load profiles");

        const profiles = await response.json();
        const profile = profiles

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

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch subscription plans from API
  const fetchPlans = async () => {
    setLoadingPlans(true);
    try {
      // Fetch base plan (PUBLIC - no auth required)
      const baseResp = await fetch(`${BASE_API_URL}/api/subscriptions/plans/base_plan/`);
      if (baseResp.ok) {
        const baseData = await baseResp.json();
        setBasePlan(baseData);

        // Set base plan as default selected
        setSelectedServices([baseData.id]);
      }

      // Fetch add-on plans (PUBLIC - no auth required)
      const addonsResp = await fetch(`${BASE_API_URL}/api/subscriptions/plans/addons/`);
      if (addonsResp.ok) {
        const addonsData = await addonsResp.json();
        setAddonPlans(addonsData);
      }

    } catch (error) {
      console.error('Error fetching subscription plans:', error);
    } finally {
      setLoadingPlans(false);
    }
  };

  // Combine plans into availablePlans array
  useEffect(() => {
    const plans = [];
    if (basePlan) {
      plans.push({
        id: basePlan.id,
        title: basePlan.name,
        price: parseFloat(basePlan.base_price),
        period: basePlan.billing_cycle || 'month',
        description: basePlan.description || 'Mandatory base subscription for all users',
        isMandatory: basePlan.is_mandatory || true,
        features: basePlan.features || [],
        plan_type: 'base'
      });
    }
    if (addonPlans && addonPlans.length > 0) {
      addonPlans.forEach(addon => {
        plans.push({
          id: addon.id,
          title: addon.name,
          price: parseFloat(addon.base_price),
          period: addon.billing_cycle || 'month',
          description: addon.description || '',
          isMandatory: false,
          features: addon.features || [],
          plan_type: 'addon'
        });
      });
    }
    setAvailablePlans(plans);
  }, [basePlan, addonPlans]);

  // Fetch plans on component mount (with ref to prevent double calls)
  useEffect(() => {
    if (plansFetchedRef.current) return;
    plansFetchedRef.current = true;
    fetchPlans();
  }, []);

  // Fetch subscription summary from API
  const fetchSubscriptionSummary = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      const response = await fetch(`${BASE_API_URL}/api/subscriptions/my-subscriptions/summary/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIsSubscribed(data.active_subscriptions > 0);
        setSubscriptionData({
          status: data.base_subscription?.status || 'inactive',
          next_billing_date: data.next_billing_date || null,
          marketing_start_date: data.base_subscription?.started_at || null,
          recruiter: data.base_subscription?.recruiter || null,
          monthly_cost: data.monthly_cost || 0,
          base_subscription: data.base_subscription || null,
          addons: data.addons || [],
          total_subscriptions: data.total_subscriptions || 0,
          active_subscriptions: data.active_subscriptions || 0
        });

        // Store active subscription IDs for cancellation
        const activeSubIds = [];
        // Store subscribed plan IDs to disable them in the modal
        const subscribedPlanIds = [];

        if (data.base_subscription?.id) {
          activeSubIds.push(data.base_subscription.id);
          if (data.base_subscription.plan) {
            subscribedPlanIds.push(data.base_subscription.plan);
          }
        }
        if (data.addons) {
          data.addons.forEach(addon => {
            if (addon.id) activeSubIds.push(addon.id);
            if (addon.plan) subscribedPlanIds.push(addon.plan);
          });
        }
        setActiveSubscriptions(activeSubIds);
        // Store subscribed plan IDs in a new state
        setSubscribedPlanIds(subscribedPlanIds);
      }
    } catch (error) {
      console.error('Error fetching subscription summary:', error);
    }
  };

  // Fetch subscription summary when profile loads
  useEffect(() => {
    if (profileData) {
      fetchSubscriptionSummary();
    }
  }, [profileData]);

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

  const handleCredential = () => {
    setShowCredentialForm(!showCredentialForm);
    setShowIntakeForm(false);
    setShowPaymentModal(false);
    setIsEditing(false);
  };

  const handleIntake = () => {
    setShowIntakeForm(!showIntakeForm);
    setShowCredentialForm(false);
    setShowPaymentModal(false);
    setIsEditing(false);
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
    setShowPaymentModal(false);
    setShowCredentialForm(false);

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
    const updateUrl = `${BASE_API_URL}/api/users/profiles/${profileId}/`;

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
    const deleteUrl = `${BASE_API_URL}/api/users/profiles/${profileId}/`;

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
    // If not subscribed, show base plan; if subscribed, show add-ons
    if (!isSubscribed && basePlan) {
      setSelectedServices([basePlan.id]);
    } else {
      // For add-ons, start with empty selection
      setSelectedServices([]);
    }
    // Reset all consent checkboxes
    setAcceptedRefundPolicy(false);
    setAcceptedTermsConditions(false);
    setAcceptedPrivacyPolicy(false);
    setShowPaymentModal(true);
    setShowCredentialForm(false);
  };


  // Create subscription record (called before payment)
  const createSubscription = async (planId, planData) => {
    const token = localStorage.getItem('accessToken');
    if (!token || !profileId) return null;

    try {
      const response = await fetch(`${BASE_API_URL}/api/subscriptions/my-subscriptions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          profile: profileId,
          plan: planId,
          plan_details: {
            name: planData.title || planData.name,
            plan_type: planData.plan_type || 'base',
            description: planData.description || '',
            base_price: planData.price?.toString() || planData.base_price,
            is_mandatory: planData.isMandatory || false,
            is_active: true,
            billing_cycle: planData.period || planData.billing_cycle || 'monthly',
            features: planData.features || []
          },
          price: planData.price?.toString() || planData.base_price,
          status: 'inactive',
          billing_cycle: planData.period || planData.billing_cycle || 'monthly'
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        console.error('Failed to create subscription:', errorData);
        throw new Error(errorData.detail || errorData.non_field_errors?.[0] || 'Failed to create subscription');
      }
    } catch (error) {
      console.error('Create subscription error:', error);
      throw error;
    }
  };

  // Activate subscription after successful payment
  const activateSubscription = async (subId, razorpayPaymentId, razorpayOrderId, planData) => {
    const token = localStorage.getItem('accessToken');
    if (!token || !subId) return false;

    // Calculate next billing date (30 days from now)
    const nextBillingDate = new Date();
    nextBillingDate.setDate(nextBillingDate.getDate() + 30);
    const nextBillingDateStr = nextBillingDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    try {
      const response = await fetch(`${BASE_API_URL}/api/subscriptions/my-subscriptions/${subId}/activate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          profile: profileId,
          plan: planData?.id || subId,
          plan_details: planData ? {
            name: planData.title || planData.name,
            plan_type: planData.plan_type || 'base',
            description: planData.description || '',
            base_price: planData.price?.toString() || planData.base_price,
            is_mandatory: planData.isMandatory || false,
            is_active: true,
            billing_cycle: planData.period || planData.billing_cycle || 'monthly',
            features: planData.features || []
          } : {},
          price: planData?.price?.toString() || '400.00',
          status: 'active',
          razorpay_subscription_id: razorpayPaymentId,
          billing_cycle: planData?.period || 'monthly',
          next_billing_date: nextBillingDateStr
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        console.error('Failed to activate subscription:', errorData);
        throw new Error(errorData.detail || 'Failed to activate subscription');
      }
    } catch (error) {
      console.error('Activate subscription error:', error);
      throw error;
    }
  };

  // Cancel subscription - Show modal first
  const handleCancelSubscription = () => {
    setShowCancelModal(true);
  };

  // Confirm cancel subscription - Actually call the API
  const confirmCancelSubscription = async () => {
    setShowCancelModal(false);

    if (!activeSubscriptions || activeSubscriptions.length === 0) {
      setSubmissionMessage('No active subscription to cancel.');
      return;
    }

    setIsCancellingSubscription(true);
    const token = localStorage.getItem('accessToken');

    try {
      let cancelledCount = 0;

      // Cancel all active subscriptions
      for (const subId of activeSubscriptions) {
        const response = await fetch(`${BASE_API_URL}/api/subscriptions/my-subscriptions/${subId}/cancel/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          cancelledCount++;
        } else {
          const errorData = await response.json();
          console.error(`Failed to cancel subscription ${subId}:`, errorData);
        }
      }

      if (cancelledCount > 0) {
        setSubmissionMessage(`${cancelledCount} subscription(s) cancelled successfully.`);
        setIsSubscribed(false);
        setActiveSubscriptions([]);
        setSubscriptionData({
          status: 'cancelled',
          next_billing_date: null,
          marketing_start_date: null,
          recruiter: null,
          monthly_cost: '0.00',
          addons: []
        });
        // Refresh subscription summary
        await fetchSubscriptionSummary();
      } else {
        setSubmissionMessage('Failed to cancel subscription. Please try again.');
      }
    } catch (error) {
      setSubmissionMessage('Network error while cancelling subscription.');
      console.error('Cancel subscription network error:', error);
    } finally {
      setIsCancellingSubscription(false);
    }
  };

  const toggleService = (serviceId) => {
    setSelectedServices(prev => {
      // Check if service is mandatory
      const service = availablePlans.find(s => s.id === serviceId);
      if (service && service.isMandatory) {
        return prev; // Cannot toggle mandatory service
      }

      let newSelection = [...prev];
      if (newSelection.includes(serviceId)) {
        newSelection = newSelection.filter(id => id !== serviceId);
      } else {
        newSelection.push(serviceId);
      }

      return newSelection;
    });
  };

  useEffect(() => {
    // Recalculate total whenever selectedServices or availablePlans changes
    const total = selectedServices.reduce((sum, id) => {
      const service = availablePlans.find(s => s.id === id);
      return sum + (service ? service.price : 0);
    }, 0);
    setCartTotal(total);
  }, [selectedServices, availablePlans]);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces (XXXX XXXX XXXX XXXX)
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      formattedValue = formattedValue.substring(0, 19); // 16 digits + 3 spaces
    }

    // Format expiry date (MM/YY)
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      formattedValue = formattedValue.substring(0, 5);
    }

    // Format CVV (only digits, max 4)
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setPaymentData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      setSubmissionMessage('Please select at least one plan.');
      return;
    }

    try {
      setIsSubmitting(true);

      // Step 1: Create subscription records for all selected plans
      setSubmissionMessage('Creating subscription records...');
      const createdSubscriptions = [];

      for (const planId of selectedServices) {
        const plan = availablePlans.find(p => p.id === planId);
        if (plan) {
          try {
            const subscription = await createSubscription(planId, plan);
            createdSubscriptions.push({
              id: subscription.id,
              planId: planId,
              planData: plan
            });
          } catch (error) {
            // If subscription already exists, it might return an error
            console.error(`Error creating subscription for plan ${planId}:`, error);
            setSubmissionMessage('Error: ' + error.message);
            setIsSubmitting(false);
            return;
          }
        }
      }

      if (createdSubscriptions.length === 0) {
        setSubmissionMessage('No subscriptions were created. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Step 2: Create Razorpay payment order
      setSubmissionMessage('Creating payment order...');
      const token = localStorage.getItem('accessToken');
      const amount = cartTotal;

      const payload = { amount: amount };
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = 'Bearer ' + token;

      const resp = await fetch(`${BASE_API_URL}/api/payments/razorpay/create-order/`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

      const json = await resp.json();
      if (!resp.ok) {
        setSubmissionMessage('Failed to create payment order: ' + (json.error || 'Unknown error'));
        setIsSubmitting(false);
        return;
      }

      const order = json.order;
      const payment_uuid = json.payment_uuid;
      const key_id = json.key_id;

      setSubmissionMessage('Opening payment gateway...');
      setIsSubmitting(false);

      // Check if Razorpay is loaded
      if (typeof window.Razorpay === 'undefined') {
        setSubmissionMessage('Payment gateway not loaded. Please refresh and try again.');
        return;
      }

      // Step 3: Open Razorpay Checkout
      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'Hyrind',
        description: `Subscription - ${createdSubscriptions.length} plan(s)`,
        order_id: order.id,
        handler: async function (response) {
          try {
            setIsSubmitting(true);
            setSubmissionMessage('Verifying payment...');

            // Send verification request to backend
            const verifyPayload = {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              payment_uuid: payment_uuid
            };

            const verifyResp = await fetch(`${BASE_API_URL}/api/payments/razorpay/verify/`, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(verifyPayload)
            });

            const verifyJson = await verifyResp.json();
            if (!verifyResp.ok) {
              setSubmissionMessage('Payment verification failed: ' + (verifyJson.error || 'Unknown error'));
              setIsSubmitting(false);
              return;
            }

            // Step 4: Activate all created subscriptions with payment IDs
            setSubmissionMessage('Activating subscriptions...');
            let activatedCount = 0;

            for (const sub of createdSubscriptions) {
              try {
                await activateSubscription(
                  sub.id,
                  response.razorpay_payment_id,
                  response.razorpay_order_id,
                  sub.planData
                );
                activatedCount++;
              } catch (error) {
                console.error(`Error activating subscription ${sub.id}:`, error);
              }
            }

            setShowPaymentModal(false);
            setPaymentData({ cardNumber: '', cardHolderName: '', expiryDate: '', cvv: '' });

            if (activatedCount > 0) {
              setSubmissionMessage(`Payment successful! ${activatedCount} subscription(s) activated.`);
              // Refresh subscription summary to get updated data
              await fetchSubscriptionSummary();
            } else {
              setSubmissionMessage('Payment completed but subscription activation failed. Please contact support.');
            }

            setIsSubmitting(false);
          } catch (error) {
            setSubmissionMessage('Payment verification error: ' + error.message);
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: profileData?.first_name + ' ' + profileData?.last_name || '',
          email: profileData?.email || ''
        },
        theme: {
          color: primaryColor
        },
        modal: {
          ondismiss: function () {
            setSubmissionMessage('Payment cancelled');
            setIsSubmitting(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      setSubmissionMessage('Payment error: ' + error.message);
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

        {/* Client Intake Form Modal - Removed (now inline) */}


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

        {/* Cancel Subscription Confirmation Modal */}
        {showCancelModal && (
          <div className="position-fixed top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
            <div className="position-absolute top-50 start-50 translate-middle bg-white rounded-3 shadow-lg p-4" style={{ maxWidth: '500px', width: '90%' }}>
              <div className="text-center">
                <div className="mb-3">
                  <div
                    className="mx-auto rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '64px', height: '64px', backgroundColor: '#FEF3C7' }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                </div>
                <h4 className="fw-bold mb-3" style={{ color: '#1F2937' }}>Cancel Subscription</h4>
                <p className="text-muted mb-2">
                  Are you sure you want to cancel your subscription?
                </p>
                <p className="small mb-4" style={{ color: '#6B7280' }}>
                  Your subscription will remain active until the end of your current billing period.
                  You will lose access to premium features after that date.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="btn btn-secondary px-4 py-2 fw-semibold"
                    style={{ minWidth: '120px', borderRadius: '8px' }}
                  >
                    Keep Subscription
                  </button>
                  <button
                    onClick={confirmCancelSubscription}
                    disabled={isCancellingSubscription}
                    className="btn px-4 py-2 fw-semibold"
                    style={{
                      minWidth: '120px',
                      borderRadius: '8px',
                      backgroundColor: '#EF4444',
                      border: 'none',
                      color: 'white'
                    }}
                  >
                    {isCancellingSubscription ? 'Cancelling...' : 'Yes, Cancel'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Sidebar with full name + actions */}
        <div>
          <AdminSidebar
            fullName={fullName}
            onLogout={handleLogout}
            onCredential={handleCredential}
            onIntake={handleIntake}

            onToggleEdit={handleToggleEdit}
            isEditing={isEditing}
            onDeleteProfile={handleDeleteProfile}
            onUpgradeProfile={handleUpgradeProfile}
            isSubscribed={isSubscribed}
            hasAddonPlans={addonPlans && addonPlans.length > 0}
          />
        </div>

        {/* Main content */}
        <main className="admin-main-content">
          <div className="admin-content-wrapper">
            {/* Credential Form */}
            {showCredentialForm && (
              <div className="p-4 bg-white rounded-3 shadow-sm mb-4">
                <CredentialForm
                  isOpen={true}
                  onClose={() => setShowCredentialForm(false)}
                  inline={true}
                />
              </div>
            )}

            {/* Intake Form */}
            {showIntakeForm && (
              <div className="p-4 bg-white rounded-3 shadow-sm mb-4">
                <ClientIntakeForm
                  isOpen={true}
                  onClose={() => setShowIntakeForm(false)}
                  inline={true}
                />
              </div>
            )}

            {/* Payment Modal */}

            {showPaymentModal && (
              <div className="d-flex justify-content-center align-items-center" >
                <div className="payment-card  bg-white w-100" style={{ maxWidth: '80%' }}>
                  {/* client intake sheet message */}
                  <div hidden={isSubscribed || showCredentialForm} className="client-intake-sheet-message">
                    <p> Please fill the Credential Form before proceeding to payment.</p>
                  </div>

                  {/* Header */}
                  <div className="payment-header">
                    {/* <button
                      onClick={() => {
                        setShowPaymentModal(false);
                        setPaymentData({ cardNumber: '', cardHolderName: '', expiryDate: '', cvv: '' });
                        // setPaymentStep(1); // Removed
                      }}
                      className="position-absolute top-0 end-0 m-3 btn btn-sm"
                      style={{
                        color: '#6b7280',
                        background: '#f3f4f6',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        padding: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button> */}

                    <div className="payment-title">{isSubscribed ? 'Add Services' : 'Upgrade Profile'}</div>
                    <div className="payment-amount-large">${cartTotal}</div>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                      {isSubscribed ? 'Select add-on services' : 'Total amount for subscription'}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="payment-body">

                    {/* SERVICE SELECTION - Dynamic from API */}
                    <div className="service-list-container custom-scrollbar d-flex flex-column gap-2 mb-4">
                      {loadingPlans ? (
                        <div className="text-center py-4">
                          <div className="spinner-border text-primary spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading plans...</span>
                          </div>
                          <p className="mt-2 mb-0 small text-muted">Loading available plans...</p>
                        </div>
                      ) : (!isSubscribed && !basePlan) || (isSubscribed && (!addonPlans || addonPlans.length === 0)) ? (
                        <div className="text-center py-4">
                          <p className="mb-0 text-muted">
                            {isSubscribed ? 'No add-on services available at the moment.' : 'No plans available. Please try again later.'}
                          </p>
                        </div>
                      ) : (
                        // Show base plan for non-subscribers, add-ons for subscribers
                        (isSubscribed ? availablePlans.filter(p => p.plan_type === 'addon') : availablePlans.filter(p => p.plan_type === 'base')).map((service) => {
                          const isAlreadySubscribed = subscribedPlanIds.includes(service.id);
                          const isDisabled = service.isMandatory || isAlreadySubscribed;

                          return (
                            <div
                              key={service.id}
                              className={`service-item ${selectedServices.includes(service.id) ? 'selected' : ''} ${isAlreadySubscribed ? 'already-subscribed' : ''}`}
                              style={{
                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                opacity: isAlreadySubscribed ? 0.6 : 1,
                                backgroundColor: isAlreadySubscribed ? '#f0f0f0' : undefined
                              }}
                              onClick={() => !isDisabled && toggleService(service.id)}
                            >
                              <div className="d-flex align-items-center gap-3 flex-grow-1">
                                <div className="ms-2">
                                  {isAlreadySubscribed ? (
                                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', backgroundColor: '#6B7280' }}>
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                  ) : selectedServices.includes(service.id) ? (
                                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', backgroundColor: primaryColor }}>
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                  ) : (
                                    <div className="rounded-circle border border-2" style={{ width: '28px', height: '28px', borderColor: '#cbd5e1' }}></div>
                                  )}
                                </div>
                                <div className="service-info text-start flex-grow-1">
                                  <div className="d-flex align-items-center gap-2 flex-wrap">
                                    <h5 className="mb-0 fw-semibold" style={{ fontSize: '1rem', color: isAlreadySubscribed ? '#6B7280' : '#1e293b' }}>
                                      {service.title}
                                    </h5>
                                    {isAlreadySubscribed && (
                                      <span
                                        className="badge"
                                        style={{
                                          backgroundColor: '#6B7280',
                                          color: 'white',
                                          fontSize: '0.65rem',
                                          padding: '0.25rem 0.5rem',
                                          borderRadius: '4px',
                                          fontWeight: '600'
                                        }}
                                      >
                                        SUBSCRIBED
                                      </span>
                                    )}
                                    {service.isMandatory && !isAlreadySubscribed && (
                                      <span
                                        className="badge"
                                        style={{
                                          backgroundColor: '#DC2626',
                                          color: 'white',
                                          fontSize: '0.65rem',
                                          padding: '0.25rem 0.5rem',
                                          borderRadius: '4px',
                                          fontWeight: '600',
                                          letterSpacing: '0.5px'
                                        }}
                                      >
                                        REQUIRED
                                      </span>
                                    )}
                                    {service.plan_type === 'addon' && !isAlreadySubscribed && (
                                      <span
                                        className="badge"
                                        style={{
                                          backgroundColor: '#10B981',
                                          color: 'white',
                                          fontSize: '0.65rem',
                                          padding: '0.25rem 0.5rem',
                                          borderRadius: '4px',
                                          fontWeight: '600'
                                        }}
                                      >
                                        ADD-ON
                                      </span>
                                    )}
                                  </div>
                                  <p className="mb-0 mt-1" style={{ fontSize: '0.85rem', color: '#64748b' }}>{service.description}</p>
                                </div>
                              </div>
                              <div className="service-price text-end" style={{ minWidth: '80px' }}>
                                <span className="fw-bold" style={{ fontSize: '1.25rem', color: isAlreadySubscribed ? '#6B7280' : primaryColor }}>${service.price}</span>
                                <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>/{service.period}</small>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>

                    {/* <div className="cart-summary mb-4">
                    <span>Total Amount</span>
                    <span>${cartTotal}</span>
                  </div> */}

                    {/* Consent Checkboxes */}
                    <div className="mt-3 mb-2">
                      {/* Terms and Conditions Checkbox */}
                      <div className="form-check d-flex align-items-start gap-2 mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input mt-1"
                          id="termsConditionsCheckbox"
                          checked={acceptedTermsConditions}
                          onChange={(e) => setAcceptedTermsConditions(e.target.checked)}
                          style={{
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer',
                            borderColor: primaryColor,
                            flexShrink: 0
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="termsConditionsCheckbox"
                          style={{ fontSize: '0.9rem', color: '#1e293b', cursor: 'pointer', lineHeight: '1.5' }}
                        >
                          I confirm that I have read, understood, and agree to the {' '}
                          <a
                            href="https://merchant.razorpay.com/policy/Rn2giKHxuBBdz0/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: primaryColor, textDecoration: 'underline', fontWeight: '600' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>

                      {/* Privacy Policy Checkbox */}
                      <div className="form-check d-flex align-items-start gap-2 mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input mt-1"
                          id="privacyPolicyCheckbox"
                          checked={acceptedPrivacyPolicy}
                          onChange={(e) => setAcceptedPrivacyPolicy(e.target.checked)}
                          style={{
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer',
                            borderColor: primaryColor,
                            flexShrink: 0
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="privacyPolicyCheckbox"
                          style={{ fontSize: '0.9rem', color: '#1e293b', cursor: 'pointer', lineHeight: '1.5' }}
                        >
                          I hereby consent to the{' '}                           <a
                            href="https://merchant.razorpay.com/policy/Rn2giKHxuBBdz0/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: primaryColor, textDecoration: 'underline', fontWeight: '600' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Privacy Policy
                          </a> {' '} governing the use of this website
                        </label>
                      </div>

                      {/* Refund Policy Checkbox */}
                      <div className="form-check d-flex align-items-start gap-2">
                        <input
                          type="checkbox"
                          className="form-check-input mt-1"
                          id="refundPolicyCheckbox"
                          checked={acceptedRefundPolicy}
                          onChange={(e) => setAcceptedRefundPolicy(e.target.checked)}
                          style={{
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer',
                            borderColor: primaryColor,
                            flexShrink: 0
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="refundPolicyCheckbox"
                          style={{ fontSize: '0.9rem', color: '#1e293b', cursor: 'pointer', lineHeight: '1.5' }}
                        >
                          I understand and agree to the{' '}
                          <a
                            href="https://merchant.razorpay.com/policy/Rn2giKHxuBBdz0/refund"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: primaryColor, textDecoration: 'underline', fontWeight: '600' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Payment Refund Policy
                          </a> {' '}, including any non-refundable charges.
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={handlePaymentSubmit}
                      disabled={!acceptedRefundPolicy || !acceptedTermsConditions || !acceptedPrivacyPolicy}
                      className="btn w-100 py-3 fw-bold shadow-sm"
                      style={{
                        background: (acceptedRefundPolicy && acceptedTermsConditions && acceptedPrivacyPolicy) ? primaryColor : '#9CA3AF',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.1rem',
                        borderRadius: '12px',
                        transition: 'all 0.2s ease',
                        marginTop: '1.5rem',
                        cursor: (acceptedRefundPolicy && acceptedTermsConditions && acceptedPrivacyPolicy) ? 'pointer' : 'not-allowed',
                        opacity: (acceptedRefundPolicy && acceptedTermsConditions && acceptedPrivacyPolicy) ? 1 : 0.6
                      }}
                      onMouseDown={(e) => (acceptedRefundPolicy && acceptedTermsConditions && acceptedPrivacyPolicy) && (e.target.style.transform = 'scale(0.98)')}
                      onMouseUp={(e) => (acceptedRefundPolicy && acceptedTermsConditions && acceptedPrivacyPolicy) && (e.target.style.transform = 'scale(1)')}
                      onMouseLeave={(e) => (acceptedRefundPolicy && acceptedTermsConditions && acceptedPrivacyPolicy) && (e.target.style.transform = 'scale(1)')}
                    >
                      Proceed to Pay
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div hidden={showPaymentModal} className="p-4">

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
              </div>

              {/* Subscription Status Banner */}
              <SubscriptionStatusBanner
                isSubscribed={isSubscribed}
                subscriptionData={subscriptionData}
                onCancelSubscription={handleCancelSubscription}
                isCancelling={isCancellingSubscription}
              />

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
                                style={{ backgroundColor: primaryColor + '1A', color: primaryColor }}
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
        </main>
      </div>
    </>
  );
};

export default Profile;
