import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Home, Calendar, MapPin, Edit2, Save, X, Upload } from 'lucide-react';

// Text Input Component
const TextInput = ({ label, name, type = 'text', value, onChange, error, icon: Icon, required = false, disabled = false }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-800 block" htmlFor={name}>
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-500" />
        </div>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
        className={`w-full p-4 bg-white text-gray-900 rounded-xl border-2 focus:ring-2 transition-all duration-200
          ${Icon ? 'pl-12' : ''}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          ${error 
            ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' 
            : 'border-gray-200 focus:ring-blue-500/30 focus:border-blue-500 hover:border-gray-300'
          }
        `}
        required={required}
      />
    </div>
    {error && <p className="text-sm text-red-600 font-medium mt-1">{error}</p>}
  </div>
);

// Select Input Component
const SelectInput = ({ label, name, value, onChange, error, options, required = false, disabled = false }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-800 block" htmlFor={name}>
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
      disabled={disabled}
      className={`w-full p-4 border-2 bg-white text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 ${
        disabled ? 'bg-gray-100 cursor-not-allowed' : ''
      } ${
        error ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
      }`}
      required={required}
    >
      <option value="">Select {label}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-sm text-red-600 font-medium mt-1">{error}</p>}
  </div>
);

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    degree: '',
    major: '',
    visaStatus: '',
    graduationDate: '',
    location: '',
    bio: '',
    resume: null
  });

  const [originalData, setOriginalData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });

  const visaOptions = [
    { value: 'F-1 OPT', label: 'F-1 OPT' },
    { value: 'H-1B', label: 'H-1B' },
    { value: 'Citizen', label: 'Citizen' },
    { value: 'Other', label: 'Other' }
  ];

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setOriginalData(data);
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({ type: 'error', text: 'Failed to load profile data' });
      
      // Mock data for demonstration
      const mockData = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        university: 'University of Example',
        degree: 'Bachelor of Science',
        major: 'Computer Science',
        visaStatus: 'F-1 OPT',
        graduationDate: '2024-05-15',
        location: 'New York, NY',
        bio: 'Passionate software developer with experience in React and Node.js.',
        resume: null
      };
      setProfileData(mockData);
      setOriginalData(mockData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!profileData.fullName) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!profileData.email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(profileData.email)) {
      newErrors.email = 'Invalid email address.';
    }

    if (profileData.phone && !/^\d{10}$/.test(profileData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSave = async () => {
    if (!validate()) return;

    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      
      // Append all profile data to FormData
      Object.keys(profileData).forEach(key => {
        if (key === 'resume' && profileData[key] instanceof File) {
          formData.append('resume', profileData[key]);
        } else if (profileData[key] !== null) {
          formData.append(key, profileData[key]);
        }
      });

      const response = await fetch('http://127.0.0.1:8000/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (response.ok) {
        const updatedData = await response.json();
        setProfileData(updatedData);
        setOriginalData(updatedData);
        setIsEditing(false);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setErrors({});
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMessage({ type: '', text: '' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Candidate Profile</h1>
                <p className="text-gray-600">Manage your personal and educational information</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold"
                >
                  <Edit2 className="w-5 h-5 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors duration-200 font-semibold"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 font-semibold disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`p-4 rounded-xl mb-6 ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Profile Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-white/20">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <TextInput
                label="Full Name"
                name="fullName"
                value={profileData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                icon={User}
                required
                disabled={!isEditing}
              />
              
              <TextInput
                label="Email Address"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleChange}
                error={errors.email}
                icon={Mail}
                required
                disabled={!isEditing}
              />
              
              <TextInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={profileData.phone}
                onChange={handleChange}
                error={errors.phone}
                icon={Phone}
                disabled={!isEditing}
              />
              
              <TextInput
                label="Location"
                name="location"
                value={profileData.location}
                onChange={handleChange}
                icon={MapPin}
                disabled={!isEditing}
              />

              {/* Education Information */}
              <TextInput
                label="University"
                name="university"
                value={profileData.university}
                onChange={handleChange}
                error={errors.university}
                icon={Home}
                disabled={!isEditing}
              />
              
              <TextInput
                label="Degree"
                name="degree"
                value={profileData.degree}
                onChange={handleChange}
                error={errors.degree}
                disabled={!isEditing}
              />
              
              <TextInput
                label="Major"
                name="major"
                value={profileData.major}
                onChange={handleChange}
                error={errors.major}
                disabled={!isEditing}
              />
              
              <SelectInput
                label="Visa Status"
                name="visaStatus"
                value={profileData.visaStatus}
                onChange={handleChange}
                error={errors.visaStatus}
                options={visaOptions}
                disabled={!isEditing}
              />

              <TextInput
                label="Graduation Date"
                name="graduationDate"
                type="date"
                value={profileData.graduationDate}
                onChange={handleChange}
                error={errors.graduationDate}
                icon={Calendar}
                disabled={!isEditing}
              />

              {/* Bio */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-800 block" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                  className={`w-full p-4 bg-white text-gray-900 rounded-xl border-2 focus:ring-2 transition-all duration-200 resize-none
                    ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}
                    ${errors.bio 
                      ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' 
                      : 'border-gray-200 focus:ring-blue-500/30 focus:border-blue-500 hover:border-gray-300'
                    }
                  `}
                />
                {errors.bio && <p className="text-sm text-red-600 font-medium mt-1">{errors.bio}</p>}
              </div>

              {/* Resume Upload */}
              {isEditing && (
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-gray-800 block" htmlFor="resume">
                    Update Resume (PDF/DOCX)
                  </label>
                  <div className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                    errors.resume ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Upload className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          id="resume"
                          name="resume"
                          onChange={handleChange}
                          className="block w-full text-sm text-gray-600
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-500 file:text-white
                            hover:file:bg-blue-600 cursor-pointer transition-colors"
                          accept=".pdf,.docx,.doc"
                        />
                      </div>
                    </div>
                    {profileData.resume && (
                      <p className="text-sm text-blue-600 font-medium mt-2 flex items-center">
                        <Upload className="h-4 w-4 mr-2" />
                        {profileData.resume instanceof File ? `Selected: ${profileData.resume.name}` : `Current: ${profileData.resume}`}
                      </p>
                    )}
                  </div>
                  {errors.resume && <p className="text-sm text-red-600 font-medium mt-1">{errors.resume}</p>}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;