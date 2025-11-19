import React from 'react';

// Main Component
const PrivacyPolicy = () => {
  // Define styles using standard JavaScript objects for inline application
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '40px auto',
      padding: '20px 30px',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      lineHeight: '1.6',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      color: '#333333',
    },
    header: {
      textAlign: 'center',
      color: '#0056b3', // HYRIND primary color placeholder
      borderBottom: '2px solid #0056b3',
      paddingBottom: '15px',
      marginBottom: '30px',
      fontSize: '28px',
      fontWeight: '700',
    },
    sectionTitle: {
      color: '#0056b3',
      fontSize: '22px',
      marginTop: '30px',
      marginBottom: '10px',
      fontWeight: '600',
    },
    paragraph: {
      marginBottom: '15px',
      textAlign: 'justify',
    },
    list: {
      listStyleType: 'disc',
      marginLeft: '25px',
      marginBottom: '15px',
    },
    listItem: {
      marginBottom: '5px',
    },
    date: {
      display: 'block',
      textAlign: 'right',
      fontSize: '14px',
      color: '#666666',
      marginTop: '20px',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>HYRIND Privacy Policy</h1>
      <span style={styles.date}>Effective Date: November 18, 2025</span>

      <p style={styles.paragraph}>
        This Privacy Policy outlines how HYRIND ("we," "our," or "us") collects, uses, and protects the personal data of our users, particularly Master's students and F-1 OPT holders seeking career assistance. By using our platform, you consent to the data practices described in this policy.
      </p>

      <h2 style={styles.sectionTitle}>1. Information We Collect</h2>
      <p style={styles.paragraph}>
        We collect information necessary to provide our services, which includes but is not limited to:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>**Identification & Contact Data:** Name, email, phone number.</li>
        <li style={styles.listItem}>**Academic & Visa Data:** University, degree, major, graduation date, visa status (e.g., F-1 OPT end date), transcripts, and other documents you upload.</li>
        <li style={styles.listItem}>**Professional Data:** Resume/CV, intake questionnaire answers, screening call results, and admin-built skills roadmaps.</li>
        <li style={styles.listItem}>**Billing Data:** Payment tokens (stored by Xflow), billing history, and invoice records. We **do not** store raw card PAN data.</li>
        <li style={styles.listItem}>**Usage Data:** Audit logs for admin actions, and webhooks logs.</li>
      </ul>

      <h2 style={styles.sectionTitle}>2. How We Use Your Information</h2>
      <p style={styles.paragraph}>
        Your information is used for the following primary purposes:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>**Service Delivery:** To approve/reject your application (Admin), build your professional resume and skills roadmap, and provide scheduled training.</li>
        <li style={styles.listItem}>**Marketing:** To trigger outbound marketing workflows and share your profile/resume with Recruiters/Operators and integrated CRM systems (e.g., Salesforce/HubSpot).</li>
        <li style={styles.listItem}>**Billing & Payments:** To process the one-time setup fee and recurring monthly subscription via Xflow, manage billing dates, and handle payment retries/refunds.</li>
        <li style={styles.listItem}>**Communication:** To send transactional emails (invoices, status updates), SMS notifications (reminders), and training invites.</li>
      </ul>

      <h2 style={styles.sectionTitle}>3. Disclosure and Sharing of Information</h2>
      <p style={styles.paragraph}>
        We share your data strictly to deliver the service you subscribed to:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>**Recruiters/Operators:** Your resume and profile are shared monthly for marketing purposes, as this is a core function of the service. **You must provide explicit consent for this sharing during the onboarding process.**</li>
        <li style={styles.listItem}>**Payment Processors:** We share necessary billing information (excluding raw PAN) with our payment aggregator, Xflow, for tokenization and processing recurring charges.</li>
        <li style={styles.listItem}>**CRMs and Schedulers:** Data is pushed to CRM systems (Salesforce/HubSpot) and Calendar systems (Google Calendar / Office 365) to log activities, schedule training, and manage follow-ups.</li>
      </ul>

      <h2 style={styles.sectionTitle}>4. Data Security and Retention</h2>
      <p style={styles.paragraph}>
        We implement security measures including HTTPS, HSTS, input validation, and PCI scope reduction (by using Xflow for tokenization) to protect your data. Your documents (resumes, transcripts) are stored on an S3-compatible object store. We retain data as long as your account is active or as necessary for legal compliance and financial auditing.
      </p>

    </div>
  );
};

// Export the main component as App as per React file generation mandate
export default PrivacyPolicy;