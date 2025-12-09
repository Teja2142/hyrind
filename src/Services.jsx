import React, { useState } from 'react';

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Profile Marketing",
      description: "Strategic marketing of your profile to potential employers with recruiter assignment and role-based submissions. Our team works tirelessly to position you as the ideal candidate for your target roles.",
      expandedContent: "Our Profile Marketing service goes beyond traditional job applications. We leverage our extensive network of industry connections and proven marketing strategies to ensure your profile reaches the right decision-makers. With personalized recruiter support, your resume is carefully tailored for each opportunity, highlighting your unique strengths and experiences. Our CRM tracking system provides complete transparency, allowing you to monitor every submission and interaction. We conduct monthly strategic campaigns that position you as a top candidate in your field, significantly increasing your chances of landing interviews with premier employers.",
      icon: "🎯",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      features: [
        {
          title: "Dedicated Recruiter Assignment",
          desc: "Get paired with an experienced recruiter who understands your career goals",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop"
        },
        {
          title: "Resume Optimization",
          desc: "Tailored resume refinement for each role submission to maximize impact",
          image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop"
        },
        {
          title: "Role-Based Submissions",
          desc: "Strategic job applications aligned with your skills and experience",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop"
        },
        {
          title: "Monthly Marketing Campaigns",
          desc: "Regular outreach to hiring managers and decision-makers in your field",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
        },
        {
          title: "CRM Integration Tracking",
          desc: "Real-time visibility into all your applications and employer interactions",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
        }
      ],
      link: "/profile-marketing"
    },
    {
      id: 2,
      title: "Interview & Screening Call Practice",
      description: "Comprehensive mock interviews and screening call preparation with detailed feedback. Build confidence and refine your communication skills with industry professionals who know what employers are looking for.",
      expandedContent: "Success in interviews requires more than just technical knowledge—it demands confidence, clear communication, and the ability to showcase your value effectively. Our interview practice sessions replicate real-world scenarios with experienced industry professionals who provide actionable feedback. We help you master the STAR method, handle behavioral questions with ease, and communicate your achievements compellingly. Through multiple practice sessions, you'll overcome interview anxiety, refine your body language, and develop the professional presence that hiring managers seek. Our proven approach has helped hundreds of candidates transform from nervous interviewees into confident professionals who excel in high-pressure situations.",
      icon: "🎤",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop",
      features: [
        {
          title: "Mock Client Call Sessions",
          desc: "Realistic interview simulations with experienced professionals",
          image: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&h=400&fit=crop"
        },
        {
          title: "Real-Time Feedback Process",
          desc: "Immediate constructive feedback on your performance and areas to improve",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop"
        },
        {
          title: "Communication Improvement",
          desc: "Enhance your articulation, body language, and professional presence",
          image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&h=400&fit=crop"
        },
        {
          title: "Interview Technique Refinement",
          desc: "Master the STAR method, behavioral questions, and technical assessments",
          image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop"
        },
        {
          title: "Confidence Building",
          desc: "Overcome interview anxiety with proven strategies and practice",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
        }
      ],
      link: "/interview-practice"
    },
    {
      id: 3,
      title: "Skills Training",
      description: "Role-based skills development with curated learning paths and weekly training tasks. Stay competitive in your field with targeted upskilling guided by industry experts.",
      expandedContent: "The tech landscape evolves rapidly, and staying competitive requires continuous skill development. Our Skills Training program offers customized learning paths designed specifically for your target roles and career goals. Recruiters curate high-quality resources based on current market demands and emerging trends in your field. You'll receive weekly training tasks that build practical skills and create portfolio-worthy projects. With centralized access to all materials through Google Drive and systematic progress tracking, you'll see measurable improvement in your capabilities. Our milestone-based approach ensures you're always moving forward, gaining the specific skills that employers are actively seeking in candidates.",
      icon: "🎓",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",
      features: [
        {
          title: "Role-Specific Skill Roadmaps",
          desc: "Customized learning paths designed for your target job requirements",
          image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop"
        },
        {
          title: "Recruiter-Uploaded Resources",
          desc: "Access curated materials selected by recruiters based on market demands",
          image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop"
        },
        {
          title: "Google Drive Material Access",
          desc: "Centralized repository of training materials, guides, and reference docs",
          image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=600&h=400&fit=crop"
        },
        {
          title: "Weekly Training Tasks",
          desc: "Structured assignments to build practical skills and portfolio projects",
          image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop"
        },
        {
          title: "Progress Tracking & Milestones",
          desc: "Monitor your skill development journey with clear benchmarks and goals",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
        }
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

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            max-height: 500px;
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
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .service-section {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .expanded-content {
          animation: slideDown 0.5s ease-out forwards;
          overflow: hidden;
        }

        .service-section:nth-child(1) { animation-delay: 0.2s; }
        .service-section:nth-child(2) { animation-delay: 0.3s; }
        .service-section:nth-child(3) { animation-delay: 0.4s; }

        .service-header-img {
          transition: all 0.5s ease;
          position: relative;
          overflow: hidden;
        }

        .service-header-img::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: translateX(-100%);
          z-index: 1;
        }

        .service-header-img:hover::before {
          animation: shimmer 1s ease-in-out;
        }

        .service-header-img:hover img {
          transform: scale(1.1);
        }

        .feature-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          opacity: 0;
          animation: scaleIn 0.5s ease-out forwards;
          cursor: pointer;
        }

        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }
        .feature-card:nth-child(5) { animation-delay: 0.5s; }

        .feature-card:hover {
          transform: translateY(-10px) rotate(1deg);
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.25);
        }

        .feature-card:hover img {
          transform: scale(1.08);
          filter: brightness(1.15);
        }

        .feature-card:hover .feature-number {
          transform: scale(1.2) rotate(360deg);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);
        }

        .feature-card:hover .feature-title {
          color: #2563eb;
        }

        .feature-card img {
          transition: all 0.4s ease;
        }

        .feature-number {
          transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .feature-title {
          transition: color 0.3s ease;
        }

        .btn-primary-custom {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .btn-primary-custom::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
          z-index: -1;
        }

        .btn-primary-custom:hover::before {
          width: 400px;
          height: 400px;
        }

        .btn-primary-custom:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.5);
        }

        .btn-primary-custom:active {
          transform: translateY(-1px) scale(0.98);
        }

        .btn-outline-custom {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-outline-custom::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.15), transparent);
          transform: translateX(-100%);
        }

        .btn-outline-custom:hover::before {
          animation: shimmer 0.8s ease-in-out;
        }

        .btn-outline-custom:hover {
          transform: translateY(-3px) scale(1.02);
          background: rgba(37, 99, 235, 0.1);
          border-color: #2563eb;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);
        }

        .btn-outline-custom:active {
          transform: translateY(-1px) scale(0.98);
        }

        .icon-wrapper-large {
          animation: float 3s ease-in-out infinite;
          transition: all 0.4s ease;
          display: inline-block;
        }

        .service-header-content:hover .icon-wrapper-large {
          transform: scale(1.15) rotate(10deg);
          animation: none;
        }

        .cta-section-animated {
          animation: pulse 3s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem !important;
          }
          
          .hero-subtitle {
            font-size: 1rem !important;
          }

          .service-header {
            flex-direction: column !important;
          }

          .service-section-title {
            font-size: 1.8rem !important;
          }

          .feature-card {
            width: 100% !important;
            max-width: 100% !important;
          }

          .services-container {
            padding: 40px 20px !important;
          }

          .service-section {
            padding: 40px 20px !important;
            margin-bottom: 30px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.5rem !important;
          }

          .cta-title {
            font-size: 1.8rem !important;
          }

          .button-group {
            flex-direction: column !important;
          }

          .services-container {
            padding: 30px 15px !important;
          }

          .service-section {
            padding: 30px 15px !important;
          }
        }
      `}</style>

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

      <div style={styles.servicesContainer}>
        {services.map((service, index) => (
          <div key={service.id} className="service-section" style={styles.serviceSection}>
            <div 
              className="service-header"
              style={{
                ...styles.serviceHeader,
                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
              }}
            >
              <div className="service-header-content" style={styles.serviceHeaderContent}>
                <div className="icon-wrapper-large" style={styles.iconWrapperLarge}>
                  {service.icon}
                </div>
                <h2 className="service-section-title" style={styles.serviceSectionTitle}>
                  {service.title}
                </h2>
                <p style={styles.serviceSectionDescription}>
                  {service.description}
                </p>
                {expandedService === service.id && (
                  <div style={styles.expandedContent}>
                    <p style={styles.expandedText}>{service.expandedContent}</p>
                  </div>
                )}
                <button 
                  className="btn-primary-custom" 
                  style={styles.learnMoreButton}
                  onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                >
                  {expandedService === service.id ? '← Show Less' : 'Explore This Service →'}
                </button>
              </div>
              <div className="service-header-img" style={styles.serviceHeaderImage}>
                <img 
                  src={service.image} 
                  alt={service.title}
                  style={styles.headerImg}
                />
              </div>
            </div>

            <div className="features-grid" style={styles.featuresGrid}>
              {service.features.map((feature, idx) => (
                <div key={idx} className="feature-card" style={styles.featureCard}>
                  <div style={styles.featureImageWrapper}>
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      style={styles.featureImage}
                    />
                  </div>
                  <div style={styles.featureContent}>
                    <h4 className="feature-title" style={styles.featureTitle}>
                      {feature.title}
                    </h4>
                    <p style={styles.featureDescription}>
                      {feature.desc}
                    </p>
                  </div>
                  <div className="feature-number" style={styles.featureNumber}>
                    {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.ctaSection}>
        <h2 className="cta-title" style={styles.ctaTitle}>
          Ready to Start Your Career Journey?
        </h2>
        <p style={styles.ctaSubtitle}>
          Join hundreds of Master's students who have successfully transitioned to their dream careers through our services.
        </p>
        <div className="button-group" style={styles.buttonGroup}>
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
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  heroSection: {
    padding: '100px 20px 80px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.7) 0%, rgba(29, 78, 216, 0.7) 100%), url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
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
  servicesContainer: {
    background: '#f8fafc',
    padding: '80px 40px',
  },
  serviceSection: {
    maxWidth: '1400px',
    margin: '0 auto 0',
    padding: '60px 40px',
    background: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.08)',
    marginBottom: '40px',
    border: '2px solid #e0e7ff',
  },
  serviceHeader: {
    display: 'flex',
    gap: '60px',
    alignItems: 'center',
    marginBottom: '60px',
    flexWrap: 'wrap',
  },
  serviceHeaderContent: {
    flex: '1',
    minWidth: '300px',
  },
  iconWrapperLarge: {
    fontSize: '5rem',
    marginBottom: '24px',
  },
  serviceSectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '20px',
    color: '#1e293b',
    lineHeight: '1.2',
  },
  serviceSectionDescription: {
    fontSize: '1.1rem',
    color: '#475569',
    lineHeight: '1.8',
    marginBottom: '32px',
  },
  learnMoreButton: {
    padding: '16px 32px',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: '#ffffff',
    cursor: 'pointer',
    marginTop: '16px',
  },
  expandedContent: {
    marginTop: '24px',
    marginBottom: '8px',
  },
  expandedText: {
    fontSize: '1.05rem',
    color: '#334155',
    lineHeight: '1.8',
    padding: '20px',
    background: '#f1f5f9',
    borderRadius: '12px',
    borderLeft: '4px solid #2563eb',
    margin: 0,
  },
  serviceHeaderImage: {
    flex: '1',
    minWidth: '300px',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(37, 99, 235, 0.2)',
  },
  headerImg: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.5s ease',
  },
  featuresGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featureCard: {
    background: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    position: 'relative',
    width: 'calc(33.333% - 20px)',
    minWidth: '280px',
    maxWidth: '350px',
  },
  featureImageWrapper: {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
  },
  featureImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  featureContent: {
    padding: '24px',
  },
  featureTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '12px',
    lineHeight: '1.3',
  },
  featureDescription: {
    fontSize: '0.95rem',
    color: '#64748b',
    lineHeight: '1.6',
    margin: 0,
  },
  featureNumber: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: '700',
    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
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