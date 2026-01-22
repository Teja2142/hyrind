import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Mock Data based on Hyrind requirements
const VALUE_PROPS = [
  {
    iconClass: 'bi bi-people-fill',
    title: 'Dedicated Recruiter Assigned to You',
    description:
      'A recruiter markets your profile daily, submits applications, and optimizes your resume based on real job descriptions.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80' // recruiter/teamwork
  },
  {
    iconClass: 'bi bi-card-checklist',
    title: 'Role-Based Resume & Skills Roadmap',
    description:
      'Your resume, intake sheet, and skill roadmap are built around your exact target roles rather than generic templates.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80' // resume/checklist
  },
  {
    iconClass: 'bi bi-mic-fill',
    title: 'Interview & Screening Call Support',
    description:
      'Mock screening calls, communication improvement, and behavioral and technical prep until you are fully client-ready.',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80' // mic/interview
  },
];

const SERVICES = [
  {
    title: 'Profile Marketing',
    description: 'Targeted submissions • Recruiter-driven applications • Custom resume & LinkedIn optimization • Progress tracking',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', // marketing/analytics
    link: '/services/profile-marketing'
  },
  {
    title: 'Interview & Screening Call Training',
    description: 'Mock calls • Voice & communication improvement • Technical prep • Detailed feedback',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80', // interview/meeting
    link: '/services/interview-support'
  },
  {
    title: 'Skills Training Program',
    description: 'Role-based skill roadmap • Google Drive resources • Trainer sessions • Real project guidance',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80', // training/learning
    link: '/services/skills-training'
  }
];

const PROCESS_STEPS = [
  { step: 1, title: 'Submit Interest Form', detail: 'Submit initial interest and upload your basic details.' },
  { step: 2, title: 'Call With HYRIND Team', detail: 'We explain pricing, process, timelines, and expectations.' },
  { step: 3, title: 'Admin Approval & Portal Access', detail: 'Once approved, your portal access gets activated.' },
  { step: 4, title: 'Intake Sheets & Role Selection', detail: 'Complete documents and approve job role targeting.' },
  { step: 5, title: 'Pay Initial Fee & Marketing Begins', detail: 'Recruiter assigned → Resume finalized → Daily submissions start.' },
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
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .home-wrapper {
          font-family: Arial, sans-serif;
          overflow-x: hidden;
          background: #ffffff;
        }
        
        .hero-section {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          position: relative;
          overflow: hidden;
          padding: 5rem 2rem;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2);
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
          color: #ffffff;
        }
        
        .hero-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          line-height: 1.6;
          opacity: 0.95;
          color: #ffffff;
        }
        
        .btn-custom {
          padding: 1rem 2.5rem;
          font-weight: 600;
          border-radius: 15px;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          border: none;
        }
        
        .btn-primary-custom {
          background: #ffffff;
          color: #1e40af;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.3);
          color: #1e40af;
        }
        
        .btn-outline-custom {
          background: transparent;
          color: white;
          border: 2px solid #ffffff;
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
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-3px) scale(1.05);
          color: white;
          border-color: white;
        }
        
        .section-padding {
          padding: 5rem 2rem;
        }
        
        .section-header {
          margin-bottom: 3rem;
          text-align: center;
        }
        
        .section-tag {
          color: #3b82f6;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        
        .section-title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          color: #1e40af;
          margin-top: 0.5rem;
        }
        
        .value-section {
          background: #f8fafc;
          padding: 5rem 2rem;
        }
        
        .value-card {
          background: #ffffff;
          border: 2px solid #3b82f6;
          border-radius: 15px;
          padding: 2rem;
          height: 100%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);
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
          border-color: #1e40af;
        }
        
        .value-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2rem;
          color: white;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
          transition: all 0.4s ease;
        }
        
        .value-card:hover .value-icon {
          transform: rotateY(360deg) scale(1.1);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.6);
        }
        
        .value-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .value-desc {
          color: #475569;
          line-height: 1.6;
          font-size: 0.95rem;
          text-align: center;
        }
        
        .value-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
          margin: 1rem 0;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
        }
        
        .value-card:hover .value-image {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }
        
        .process-section {
          background: #ffffff;
          padding: 5rem 2rem;
          border-top: 2px solid #e2e8f0;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .step-container {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }
        
        .step-container:hover {
          transform: translateX(10px);
        }
        
        .step-circle {
          width: 80px;
          height: 80px;
          min-width: 80px;
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 800;
          color: white;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
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
          border-radius: 15px;
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
          color: #1e40af;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
        }
        
        .step-container:hover .step-title {
          color: #3b82f6;
          transform: translateX(5px);
        }
        
        .step-detail {
          color: #475569;
          line-height: 1.6;
          transition: all 0.3s ease;
        }
        
        .step-container:hover .step-detail {
          color: #1e293b;
        }
        
        .arrow-connector {
          font-size: 3rem;
          color: #3b82f6;
          opacity: 0.5;
          transition: all 0.3s ease;
          text-align: center;
          margin: 1rem 0;
        }
        
        .step-container:hover + div .arrow-connector {
          opacity: 1;
          transform: scale(1.2);
        }
        
        .cta-section {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          padding: 5rem 2rem;
          text-align: center;
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
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
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
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
        }
        
        .btn-success-custom {
          background: #10b981;
          color: white;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }
        
        .btn-success-custom:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
          background: #059669;
          color: white;
        }
        
        .blog-section {
          background: #f8fafc;
          padding: 5rem 2rem;
          text-align: center;
        }
        
        .blog-title {
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 1rem;
          font-size: 2rem;
        }
        
        .blog-text {
          color: #475569;
        }
        
        .footer-section {
          background: #1e40af;
          color: rgba(255, 255, 255, 0.8);
          padding: 2rem;
          text-align: center;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .grid-container {
          display: grid;
          gridTemplateColumns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        @media (max-width: 768px) {
          .hero-section {
            padding: 3rem 1.5rem;
          }
          
          .section-padding,
          .value-section,
          .process-section,
          .cta-section,
          .blog-section {
            padding: 3rem 1.5rem;
          }
          
          .btn-custom {
            padding: 0.875rem 2rem;
            width: 100%;
            margin-bottom: 1rem;
          }
          
          .step-container {
            flex-direction: column;
            text-align: center;
          }
          
          .arrow-connector {
            transform: rotate(90deg);
          }
        }
      `}</style>

      <div className="home-wrapper">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container hero-content">
            <div>
              <h1 className="hero-title">
                Focus on Skills. <span style={{ color: '#ffd700' }}>Let Us Handle the Rest.</span>
              </h1>
              <p className="hero-subtitle" style={{ maxWidth: '850px', margin: '0 auto 1.5rem' }}>
                We Market Your Profile. You Focus on Your Career.
              </p>
              <p className="hero-subtitle" style={{ maxWidth: '850px', margin: '0 auto 2.5rem' }}>
                At HYRIND, we help talented candidates land full-time opportunities without the stress of self-marketing.
                Our recruiter-led platform manages resume building, job submissions, recruiter connections, screening-call
                preparation, and complete job search support.
                Supporting F1 / OPT / STEM OPT, MS Students & Early-Career Professionals through expert profile marketing,
                role-based training, and real interview preparation.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                <Link to="/interest" className="btn-custom btn-primary-custom">
                  Submit Interest Form
                </Link>
                <a href="https://merchant.razorpay.com/policy/Rn2giKHxuBBdz0/contact_us" target="_blank" className="btn-custom btn-outline-custom">
                  Book a Free Consultation <i className="bi bi-arrow-right-short"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section id="services" className="value-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Why HYRIND</span>
              <h2 className="section-title">Why Candidates Trust HYRIND</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {VALUE_PROPS.map((prop, index) => (
                <div key={index}>
                  <div className="value-card">
                    <div className="value-icon">
                      <i className={prop.iconClass}></i>
                    </div>
                    <h3 className="value-title">{prop.title}</h3>
                    <img src={prop.image} alt={prop.title} className="value-image" />
                    <p className="value-desc">{prop.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="value-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">What We Offer</span>
              <h2 className="section-title">The Three Services We Provide</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {SERVICES.map((service, index) => (
                <div key={index} className="value-card">
                  <img src={service.image} alt={service.title} className="value-image" />
                  <h3 className="value-title">{service.title}</h3>
                  <p className="value-desc">
                    {service.description}
                  </p>
                  <a href={service.link} className="btn-custom btn-primary-custom" style={{ marginTop: '1rem', display: 'block' }}>
                    Learn More →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section id="process" className="process-section">
          <div className="container">
            <div className="section-header">
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
                    <div className="arrow-connector">
                      <i className="bi bi-arrow-down"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get More Interviews?</h2>
            <p className="cta-subtitle">Join HYRIND and start receiving recruiter calls and real interview opportunities.</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#interest-form" className="btn-custom btn-primary-custom">Submit Interest</a>
              <a href="#contact" className="btn-custom btn-outline-custom">Book a Call</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;