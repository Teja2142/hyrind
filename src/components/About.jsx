import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section id="about" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">About Hyrind</h1>
              <p className="hero-description">
                Empowering Master's students and F-1 OPT holders to launch their careers in the US job market.
              </p>
            </div>
            <div className="hero-card">
              <div className="mission-card">
                <h5 className="mission-title">Our Mission</h5>
                <p className="mission-text">Bridging the gap between international talent and US employers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-props">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Hyrind?</h2>
            <p className="section-subtitle">We provide comprehensive career launch services tailored for international students</p>
          </div>
          
          <div className="cards-grid">
            <div className="value-card">
              <div className="card-inner">
                <div className="icon-wrapper">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h5 className="card-title">Expert Profile Validation</h5>
                <p className="card-text">Admin-approved candidate profiles ensure quality and credibility for employers.</p>
              </div>
            </div>
            
            <div className="value-card">
              <div className="card-inner">
                <div className="icon-wrapper">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h5 className="card-title">Professional Resume Building</h5>
                <p className="card-text">Customized resumes and skill roadmaps designed to showcase your strengths.</p>
              </div>
            </div>
            
            <div className="value-card">
              <div className="card-inner">
                <div className="icon-wrapper">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h5 className="card-title">Monthly Marketing Campaigns</h5>
                <p className="card-text">Continuous profile promotion to our network of recruiters and employers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="process-timeline">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our 4-Step Process</h2>
          </div>
          
          <div className="timeline">
            <div className="timeline-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h5 className="step-title">Submit Interest Form</h5>
                <p className="step-text">Complete our detailed intake form with your academic and professional background.</p>
              </div>
            </div>
            
            <div className="timeline-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h5 className="step-title">Admin Approval & Onboarding</h5>
                <p className="step-text">Our team reviews your profile and approves qualified candidates for the program.</p>
              </div>
            </div>
            
            <div className="timeline-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h5 className="step-title">Resume Creation & Payment</h5>
                <p className="step-text">Professional resume development and secure payment processing for services.</p>
              </div>
            </div>
            
            <div className="timeline-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h5 className="step-title">Marketing & Career Launch</h5>
                <p className="step-text">Monthly profile promotion, training sessions, and screening call coordination.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Description */}
      <section className="company-description">
        <div className="container">
          <div className="company-content">
            <h3 className="company-title">About Our Company</h3>
            <p className="company-text">
              Hyrind is a specialized platform dedicated to supporting Master's degree students, 
              particularly F-1 OPT holders, in their journey to secure meaningful employment in 
              the United States. We understand the unique challenges faced by international 
              students and have developed a comprehensive system to address them.
            </p>
            <p className="company-text">
              Our platform combines expert profile validation, professional resume development, 
              and ongoing marketing to connect qualified candidates with potential employers. 
              Through our secure payment system and CRM integration, we provide a seamless 
              experience for both candidates and recruiters.
            </p>
            <p className="company-text">
              We believe in transparency, security, and results. Our PCI-compliant payment 
              processing, responsive design, and commitment to accessibility ensure that 
              every candidate receives the professional support they deserve throughout 
              their job search journey.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Our Commitment</h2>
            <p className="cta-text">
              We're dedicated to helping international students navigate the complexities of 
              the US job market with confidence and success.
            </p>
            <a href="/contact" className="cta-button">
              Get Started Today
            </a>
          </div>
        </div>
      </section>

      <style>{`
        

        .about-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          color: #ffffff;
          background: #0a1929;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .hero-section {
          background: linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #01579b 100%);
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 50%, rgba(33, 150, 243, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(100, 181, 246, 0.1) 0%, transparent 50%);
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          background: linear-gradient(to right, #ffffff, #64b5f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeInUp 0.8s ease-out;
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.8;
          color: #e3f2fd;
          animation: fadeInUp 0.8s ease-out 0.2s backwards;
        }

        .mission-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          transition: all 0.4s ease;
          animation: fadeInUp 0.8s ease-out 0.4s backwards;
        }

        .mission-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .mission-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 15px;
          color: #64b5f6;
        }

        .mission-text {
          font-size: 1rem;
          color: #e3f2fd;
          margin: 0;
        }

        /* Value Props Section */
        .value-props {
          padding: 100px 0;
          background: linear-gradient(180deg, #0a1929 0%, #0d2137 100%);
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 15px;
          color: #ffffff;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #90caf9;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .value-card {
          perspective: 1000px;
        }

        .card-inner {
          background: linear-gradient(145deg, #1e3a5f 0%, #152b47 100%);
          border-radius: 20px;
          padding: 40px 30px;
          text-align: center;
          border: 1px solid rgba(100, 181, 246, 0.2);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .card-inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(100, 181, 246, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .value-card:hover .card-inner {
          transform: translateY(-10px);
          border-color: #64b5f6;
          box-shadow: 0 20px 40px rgba(100, 181, 246, 0.2);
        }

        .value-card:hover .card-inner::before {
          left: 100%;
        }

        .icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 25px;
          background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
        }

        .value-card:hover .icon-wrapper {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 10px 30px rgba(33, 150, 243, 0.4);
        }

        .icon {
          width: 40px;
          height: 40px;
          color: white;
        }

        .card-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 15px;
          color: #64b5f6;
        }

        .card-text {
          font-size: 1rem;
          line-height: 1.6;
          color: #b3e5fc;
        }

        /* Process Timeline */
        .process-timeline {
          padding: 100px 0;
          background: linear-gradient(180deg, #0d2137 0%, #1a2942 100%);
        }

        .timeline {
          max-width: 800px;
          margin: 0 auto;
        }

        .timeline-step {
          display: flex;
          gap: 30px;
          margin-bottom: 50px;
          position: relative;
          animation: fadeIn 0.6s ease-out;
        }

        .timeline-step:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 30px;
          top: 70px;
          width: 2px;
          height: calc(100% + 20px);
          background: linear-gradient(to bottom, #2196f3, transparent);
        }

        .step-number {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 5px 20px rgba(33, 150, 243, 0.4);
          transition: all 0.4s ease;
        }

        .timeline-step:hover .step-number {
          transform: scale(1.15) rotate(360deg);
          box-shadow: 0 10px 30px rgba(33, 150, 243, 0.6);
        }

        .step-content {
          flex: 1;
          padding-top: 5px;
        }

        .step-title {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 10px;
          color: #64b5f6;
        }

        .step-text {
          font-size: 1rem;
          line-height: 1.6;
          color: #b3e5fc;
        }

        /* Company Description */
        .company-description {
          padding: 100px 0;
          background: linear-gradient(180deg, #1a2942 0%, #0a1929 100%);
        }

        .company-content {
          max-width: 900px;
          margin: 0 auto;
          background: rgba(30, 58, 95, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(100, 181, 246, 0.2);
          border-radius: 20px;
          padding: 50px;
          transition: all 0.4s ease;
        }

        .company-content:hover {
          transform: translateY(-5px);
          border-color: #64b5f6;
          box-shadow: 0 20px 40px rgba(100, 181, 246, 0.2);
        }

        .company-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 30px;
          color: #64b5f6;
          text-align: center;
        }

        .company-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #e3f2fd;
          margin-bottom: 25px;
        }

        .company-text:last-child {
          margin-bottom: 0;
        }

        /* CTA Section */
        .cta-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #01579b 100%);
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 50%, rgba(33, 150, 243, 0.1) 0%, transparent 70%);
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
        }

        .cta-text {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #e3f2fd;
          margin-bottom: 40px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          display: inline-block;
          padding: 18px 45px;
          background: linear-gradient(135deg, #ffeb3b 0%, #ffc107 100%);
          color: #1a237e;
          font-size: 1.1rem;
          font-weight: 700;
          text-decoration: none;
          border-radius: 50px;
          transition: all 0.4s ease;
          box-shadow: 0 5px 20px rgba(255, 193, 7, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 10px 30px rgba(255, 193, 7, 0.5);
          background: linear-gradient(135deg, #fff176 0%, #ffd54f 100%);
        }

        /* Animations */
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Responsive Design */
        @media (min-width: 768px) {
          .hero-content {
            grid-template-columns: 2fr 1fr;
          }
        }

        @media (max-width: 767px) {
          .hero-title {
            font-size: 2.5rem;
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

          .company-content {
            padding: 30px 25px;
          }

          .timeline-step {
            gap: 20px;
          }

          .step-number {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }

          .timeline-step:not(:last-child)::after {
            left: 24px;
          }
        }

        @media (max-width: 480px) {
          .hero-section,
          .value-props,
          .process-timeline,
          .company-description,
          .cta-section {
            padding: 60px 0;
          }

          .hero-title {
            font-size: 2rem;
          }

          .section-header {
            margin-bottom: 40px;
          }

          .cards-grid {
            grid-template-columns: 1fr;
          }

          .cta-button {
            padding: 15px 35px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default About;