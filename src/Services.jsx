import React from 'react';

const Service = () => {
  const services = [
    {
      id: 1,
      title: "Student Onboarding & Validation",
      description: "Complete onboarding process with admin approval and document verification for F-1 OPT holders",
      icon: "👨‍🎓",
      features: [
        "Interest form submission",
        "Admin approval workflow",
        "Document upload & validation",
        "Visa status verification"
      ]
    },
    {
      id: 2,
      title: "Professional Resume Creation",
      description: "Expert-crafted resumes with version control and recruiter sharing capabilities",
      icon: "📄",
      features: [
        "Admin-built professional resumes",
        "Resume versioning system",
        "Role-based skill roadmaps",
        "Recruiter group sharing"
      ]
    },
    {
      id: 3,
      title: "Monthly Profile Marketing",
      description: "Continuous marketing of your profile to potential employers with monthly campaigns",
      icon: "🎯",
      features: [
        "Monthly marketing campaigns",
        "Profile distribution to recruiters",
        "CRM integration",
        "Marketing performance tracking"
      ]
    },
    {
      id: 4,
      title: "Career Training & Screening",
      description: "Comprehensive training programs and screening call preparation",
      icon: "🎓",
      features: [
        "Proxy training sessions",
        "Screening call training",
        "Interview preparation",
        "Career guidance workshops"
      ]
    },
    {
      id: 5,
      title: "Billing & Payment Management",
      description: "Transparent pricing with one-time setup and recurring monthly subscription",
      icon: "💳",
      features: [
        "One-time setup fee",
        "Monthly subscription",
        "Secure payment processing",
        "Invoice management"
      ]
    },
    {
      id: 6,
      title: "Admin Dashboard & Support",
      description: "Dedicated admin support with comprehensive dashboard and reporting",
      icon: "📊",
      features: [
        "Admin dashboard access",
        "Progress tracking",
        "CRM integration",
        "Regular reporting"
      ]
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Submit Interest Form",
      description: "Complete our detailed interest form with your academic and visa information"
    },
    {
      step: 2,
      title: "Admin Approval",
      description: "Get verified and approved by our admin team within 24-48 hours"
    },
    {
      step: 3,
      title: "Complete Onboarding",
      description: "Finish intake questionnaire, upload documents, and set up payment"
    },
    {
      step: 4,
      title: "Start Marketing",
      description: "Begin monthly profile marketing and access training resources"
    }
  ];

  return (
    <div className="container-fluid py-5 bg-light">
      {/* Hero Section */}
      <div className="row justify-content-center py-5">
        <div className="col-lg-8 text-center">
          <h1 className="display-4 fw-bold text-primary mb-4">
            Comprehensive Career Services for Master's Students
          </h1>
          <p className="lead text-muted mb-4">
            Specifically designed for F-1 OPT holders to bridge the gap between academia and industry
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button className="btn btn-primary btn-lg px-4">
              Start Your Journey
            </button>
            <button className="btn btn-outline-primary btn-lg px-4">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Process Timeline */}
      <div className="row justify-content-center py-5 bg-white">
        <div className="col-lg-10">
          <h2 className="text-center mb-5">Our Simple 4-Step Process</h2>
          <div className="row">
            {processSteps.map((step, index) => (
              <div key={step.step} className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                         style={{width: '60px', height: '60px', fontSize: '1.5rem', fontWeight: 'bold'}}>
                      {step.step}
                    </div>
                    <h5 className="card-title">{step.title}</h5>
                    <p className="card-text text-muted">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="row justify-content-center py-5">
        <div className="col-lg-10">
          <h2 className="text-center mb-5">Our Services</h2>
          <div className="row">
            {services.map(service => (
              <div key={service.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 border-0 shadow-sm hover-shadow">
                  <div className="card-body text-center p-4">
                    <div className="display-4 mb-3">{service.icon}</div>
                    <h4 className="card-title text-primary mb-3">{service.title}</h4>
                    <p className="card-text text-muted mb-4">{service.description}</p>
                    <ul className="list-unstyled text-start">
                      {service.features.map((feature, index) => (
                        <li key={index} className="mb-2">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center pb-4">
                    <button className="btn btn-outline-primary">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="row justify-content-center py-5 bg-white">
        <div className="col-lg-8 text-center">
          <h2 className="mb-4">Transparent Pricing</h2>
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <div className="card border-primary shadow">
                <div className="card-header bg-primary text-white py-4">
                  <h4 className="mb-0">Standard Plan</h4>
                </div>
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <span className="h1 text-primary">$99</span>
                    <span className="text-muted"> setup fee</span>
                  </div>
                  <div className="text-center mb-3">
                    <span className="h3">$49</span>
                    <span className="text-muted">/month</span>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">
                      <i className="bi bi-check text-success me-2"></i>
                      One-time professional resume creation
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-success me-2"></i>
                      Monthly profile marketing
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-success me-2"></i>
                      Training sessions included
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-success me-2"></i>
                      Admin support & CRM integration
                    </li>
                  </ul>
                  <button className="btn btn-primary w-100 btn-lg">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="row justify-content-center py-5">
        <div className="col-lg-8 text-center">
          <h2 className="mb-4">Ready to Launch Your Career?</h2>
          <p className="lead text-muted mb-4">
            Join hundreds of Master's students who have successfully transitioned to their dream careers through our platform.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button className="btn btn-primary btn-lg px-5">
              Submit Interest Form
            </button>
            <button className="btn btn-outline-primary btn-lg px-5">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;