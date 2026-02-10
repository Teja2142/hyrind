import React from 'react';
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section - Who We Are */}
      <section className="hero-section">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
          alt="Team collaboration"
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">About Us</h1>
            <p className="hero-description">
              HYRIND is a talent marketing and job support platform built to bridge the gap between skills
              and employment. While our core audience includes international students and early-career
              professionals, we support any job seeker looking to market their profile effectively and secure
              full-time opportunities in the U.S.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="serve-section">
        <div className="container">
          <h2 className="section-title">Who We Serve</h2>
          <div className="serve-grid">
            <div className="serve-card">
              <div className="serve-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
                  alt="International students"
                  className="serve-image"
                />
              </div>
              <h3>International Students (F1 / OPT / STEM OPT)</h3>
            </div>
            <div className="serve-card">
              <div className="serve-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
                  alt="Graduates"
                  className="serve-image"
                />
              </div>
              <h3>Graduates</h3>
            </div>
            <div className="serve-card">
              <div className="serve-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80"
                  alt="Early & mid-career professionals"
                  className="serve-image"
                />
              </div>
              <h3>Early & Mid-Career Professionals</h3>
            </div>
            <div className="serve-card">
              <div className="serve-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"
                  alt="Job seekers"
                  className="serve-image"
                />
              </div>
              <h3>Job Seekers Seeking Structured Job Support</h3>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p style={{ fontSize: '1.25rem', color: '#1976d2', fontWeight: '600', fontStyle: 'italic' }}>
              “It doesn’t matter who you are - if you’re serious about your career, we’re here to support you.”
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mission-section-v2">
        <div className="container">
          <div className="mission-grid-v2">
            <div className="mission-content-v2">
              <span className="mission-badge-v2">Purpose Driven</span>
              <h2 className="mission-title-v2">Our Mission</h2>
              <div className="mission-text-wrapper-v2">
                <i className="quote-icon-v2">“</i>
                <p className="mission-text-v2">
                  Our mission is to empower job seekers with the <strong>tools, support, and representation</strong> they need to
                  secure interviews and meaningful career opportunities - so they can focus on <strong>building skills</strong> while we focus on <strong>marketing their profile.</strong>
                </p>
              </div>
            </div>
            <div className="mission-visual-v2">
              <div className="image-stack-v2">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                  alt="Vision and Mission"
                  className="main-image-v2"
                />
                <div className="stat-card-v2">
                  <span className="stat-icon-v2">🎯</span>
                  <div className="stat-info-v2">
                    <span className="stat-label-v2">Our Strategy</span>
                    <span className="stat-value-v2">Focused Growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="approach-section">
        <div className="container">
          <h2 className="section-title">Our Approach</h2>
          <div className="approach-grid">
            <div className="approach-card">
              <div className="icon-wrapper">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="approach-title">Recruiter-Driven Support</h3>
              <p className="approach-text">Expert guidance from our recurring team who actively market your profile.</p>
            </div>

            <div className="approach-card">
              <div className="icon-wrapper">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="approach-title">Personalized Candidate Roadmap</h3>
              <p className="approach-text">Your career journey mapped out with role-based goals and clear timelines.</p>
            </div>

            <div className="approach-card">
              <div className="icon-wrapper">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="approach-title">Hands-On Interview & Skills Training</h3>
              <p className="approach-text">Intensive mock calls and role-specific training sessions to make you client-ready.</p>
            </div>

            <div className="approach-card">
              <div className="icon-wrapper">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="approach-title">End-to-End Job Process Support</h3>
              <p className="approach-text">From profile setup to final job offer, we handle the logistics of your search.</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '30px' }}>
            <div className="approach-card" style={{ padding: '20px' }}>
              <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>Resume optimization for every application</h4>
              <p style={{ color: '#666' }}>We tailor your resume to the specific job description for maximum impact.</p>
            </div>
            <div className="approach-card" style={{ padding: '20px' }}>
              <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>Role-based submissions only</h4>
              <p style={{ color: '#666' }}>Quality over quantity. We only submit you for roles that align with your background.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose HYRIND */}
      <section className="why-section">
        <div className="container">
          <h2 className="section-title">Why Choose HYRIND</h2>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
                  alt="Profile validation"
                  className="why-image"
                />
              </div>
              <div className="why-number">1</div>
              <h3 className="why-title">Expert Profile Validation</h3>
              <p className="why-text">Rigorous screening and validation of your professional history to build hiring trust.</p>
            </div>

            <div className="why-card">
              <div className="why-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80"
                  alt="Resume building"
                  className="why-image"
                />
              </div>
              <div className="why-number">2</div>
              <h3 className="why-title">Customized Resume Building Per Job</h3>
              <p className="why-text">Strategic resume adjustments for every single submission to ensure high response rates.</p>
            </div>

            <div className="why-card">
              <div className="why-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
                  alt="Marketing campaigns"
                  className="why-image"
                />
              </div>
              <div className="why-number">3</div>
              <h3 className="why-title">Monthly Profile Marketing Campaigns</h3>
              <p className="why-text">Active, subscription-based promotion of your profile to top tier recruiters and companies.</p>
            </div>

            <div className="why-card">
              <div className="why-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&q=80"
                  alt="Dedicated mentoring"
                  className="why-image"
                />
              </div>
              <div className="why-number">4</div>
              <h3 className="why-title">Dedicated One-on-One Career Support</h3>
              <p className="why-text">Personalized attention from career experts throughout your entire engagement.</p>
            </div>

            <div className="why-card">
              <div className="why-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
                  alt="Industry connections"
                  className="why-image"
                />
              </div>
              <div className="why-number">5</div>
              <h3 className="why-title">Industry Connections & Proven Results</h3>
              <p className="why-text">Access to an extensive network of hirers with a documented track record of success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Launch Your Career?</h2>
            <p className="cta-text">
              Join HYRIND today and take the first step towards securing your dream job in the US.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <Link to="/register" className="cta-button">
                Get Started
              </Link>
              <Link to="/interest" className="cta-button" style={{ background: 'transparent', border: '2px solid white', color: 'white' }}>
                Interest Form
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .about-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          color: #333333;
          background: #ffffff;
          overflow-x: hidden;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        /* Hero Section */
        .hero-section {
          padding: 100px 0 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
          min-height: 500px;
          display: flex;
          align-items: center;
        }

        .hero-bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #ffffff;
          animation: fadeInDown 0.8s ease-out;
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.8;
          color: #ffffff;
          max-width: 800px;
          margin: 0 auto;
          animation: fadeInUp 0.8s ease-out 0.2s backwards;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        /* Section Styling */
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 50px;
          color: #1976d2;
          position: relative;
          display: inline-block;
          left: 50%;
          transform: translateX(-50%);
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #2196f3, #1976d2);
          border-radius: 2px;
          animation: expandWidth 0.8s ease-out;
        }

        @keyframes expandWidth {
          from { width: 0; }
          to { width: 80px; }
        }

        /* Who We Serve Section */
        .serve-section {
          padding: 80px 0;
          background: #f5f5f5;
        }

        .serve-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .serve-card {
          background: #ffffff;
          border: 2px solid #2196f3;
          border-radius: 12px;
          padding: 0;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .serve-image-wrapper {
          width: 100%;
          height: 220px;
          overflow: hidden;
          border-radius: 10px 10px 0 0;
        }

        .serve-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .serve-card:hover .serve-image {
          transform: scale(1.15);
        }

        .serve-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .serve-card:hover::before {
          left: 100%;
        }

        .serve-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 20px 40px rgba(33, 150, 243, 0.25);
          border-color: #1976d2;
        }

        .serve-card h3 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1976d2;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
          padding: 30px 20px;
        }

        .serve-card:hover h3 {
          transform: scale(1.05);
          color: #0d47a1;
        }

        /* Mission Section V2 */
        .mission-section-v2 {
          padding: 120px 0;
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .mission-grid-v2 {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .mission-badge-v2 {
          display: inline-block;
          padding: 8px 20px;
          background: #e3f2fd;
          color: #1976d2;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }

        .mission-title-v2 {
          font-size: 3rem;
          font-weight: 800;
          color: #0d47a1;
          margin-bottom: 30px;
          position: relative;
        }

        .mission-text-wrapper-v2 {
          position: relative;
          padding-left: 40px;
        }

        .quote-icon-v2 {
          position: absolute;
          left: -10px;
          top: -20px;
          font-size: 8rem;
          color: #1976d2;
          opacity: 0.1;
          font-family: serif;
          font-style: normal;
          line-height: 1;
        }

        .mission-text-v2 {
          font-size: 1.4rem;
          line-height: 1.6;
          color: #374151;
          margin-bottom: 24px;
        }

        .mission-text-v2 strong {
          color: #1976d2;
          font-weight: 700;
        }

        .mission-text-v2.secondary {
          font-size: 1.1rem;
          color: #6b7280;
          border-left: 4px solid #1976d2;
          padding-left: 20px;
        }

        .mission-visual-v2 {
          position: relative;
        }

        .image-stack-v2 {
          position: relative;
          z-index: 1;
        }

        .main-image-v2 {
          width: 100%;
          border-radius: 30px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.15);
          transition: transform 0.5s ease;
        }

        .image-stack-v2:hover .main-image-v2 {
          transform: translateY(-10px);
        }

        .stat-card-v2 {
          position: absolute;
          bottom: -30px;
          left: -30px;
          background: #ffffff;
          padding: 20px 30px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 15px;
          border: 1px solid #f1f5f9;
          animation: floatStat 3s ease-in-out infinite;
        }

        @keyframes floatStat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .stat-icon-v2 {
          font-size: 2rem;
        }

        .stat-info-v2 {
          display: flex;
          flex-direction: column;
        }

        .stat-label-v2 {
          font-size: 0.8rem;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 600;
        }

        .stat-value-v2 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0d47a1;
        }

        @media (max-width: 991px) {
          .mission-grid-v2 {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }
          .mission-text-wrapper-v2 {
            padding-left: 0;
          }
          .mission-text-v2.secondary {
            border-left: none;
            padding-left: 0;
          }
          .stat-card-v2 {
            left: 50%;
            transform: translateX(-50%);
            bottom: -20px;
          }
          @keyframes floatStat {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-10px); }
          }
        }

        /* Approach Section */
        .approach-section {
          padding: 80px 0;
          background: #f5f5f5;
        }

        .approach-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .approach-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 40px 25px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .approach-card::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(33, 150, 243, 0.1);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .approach-card:hover::after {
          width: 300px;
          height: 300px;
        }

        .approach-card:hover {
          transform: translateY(-12px) rotate(2deg);
          box-shadow: 0 16px 36px rgba(33, 150, 243, 0.2);
        }

        .icon-wrapper {
          width: 70px;
          height: 70px;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
          position: relative;
          z-index: 1;
          box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
        }

        .approach-card:hover .icon-wrapper {
          transform: scale(1.2) rotate(360deg);
          box-shadow: 0 8px 24px rgba(33, 150, 243, 0.5);
        }

        .icon {
          width: 36px;
          height: 36px;
          color: white;
        }

        .approach-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #1976d2;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }

        .approach-card:hover .approach-title {
          color: #0d47a1;
          transform: scale(1.05);
        }

        .approach-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #666666;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }

        .approach-card:hover .approach-text {
          color: #333333;
        }

        /* Why Choose HYRIND Section */
        .why-section {
          padding: 80px 0;
          background: #ffffff;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }

        .why-card {
          background: #ffffff;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .why-image-wrapper {
          width: 100%;
          height: 200px;
          overflow: hidden;
          border-radius: 10px 10px 0 0;
        }

        .why-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .why-card:hover .why-image {
          transform: scale(1.1);
        }

        .why-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(33, 150, 243, 0.05), transparent);
          transition: left 0.6s ease;
        }

        .why-card:hover::before {
          left: 100%;
        }

        .why-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 16px 40px rgba(33, 150, 243, 0.25);
          border-color: #2196f3;
        }

        .why-number {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          font-weight: 700;
          margin: 20px auto 15px;
          transition: all 0.4s ease;
          box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
          position: relative;
          z-index: 1;
        }

        .why-card:hover .why-number {
          transform: scale(1.2) rotate(360deg);
          box-shadow: 0 6px 20px rgba(33, 150, 243, 0.5);
        }

        .why-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 10px;
          color: #1976d2;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
          padding: 0 20px;
          text-align: center;
        }

        .why-card:hover .why-title {
          color: #0d47a1;
        }

        .why-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #666666;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
          padding: 0 20px 25px;
          text-align: center;
        }

        .why-card:hover .why-text {
          color: #333333;
        }

        /* CTA Section */
        .cta-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 2px);
          background-size: 60px 60px;
          animation: ctaPattern 25s linear infinite;
        }

        @keyframes ctaPattern {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .cta-content {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #ffffff;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .cta-text {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #ffffff;
          margin-bottom: 40px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          display: inline-block;
          padding: 16px 40px;
          background: #ffffff;
          color: #1976d2;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(33, 150, 243, 0.1);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .cta-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .cta-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
          background: #e3f2fd;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }

          .hero-description {
            font-size: 1.1rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .cta-title {
            font-size: 2rem;
          }

          .serve-grid,
          .approach-grid,
          .why-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero-section,
          .serve-section,
          .mission-section,
          .approach-section,
          .why-section,
          .cta-section {
            padding: 60px 0;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .section-title {
            font-size: 1.7rem;
            margin-bottom: 35px;
          }

          .cta-button {
            padding: 14px 32px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default About;