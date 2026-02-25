import React, { useRef, useState } from 'react';
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

const Plus = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const Trash = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);

// (removed an invalid top-level hook and unused ALL_FIELDS)


const ClientIntakeForm = ({ isOpen, onClose, id, inline = false }) => {
    const BASE_URL = `${base_url.endsWith('/') ? base_url.slice(0, -1) : base_url}/api/`;
    const isfetchClientIntake = useRef(false)
    const [step, setStep] = useState(() => {
        const saved = localStorage.getItem('intake_form_step');
        return saved ? parseInt(saved) : 1;
    });

    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('intake_form_data');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Error parsing saved intake form data", e);
            }
        }
        return {
            // Step 1
            firstName: '',
            lastName: '',
            dob: '',
            phone: '',
            email: '',
            marketingEmail: '',
            marketingPhone: '',
            currentAddress: '',
            mailingAddress: '',

            // Step 2
            visaStatus: '',
            firstEntryUS: '',
            totalYearsUS: '',

            // Step 3
            skilledIn: '',
            currentlyLearning: '',
            experiencedTools: '',
            selfTaughtTools: '',
            nonTechnicalSkills: '',

            // Step 4
            hasWorkExperience: 'No',
            workExperiences: [
                { jobTitle: '', companyName: '', companyAddress: '', startDate: '', endDate: '', jobType: 'Full-time', responsibilities: '' }
            ],

            // Step 5
            highestDegree: '',
            fieldOfStudy: '',
            universityName: '',
            country: '',
            gradMonthYear: '',
            bachelorsField: '',
            bachelorsUniversity: '',
            bachelorsCountry: '',
            bachelorsGradDate: '',
            hasCertifications: 'No',
            certifications: [
                { name: '', organization: '', date: '' }
            ],

            // Step 6
            passportFile: null,
            govIdFile: null,
            visaFile: null,
            workAuthFile: null,
            resumeFile: null,
            desiredJobRoles: '',
            desiredYOE: '',
            linkedinProfile: ''
        };
    });
    React.useEffect(() => {
        if (id) {
            if (isfetchClientIntake.current) {
                return;
            }
            isfetchClientIntake.current = true
            fetchClientIntake(id);
        }
    }, [id]);

    const fetchClientIntake = async (profileId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${BASE_URL}users/client-intake/${profileId}/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };
    // Save progress automatically
    React.useEffect(() => {
        const dataToSave = { ...formData };
        // Don't save files to localStorage
        Object.keys(dataToSave).forEach(key => {
            if (key.includes('File')) dataToSave[key] = null;
        });
        localStorage.setItem('intake_form_data', JSON.stringify(dataToSave));
        localStorage.setItem('intake_form_step', step.toString());
    }, [formData, step]);

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
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
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

        // Fields required across steps 1-3,5-6
        const required = [
            'firstName', 'lastName', 'dob', 'phone', 'email', 'currentAddress', 'mailingAddress',
            'visaStatus', 'firstEntryUS', 'totalYearsUS',
            'skilledIn', 'currentlyLearning', 'experiencedTools',
            'highestDegree', 'fieldOfStudy', 'universityName', 'country', 'gradMonthYear',
            'passportFile', 'govIdFile', 'visaFile', 'workAuthFile', 'resumeFile', 'desiredJobRoles', 'desiredYOE'
        ];

        required.forEach(key => {
            total += 1;
            const val = formData[key];
            if (val !== null && val !== undefined) {
                if (typeof val === 'string') {
                    if (val.trim() !== '') filled += 1;
                } else if (typeof File !== 'undefined' && val instanceof File) {
                    filled += 1;
                } else if (Array.isArray(val)) {
                    if (val.length > 0) filled += 1;
                } else if (val) {
                    filled += 1;
                }
            }
        });

        // Work experience: if user has work experience, each experience requires jobTitle & companyName
        if (formData.hasWorkExperience === 'Yes') {
            const exps = formData.workExperiences || [];
            exps.forEach(exp => {
                total += 2; // jobTitle + companyName
                if (exp.jobTitle && exp.jobTitle.trim() !== '') filled += 1;
                if (exp.companyName && exp.companyName.trim() !== '') filled += 1;
            });
        }

        const percent = total === 0 ? 0 : Math.round((filled / total) * 100);
        return { percent, filled, total };
    }, [formData]);

    const handleWorkExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExperiences = [...formData.workExperiences];
        updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };
        setFormData({ ...formData, workExperiences: updatedExperiences });
    };

    const addWorkExperience = () => {
        if (formData.workExperiences.length < 3) {
            setFormData({
                ...formData,
                workExperiences: [...formData.workExperiences, { jobTitle: '', companyName: '', companyAddress: '', startDate: '', endDate: '', jobType: 'Full-time', responsibilities: '' }]
            });
        }
    };

    const removeWorkExperience = (index) => {
        const updatedExperiences = formData.workExperiences.filter((_, i) => i !== index);
        setFormData({ ...formData, workExperiences: updatedExperiences });
    };

    const handleCertificationChange = (index, e) => {
        const { name, value } = e.target;
        const updatedCertifications = [...formData.certifications];
        updatedCertifications[index] = { ...updatedCertifications[index], [name]: value };
        setFormData({ ...formData, certifications: updatedCertifications });
    };

    const addCertification = () => {
        setFormData({
            ...formData,
            certifications: [...formData.certifications, { name: '', organization: '', date: '' }]
        });
    };

    const removeCertification = (index) => {
        const updatedCertifications = formData.certifications.filter((_, i) => i !== index);
        setFormData({ ...formData, certifications: updatedCertifications });
    };

    const validateStep = (currentStep) => {
        const newErrors = {};
        if (currentStep === 1) {
            if (!formData.firstName) newErrors.firstName = 'First Name is mandatory';
            if (!formData.lastName) newErrors.lastName = 'Last Name is mandatory';
            if (!formData.dob) newErrors.dob = 'Date of Birth is mandatory';
            if (!formData.phone) newErrors.phone = 'Phone Number is mandatory';
            if (!formData.email) newErrors.email = 'Email Address is mandatory';
            if (!formData.currentAddress) newErrors.currentAddress = 'Current Address is mandatory';
            if (!formData.mailingAddress) newErrors.mailingAddress = 'Mailing Address is mandatory';
        } else if (currentStep === 2) {
            if (!formData.visaStatus) newErrors.visaStatus = 'Visa Status is mandatory';
            if (!formData.firstEntryUS) newErrors.firstEntryUS = 'First Entry Date is mandatory';
            if (!formData.totalYearsUS) newErrors.totalYearsUS = 'Total Years in US is mandatory';
        } else if (currentStep === 3) {
            if (!formData.skilledIn) newErrors.skilledIn = 'This field is mandatory';
            if (!formData.currentlyLearning) newErrors.currentlyLearning = 'This field is mandatory';
            if (!formData.experiencedTools) newErrors.experiencedTools = 'This field is mandatory';
        } else if (currentStep === 4) {
            if (formData.hasWorkExperience === 'Yes') {
                formData.workExperiences.forEach((exp, index) => {
                    if (!exp.jobTitle) newErrors[`jobTitle_${index}`] = 'Job Title is required';
                    if (!exp.companyName) newErrors[`companyName_${index}`] = 'Company Name is required';
                });
            }
        } else if (currentStep === 5) {
            if (!formData.highestDegree) newErrors.highestDegree = 'Highest Degree is mandatory';
            if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Field of Study is mandatory';
            if (!formData.universityName) newErrors.universityName = 'University Name is mandatory';
            if (!formData.country) newErrors.country = 'Country is mandatory';
            if (!formData.gradMonthYear) newErrors.gradMonthYear = 'Graduation Date is mandatory';
        } else if (currentStep === 6) {
            if (!formData.passportFile) newErrors.passportFile = 'Passport upload is mandatory';
            if (!formData.govIdFile) newErrors.govIdFile = 'Government ID upload is mandatory';
            if (!formData.visaFile) newErrors.visaFile = 'Visa upload is mandatory';
            if (!formData.workAuthFile) newErrors.workAuthFile = 'Work Authorization upload is mandatory';
            if (!formData.resumeFile) newErrors.resumeFile = 'Resume upload is mandatory';
            if (!formData.desiredJobRoles) newErrors.desiredJobRoles = 'Desired Job Role(s) is mandatory';
            if (!formData.desiredYOE) newErrors.desiredYOE = 'Desired Years of Experience is mandatory';
        }

        if (currentStep === 'all') {
            let allValid = true;
            for (let i = 1; i <= 6; i++) {
                if (!validateStep(i)) allValid = false;
            }
            return allValid;
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
        // Validate all steps before submission
        const isStep1Valid = validateStep(1);
        const isStep2Valid = validateStep(2);
        const isStep3Valid = validateStep(3);
        const isStep4Valid = validateStep(4);
        const isStep5Valid = validateStep(5);
        const isStep6Valid = validateStep(6);

        if (!isStep1Valid || !isStep2Valid || !isStep3Valid || !isStep4Valid || !isStep5Valid || !isStep6Valid) {
            // Find the first step with errors and go to it
            if (!isStep1Valid) setStep(1);
            else if (!isStep2Valid) setStep(2);
            else if (!isStep3Valid) setStep(3);
            else if (!isStep4Valid) setStep(4);
            else if (!isStep5Valid) setStep(5);
            else if (!isStep6Valid) setStep(6);
            return;
        }

        setIsSubmitting(true);

        try {
            const accessToken = localStorage.getItem('accessToken');
            const data = new FormData();

            const keyMapping = {
                firstName: 'first_name',
                lastName: 'last_name',
                dob: 'date_of_birth',
                phone: 'phone_number',
                marketingEmail: 'marketing_email',
                marketingPhone: 'marketing_phone',
                currentAddress: 'current_address',
                mailingAddress: 'mailing_address',
                visaStatus: 'visa_status',
                firstEntryUS: 'first_entry_us',
                totalYearsUS: 'total_years_in_us',
                skilledIn: 'skilled_in',
                currentlyLearning: 'currently_learning',
                experiencedTools: 'experienced_with',
                selfTaughtTools: 'self_taught_tools',
                nonTechnicalSkills: 'non_technical_skills',
                hasWorkExperience: 'has_work_experience',
                workExperiences: 'work_experiences',
                highestDegree: 'highest_degree',
                fieldOfStudy: 'field_of_study',
                universityName: 'university_name',
                country: 'country',
                gradMonthYear: 'grad_month_year',
                bachelorsField: 'bachelors_field',
                bachelorsUniversity: 'bachelors_university',
                bachelorsCountry: 'bachelors_country',
                bachelorsGradDate: 'bachelors_grad_date',
                hasCertifications: 'has_certifications',
                certifications: 'certifications',
                passportFile: 'passport_file',
                govIdFile: 'gov_id_file',
                visaFile: 'visa_file',
                workAuthFile: 'work_auth_file',
                resumeFile: 'resume_file',
                desiredJobRoles: 'desired_job_roles',
                desiredYOE: 'desired_yoe',
                linkedinProfile: 'linkedin_profile'
            };

            Object.keys(formData).forEach(key => {
                const apiKey = keyMapping[key] || key;
                const value = formData[key];

                if (key.includes('File') && value) {
                    data.append(apiKey, value);
                } else if (key === 'workExperiences' && value) {
                    const mappedExperiences = value.map(exp => ({
                        job_title: exp.jobTitle,
                        company_name: exp.companyName,
                        company_address: exp.companyAddress,
                        start_date: exp.startDate,
                        end_date: exp.endDate,
                        job_type: exp.jobType,
                        responsibilities: exp.responsibilities
                    }));
                    data.append(apiKey, JSON.stringify(mappedExperiences));
                } else if (key === 'certifications' && value) {
                    data.append(apiKey, JSON.stringify(value));
                } else if (value !== null && value !== undefined) {
                    data.append(apiKey, value);
                }
            });

            const response = await fetch(BASE_URL + 'users/client-intake/', {
                method: 'POST',
                body: data,
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                setIsSubmitted(true);
                setSubmissionMessage('Intake Form Submitted Successfully!');
                localStorage.removeItem('intake_form_data');
                localStorage.removeItem('intake_form_step');
            } else {
                const errData = await response.json();
                console.error('Submission failed errors:', errData);
                // Extract a human-readable error message
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
            setSubmissionMessage('An error occurred during submission. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="animate-in">
                        <h4 className="fw-bold mb-4">Step 1: Personal Information</h4>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">First Name <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                                {errors.firstName && <div className="text-danger small mt-1">{errors.firstName}</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Last Name <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                                {errors.lastName && <div className="text-danger small mt-1">{errors.lastName}</div>}
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
                                <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
                                {errors.dob && <div className="text-danger small mt-1">{errors.dob}</div>}
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Phone Number (with country code) <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 123 456 7890" />
                                {errors.phone && <div className="text-danger small mt-1">{errors.phone}</div>}
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Email Address <span className="text-danger">*</span></label>
                                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" />
                                {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email for Marketing (Optional)</label>
                                <input type="email" className="form-control" name="marketingEmail" value={formData.marketingEmail} onChange={handleChange} placeholder="marketing@example.com" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Contact for Marketing (Optional)</label>
                                <input type="text" className="form-control" name="marketingPhone" value={formData.marketingPhone} onChange={handleChange} placeholder="+1 ..." />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Current Address <span className="text-danger">*</span></label>
                                <textarea className="form-control" name="currentAddress" value={formData.currentAddress} onChange={handleChange} rows="2" placeholder="Full Current Address"></textarea>
                                {errors.currentAddress && <div className="text-danger small mt-1">{errors.currentAddress}</div>}
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Mailing Address <span className="text-danger">*</span></label>
                                <textarea className="form-control" name="mailingAddress" value={formData.mailingAddress} onChange={handleChange} rows="2" placeholder="Full Mailing Address"></textarea>
                                {errors.mailingAddress && <div className="text-danger small mt-1">{errors.mailingAddress}</div>}
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="animate-in">
                        <h4 className="fw-bold mb-4">Step 2: Immigration & Visa Information</h4>
                        <div className="mb-3">
                            <label className="form-label">Current Visa Status <span className="text-danger">*</span></label>
                            <select className="form-select" name="visaStatus" value={formData.visaStatus} onChange={handleChange}>
                                <option value="">Select Status</option>
                                <option value="F1-OPT">F1-OPT</option>
                                <option value="H1B">H1B</option>
                                <option value="H4 EAD">H4 EAD</option>
                                <option value="Green Card">Green Card</option>
                                <option value="US Citizen">US Citizen</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.visaStatus && <div className="text-danger small mt-1">{errors.visaStatus}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">First Entry into the U.S. <span className="text-danger">*</span></label>
                            <input type="date" className="form-control" name="firstEntryUS" value={formData.firstEntryUS} onChange={handleChange} />
                            {errors.firstEntryUS && <div className="text-danger small mt-1">{errors.firstEntryUS}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Total Years in the U.S. <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="totalYearsUS" value={formData.totalYearsUS} onChange={handleChange} placeholder="e.g. 5" />
                            {errors.totalYearsUS && <div className="text-danger small mt-1">{errors.totalYearsUS}</div>}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="animate-in">
                        <h4 className="fw-bold mb-4">Step 3: Skills & Technical Background</h4>
                        <div className="mb-3">
                            <label className="form-label">Skilled In (Technical Skills) <span className="text-danger">*</span></label>
                            <textarea className="form-control" name="skilledIn" value={formData.skilledIn} onChange={handleChange} rows="3" placeholder="e.g. Python, Java, React, Node.js, AWS"></textarea>
                            {errors.skilledIn && <div className="text-danger small mt-1">{errors.skilledIn}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Currently Learning / Recently Learned <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="currentlyLearning" value={formData.currentlyLearning} onChange={handleChange} placeholder="What are you learning now?" />
                            {errors.currentlyLearning && <div className="text-danger small mt-1">{errors.currentlyLearning}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Experienced With Tools <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="experiencedTools" value={formData.experiencedTools} onChange={handleChange} placeholder="e.g. Docker, Git, SQL, Tableau" />
                            {errors.experiencedTools && <div className="text-danger small mt-1">{errors.experiencedTools}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Learning Now / Self-Taught Tools (Optional)</label>
                            <input type="text" className="form-control" name="selfTaughtTools" value={formData.selfTaughtTools} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Other Non-Technical Skills / Courses (Optional)</label>
                            <input type="text" className="form-control" name="nonTechnicalSkills" value={formData.nonTechnicalSkills} onChange={handleChange} />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="animate-in">
                        <h4 className="fw-bold mb-4">Step 4: Work Experience</h4>
                        <div className="mb-4">
                            <label className="form-label d-block">Do you have work experience? <span className="text-danger">*</span></label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="hasWorkExperience" id="expYes" value="Yes" checked={formData.hasWorkExperience === 'Yes'} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="expYes">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="hasWorkExperience" id="expNo" value="No" checked={formData.hasWorkExperience === 'No'} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="expNo">No</label>
                            </div>
                        </div>

                        {formData.hasWorkExperience === 'Yes' && (
                            <div className="experience-list">
                                {formData.workExperiences.map((exp, index) => (
                                    <div key={index} className="card mb-4 border-light shadow-sm">
                                        <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                            <span className="fw-bold text-primary">Experience #{index + 1}</span>
                                            {formData.workExperiences.length > 1 && (
                                                <button className="btn btn-sm btn-outline-danger border-0" onClick={() => removeWorkExperience(index)}>
                                                    <Trash />
                                                </button>
                                            )}
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Job Title</label>
                                                    <input type="text" className="form-control form-control-sm" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleWorkExperienceChange(index, e)} />
                                                    {errors[`jobTitle_${index}`] && <div className="text-danger extra-small">{errors[`jobTitle_${index}`]}</div>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Company Name</label>
                                                    <input type="text" className="form-control form-control-sm" name="companyName" value={exp.companyName} onChange={(e) => handleWorkExperienceChange(index, e)} />
                                                    {errors[`companyName_${index}`] && <div className="text-danger extra-small">{errors[`companyName_${index}`]}</div>}
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">Company Address</label>
                                                    <input type="text" className="form-control form-control-sm" name="companyAddress" value={exp.companyAddress} onChange={(e) => handleWorkExperienceChange(index, e)} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Start Date</label>
                                                    <input type="date" className="form-control form-control-sm" name="startDate" value={exp.startDate} onChange={(e) => handleWorkExperienceChange(index, e)} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">End Date</label>
                                                    <input type="date" className="form-control form-control-sm" name="endDate" value={exp.endDate} onChange={(e) => handleWorkExperienceChange(index, e)} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Job Type</label>
                                                    <select className="form-select form-select-sm" name="jobType" value={exp.jobType} onChange={(e) => handleWorkExperienceChange(index, e)}>
                                                        <option value="Full-time">Full-time</option>
                                                        <option value="Part-time">Part-time</option>
                                                        <option value="Internship">Internship</option>
                                                    </select>
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">Key Responsibilities / Projects</label>
                                                    <textarea className="form-control form-control-sm" name="responsibilities" value={exp.responsibilities} onChange={(e) => handleWorkExperienceChange(index, e)} rows="3"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {formData.workExperiences.length < 3 && (
                                    <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2" onClick={addWorkExperience}>
                                        <Plus /> Add Another Experience
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                );
            case 5:
                return (
                    <div className="animate-in" style={{ maxHeight: '450px', overflowY: 'auto', paddingRight: '10px' }}>
                        <h4 className="fw-bold mb-4">Step 5: Education & Certifications</h4>
                        <div className="card mb-4 border-primary border-opacity-25 shadow-sm">
                            <div className="card-body">
                                <h6 className="fw-bold text-primary mb-3">Highest Degree Details</h6>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Highest Degree <span className="text-danger">*</span></label>
                                        <select className="form-select" name="highestDegree" value={formData.highestDegree} onChange={handleChange}>
                                            <option value="">Select Degree</option>
                                            <option value="Bachelor's">Bachelor's</option>
                                            <option value="Master's">Master's</option>
                                            <option value="PhD">PhD</option>
                                            <option value="Diploma">Diploma</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.highestDegree && <div className="text-danger extra-small">{errors.highestDegree}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Field of Study <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
                                        {errors.fieldOfStudy && <div className="text-danger extra-small">{errors.fieldOfStudy}</div>}
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">University / Institution Name <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" name="universityName" value={formData.universityName} onChange={handleChange} />
                                        {errors.universityName && <div className="text-danger extra-small">{errors.universityName}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Country <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} />
                                        {errors.country && <div className="text-danger extra-small">{errors.country}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Graduation Month & Year <span className="text-danger">*</span></label>
                                        <input type="date" className="form-control" name="gradMonthYear" value={formData.gradMonthYear} onChange={handleChange} />
                                        {errors.gradMonthYear && <div className="text-danger extra-small">{errors.gradMonthYear}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label d-block">Do you have Professional Certifications? <span className="text-danger">*</span></label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="hasCertifications" id="certYes" value="Yes" checked={formData.hasCertifications === 'Yes'} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="certYes">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="hasCertifications" id="certNo" value="No" checked={formData.hasCertifications === 'No'} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="certNo">No</label>
                            </div>
                        </div>

                        {formData.hasCertifications === 'Yes' && (
                            <div className="certifications-list mt-3">
                                {formData.certifications.map((cert, index) => (
                                    <div key={index} className="card mb-2 border-secondary border-opacity-10">
                                        <div className="card-body p-3">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <small className="fw-bold">Certification #{index + 1}</small>
                                                {formData.certifications.length > 1 && (
                                                    <button className="btn btn-sm text-danger p-0" onClick={() => removeCertification(index)}>
                                                        <Trash />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="row g-2">
                                                <div className="col-12">
                                                    <input type="text" className="form-control form-control-sm" name="name" value={cert.name} onChange={(e) => handleCertificationChange(index, e)} placeholder="Certification Name" />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control form-control-sm" name="organization" value={cert.organization} onChange={(e) => handleCertificationChange(index, e)} placeholder="Issuing Organization" />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="date" className="form-control form-control-sm" name="date" value={cert.date} onChange={(e) => handleCertificationChange(index, e)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="btn btn-link btn-sm p-0 d-flex align-items-center gap-1" onClick={addCertification}>
                                    <Plus /> Add Certification
                                </button>
                            </div>
                        )}
                    </div>
                );
            case 6:
                return (
                    <div className="animate-in" style={{ maxHeight: '450px', overflowY: 'auto', paddingRight: '10px' }}>
                        <h4 className="fw-bold mb-4">Step 6: Uploads & Job Preferences</h4>
                        <div className="row g-3 mb-4">
                            <div className="col-12">
                                <label className="form-label">Upload Passport <span className="text-danger">*</span></label>
                                <input type="file" className="form-control" name="passportFile" onChange={handleChange} accept=".pdf,.jpg,.png" />
                                {errors.passportFile && <div className="text-danger extra-small">{errors.passportFile}</div>}
                            </div>
                            <div className="col-12">
                                <label className="form-label">Upload Government ID (DL / State ID) <span className="text-danger">*</span></label>
                                <input type="file" className="form-control" name="govIdFile" onChange={handleChange} accept=".pdf,.jpg,.png" />
                                {errors.govIdFile && <div className="text-danger extra-small">{errors.govIdFile}</div>}
                            </div>
                            <div className="col-12">
                                <label className="form-label">Upload Visa <span className="text-danger">*</span></label>
                                <input type="file" className="form-control" name="visaFile" onChange={handleChange} accept=".pdf,.jpg,.png" />
                                {errors.visaFile && <div className="text-danger extra-small">{errors.visaFile}</div>}
                            </div>
                            <div className="col-12">
                                <label className="form-label">Upload Work Authorization Proof (OPT / EAD) <span className="text-danger">*</span></label>
                                <input type="file" className="form-control" name="workAuthFile" onChange={handleChange} accept=".pdf,.jpg,.png" />
                                {errors.workAuthFile && <div className="text-danger extra-small">{errors.workAuthFile}</div>}
                            </div>
                            <div className="col-12">
                                <label className="form-label">Upload Original Resume <span className="text-danger">*</span></label>
                                <input type="file" className="form-control" name="resumeFile" onChange={handleChange} accept=".pdf,.doc,.docx" />
                                {errors.resumeFile && <div className="text-danger extra-small">{errors.resumeFile}</div>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Desired Job Role(s) <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="desiredJobRoles" value={formData.desiredJobRoles} onChange={handleChange} placeholder="e.g. Data Analyst, Software Engineer" />
                            {errors.desiredJobRoles && <div className="text-danger small mt-1">{errors.desiredJobRoles}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Desired Years of Experience <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="desiredYOE" value={formData.desiredYOE} onChange={handleChange} placeholder="e.g. 3+" />
                            {errors.desiredYOE && <div className="text-danger small mt-1">{errors.desiredYOE}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">LinkedIn Profile Link (Optional)</label>
                            <input type="url" className="form-control" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
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
                        <h5 className="mb-0 fw-bold">Client Intake Sheet</h5>
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
                            <h3 className="fw-bold">Intake Form Submitted!</h3>
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
                                    disabled={
                                        (step === 1 && (!formData.firstName || !formData.lastName || !formData.dob || !formData.phone || !formData.email || !formData.currentAddress || !formData.mailingAddress)) ||
                                        (step === 2 && (!formData.visaStatus || !formData.firstEntryUS || !formData.totalYearsUS)) ||
                                        (step === 3 && (!formData.skilledIn || !formData.currentlyLearning || !formData.experiencedTools)) ||
                                        (step === 4 && formData.hasWorkExperience === 'Yes' && formData.workExperiences.some(exp => !exp.jobTitle || !exp.companyName)) ||
                                        (step === 5 && (!formData.highestDegree || !formData.fieldOfStudy || !formData.universityName || !formData.country || !formData.gradMonthYear))
                                    }
                                >
                                    Next <ChevronRight />
                                </button>
                            ) : (
                                <button className="btn btn-success d-flex align-items-center gap-2 px-4 shadow-sm" onClick={handleSubmit} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <><span className="spinner-border spinner-border-sm" role="status"></span> Submitting...</>
                                    ) : (
                                        <>Submit Intake Sheet <Check /></>
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
                    max-width: 700px;
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
                    max-width: 460px;
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
                    font-size: 0.85rem;
                    margin-bottom: 0.4rem;
                }
                .form-control, .form-select {
                    border-radius: 10px;
                    padding: 10px 14px;
                    border: 1px solid #e2e8f0;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                    color: black !important;
                }
                .form-control:focus, .form-select:focus {
                    border-color: #4F46E5;
                    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
                }
                .extra-small {
                    font-size: 0.7rem;
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
                    border: 1px solid #f1f5f9;
                }
                .card {
                    border-radius: 12px;
                }
            `}</style>

        </div>
    );
};

export default ClientIntakeForm;
