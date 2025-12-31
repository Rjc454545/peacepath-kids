import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function TermsOfService() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Terms of Service - PeacePath Kids</title>
        <meta name="description" content="PeacePath Kids Terms of Service" />
      </Head>

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <button onClick={() => router.push('/')} style={styles.backButton}>
            ← Back to Home
          </button>
          <h1 style={styles.title}>Terms of Service</h1>
          <p style={styles.subtitle}>Last Updated: December 30, 2025</p>
        </div>

        {/* Content */}
        <div style={styles.content}>
          
          <section style={styles.section}>
            <div style={styles.importantBox}>
              <h3 style={{marginTop: 0}}>⚠️ IMPORTANT - PLEASE READ CAREFULLY</h3>
              <p>
                By accessing and using PeacePath Kids, you accept and agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use the App.
              </p>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>1. Acceptance of Terms</h2>
            <p>
              By accessing and using PeacePath Kids ("the App"), you accept and agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use the App.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>2. Description of Service</h2>
            <p>
              PeacePath Kids is a subscription-based platform providing faith-based cognitive wellness activities 
              for children with special needs, including but not limited to autism, ADHD, sensory processing disorders, 
              anxiety, and learning differences.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>3. User Accounts</h2>
            
            <h3 style={styles.subTitle}>3.1 Account Creation</h3>
            <ul style={styles.list}>
              <li>You must be at least 18 years old to create an account</li>
              <li>You must provide accurate, complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>One account may be used by immediate family members only</li>
            </ul>

            <h3 style={styles.subTitle}>3.2 Parental Responsibility</h3>
            <ul style={styles.list}>
              <li>Parents/guardians are responsible for all use of the account</li>
              <li>Parents must supervise children's use of activities</li>
              <li>Parents acknowledge this is an educational tool, not therapy</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>4. Subscription & Payments</h2>
            
            <h3 style={styles.subTitle}>4.1 Plans Available</h3>
            <ul style={styles.list}>
              <li><strong>Individual Plan:</strong> $6.99/month (1 child profile)</li>
              <li><strong>Family Plan:</strong> $12.99/month (up to 4 child profiles)</li>
              <li><strong>Lifetime Access Codes:</strong> Available through ministry partnerships</li>
            </ul>

            <h3 style={styles.subTitle}>4.2 Billing</h3>
            <ul style={styles.list}>
              <li>Subscriptions renew automatically monthly</li>
              <li>Payments processed through Stripe</li>
              <li>Cancel anytime through your dashboard</li>
              <li>No refunds for partial months</li>
            </ul>

            <h3 style={styles.subTitle}>4.3 Lifetime Codes</h3>
            <ul style={styles.list}>
              <li>Provided for ministry outreach purposes</li>
              <li>Non-transferable</li>
              <li>May be revoked for misuse</li>
              <li>Not redeemable for cash value</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>5. User Conduct</h2>
            <p><strong>You agree NOT to:</strong></p>
            <ul style={styles.list}>
              <li>❌ Share your account with non-family members</li>
              <li>❌ Use the App for any illegal purpose</li>
              <li>❌ Attempt to hack, reverse engineer, or compromise the App</li>
              <li>❌ Upload inappropriate content</li>
              <li>❌ Harass other users or staff</li>
              <li>❌ Copy, distribute, or reproduce App content</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>6. Intellectual Property</h2>
            
            <h3 style={styles.subTitle}>6.1 Ownership</h3>
            <div style={styles.copyrightBox}>
              <p><strong>© 2025 Building On The Faith Ministry. All Rights Reserved.</strong></p>
              <ul style={styles.list}>
                <li>All content, activities, designs are owned by Building On The Faith Ministry</li>
                <li>Scripture passages are from public domain or licensed sources</li>
                <li>You may not copy, distribute, or reproduce App content without permission</li>
              </ul>
            </div>

            <h3 style={styles.subTitle}>6.2 User Content</h3>
            <ul style={styles.list}>
              <li>You retain ownership of any progress data or notes</li>
              <li>We may use anonymized data for improvement purposes</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>7. Privacy & Data</h2>
            <p>
              Please review our <a href="/privacy" style={styles.link}>Privacy Policy</a> for details on how we 
              collect, use, and protect your information.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>8. Disclaimers & Limitations of Liability</h2>
            
            <div style={styles.warningBox}>
              <h3 style={{marginTop: 0}}>⚠️ IMPORTANT DISCLAIMERS</h3>
              <p><strong>THE APP IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.</strong></p>
              <p>WE DO NOT GUARANTEE:</p>
              <ul style={styles.list}>
                <li>Specific results or improvements</li>
                <li>Uninterrupted or error-free service</li>
                <li>That activities will meet your child's specific needs</li>
                <li>Medical or therapeutic outcomes</li>
              </ul>
            </div>

            <p style={{marginTop: '20px'}}>
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, BUILDING ON THE FAITH MINISTRY SHALL NOT BE LIABLE FOR:</strong>
            </p>
            <ul style={styles.list}>
              <li>Any indirect, incidental, special, or consequential damages</li>
              <li>Loss of data or profits</li>
              <li>Damages exceeding the amount paid for the service</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>9. Medical Disclaimer</h2>
            <div style={styles.medicalBox}>
              <h3 style={{marginTop: 0}}>🏥 CRITICAL MEDICAL DISCLAIMER</h3>
              <p>
                <strong>PeacePath Kids is NOT a substitute for professional medical advice, diagnosis, or treatment.</strong>
              </p>
              <p><strong>ALWAYS seek the advice of qualified healthcare providers</strong> with questions regarding your child's:</p>
              <ul style={styles.list}>
                <li>Medical condition</li>
                <li>Therapy or treatment plan</li>
                <li>Medications</li>
                <li>Behavioral concerns</li>
              </ul>
              <p><strong>NEVER disregard professional medical advice or delay seeking it</strong> because of something you read or experienced through PeacePath Kids.</p>
              <p><strong>If you think your child may have a medical emergency, call your doctor or 911 immediately.</strong></p>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Building On The Faith Ministry, its officers, directors, 
              employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) 
              arising from your use of the App or violation of these terms.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>11. Termination</h2>
            <p>
              We may suspend or terminate your account if you violate these terms. Upon termination, 
              your access to paid features ceases immediately. You may delete your account at any time 
              through your dashboard.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>12. Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Continued use after changes constitutes acceptance. 
              We will notify users of material changes via email.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>13. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Missouri, United States. 
              Any disputes will be resolved in St. Louis County courts.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>14. Contact</h2>
            <div style={styles.contactBox}>
              <p><strong>For questions about these Terms:</strong></p>
              <p>Building On The Faith Ministry</p>
              <p>Website: www.peacepathkids.com</p>
              <p>Email: buildingonthefaithmin@gmail.com</p>
              <p>Location: St. Louis, Missouri, United States</p>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>15. Severability</h2>
            <p>
              If any provision is found invalid, the remaining provisions remain in effect.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>16. Entire Agreement</h2>
            <p>
              These Terms constitute the entire agreement between you and Building On The Faith Ministry 
              regarding use of PeacePath Kids.
            </p>
          </section>

          <section style={styles.section}>
            <div style={styles.acceptanceBox}>
              <h3 style={{marginTop: 0}}>✅ Acceptance</h3>
              <p>
                <strong>By creating an account, you acknowledge that you have read, understood, and agree to 
                be bound by these Terms of Service.</strong>
              </p>
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
          <p style={styles.trademark}>
            PeacePath Kids™ is a trademark of Building On The Faith Ministry
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
  importantBox: {
    background: '#FFF3CD',
    padding: '20px',
    borderLeft: '4px solid #F5A623',
    borderRadius: '5px',
  },
  copyrightBox: {
    background: '#E3F2FD',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #4A90E2',
    marginTop: '15px',
    marginBottom: '15px',
  },
  warningBox: {
    background: '#FFEBEE',
    padding: '20px',
    borderLeft: '4px solid #E74C3C',
    borderRadius: '5px',
  },
  medicalBox: {
    background: '#FFF8E7',
    padding: '20px',
    border: '2px solid #F5A623',
    borderRadius: '8px',
  },
  contactBox: {
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  acceptanceBox: {
    background: '#E8F5E9',
    padding: '20px',
    borderLeft: '4px solid #27AE60',
    borderRadius: '5px',
  },
  effectiveDate: {
    background: '#F5F5F5',
    padding: '15px',
    textAlign: 'center',
    borderRadius: '5px',
    fontSize: '16px',
  },
  link: {
    color: '#4A90E2',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  footer: {
    background: '#333',
    color: 'white',
    padding: '30px 20px',
    textAlign: 'center',
  },
  copyright: {
    fontSize: '14px',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  trademark: {
    fontSize: '12px',
    marginBottom: '15px',
    opacity: 0.8,
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
