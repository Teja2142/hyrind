import React from 'react';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Profile Marketing",
      description: "Strategic marketing of your profile to potential employers with recruiter assignment and role-based submissions",
      icon: "🎯",
      features: [
        "Dedicated recruiter assignment",
        "Resume optimization for roles",
        "Role-based job submissions",
        "Monthly marketing campaigns",
        "CRM integration tracking"
      ],
      link: "/profile-marketing"
    },
    {
      id: 2,
      title: "Interview & Screening Call Practice",
      description: "Comprehensive mock interviews and screening call preparation with detailed feedback",
      icon: "🎤",
      features: [
        "Mock client call sessions",
        "Real-time feedback process",
        "Communication improvement",
        "Interview technique refinement",
        "Confidence building exercises"
      ],
      link: "/interview-practice"
    },
    {
      id: 3,
      title: "Skills Training",
      description: "Role-based skills development with curated learning paths and weekly training tasks",
      icon: "🎓",
      features: [
        "Role-specific skill roadmaps",
        "Recruiter-uploaded resources",
        "Google Drive material access",
        "Weekly training tasks",
        "Progress tracking & milestones"
      ],
      link: "/skills-training"
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
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
          box-shadow: 0 25px 50px rgba(37, 99, 235, 0.3);
        }

        .service-card:hover .icon-wrapper {
          transform: scale(1.2) rotate(5deg);
        }

        .service-card:hover .service-title {
          color: #1d4ed8;
        }

        .btn-primary-custom {
          transition: all 0.3s ease;
        }

        .btn-primary-custom:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);
        }

        .btn-outline-custom {
          transition: all 0.3s ease;
        }

        .btn-outline-custom:hover {
          transform: translateY(-2px);
          background: rgba(37, 99, 235, 0.1);
          border-color: #2563eb;
        }

        .icon-wrapper {
          animation: float 3s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .feature-item {
          opacity: 0;
          animation: slideInLeft 0.5s ease-out forwards;
        }

        .feature-item:nth-child(1) { animation-delay: 0.1s; }
        .feature-item:nth-child(2) { animation-delay: 0.2s; }
        .feature-item:nth-child(3) { animation-delay: 0.3s; }
        .feature-item:nth-child(4) { animation-delay: 0.4s; }
        .feature-item:nth-child(5) { animation-delay: 0.5s; }

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
            Our Career Services
          </h1>
          <p className="hero-subtitle fade-in-up" style={styles.heroSubtitle}>
            Comprehensive solutions designed specifically for F-1 OPT holders to accelerate your career journey
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div style={styles.servicesSection}>
        <div style={styles.servicesGrid}>
          {services.map(service => (
            <div key={service.id} className="service-card" style={styles.serviceCard}>
              <div className="icon-wrapper" style={styles.iconWrapper}>
                {service.icon}
              </div>
              <h4 className="service-title" style={styles.serviceTitle}>{service.title}</h4>
              <p style={styles.serviceDescription}>{service.description}</p>
              <ul style={styles.featureList}>
                {service.features.map((feature, index) => (
                  <li key={index} className="feature-item" style={styles.featureItem}>
                    <span style={styles.checkIcon}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="btn-outline-custom" style={styles.serviceButton}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Start Your Career Journey?</h2>
        <p style={styles.ctaSubtitle}>
          Join hundreds of Master's students who have successfully transitioned to their dream careers through our services.
        </p>
        <div style={styles.buttonGroup}>
          <button className="btn-primary-custom" style={styles.primaryButton}>
            Get Started Today
          </button>
          <button className="btn-outline-custom" style={styles.outlineButton}>
            Learn More
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
    background: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  heroSection: {
    padding: '100px 20px 80px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
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
    color: '#ffffff',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#e0e7ff',
    marginBottom: '0',
    lineHeight: '1.6',
  },
  servicesSection: {
    padding: '80px 20px',
    background: '#ffffff',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '40px',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
  },
  serviceCard: {
    background: '#ffffff',
    padding: '40px',
    borderRadius: '20px',
    border: '2px solid #e0e7ff',
    boxShadow: '0 4px 20px rgba(37, 99, 235, 0.1)',
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
    color: '#2563eb',
    transition: 'color 0.3s ease',
  },
  serviceDescription: {
    color: '#475569',
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
    color: '#334155',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: '0.95rem',
  },
  checkIcon: {
    color: '#2563eb',
    marginRight: '12px',
    fontWeight: '700',
    fontSize: '1.2rem',
    flexShrink: 0,
  },
  serviceButton: {
    width: '100%',
    padding: '12px',
    border: '2px solid #2563eb',
    background: 'transparent',
    color: '#2563eb',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  ctaSection: {
    padding: '80px 20px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#ffffff',
  },
  ctaSubtitle: {
    fontSize: '1.2rem',
    color: '#e0e7ff',
    marginBottom: '40px',
    maxWidth: '700px',
    margin: '0 auto 40px',
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
    background: '#ffffff',
    color: '#2563eb',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)',
  },
  outlineButton: {
    padding: '16px 40px',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: '2px solid #ffffff',
    borderRadius: '12px',
    background: 'transparent',
    color: '#ffffff',
    cursor: 'pointer',
  },
};

export default Services;