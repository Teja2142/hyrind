import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecruiterRegister = () => {
  const navigate = useNavigate();
  const API_URL = "http://127.0.0.1:8000/api/recruiters/register/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    company_name: "",
    phone: "",
    linkedin_url: "",
    employee_id: "",
    date_of_joining: "",
    department: "it_staffing",
    specialization: "general_it",
    max_clients: 3,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Validate form fields
  const validate = () => {
    let err = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(formData.email)) err.email = "Invalid email format";
    if (!phoneRegex.test(formData.phone)) err.phone = "Phone must be 10 digits";

    if (formData.password.length < 6)
      err.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirm_password)
      err.confirm_password = "Passwords do not match";

    if (!formData.company_name.trim())
      err.company_name = "Company name is required";

    if (!formData.first_name.trim()) err.first_name = "First name is required";
    if (!formData.last_name.trim()) err.last_name = "Last name is required";
    
    if (!formData.employee_id.trim()) err.employee_id = "Employee ID is required";
    if (!formData.date_of_joining) err.date_of_joining = "Date of joining is required";
    
    if (!formData.department) err.department = "Department is required";
    if (!formData.specialization) err.specialization = "Specialization is required";
    if (!formData.max_clients || formData.max_clients < 1) err.max_clients = "Max clients must be at least 1";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setMessage("Please correct the highlighted errors.");
      return;
    }

    setIsSubmitting(true);
    setMessage("Registering...");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");

        // Redirect after 1.5 sec
        setTimeout(() => {
          navigate("/recruiter-login");
        }, 1500);
      } else {
        setMessage(result.detail || "Registration failed.");
      }

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg p-4">
            <h2 className="fw-bold mb-4 text-center">Recruiter Registration</h2>

            {message && (
              <div className="alert alert-info text-center">{message}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* FIRST NAME */}
              <div className="mb-3">
                <label className="form-label fw-semibold">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  className={`form-control ${
                    errors.first_name ? "is-invalid" : ""
                  }`}
                  value={formData.first_name}
                  onChange={handleChange}
                />
                {errors.first_name && (
                  <small className="text-danger">{errors.first_name}</small>
                )}
              </div>

              {/* LAST NAME */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  className={`form-control ${
                    errors.last_name ? "is-invalid" : ""
                  }`}
                  value={formData.last_name}
                  onChange={handleChange}
                />
                {errors.last_name && (
                  <small className="text-danger">{errors.last_name}</small>
                )}
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              {/* PHONE */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className={`form-control ${
                    errors.phone ? "is-invalid" : ""
                  }`}
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone}</small>
                )}
              </div>

              {/* COMPANY NAME */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  className={`form-control ${
                    errors.company_name ? "is-invalid" : ""
                  }`}
                  value={formData.company_name}
                  onChange={handleChange}
                />
                {errors.company_name && (
                  <small className="text-danger">{errors.company_name}</small>
                )}
              </div>

              {/* LINKEDIN URL */}
              <div className="mb-3">
                <label className="form-label fw-semibold">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedin_url"
                  className="form-control"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                  placeholder="https://linkedin.com"
                />
              </div>

              {/* EMPLOYEE ID */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Employee ID</label>
                <input
                  type="text"
                  name="employee_id"
                  className={`form-control ${
                    errors.employee_id ? "is-invalid" : ""
                  }`}
                  value={formData.employee_id}
                  onChange={handleChange}
                  placeholder="Enter your employee ID"
                />
                {errors.employee_id && (
                  <small className="text-danger">{errors.employee_id}</small>
                )}
              </div>

              {/* DATE OF JOINING */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Date of Joining</label>
                <input
                  type="date"
                  name="date_of_joining"
                  className={`form-control ${
                    errors.date_of_joining ? "is-invalid" : ""
                  }`}
                  value={formData.date_of_joining}
                  onChange={handleChange}
                />
                {errors.date_of_joining && (
                  <small className="text-danger">{errors.date_of_joining}</small>
                )}
              </div>

              {/* DEPARTMENT */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Department</label>
                <select
                  name="department"
                  className={`form-control ${
                    errors.department ? "is-invalid" : ""
                  }`}
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="it_staffing">IT Staffing</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="engineering">Engineering</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="hr">Human Resources</option>
                  <option value="operations">Operations</option>
                </select>
                {errors.department && (
                  <small className="text-danger">{errors.department}</small>
                )}
              </div>

              {/* SPECIALIZATION */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Specialization</label>
                <select
                  name="specialization"
                  className={`form-control ${
                    errors.specialization ? "is-invalid" : ""
                  }`}
                  value={formData.specialization}
                  onChange={handleChange}
                >
                  <option value="">Select Specialization</option>
                  <option value="general_it">General IT</option>
                  <option value="software_development">Software Development</option>
                  <option value="data_science">Data Science</option>
                  <option value="cloud_computing">Cloud Computing</option>
                  <option value="cybersecurity">Cybersecurity</option>
                  <option value="devops">DevOps</option>
                  <option value="qa_testing">QA Testing</option>
                  <option value="network_engineering">Network Engineering</option>
                  <option value="database_administration">Database Administration</option>
                </select>
                {errors.specialization && (
                  <small className="text-danger">{errors.specialization}</small>
                )}
              </div>

              {/* MAX CLIENTS */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Max Clients</label>
                <input
                  type="number"
                  name="max_clients"
                  className={`form-control ${
                    errors.max_clients ? "is-invalid" : ""
                  }`}
                  value={formData.max_clients}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  placeholder="Enter maximum number of clients"
                />
                {errors.max_clients && (
                  <small className="text-danger">{errors.max_clients}</small>
                )}
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  className={`form-control ${
                    errors.confirm_password ? "is-invalid" : ""
                  }`}
                  value={formData.confirm_password}
                  onChange={handleChange}
                />
                {errors.confirm_password && (
                  <small className="text-danger">
                    {errors.confirm_password}
                  </small>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-100 py-2 fw-bold"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>

              {/* Already Have Account */}
              <p className="text-center mt-3">
                Already have an account?{" "}
                <a
                  href="/recruiter-login"
                  className="text-primary fw-semibold"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterRegister;
