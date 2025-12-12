import React from 'react';

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
            <h1 className="hero-title">Who We Are</h1>
            <p className="hero-description">
              HYRIND is a talent marketing and job support platform created to help 
              international students bridge the gap between education and employment.
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
              <h3>F1 / OPT / STEM OPT Students</h3>
            </div>
            <div className="serve-card">
              <div className="serve-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80" 
                  alt="Graduates celebrating" 
                  className="serve-image"
                />
              </div>
              <h3>Master's Graduates</h3>
            </div>
            <div className="serve-card">
              <div className="serve-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80" 
                  alt="Young professionals" 
                  className="serve-image"
                />
              </div>
              <h3>Early Career Professionals</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mission-section">
        <img 
          src="https://images.unsplash.com/photo-1522071901873-411886a10004?w=1920&q=80" 
          alt="Team working together" 
          className="mission-bg-image"
        />
        <div className="mission-overlay"></div>
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <p className="mission-text">
            To empower job seekers with the tools, support, and representation they 
            need to get interview calls and secure opportunities.
          </p>
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
              <p className="approach-text">Expert guidance from experienced recruiters who understand the market</p>
            </div>

            <div className="approach-card">
              <div className="icon-wrapper">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="approach-title">Personalized Skill Roadmaps</h3>
              <p className="approach-text">Customized development plans tailored to your career goals</p>
            </div>

            <div className="approach-card">
              <div className="icon-wrapper">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="approach-title">Hands-On Training</h3>
              <p className="approach-text">Practical sessions to prepare you for real-world interviews</p>
            </div>

            <div className="approach-card">
              <div className="icon-wrapper">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="approach-title">Transparent Process</h3>
              <p className="approach-text">Clear communication at every step of your journey</p>
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
              <p className="why-text">Admin-approved candidate profiles ensure quality and credibility for employers</p>
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
              <h3 className="why-title">Professional Resume Building</h3>
              <p className="why-text">Customized resumes designed to showcase your strengths and stand out</p>
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
              <h3 className="why-title">Monthly Marketing Campaigns</h3>
              <p className="why-text">Continuous profile promotion to our network of recruiters and employers</p>
            </div>

            <div className="why-card">
              <div className="why-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&q=80" 
                  alt="Dedicated career mentoring" 
                  className="why-image"
                />
              </div>
              <div className="why-number">4</div>
              <h3 className="why-title">Dedicated Career Support</h3>
              <p className="why-text">One-on-one guidance throughout your entire job search journey</p>
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
              <h3 className="why-title">Industry Connections</h3>
              <p className="why-text">Access to our established network of hiring managers and companies</p>
            </div>

            <div className="why-card">
              <div className="why-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80" 
                  alt="Success rate" 
                  className="why-image"
                />
              </div>
              <div className="why-number">6</div>
              <h3 className="why-title">Proven Success Rate</h3>
              <p className="why-text">Track record of helping international students secure meaningful employment</p>
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
            <a href="/contact" className="cta-button">
              Get Started
            </a>
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

        /* Mission Section */
        .mission-section {
          padding: 100px 0;
          position: relative;
          overflow: hidden;
          min-height: 500px;
          display: flex;
          align-items: center;
        }

        .mission-bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .mission-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.5) 100%);
          z-index: 1;
        }

        .mission-section .container {
          position: relative;
          z-index: 2;
        }

        .mission-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #2196f3, transparent);
          z-index: 2;
        }

        .mission-text {
          font-size: 1.3rem;
          line-height: 1.8;
          color: #555555;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
          padding: 30px;
          background: linear-gradient(135deg, #f5f9ff 0%, #e3f2fd 100%);
          border-radius: 16px;
          border: 2px solid #bbdefb;
          position: relative;
          animation: floatIn 1s ease-out;
          box-shadow: 0 8px 24px rgba(33, 150, 243, 0.15);
          transition: all 0.4s ease;
        }

        .mission-text:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(33, 150, 243, 0.25);
          border-color: #2196f3;
        }

        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
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