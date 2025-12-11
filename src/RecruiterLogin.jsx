import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecruiterLogin = () => {
  const navigate = useNavigate();

  // 🔥 Your recruiter login API (assuming recruiters also use same JWT login API)
  const LOGIN_API_URL = "http://127.0.0.1:8000/api/recruiters/login/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ------------------------------------------------------------------------
  // HANDLE INPUT CHANGE
  // ------------------------------------------------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  // ------------------------------------------------------------------------
  // HANDLE SUBMIT
  // ------------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Please fill all fields.");
      return;
    }

    setIsSubmitting(true);
    setMessage("Logging in...");

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store JWT tokens
        localStorage.setItem("accessToken", result.access);
        localStorage.setItem("refreshToken", result.refresh);
        localStorage.setItem('profileType', 'Recruiter');

        setMessage("Login successful! Redirecting...");
        setIsSubmitting(false);

        // Redirect to recruiter profile
        setTimeout(() => {
          navigate("/recruiter-dashboard");
        }, 1000);
      } else {
        setIsSubmitting(false);
        setMessage(result.detail || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Network error. Try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">
          <div className="card shadow-lg p-4 rounded">
            <h2 className="fw-bold text-center mb-4">Recruiter Login</h2>

            {message && (
              <div className="alert alert-info text-center">{message}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-100 py-2 fw-bold"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              {/* Register Link */}
              <p className="text-center mt-3">
                New recruiter?{" "}
                <a href="/recruiter-register" className="text-primary fw-semibold">
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterLogin;
