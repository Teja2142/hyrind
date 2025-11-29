import React, { useState } from 'react';

export default function Contact() {
  // Initialize state with empty strings to ensure inputs are always "controlled"
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    message: '' 
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    const err = {};
    if (!form.name.trim()) err.name = 'Name is required';
    if (!form.email.trim()) err.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Invalid email';
    if (!form.message.trim()) err.message = 'Please write a message';
    // Validate phone if present (optional but strict if entered)
    if (form.phone && !/^\+?[0-9\-\s]{7,15}$/.test(form.phone)) err.phone = 'Invalid phone number';
    return err;
  }

  // Helper function to get CSRF token from cookies (Standard Django Pattern)
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);

    if (Object.keys(v).length === 0) {
      setIsSubmitting(true);
      setStatus({ type: 'info', msg: 'Sending...' });

      // PAYLOAD: Matches your Django backend serializer exactly
      const payload = {
        full_name: form.name, // Maps UI 'name' -> Backend 'full_name'
        email: form.email,
        phone: form.phone,
        message: form.message
      };

      try {
        const csrfToken = getCookie('csrftoken');
        
        // NOTE: If you get a CORS error here, you MUST configure 'django-cors-headers' on your server.
        const response = await fetch('http://127.0.0.1:8000/api/users/contact/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // Only add CSRF token if it exists to avoid header errors
            ...(csrfToken && { 'X-CSRFTOKEN': csrfToken }),
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          // Success (HTTP 200-299)
          const data = await response.json();
          console.log('Success:', data);
          setStatus({ type: 'success', msg: 'Message sent successfully!' });
          // Reset form safely
          setForm({ name: '', email: '', phone: '', message: '' });
          
          setTimeout(() => setStatus({ type: '', msg: '' }), 5000);
        } else {
          // Server returned an error (HTTP 400, 500, etc.)
          console.error('Server Error:', response.status);
          try {
            const errorData = await response.json();
            console.error('Error Details:', errorData);
          } catch (jsonErr) {
            // Ignore if response isn't JSON
          }
          setStatus({ type: 'error', msg: 'Failed to send. Please try again later.' });
        }
      } catch (error) {
        // Network errors (DNS, CORS, Offline) catch here
        console.error('Network Error:', error);
        
        if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
           setStatus({ type: 'error', msg: 'Connection refused. Please check if the backend is running and CORS is allowed.' });
        } else {
           setStatus({ type: 'error', msg: 'Network error. Please check your connection.' });
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStatus({ type: 'error', msg: 'Please fix the errors above.' });
    }
  }

  return (
    <div className="contact-us-root" aria-live="polite">
      <style>{`
        .contact-us-root {
          font-family: Inter, Roboto, system-ui, -apple-system, 'Segoe UI', Arial;
          max-width: 1080px;
          margin: 0 auto;
          padding: 120px 20px 60px;
          background: white;
        }
        .contact-grid { 
          display:grid; 
          grid-template-columns:1fr 420px; 
          gap:28px; 
          align-items:start;
        }
        @media (max-width:880px){ 
          .contact-grid{ 
            grid-template-columns:1fr;
          }
          .contact-us-root {
            padding: 80px 16px 40px;
          }
        }
        @media (max-width:480px){
          .contact-us-root {
            padding: 60px 12px 30px;
          }
        }

        .card{ 
          background:#ffffff; 
          border-radius:12px; 
          padding:32px; 
          box-shadow:0 6px 18px rgba(13,38,59,0.06);
          background-image: url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=80');
          background-size: cover;
          background-position: center;
          background-blend-mode: overlay;
          background-color: rgba(255, 255, 255, 0.97);
        }
        @media (max-width:880px){
          .card {
            padding: 24px;
          }
        }
        @media (max-width:480px){
          .card {
            padding: 20px;
          }
        }
        .lead{ 
          font-size:24px; 
          margin-bottom:8px; 
          color:#0b2540;
          font-weight: 700;
        }
        @media (max-width:480px){
          .lead {
            font-size: 20px;
          }
        }
        .sub{ 
          color:#475569; 
          margin-bottom:18px;
          font-size: 15px;
        }
        @media (max-width:480px){
          .sub {
            font-size: 14px;
          }
        }

        label{ 
          display:block; 
          font-size:13px; 
          margin-bottom:6px; 
          color:#0b2440;
          font-weight: 500;
        }
        input[type=text], input[type=email], textarea{
          width:100%; 
          padding:10px 12px; 
          border:1px solid #e6eaf0; 
          border-radius:8px; 
          font-size:14px; 
          outline:none;
          background: white;
          transition: all 0.2s ease;
        }
        input::placeholder, textarea::placeholder {
          color: #94a3b8;
        }
        input:focus, textarea:focus{ 
          box-shadow:0 0 0 4px rgba(59,130,246,0.08); 
          border-color:#3b82f6;
        }
        textarea{ 
          min-height:140px; 
          resize:vertical;
          font-family: inherit;
        }
        @media (max-width:480px){
          input[type=text], input[type=email], textarea {
            font-size: 16px; /* Prevents iOS zoom */
          }
          textarea {
            min-height: 120px;
          }
        }

        .error{ 
          color:#b91c1c; 
          font-size:13px; 
          margin-top:6px;
        }
        .btn{ 
          background:#0b72ff; 
          color:white; 
          padding:12px 16px; 
          border-radius:10px; 
          border:none; 
          cursor:pointer; 
          font-weight:600;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .btn:hover {
          background: #0960df;
          transform: translateY(-1px);
        }
        .btn:active {
          transform: translateY(0);
        }
        .btn:disabled {
          background: #94a3b8;
          cursor: not-allowed;
          transform: none;
        }
        @media (max-width:480px){
          .btn {
            padding: 14px 16px;
            font-size: 15px;
          }
        }
        .status{ 
          margin-top:12px; 
          font-size:14px; 
          font-weight: 500;
        }
        .status.success { color: #065f46; }
        .status.error { color: #b91c1c; }
        .status.info { color: #0b72ff; }

        .map-placeholder iframe{
          width:100%; height:260px; border:0; border-radius:10px;
        }
      `}</style>

      <div className="contact-grid">
        <div className="card">
          <h2 className="lead">Contact Us</h2>
          <p className="sub">Feel free to reach out. We usually reply within 24 hours.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div style={{marginTop:12}}>
              <label htmlFor="name">Full name</label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                // Ensure value is never null/undefined to prevent uncontrolled warning
                value={form.name || ''} 
                onChange={handleChange} 
                placeholder="John Doe" 
                disabled={isSubmitting}
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div style={{marginTop:12}}>
              <label htmlFor="email">Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                value={form.email || ''} 
                onChange={handleChange} 
                placeholder="john@example.com" 
                disabled={isSubmitting}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div style={{marginTop:12}}>
              <label htmlFor="phone">Phone</label>
              <input 
                id="phone" 
                name="phone" 
                type="text" 
                value={form.phone || ''} 
                onChange={handleChange} 
                placeholder="+91 98765 43210" 
                disabled={isSubmitting}
              />
              {errors.phone && <div className="error">{errors.phone}</div>}
            </div>

            <div style={{marginTop:12}}>
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={form.message || ''} 
                onChange={handleChange} 
                placeholder="Tell us how we can help you..." 
                disabled={isSubmitting}
              />
              {errors.message && <div className="error">{errors.message}</div>}
            </div>

            <button type="submit" className="btn" style={{marginTop:18}} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {status.msg && (
              <div className={`status ${status.type}`}>
                {status.msg}
              </div>
            )}
          </form>

          <button className="btn" style={{width:'100%',marginTop:16}}>Book Free Call</button>
        </div>

        <aside className="card">
          <h3 className="lead">Visit Us</h3>

          <div className="map-placeholder" style={{marginTop:12}}>
            {/* 🔁 Replace this link with your real office location */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.9278428885073!2d77.10252371491806!3d28.450266982497503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e6f0aa2a3b%3A0x3b83381d1a01c4ad!2sDLF%20CyberHub%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1709274551128"
              allowFullScreen loading="lazy"
              title="Google Maps Location"
            ></iframe>
          </div>

          <div style={{marginTop:18,fontSize:15}}>
            <strong>Email:</strong> support@example.com<br />
            <strong>Phone:</strong> +91 98765 43210
          </div>
        </aside>
      </div>
    </div>
  );
}