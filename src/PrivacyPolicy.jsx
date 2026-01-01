import React from "react";

export default function PrivacyPolicy({ lastUpdated = "Dec 3 2025" }) {
  return (
    <main className="privacy-root" aria-label="Privacy Policy">
      <style>{`
        :root{
          --bg:#f7f8fb;
          --card:#ffffff;
          --muted:#6b7280;
          --accent:#0f172a;
          --accent-2:#0ea5a4;
          --radius:16px;
          --container-max:1100px;
        }

        *{box-sizing:border-box}

        .privacy-root{
          min-height:100vh;
          background:linear-gradient(180deg,var(--bg),#ffffff);
          padding:32px 20px;
          display:flex;
          align-items:center;
          justify-content:center;
          font-family:Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color:var(--accent);
        }

        .privacy-card{
          width:100%;
          max-width:var(--container-max);
          background:var(--card);
          border-radius:var(--radius);
          box-shadow:0 6px 30px rgba(16,24,40,0.08);
          overflow:hidden;
          padding:28px;
        }

        .privacy-header{
          display:flex;
          align-items:flex-start;
          gap:18px;
          margin-bottom:20px;
        }

        .badge{
          flex:0 0 58px;
          height:58px;
          border-radius:12px;
          background:linear-gradient(135deg,var(--accent-2),#0369a1);
          display:flex;
          align-items:center;
          justify-content:center;
          color:white;
          font-weight:700;
          font-size:18px;
        }

        .title-block{
          display:flex;
          flex-direction:column;
          gap:6px;
        }

        .title{font-size:20px;line-height:1.05;font-weight:700}
        .meta{font-size:13px;color:var(--muted)}

        .grid{
          display:grid;
          grid-template-columns:1fr;
          gap:20px;
        }

        .section{
          background:linear-gradient(180deg, rgba(14,165,164,0.02), transparent);
          padding:18px;
          border-radius:12px;
        }

        .section h3{margin:0 0 8px 0;font-size:16px}
        .section p, .section li{margin:6px 0;color:var(--accent);line-height:1.6}

        ul{padding-left:20px;margin:8px 0}

        .contact{display:flex;flex-direction:column;gap:8px}

        .footer{
          display:flex;
          gap:12px;
          justify-content:space-between;
          align-items:center;
          margin-top:18px;
          flex-wrap:wrap;
        }

        .btn{
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding:9px 12px;
          border-radius:10px;
          background:linear-gradient(90deg,#0ea5a4,#0369a1);
          color:white;
          font-weight:600;
          text-decoration:none;
          border:none;
          cursor:pointer;
        }

        @media (min-width:720px){
          .grid{grid-template-columns:1fr 320px}
          .title{font-size:22px}
        }

        @media (min-width:1024px){
          .privacy-root{padding:48px}
          .privacy-card{padding:36px}
        }

        @media (max-width:420px){
          .badge{flex:0 0 48px;height:48px;font-size:16px}
          .privacy-card{padding:18px}
        }
      `}</style>

      <article className="privacy-card">
        <header className="privacy-header">
          <div className="title-block">
            <div className="title">Privacy Policy</div>
            <div className="meta">Last updated on {lastUpdated}</div>
          </div>
        </header>

        <div className="grid">
          <section className="section">
            <h3>Introduction</h3>
            <p>This privacy policy sets out how HYRIND PRIVATE LIMITED uses and protects any information that you give HYRIND PRIVATE LIMITED when you visit our website and/or agree to purchase from us.</p>

            <h3>Information We May Collect</h3>
            <ul>
              <li>Name</li>
              <li>Contact information including email address</li>
              <li>Demographic information such as postcode, preferences and interests, if required</li>
              <li>Other information relevant to customer surveys and/or offers</li>
            </ul>

            <h3>How We Use Your Information</h3>
            <ul>
              <li>Internal record keeping.</li>
              <li>To improve our products and services.</li>
              <li>To send periodic promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li>
              <li>To contact you for market research purposes by email, phone, fax or mail if required.</li>
            </ul>

            <h3>Cookies</h3>
            <p>We use cookies to identify which pages are being used. This helps us analyse data about webpage traffic to improve our website. Cookies do not give us access to your computer or any information about you other than the data you choose to share with us. You can accept or decline cookies through your browser settings.</p>

            <h3>Controlling Your Personal Information</h3>
            <p>You may choose to restrict the collection or use of your personal information in the following ways:</p>
            <ul>
              <li>When asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used for direct marketing purposes.</li>
              <li>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at support@hyrind.com</li>
            </ul>

            <h3>Sharing and Disclosure</h3>
            <p>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law. We may use your personal information to send you promotional information about third parties if you request this.</p>
          </section>

          <aside className="section">
            <h3>What We Do With The Information</h3>
            <p>We require this information to understand your needs and provide you with a better service.</p>

            <h3>Security</h3>
            <p>We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in suitable measures.</p>

            <h3>Contact Us</h3>
            <div className="contact">
              <p style={{ marginBottom: '15px' }}>For all inquiries and support, please visit:</p>
              <a
                href="https://merchant.razorpay.com/policy/Rn2giKHxuBBdz0/contact_us"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  display: 'inline-block',
                  textDecoration: 'none',
                  marginTop: '10px'
                }}
              >
                Contact Page
              </a>
            </div>


          </aside>
        </div>
      </article>
    </main>
  );
}
