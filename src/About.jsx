import React from 'react';

const About = () => {
  return (
    <div className="about-page">
  {/* Hero Section */}
  <section id="about" className="hero-section bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">About Hyrind</h1>
              <p className="lead mb-4">
                Empowering Master's students and F-1 OPT holders to launch their careers in the US job market.
              </p>
            </div>
            <div className="col-lg-4">
              <div className="text-center">
                <div className="bg-light rounded p-4 text-dark">
                  <h5>Our Mission</h5>
                  <p className="mb-0">Bridging the gap between international talent and US employers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-props py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="fw-bold mb-3">Why Choose Hyrind?</h2>
              <p className="text-muted">We provide comprehensive career launch services tailored for international students</p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                    <i className="fas fa-user-check text-primary fs-3"></i>
                  </div>
                  <h5 className="card-title">Expert Profile Validation</h5>
                  <p className="card-text">Admin-approved candidate profiles ensure quality and credibility for employers.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                    <i className="fas fa-file-alt text-primary fs-3"></i>
                  </div>
                  <h5 className="card-title">Professional Resume Building</h5>
                  <p className="card-text">Customized resumes and skill roadmaps designed to showcase your strengths.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                    <i className="fas fa-bullhorn text-primary fs-3"></i>
                  </div>
                  <h5 className="card-title">Monthly Marketing Campaigns</h5>
                  <p className="card-text">Continuous profile promotion to our network of recruiters and employers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="process-timeline bg-light py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="fw-bold mb-3">Our 4-Step Process</h2>
            </div>
          </div>
          
          <div className="row">
            <div className="col-12">
              <div className="timeline">
                <div className="timeline-step">
                  <div className="timeline-step-number">1</div>
                  <div className="timeline-step-content">
                    <h5>Submit Interest Form</h5>
                    <p>Complete our detailed intake form with your academic and professional background.</p>
                  </div>
                </div>
                
                <div className="timeline-step">
                  <div className="timeline-step-number">2</div>
                  <div className="timeline-step-content">
                    <h5>Admin Approval & Onboarding</h5>
                    <p>Our team reviews your profile and approves qualified candidates for the program.</p>
                  </div>
                </div>
                
                <div className="timeline-step">
                  <div className="timeline-step-number">3</div>
                  <div className="timeline-step-content">
                    <h5>Resume Creation & Payment</h5>
                    <p>Professional resume development and secure payment processing for services.</p>
                  </div>
                </div>
                
                <div className="timeline-step">
                  <div className="timeline-step-number">4</div>
                  <div className="timeline-step-content">
                    <h5>Marketing & Career Launch</h5>
                    <p>Monthly profile promotion, training sessions, and screening call coordination.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Description */}
      <section className="company-description py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h3 className="fw-bold mb-4">About Our Company</h3>
              <p className="mb-4">
                Hyrind is a specialized platform dedicated to supporting Master's degree students, 
                particularly F-1 OPT holders, in their journey to secure meaningful employment in 
                the United States. We understand the unique challenges faced by international 
                students and have developed a comprehensive system to address them.
              </p>
              <p className="mb-4">
                Our platform combines expert profile validation, professional resume development, 
                and ongoing marketing to connect qualified candidates with potential employers. 
                Through our secure payment system and CRM integration, we provide a seamless 
                experience for both candidates and recruiters.
              </p>
              <p className="mb-4">
                We believe in transparency, security, and results. Our PCI-compliant payment 
                processing, responsive design, and commitment to accessibility ensure that 
                every candidate receives the professional support they deserve throughout 
                their job search journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Placeholder) */}
      <section className="team-section bg-primary text-white py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <h2 className="fw-bold mb-3">Our Commitment</h2>
              <p className="lead mb-4">
                We're dedicated to helping international students navigate the complexities of 
                the US job market with confidence and success.
              </p>
              <a href="/contact" className="btn btn-light btn-lg px-4">
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-section {
          background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
        }
        
        .timeline {
          position: relative;
          padding-left: 0;
          list-style: none;
        }
        
        .timeline-step {
          display: flex;
          align-items: flex-start;
          margin-bottom: 2rem;
        }
        
        .timeline-step-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background-color: #0d6efd;
          color: white;
          border-radius: 50%;
          font-weight: bold;
          margin-right: 1rem;
          flex-shrink: 0;
        }
        
        .timeline-step-content {
          flex: 1;
          padding-top: 0.5rem;
        }
        
        @media (min-width: 768px) {
          .timeline {
            padding-left: 2rem;
          }
          
          .timeline-step {
            position: relative;
          }
          
          .timeline-step:not(:last-child):after {
            content: '';
            position: absolute;
            left: 25px;
            top: 50px;
            bottom: -2rem;
            width: 2px;
            background-color: #dee2e6;
          }
        }
        
        .card:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
      `}</style>
      
      {/* Bootstrap Icons CDN */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
      />
    </div>
  );
};

export default About;