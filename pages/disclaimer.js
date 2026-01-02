import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Disclaimer() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Disclaimer - PeacePath Kids</title>
      </Head>

      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => router.push('/')} style={styles.backButton}>
            ← Back to Home
          </button>
          <h1 style={styles.title}>Important Disclaimer</h1>
          <p style={styles.subtitle}>Please Read Carefully</p>
        </div>

        <div style={styles.content}>
          
          <div style={styles.warningBox}>
            <h2 style={{margin: 0, color: '#C62828'}}>⚠️ CRITICAL NOTICE</h2>
            <p style={{fontSize: '18px', fontWeight: 'bold', marginTop: '15px'}}>
              PeacePath Kids is NOT a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>

          <section style={styles.section}>
            <h2 style={styles.heading}>Medical Disclaimer</h2>
            <p><strong>PeacePath Kids is NOT:</strong></p>
            <ul style={styles.list}>
              <li>A medical treatment or intervention</li>
              <li>A substitute for therapy (OT, PT, speech, ABA, counseling)</li>
              <li>A diagnostic tool</li>
              <li>Professional medical or therapeutic advice</li>
              <li>A replacement for prescribed medications or treatments</li>
            </ul>

            <p style={{marginTop: '20px'}}><strong>PeacePath Kids IS:</strong></p>
            <ul style={styles.list}>
              <li>An educational resource</li>
              <li>A faith-based activity platform</li>
              <li>A complementary tool alongside professional services</li>
              <li>For enrichment and cognitive engagement</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>Always Consult Professionals</h2>
            <p><strong>ALWAYS seek advice from qualified healthcare providers:</strong></p>
            <ul style={styles.list}>
              <li>Your child's pediatrician</li>
              <li>Licensed therapists (OT, PT, speech, ABA)</li>
              <li>Special education professionals</li>
              <li>Mental health providers</li>
              <li>Medical specialists</li>
            </ul>
          </section>

          <div style={styles.emergencyBox}>
            <h2 style={{margin: 0, color: '#B71C1C'}}>🚨 EMERGENCY</h2>
            <p style={{fontSize: '18px', fontWeight: 'bold', marginTop: '15px'}}>
              If your child is in crisis or you suspect a medical emergency:
            </p>
            <p style={{fontSize: '22px', fontWeight: 'bold', color: '#B71C1C', marginTop: '10px'}}>
              CALL 911 IMMEDIATELY
            </p>
          </div>

          <section style={styles.section}>
            <h2 style={styles.heading}>No Guarantees</h2>
            <p>
              Results may vary significantly. Individual progress depends on many factors including 
              your child's specific needs, consistency of use, and complementary therapies.
            </p>
            <p style={{marginTop: '15px'}}>
              <strong>Building On The Faith Ministry makes NO warranties or guarantees</strong> about 
              the effectiveness of activities for any specific child or condition.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>Faith-Based Content</h2>
            <p>
              PeacePath Kids is rooted in Christian faith and Biblical principles. All activities 
              incorporate Scripture and faith-based values.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>Parental Responsibility</h2>
            <p><strong>Parents and guardians are responsible for:</strong></p>
            <ul style={styles.list}>
              <li>Supervising all use of the app</li>
              <li>Ensuring activities are appropriate and safe</li>
              <li>Monitoring your child's response</li>
              <li>Consulting professionals before making care changes</li>
              <li>Using the app as ONE tool among many resources</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>Copyright & Intellectual Property</h2>
            <div style={styles.copyrightBox}>
              <p style={{fontSize: '18px', fontWeight: 'bold'}}>
                © 2025 Building On The Faith Ministry. All Rights Reserved.
              </p>
              <p style={{marginTop: '15px'}}>
                PeacePath Kids™ is a trademark of Building On The Faith Ministry
              </p>
              <p style={{marginTop: '15px'}}>
                All activities, content, and designs are protected by copyright. 
                You may use activities with your own children for personal, non-commercial use only.
              </p>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>Contact</h2>
            <div style={styles.contactBox}>
              <p><strong>Building On The Faith Ministry</strong></p>
              <p>Website: www.peacepathkids.com</p>
              <p>Email: buildingonthefaithmin@gmail.com</p>
              <p>Location: St. Louis, Missouri, United States</p>
            </div>
          </section>

          <div style={styles.acknowledgment}>
            <h3 style={{marginTop: 0}}>By Using PeacePath Kids, You Acknowledge:</h3>
            <ol style={styles.list}>
              <li>You have read and understood this disclaimer</li>
              <li>This is an educational tool, not medical treatment</li>
              <li>You will consult professionals for medical decisions</li>
              <li>You accept responsibility for supervising your child</li>
              <li>You understand there are no guarantees of results</li>
            </ol>
          </div>

          <div style={styles.effectiveDate}>
            <strong>Effective Date: December 30, 2025</strong>
          </div>

        </div>

        <div style={styles.footer}>
          <p style={styles.copyright}>
            © 2025 Building On The Faith Ministry. All Rights Reserved.
          </p>
          <p style={styles.trademark}>PeacePath Kids™</p>
          <div style={styles.footerLinks}>
            <a href="/terms" style={styles.link}>Terms</a>
            <span style={styles.separator}>|</span>
            <a href="/privacy" style={styles.link}>Privacy</a>
            <span style={styles.separator}>|</span>
            <a href="/disclaimer" style={styles.link}>Disclaimer</a>
            <span style={styles.separator}>|</span>
            <a href="/" style={styles.link}>Home</a>
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
  heading: {
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
  warningBox: {
    background: '#FFEBEE',
    padding: '25px',
    border: '3px solid #C62828',
    borderRadius: '8px',
    marginBottom: '40px',
  },
  emergencyBox: {
    background: '#FFCDD2',
    padding: '25px',
    border: '3px solid #B71C1C',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '40px',
  },
  copyrightBox: {
    background: '#E3F2FD',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #2196F3',
  },
  contactBox: {
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  acknowledgment: {
    background: '#E8F5E9',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #27AE60',
    marginBottom: '40px',
  },
  effectiveDate: {
    background: '#F5F5F5',
    padding: '15px',
    textAlign: 'center',
    borderRadius: '5px',
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
  link: {
    color: '#87CEEB',
    textDecoration: 'none',
    margin: '0 5px',
  },
  separator: {
    color: '#666',
    margin: '0 10px',
  },
};
