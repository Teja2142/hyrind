import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

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
    if (form.phone && !/^\+?[0-9\-\s]{7,15}$/.test(form.phone)) err.phone = 'Invalid phone';
    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      console.log('Submitting', form);
      setStatus('Message sent — thank you!');
      setForm({ name: '', email: '', subject: '', phone: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    } else {
      setStatus('Please fix the errors and try again.');
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
          .contact-us-root { padding: 80px 16px 40px; }
        }
        @media (max-width:480px){
          .contact-us-root { padding: 60px 12px 30px; }
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
          background-color: rgba(255,255,255,0.97);
        }
        @media (max-width:880px){ .card { padding: 24px; } }
        @media (max-width:480px){ .card { padding: 20px; } }
        
        .lead{ font-size:24px; margin-bottom:8px; color:#0b2540; font-weight:700; }
        @media (max-width:480px){ .lead { font-size:20px; } }
        .sub{ color:#475569; margin-bottom:18px; font-size:15px; }
        @media (max-width:480px){ .sub { font-size:14px; } }

        label{ 
          display:block; font-size:13px; margin-bottom:6px; color:#0b2440; font-weight:500;
        }
        input[type=text], input[type=email], textarea{
          width:100%; padding:10px 12px; border:1px solid #e6eaf0; border-radius:8px; 
          font-size:14px; outline:none; background:white;
          transition:all 0.2s ease;
        }
        input::placeholder, textarea::placeholder { color:#94a3b8; }
        input:focus, textarea:focus{
          box-shadow:0 0 0 4px rgba(59,130,246,0.08);
          border-color:#3b82f6;
        }
        textarea{ min-height:140px; resize:vertical; font-family:inherit; }
        @media (max-width:480px){ 
          input, textarea { font-size:16px; } 
          textarea { min-height:120px; }
        }

        .error{ color:#b91c1c; font-size:13px; margin-top:6px; }
        .btn{ 
          background:#0b72ff; color:white; padding:12px 16px; border-radius:10px; 
          border:none; cursor:pointer; font-weight:600; font-size:14px;
          transition:all 0.2s ease;
        }
        .btn:hover { background:#0960df; transform:translateY(-1px); }
        .btn:active { transform:translateY(0); }
        @media (max-width:480px){ .btn { padding:14px 16px; font-size:15px; } }

        .status{ margin-top:12px; font-size:14px; color:#065f46; font-weight:500; }

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
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="John Doe" />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div style={{marginTop:12}}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div style={{marginTop:12}}>
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="text" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
              {errors.phone && <div className="error">{errors.phone}</div>}
            </div>

            <div style={{marginTop:12}}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help you..." />
              {errors.message && <div className="error">{errors.message}</div>}
            </div>

            <button type="submit" className="btn" style={{marginTop:18}}>Send Message</button>
            <div className="status">{status}</div>
          </form>

          <button className="btn" style={{width:'100%',marginTop:16}}>Book Free Call</button>
        </div>

        <aside className="card">
          <h3 className="lead">Visit Us</h3>

          <div className="map-placeholder" style={{marginTop:12}}>
            <iframe 
              src="https://www.google.com/maps?q=Cherukupalle,+Guntur,+Andhra+Pradesh&output=embed"
              allowFullScreen loading="lazy"
            ></iframe>
          </div>

          <div style={{marginTop:18,fontSize:15,lineHeight:'1.6'}}>
            <strong>Merchant Legal Name:</strong><br />
            HYRIND PRIVATE LIMITED<br /><br />

            <strong>Registered Address:</strong><br />
            HNO. 3-43B VIDYANAGAR, BEHIND DR. KHADAR HOSPITAL,<br />
            Cherukupalle, Guntur, Andhra Pradesh 522309<br /><br />

            <strong>Operational Address:</strong><br />
            HNO. 3-43B VIDYANAGAR, BEHIND DR. KHADAR HOSPITAL,<br />
            Cherukupalle, Guntur, Andhra Pradesh 522309<br /><br />

            <strong>Phone:</strong> 7075405791<br />
            <strong>Email:</strong> support@hyrind.com
          </div>
        </aside>
      </div>
    </div>
  );
}
