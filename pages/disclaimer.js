import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Disclaimer() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Disclaimer - PeacePath Kids</title>
        <meta name="description" content="PeacePath Kids App Disclaimer - Medical and Therapeutic Information" />
      </Head>

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <button onClick={() => router.push('/')} style={styles.backButton}>
            ← Back to Home
          </button>
          <h1 style={styles.title}>Important Disclaimer</h1>
          <p style={styles.subtitle}>Please Read Carefully Before Using PeacePath Kids</p>
        </div>

        {/* Content */}
        <div style={styles.content}>
          
          {/* Critical Warning Box */}
          <section style={styles.section}>
            <div style={styles.criticalBox}>
              <h2 style={{marginTop: 0, color: '#C62828'}}>⚠️ CRITICAL INFORMATION</h2>
              <p style={{fontSize: '18px', fontWeight: 'bold'}}>
                PeacePath Kids is NOT a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <p style={{fontSize: '16px'}}>
                By using this app, you acknowledge and agree to the disclaimers below.
              </p>
            </div>
          </section>

          {/* Medical Disclaimer */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>🏥 Medical & Therapeutic Disclaimer</h2>
            
            <div style={styles.notBox}>
              <h3 style={{marginTop: 0}}>PeacePath Kids is NOT:</h3>
              <ul style={styles.list}>
                <li>❌ A medical treatment or intervention</li>
                <li>❌ A substitute for therapy (OT, PT, speech therapy, ABA, counseling)</li>
                <li>❌ A diagnostic tool for any medical or psychological condition</li>
                <li>❌ Professional medical, psychological, or therapeutic advice</li>
                <li>❌ A replacement for prescribed medications or treatments</li>
                <li>❌ An assessment or evaluation tool</li>
              </ul>
            </div>

            <div style={styles.isBox}>
              <h3 style={{marginTop: 0}}>PeacePath Kids IS:</h3>
              <ul style={styles.list}>
                <li>✅ An educational resource</li>
                <li>✅ A faith-based activity platform</li>
                <li>✅ A complementary tool to be used alongside professional services</li>
                <li>✅ Designed to support, NOT replace, medical care</li>
                <li>✅ For enrichment and cognitive engagement</li>
              </ul>
            </div>
          </section>

          {/* Professional Guidance Required */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>🩺 Professional Guidance Required</h2>
            <div style={styles.professionalBox}>
              <h3 style={{marginTop: 0}}>ALWAYS Consult With:</h3>
              <ul style={styles.list}>
                <li><strong>Your child's pediatrician</strong> - for medical concerns and health monitoring</li>
                <li><strong>Licensed therapists</strong> - OT, PT, speech therapy, ABA providers</li>
                <li><strong>Special education professionals</strong> - IEP teams, special ed teachers</li>
                <li><strong>Mental health providers</strong> - psychologists, counselors, psychiatrists</li>
                <li><strong>Medical specialists</strong> - neurologists, developmental pediatricians, etc.</li>
              </ul>
            </div>
          </section>

          {/* What NOT to Do */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>🚫 DO NOT:</h2>
            <div style={styles.warningBox}>
              <ul style={styles.list}>
                <li><strong>DO NOT</strong> stop prescribed medications or therapies based on app use</li>
                <li><strong>DO NOT</strong> delay professional evaluation or diagnosis</li>
                <li><strong>DO NOT</strong> use instead of medical treatment or professional therapy</li>
                <li><strong>DO NOT</strong> ignore warning signs, regression, or behavioral changes</li>
                <li><strong>DO NOT</strong> rely solely on this app for your child's development</li>
                <li><strong>DO NOT</strong> disregard medical advice based on app content</li>
              </ul>
            </div>
          </section>

          {/* Emergency Warning */}
          <section style={styles.section}>
            <div style={styles.emergencyBox}>
              <h2 style={{marginTop: 0, color: '#B71C1C'}}>🚨 EMERGENCY WARNING</h2>
              <p style={{fontSize: '18px', fontWeight: 'bold'}}>
                If your child is in crisis or you suspect a medical emergency:
              </p>
              <p style={{fontSize: '20px', fontWeight: 'bold', color: '#B71C1C'}}>
                CALL 911 OR SEEK IMMEDIATE PROFESSIONAL HELP
              </p>
              <p style={{fontSize: '16px'}}>
                Do NOT wait. Do NOT use this app instead of emergency services.
              </p>
            </div>
          </section>

          {/* No Guarantees */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>📊 No Guarantees of Results</h2>
            <p>
              The activities provided are educational and faith-based in nature. 
              <strong> Results may vary significantly.</strong>
            </p>
            <div style={styles.resultsBox}>
              <h3 style={{marginTop: 0}}>Individual Progress Depends On:</h3>
              <ul style={styles.list}>
                <li>Your child's specific needs and diagnoses</li>
                <li>Consistency of use and parental involvement</li>
                <li>Complementary therapies and interventions</li>
                <li>Age, developmental level, and readiness</li>
                <li>Environmental factors and support systems</li>
                <li>Professional services your child receives</li>
              </ul>
            </div>
            <p>
              <strong>Building On The Faith Ministry and PeacePath Kids make NO warranties or guarantees</strong> 
              about the effectiveness of activities for any specific child, condition, or outcome.
            </p>
          </section>

          {/* Faith-Based Content */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>✝️ Faith-Based Educational Content</h2>
            <div style={styles.faithBox}>
              <p>
                PeacePath Kids is rooted in Christian faith and Biblical principles. 
                All activities incorporate Scripture and faith-based values.
              </p>
              <h3 style={{marginTop: '15px'}}>What to Expect:</h3>
              <ul style={styles.list}>
                <li>Activities incorporate Scripture memory and Biblical concepts</li>
                <li>Faith-based encouragement and Christian values</li>
                <li>Christian worldview reflected in content</li>
                <li>References to God, Jesus, prayer, and Biblical teachings</li>
              </ul>
              <p style={{marginTop: '15px'}}>
                <strong>Religious Freedom:</strong> Use is voluntary. There is no requirement to participate 
                in faith elements. We respect all families while providing Christian-based resources.
              </p>
            </div>
          </section>

          {/* Parental Responsibility */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>👨‍👩‍👧 Parental Responsibility</h2>
            <div style={styles.parentBox}>
              <p><strong>Parents and guardians are responsible for:</strong></p>
              <ul style={styles.list}>
                <li>Supervising all use of the app and activities</li>
                <li>Ensuring activities are age-appropriate and safe</li>
                <li>Monitoring your child's response to activities</li>
                <li>Consulting professionals before making changes to care</li>
                <li>Making informed decisions about your child's education and therapy</li>
                <li>Using the app as ONE tool among many resources</li>
              </ul>
            </div>
          </section>

          {/* Copyright & Ownership */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>© Copyright & Intellectual Property</h2>
            <div style={styles.copyrightBox}>
              <p style={{fontSize: '18px', fontWeight: 'bold'}}>
                © 2025 Building On The Faith Ministry. All Rights Reserved.
              </p>
              <h3>Protected Content:</h3>
              <ul style={styles.list}>
                <li>All 475 activities and their descriptions</li>
                <li>Logo, branding, and design elements (PeacePath Kids™)</li>
                <li>App interface and user experience</li>
                <li>Original content, compilations, and selections</li>
              </ul>
              <h3 style={{marginTop: '15px'}}>You MAY:</h3>
              <ul style={styles.list}>
                <li>✅ Use activities with your own children/students (personal use)</li>
                <li>✅ Print activities for personal, non-commercial use</li>
              </ul>
              <h3 style={{marginTop: '15px'}}>You MAY NOT:</h3>
              <ul style={styles.list}>
                <li>❌ Copy, reproduce, or redistribute activities</li>
                <li>❌ Create derivative works</li>
                <li>❌ Use for commercial purposes without written permission</li>
                <li>❌ Remove copyright notices or attribution</li>
              </ul>
            </div>
          </section>

          {/* COPPA Compliance */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>👶 COPPA Compliance (Children's Privacy)</h2>
            <div style={styles.coppaBox}>
              <p><strong>PeacePath Kids is compliant with the Children's Online Privacy Protection Act (COPPA).</strong></p>
              <h3 style={{marginTop: '15px'}}>We:</h3>
              <ul style={styles.list}>
                <li>✅ Collect minimal child information</li>
                <li>✅ Obtain verifiable parental consent</li>
                <li>✅ Give parents full control over child data</li>
                <li>✅ Do NOT collect photos, videos, or precise location</li>
                <li>✅ Do NOT allow children to post publicly</li>
                <li>✅ Do NOT share child data for marketing</li>
              </ul>
              <p style={{marginTop: '15px'}}>
                Parents can review, modify, or delete child information at any time through the dashboard.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>⚖️ Limitation of Liability</h2>
            <div style={styles.liabilityBox}>
              <p>
                <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
              </p>
              <p>
                Building On The Faith Ministry, its officers, directors, employees, volunteers, and affiliates 
                SHALL NOT BE LIABLE for any:
              </p>
              <ul style={styles.list}>
                <li>Direct, indirect, incidental, special, or consequential damages</li>
                <li>Medical, therapeutic, or developmental outcomes</li>
                <li>Loss of data, time, or opportunities</li>
                <li>Reliance on app content or activities</li>
                <li>Damages exceeding the amount paid for the service</li>
              </ul>
              <p style={{marginTop: '15px'}}>
                <strong>You use this app at your own risk</strong> and agree to hold harmless Building On The Faith Ministry 
                for any outcomes related to use of PeacePath Kids.
              </p>
            </div>
          </section>

          {/* Changes to Disclaimer */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>📝 Changes to This Disclaimer</h2>
            <p>
              We may update this disclaimer at any time. Continued use of the app after changes constitutes 
              acceptance of the updated disclaimer. Users will be notified of material changes via email.
            </p>
          </section>

          {/* Contact */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>📞 Questions or Concerns</h2>
            <div style={styles.contactBox}>
              <p><strong>Contact Us:</strong></p>
              <p>Building On The Faith Ministry</p>
              <p>Website: www.peacepathkids.com</p>
              <p>Email: buildingonthefaithmin@gmail.com</p>
              <p>Location: St. Louis, Missouri, United States</p>
            </div>
          </section>

          {/* Final Acknowledgment */}
          <section style={styles.section}>
            <div style={styles.acknowledgmentBox}>
              <h3 style={{marginTop: 0}}>✅ By Using PeacePath Kids, You Acknowledge:</h3>
              <ol style={styles.list}>
                <li>You have read and understood this disclaimer</li>
                <li>You agree this is an educational tool, not medical treatment</li>
                <li>You will consult professionals for medical/therapeutic decisions</li>
                <li>You accept full responsibility for supervising your child's use</li>
                <li>You understand there are no guarantees of results</li>
                <li>You agree to the limitations of liability stated above</li>
              </ol>
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
    background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)',
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
    color: '#E74C3C',
    marginBottom: '15px',
    borderBottom: '2px solid #E74C3C',
    paddingBottom: '10px',
  },
  list: {
    lineHeight: '1.8',
    color: '#555',
    marginLeft: '20px',
  },
  criticalBox: {
    background: '#FFEBEE',
    padding: '25px',
    border: '3px solid #C62828',
    borderRadius: '8px',
    textAlign: 'center',
  },
  notBox: {
    background: '#FFEBEE',
    padding: '20px',
    borderLeft: '4px solid #E74C3C',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  isBox: {
    background: '#E8F5E9',
    padding: '20px',
    borderLeft: '4px solid #27AE60',
    borderRadius: '5px',
  },
  professionalBox: {
    background: '#E3F2FD',
    padding: '20px',
    border: '2px solid #2196F3',
    borderRadius: '8px',
  },
  warningBox: {
    background: '#FFF3E0',
    padding: '20px',
    borderLeft: '4px solid #FF9800',
    borderRadius: '5px',
  },
  emergencyBox: {
    background: '#FFCDD2',
    padding: '25px',
    border: '3px solid #B71C1C',
    borderRadius: '8px',
    textAlign: 'center',
  },
  resultsBox: {
    background: '#F3E5F5',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #9C27B0',
  },
  faithBox: {
    background: '#FFF8E7',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #F5A623',
  },
  parentBox: {
    background: '#E8F5E9',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #4CAF50',
  },
  copyrightBox: {
    background: '#E3F2FD',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #2196F3',
  },
  coppaBox: {
    background: '#FFF3E0',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #FF9800',
  },
  liabilityBox: {
    background: '#F5F5F5',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #757575',
  },
  contactBox: {
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  acknowledgmentBox: {
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
    opacity: 0.8',
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
