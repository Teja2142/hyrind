import React from "react";
import { 
  Globe, FileText, Phone, CheckCircle, FileEdit, 
  Briefcase, ThumbsUp, CreditCard, CheckCheck, 
  Users, Upload, GraduationCap, MessageCircle 
} from "lucide-react";

export default function HowItWorksFlow() {
  const steps = [
    { label: "Explore Website", icon: Globe },
    { label: "Submit Interest Form", icon: FileText },
    { label: "HYRIND Calls You", icon: Phone },
    { label: "Admin Approves Your Registration", icon: CheckCircle },
    { label: "Fill Credential & Client Intake Sheets", icon: FileEdit },
    { label: "Admin Suggests Roles", icon: Briefcase },
    { label: "Candidate Approves Roles", icon: ThumbsUp },
    { label: "Payment Gateway Opens", icon: CreditCard },
    { label: "Payment Completed → Candidate Activated", icon: CheckCheck },
    { label: "Recruiter Assigned", icon: Users },
    { label: "Admin Uploads Resources (Resume) & Recruiter Starts Marketing", icon: Upload },
    { label: "Training & Screening Practice Begin", icon: GraduationCap },
    { label: "Ongoing Communication in Portal", icon: MessageCircle },
  ];

  const handleSchedule = () => {
    alert("Schedule an appointment — integrate your booking flow here.");
  };

  return (
    <div className="hiw-root" aria-label="How it works visual flow">
      <header className="hiw-header">
        <h1>How It Works</h1>
        <p className="lead">End-to-end process — from interest to activation and placement.</p>
      </header>

      <section className="hiw-flow" role="list">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <article
              key={step.label}
              role="listitem"
              className={`hiw-step ${i % 2 === 0 ? "left" : "right"}`}
              aria-label={`Step ${i + 1}: ${step.label}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="hiw-step-inner">
                <div className="hiw-bullet">
                  <Icon size={24} strokeWidth={2.5} />
                  <span className="step-number">{i + 1}</span>
                </div>
                <div className="hiw-content">
                  <h3>{`Step ${i + 1}`}</h3>
                  <p>{step.label}</p>
                  {step.label.includes("Payment Gateway") && (
                    <p className="muted">Secure payment by trusted gateway — multiple options supported.</p>
                  )}
                  {step.label.includes("Training & Screening") && (
                    <div className="cta-row">
                      <button className="btn primary" onClick={handleSchedule}>
                        Schedule Practice / Screening
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="connector"></div>
            </article>
          );
        })}

        <div className="hiw-spine" aria-hidden="true"></div>
      </section>

      <footer className="hiw-footer">
        <p>
          Questions? <a href="#contact">Contact our admissions team</a> — or click the button to schedule a
          practice session.
        </p>
        <button className="btn outline" onClick={handleSchedule}>
          Schedule Appointment
        </button>
      </footer>

      <style>{`
        * {
          box-sizing: border-box;
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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .hiw-root{
          font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: #0f172a;
          background: #ffffff;
          min-height: 100vh;
          padding: 60px 20px;
          position: relative;
        }

        .hiw-header{
          text-align: center;
          margin-bottom: 60px;
          position: relative;
          z-index: 1;
          animation: fadeInUp 0.8s ease-out;
        }

        .hiw-header h1{
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          margin-bottom: 16px;
          color: #1e293b;
          letter-spacing: -0.5px;
        }

        .lead{
          color: #64748b;
          font-size: clamp(14px, 2vw, 18px);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .hiw-flow{
          position: relative;
          display: grid;
          grid-template-columns: 1fr 80px 1fr;
          gap: 40px 0;
          align-items: start;
          max-width: 1200px;
          margin: 0 auto;
          z-index: 1;
        }

        .hiw-spine{
          grid-column: 2 / 3;
          grid-row: 1 / -1;
          background: linear-gradient(
            180deg, 
            #e0e7ff, 
            #3b82f6, 
            #e0e7ff
          );
          width: 4px;
          border-radius: 10px;
          margin: 0 auto;
          position: relative;
        }

        .hiw-step{
          display: flex;
          padding: 0;
          position: relative;
          animation: fadeInUp 0.6s ease-out both;
        }

        .hiw-step.left{ 
          grid-column: 1 / 2; 
          justify-content: flex-end;
          padding-right: 20px;
        }
        
        .hiw-step.right{ 
          grid-column: 3 / 4; 
          justify-content: flex-start;
          padding-left: 20px;
        }

        .connector {
          position: absolute;
          width: 20px;
          height: 4px;
          background: linear-gradient(90deg, #cbd5e1, #3b82f6);
          top: 50%;
          border-radius: 4px;
        }

        .hiw-step.left .connector {
          right: 0;
          transform: translateY(-50%);
        }

        .hiw-step.right .connector {
          left: 0;
          transform: translateY(-50%);
        }

        .hiw-step-inner{
          display: flex;
          gap: 20px;
          align-items: flex-start;
          max-width: 500px;
          width: 100%;
          background: #ffffff;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .hiw-step-inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(59, 130, 246, 0.05),
            transparent
          );
          transition: left 0.5s ease;
        }

        .hiw-step-inner:hover::before {
          left: 100%;
        }

        .hiw-step-inner:hover{
          transform: translateY(-8px);
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.12),
            0 2px 6px rgba(0, 0, 0, 0.08);
          border-color: #3b82f6;
        }

        .hiw-bullet{
          min-width: 64px;
          min-height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          font-weight: 700;
          background: #3b82f6;
          color: white;
          box-shadow: 
            0 8px 20px rgba(59, 130, 246, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          position: relative;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .hiw-step-inner:hover .hiw-bullet {
          animation: pulse 1s ease-in-out infinite;
          background: #2563eb;
          box-shadow: 
            0 12px 30px rgba(59, 130, 246, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .step-number {
          position: absolute;
          bottom: -4px;
          right: -4px;
          background: #1e293b;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .hiw-content h3{
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.3px;
        }

        .hiw-content p{
          margin: 0;
          color: #475569;
          font-size: 14px;
          line-height: 1.6;
        }

        .muted{ 
          color: #64748b; 
          font-size: 13px; 
          margin-top: 12px; 
          font-style: italic;
          padding-left: 12px;
          border-left: 3px solid #e2e8f0;
        }

        .cta-row{ 
          margin-top: 16px;
        }

        .btn{
          cursor: pointer;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          border: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
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
        }

        .btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn.primary{
          background: #3b82f6;
          color: white;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.25);
        }

        .btn.primary:hover{
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(59, 130, 246, 0.35);
        }

        .btn.outline{
          background: white;
          border: 2px solid #3b82f6;
          color: #3b82f6;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .btn.outline:hover{
          background: #eff6ff;
          border-color: #2563eb;
          color: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
        }

        .hiw-footer{
          margin-top: 80px;
          display: flex;
          gap: 24px;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: 32px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.05);
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
          animation: fadeInUp 1s ease-out 0.5s both;
        }

        .hiw-footer p{ 
          margin: 0; 
          color: #475569; 
          font-size: 15px;
          line-height: 1.6;
        }

        .hiw-footer a{ 
          color: #3b82f6; 
          text-decoration: none; 
          font-weight: 700;
          transition: color 0.3s ease;
        }

        .hiw-footer a:hover {
          color: #2563eb;
        }

        @media (max-width: 992px){
          .hiw-root {
            padding: 40px 16px;
          }

          .hiw-flow{
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .hiw-spine{ display: none; }

          .hiw-step{ 
            justify-content: center;
            grid-column: 1 / 2 !important;
            padding: 0 !important;
          }

          .connector { display: none; }

          .hiw-step-inner{ 
            max-width: 100%;
          }

          .hiw-bullet{ 
            min-width: 56px; 
            min-height: 56px;
          }

          .hiw-header h1{ 
            font-size: 32px;
          }

          .hiw-footer {
            flex-direction: column;
            text-align: center;
            padding: 24px;
          }
        }

        @media (max-width: 640px){
          .hiw-root {
            padding: 32px 12px;
          }

          .hiw-header {
            margin-bottom: 40px;
          }

          .hiw-step-inner {
            flex-direction: column;
            gap: 16px;
            padding: 20px;
            align-items: center;
            text-align: center;
          }

          .hiw-bullet {
            min-width: 48px;
            min-height: 48px;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }

          .muted {
            padding-left: 0;
            border-left: none;
            padding-top: 8px;
            border-top: 2px solid #e2e8f0;
          }
        }
      `}</style>
    </div>
  );
}