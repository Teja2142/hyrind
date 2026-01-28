import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, Download, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { base_url } from "./commonAPI's.json";

const PaymentHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const primaryColor = '#4F46E5';

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            try {
                // We'll try the common billing endpoint
                const response = await fetch(`${base_url}/api/subscriptions/my-billing-history/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setHistory(data || []);
                } else {
                    // Fallback or empty
                    setHistory([]);
                }
            } catch (err) {
                console.error('Error fetching billing history:', err);
                setError('Failed to load payment history');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const handleViewInvoice = (invoiceId) => {
        // Logic to view/download invoice
        window.open(`${base_url}/api/subscriptions/invoice/${invoiceId}/`, '_blank');
    };

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center p-5 bg-white rounded-4 shadow-sm">
                <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Loading history...</span>
                </div>
                <p className="text-muted">Fetching your payment records...</p>
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="p-5 text-center bg-white rounded-4 shadow-sm">
                <div className="mb-4 d-inline-flex p-3 rounded-circle" style={{ backgroundColor: primaryColor + '1A' }}>
                    <DollarSign size={48} style={{ color: primaryColor }} />
                </div>
                <h3 className="fw-bold mb-3">No Payment History</h3>
                <p className="text-muted lead mx-auto" style={{ maxWidth: '500px' }}>
                    You haven't made any transactions yet. Once you subscribe to a plan, your payment history will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white rounded-4 shadow-sm">
            <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                <div className="p-2 rounded-3 me-3" style={{ backgroundColor: primaryColor + '1A' }}>
                    <Calendar size={24} style={{ color: primaryColor }} />
                </div>
                <h3 className="fw-bold mb-0">Payment History</h3>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th className="border-0 rounded-start py-3">Service Type</th>
                            <th className="border-0 py-3">Date</th>
                            <th className="border-0 py-3">Amount</th>
                            <th className="border-0 py-3">Status</th>
                            <th className="border-0 rounded-end py-3 text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((record) => (
                            <tr key={record.id}>
                                <td className="py-3">
                                    <div className="d-flex align-items-center">
                                        <div className="p-2 rounded-2 me-3" style={{ backgroundColor: '#EEF2FF' }}>
                                            <FileText size={18} style={{ color: primaryColor }} />
                                        </div>
                                        <div>
                                            <span className="fw-bold d-block">{record.plan_name || 'Service Subscription'}</span>
                                            <small className="text-muted text-xs">#{record.razorpay_order_id?.substring(0, 12)}...</small>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 text-muted">
                                    {new Date(record.created_at).toLocaleDateString()}
                                </td>
                                <td className="py-3">
                                    <span className="fw-bold">${parseFloat(record.amount || 0).toFixed(2)}</span>
                                </td>
                                <td className="py-3">
                                    <span className="badge rounded-pill bg-success-subtle text-success px-3">
                                        <CheckCircle2 size={12} className="me-1" />
                                        Success
                                    </span>
                                </td>
                                <td className="py-3 text-end">
                                    <button
                                        onClick={() => handleViewInvoice(record.id)}
                                        className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-semibold border-2 d-inline-flex align-items-center gap-2"
                                    >
                                        <Download size={14} />
                                        Invoice
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
