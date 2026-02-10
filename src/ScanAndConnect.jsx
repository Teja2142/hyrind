import React, { useEffect } from 'react';
import { FaInstagram, FaLinkedin, FaWhatsapp, FaArrowRight } from 'react-icons/fa';

const ScanAndConnect = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const socialLinks = [
        {
            name: 'Follow us on Instagram',
            icon: <FaInstagram />,
            url: 'https://www.instagram.com/hyrind_usa/',
            color: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            description: 'Daily job tips, hiring trends & student updates'
        },
        {
            name: 'Connect on LinkedIn',
            icon: <FaLinkedin />,
            url: 'https://www.linkedin.com/company/hyrind/',
            color: '#0077b5',
            description: 'Professional networking & industry news'
        },
        {
            name: 'Join WhatsApp Channel',
            icon: <FaWhatsapp />,
            url: 'https://whatsapp.com/channel/3143540634', // Placeholder, update if you have one
            color: '#25D366',
            description: 'Instant job alerts & important broadcast updates'
        }
    ];

    return (
        <div style={styles.container}>
            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .social-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }
        
        .social-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .icon-circle {
          transition: transform 0.5s ease;
        }
        
        .social-card:hover .icon-circle {
          transform: rotate(360deg);
        }
      `}</style>

            <div style={styles.content}>
                <div className="fade-in-up" style={styles.header}>
                    <div style={styles.badge}>SCAN & CONNECT</div>
                    <h1 style={styles.title}>Stay Connected with HYRIND</h1>
                    <p style={styles.subtitle}>
                        Join our community to stay updated with job tips, hiring trends, and real-time career updates.
                    </p>
                </div>

                <div style={styles.grid}>
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-card fade-in-up"
                            style={{ ...styles.card, animationDelay: `${0.2 + index * 0.1}s` }}
                        >
                            <div style={{ ...styles.iconCircle, background: link.color }} className="icon-circle">
                                {link.icon}
                            </div>
                            <div style={styles.cardInfo}>
                                <h3 style={styles.cardName}>{link.name}</h3>
                                <p style={styles.cardDesc}>{link.description}</p>
                            </div>
                            <div style={styles.arrowBox}>
                                <FaArrowRight />
                            </div>
                        </a>
                    ))}
                </div>

                <div className="fade-in-up" style={{ ...styles.footer, animationDelay: '0.6s' }}>
                    <p>We are dedicated to your career success. Let's move forward together.</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '120px 20px 60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    content: {
        maxWidth: '800px',
        width: '100%',
    },
    header: {
        textAlign: 'center',
        marginBottom: '60px',
    },
    badge: {
        display: 'inline-block',
        padding: '6px 16px',
        background: '#e0e7ff',
        color: '#1e40af',
        borderRadius: '20px',
        fontSize: '0.875rem',
        fontWeight: '700',
        letterSpacing: '1px',
        marginBottom: '20px',
    },
    title: {
        fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
        fontWeight: '800',
        color: '#1e293b',
        marginBottom: '16px',
    },
    subtitle: {
        fontSize: '1.1rem',
        color: '#64748b',
        lineHeight: '1.6',
        maxWidth: '600px',
        margin: '0 auto',
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    card: {
        background: '#ffffff',
        borderRadius: '20px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: '1px solid #e2e8f0',
        color: 'inherit',
        position: 'relative',
        overflow: 'hidden',
    },
    iconCircle: {
        width: '60px',
        height: '60px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.75rem',
        color: '#ffffff',
        marginRight: '24px',
        flexShrink: 0,
    },
    cardInfo: {
        flex: 1,
    },
    cardName: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '4px',
    },
    cardDesc: {
        fontSize: '0.95rem',
        color: '#64748b',
        margin: 0,
    },
    arrowBox: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: '#f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1e40af',
        marginLeft: '16px',
    },
    footer: {
        textAlign: 'center',
        marginTop: '60px',
        color: '#94a3b8',
        fontSize: '0.95rem',
    }
};

export default ScanAndConnect;
