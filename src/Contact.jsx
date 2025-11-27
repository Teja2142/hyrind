import React, { useEffect, useState } from 'react';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (submitted) {
      const v = validate({ ...form, [name]: value });
      setErrors(v);
    }
  }

  function validate(currentForm = form) {
    const err = {};
    if (!currentForm.name.trim()) err.name = 'Name is required';
    if (!currentForm.email.trim()) err.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(currentForm.email)) err.email = 'Invalid email';
    if (!currentForm.message.trim()) err.message = 'Please write a message';
    if (!currentForm.phone.trim()) err.phone = 'Phone is required';
    // Basic phone validation allows common formats
    if (currentForm.phone && !/^\+?[0-9\-\s\(\)]{7,15}$/.test(currentForm.phone)) err.phone = 'Invalid phone number';
    return err;
  }

  useEffect(() => {
    // Injecting a simple font for better visual matching (assuming Inter is the font)
    if (!document.getElementById('google-font-inter')) {
      const link = document.createElement('link');
      link.id = 'google-font-inter';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
    // Injecting icons if not present
    if (!document.getElementById('bootstrap-icons')) {
      const linkIcons = document.createElement('link');
      linkIcons.id = 'bootstrap-icons';
      linkIcons.rel = 'stylesheet';
      linkIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
      document.head.appendChild(linkIcons);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      // Simulate submission - replace with fetch/axios to send to your backend
      console.log('Submitting', form);
      setStatus('Message sent — thank you!');
      setForm({ name: '', email: '', subject: '', phone: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
      setSubmitted(false);
      setErrors({}); // Clear errors on successful submission
    } else {
      setStatus('Please fix the errors and try again.');
    }
  }

  return (
    <div className="contact-us-root" aria-live="polite">
      <style>{`
       /* BASE STYLES REFINED (Kept from previous iteration) */
       .contact-us-root {
          font-family: 'Inter', sans-serif;
          max-width: 1080px;
          margin: 32px auto;
          padding: 20px
        }

        /* NOTE: The grid template remains the same. The content order is swapped below. */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 520px;
          gap: 24px; 
          align-items: start
        }

        @media (max-width:880px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        /* CARD STYLES */
        .card {
          background: #ffffff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(13, 38, 59, 0.05); 
          border: 1px solid #f0f4f9; 
        }

        .lead {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #0b2540
        }

        .sub {
          color: #475569;
          margin-bottom: 20px;
          font-size: 15px;
        }

        /* FORM INPUT STYLES */
        label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 6px;
          color: #0b2440
        }

        input[type=text],
        input[type=email],
        input[type=phone],
        textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #e6eaf0;
          border-radius: 8px;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }

        input:focus,
        textarea:focus {
          border-color: #0b72ff; 
          box-shadow: none;
        }

        textarea {
          min-height: 120px;
          resize: vertical
        }

        .error {
          color: #b91c1c;
          font-size: 13px;
          margin-top: 6px;
          display: block; 
        }

        /* BUTTON STYLES */
        .btn-primary-blue {
          background: #0b72ff;
          color: white;
          padding: 12px 14px; 
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          width: 100%; 
          transition: background 0.2s;
        }
        .btn-primary-blue:hover {
          background: #0a63e6;
        }
        
        .btn-secondary-blue {
          background: #0b72ff;
          color: white;
          padding: 12px 14px; 
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          width: 100%;
          font-size: 16px;
          margin-top: 20px;
        }

        /* VISIT & CONNECT STYLES */
        .map-placeholder {
          height: 200px;
          border-radius: 10px;
          background: #f0f4f9; 
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          font-weight: 500;
          margin-bottom: 24px;
        }

        .contact-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          margin-top: 18px;
        }

        .icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: inline-grid;
          place-items: center;
          background: #f0f4f9; 
          color: #0b72ff; 
          flex-shrink: 0;
        }

        .meta {
          font-size: 15px;
          line-height: 1.5;
        }

        .meta strong {
          display: block;
          font-size: 16px;
          font-weight: 600;
          color: #0b2540;
          margin-bottom: 2px;
        }
        
        /* CALENDLY/BOOKING SECTION */
        .booking-section {
          padding-top: 20px;
          margin-top: 20px;
          border-top: 1px solid #f0f4f9; 
        }
        
        .calendly-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #475569;
          margin-bottom: 15px;
        }
        .calendly-header strong {
            color: #0b2540;
            font-weight: 600;
        }
        
        .calendly-promo {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f0f4f9; 
            padding: 10px 15px;
            border-radius: 8px;
        }
        .calendly-promo .logo {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            color: #0b2540;
        }
        .calendly-promo .logo i {
            font-size: 20px;
            color: #0b72ff;
        }
        .calendly-promo button {
            background: #0b72ff;
            color: white;
            padding: 6px 14px;
            border-radius: 8px;
            border: none;
            font-weight: 500;
            cursor: pointer;
        }

        /* EASY SCHEDULING SECTION */
        .easy-scheduling-card {
            background: #ffffff;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 4px 12px rgba(13, 38, 59, 0.05); 
            border: 1px solid #f0f4f9;
            margin-top: 24px;
        }
        .easy-scheduling-card h3 {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 10px;
            color: #0b2540;
        }
        .easy-scheduling-card p {
            color: #475569;
            margin-bottom: 20px;
            font-size: 15px;
        }
        .social-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 10px 14px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
            background: white;
            color: #0b2540;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            margin-top: 12px;
            font-size: 15px;
            transition: background 0.2s;
        }
        .social-btn.google {
            background: #0b72ff;
            color: white;
            border-color: #0b72ff;
            position: relative;
        }
        .social-btn.google::after {
            content: '';
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 60%;
            background: rgba(255,255,255,0.3);
        }
        .social-btn:not(.google):hover {
            background: #f9fafb;
        }
        .social-icon {
            width: 20px;
            height: 20px;
        }
        .status {
          margin-left: 8px;
          font-size: 14px;
          color: #065f46;
          font-weight: 500;
        }

      `}</style>

      <div className="contact-grid">
        
        {/* === RIGHT CARD (Second Column): VISIT & CONNECT (Location/Contact Info) === */}
        <div className="card">
          <h3 className="lead" style={{ fontSize: 22 }}>Visit & Connect</h3>

          <div className="map-placeholder">
            Map / Location here
          </div>

          <div>
            <div className="contact-item">
              <div className="icon-box">
                <i className="bi bi-geo-alt-fill" style={{ fontSize: 20 }}></i>
              </div>
              <div className="meta">
                <strong>Our Office</strong>
                1234 Hyrind St, Suite 100<br />
                Tech City, TC 56789
              </div>
            </div>
            <div className="contact-item">
              <div className="icon-box">
                <i className="bi bi-envelope-at-fill" style={{ fontSize: 20 }}></i>
              </div>
              <div className="meta">
                <strong>Email Us.</strong>
                example@example.com
              </div>
            </div>
            <div className="contact-item">
              <div className="icon-box">
                <i className="bi bi-telephone-outbound" style={{ fontSize: 20 }}></i>
              </div>
              <div className="meta">
                <strong>Call Us</strong>
                XXXXXX-XXXX
              </div>
            </div>
          </div>
        </div>
        
        {/* === RIGHT CARD (First Column): LET'S CONNECT & SCHEDULING (Form/Calendar) === */}
        <div className="card">
          <h2 className="lead" style={{ fontSize: 24 }}>Let's Connect</h2>
          <p className="sub">Feel free to reach out. We usually reply within 24 hours.</p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" />
              {submitted && errors.name && <span className='error'>{errors.name}</span>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
              {submitted && errors.email && <span className='error'>{errors.email}</span>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="phone" value={form.phone} onChange={handleChange} placeholder="0123-456-789" />
              {submitted && errors.phone && <span className='error'>{errors.phone}</span>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="What can we help you with?" />
              {submitted && errors.message && <span className='error'>{errors.message}</span>}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: 18 }}>
              <button type="submit" className="btn-primary-blue" style={{ width: 'auto', padding: '10px 20px', fontWeight: 500 }}>Send Message</button>
              <span className="status">{status}</span>
            </div>
          </form>

          {/* Book Free Call Button - Matches primary style */}
          <button className="btn-secondary-blue">Book Free Call</button>

          {/* Calendly / Google Calendar Section */}
          <div className="booking-section">
            <div className="calendly-header">
                <strong style={{fontSize: '16px'}}>Calendly / Google Calendar</strong>
                <span style={{color: '#475569'}}>English <i className="bi bi-chevron-down" style={{fontSize: '10px'}}></i></span>
            </div>
            <h4 style={{ marginBottom: 6 }}>Calendly / Google Calendar</h4>
            <div style={{ borderRadius: 10, overflow: 'hidden', height: 420 }}>
              <iframe src="https://calendly.com/" style={{ border: 0, width: '100%', height: '100%' }}></iframe>
            </div>
          </div>
        </div>

        
      </div>
      
      
    </div>
  );
}