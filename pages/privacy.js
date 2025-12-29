import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Privacy() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Privacy Policy - PeacePath Kids</title>
        <meta name="description" content="Our commitment to protecting your child's privacy" />
      </Head>

      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => router.back()} style={styles.backBtn}>← Back</button>
          <h1 style={styles.title}>Privacy Policy</h1>
          <p style={styles.subtitle}>Last Updated: December 2024</p>
        </div>

        <div style={styles.content}>
          <section style={styles.section}>
            <h2 style={styles.h2}>Our Commitment to Privacy</h2>
            <p style={styles.p}>
              At PeacePath Kids, we take your family's privacy seriously. We comply with COPPA (Children's Online Privacy Protection Act) and GDPR to ensure your child's information is protected.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Information We Collect</h2>
            <h3 style={styles.h3}>From Parents/Guardians:</h3>
            <ul style={styles.ul}>
              <li>Email address and name</li>
              <li>Payment information (processed securely via Stripe)</li>
              <li>Survey responses about child's needs and preferences</li>
            </ul>
            <h3 style={styles.h3}>From Children:</h3>
            <ul style={styles.ul}>
              <li>First name only (never full name)</li>
              <li>Age and general information from parent survey</li>
              <li>Activity progress and completion data</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>How We Use Information</h2>
            <ul style={styles.ul}>
              <li>Personalize activities to your child's needs</li>
              <li>Track progress and provide recommendations</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send important updates about the service</li>
              <li>Improve our app and activities</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>COPPA Compliance</h2>
            <p style={styles.p}>
              We fully comply with the Children's Online Privacy Protection Act (COPPA). We require verifiable parental consent before collecting any information about children under 13. Parents can review, update, or delete their child's information at any time through the dashboard.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Data Security</h2>
            <ul style={styles.ul}>
              <li>All data encrypted in transit and at rest</li>
              <li>Secure Firebase cloud storage</li>
              <li>One-device enforcement prevents unauthorized access</li>
              <li>Regular security audits and updates</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Your Rights</h2>
            <ul style={styles.ul}>
              <li>Access your child's data anytime</li>
              <li>Request data export (Dashboard → Settings)</li>
              <li>Delete account and all data permanently</li>
              <li>Opt out of marketing emails</li>
              <li>Request corrections to information</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Third-Party Services</h2>
            <p style={styles.p}>
              We use trusted services: Firebase (database), Stripe (payments), EmailJS (communications). All comply with privacy regulations and never access your child's data.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Contact Us</h2>
            <p style={styles.p}>
              Questions about privacy? Email us at buildingonthefaithmin@gmail.com
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#F5F7FA', padding: '40px 20px' },
  header: { maxWidth: '800px', margin: '0 auto 40px', textAlign: 'center' },
  backBtn: { padding: '8px 16px', fontSize: '1rem', backgroundColor: 'white', border: '2px solid #E1E8ED', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px' },
  title: { fontSize: '3rem', fontWeight: '700', color: '#14171A', marginBottom: '12px' },
  subtitle: { fontSize: '1.1rem', color: '#657786' },
  content: { maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '48px', borderRadius: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  section: { marginBottom: '32px' },
  h2: { fontSize: '1.8rem', fontWeight: '700', color: '#14171A', marginBottom: '16px' },
  h3: { fontSize: '1.3rem', fontWeight: '600', color: '#14171A', marginTop: '16px', marginBottom: '12px' },
  p: { fontSize: '1.1rem', color: '#657786', lineHeight: '1.7', marginBottom: '12px' },
  ul: { fontSize: '1.05rem', color: '#657786', lineHeight: '1.8', paddingLeft: '24px' }
};
