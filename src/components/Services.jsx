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
    <div style={styles.container}>
      <style>{`
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .service-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .service-card:hover {
          transform: translateY(-15px) scale(1.02);
        }

        .process-card {
          transition: all 0.3s ease;
        }

        .process-card:hover {
          transform: translateY(-8px);
        }

        .pricing-card {
          transition: all 0.4s ease;
        }

        .pricing-card:hover {
          transform: scale(1.05);
          box-shadow: 0 25px 50px rgba(59, 130, 246, 0.3);
        }

        .btn-primary-custom {
          transition: all 0.3s ease;
        }

        .btn-primary-custom:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
        }

        .btn-outline-custom {
          transition: all 0.3s ease;
        }

        .btn-outline-custom:hover {
          transform: translateY(-2px);
          background: rgba(59, 130, 246, 0.1);
        }

        .icon-wrapper {
          animation: float 3s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem !important;
          }
          
          .hero-subtitle {
            font-size: 1rem !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 className="hero-title fade-in-up" style={styles.heroTitle}>
            Comprehensive Career Services for Master's Students
          </h1>
          <p className="hero-subtitle fade-in-up" style={styles.heroSubtitle}>
            Specifically designed for F-1 OPT holders to bridge the gap between academia and industry
          </p>
          <div style={styles.buttonGroup}>
            <button className="btn-primary-custom" style={styles.primaryButton}>
              Start Your Journey
            </button>
            <button className="btn-outline-custom" style={styles.outlineButton}>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Process Timeline */}
      <div style={styles.processSection}>
        <h2 style={styles.sectionTitle}>Our Simple 4-Step Process</h2>
        <div style={styles.processGrid}>
          {processSteps.map((step, index) => (
            <div key={step.step} className="process-card" style={styles.processCard}>
              <div style={styles.stepNumber}>{step.step}</div>
              <h5 style={styles.processTitle}>{step.title}</h5>
              <p style={styles.processDescription}>{step.description}</p>
              {index < processSteps.length - 1 && (
                <div style={styles.connector}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div style={styles.servicesSection}>
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <div style={styles.servicesGrid}>
          {services.map(service => (
            <div key={service.id} className="service-card" style={styles.serviceCard}>
              <div className="icon-wrapper" style={styles.iconWrapper}>
                {service.icon}
              </div>
              <h4 style={styles.serviceTitle}>{service.title}</h4>
              <p style={styles.serviceDescription}>{service.description}</p>
              <ul style={styles.featureList}>
                {service.features.map((feature, index) => (
                  <li key={index} style={styles.featureItem}>
                    <span style={styles.checkIcon}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="btn-outline-custom" style={styles.serviceButton}>
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div style={styles.pricingSection}>
        <h2 style={styles.sectionTitle}>Transparent Pricing</h2>
        <div style={styles.pricingWrapper}>
          <div className="pricing-card" style={styles.pricingCard}>
            <div style={styles.pricingHeader}>
              <h4 style={styles.planTitle}>Standard Plan</h4>
            </div>
            <div style={styles.pricingBody}>
              <div style={styles.priceWrapper}>
                <span style={styles.priceAmount}>$99</span>
                <span style={styles.priceLabel}> setup fee</span>
              </div>
              <div style={styles.monthlyPrice}>
                <span style={styles.monthlyAmount}>$49</span>
                <span style={styles.monthlyLabel}>/month</span>
              </div>
              <ul style={styles.pricingFeatures}>
                <li style={styles.pricingFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  One-time professional resume creation
                </li>
                <li style={styles.pricingFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  Monthly profile marketing
                </li>
                <li style={styles.pricingFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  Training sessions included
                </li>
                <li style={styles.pricingFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  Admin support & CRM integration
                </li>
              </ul>
              <button className="btn-primary-custom" style={styles.pricingButton}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Launch Your Career?</h2>
        <p style={styles.ctaSubtitle}>
          Join hundreds of Master's students who have successfully transitioned to their dream careers through our platform.
        </p>
        <div style={styles.buttonGroup}>
          <button className="btn-primary-custom" style={styles.primaryButton}>
            Submit Interest Form
          </button>
          <button className="btn-outline-custom" style={styles.outlineButton}>
            Schedule Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    color: '#e2e8f0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  heroSection: {
    padding: '100px 20px',
    textAlign: 'center',
    background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '900px',
    margin: '0 auto',
    zIndex: 1,
    position: 'relative',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '24px',
    background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#cbd5e1',
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  buttonGroup: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    padding: '16px 40px',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)',
  },
  outlineButton: {
    padding: '16px 40px',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: '2px solid #3b82f6',
    borderRadius: '12px',
    background: 'transparent',
    color: '#60a5fa',
    cursor: 'pointer',
  },
  processSection: {
    padding: '80px 20px',
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '60px',
    color: '#f1f5f9',
  },
  processGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  processCard: {
    background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
    padding: '32px',
    borderRadius: '16px',
    textAlign: 'center',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    position: 'relative',
    backdropFilter: 'blur(10px)',
  },
  stepNumber: {
    width: '60px',
    height: '60px',
    margin: '0 auto 20px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
  },
  processTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#f1f5f9',
  },
  processDescription: {
    color: '#cbd5e1',
    fontSize: '0.95rem',
    lineHeight: '1.6',
  },
  servicesSection: {
    padding: '80px 20px',
    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
  },
  serviceCard: {
    background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.6) 0%, rgba(30, 41, 59, 0.6) 100%)',
    padding: '40px',
    borderRadius: '20px',
    border: '1px solid rgba(59, 130, 246, 0.15)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
  iconWrapper: {
    fontSize: '4rem',
    marginBottom: '24px',
    display: 'block',
  },
  serviceTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#60a5fa',
  },
  serviceDescription: {
    color: '#cbd5e1',
    marginBottom: '24px',
    lineHeight: '1.6',
    fontSize: '0.95rem',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '24px',
  },
  featureItem: {
    color: '#e2e8f0',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: '0.95rem',
  },
  checkIcon: {
    color: '#10b981',
    marginRight: '12px',
    fontWeight: '700',
    fontSize: '1.2rem',
    flexShrink: 0,
  },
  serviceButton: {
    width: '100%',
    padding: '12px',
    border: '2px solid #3b82f6',
    background: 'transparent',
    color: '#60a5fa',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  pricingSection: {
    padding: '80px 20px',
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
  },
  pricingWrapper: {
    maxWidth: '500px',
    margin: '0 auto',
  },
  pricingCard: {
    background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
    borderRadius: '24px',
    overflow: 'hidden',
    border: '2px solid #3b82f6',
    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
  },
  pricingHeader: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    padding: '32px',
    textAlign: 'center',
  },
  planTitle: {
    margin: 0,
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'white',
  },
  pricingBody: {
    padding: '40px',
  },
  priceWrapper: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  priceAmount: {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#60a5fa',
  },
  priceLabel: {
    color: '#94a3b8',
    fontSize: '1.1rem',
  },
  monthlyPrice: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  monthlyAmount: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#f1f5f9',
  },
  monthlyLabel: {
    color: '#94a3b8',
    fontSize: '1rem',
  },
  pricingFeatures: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '32px',
  },
  pricingFeature: {
    color: '#e2e8f0',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
  },
  pricingButton: {
    width: '100%',
    padding: '16px',
    fontSize: '1.1rem',
    fontWeight: '700',
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)',
  },
  ctaSection: {
    padding: '100px 20px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#f1f5f9',
  },
  ctaSubtitle: {
    fontSize: '1.2rem',
    color: '#cbd5e1',
    marginBottom: '40px',
    maxWidth: '700px',
    margin: '0 auto 40px',
    lineHeight: '1.6',
  },
};

export default Service;