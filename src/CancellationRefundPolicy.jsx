import React from "react";

export default function CancellationRefundPolicy() {
  return (
    <div>
      <style>{`
        .page-wrapper {
          min-height: 100vh;
          background-color: #f9fafb;
          padding: 50px 20px;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
        }
        .header-box {
          background: #ffffff;
          padding: 25px 35px;
          border-radius: 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }
        .title {
          font-size: 28px;
          font-weight: 600;
          color: #111827;
        }
        .subtitle {
          margin-top: 5px;
          font-size: 14px;
          color: #6b7280;
        }
        .section-box {
          background: #ffffff;
          padding: 25px 35px;
          border-radius: 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 25px;
        }
        .section-text {
          color: #374151;
          line-height: 1.65;
        }
        .list {
          margin-top: 20px;
          list-style: none;
          padding: 0;
        }
        .list-item {
          display: flex;
          align-items: start;
          margin-bottom: 20px;
        }
        .icon {
          width: 24px;
          height: 24px;
          margin-right: 15px;
          color: #4f46e5;
          flex-shrink: 0;
          margin-top: 4px;
        }
        .item-title {
          font-size: 16px;
          color: #1f2937;
          font-weight: 600;
        }
        .item-desc {
          font-size: 14px;
          color: #4b5563;
          margin-top: 4px;
        }
        .divider {
          border-top: 1px solid #e5e7eb;
          margin-top: 20px;
          padding-top: 20px;
        }
        .quick-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
          margin-top: 20px;
        }
        @media(min-width: 600px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        details {
          background: #f3f4f6;
          padding: 12px 16px;
          border-radius: 10px;
          cursor: pointer;
        }
        summary {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 6px;
        }
      `}</style>

      <div className="page-wrapper">
        <div className="container">

          <div className="header-box">
            <h1 className="title">Cancellation & Refund Policy</h1>
            <p className="subtitle">
              Last updated on <time dateTime="2025-12-03">Dec 3 2025</time>
            </p>
          </div>

          <div className="section-box">
            <p className="section-text">
              HYRIND PRIVATE LIMITED believes in helping its customers as far as possible,
              and has therefore a liberal cancellation policy. Under this policy:
            </p>

            <ul className="list">

              <li className="list-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                </svg>
                <div>
                  <p className="item-title">Cancellation window</p>
                  <p className="item-desc">
                    Cancellations will be considered only if the request is made within 
                    <strong> Not Applicable</strong> of placing the order.
                  </p>
                </div>
              </li>

              <li className="list-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" />
                </svg>
                <div>
                  <p className="item-title">Perishable items</p>
                  <p className="item-desc">
                    No cancellations for perishables like flowers, food, etc.
                    Refund/replacement possible only if quality is bad.
                  </p>
                </div>
              </li>

              <li className="list-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m4 4v-6a2 2 0 00-2-2h-3" />
                </svg>
                <div>
                  <p className="item-title">Damaged / defective items</p>
                  <p className="item-desc">
                    Report within <strong>Not Applicable</strong>. Merchant verification required.
                  </p>
                </div>
              </li>

              <li className="list-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V11H3v8a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="item-title">Product not as expected</p>
                  <p className="item-desc">
                    Report within <strong>Not Applicable</strong>. Action based on customer service review.
                  </p>
                </div>
              </li>

              <li className="list-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                </svg>
                <div>
                  <p className="item-title">Refund processing time</p>
                  <p className="item-desc">
                    Refunds will be processed within <strong>Not Applicable</strong>.
                  </p>
                </div>
              </li>
            </ul>

            <div className="divider">
              <p className="item-desc">
                For help, contact our Customer Service.
              </p>
            </div>
          </div>

          <div className="section-box">
            <h2 className="quick-title">Quick Access (Mobile Friendly)</h2>

            <div className="grid">
              <details>
                <summary>Cancellation window</summary>
                <p className="item-desc">Request must be within <strong>Not Applicable</strong>.</p>
              </details>

              <details>
                <summary>Damaged items</summary>
                <p className="item-desc">Report within <strong>Not Applicable</strong>.</p>
              </details>

              <details>
                <summary>Perishable items</summary>
                <p className="item-desc">No cancellations for perishables.</p>
              </details>

              <details>
                <summary>Refund time</summary>
                <p className="item-desc">Refund will be processed in <strong>Not Applicable</strong>.</p>
              </details>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
