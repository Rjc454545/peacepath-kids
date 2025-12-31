import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Privacy Policy - PeacePath Kids</title>
        <meta name="description" content="PeacePath Kids Privacy Policy - COPPA Compliant" />
      </Head>

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <button onClick={() => router.push('/')} style={styles.backButton}>
            ← Back to Home
          </button>
          <h1 style={styles.title}>Privacy Policy</h1>
          <p style={styles.subtitle}>Last Updated: December 30, 2025</p>
        </div>

        {/* Content */}
        <div style={styles.content}>
          
          <section style={styles.section}>
            <p style={styles.intro}>
              Building On The Faith Ministry ("we," "us," "our") operates PeacePath Kids. 
              This Privacy Policy explains how we collect, use, protect, and share your information.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>1. Information We Collect</h2>
            
            <h3 style={styles.subTitle}>1.1 Account Information</h3>
            <ul style={styles.list}>
              <li>Parent/guardian name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Password (encrypted)</li>
              <li>Subscription type</li>
            </ul>

            <h3 style={styles.subTitle}>1.2 Child Information</h3>
            <ul style={styles.list}>
              <li>First name only (no last names stored)</li>
              <li>Age</li>
              <li>Special needs categories (for activity recommendations)</li>
              <li>Activity preferences</li>
            </ul>

            <h3 style={styles.subTitle}>1.3 Usage Data</h3>
            <ul style={styles.list}>
              <li>Activities completed</li>
              <li>Progress tracking data</li>
              <li>Login times</li>
              <li>Device information (for security)</li>
            </ul>

            <h3 style={styles.subTitle}>1.4 Payment Information</h3>
            <ul style={styles.list}>
              <li>Processed securely through Stripe</li>
              <li>We do NOT store credit card numbers</li>
              <li>We store only: subscription status, plan type</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul style={styles.list}>
              <li>Provide and improve the App</li>
              <li>Personalize activity recommendations</li>
              <li>Track progress and achievements</li>
              <li>Process payments</li>
              <li>Send important account updates</li>
              <li>Respond to support requests</li>
              <li>Prevent fraud and abuse</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>3. Information Sharing</h2>
            <div style={styles.highlight}>
              <strong>WE DO NOT SELL YOUR PERSONAL INFORMATION.</strong>
            </div>
            <p>We may share information with:</p>
            <ul style={styles.list}>
              <li><strong>Stripe:</strong> For payment processing</li>
              <li><strong>Firebase (Google Cloud):</strong> For secure data storage</li>
              <li><strong>EmailJS:</strong> For transactional emails only</li>
              <li><strong>Legal authorities:</strong> If required by law</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>4. COPPA Compliance (Children's Privacy)</h2>
            <p>PeacePath Kids complies with the Children's Online Privacy Protection Act (COPPA):</p>
            
            <div style={styles.coppaBox}>
              <h3 style={styles.subTitle}>What We DO:</h3>
              <ul style={styles.list}>
                <li>✅ Collect minimal child information (first name, age, needs)</li>
                <li>✅ Obtain verifiable parental consent</li>
                <li>✅ Give parents full access to view/delete child data</li>
                <li>✅ Protect child information with encryption</li>
                <li>✅ Provide safe, age-appropriate environment</li>
              </ul>

              <h3 style={styles.subTitle}>What We DO NOT Do:</h3>
              <ul style={styles.list}>
                <li>❌ Collect photos, voice recordings, or precise location</li>
                <li>❌ Allow children to post publicly</li>
                <li>❌ Share child data with third parties for marketing</li>
                <li>❌ Use child data for targeted advertising</li>
                <li>❌ Contact children directly</li>
              </ul>
            </div>

            <h3 style={styles.subTitle}>Parental Rights Under COPPA:</h3>
            <ul style={styles.list}>
              <li>Review your child's information</li>
              <li>Request deletion of child data</li>
              <li>Refuse further collection</li>
              <li>Contact us: buildingonthefaithmin@gmail.com</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>5. Data Security</h2>
            <p>We protect your information using:</p>
            <ul style={styles.list}>
              <li>SSL/TLS encryption for data transmission</li>
              <li>Firebase security rules</li>
              <li>Encrypted password storage</li>
              <li>Regular security audits</li>
              <li>Access controls and monitoring</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>6. Data Retention</h2>
            <ul style={styles.list}>
              <li><strong>Active accounts:</strong> Data retained while subscription active</li>
              <li><strong>Cancelled accounts:</strong> Data deleted after 90 days</li>
              <li><strong>Lifetime code users:</strong> Data retained while active</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul style={styles.list}>
              <li>Access your data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt out of marketing emails (transactional emails still sent)</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>8. Cookies & Tracking</h2>
            <p>We use:</p>
            <ul style={styles.list}>
              <li>Essential cookies (for login/security)</li>
              <li>Analytics (Firebase Analytics - anonymized)</li>
              <li>NO third-party advertising cookies</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>9. Third-Party Services</h2>
            <p>Our App uses:</p>
            <ul style={styles.list}>
              <li><strong>Firebase (Google):</strong> Cloud database and authentication</li>
              <li><strong>Stripe:</strong> Payment processing</li>
              <li><strong>EmailJS:</strong> Transactional emails</li>
              <li><strong>Vercel:</strong> Web hosting</li>
            </ul>
            <p>Each has their own privacy policies.</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>10. International Users</h2>
            <p>Our servers are located in the United States. By using the App, you consent to data transfer to the US.</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>11. Changes to Privacy Policy</h2>
            <p>We may update this policy. Users will be notified of material changes via email. Continued use constitutes acceptance.</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>12. Contact Us</h2>
            <div style={styles.contactBox}>
              <p><strong>Questions about privacy?</strong></p>
              <p>Building On The Faith Ministry</p>
              <p>Website: www.peacepathkids.com</p>
              <p>Email: buildingonthefaithmin@gmail.com</p>
              <p>Location: St. Louis, Missouri, United States</p>
            </div>
          </section>

          <section style={styles.section}>
            <div style={styles.effectiveDate}>
              <strong>Effective Date:</strong> December 30, 2025
            </div>
          </section>

        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.copyright}>
            © 2025 Building On The Faith Ministry. All Rights Reserved.
          </p>
          <div style={styles.footerLinks}>
            <a href="/terms" style={styles.footerLink}>Terms of Service</a>
            <span style={styles.separator}>|</span>
            <a href="/privacy" style={styles.footerLink}>Privacy Policy</a>
            <span style={styles.separator}>|</span>
            <a href="/disclaimer" style={styles.footerLink}>Disclaimer</a>
            <span style={styles.separator}>|</span>
            <a href="/" style={styles.footerLink}>Home</a>
          </div>
        </div>

      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  header: {
    background: 'linear-gradient(135deg, #4A90E2 0%, #87CEEB 100%)',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'center',
  },
  backButton: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '36px',
    margin: '0 0 10px 0',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '16px',
    margin: 0,
    opacity: 0.9,
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: 'white',
  },
  intro: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '30px',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '24px',
    color: '#4A90E2',
    marginBottom: '15px',
    borderBottom: '2px solid #4A90E2',
    paddingBottom: '10px',
  },
  subTitle: {
    fontSize: '18px',
    color: '#333',
    marginTop: '20px',
    marginBottom: '10px',
    fontWeight: '600',
  },
  list: {
    lineHeight: '1.8',
    color: '#555',
    marginLeft: '20px',
  },
  highlight: {
    background: '#FFF8E7',
    padding: '15px',
    borderLeft: '4px solid #F5A623',
    marginBottom: '15px',
    fontSize: '16px',
  },
  coppaBox: {
    background: '#E3F2FD',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #4A90E2',
    marginTop: '15px',
    marginBottom: '15px',
  },
  contactBox: {
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  effectiveDate: {
    background: '#F5F5F5',
    padding: '15px',
    textAlign: 'center',
    borderRadius: '5px',
    fontSize: '16px',
  },
  footer: {
    background: '#333',
    color: 'white',
    padding: '30px 20px',
    textAlign: 'center',
  },
  copyright: {
    fontSize: '14px',
    marginBottom: '15px',
  },
  footerLinks: {
    fontSize: '14px',
  },
  footerLink: {
    color: '#87CEEB',
    textDecoration: 'none',
    margin: '0 5px',
  },
  separator: {
    color: '#666',
    margin: '0 10px',
  },
};
