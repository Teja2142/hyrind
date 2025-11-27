import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Icons (same style as Register.jsx) ---

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

const Calendar = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const Upload = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const LinkIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const ScrollText = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 2v7h-6v7h-2V7H8V2h12zm-2 2H8v5h4v5h6V9h-4V4z" />
    <path d="M16 20h2v2h-2v-2z" />
    <path d="M8 20h2v2H8v-2z" />
  </svg>
);

const Users = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LogIn = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

// --- Reusable TextInput (same style as Register.jsx, no country dropdown here) ---

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
  countryCode,
}) => {
  const isDate = type === 'date';

  const countryCodes = [
    { name: "Afghanistan", code: "+93", iso: "af", flag: "https://flagcdn.com/w40/af.png" },
    { name: "Albania", code: "+355", iso: "al", flag: "https://flagcdn.com/w40/al.png" },
    { name: "Algeria", code: "+213", iso: "dz", flag: "https://flagcdn.com/w40/dz.png" },
    { name: "Andorra", code: "+376", iso: "ad", flag: "https://flagcdn.com/w40/ad.png" },
    { name: "Angola", code: "+244", iso: "ao", flag: "https://flagcdn.com/w40/ao.png" },
    { name: "Argentina", code: "+54", iso: "ar", flag: "https://flagcdn.com/w40/ar.png" },
    { name: "Armenia", code: "+374", iso: "am", flag: "https://flagcdn.com/w40/am.png" },
    { name: "Australia", code: "+61", iso: "au", flag: "https://flagcdn.com/w40/au.png" },
    { name: "Austria", code: "+43", iso: "at", flag: "https://flagcdn.com/w40/at.png" },
    { name: "Azerbaijan", code: "+994", iso: "az", flag: "https://flagcdn.com/w40/az.png" },

    { name: "Bahrain", code: "+973", iso: "bh", flag: "https://flagcdn.com/w40/bh.png" },
    { name: "Bangladesh", code: "+880", iso: "bd", flag: "https://flagcdn.com/w40/bd.png" },
    { name: "Belgium", code: "+32", iso: "be", flag: "https://flagcdn.com/w40/be.png" },
    { name: "Bhutan", code: "+975", iso: "bt", flag: "https://flagcdn.com/w40/bt.png" },
    { name: "Brazil", code: "+55", iso: "br", flag: "https://flagcdn.com/w40/br.png" },

    { name: "Canada", code: "+1", iso: "ca", flag: "https://flagcdn.com/w40/ca.png" },
    { name: "China", code: "+86", iso: "cn", flag: "https://flagcdn.com/w40/cn.png" },
    { name: "Colombia", code: "+57", iso: "co", flag: "https://flagcdn.com/w40/co.png" },

    { name: "Denmark", code: "+45", iso: "dk", flag: "https://flagcdn.com/w40/dk.png" },
    { name: "Egypt", code: "+20", iso: "eg", flag: "https://flagcdn.com/w40/eg.png" },
    { name: "France", code: "+33", iso: "fr", flag: "https://flagcdn.com/w40/fr.png" },
    { name: "Germany", code: "+49", iso: "de", flag: "https://flagcdn.com/w40/de.png" },
    { name: "Greece", code: "+30", iso: "gr", flag: "https://flagcdn.com/w40/gr.png" },

    { name: "India", code: "+91", iso: "in", flag: "https://flagcdn.com/w40/in.png" },
    { name: "Indonesia", code: "+62", iso: "id", flag: "https://flagcdn.com/w40/id.png" },
    { name: "Iran", code: "+98", iso: "ir", flag: "https://flagcdn.com/w40/ir.png" },
    { name: "Iraq", code: "+964", iso: "iq", flag: "https://flagcdn.com/w40/iq.png" },
    { name: "Ireland", code: "+353", iso: "ie", flag: "https://flagcdn.com/w40/ie.png" },
    { name: "Israel", code: "+972", iso: "il", flag: "https://flagcdn.com/w40/il.png" },
    { name: "Italy", code: "+39", iso: "it", flag: "https://flagcdn.com/w40/it.png" },

    { name: "Japan", code: "+81", iso: "jp", flag: "https://flagcdn.com/w40/jp.png" },

    { name: "Kenya", code: "+254", iso: "ke", flag: "https://flagcdn.com/w40/ke.png" },

    { name: "Malaysia", code: "+60", iso: "my", flag: "https://flagcdn.com/w40/my.png" },
    { name: "Mexico", code: "+52", iso: "mx", flag: "https://flagcdn.com/w40/mx.png" },

    { name: "Nepal", code: "+977", iso: "np", flag: "https://flagcdn.com/w40/np.png" },
    { name: "Netherlands", code: "+31", iso: "nl", flag: "https://flagcdn.com/w40/nl.png" },
    { name: "New Zealand", code: "+64", iso: "nz", flag: "https://flagcdn.com/w40/nz.png" },
    { name: "Nigeria", code: "+234", iso: "ng", flag: "https://flagcdn.com/w40/ng.png" },
    { name: "Norway", code: "+47", iso: "no", flag: "https://flagcdn.com/w40/no.png" },

    { name: "Oman", code: "+968", iso: "om", flag: "https://flagcdn.com/w40/om.png" },

    { name: "Pakistan", code: "+92", iso: "pk", flag: "https://flagcdn.com/w40/pk.png" },
    { name: "Philippines", code: "+63", iso: "ph", flag: "https://flagcdn.com/w40/ph.png" },
    { name: "Poland", code: "+48", iso: "pl", flag: "https://flagcdn.com/w40/pl.png" },
    { name: "Portugal", code: "+351", iso: "pt", flag: "https://flagcdn.com/w40/pt.png" },

    { name: "Qatar", code: "+974", iso: "qa", flag: "https://flagcdn.com/w40/qa.png" },

    { name: "Russia", code: "+7", iso: "ru", flag: "https://flagcdn.com/w40/ru.png" },

    { name: "Saudi Arabia", code: "+966", iso: "sa", flag: "https://flagcdn.com/w40/sa.png" },
    { name: "Singapore", code: "+65", iso: "sg", flag: "https://flagcdn.com/w40/sg.png" },
    { name: "South Africa", code: "+27", iso: "za", flag: "https://flagcdn.com/w40/za.png" },
    { name: "South Korea", code: "+82", iso: "kr", flag: "https://flagcdn.com/w40/kr.png" },
    { name: "Spain", code: "+34", iso: "es", flag: "https://flagcdn.com/w40/es.png" },
    { name: "Sri Lanka", code: "+94", iso: "lk", flag: "https://flagcdn.com/w40/lk.png" },
    { name: "Sweden", code: "+46", iso: "se", flag: "https://flagcdn.com/w40/se.png" },
    { name: "Switzerland", code: "+41", iso: "ch", flag: "https://flagcdn.com/w40/ch.png" },

    { name: "Thailand", code: "+66", iso: "th", flag: "https://flagcdn.com/w40/th.png" },
    { name: "Turkey", code: "+90", iso: "tr", flag: "https://flagcdn.com/w40/tr.png" },

    { name: "UAE", code: "+971", iso: "ae", flag: "https://flagcdn.com/w40/ae.png" },
    { name: "UK", code: "+44", iso: "gb", flag: "https://flagcdn.com/w40/gb.png" },
    { name: "USA", code: "+1", iso: "us", flag: "https://flagcdn.com/w40/us.png" },

    { name: "Vietnam", code: "+84", iso: "vn", flag: "https://flagcdn.com/w40/vn.png" },

    { name: "Yemen", code: "+967", iso: "ye", flag: "https://flagcdn.com/w40/ye.png" },
    { name: "Zimbabwe", code: "+263", iso: "zw", flag: "https://flagcdn.com/w40/zw.png" }
  ];
  // you can later wire this select to state via onChange if needed
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

      <div className={`input-group ${name ==='phone'?'flex-nowrap':''}`}>
        {Icon && (
          <span className="input-group-text bg-white border-end-0">
            <Icon className="h-5 w-5 text-primary opacity-75" />
          </span>
        )}

        {isTextArea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            rows="3"
            className={`form-control ${error ? 'is-invalid border-danger' : 'border-start-0'}`}
            required={required}
            placeholder={placeholder}
          />
        ) : name === 'phone' ? (
          <>
          <div className="row w-100">
            {/* Country code select */}
            <div className="col-4">
              <select
              className="form-select form-select-lg border-start-0 border-end-0 w-100"
              aria-label="Country Code"
              name='countryCode'
              value={countryCode} // default to +1
              defaultValue="+1" // set default if you like (e.g., USA)
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                   ({country.code})
                </option>
              ))}
            </select>
            </div>

            {/* Phone number input */}
         <div className="col-8">
             <input
              type={isDate ? 'text' : type}
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              maxLength={maxLength}
              placeholder={isDate ? 'MM/YYYY' : placeholder}
              onFocus={isDate ? (e) => (e.target.type = 'month') : undefined}
              onBlur={isDate ? (e) => (e.target.type = 'text') : undefined}
              className={`form-control form-control-lg col-9 ${
                error ? 'is-invalid border-danger' : 'border-start-0'
              }`}
              required={required}
              inputMode="numeric"
              min={isDate ? '1950-01' : undefined}
              max={isDate ? '2050-12' : undefined}
            />
         </div>
            </div>
          </>
        ) : (
          <input
            type={isDate ? 'text' : type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            placeholder={isDate ? 'MM/YYYY' : placeholder}
            onFocus={isDate ? (e) => (e.target.type = 'month') : undefined}
            onBlur={isDate ? (e) => (e.target.type = 'text') : undefined}
            className={`form-control form-control-lg ${
              error ? 'is-invalid border-danger' : 'border-start-0'
            }`}
            required={required}
            inputMode={name === 'phone' ? 'numeric' : 'text'}
            min={isDate ? '1950-01' : undefined}
            max={isDate ? '2050-12' : undefined}
          />
        )}

        
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

// --- Interest (Public) Form ---

const Interest = () => {
  const navigate = useNavigate();

  const INTEREST_API_URL = "http://127.0.0.1:8000/api/interest/"; // adjust as needed

  const primaryColor = '#4682B4'; // Steel Blue
  const paleBackground = '#F0F8FF'; // Alice Blue

  const degreeOptions = ["Bachelor's", "Master's", "PhD"];
  const visaOptions = ['F1-OPT', 'F1-CPT', 'H1B', 'Green Card', 'Citizen', 'Other'];
  const referralOptions = ['Google', 'LinkedIn', 'Friend', 'University', 'Other'];

  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',              // masked: +1-XXX-XXX-XXXX
    university: '',
    degree: '',
    major: '',
    visaStatus: 'Citizen',
    graduationDate: '',      // YYYY-MM
    optEndDate: '',          // YYYY-MM conditional
    resumeFile: null,        // Optional
    referralSource: 'Google',
    referralFriendName: '',  // only when Friend
    referralOther: '',       // only when Other
    consentToTerms: false,
    linkedinUrl: '',
    additionalNotes: '',
    countryCode:'+1',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  // --- Validation (similar to Register.jsx) ---

  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // XXX-XXX-XXXX
    const dateRegex = /^\d{4}-\d{2}$/; // YYYY-MM
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    // Required fields from your spec
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'university',
      'degree',
      'major',
      'visaStatus',
      'graduationDate',
      'referralSource',
      'consentToTerms',
    ];

    if (formData.visaStatus === 'F1-OPT') {
      requiredFields.push('optEndDate');
    }

    requiredFields.forEach((field) => {
      if (field === 'consentToTerms') {
        if (!formData[field]) newErrors[field] = 'You must agree to the terms.';
      } else if (
        !formData[field] ||
        (typeof formData[field] === 'string' && formData[field].trim() === '')
      ) {
        newErrors[field] = 'This field is required.';
      }
    });

    // If referral source is Friend => require name
    if (formData.referralSource === 'Friend') {
      if (!formData.referralFriendName || formData.referralFriendName.trim() === '') {
        newErrors.referralFriendName = 'Please mention your friend’s name.';
      }
    }

    // If referral source is Other => require specification
    if (formData.referralSource === 'Other') {
      if (!formData.referralOther || formData.referralOther.trim() === '') {
        newErrors.referralOther = 'Please specify.';
      }
    }

    // Name validation
    if (formData.firstName) {
      if (!nameRegex.test(formData.firstName.trim())) {
        newErrors.firstName = 'Name can only contain letters, spaces, hyphens, and apostrophes.';
      } else if (formData.firstName.length > 50) {
        newErrors.firstName = 'Max 50 characters.';
      }
    }

    if (formData.lastName) {
      if (!nameRegex.test(formData.lastName.trim())) {
        newErrors.lastName = 'Name can only contain letters, spaces, hyphens, and apostrophes.';
      } else if (formData.lastName.length > 50) {
        newErrors.lastName = 'Max 50 characters.';
      }
    }

    // Email validation
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format (e.g., user@domain.com).';
    }

    // Phone validation: +1-XXX-XXX-XXXX
    if (formData.phone) {
      const digitsOnly = formData.phone.replace(/[^\d]/g, '');
      if (digitsOnly.length !== 10) {
        newErrors.phone = 'Phone number must be exactly 10 digits .';
      } else if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Format must be XXX-XXX-XXXX.';
      }
    }

    // Lengths
    if (formData.university.length > 100) newErrors.university = 'Max 100 characters.';
    if (formData.major.length > 100) newErrors.major = 'Max 100 characters.';

    // Dates
    if (formData.graduationDate && !dateRegex.test(formData.graduationDate)) {
      newErrors.graduationDate = 'Date must be in MM/YYYY format.';
    }
    if (formData.visaStatus === 'F1-OPT' && formData.optEndDate && !dateRegex.test(formData.optEndDate)) {
      newErrors.optEndDate = 'Date must be in MM/YYYY format.';
    }

    // Resume: optional, but validate if present
    if (formData.resumeFile) {
      if (formData.resumeFile.size > 5 * 1024 * 1024) {
        newErrors.resumeFile = 'File size must be max 5MB.';
      }
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
      ];
      if (!allowedTypes.includes(formData.resumeFile.type)) {
        newErrors.resumeFile = 'File must be PDF or DOCX/DOC.';
      }
    }

    // URL validation (optional)
    if (formData.linkedinUrl && !urlRegex.test(formData.linkedinUrl)) {
      newErrors.linkedinUrl = 'Invalid URL format (must start with http:// or https://).';
    }

    // Notes length
    if (formData.additionalNotes.length > 500) {
      newErrors.additionalNotes = 'Max 500 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Change Handler (similar pattern to Register.jsx) ---

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let newValue = value;

    if (type === 'file') {
      newValue = files[0];
    } else if (type === 'checkbox') {
      newValue = checked;
    } else if (name === 'phone') {
      // +1-XXX-XXX-XXXX mask
      const originalDigits = value.replace(/[^\d]/g, '');
      const tenDigits = originalDigits.substring(0, 10);

      if (tenDigits.length === 0) {
        newValue = '';
      } else if (tenDigits.length <= 3) {
        newValue = `${tenDigits}`;
      } else if (tenDigits.length <= 6) {
        newValue = `${tenDigits.substring(0, 3)}-${tenDigits.substring(3)}`;
      } else {
        newValue = `${tenDigits.substring(0, 3)}-${tenDigits.substring(3, 6)}-${tenDigits.substring(6)}`;
      }
    } else if (name === 'firstName' || name === 'lastName') {
      const cleanValue = value.replace(/[^a-zA-Z\s'-]/g, '');
      newValue = cleanValue;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmissionMessage('');
  };

  // --- Submit Handler ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setSubmissionMessage('Please correct the highlighted errors before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage('Submitting interest...');

    const apiPayload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phone.replace(/[^\d]/g, ''), // 1 + 10 digits
      university: formData.university,
      country_code: formData.countryCode,
      degree: formData.degree,
      major: formData.major,
      visa_status: formData.visaStatus,
      graduation_date: formData.graduationDate, // YYYY-MM as in Register.jsx
      opt_end_date: formData.visaStatus === 'F1-OPT' ? formData.optEndDate : null,
      resume_file_name: formData.resumeFile ? formData.resumeFile.name : null, // optional
      referral_source: formData.referralSource,
      referral_friend_name: 
        formData.referralSource === 'Friend' 
          ? formData.referralFriendName 
          : formData.referralSource === 'Other'
          ? formData.referralOther
          : null,
      consent_to_terms: formData.consentToTerms,
      linkedin_url: formData.linkedinUrl,
      additional_notes: formData.additionalNotes,
    };

    console.log('Interest API Payload:', apiPayload);

    try {
      const response = await fetch(INTEREST_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      if (response.ok) {
        const result = await response.json();
        setIsSubmitting(false);
        setSubmissionMessage(result.message || 'Thank you for your interest! We will get back to you.');
        console.log('Interest API Success:', result);
        // Optionally reset:
        // setFormData(initialFormState);
      } else {
        const errorData = await response.json();
        setIsSubmitting(false);
        let errorMessage = errorData.detail || errorData.error || 'Submission failed due to server error.';

        if (errorData.errors) {
          const backendErrors = {};
          for (const key in errorData.errors) {
            backendErrors[key] = errorData.errors[key].join(', ');
          }
          setErrors((prev) => ({ ...prev, ...backendErrors }));
          errorMessage = 'Submission failed. Please review the errors.';
        }

        setSubmissionMessage(errorMessage);
        console.error('Interest API Error:', errorData);
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmissionMessage(`Network error. Could not connect to the backend at ${INTEREST_API_URL}.`);
      console.error('Interest Network Error:', error);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-4"
      style={{ backgroundColor: paleBackground }}
    >
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">

                {/* Header */}
                <div className="text-center mb-5">
                  <div className="d-flex justify-content-center mb-4">
                    <div className="p-3 rounded-circle" style={{ backgroundColor: primaryColor + '1A' }}>
                      <Users className="h-8 w-8" style={{ color: primaryColor }} />
                    </div>
                  </div>
                  <h2 className="card-title fw-bold mb-2" style={{ color: primaryColor }}>
                    Interest Form
                  </h2>
                  <p className="text-muted lead">
                    Share your interest and basic academic details. We’ll contact you with relevant opportunities.
                  </p>
                </div>

                {/* Submission Message */}
                {submissionMessage && (
                  <div
                    className={`alert ${
                      isSubmitting
                        ? 'alert-info'
                        : errors && Object.keys(errors).length > 0
                        ? 'alert-danger'
                        : 'alert-success'
                    } text-center mb-4`}
                  >
                    {submissionMessage}
                  </div>
                )}

                <form noValidate onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {/* First Name */}
                    <div className="col-md-6">
                      <TextInput
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        icon={User}
                        required
                        maxLength={50}
                        placeholder="John"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="col-md-6">
                      <TextInput
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        icon={User}
                        required
                        maxLength={50}
                        placeholder="Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <TextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        icon={Mail}
                        required
                        placeholder="you@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div className="col-md-6">
                      <TextInput
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        icon={Phone}
                        required
                        placeholder="+1-000-000-0000"
                        maxLength={15}
                        countryCode={formData.countryCode}
                      />
                    </div>

                    <hr className="my-3" />

                    {/* University */}
                    <div className="col-md-6">
                      <TextInput
                        label="University (Max 100 chars)"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        error={errors.university}
                        icon={GraduationCap}
                        required
                        maxLength={100}
                        placeholder="State University"
                      />
                    </div>

                    {/* Major / Course */}
                    <div className="col-md-6">
                      <TextInput
                        label="Major / Course (Max 100 chars)"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                        error={errors.major}
                        icon={GraduationCap}
                        required
                        maxLength={100}
                        placeholder="Computer Science"
                      />
                    </div>

                    {/* Degree */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold text-dark" htmlFor="degree">
                          Degree<span className="text-danger ms-1">*</span>
                        </label>
                        <select
                          id="degree"
                          name="degree"
                          value={formData.degree}
                          onChange={handleChange}
                          className={`form-select form-select-lg ${errors.degree ? 'is-invalid' : ''}`}
                          required
                        >
                          <option value="" disabled>
                            Select Degree
                          </option>
                          {degreeOptions.map((degree) => (
                            <option key={degree} value={degree}>
                              {degree}
                            </option>
                          ))}
                        </select>
                        {errors.degree && <div className="invalid-feedback d-block">{errors.degree}</div>}
                      </div>
                    </div>

                    {/* Graduation Date */}
                    <div className="col-md-6">
                      <TextInput
                        label="Graduation (MM/YYYY)"
                        name="graduationDate"
                        type="date"
                        value={formData.graduationDate}
                        onChange={handleChange}
                        error={errors.graduationDate}
                        icon={Calendar}
                        required
                      />
                    </div>

                    {/* Visa Status */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold text-dark" htmlFor="visaStatus">
                          Visa Status<span className="text-danger ms-1">*</span>
                        </label>
                        <select
                          id="visaStatus"
                          name="visaStatus"
                          value={formData.visaStatus}
                          onChange={handleChange}
                          className={`form-select form-select-lg ${errors.visaStatus ? 'is-invalid' : ''}`}
                          required
                        >
                          {visaOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        {errors.visaStatus && (
                          <div className="invalid-feedback d-block">{errors.visaStatus}</div>
                        )}
                      </div>
                    </div>

                    {/* OPT End Date (conditional) */}
                    {formData.visaStatus === 'F1-OPT' && (
                      <div className="col-md-6">
                        <TextInput
                          label="OPT End Date (MM/YYYY)"
                          name="optEndDate"
                          type="date"
                          value={formData.optEndDate}
                          onChange={handleChange}
                          error={errors.optEndDate}
                          icon={Calendar}
                          required
                        />
                      </div>
                    )}

                    {/* Resume Upload (Optional) */}
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold text-dark" htmlFor="resumeFile">
                          Resume Upload (PDF/DOCX, Max 5MB){' '}
                          <span className="text-muted">(Optional)</span>
                        </label>
                        <div
                          className={`border rounded-3 p-3 ${
                            errors.resumeFile
                              ? 'border-danger bg-danger bg-opacity-10'
                              : 'border-secondary border-opacity-25'
                          }`}
                        >
                          <div className="d-flex align-items-center">
                            <div
                              className="p-2 rounded-2 me-3"
                              style={{ backgroundColor: primaryColor + '1A' }}
                            >
                              <Upload className="h-5 w-5" style={{ color: primaryColor }} />
                            </div>
                            <div className="flex-grow-1">
                              <input
                                type="file"
                                id="resumeFile"
                                name="resumeFile"
                                onChange={handleChange}
                                className="form-control form-control-lg"
                                accept=".pdf,.docx,.doc"
                              />
                            </div>
                          </div>
                          {formData.resumeFile && (
                            <p className="text-success mt-2 mb-0 d-flex align-items-center fw-semibold">
                              <span className="me-2" style={{ color: primaryColor }}>
                                &bull;
                              </span>
                              Selected: {formData.resumeFile.name} (
                              {(formData.resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                          )}
                        </div>
                        {errors.resumeFile && (
                          <div className="invalid-feedback d-block">{errors.resumeFile}</div>
                        )}
                      </div>
                    </div>

                    {/* Referral Source */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold text-dark" htmlFor="referralSource">
                          Referral Source<span className="text-danger ms-1">*</span>
                        </label>
                        <select
                          id="referralSource"
                          name="referralSource"
                          value={formData.referralSource}
                          onChange={handleChange}
                          className={`form-select form-select-lg ${
                            errors.referralSource ? 'is-invalid' : ''
                          }`}
                          required
                        >
                          {referralOptions.map((source) => (
                            <option key={source} value={source}>
                              {source}
                            </option>
                          ))}
                        </select>
                        {errors.referralSource && (
                          <div className="invalid-feedback d-block">{errors.referralSource}</div>
                        )}
                      </div>
                    </div>

                    {/* Friend name (when referral is Friend) */}
                    {formData.referralSource === 'Friend' && (
                      <div className="col-md-6">
                        <TextInput
                          label="Friend's Name (who referred you to HYRIND)"
                          name="referralFriendName"
                          value={formData.referralFriendName}
                          onChange={handleChange}
                          error={errors.referralFriendName}
                          icon={User}
                          placeholder="Your friend's full name"
                          maxLength={100}
                        />
                      </div>
                    )}

                    {/* Other specification (when referral is Other) */}
                    {formData.referralSource === 'Other' && (
                      <div className="col-md-6">
                        <TextInput
                          label="Please Specify"
                          name="referralOther"
                          value={formData.referralOther}
                          onChange={handleChange}
                          error={errors.referralOther}
                          icon={User}
                          placeholder="How did you hear about us?"
                          maxLength={100}
                        />
                      </div>
                    )}

                    {/* LinkedIn URL (Optional) */}
                    <div className="col-md-6">
                      <TextInput
                        label="LinkedIn Profile URL (Optional)"
                        name="linkedinUrl"
                        type="url"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        error={errors.linkedinUrl}
                        icon={LinkIcon}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>

                    {/* Additional Notes (Optional) */}
                    <div className="col-12">
                      <TextInput
                        label="Additional Notes (Max 500 chars) (Optional)"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        error={errors.additionalNotes}
                        icon={ScrollText}
                        isTextArea
                        maxLength={500}
                        placeholder="Any extra details you want to share (e.g., interests, preferences, etc.)"
                      />
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div
                    className="mt-4 p-4 rounded-3 border"
                    style={{ backgroundColor: primaryColor + '0A', borderColor: primaryColor + '33' }}
                  >
                    <div className="form-check">
                      <input
                        id="consentToTerms"
                        name="consentToTerms"
                        type="checkbox"
                        checked={formData.consentToTerms}
                        onChange={handleChange}
                        className={`form-check-input ${
                          errors.consentToTerms ? 'is-invalid' : ''
                        }`}
                        style={{
                          borderColor: primaryColor,
                          color: primaryColor,
                          backgroundColor: formData.consentToTerms ? primaryColor : 'white',
                        }}
                      />
                      <label htmlFor="consentToTerms" className="form-check-label text-dark fw-medium">
                        I confirm that the information provided is accurate and agree to the{' '}
                        <a
                          href="/TermsConditions"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none fw-bold"
                          style={{ color: primaryColor }}
                        >
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                          href="/PrivacyPolicy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none fw-bold"
                          style={{ color: primaryColor }}
                        >
                          Privacy Policy
                        </a>
                        .
                        <span className="text-danger ms-1">*</span>
                      </label>
                      {errors.consentToTerms && (
                        <div className="invalid-feedback d-block">{errors.consentToTerms}</div>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="mt-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-lg w-100 py-3 fw-bold rounded-pill"
                      style={{ backgroundColor: primaryColor, borderColor: primaryColor, color: 'white' }}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          {submissionMessage || 'Submitting...'}
                        </>
                      ) : (
                        <>
                          <Users className="w-6 h-6 me-2" />
                          Submit Interest
                        </>
                      )}
                    </button>
                  </div>

                  {/* Link to full registration or login */}
                  <div className="text-center mt-4 pt-4 border-top">
                    <p className="text-muted">
                      Want to complete the full application?{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/register')}
                        className="btn btn-link fw-bold text-decoration-none p-0"
                        style={{ color: primaryColor }}
                      >
                        <LogIn className="w-4 h-4 me-1" />
                        Go to Candidate Application
                      </button>
                    </p>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interest;
