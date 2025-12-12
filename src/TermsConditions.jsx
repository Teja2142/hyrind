import React from 'react';

// Main Component
const TermsConditions = () => {
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
      <h1 style={styles.header}>HYRIND Terms and Conditions</h1>
      <span style={styles.date}>Effective Date: November 18, 2025</span>

      <p style={styles.paragraph}>
        Welcome to HYRIND. These Terms and Conditions ("Terms") govern your use of our web platform and services, which are designed to assist Master's students, especially F-1 OPT holders, in their career advancement. By accessing or using our services, you agree to be bound by these Terms.
      </p>

      <h2 style={styles.sectionTitle}>1. Eligibility and Account Creation</h2>
      <p style={styles.paragraph}>
        Our services are primarily offered to individuals who are Master's students or F-1 OPT holders. You must provide accurate and complete information during the interest form and intake questionnaire process. Account activation and access to marketing services are subject to **final approval by the HYRIND Admin team.**
      </p>

      <h2 style={styles.sectionTitle}>2. Billing and Payments</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>**Setup Fee:** A **one-time setup charge** is required upon completing the setup payment phase of the onboarding flow. This fee is non-refundable unless otherwise stated in our Refund Policy.</li>
        <li style={styles.listItem}>**Subscription:** You agree to a **recurring monthly subscription fee** which will be charged on your designated 'marketing start date' and subsequently on the same day each month (subject to month-end edge rules).</li>
        <li style={styles.listItem}>**Payment Method:** You must provide a valid payment method (card) for the recurring charges, which will be tokenized and stored securely by our payment aggregator, Xflow.</li>
        <li style={styles.listItem}>**Payment Failure:** If a recurring payment fails, we will follow a defined retry policy (e.g., +1 day, +3 days, +7 days). If persistent failure occurs (e.g., after 3 retries), your status will be set to 'past due', and the marketing of your profile will be **paused** until the account is settled.</li>
      </ul>

      <h2 style={styles.sectionTitle}>3. Use of Resume and Profile</h2>
      <p style={styles.paragraph}>
        The core service involves HYRIND (via Admin) building or refining your professional resume and skills roadmap, and subsequently **marketing your profile monthly** to Recruiters/Operators and external CRM/ATS systems. By agreeing to these Terms, you provide consent for this sharing and marketing activity.
      </p>

      <h2 style={styles.sectionTitle}>4. Termination of Service</h2>
      <p style={styles.paragraph}>
        We reserve the right to suspend or terminate your service and access to the platform for reasons including, but not limited to: material breach of these Terms, failure to make required payments, or providing fraudulent or misleading information. You may cancel your subscription at any time; however, the service will remain active until the next billing date, and no partial refunds will be issued for the current paid month.
      </p>

      <h2 style={styles.sectionTitle}>5. Warranties and Limitation of Liability</h2>
      <p style={styles.paragraph}>
        HYRIND provides its service on an "as-is" basis. We do not guarantee job placement or specific outcomes from the marketing activities. Our liability shall be limited to the fees you have paid to us for the specific month in which the claim arose.
      </p>

    </div>
  );
};

// Export the main component as App as per React file generation mandate
export default TermsConditions;