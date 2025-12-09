import React from "react";

export default function ShippingPolicy() {
  return (
    <div className="shipping-delivery-root">
      <style>{`
        :root{
          --bg:#f7f9fb;
          --card:#ffffff;
          --muted:#6b7280;
          --accent:#0f6eff;
          --radius:16px;
          --container-padding:24px;
        }
        .shipping-delivery-root{
          background:var(--bg);
          min-height:100vh;
          padding:100px 16px 40px; 
          box-sizing:border-box;
          font-family:Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color:#111827;
        }
        .container{
          max-width:980px;
          margin:0 auto;
          background:linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.98));
          border-radius:var(--radius);
          box-shadow:0 6px 30px rgba(15,23,42,0.06);
          padding:var(--container-padding);
          overflow:hidden;
        }
        .header{
          display:flex;
          gap:16px;
          align-items:flex-start;
          justify-content:space-between;
          flex-wrap:wrap;
        }
        .title-block{
          min-width:0;
        }
        h1{
          margin:0 0 6px 0;
          font-size:20px;
          line-height:1.15;
          letter-spacing:-0.2px;
        }
        .meta{
          color:var(--muted);
          font-size:13px;
        }
        .content{
          margin-top:20px;
          display:grid;
          grid-template-columns:1fr 320px;
          gap:20px;
        }
        .policy{
          background:var(--card);
          border-radius:12px;
          padding:18px;
          box-shadow:0 2px 10px rgba(2,6,23,0.04);
          line-height:1.6;
          font-size:15px;
          color:#111827;
        }
        .contact{
          background:linear-gradient(180deg, #ffffff, #fbfdff);
          border-radius:12px;
          padding:18px;
          box-shadow:0 2px 10px rgba(2,6,23,0.04);
          display:flex;
          flex-direction:column;
          gap:12px;
          align-items:flex-start;
          justify-content:center;
        }
        .contact .label{
          font-weight:600;
          font-size:14px;
          color:#0b1220;
        }
        .contact a{
          color:var(--accent);
          text-decoration:none;
          font-weight:600;
          font-size:14px;
          word-break:break-all;
        }
        .list{
          margin:0;
          padding-left:20px;
        }
        .note{
          margin-top:12px;
          font-size:13px;
          color:var(--muted);
          background:rgba(15,110,255,0.05);
          padding:10px;
          border-radius:10px;
        }
        @media (max-width:880px){
          .content{
            grid-template-columns:1fr;
          }
          .header{
            align-items:flex-start;
          }
        }
        @media (max-width:420px){
          h1{ font-size:18px; }
          .container{ padding:16px; }
        }
      `}</style>

      <div className="container" role="region" aria-labelledby="shipping-title">
        <div className="header">
          <div className="title-block">
            <h1 id="shipping-title">Shipping & Delivery Policy</h1>
            <div className="meta">Last updated on Dec 3 2025</div>
          </div>
          <div className="meta" aria-hidden="true">HYRIND PRIVATE LIMITED</div>
        </div>

        <div className="content">
          <div className="policy" tabIndex={0}>
            <p>For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and/or speed post only.</p>

            <p>Orders are shipped within Not Applicable or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms. HYRIND PRIVATE LIMITED is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within Not Applicable from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.</p>

            <p>Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.</p>

            <div className="note" role="note">
              If you face any issues in utilizing our services, please contact our helpdesk.
            </div>

            <ul className="list" aria-label="Key points">
              <li>International shipments are handled by registered international couriers and international speed post.</li>
              <li>Domestic shipments are handled by registered domestic couriers and speed post.</li>
              <li>Delivery timelines follow courier/postal norms; HYRIND PRIVATE LIMITED hands consignments to carriers as per the agreed timeline.</li>
              <li>Delivery is made to the address provided by the buyer at checkout.</li>
            </ul>
          </div>

          <aside className="contact" aria-labelledby="contact-heading">
            <div id="contact-heading" className="label">Contact & Support</div>
            <div>
              <div className="label">Helpdesk</div>
              <a href="tel:+917075405791">7075405791</a>
            </div>
            <div>
              <div className="label">Email</div>
              <a href="mailto:support@hyrind.com">support@hyrind.com</a>
            </div>
            <div>
              <div className="label">Company</div>
              <div className="meta">HYRIND PRIVATE LIMITED</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
