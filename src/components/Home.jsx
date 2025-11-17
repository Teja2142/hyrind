import React, { useEffect } from 'react';

// Mock Data based on Hyrind requirements
const VALUE_PROPS = [
  {
    iconClass: 'bi bi-briefcase-fill',
    title: 'OPT-Specific Onboarding',
    description: 'Specialized support and documentation workflow for F-1 OPT holders to ensure compliance and readiness.',
  },
  {
    iconClass: 'bi bi-lightning-charge-fill',
    title: 'Admin Validation & Approval',
    description: 'All candidates are meticulously vetted and approved by our admin team before marketing begins.',
  },
  {
    iconClass: 'bi bi-journal-check',
    title: 'Resume & Roadmap Creation',
    description: 'Professional resume building and role-based skill roadmap generation to maximize profile visibility.',
  },
];

const PROCESS_STEPS = [
    { step: 1, title: 'Interest Submission', detail: 'Submit your initial interest form and required documents.' },
    { step: 2, title: 'Admin Approval & Payment', detail: 'Get validated and complete the one-time setup fee via Xflow.' },
    { step: 3, title: 'Profile Build & Training', detail: 'Resume is finalized and you are invited to screening-call training.' },
    { step: 4, title: 'Monthly Marketing Launch', detail: 'Your profile is actively marketed to our recruiter network.' },
];

const Home = () => {
  useEffect(() => {
    if (!document.getElementById('bootstrap-css')) {
      const link = document.createElement('link');
      link.id = 'bootstrap-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
      document.head.appendChild(link);
    }

    if (!document.getElementById('bootstrap-icons')) {
        const linkIcons = document.createElement('link');
        linkIcons.id = 'bootstrap-icons';
        linkIcons.rel = 'stylesheet';
        linkIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
        document.head.appendChild(linkIcons);
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        
        
        .home-wrapper {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow-x: hidden;
  background: #0f172a;
}

        
        .hero-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
          position: relative;
          overflow: hidden;
          border-bottom: 3px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="none"/><circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.05)"/></svg>');
          opacity: 0.3;
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
          animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }
        
        .hero-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          line-height: 1.6;
          opacity: 0.95;
        }
        
        .btn-custom {
          padding: 1rem 2.5rem;
          font-weight: 600;
          border-radius: 50px;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          border: none;
        }
        
        .btn-primary-custom {
          background: white;
          color: #1e3a8a;
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary-custom::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
          transition: left 0.5s ease;
        }
        
        .btn-primary-custom:hover::before {
          left: 100%;
        }
        
        .btn-primary-custom:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 40px rgba(255, 255, 255, 0.3);
          color: #1e3a8a;
        }
        
        .btn-outline-custom {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.8);
          position: relative;
          overflow: hidden;
        }
        
        .btn-outline-custom::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }
        
        .btn-outline-custom:hover::after {
          width: 300px;
          height: 300px;
        }
        
        .btn-outline-custom:hover {
          border-color: white;
          transform: translateY(-3px) scale(1.05);
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .section-header {
          margin-bottom: 3rem;
        }
        
        .section-tag {
          color: #60a5fa;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        
        .section-title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          color: white;
          margin-top: 0.5rem;
        }
        
        .value-card {
          background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 20px;
          padding: 2rem;
          height: 100%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .value-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at top left, rgba(59, 130, 246, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .value-card:hover::before {
          opacity: 1;
        }
        
        .value-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 20px 50px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
        }
        
        .value-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2rem;
          color: white;
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
          transition: all 0.4s ease;
        }
        
        .value-card:hover .value-icon {
          transform: rotateY(360deg) scale(1.1);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.6);
        }
        
        .value-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
        }
        
        .value-desc {
          color: #94a3b8;
          line-height: 1.6;
          font-size: 0.95rem;
        }
        
        .process-section {
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
          border-top: 3px solid rgba(59, 130, 246, 0.3);
          border-bottom: 3px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        
        .step-container {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .step-circle {
          width: 80px;
          height: 80px;
          min-width: 80px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 800;
          color: white;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
          transition: all 0.4s ease;
          position: relative;
        }
        
        .step-circle::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          border: 3px solid rgba(59, 130, 246, 0.5);
          transform: scale(1);
          opacity: 0;
          transition: all 0.4s ease;
        }
        
        .step-container:hover .step-circle {
          transform: scale(1.1) rotate(10deg);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.6);
        }
        
        .step-container:hover .step-circle::after {
          transform: scale(1.3);
          opacity: 1;
        }
        
        .step-content {
          flex: 1;
        }
        
        .step-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }
        
        .step-detail {
          color: #94a3b8;
          line-height: 1.6;
        }
        
        .arrow-connector {
          font-size: 3rem;
          color: #3b82f6;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        
        .step-container:hover + div .arrow-connector {
          opacity: 1;
          transform: scale(1.2);
        }
        
        .cta-section {
          background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
          position: relative;
          overflow: hidden;
        }
        
        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
          animation: pulse 15s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }
        
        .cta-content {
          position: relative;
          z-index: 1;
        }
        
        .cta-title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
        }
        
        .cta-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 2rem;
        }
        
        .btn-success-custom {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        }
        
        .btn-success-custom:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(16, 185, 129, 0.4);
          color: white;
        }
        
        .blog-section {
          background: #f8f9fa;
          padding: 4rem 0;
        }
        
        .footer-section {
          background: #1a1a2e;
          color: rgba(255, 255, 255, 0.6);
          padding: 2rem 0;
        }
        
        @media (max-width: 768px) {
          .hero-section {
            padding: 3rem 1rem;
          }
          
          .btn-custom {
            padding: 0.875rem 2rem;
            width: 100%;
            margin-bottom: 1rem;
          }
          
          .value-card {
            margin-bottom: 1.5rem;
          }
          
          .step-container {
            flex-direction: column;
            text-align: center;
          }
          
          .arrow-connector {
            transform: rotate(90deg);
            margin: 1rem 0;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>

      <div>
        {/* Hero Section */}
        <div className="home-wrapper">
        <section className="hero-section" style={{ padding: '5rem 1rem' }}>
          <div className="container hero-content" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 className="hero-title">
                Validate Your Future: <span style={{ color: '#ffd700' }}>F-1 OPT Career Acceleration.</span>
              </h1>
              <p className="hero-subtitle" style={{ maxWidth: '800px', margin: '0 auto 2.5rem' }}>
                The secure web platform built to onboard Master's students, validate their profiles, create job-ready resumes, and launch monthly marketing campaigns.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                <a href="#interest-form" className="btn-custom btn-primary-custom">
                  Get Started & Submit Interest
                </a>
                <a href="#services" className="btn-custom btn-outline-custom">
                  Learn How It Works <i className="bi bi-arrow-right-short"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section id="services" style={{ padding: '5rem 1rem' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <span className="section-tag">Why Hyrind?</span>
              <h2 className="section-title">The Core Pillars of Candidate Success</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {VALUE_PROPS.map((prop, index) => (
                <div key={index}>
                  <div className="value-card">
                    <div className="value-icon">
                      <i className={prop.iconClass}></i>
                    </div>
                    <h3 className="value-title" style={{ textAlign: 'center' }}>{prop.title}</h3>
                    <p className="value-desc" style={{ textAlign: 'center' }}>{prop.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section id="process" className="process-section" style={{ padding: '5rem 1rem' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <span className="section-tag">Our Workflow</span>
              <h2 className="section-title">Simple Steps to Career Launch</h2>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              {PROCESS_STEPS.map((step, index) => (
                <div key={index}>
                  <div className="step-container">
                    <div className="step-circle">{step.step}</div>
                    <div className="step-content">
                      <h4 className="step-title">{step.title}</h4>
                      <p className="step-detail">{step.detail}</p>
                    </div>
                  </div>
                  {index < PROCESS_STEPS.length - 1 && (
                    <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                      <i className="bi bi-arrow-down arrow-connector"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="interest-form" className="cta-section" style={{ padding: '5rem 1rem' }}>
          <div className="container cta-content" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="cta-title">Ready to Accelerate Your Career?</h2>
            <p className="cta-subtitle">
              Submit your interest form now and let's get you validated.
            </p>
            <a href="#top" className="btn-custom btn-success-custom">
              <i className="bi bi-person-fill" style={{ marginRight: '0.5rem' }}></i> Submit Interest Form
            </a>
          </div>
        </section>
        
        {/* Blog Placeholder */}
        <section id="blog" className="blog-section">
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontWeight: '700', color: '#1a1a2e', marginBottom: '1rem' }}>Blog</h2>
            <p style={{ color: '#6c757d' }}>Coming soon — updates, stories, and career tips for international students.</p>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="footer-section">
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} HYRIND. All rights reserved.</p>
          </div>
        </footer>
        </div>
      </div>
    </>
  );
};

export default Home;