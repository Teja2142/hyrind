import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Globe, FileText, Phone, CheckCircle, FileEdit,
  Briefcase, ThumbsUp, CreditCard, CheckCheck,
  Users, Upload, GraduationCap, MessageCircle,
  ChevronLeft, ChevronRight
} from "lucide-react";

export default function HowItWorksFlow() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const navigate = useNavigate();

  const steps = [
    {
      label: "Explore Website",
      icon: Globe,
      description: "Begin your journey by exploring our comprehensive website. Discover our services, success stories, and learn how we can help accelerate your career. Browse through testimonials from satisfied candidates and understand our unique approach to recruitment.",
      fullContent: "Our website is your gateway to endless opportunities. Take time to familiarize yourself with our platform, explore the various career paths available, and read success stories from candidates who have found their dream jobs through HYRIND. We provide detailed information about industries we serve, company culture, and what makes us different from traditional recruitment agencies.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop"
    },
    {
      label: "Submit Interest Form",
      icon: FileText,
      description: "Fill out our simple interest form with your basic details and career aspirations. This initial step helps us understand your background, skills, and what you're looking for in your next opportunity. The form takes just a few minutes to complete.",
      fullContent: "The interest form is designed to capture essential information about your professional background, skills, and career goals. We ask about your education, work experience, preferred locations, and salary expectations. This information helps our team match you with the most suitable opportunities. Rest assured, all information provided is kept confidential and used solely for recruitment purposes.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=800&fit=crop"
    },
    {
      label: "HYRIND Calls You",
      icon: Phone,
      description: "Our recruitment specialists will reach out to you for an initial conversation. This personalized call allows us to better understand your career goals, discuss your experience in detail, and answer any questions you may have about our process.",
      fullContent: "During this call, one of our experienced recruiters will have a detailed conversation with you about your career journey, aspirations, and expectations. We'll discuss your strengths, areas of expertise, and the types of roles that align with your goals. This is also an opportunity for you to ask questions about our process, timeline, and how we can best support your job search. The call typically lasts 20-30 minutes.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop"
    },
    {
      label: "Admin Approves Registration",
      icon: CheckCircle,
      description: "Our admin team reviews your profile and application to ensure you meet our quality standards. This verification process ensures we maintain a high-quality candidate pool and can provide the best service to both candidates and employers.",
      fullContent: "The admin approval process involves a thorough review of your credentials, experience, and alignment with our partner companies' requirements. Our team verifies your educational qualifications, employment history, and assesses your potential for success in the roles we typically place. This quality control step ensures that we maintain our reputation for providing top-tier candidates to our client companies.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop"
    },
    {
      label: "Fill Credential & Client Intake Sheets",
      icon: FileEdit,
      description: "Complete detailed forms about your credentials, certifications, and preferences. The client intake sheet helps us understand your ideal work environment, company culture preferences, and specific requirements for your next role.",
      fullContent: "These comprehensive forms allow us to create a complete profile of your professional background and preferences. You'll provide details about your technical skills, soft skills, certifications, previous projects, and achievements. The client intake sheet captures your preferences regarding company size, industry, work culture, remote work options, and other factors that are important to you in your next position.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop"
    },
    {
      label: "Admin Suggests Roles",
      icon: Briefcase,
      description: "Based on your profile and preferences, our admin team curates a personalized list of job opportunities that match your skills and career goals. Each role is carefully selected to align with your aspirations and qualifications.",
      fullContent: "Our experienced team uses advanced matching algorithms combined with human expertise to identify roles that best fit your profile. We consider factors like your technical skills, experience level, industry preferences, location requirements, and career trajectory. You'll receive detailed job descriptions, company information, and insights about each opportunity to help you make informed decisions.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop"
    },
    {
      label: "Candidate Approves Roles",
      icon: ThumbsUp,
      description: "Review the suggested roles and approve the ones you're interested in pursuing. You have full control over which opportunities to pursue, and our team is available to discuss any questions or concerns about specific positions.",
      fullContent: "Take your time to review each suggested role carefully. Consider the job responsibilities, required qualifications, company culture, growth opportunities, and compensation packages. You can approve multiple roles or request additional options if the initial suggestions don't quite match your expectations. Our team is here to provide additional context and help you make the best decision for your career.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop"
    },
    {
      label: "Payment Gateway Opens",
      icon: CreditCard,
      description: "Access our secure payment gateway to complete your registration fee. We support multiple payment methods and ensure all transactions are processed through encrypted, trusted payment partners for your security.",
      fullContent: "Our payment process is straightforward and secure. The registration fee covers comprehensive services including resume optimization, interview preparation, personalized job matching, and ongoing support throughout your job search. We accept various payment methods including credit cards, debit cards, and online banking. All payments are processed through industry-standard secure gateways with SSL encryption.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop"
    },
    {
      label: "Payment Completed → Candidate Activated",
      icon: CheckCheck,
      description: "Once payment is confirmed, your candidate profile is activated in our system. You now have full access to all our services and your dedicated recruiter will begin actively marketing your profile to relevant employers.",
      fullContent: "Activation means you're now officially in our active candidate pool. Your profile becomes visible to our network of partner companies, and our recruitment team begins actively promoting you for suitable positions. You'll receive access to our candidate portal where you can track your applications, schedule interviews, and communicate with your assigned recruiter.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop"
    },
    {
      label: "Recruiter Assigned",
      icon: Users,
      description: "A dedicated recruiter is assigned to manage your job search personally. Your recruiter will be your main point of contact, advocate, and guide throughout the entire placement process.",
      fullContent: "Your assigned recruiter is an experienced professional who specializes in your industry or job function. They will work closely with you to understand your unique value proposition, refine your job search strategy, and represent you to potential employers. Your recruiter serves as your career coach, providing guidance on interview preparation, salary negotiation, and career decisions.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop"
    },
    {
      label: "Admin Uploads Resources & Marketing Begins",
      icon: Upload,
      description: "Our team uploads your optimized resume and professional documents to our system. Your recruiter begins marketing your profile to relevant companies, reaching out to hiring managers, and positioning you for the best opportunities.",
      fullContent: "This phase marks the beginning of active job search activities. Our team creates multiple versions of your resume tailored to different roles and industries. Your recruiter leverages their network of hiring managers and HR professionals to introduce your profile. We also upload your profile to relevant job boards and our partner company portals, ensuring maximum visibility.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop"
    },
    {
      label: "Training & Screening Practice Begin",
      icon: GraduationCap,
      description: "Participate in comprehensive training sessions and mock interviews to prepare you for real interviews. We provide feedback on your responses, body language, and communication skills to boost your confidence and performance.",
      fullContent: "Our training program includes mock interviews, technical assessments, behavioral interview preparation, and communication skills development. You'll practice answering common interview questions, learn techniques for showcasing your strengths, and receive constructive feedback. We also provide industry-specific preparation materials and tips for passing various screening processes that companies use.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop"
    },
    {
      label: "Ongoing Communication in Portal",
      icon: MessageCircle,
      description: "Stay connected with your recruiter and our team through our dedicated communication portal. Receive real-time updates on job applications, interview schedules, and feedback. Access resources and track your progress throughout the journey.",
      fullContent: "Our communication portal serves as your central hub for all recruitment activities. You can message your recruiter, receive notifications about new opportunities, access interview preparation materials, and track the status of your applications. The portal also provides a resource library with articles, videos, and guides to help you succeed in your job search. Regular updates ensure you're always informed about next steps.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop"
    },
  ];

  return (
    <div className="hiw-root">
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>

      <nav className={`side-nav ${menuOpen ? 'open' : ''}`}>
        <div className="side-nav-header">
          <h3>Process Steps</h3>
        </div>
        <div className="side-nav-content">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <a
                key={i}
                href={`#step-${i}`}
                className={`nav-item ${activeStep === i ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <div className="nav-icon">
                  <Icon size={20} />
                </div>
                <div className="nav-text">
                  <div className="nav-number">Step {i + 1}</div>
                  <div className="nav-label">{step.label}</div>
                </div>
              </a>
            );
          })}
        </div>
      </nav>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

      <main className="main-content">
        <header className="page-header">
          <h1>How It Works</h1>
          <p className="subtitle">Your complete journey from interest to placement</p>
          <p className="header-description">
            Follow our streamlined 13-step process designed to match you with your ideal career opportunity.
            From your initial interest to successful placement, we guide you every step of the way with
            personalized support, comprehensive training, and dedicated recruitment expertise.
          </p>
        </header>

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <section
              key={i}
              id={`step-${i}`}
              className="step-section"
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="step-container">
                <div className="step-content">
                  <div className="step-header">
                    <div className="step-icon">
                      <Icon size={32} />
                      <span className="step-badge">{i + 1}</span>
                    </div>
                    <div>
                      <h2>Step {i + 1}</h2>
                      <h3>{step.label}</h3>
                    </div>
                  </div>

                  <p className="step-description">{step.description}</p>

                  <div className="step-detail">
                    <h4>Detailed Overview</h4>
                    <p>{step.fullContent}</p>
                  </div>

                  {step.label.includes("Training & Screening") && (
                    <button className="cta-button">
                      Schedule Practice Session
                    </button>
                  )}
                </div>

                <div className="step-image">
                  <img src={step.image} alt={step.label} />
                  <div className="image-overlay">
                    <Icon size={48} />
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <footer className="page-footer">
          <div className="footer-content">
            <h3>Ready to Start Your Journey?</h3>
            <p>Have questions? <Link to="/interest" style={{ color: 'white', fontWeight: '700' }}>Contact our admissions team</Link> for personalized guidance.</p>
            <button className="cta-button" onClick={() => navigate('/register')}>Get Started Now</button>
          </div>
        </footer>
      </main>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .hiw-root {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #ffffff;
          min-height: 100vh;
          position: relative;
        }

        /* Menu Toggle Button */
        .menu-toggle {
          position: fixed;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          z-index: 1001;
          background: #3b82f6;
          color: white;
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 12px 0 0 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: -4px 4px 20px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
        }

        .menu-toggle:hover {
          background: #2563eb;
          right: 22px;
          box-shadow: -6px 6px 30px rgba(59, 130, 246, 0.5);
        }

        .side-nav {
          position: fixed;
          top: 0;
          right: -400px;
          width: 400px;
          height: 100vh;
          background: white;
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          transition: right 0.3s ease;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .side-nav.open {
          right: 0;
        }

        .side-nav-header {
          padding: 30px 24px 20px;
          border-bottom: 2px solid #e5e7eb;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }

        .side-nav-header h3 {
          color: white;
          font-size: 24px;
          font-weight: 700;
        }

        .side-nav-content {
          flex: 1;
          overflow-y: auto;
          padding: 8px 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 24px;
          text-decoration: none;
          color: #1f2937;
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
        }

        .nav-item:hover {
          background: #f3f4f6;
          border-left-color: #3b82f6;
        }

        .nav-item.active {
          background: #eff6ff;
          border-left-color: #3b82f6;
        }

        .nav-icon {
          min-width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border-radius: 10px;
          transition: transform 0.3s ease;
        }

        .nav-item:hover .nav-icon,
        .nav-item.active .nav-icon {
          transform: scale(1.1) rotate(-5deg);
        }

        .nav-text {
          flex: 1;
        }

        .nav-number {
          font-size: 12px;
          font-weight: 600;
          color: #3b82f6;
          margin-bottom: 2px;
        }

        .nav-label {
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          backdrop-filter: blur(2px);
        }

        .main-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
          padding-right: 80px;
        }

        .page-header {
          text-align: center;
          margin-bottom: 80px;
          padding: 60px 20px;
        }

        .page-header h1 {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: clamp(16px, 2vw, 20px);
          color: #6b7280;
          font-weight: 400;
          margin-bottom: 24px;
        }

        .header-description {
          max-width: 800px;
          margin: 0 auto;
          font-size: 16px;
          color: #6b7280;
          line-height: 1.8;
        }

        .step-section {
          margin-bottom: 60px;
          scroll-margin-top: 100px;
        }

        .step-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
          background: white;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 2px solid #f3f4f6;
          transition: all 0.3s ease;
        }

        .step-container:hover {
          box-shadow: 0 20px 60px rgba(59, 130, 246, 0.15);
          border-color: #3b82f6;
          transform: translateY(-4px);
        }

        .step-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 24px;
        }

        .step-icon {
          position: relative;
          min-width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }

        .step-badge {
          position: absolute;
          bottom: -8px;
          right: -8px;
          background: #1f2937;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          border: 3px solid white;
        }

        .step-header h2 {
          font-size: 14px;
          color: #3b82f6;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .step-header h3 {
          font-size: 28px;
          color: #1f2937;
          font-weight: 700;
          line-height: 1.3;
        }

        .step-description {
          font-size: 16px;
          color: #4b5563;
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .step-detail {
          background: #f9fafb;
          border-left: 4px solid #3b82f6;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .step-detail h4 {
          font-size: 18px;
          color: #1f2937;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .step-detail p {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.7;
        }

        .step-image {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9fafb;
        }

        .step-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 20px;
          transition: transform 0.5s ease;
        }

        .step-container:hover .step-image img {
          transform: scale(1.05);
        }

        .image-overlay {
          display: none;
        }

        .cta-button {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
        }

        .page-footer {
          margin-top: 100px;
          padding: 60px 40px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 24px;
          text-align: center;
          color: white;
        }

        .footer-content h3 {
          font-size: 32px;
          margin-bottom: 16px;
        }

        .footer-content p {
          font-size: 18px;
          margin-bottom: 32px;
          opacity: 0.95;
        }

        .footer-content a {
          color: white;
          text-decoration: underline;
          font-weight: 600;
        }

        .page-footer .cta-button {
          background: white;
          color: #3b82f6;
        }

        .page-footer .cta-button:hover {
          background: #f3f4f6;
        }

        @media (max-width: 1200px) {
          .step-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .step-image {
            height: 400px;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            padding-right: 20px;
          }

          .side-nav {
            width: 320px;
            right: -320px;
          }

          .menu-toggle {
            width: 48px;
            height: 48px;
          }

          .step-container {
            padding: 32px 24px;
          }

          .step-header {
            flex-direction: column;
          }

          .step-icon {
            min-width: 64px;
            height: 64px;
          }

          .step-header h3 {
            font-size: 24px;
          }

          .step-image {
            height: 300px;
          }

          .page-footer {
            padding: 40px 24px;
          }
        }

        @media (max-width: 480px) {
          .side-nav {
            width: 100%;
            right: -100%;
          }

          .page-header {
            padding: 40px 20px;
          }

          .step-container {
            padding: 24px 16px;
          }
        }
      `}</style>
    </div>
  );
}