import React, { useState, useRef } from 'react';
import { base_url } from "./commonAPI's.json";
const ChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

const Check = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const CredentialForm = ({ isOpen, onClose, inline = false }) => {
    const BASE_URL = `${base_url.endsWith('/') ? base_url.slice(0, -1) : base_url}/api/`;
    const isfetchCredentialSheet = useRef(false);


    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        timestamp: new Date().toLocaleString(),
        fullName: '',
        email: '',
        personalEmail: '',
        phoneNumber: '',
        location: '',
        bachelorsGradDate: '',
        mastersGradDate: '',
        firstEntryUS: '',
        optStartDate: '',
        optOfferLetterSubmitted: '',
        offerLetter: null,
        preferredRoles: '',
        preferredLocations: '',
        linkedinId: '',
        linkedinPassword: '',
        indeedId: '',
        indeedPassword: '',
        diceId: '',
        dicePassword: '',
        monsterId: '',
        monsterPassword: '',
        ziprecruiterId: '',
        ziprecruiterPassword: '',
        otherPlatforms: '',
        showInConfirmation: false
    });

    React.useEffect(() => {
        if (isOpen) {
            if (isfetchCredentialSheet.current) {
                return;
            }
            isfetchCredentialSheet.current = true;
            fetchCredentialSheet();
        }
    }, [isOpen]);

    const fetchCredentialSheet = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${BASE_URL}users/me/credential-sheet/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch credentials');
            }
            const data = await response.json();

            // Map API response (snake_case) to form state (camelCase)
            setFormData({
                timestamp: data.timestamp || new Date().toLocaleString(),
                fullName: data.full_name || '',
                email: data.email || '',
                personalEmail: data.personal_email || '',
                phoneNumber: data.phone_number || '',
                location: data.location || '',
                bachelorsGradDate: data.bachelor_graduation_date || '',
                mastersGradDate: data.master_graduation_date || '',
                firstEntryUS: data.first_entry_us || '',
                optStartDate: data.opt_start_date || '',
                optOfferLetterSubmitted: data.opt_offer_letter_submitted || 'No',
                offerLetter: data.offer_letter || null,
                preferredRoles: data.preferred_job_roles || '',
                preferredLocations: data.preferred_locations || '',
                linkedinId: data.linkedin_id || '',
                linkedinPassword: data.linkedin_password || '',
                indeedId: data.indeed_id || '',
                indeedPassword: data.indeed_password || '',
                diceId: data.dice_id || '',
                dicePassword: data.dice_password || '',
                monsterId: data.monster_id || '',
                monsterPassword: data.monster_password || '',
                ziprecruiterId: data.ziprecruiter_id || '',
                ziprecruiterPassword: data.ziprecruiter_password || '',
                otherPlatforms: data.other_platforms || '',
                showInConfirmation: data.show_in_confirmation === true || data.show_in_confirmation === 'true'
            });
        } catch (error) {
            console.error('Error fetching credentials:', error);
        }
    };

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');

    // Auto-dismiss toast message
    React.useEffect(() => {
        if (submissionMessage) {
            const timer = setTimeout(() => {
                setSubmissionMessage('');
            }, 3000); // Disappear after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [submissionMessage]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    // Compute overall progress based on filled required fields across all steps
    const progress = React.useMemo(() => {
        let total = 0;
        let filled = 0;

        const required = [
            'fullName', 'email', 'personalEmail', 'phoneNumber', 'location',
            'bachelorsGradDate', 'mastersGradDate', 'firstEntryUS',
            'optStartDate', 'optOfferLetterSubmitted',
            'preferredRoles', 'preferredLocations',
            'linkedinId', 'linkedinPassword',
            'indeedId', 'indeedPassword',
            'diceId', 'dicePassword',
            'monsterId', 'monsterPassword',
            'ziprecruiterId', 'ziprecruiterPassword',
            'otherPlatforms'
        ];

        required.forEach(key => {
            total += 1;
            const val = formData[key];
            if (val !== null && val !== undefined) {
                if (typeof val === 'string') {
                    if (val.trim() !== '') filled += 1;
                } else if (typeof File !== 'undefined' && val instanceof File) {
                    filled += 1;
                } else if (typeof val === 'boolean') {
                    // checkbox counts as filled when true
                    if (val) filled += 1;
                } else if (Array.isArray(val)) {
                    if (val.length > 0) filled += 1;
                } else if (val) {
                    filled += 1;
                }
            }
        });

        // If optOfferLetterSubmitted is 'Yes', require offerLetter file
        if (formData.optOfferLetterSubmitted === 'Yes') {
            total += 1;
            const v = formData.offerLetter;
            if (v && (typeof File === 'undefined' || v instanceof File)) filled += 1;
        }

        const percent = total === 0 ? 0 : Math.round((filled / total) * 100);
        return { percent, filled, total };
    }, [formData]);

    const validateStep = (currentStep) => {
        const newErrors = {};
        if (currentStep === 1) {
            if (!formData.fullName) newErrors.fullName = 'Full Name is mandatory';
            if (!formData.email) newErrors.email = 'Email Address is mandatory';
            if (!formData.personalEmail) newErrors.personalEmail = 'Personal Email Address is mandatory';
            if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is mandatory';
            if (!formData.location) newErrors.location = 'Location is mandatory';
        } else if (currentStep === 2) {
            if (!formData.bachelorsGradDate) newErrors.bachelorsGradDate = 'Bachelors Graduation Date is mandatory';
            if (!formData.mastersGradDate) newErrors.mastersGradDate = 'Masters Graduation Date is mandatory';
            if (!formData.firstEntryUS) newErrors.firstEntryUS = 'First Entry into the U.S. is mandatory';
        } else if (currentStep === 3) {
            if (!formData.optStartDate) newErrors.optStartDate = 'OPT Start Date is mandatory';
            if (!formData.optOfferLetterSubmitted) newErrors.optOfferLetterSubmitted = 'This field is mandatory';
            if (formData.optOfferLetterSubmitted === 'Yes' && !formData.offerLetter) {
                newErrors.offerLetter = 'Offer Letter upload is mandatory';
            }
        } else if (currentStep === 4) {
            if (!formData.preferredRoles) newErrors.preferredRoles = 'Preferred Job Roles is mandatory';
            if (!formData.preferredLocations) newErrors.preferredLocations = 'Preferred Location(s) is mandatory';
        } else if (currentStep === 5) {
            const fields = [
                'linkedinId', 'linkedinPassword',
                'indeedId', 'indeedPassword',
                'diceId', 'dicePassword',
                'monsterId', 'monsterPassword',
                'ziprecruiterId', 'ziprecruiterPassword'
            ];
            fields.forEach(f => {
                if (!formData[f]) newErrors[f] = 'Mandatory (enter N/A if not created)';
            });
        } else if (currentStep === 6) {
            if (!formData.otherPlatforms) newErrors.otherPlatforms = 'Mandatory (enter N/A if none)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(6)) return;

        setIsSubmitting(true);

        try {
            const storedToken = localStorage.getItem('accessToken');
            const data = new FormData();

            const keyMapping = {
                fullName: 'full_name',
                email: 'email',
                personalEmail: 'personal_email',
                phoneNumber: 'phone_number',
                location: 'location',
                bachelorsGradDate: 'bachelor_graduation_date',
                mastersGradDate: 'master_graduation_date',
                firstEntryUS: 'first_entry_us',
                optStartDate: 'opt_start_date',
                optOfferLetterSubmitted: 'opt_offer_letter_submitted',
                offerLetter: 'offer_letter',
                preferredRoles: 'preferred_job_roles',
                preferredLocations: 'preferred_locations',
                linkedinId: 'linkedin_id',
                linkedinPassword: 'linkedin_password',
                indeedId: 'indeed_id',
                indeedPassword: 'indeed_password',
                diceId: 'dice_id',
                dicePassword: 'dice_password',
                monsterId: 'monster_id',
                monsterPassword: 'monster_password',
                ziprecruiterId: 'ziprecruiter_id',
                ziprecruiterPassword: 'ziprecruiter_password',
                otherPlatforms: 'other_platforms',
                showInConfirmation: 'show_in_confirmation'
            };

            Object.keys(formData).forEach(key => {
                const apiKey = keyMapping[key] || key;
                const value = formData[key];

                if (key === 'offerLetter') {
                    if (value instanceof File) {
                        data.append(apiKey, value);
                    }
                } else if (typeof value === 'boolean') {
                    data.append(apiKey, value ? 'true' : 'false');
                } else if (value !== null && value !== undefined) {
                    data.append(apiKey, value);
                }
            });

            const url = `${BASE_URL}users/me/credential-sheet/`;
            const response = await fetch(url, {
                method: 'PUT', // Use PUT for update
                body: data,
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });

            if (response.ok) {
                setIsSubmitted(true);
                setSubmissionMessage('Form Submitted Successfully!');
            } else {
                const errData = await response.json();
                console.error('Submission failed errors:', errData);
                let errorMsg = errData.detail || 'Unknown error';
                if (!errData.detail && typeof errData === 'object') {
                    const firstKey = Object.keys(errData)[0];
                    const firstErr = errData[firstKey];
                    errorMsg = `${firstKey}: ${Array.isArray(firstErr) ? firstErr[0] : firstErr}`;
                }
                setSubmissionMessage('Submission failed: ' + errorMsg);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmissionMessage('An error occurred during submission.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="animate-in">
                        <h4 className="fw-bold mb-4">Step 1: Basic Identification</h4>
                        <div className="mb-3">
                            <label className="form-label">Timestamp (Auto-generated)</label>
                            <input type="text" className="form-control" name="timestamp" value={formData.timestamp} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Full Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
                            {errors.fullName && <div className="text-danger small mt-1">{errors.fullName}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email Address <span className="text-danger">*</span></label>
                            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your official email" />
                            {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Personal Email Address <span className="text-danger">*</span></label>
                            <input type="email" className="form-control" name="personalEmail" value={formData.personalEmail} onChange={handleChange} placeholder="Enter your personal email" />
                            {errors.personalEmail && <div className="text-danger small mt-1">{errors.personalEmail}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone Number (with Country Code) <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+1 (000) 000-0000" />
                            {errors.phoneNumber && <div className="text-danger small mt-1">{errors.phoneNumber}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Location (City, State) <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. New York, NY" />
                            {errors.location && <div className="text-danger small mt-1">{errors.location}</div>}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="animate-in">
                        <h4 className="fw-bold mb-4">Step 2: Education Details</h4>
                        <div className="mb-3">
                            <label className="form-label">Bachelors Graduation Date <span className="text-danger">*</span></label>
                            <input type="date" className="form-control" name="bachelorsGradDate" value={formData.bachelorsGradDate} onChange={handleChange} />
                            {errors.bachelorsGradDate && <div className="text-danger small mt-1">{errors.bachelorsGradDate}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Masters Graduation Date <span className="text-danger">*</span></label>
                            <input type="date" className="form-control" name="mastersGradDate" value={formData.mastersGradDate} onChange={handleChange} />
                            {errors.mastersGradDate && <div className="text-danger small mt-1">{errors.mastersGradDate}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">First Entry into the U.S. <span className="text-danger">*</span></label>
                            <input type="date" className="form-control" name="firstEntryUS" value={formData.firstEntryUS} onChange={handleChange} />
                            {errors.firstEntryUS && <div className="text-danger small mt-1">{errors.firstEntryUS}</div>}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="animate-in">
                        <h4 className="fw-bold mb-4">Step 3: OPT & Offer Details</h4>
                        <div className="mb-3">
                            <label className="form-label">OPT Start Date <span className="text-danger">*</span></label>
                            <input type="date" className="form-control" name="optStartDate" value={formData.optStartDate} onChange={handleChange} />
                            {errors.optStartDate && <div className="text-danger small mt-1">{errors.optStartDate}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label d-block text-black">OPT Offer Letter Submitted? <span className="text-danger">*</span></label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="optOfferLetterSubmitted" id="optYes" value="Yes" checked={formData.optOfferLetterSubmitted === 'Yes'} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="optYes">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="optOfferLetterSubmitted" id="optNo" value="No" checked={formData.optOfferLetterSubmitted === 'No'} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="optNo">No</label>
                            </div>
                            {errors.optOfferLetterSubmitted && <div className="text-danger small mt-1">{errors.optOfferLetterSubmitted}</div>}
                        </div>
                        {formData.optOfferLetterSubmitted === 'Yes' && (
                            <div className="mb-3">
                                <label className="form-label">Upload Offer Letter <span className="text-danger">*</span></label>
                                <input type="file" className="form-control" name="offerLetter" onChange={handleChange} accept=".pdf,.doc,.docx" />
                                {errors.offerLetter && <div className="text-danger small mt-1">{errors.offerLetter}</div>}
                            </div>
                        )}
                    </div>
                );
            case 4:
                return (
                    <div className="animate-in">
                        <h4 className="fw-bold mb-4">Step 4: Job Preferences</h4>
                        <div className="mb-3">
                            <label className="form-label">Preferred Job Roles for Marketing <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="preferredRoles" value={formData.preferredRoles} onChange={handleChange} placeholder="e.g. Data Analyst, Software Engineer" />
                            {errors.preferredRoles && <div className="text-danger small mt-1">{errors.preferredRoles}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Preferred Location(s) <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="preferredLocations" value={formData.preferredLocations} onChange={handleChange} placeholder="e.g. Remote, Dallas, TX" />
                            {errors.preferredLocations && <div className="text-danger small mt-1">{errors.preferredLocations}</div>}
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="animate-in" style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
                        <h4 className="fw-bold mb-4">Step 5: Job Portal Credentials</h4>
                        <p className="text-muted small mb-4">If account not created, please enter "N/A"</p>

                        <div className="card mb-3 border-light shadow-sm">
                            <div className="card-body">
                                <h6 className="fw-bold text-primary mb-3">LinkedIn</h6>
                                <div className="row g-2">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="linkedinId" value={formData.linkedinId} onChange={handleChange} placeholder="LinkedIn ID" />
                                        {errors.linkedinId && <div className="text-danger extra-small mt-1">{errors.linkedinId}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <input type="password" name="linkedinPassword" className="form-control" value={formData.linkedinPassword} onChange={handleChange} placeholder="Password" />
                                        {errors.linkedinPassword && <div className="text-danger extra-small mt-1">{errors.linkedinPassword}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3 border-light shadow-sm">
                            <div className="card-body">
                                <h6 className="fw-bold text-info mb-3">Indeed</h6>
                                <div className="row g-2">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="indeedId" value={formData.indeedId} onChange={handleChange} placeholder="Indeed ID" />
                                        {errors.indeedId && <div className="text-danger extra-small mt-1">{errors.indeedId}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <input type="password" name="indeedPassword" className="form-control" value={formData.indeedPassword} onChange={handleChange} placeholder="Password" />
                                        {errors.indeedPassword && <div className="text-danger extra-small mt-1">{errors.indeedPassword}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3 border-light shadow-sm">
                            <div className="card-body">
                                <h6 className="fw-bold text-success mb-3">Dice</h6>
                                <div className="row g-2">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="diceId" value={formData.diceId} onChange={handleChange} placeholder="Dice ID" />
                                        {errors.diceId && <div className="text-danger extra-small mt-1">{errors.diceId}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <input type="password" name="dicePassword" className="form-control" value={formData.dicePassword} onChange={handleChange} placeholder="Password" />
                                        {errors.dicePassword && <div className="text-danger extra-small mt-1">{errors.dicePassword}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3 border-light shadow-sm">
                            <div className="card-body">
                                <h6 className="fw-bold text-warning mb-3">Monster</h6>
                                <div className="row g-2">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="monsterId" value={formData.monsterId} onChange={handleChange} placeholder="Monster ID" />
                                        {errors.monsterId && <div className="text-danger extra-small mt-1">{errors.monsterId}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <input type="password" name="monsterPassword" className="form-control" value={formData.monsterPassword} onChange={handleChange} placeholder="Password" />
                                        {errors.monsterPassword && <div className="text-danger extra-small mt-1">{errors.monsterPassword}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3 border-light shadow-sm">
                            <div className="card-body">
                                <h6 className="fw-bold text-danger mb-3">ZipRecruiter</h6>
                                <div className="row g-2">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="ziprecruiterId" value={formData.ziprecruiterId} onChange={handleChange} placeholder="ZipRecruiter ID" />
                                        {errors.ziprecruiterId && <div className="text-danger extra-small mt-1">{errors.ziprecruiterId}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <input type="password" name="ziprecruiterPassword" className="form-control" value={formData.ziprecruiterPassword} onChange={handleChange} placeholder="Password" />
                                        {errors.ziprecruiterPassword && <div className="text-danger extra-small mt-1">{errors.ziprecruiterPassword}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="animate-in">
                        <h4 className="fw-bold mb-4">Step 6: Other Platforms & Confirmation</h4>
                        <div className="mb-4">
                            <label className="form-label">Mention all other job platform accounts you have <span className="text-danger">*</span></label>
                            <textarea className="form-control" name="otherPlatforms" rows="3" value={formData.otherPlatforms} onChange={handleChange} placeholder="Enter N/A if none."></textarea>
                            {errors.otherPlatforms && <div className="text-danger small mt-1">{errors.otherPlatforms}</div>}
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" name="showInConfirmation" id="showInConfirmation" checked={formData.showInConfirmation} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="showInConfirmation">
                                Show this information in the confirmation email after submission
                            </label>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={inline ? "credential-form-container" : "modal-overlay"} onClick={!inline ? onClose : undefined}>
            <div className={inline ? "credential-form-content" : "modal-content-custom"} onClick={(e) => e.stopPropagation()}>

                <div className="modal-header-custom">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <h5 className="mb-0 fw-bold">Credential Sheet</h5>
                        {!inline && <button className="btn-close" onClick={onClose}></button>}
                    </div>

                    <div className="progress mt-3" style={{ height: '8px' }}>
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${progress.percent}%`, backgroundColor: '#4F46E5' }}
                            aria-valuenow={progress.percent}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <div className="d-flex justify-content-between mt-1">
                        <span className="small text-muted">Step {step} of 6</span>
                        <span className="small text-muted">{progress.percent}% Complete</span>
                    </div>
                </div>

                <div className="modal-body-custom">
                    {submissionMessage && (
                        <div
                            className={`alert ${isSubmitting
                                ? "alert-info"
                                : Object.keys(errors).length > 0 && !isSubmitted
                                    ? "alert-danger"
                                    : "alert-success"
                                } toast-alert shadow-sm position-fixed`}
                            role="alert"
                            style={{ zIndex: 10000 }}
                        >
                            {submissionMessage}
                        </div>
                    )}
                    {isSubmitted ? (
                        <div className="text-center py-5">
                            <div className="mb-4">
                                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                                    <Check />
                                </div>
                            </div>
                            <h3 className="fw-bold">Form Submitted!</h3>
                            <p className="text-muted">Thank you for providing your information.</p>
                            <button className="btn btn-primary mt-5 px-5 py-2 fw-bold" onClick={onClose}>Close</button>
                        </div>
                    ) : (
                        <form onSubmit={(e) => e.preventDefault()}>
                            {renderStep()}
                        </form>
                    )}
                </div>

                {!isSubmitted && (
                    <div className="modal-footer-custom">
                        <div className="d-flex justify-content-between w-100">
                            {step > 1 ? (
                                <button className="btn btn-outline-secondary d-flex align-items-center gap-2 px-4" onClick={prevStep}>
                                    <ChevronLeft /> Previous
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {step < 6 ? (
                                <button
                                    className="btn btn-primary d-flex align-items-center gap-2 px-4 shadow-sm"
                                    style={{ backgroundColor: '#4F46E5', border: 'none' }}
                                    onClick={nextStep}
                                >
                                    Next <ChevronRight />
                                </button>
                            ) : (
                                <button className="btn btn-success d-flex align-items-center gap-2 px-4 shadow-sm" onClick={handleSubmit} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <><span className="spinner-border spinner-border-sm" role="status"></span> Submitting...</>
                                    ) : (
                                        <>Submit Form <Check /></>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    padding: 20px;
                }
                .modal-content-custom {
                    background: white;
                    width: 100%;
                    max-width: 600px;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    display: flex;
                    flex-direction: column;
                    max-height: 90vh;
                    animation: slideUp 0.3s ease-out;
                }
                .modal-header-custom {
                    padding: 24px;
                    border-bottom: 1px solid #f1f5f9;
                }
                .modal-body-custom {
                    padding: 24px;
                    overflow-y: auto;
                    flex: 1;
                }
                .modal-footer-custom {
                    padding: 20px 24px;
                    border-top: 1px solid #f1f5f9;
                    background: #f8fafc;
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                /* Base toast style */
                .toast-alert {
                    top: 20px;                 /* below top */
                    right: 20px;               /* right side on larger screens */
                    z-index: 10000;
                    min-width: 280px;
                    max-width: 440px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    animation: fadeSlideIn 0.35s ease-out forwards;
                    text-align: center;
                }

                /* Small screens: prevent overflow & improve readability */
                @media (max-width: 576px) {
                    .toast-alert {
                        top: 10px;
                        right: 10px;
                        left: 10px;                 /* stretch between left & right */
                        min-width: auto;
                        max-width: 100%;
                        font-size: 0.85rem;          /* slightly smaller text */
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
                .animate-in {
                    animation: fadeIn 0.4s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .form-label {
                    font-weight: 600;
                    color: #334155;
                    font-size: 0.9rem;
                    margin-bottom: 0.5rem;
                }
                .form-control {
                    border-radius: 10px;
                    padding: 12px 16px;
                    border: 1px solid #e2e8f0;
                    font-size: 0.95rem;
                    transition: all 0.2s;
                    color: black !important;
                }
                .form-control:focus {
                    border-color: #4F46E5;
                    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
                }
                .extra-small {
                    font-size: 0.75rem;
                }
                .btn {
                    border-radius: 10px;
                    font-weight: 600;
                    padding: 10px 20px;
                    transition: all 0.2s;
                }
                .btn-primary:active, .btn-primary:hover {
                    background-color: #4338ca !important;
                    transform: translateY(-1px);
                }
                ::-webkit-scrollbar {
                    width: 6px;
                }
                ::-webkit-scrollbar-track {
                    background: #f1f5f9;
                }
                ::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
                .credential-form-container {
                    width: 100%;
                    background: transparent;
                }
                .credential-form-content {
                    background: white;
                    width: 100%;
                    border-radius: 20px;
                    display: flex;
                    flex-direction: column;
                }
            `}</style>

        </div>
    );
};

export default CredentialForm;
