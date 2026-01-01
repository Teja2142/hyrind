import React from "react";
import { FaEnvelope, FaPhone, FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <style>
        {`
          .footer {
            background-color: #0d47a1;
            color: white;
            padding: 50px 30px;
            font-family: Arial, sans-serif;
          }

          .footer-container {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 50px;
            margin-bottom: 30px;
          }

          .footer-column {
            flex: 1;
            min-width: 220px;
          }

          .footer-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 15px;
          }

          .footer-link {
            margin-bottom: 10px;
            font-size: 15px;
          }

          /* FIXED LINK COLOR ISSUE */
          .footer-column a {
            color: #e0e8ff !important;
            text-decoration: none;
            transition: 0.3s;
          }

          .footer-column a:hover {
            color: #ffeb3b !important;
          }

          .qr-box {
            width: 150px;
            height: 150px;
            background: white;
            padding: 10px;
            border-radius: 8px;
          }

          .contact-item {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
            font-size: 15px;
          }

          .social-icons {
            display: flex;
            gap: 15px;
            margin-top: 10px;
          }

          .social-icons svg {
            font-size: 22px;
            cursor: pointer;
            transition: 0.3s;
          }

          .social-icons svg:hover {
            color: #ffeb3b;
          }

          .footer-bottom {
            text-align: center;
            border-top: 1px solid rgba(255,255,255,0.3);
            padding-top: 15px;
            font-size: 14px;
            color: #dce6ff;
          }

          @media (max-width: 768px) {
            .footer-container {
              text-align: center;
            }
            .social-icons {
              justify-content: center;
            }
          }
        `}
      </style>

      <footer className="footer">
        <div className="footer-container">

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <p className="footer-link"><Link to="/">Home</Link></p>
            <p className="footer-link"><Link to="/about">About us</Link></p>
            <p className="footer-link"><Link to="/services">Services</Link></p>
            <p className="footer-link"><Link to="/howitworks">How it works</Link></p>
            <p className="footer-link"><Link to="/reviews">Reviews</Link></p>
            <p className="footer-link">
              <a
                href="https://merchant.razorpay.com/policy/Rn2giKHxuBBdz0/contact_us"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact us
              </a>
            </p>
          </div>

          {/* Solutions */}
          <div className="footer-column">
            <h3 className="footer-title">Solutions</h3>
            <p className="footer-link">OPT Hiring Automation</p>
            <p className="footer-link">Digital Document Workflow</p>
            <p className="footer-link">Compliance Tracking</p>
            <p className="footer-link">Employee Management</p>
            <p className="footer-link">Secure Data Handling</p>
          </div>

          {/* QR Code */}
          <div className="footer-column">
            <h3 className="footer-title">Scan & Connect</h3>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://hyrind.com"
              alt="QR Code"
              className="qr-box"
            />
            <p style={{ marginTop: "10px", fontSize: "14px" }}>Scan me!</p>
          </div>

          {/* Contact Section */}
          <div className="footer-column">
            <h3 className="footer-title">Contact</h3>

            <div className="contact-item">
              <FaEnvelope /> support@hyrind.com
            </div>

            <div className="contact-item">
              <FaPhone /> +1-XXX-XXX-XXXX
            </div>

            <h3 className="footer-title" style={{ marginTop: "15px" }}>Social Media</h3>

            <div className="social-icons">
              <FaInstagram />
              <FaFacebook />
              <FaTwitter />
              <FaLinkedin />
              <FaYoutube />
            </div>
          </div>
        </div>

        {/* <div className="footer-bottom">
          © {new Date().getFullYear()} Hyrind. All Rights Reserved |
          Sitemap | Privacy Policy | Terms of Use
        </div> */}
      </footer>
    </>
  );
};

export default Footer;
