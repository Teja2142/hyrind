import React, { useState, useEffect, useRef } from 'react';
import {
    Target, Clock, Briefcase, FileText, CheckCircle2,
    XCircle, Send, AlertCircle, ChevronRight, Layers,
    Calendar, User, BadgeInfo, Loader2, Check
} from 'lucide-react';
import { base_url } from "./commonAPI's.json";

const RoleSuggestions = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null); // stores id of role being toggled
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState(null);
    const primaryColor = '#4F46E5';
    const isfetchRoles = useRef(false);

    const fetchRoles = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${base_url}/api/jobs/suggestions/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const jsonData = await response.json();
                setData(jsonData);
            } else if (response.status === 404) {
                setData({ suggestions: [], summary: { total: 0 } });
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (err) {
            console.error('Error fetching suggested roles:', err);
            setError('Failed to load suggested roles. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isfetchRoles.current) {
            fetchRoles();
            isfetchRoles.current = true;
        }
    }, []);

    const handleToggleSelection = async (id, currentStatus) => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        setActionLoading(id);
        try {
            const response = await fetch(`${base_url}/api/jobs/suggestions/${id}/toggle/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ is_selected: !currentStatus })
            });

            if (response.ok) {
                // Refresh data to show updated stats and status
                await fetchRoles();
            } else {
                const errData = await response.json();
                alert(errData.message || 'Failed to update selection');
            }
        } catch (err) {
            console.error('Error toggling selection:', err);
            alert('An error occurred. Please try again.');
        } finally {
            setActionLoading(null);
        }
    };

    const handleSubmitSelections = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        setSubmitLoading(true);
        try {
            const response = await fetch(`${base_url}/api/jobs/suggestions/submit/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Selections submitted successfully!');
                await fetchRoles();
            } else {
                const errData = await response.json();
                alert(errData.message || 'Failed to submit selections');
            }
        } catch (err) {
            console.error('Error submitting selections:', err);
            alert('An error occurred during submission.');
        } finally {
            setSubmitLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center p-5 bg-white rounded-4 shadow-sm" style={{ minHeight: '400px' }}>
                <div className="spinner-grow text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted fw-medium mt-2">Curating suggested roles for you...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-5 text-center bg-white rounded-4 shadow-sm border border-danger-subtle">
                <div className="mb-4 d-inline-flex p-3 rounded-circle bg-danger bg-opacity-10">
                    <AlertCircle size={48} className="text-danger" />
                </div>
                <h4 className="fw-bold text-dark mb-3">Unable to Load Suggestions</h4>
                <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '400px' }}>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="btn btn-primary rounded-pill px-5 py-2 fw-semibold shadow-sm transition-all"
                    style={{ backgroundColor: primaryColor, border: 'none' }}
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    const { summary, suggestions, grouped_by_category } = data || {};
    const totalSuggestions = summary?.total || 0;
    const pendingSubmission = summary?.selected > 0 && summary?.unselected > 0 || (summary?.selected > 0); // Simplified logic for showing submit button

    if (!suggestions || suggestions.length === 0) {
        return (
            <div className="p-5 text-center bg-white rounded-4 shadow-sm overflow-hidden position-relative">
                <div className="position-absolute top-0 start-0 w-100 h-100 opacity-05 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #4F46E5 0%, transparent 40%)', zIndex: 0 }}></div>

                <div className="position-relative z-1">
                    <div className="mb-4 d-inline-flex p-4 rounded-circle shadow-sm" style={{ backgroundColor: primaryColor + '10' }}>
                        <Clock size={64} style={{ color: primaryColor }} className="animate-pulse" />
                    </div>
                    <h2 className="fw-bold mb-3 text-dark">Roles Under Review</h2>
                    <p className="text-muted lead mx-auto mb-5" style={{ maxWidth: '560px' }}>
                        Our talent acquisition team is currently reviewing your profile.
                        We'll notify you as soon as we find roles that perfectly match your expertise.
                    </p>

                    <div className="row justify-content-center g-4">
                        <div className="col-md-4">
                            <div className="p-3 rounded-4 border border-light shadow-sm bg-light bg-opacity-50">
                                <FileText size={24} className="mb-2 text-primary" />
                                <h6 className="fw-bold mb-1">Check Profile</h6>
                                <p className="small text-muted mb-0">Ensure your intake form is complete</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 rounded-4 border border-light shadow-sm bg-light bg-opacity-50">
                                <CheckCircle2 size={24} className="mb-2 text-success" />
                                <h6 className="fw-bold mb-1">Stay Updated</h6>
                                <p className="small text-muted mb-0">Check back every 24-48 hours</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="role-suggestions-container p-0 pb-5">
            {/* Header & Stats Section */}
            <div className="bg-white rounded-4 shadow-sm mb-4 p-4 p-lg-5 overflow-hidden position-relative">
                <div className="position-absolute top-0 end-0 p-4 opacity-10">
                    <Target size={120} style={{ color: primaryColor }} />
                </div>

                <div className="position-relative z-1 mb-5">
                    <div className="mb-3 mb-md-0">
                        <div className="d-flex align-items-center mb-1">
                            <div className="p-2 rounded-3 me-3 shadow-sm" style={{ backgroundColor: primaryColor, color: 'white' }}>
                                <Target size={28} />
                            </div>
                            <h2 className="fw-bold mb-0 text-dark">Tailored Career Opportunities</h2>
                        </div>
                        <p className="text-muted mb-0 fs-5">Based on your expertise, we've identified {totalSuggestions} potential matches.</p>
                    </div>
                </div>
                {/* Glassmorphism Stat Cards */}
                <div className="row g-3 g-lg-4">
                    <div className="col-6 col-md-3">
                        <div className="p-3 p-lg-4 rounded-4 text-center transition-all hover-up" style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', border: '1px solid #C7D2FE' }}>
                            <div className="text-primary opacity-75 mb-2"><Layers size={20} /></div>
                            <h3 className="fw-bold text-indigo-900 mb-1">{summary.total}</h3>
                            <p className="small text-indigo-700 fw-semibold mb-0">Total</p>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="p-3 p-lg-4 rounded-4 text-center transition-all hover-up" style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)', border: '1px solid #A7F3D0' }}>
                            <div className="text-success opacity-75 mb-2"><CheckCircle2 size={20} /></div>
                            <h3 className="fw-bold text-emerald-900 mb-1">{summary.selected}</h3>
                            <p className="small text-emerald-700 fw-semibold mb-0">Selected</p>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="p-3 p-lg-4 rounded-4 text-center transition-all hover-up" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)', border: '1px solid #BFDBFE' }}>
                            <div className="text-primary opacity-75 mb-2"><Send size={20} /></div>
                            <h3 className="fw-bold text-blue-900 mb-1">{summary.submitted}</h3>
                            <p className="small text-blue-700 fw-semibold mb-0">Submitted</p>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="p-3 p-lg-4 rounded-4 text-center transition-all hover-up" style={{ background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)', border: '1px solid #FDE68A' }}>
                            <div className="text-warning opacity-75 mb-2"><Clock size={20} /></div>
                            <h3 className="fw-bold text-amber-900 mb-1">{summary.pending}</h3>
                            <p className="small text-amber-700 fw-semibold mb-0">Pending</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submission Action Bar */}
            {summary.selected > 0 && !summary.submitted_at && (
                <div className="bg-white rounded-4 shadow-sm mb-5 p-3 p-md-4 border border-primary border-opacity-10 animate-fade-in">
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
                        <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm" style={{ width: '56px', height: '56px' }}>
                                <CheckCircle2 size={28} />
                            </div>
                            <div>
                                <h4 className="fw-bold text-dark mb-1">{summary.selected} Roles Selected</h4>
                                <p className="text-muted mb-0 small">Finalize your interest by submitting these roles to our team.</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSubmitSelections}
                            disabled={submitLoading}
                            className="btn btn-primary rounded-pill px-5 py-3 fw-bold d-flex align-items-center shadow-lg transform active-scale-95 transition-all w-100 w-md-auto"
                            style={{ backgroundColor: primaryColor, border: 'none', minWidth: '220px', justifyContent: 'center' }}
                        >
                            {submitLoading ? <Loader2 size={24} className="me-2 animate-spin" /> : <Send size={20} className="me-2" />}
                            Submit Selections
                        </button>
                    </div>
                </div>
            )}

            {/* Roles Grouped by Category */}
            {
                grouped_by_category && Object.entries(grouped_by_category).map(([category, details]) => (
                    <div key={category} className="mb-5">
                        <div className="d-flex align-items-center mb-4 px-2">
                            <div className="h-px bg-light flex-grow-1"></div>
                            <h4 className="fw-bold text-dark mx-3 mb-0 d-flex align-items-center">
                                <Briefcase size={20} className="me-2 text-muted" />
                                {category}
                                <span className="ms-2 badge rounded-pill bg-light text-muted border fw-medium fs-6" style={{ fontSize: '0.8rem' }}>
                                    {details.total}
                                </span>
                            </h4>
                            <div className="h-px bg-light flex-grow-1"></div>
                        </div>

                        <div className="row g-4 text-center text-md-start">
                            {details.roles.map((role) => (
                                <div key={role.id} className="col-md-6 col-xl-4">
                                    <div className="card h-100 border-0 shadow-sm hover-shadow role-card transition-all"
                                        style={{ borderRadius: '20px', background: 'white', overflow: 'hidden' }}>

                                        {/* Card Header Color Strip */}
                                        <div style={{ height: '6px', backgroundColor: role.is_selected ? '#10B981' : (role.submitted_at ? '#3B82F6' : primaryColor) }}></div>

                                        <div className="card-body p-4 d-flex flex-column">
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <div className="p-2 rounded-3 bg-light d-flex align-items-center justify-content-center">
                                                    <Layers size={18} className="text-muted" />
                                                </div>
                                                {role.is_selected ? (
                                                    <span className="badge rounded-pill bg-success bg-opacity-10 text-success border border-success-subtle px-2 py-1 pulse-subtle">
                                                        <CheckCircle2 size={12} className="me-1" /> Accepted
                                                    </span>
                                                ) : role.submitted_at ? (
                                                    <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary border border-primary-subtle px-2 py-1">
                                                        <Send size={12} className="me-1" /> Submitted
                                                    </span>
                                                ) : (
                                                    <span className="badge rounded-pill bg-warning bg-opacity-10 text-warning border border-warning-subtle px-2 py-1">
                                                        <Clock size={12} className="me-1" /> New Match
                                                    </span>
                                                )}
                                            </div>

                                            <h5 className="fw-bold text-dark mb-2 lh-base" style={{ height: '3rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                                {role.role_title}
                                            </h5>

                                            <div className="d-flex align-items-center text-muted small mb-4 justify-content-center justify-content-md-start">
                                                <Calendar size={14} className="me-2" />
                                                <span>Matched on {formatDate(role.created_at)}</span>
                                            </div>

                                            {role.admin_notes && (
                                                <div className="p-3 rounded-3 bg-light mb-4 border-start border-3 border-primary border-opacity-25" style={{ flexGrow: 1 }}>
                                                    <div className="d-flex align-items-start">
                                                        <BadgeInfo size={16} className="text-primary me-2 mt-1" />
                                                        <p className="small text-muted mb-0 italic text-start" style={{ fontSize: '0.85rem' }}>
                                                            "{role.admin_notes}"
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-auto pt-2">
                                                <button
                                                    onClick={() => handleToggleSelection(role.id, role.is_selected)}
                                                    disabled={actionLoading === role.id || !!role.submitted_at}
                                                    className={`btn w-100 fw-bold rounded-3 py-2 transition-all d-flex align-items-center justify-content-center group ${role.is_selected ? 'btn-success text-white shadow-sm' : ''}`}
                                                    style={{
                                                        backgroundColor: role.is_selected ? '#10B981' : 'transparent',
                                                        border: `1.5px solid ${role.is_selected ? '#10B981' : primaryColor}`,
                                                        color: role.is_selected ? 'white' : primaryColor,
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    {actionLoading === role.id ? (
                                                        <Loader2 size={18} className="animate-spin" />
                                                    ) : role.is_selected ? (
                                                        <><Check size={18} className="me-2" /> Selected</>
                                                    ) : (
                                                        <>Interested in Role <ChevronRight size={16} className="ms-1 group-hover-translate-x" /></>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Footer Info */}
                                        <div className="card-footer bg-transparent border-top-0 px-4 pb-4 pt-0">
                                            <div className="d-flex justify-content-between align-items-center opacity-75">
                                                <div className="small d-flex align-items-center">
                                                    <User size={12} className="me-1" />
                                                    By {role.added_by_name}
                                                </div>
                                                <div className="small">ID: {role.id.substring(0, 8)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }



            {/* Internal Styles for Premium Effects */}
            <style>{`
                .hover-shadow:hover {
                    box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important;
                    transform: translateY(-5px);
                }
                .hover-up:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 0.5rem 1.5rem rgba(0,0,0,.05) !important;
                }
                .transition-all {
                    transition: all 0.3s ease-in-out;
                }
                .group:hover .group-hover-translate-x {
                    transform: translateX(4px);
                    transition: transform 0.2s ease;
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .opacity-05 { opacity: 0.05; }
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: .5; }
                }
                .pulse-subtle {
                    animation: pulse-subtle 3s infinite;
                }
                @keyframes pulse-subtle {
                    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.2); }
                    70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                }
                .role-card {
                    border: 1px solid rgba(0,0,0,0.03) !important;
                }
                .active-scale-95:active {
                    transform: scale(0.95);
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div >
    );
};

export default RoleSuggestions;
