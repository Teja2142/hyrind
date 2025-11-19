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
  // Use useEffect to inject the necessary CSS links when the component mounts
  useEffect(() => {
    // 1. Inject Bootstrap Core CSS
    if (!document.getElementById('bootstrap-css')) {
      const link = document.createElement('link');
      link.id = 'bootstrap-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
      document.head.appendChild(link);
    }

    // 2. Inject Bootstrap Icons CSS (needed for the icons like bi-briefcase-fill)
    if (!document.getElementById('bootstrap-icons')) {
        const linkIcons = document.createElement('link');
        linkIcons.id = 'bootstrap-icons';
        linkIcons.rel = 'stylesheet';
        linkIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
        document.head.appendChild(linkIcons);
    }
    
    // Cleanup is omitted for simplicity in this self-contained context, 
    // but in a real app, you might remove the links on unmount.
  }, []); // Runs only once on mount

  return (
    <div className="bg-light">
      {/* 1. Hero Section (Jumbotron style) */}
      <section id="home" className="py-5 py-md-5 text-white bg-primary shadow-sm">
        <div className="container-fluid container-xl text-center pt-5 pb-5">
          <h1 className="display-4 fw-bold mb-4">
            Validate Your Future: <span className="text-warning">F-1 OPT Career Acceleration.</span>
          </h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '800px' }}>
            The secure web platform built to onboard Master's students, validate their profiles, create job-ready resumes, and launch monthly marketing campaigns.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
            <a
              href="#interest-form"
              className="btn btn-warning btn-lg fw-semibold rounded-pill px-5 shadow-lg"
            >
              Get Started & Submit Interest
            </a>
            <a
              href="#services"
              className="btn btn-outline-light btn-lg rounded-pill px-5"
            >
              Learn How It Works <i className="bi bi-arrow-right-short ms-1"></i>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Value Propositions */}
      <section id="services" className="py-5 py-md-5">
        <div className="container-fluid container-xl">
          <div className="text-center mb-5">
            <span className="text-info fw-bold text-uppercase small">Why Hyrind?</span>
            <h2 className="display-6 fw-bold text-dark mt-2">The Core Pillars of Candidate Success</h2>
          </div>

          <div className="row g-4 justify-content-center">
            {VALUE_PROPS.map((prop, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm p-4 text-center">
                  <i className={`${prop.iconClass} display-4 text-info mx-auto mb-3`}></i>
                  <div className="card-body">
                    <h3 className="card-title fw-bold">{prop.title}</h3>
                    <p className="card-text text-muted">{prop.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Process Timeline */}
      <section id="process" className="py-5 py-md-5 bg-white">
        <div className="container-fluid container-xl">
          <div className="text-center mb-5">
            <span className="text-info fw-bold text-uppercase small">Our Workflow</span>
            <h2 className="display-6 fw-bold text-dark mt-2">Simple Steps to Career Launch</h2>
          </div>

          {/* Timeline Grid */}
          <div className="row justify-content-center pt-4">
            {PROCESS_STEPS.map((step, index) => (
              <React.Fragment key={index}>
                <div className="col-12 col-md-3 text-center mb-4">
                  <div className="position-relative">
                    {/* Step Circle - Using inline style for fixed size, combined with Bootstrap classes */}
                    <div 
                        className="bg-info rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold display-6 mb-3" 
                        style={{ width: '80px', height: '80px', flexShrink: 0 }}
                    >
                      {step.step}
                    </div>
                    <h4 className="fw-bold">{step.title}</h4>
                    <p className="text-muted">{step.detail}</p>
                  </div>
                </div>
                {/* Connector Arrow (Hidden on last step and mobile) */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="col-md-1 d-none d-md-flex align-items-center justify-content-center text-primary">
                    <i className="bi bi-arrow-right-short fs-1"></i>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Final CTA */}
      <section id="interest-form" className="py-5 bg-dark">
        <div className="container-fluid container-xl text-center">
          <h2 className="text-white fw-bold mb-3">Ready to Accelerate Your Career?</h2>
          <p className="lead text-light mb-4">
            Submit your interest form now and let's get you validated.
          </p>
          <a
            href="#top"
            className="btn btn-success btn-lg fw-semibold rounded-pill px-5 shadow"
          >
            <i className="bi bi-person-fill me-2"></i> Submit Interest Form
          </a>
        </div>
      </section>
      
      {/* 5. Blog Placeholder */}
      <section id="blog" className="py-5 bg-light">
        <div className="container-fluid container-xl text-center">
          <h2 className="fw-bold">Blog</h2>
          <p className="text-muted">Coming soon — updates, stories, and career tips for international students.</p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-dark text-white-50 py-4">
        <div className="container-fluid container-xl text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} HYRIND. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
