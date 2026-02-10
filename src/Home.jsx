import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Mock Data based on Hyrind requirements
const VALUE_PROPS = [
  {
    iconClass: 'bi bi-people-fill',
    title: 'Dedicated Recruiter Assigned to You',
    description:
      'A dedicated recruiter is assigned to manage your entire journey—from profile positioning to daily job submissions. Your recruiter actively markets your profile, optimizes resumes based on recruiter feedback, and continuously improves results based on response trends.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80' // recruiter/teamwork
  },
  {
    iconClass: 'bi bi-card-checklist',
    title: 'Role-Based Resume & Skills Roadmap',
    description:
      'Your resume and skill roadmap are built around your exact target roles, not generic templates. Based on your intake sheet and industry goals, we create role-specific resumes, align them with job descriptions, and design a skill roadmap supported by curated learning resources to strengthen your profile continuously.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80' // resume/checklist
  },
  {
    iconClass: 'bi bi-mic-fill',
    title: 'Interview & Screening Call Support',
    description:
      'We prepare you to represent yourself with confidence and clarity. Through mock screening calls, communication coaching, and behavioral and technical preparation, we help you present your experience effectively and professionally. Our goal is to ensure you are fully client-ready—confident, articulate, and well-prepared at every stage.',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80' // mic/interview
  },
];

const SERVICES = [
  {
    title: 'Profile Marketing',
    description: 'Targeted submissions • Recruiter-driven applications • Custom resume & LinkedIn optimization • Progress tracking',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', // marketing/analytics
    link: '/services#profile-marketing'
  },
  {
    title: 'Interview & Screening Call Training',
    description: 'Mock calls • Voice & communication improvement • Technical prep • Detailed feedback',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80', // interview/meeting
    link: '/services#interview-practice'
  },
  {
    title: 'Skills Training Program',
    description: 'Role-based skill roadmap • Google Drive resources • Trainer sessions • Real project guidance',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80', // training/learning
    link: '/services#skills-training'
  }
];

const PROCESS_STEPS = [
  { step: 1, title: 'Explore HYRIND & Submit Interest', detail: 'Submit initial interest and upload your basic details.' },
  { step: 2, title: 'Intro Call with HYRIND Team', detail: 'We explain process, timelines, and expectations.' },
  { step: 3, title: 'Approval & Role Alignment', detail: 'Once approved, we align on your target roles.' },
  { step: 4, title: 'Profile Setup & Preparation', detail: 'Complete documents and begin prep sessions.' },
  { step: 5, title: 'Marketing, Training & Interview Support', detail: 'Daily submissions start with ongoing training.' },
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
          padding: 8rem 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .process-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(to bottom, #f8fafc, transparent);
        }
        
        .roadmap-container {
          max-width: 1200px;
          margin: 4rem auto 0;
          position: relative;
        }
        
        /* Desktop Style */
        .roadmap-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          position: relative;
          z-index: 2;
        }
        
        .roadmap-path-svg {
          position: absolute;
          top: 45px;
          left: 0;
          width: 100%;
          height: 100px;
          z-index: 1;
          pointer-events: none;
        }
        
        .step-node {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 10px;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .step-node:nth-child(even) {
          margin-top: 40px;
        }
        
        .step-icon-wrap {
          width: 80px;
          height: 80px;
          background: #ffffff;
          border: 3px solid #3b82f6;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 800;
          color: #1e40af;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          z-index: 3;
        }
        
        .step-node:hover .step-icon-wrap {
          transform: translateY(-10px) rotate(8deg);
          background: #1e40af;
          color: #ffffff;
          border-color: #ffd700;
          box-shadow: 0 20px 40px rgba(30, 64, 175, 0.3);
        }
        
        .step-number-tag {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #ffd700;
          color: #1e40af;
          font-size: 0.75rem;
          font-weight: 900;
          padding: 4px 8px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(255, 215, 0, 0.3);
        }
        
        .step-info {
          padding: 0 10px;
        }
        
        .step-label {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        
        .step-summary {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.5;
        }
        
        @media (max-width: 992px) {
          .roadmap-wrapper {
            flex-direction: column;
            gap: 3rem;
            align-items: flex-start;
          }
          
          .roadmap-path-svg {
            display: none;
          }
          
          .roadmap-container::before {
            content: '';
            position: absolute;
            left: 39px;
            top: 20px;
            bottom: 20px;
            width: 2px;
            background: dashed #3b82f6;
            opacity: 0.3;
          }
          
          .step-node {
            flex-direction: row;
            text-align: left;
            align-items: center;
            gap: 2rem;
            width: 100%;
            padding: 0;
          }
          
          .step-node:nth-child(even) {
            margin-top: 0;
          }
          
          .step-icon-wrap {
            margin-bottom: 0;
            width: 80px;
            height: 80px;
            min-width: 80px;
          }
          
          .step-label {
            font-size: 1.25rem;
          }
        }
        
        @media (max-width: 576px) {
          .step-node {
            gap: 1.25rem;
          }
          
          .step-icon-wrap {
            width: 60px;
            height: 60px;
            min-width: 60px;
            border-radius: 16px;
            font-size: 1.25rem;
          }
          
          .roadmap-container::before {
            left: 29px;
          }
          
          .step-label {
            font-size: 1.1rem;
          }
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
              <h1 className="hero-title" style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', fontWeight: '800' }}>Focus on Skills</span>
                <span style={{ display: 'block', color: '#ffd700', fontWeight: '600' }}>Let Us Handle the Rest</span>
              </h1>
              <p className="hero-subtitle" style={{ maxWidth: '850px', margin: '0 auto 1.5rem', textAlign: 'center' }}>
                We Market Your Profile. You Focus on Your Career Growth.
              </p>
              <p className="hero-subtitle" style={{ maxWidth: '850px', margin: '0 auto 2.5rem', textAlign: 'center' }}>
                At HYRIND, we help candidates land full-time opportunities in the United States without the
                stress of self-marketing. Our recruiter-led platform manages profile marketing, resume
                optimization, job submissions, recruiter outreach, screening call preparation, and end-to-end job
                search support.
                <br /><br />
                We support students, early-career professionals, and experienced candidates across the U.S.
                by combining expert profile marketing, role-based skills training, and real-time interview
                evaluation ensuring every candidate is positioned for the right opportunity at the right time.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                <Link to="/interest" className="btn-custom btn-primary-custom">
                  Submit Interest Form
                </Link>
                <button
                  onClick={() => window.open("https://cal.com/hyrind/15min?layout=mobile", "_blank")}
                  className="btn-custom btn-outline-custom"
                  style={{ background: 'transparent' }}
                >
                  Book a Free Consultation <i className="bi bi-arrow-right-short"></i>
                </button>
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
              <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '1rem', fontStyle: 'italic', maxWidth: '800px', margin: '1rem auto 0' }}>
                "We believe in doing the right thing, in the right way, at the right time - to deliver the right results."
              </p>
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

        <section id="homepage-services" className="value-section">
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
                  <Link to={service.link} className="btn-custom btn-primary-custom" style={{ marginTop: '1rem', display: 'block', textAlign: 'center' }}>
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="process-section">
          <div className="container" style={{ maxWidth: '1400px' }}>
            <div className="section-header">
              <span className="section-tag">Our Workflow</span>
              <h2 className="section-title">Simple Steps to Career Launch</h2>
            </div>

            <div className="roadmap-container">
              {/* Desktop Path SVG */}
              <svg className="roadmap-path-svg" viewBox="0 0 1200 100" fill="none" preserveAspectRatio="none">
                <path d="M0 50 Q 300 0, 600 50 T 1200 50" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8 8" opacity="0.4" />
              </svg>

              <div className="roadmap-wrapper">
                {PROCESS_STEPS.map((step, index) => (
                  <div key={index} className="step-node">
                    <div className="step-icon-wrap">
                      <span className="step-number-tag">STEP 0{step.step}</span>
                      <i className={
                        index === 0 ? "bi bi-search" :
                          index === 1 ? "bi bi-telephone" :
                            index === 2 ? "bi bi-check-circle" :
                              index === 3 ? "bi bi-person-badge" :
                                "bi bi-rocket-takeoff"
                      }></i>
                    </div>
                    <div className="step-info">
                      <h4 className="step-label">{step.title}</h4>
                      <p className="step-summary">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get More Interviews?</h2>
            <p className="cta-subtitle">Join HYRIND and start receiving recruiter calls and real interview opportunities.</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/interest" className="btn-custom btn-primary-custom">Submit Interest</Link>
              <button
                onClick={() => window.open("https://cal.com/hyrind/15min?layout=mobile", "_blank")}
                className="btn-custom btn-outline-custom"
                style={{ background: 'transparent' }}
              >
                Book a Call
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;