import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Terms() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Terms of Service - PeacePath Kids</title>
        <meta name="description" content="Terms of Service for PeacePath Kids" />
      </Head>

      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => router.back()} style={styles.backBtn}>← Back</button>
          <h1 style={styles.title}>Terms of Service</h1>
          <p style={styles.subtitle}>Last Updated: December 2024</p>
        </div>

        <div style={styles.content}>
          <section style={styles.section}>
            <h2 style={styles.h2}>Acceptance of Terms</h2>
            <p style={styles.p}>
              By using PeacePath Kids, you agree to these Terms of Service. If you do not agree, please do not use our service.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Eligibility</h2>
            <ul style={styles.ul}>
              <li>You must be 18 years or older to create an account</li>
              <li>You must be the parent or legal guardian of the child using the app</li>
              <li>The service is designed for children ages 6-16 with special needs</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Subscription and Payment</h2>
            <ul style={styles.ul}>
              <li>7-day free trial available for new users</li>
              <li>Individual Plan: $6.99/month for 1 child</li>
              <li>Family Plan: $12.99/month for up to 4 children</li>
              <li>Subscriptions renew automatically unless canceled</li>
              <li>Refunds available within 7 days of purchase</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Device Restrictions</h2>
            <p style={styles.p}>
              Each subscription is limited to one approved device for security and consistency. Contact support to change devices. Unauthorized device switching may result in account suspension.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>User Conduct</h2>
            <p style={styles.p}>You agree not to:</p>
            <ul style={styles.ul}>
              <li>Share login credentials with others</li>
              <li>Attempt to bypass device restrictions</li>
              <li>Use the service for commercial purposes</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Interfere with the service's operation</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Content Ownership</h2>
            <p style={styles.p}>
              All activities, graphics, and content are owned by Building On The Faith Ministry. Scripture quotations are from the King James Version (KJV), which is in the public domain.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Cancellation</h2>
            <p style={styles.p}>
              You may cancel your subscription at any time from Dashboard → Settings. Access continues until the end of your billing period. No partial refunds for unused time.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Limitation of Liability</h2>
            <p style={styles.p}>
              PeacePath Kids is a supplemental educational resource and is not a substitute for professional therapy, counseling, or medical care. We are not liable for any outcomes from using our activities.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Changes to Terms</h2>
            <p style={styles.p}>
              We may update these terms periodically. Continued use of the service constitutes acceptance of new terms.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Contact</h2>
            <p style={styles.p}>
              Questions? Email buildingonthefaithmin@gmail.com
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
  p: { fontSize: '1.1rem', color: '#657786', lineHeight: '1.7', marginBottom: '12px' },
  ul: { fontSize: '1.05rem', color: '#657786', lineHeight: '1.8', paddingLeft: '24px' }
};
