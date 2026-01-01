import React, { useState } from 'react';

export default function Contact() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{
      width: '100%',
      height: 'calc(100vh - 80px)',
      minHeight: '600px',
      paddingTop: '80px',
      position: 'relative'
    }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          zIndex: 10
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #0b72ff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{
            fontSize: '16px',
            color: '#475569',
            fontWeight: '500',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            Loading Contact Page...
          </p>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <iframe
        src="https://merchant.razorpay.com/policy/Rn2giKHxuBBdz0/contact_us"
        frameBorder="0"
        width="100%"
        height="100%"
        title="Contact Us"
        style={{ border: 'none', display: 'block' }}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

