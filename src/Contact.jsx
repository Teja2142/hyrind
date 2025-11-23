import React, { useState } from 'react';

export default function ContactUs() {
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
      // Simulate submission - replace with fetch/axios to send to your backend
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
        .contact-us-root{font-family: Inter, Roboto, system-ui, -apple-system, 'Segoe UI', Arial;max-width:1080px;margin:32px auto;padding:20px}
        .contact-grid{display:grid;grid-template-columns:1fr 420px;gap:28px;align-items:start}
        @media (max-width:880px){.contact-grid{grid-template-columns:1fr;}}

        .card{background:#ffffff;border-radius:12px;padding:20px;box-shadow:0 6px 18px rgba(13,38,59,0.06)}
        .lead{font-size:20px;margin-bottom:6px;color:#0b2540}
        .sub{color:#475569;margin-bottom:18px}

        form .row{display:flex;gap:12px}
        form .row .field{flex:1}
        label{display:block;font-size:13px;margin-bottom:6px;color:#0b2440}
        input[type=text], input[type=email], textarea{width:100%;padding:10px 12px;border:1px solid #e6eaf0;border-radius:8px;font-size:14px;outline:none}
        input:focus, textarea:focus{box-shadow:0 0 0 4px rgba(59,130,246,0.08);border-color:#3b82f6}
        textarea{min-height:140px;resize:vertical}
        .small{font-size:13px;color:#64748b;margin-top:8px}

        .error{color:#b91c1c;font-size:13px;margin-top:6px}
        .actions{display:flex;gap:12px;align-items:center;margin-top:12px}
        .btn{background:#0b72ff;color:white;padding:10px 14px;border-radius:10px;border:none;cursor:pointer;font-weight:600}
        .btn[disabled]{opacity:0.6;cursor:not-allowed}

        .info-stack{display:flex;flex-direction:column;gap:12px}
        .contact-item{display:flex;gap:12px;align-items:flex-start}
        .avatar{width:44px;height:44px;border-radius:10px;display:inline-grid;place-items:center;background:linear-gradient(135deg,#eef2ff,#e0f2fe);font-weight:700;color:#0b2540}
        .meta{font-size:14px}
        .meta strong{display:block}

        .map-placeholder{height:200px;border-radius:10px;background:linear-gradient(180deg,#f8fafc,#eef2ff);display:flex;align-items:center;justify-content:center;color:#475569}

        .status{margin-left:8px;font-size:14px;color:#065f46}
      `}</style>

      <div className="contact-grid">
        <div className="card">
          <h2 className="lead">Contact Us</h2>
          <p className="sub">Feel free to reach out. We usually reply within 24 hours.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div style={{marginTop:12}}>
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange} />
            </div>

            <div style={{marginTop:12}}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
            </div>

            <div style={{marginTop:12}}>
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="text" value={form.phone} onChange={handleChange} />
            </div>

            <div style={{marginTop:12}}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} />
            </div>

            <button type="submit" className="btn" style={{marginTop:18}}>Send Message</button>
            <div style={{marginTop:12}} className="status">{status}</div>
          </form>

          <button className="btn" style={{width:'100%',marginTop:16}}>Book Free Call</button>
        </div>

        <aside className="card">
          <h3 className="lead">Visit & Connect</h3>

          <div className="map-placeholder" style={{marginTop:12}}>
            Map / Location here
          </div>

          <div style={{marginTop:18}}>
            <h4 style={{marginBottom:6}}>Calendly / Google Calendar</h4>
            <div style={{borderRadius:10,overflow:'hidden',height:420}}>
              <iframe src="https://calendly.com/" style={{border:0,width:'100%',height:'100%'}}></iframe>
            </div>
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
