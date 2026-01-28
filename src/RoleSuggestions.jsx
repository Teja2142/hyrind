import React, { useState, useEffect } from 'react';
import { Target, Clock, Briefcase, FileText } from 'lucide-react';
import { base_url } from "./commonAPI's.json";

const RoleSuggestions = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const primaryColor = '#4F46E5';

    useEffect(() => {
        const fetchRoles = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            try {
                const response = await fetch(`${base_url}/api/users/client-intake/suggested-roles/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setRoles(data || []);
                } else {
                    // If 404 or other error, we assume no roles yet
                    setRoles([]);
                }
            } catch (err) {
                console.error('Error fetching suggested roles:', err);
                setError('Failed to load roles');
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center p-5 bg-white rounded-4 shadow-sm">
                <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Loading roles...</span>
                </div>
                <p className="text-muted">Fetching your suggested roles...</p>
            </div>
        );
    }

    if (roles.length === 0) {
        return (
            <div className="p-5 text-center bg-white rounded-4 shadow-sm">
                <div className="mb-4 d-inline-flex p-3 rounded-circle" style={{ backgroundColor: primaryColor + '1A' }}>
                    <Clock size={48} style={{ color: primaryColor }} />
                </div>
                <h3 className="fw-bold mb-3">Roles Under Review</h3>
                <p className="text-muted lead mx-auto" style={{ maxWidth: '500px' }}>
                    We are reviewing your submission. We will get back to you shortly with tailored role suggestions based on your profile.
                </p>
                <div className="mt-4 p-3 rounded-3" style={{ backgroundColor: '#F9FAFB', border: '1px dashed #E5E7EB' }}>
                    <p className="small mb-0 text-muted">
                        <FileText size={16} className="me-2" />
                        Tips: Make sure your Client Intake Sheet is complete for faster review.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white rounded-4 shadow-sm">
            <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                <div className="p-2 rounded-3 me-3" style={{ backgroundColor: primaryColor + '1A' }}>
                    <Target size={24} style={{ color: primaryColor }} />
                </div>
                <h3 className="fw-bold mb-0">Suggested Roles</h3>
            </div>

            <div className="row g-4">
                {roles.map((role, index) => (
                    <div key={role.id || index} className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm hover-shadow transition-all" style={{ backgroundColor: '#F8FAFC', borderRadius: '16px', borderLeft: `4px solid ${primaryColor}` }}>
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <h5 className="fw-bold text-dark mb-0">{role.title || role.role_name}</h5>
                                    <span className="badge" style={{ backgroundColor: primaryColor + '20', color: primaryColor }}>
                                        {role.type || 'Full-time'}
                                    </span>
                                </div>
                                <div className="d-flex align-items-center text-muted small mb-3">
                                    <Briefcase size={14} className="me-2" />
                                    <span>{role.company || 'Confidential Client'}</span>
                                </div>
                                <p className="small text-muted mb-4">
                                    {role.description || 'Matching role based on your technical skills and background.'}
                                </p>
                                <button className="btn btn-sm w-100 fw-semibold rounded-pill" style={{ backgroundColor: 'white', border: `1px solid ${primaryColor}`, color: primaryColor }}>
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoleSuggestions;
