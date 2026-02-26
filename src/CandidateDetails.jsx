import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { base_url } from "./commonAPI's.json";
import {
    User, Mail, Phone, GraduationCap, Link as LinkIcon, GitBranch,
    FileText, Calendar, Briefcase, CheckCircle, XCircle, Clock,
    AlertTriangle, Loader, ChevronLeft, Download, ShieldCheck, Target,
    Trash2, Plus, ArrowRight, MessageSquare, BadgeInfo
} from 'lucide-react';

const CandidateDetails = ({ candidateId, onBack }) => {
    const { id: paramId } = useParams();
    const id = candidateId || paramId;
    const navigate = useNavigate();
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [newSuggestion, setNewSuggestion] = useState({
        role_title: '',
        role_category: '',
        admin_notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCandidateDetails = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('accessToken');
                const response = await fetch(`${base_url}api/users/profiles/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch candidate details');
                }
                const data = await response.json();
                setCandidate(data);
            } catch (err) {
                console.error('Error fetching candidate details:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCandidateDetails();
        }
    }, [id]);

    useEffect(() => {
        if (candidate?.user?.id) {
            fetchSuggestions();
        }
    }, [candidate]);

    const fetchSuggestions = async () => {
        try {
            setSuggestionsLoading(true);
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${base_url}api/jobs/suggestions/?user_id=${candidate.user.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setSuggestions(data.suggestions || []);
            }
        } catch (err) {
            console.error('Error fetching suggestions:', err);
        } finally {
            setSuggestionsLoading(false);
        }
    };

    const handleAddSuggestion = async (e) => {
        e.preventDefault();
        if (!newSuggestion.role_title) return;

        try {
            setIsSubmitting(true);
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${base_url}api/jobs/suggestions/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: candidate.user.id,
                    ...newSuggestion
                })
            });

            if (response.ok) {
                setNewSuggestion({ role_title: '', role_category: '', admin_notes: '' });
                fetchSuggestions();
            } else {
                const errData = await response.json();
                alert(errData.message || 'Failed to add suggestion');
            }
        } catch (err) {
            console.error('Error adding suggestion:', err);
            alert('An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteSuggestion = async (sId) => {
        if (!window.confirm('Are you sure you want to remove this suggestion?')) return;

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${base_url}api/jobs/suggestions/${sId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                fetchSuggestions();
            }
        } catch (err) {
            console.error('Error deleting suggestion:', err);
        }
    };

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center p-5">
                <Loader className="animate-spin text-primary mb-3" size={48} />
                <h4 className="text-secondary fw-semibold">Loading Candidate Details...</h4>
            </div>
        );
    }

    if (error || !candidate) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center p-5">
                <AlertTriangle className="text-danger mb-3" size={64} />
                <h3 className="text-dark fw-bold mb-2">Error Loading Candidate</h3>
                <p className="text-muted mb-4">{error || 'Candidate not found.'}</p>
                <button
                    onClick={() => onBack ? onBack() : navigate(-1)}
                    className="btn btn-primary px-4 py-2 rounded-pill d-flex align-items-center gap-2"
                >
                    <ChevronLeft size={20} /> Back
                </button>
            </div>
        );
    }

    const primaryColor = '#4F46E5';

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

    const getStatusStyle = (status) => {
        switch (status) {
            case 'approved': return { bg: '#D1FAE5', text: '#065F46', icon: <CheckCircle size={16} /> };
            case 'rejected': return { bg: '#FEE2E2', text: '#991B1B', icon: <XCircle size={16} /> };
            case 'open': return { bg: '#EFF6FF', text: '#1D4ED8', icon: <Clock size={16} /> };
            default: return { bg: '#F3F4F6', text: '#374151', icon: <FileText size={16} /> };
        }
    };

    const statusStyle = getStatusStyle(candidate.status);

    return (
        <div className="bg-light p-3 rounded-4">
            <div className="container">
                <div className="mb-4">
                    <button
                        onClick={() => onBack ? onBack() : navigate(-1)}
                        className="btn btn-link text-decoration-none text-indigo-600 p-0 d-flex align-items-center gap-2 fw-semibold"
                    >
                        <ChevronLeft size={20} /> Back to Previous Screen
                    </button>
                </div>

                <div className="row g-4">
                    {/* Left Column - Main Info */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                            <div className="card-header bg-white border-bottom-0 pt-4 px-4">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-indigo-100 text-indigo-600 p-3 rounded-circle shadow-sm">
                                            <User size={32} />
                                        </div>
                                        <div>
                                            <h2 className="fw-bold text-dark mb-1">
                                                {candidate.first_name} {candidate.last_name}
                                            </h2>
                                            <p className="text-muted mb-0 d-flex align-items-center gap-2">
                                                <Mail size={16} /> {candidate.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <span
                                            className="badge px-3 py-2 rounded-pill fw-bold text-uppercase d-flex align-items-center gap-2"
                                            style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                                        >
                                            {statusStyle.icon} {candidate.status_label || candidate.status}
                                        </span>
                                        <p className="text-muted small mt-2 mb-0">
                                            ID: {candidate.id}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body p-4">
                                <h5 className="fw-bold border-bottom pb-2 mb-4 d-flex align-items-center gap-2">
                                    <GraduationCap className="text-indigo-600" size={24} /> Education & Personal Info
                                </h5>

                                <div className="row g-4">
                                    <DetailItem icon={GraduationCap} label="University" value={candidate.university} />
                                    <DetailItem icon={GraduationCap} label="Degree" value={candidate.degree} />
                                    <DetailItem icon={Target} label="Major" value={candidate.major} />
                                    <DetailItem icon={ShieldCheck} label="Visa Status" value={candidate.visa_status} />
                                    <DetailItem icon={Calendar} label="Graduation Date" value={candidate.graduation_date} />
                                    <DetailItem icon={Phone} label="Phone Number" value={candidate.phone} />
                                    {candidate.visa_status === 'F1-OPT' && (
                                        <DetailItem icon={Calendar} label="OPT End Date" value={candidate.opt_end_date} />
                                    )}
                                    <DetailItem icon={LinkIcon} label="LinkedIn" value={candidate.linkedin_url} isLink />
                                    <DetailItem icon={GitBranch} label="GitHub" value={candidate.github_url} isLink />
                                    <DetailItem icon={Briefcase} label="Referral Source" value={candidate.referral_source} />
                                </div>

                                <div className="mt-5">
                                    <h5 className="fw-bold border-bottom pb-2 mb-3">Additional Notes</h5>
                                    <div className="p-3 bg-light rounded-3 border">
                                        <p className="mb-0 text-dark" style={{ whiteSpace: 'pre-wrap' }}>
                                            {candidate.additional_notes || 'No additional notes provided.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recruiter & Assignment Info */}
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                            <div className="card-body p-4">
                                <h5 className="fw-bold border-bottom pb-2 mb-4 d-flex align-items-center gap-2">
                                    <Briefcase className="text-indigo-600" size={24} /> Assignment & Status Details
                                </h5>

                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="p-3 rounded-3 h-100" style={{ backgroundColor: '#F9FAFB' }}>
                                            <p className="text-muted small fw-bold text-uppercase mb-2">Current Status Info</p>
                                            <div className="d-flex flex-column gap-2">
                                                <div>
                                                    <strong className="small text-muted">Status Label:</strong>
                                                    <p className="mb-0 fw-semibold">{candidate.status_label || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <strong className="small text-muted">Last Updated:</strong>
                                                    <p className="mb-0 fw-semibold">{formatDateTime(candidate.status_updated_at)}</p>
                                                </div>
                                                <div>
                                                    <strong className="small text-muted">Status Notes:</strong>
                                                    <p className="mb-0 small text-muted italic">{candidate.status_notes || 'No notes'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="p-3 rounded-3 h-100" style={{ backgroundColor: candidate.recruiter_info ? '#EEF2FF' : '#F9FAFB' }}>
                                            <p className="text-muted small fw-bold text-uppercase mb-2">Recruiter Info</p>
                                            {candidate.recruiter_info ? (
                                                <div className="d-flex flex-column gap-2">
                                                    <p className="mb-0 fw-bold text-indigo-700">{candidate.recruiter_info.name}</p>
                                                    <p className="mb-0 small text-muted d-flex align-items-center gap-2"><Mail size={14} /> {candidate.recruiter_info.email}</p>
                                                    <p className="mb-0 small text-muted d-flex align-items-center gap-2"><Phone size={14} /> {candidate.recruiter_info.phone}</p>
                                                    <p className="mb-1 small text-muted d-flex align-items-center gap-2"><Briefcase size={14} /> {candidate.recruiter_info.department_display}</p>
                                                </div>
                                            ) : (
                                                <p className="text-muted small italic">Not assigned to any recruiter yet.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Role Suggestions Section */}
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                            <div className="card-header bg-white border-bottom-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                                <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                                    <Target className="text-primary" size={24} /> Role Suggestions
                                </h5>
                                <span className="badge bg-light text-primary border rounded-pill px-3 py-1">
                                    {suggestions.length} Suggested
                                </span>
                            </div>

                            <div className="card-body p-4">
                                {/* Suggestion Form */}
                                <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                                    <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                                        <Plus size={18} className="text-primary" /> Suggest a New Role
                                    </h6>
                                    <form onSubmit={handleAddSuggestion} className="row g-3">
                                        <div className="col-md-5">
                                            <label className="form-label small fw-bold text-muted">ROLE TITLE</label>
                                            <input
                                                type="text"
                                                className="form-control border-0 shadow-sm rounded-3 px-3 py-2"
                                                placeholder="e.g. Senior Frontend Engineer"
                                                value={newSuggestion.role_title}
                                                onChange={(e) => setNewSuggestion({ ...newSuggestion, role_title: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small fw-bold text-muted">CATEGORY</label>
                                            <input
                                                type="text"
                                                className="form-control border-0 shadow-sm rounded-3 px-3 py-2"
                                                placeholder="e.g. Engineering"
                                                value={newSuggestion.role_category}
                                                onChange={(e) => setNewSuggestion({ ...newSuggestion, role_category: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-3 d-flex align-items-end">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || !newSuggestion.role_title}
                                                className="btn btn-primary w-100 rounded-3 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                                                style={{ backgroundColor: primaryColor, border: 'none' }}
                                            >
                                                {isSubmitting ? <Loader className="animate-spin" size={18} /> : <Plus size={18} />}
                                                Suggest
                                            </button>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small fw-bold text-muted">ADMIN NOTES (EXPLAIN WHY THIS ROLE)</label>
                                            <textarea
                                                className="form-control border-0 shadow-sm rounded-3 px-3 py-2"
                                                rows="2"
                                                placeholder="This candidate has strong React skills matching the job description..."
                                                value={newSuggestion.admin_notes}
                                                onChange={(e) => setNewSuggestion({ ...newSuggestion, admin_notes: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </form>
                                </div>

                                {/* Existing Suggestions List */}
                                {suggestionsLoading ? (
                                    <div className="text-center p-4">
                                        <Loader className="animate-spin text-primary" size={24} />
                                    </div>
                                ) : suggestions.length > 0 ? (
                                    <div className="row g-3">
                                        {suggestions.map((s) => (
                                            <div key={s.id} className="col-12">
                                                <div className="d-flex align-items-start justify-content-between p-3 rounded-4 border bg-white hover-shadow-sm transition-all">
                                                    <div className="d-flex gap-3">
                                                        <div className="bg-light p-3 rounded-3 text-primary d-flex align-items-center justify-content-center" style={{ height: 'fit-content' }}>
                                                            <Briefcase size={22} />
                                                        </div>
                                                        <div>
                                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                                <h6 className="fw-bold text-dark mb-0">{s.role_title}</h6>
                                                                {s.role_category && (
                                                                    <span className="badge rounded-pill bg-light text-muted border small px-2 py-1">
                                                                        {s.role_category}
                                                                    </span>
                                                                )}
                                                                {s.is_selected ? (
                                                                    <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-2 py-1 small">
                                                                        User Selected
                                                                    </span>
                                                                ) : (
                                                                    <span className="badge rounded-pill bg-warning-subtle text-warning border border-warning-subtle px-2 py-1 small">
                                                                        Pending User
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {s.admin_notes && (
                                                                <p className="small text-muted mb-2 italic">"{s.admin_notes}"</p>
                                                            )}
                                                            <div className="d-flex align-items-center gap-3 text-muted small">
                                                                <span className="d-flex align-items-center gap-1">
                                                                    <Calendar size={12} /> {new Date(s.created_at).toLocaleDateString()}
                                                                </span>
                                                                <span className="d-flex align-items-center gap-1">
                                                                    <User size={12} /> Suggestion ID: {s.id.substring(0, 8)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteSuggestion(s.id)}
                                                        className="btn btn-outline-danger border-0 rounded-circle p-2 hover-bg-danger transition-all"
                                                        title="Delete Suggestion"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center p-5 bg-light rounded-4 border border-2 border-dashed">
                                        <BadgeInfo size={40} className="text-muted mb-2 opacity-50" />
                                        <p className="text-muted mb-0 fw-semibold">No suggestions yet</p>
                                        <p className="text-muted small">Propose roles to this candidate using the form above.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Actions & Sidebar */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-4 text-center">
                                <h5 className="fw-bold mb-3 text-dark">Quick Actions</h5>

                                {candidate.resume_file ? (
                                    <a
                                        href={candidate.resume_file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-indigo w-100 py-3 mb-3 fw-bold rounded-3 d-flex align-items-center justify-content-center gap-2"
                                        style={{ backgroundColor: '#4F46E5', color: 'white' }}
                                    >
                                        <Download size={20} /> View Resume PDF
                                    </a>
                                ) : (
                                    <button className="btn btn-secondary w-100 py-3 mb-3 fw-bold rounded-3 opacity-50 cursor-not-allowed" disabled>
                                        No Resume Available
                                    </button>
                                )}

                                <div className="d-flex flex-column gap-2 mt-2">
                                    <div className="p-3 rounded-3 text-start" style={{ backgroundColor: candidate.active ? '#D1FAE5' : '#FEE2E2' }}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fw-bold" style={{ color: candidate.active ? '#065F46' : '#991B1B' }}>
                                                Account {candidate.active ? 'Active' : 'Inactive'}
                                            </span>
                                            <div
                                                className="rounded-circle"
                                                style={{ width: '12px', height: '12px', backgroundColor: candidate.active ? '#10B981' : '#EF4444' }}
                                            ></div>
                                        </div>
                                        <p className="mb-0 small opacity-75 mt-1" style={{ color: candidate.active ? '#065F46' : '#991B1B' }}>
                                            {candidate.active ? 'User has full access' : 'User profile is currently disabled'}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-3 text-start bg-light border">
                                        <span className="fw-bold text-dark d-flex align-items-center gap-2 small mb-2">
                                            <ShieldCheck size={16} /> Data Consent
                                        </span>
                                        <p className="mb-0 small text-muted">
                                            {candidate.consent_to_terms ? '✅ Agreed to terms and conditions' : '❌ Has not agreed to terms yet'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <div className="p-4 bg-indigo-600 text-white">
                                <h5 className="fw-bold mb-0">System Info</h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="d-flex flex-column gap-3">
                                    <div>
                                        <strong className="small text-muted d-block mb-1">CANDIDATE ID</strong>
                                        <code className="bg-light p-2 rounded w-100 d-block text-indigo-600 fw-bold">{candidate.id}</code>
                                    </div>
                                    <div>
                                        <strong className="small text-muted d-block mb-1">USER AUTH ID</strong>
                                        <p className="mb-0 fw-semibold text-dark">{candidate.user?.id || 'N/A'}</p>
                                    </div>
                                    {candidate.assignment_status && (
                                        <div>
                                            <strong className="small text-muted d-block mb-1">ASSIGNMENT PRIORITY</strong>
                                            <span className="badge bg-warning text-dark px-2 py-1 text-uppercase">
                                                {candidate.assignment_status.priority}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .btn-indigo:hover {
          background-color: #4338CA !important;
          transform: translateY(-2px);
          transition: all 0.2s ease;
        }
        .card {
          transition: transform 0.2s ease;
        }
        .text-indigo-600 { color: #4F46E5; }
        .bg-indigo-600 { background-color: #4F46E5; }
        .text-indigo-700 { color: #4338CA; }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .hover-shadow-sm:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05) !important;
          transform: translateY(-2px);
        }
        .hover-bg-danger:hover {
          background-color: #FEE2E2 !important;
          color: #EF4444 !important;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div >
    );
};

const DetailItem = ({ icon: Icon, label, value, isLink }) => {
    const primaryColor = '#4F46E5';
    return (
        <div className="col-md-6">
            <div className="d-flex align-items-start gap-2">
                <div className="p-2 rounded bg-light" style={{ color: primaryColor }}>
                    <Icon size={18} />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                    <p className="text-muted small fw-bold text-uppercase mb-0">{label}</p>
                    {isLink && value ? (
                        <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 text-decoration-none fw-semibold truncate d-block"
                            style={{ fontSize: '0.95rem' }}
                        >
                            {value}
                        </a>
                    ) : (
                        <p className="text-dark fw-semibold mb-0" style={{ fontSize: '0.95rem' }}>
                            {value || 'Not provided'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CandidateDetails;
