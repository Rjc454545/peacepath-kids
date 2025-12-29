import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { generateFreeCode } from '../utils/helpers';

export default function Admin() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [codes, setCodes] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'PeacePath2024Admin!') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid admin password');
    }
  };

  const generateCodes = () => {
    const newCodes = [];
    for (let i = 0; i < 2500; i++) {
      newCodes.push(generateFreeCode());
    }
    setCodes(newCodes);
  };

  const downloadCodes = () => {
    const blob = new Blob([codes.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'peacepath-codes-2500.txt';
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <>
        <Head><title>Admin Login - PeacePath Kids</title></Head>
        <div style={styles.loginContainer}>
          <div style={styles.loginCard}>
            <h1 style={styles.title}>🔒 Admin Access</h1>
            <form onSubmit={handleLogin} style={styles.form}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                style={styles.input}
              />
              {error && <p style={styles.error}>{error}</p>}
              <button type="submit" style={styles.btnPrimary}>Login</button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head><title>Admin Dashboard - PeacePath Kids</title></Head>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>Admin Dashboard</h1>
          <button onClick={() => router.push('/dashboard')} style={styles.btnSecondary}>
            Back to Dashboard
          </button>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total Users</div>
            <div style={styles.statValue}>1,247</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Active Subscriptions</div>
            <div style={styles.statValue}>892</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Free Codes Used</div>
            <div style={styles.statValue}>1,523</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Monthly Revenue</div>
            <div style={styles.statValue}>$8,451</div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Generate Free Codes</h2>
          <p style={styles.sectionDesc}>Create 2,500 free access codes for ministry distribution</p>
          <div style={styles.codeActions}>
            <button onClick={generateCodes} style={styles.btnPrimary}>
              Generate 2,500 Codes
            </button>
            {codes.length > 0 && (
              <button onClick={downloadCodes} style={styles.btnSuccess}>
                Download Codes ({codes.length})
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  loginContainer: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F7FA' },
  loginCard: { backgroundColor: 'white', padding: '48px', borderRadius: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' },
  title: { fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '32px', color: '#14171A' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  input: { padding: '14px', fontSize: '1rem', border: '2px solid #E1E8ED', borderRadius: '12px' },
  error: { color: '#D9534F', fontSize: '0.9rem', textAlign: 'center' },
  container: { minHeight: '100vh', backgroundColor: '#F5F7FA', padding: '40px 20px' },
  header: { maxWidth: '1200px', margin: '0 auto 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pageTitle: { fontSize: '2.5rem', fontWeight: '700', color: '#14171A' },
  statsGrid: { maxWidth: '1200px', margin: '0 auto 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  statCard: { backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' },
  statLabel: { fontSize: '1rem', color: '#657786', marginBottom: '12px', fontWeight: '600' },
  statValue: { fontSize: '2.5rem', fontWeight: '700', color: '#4A90E2' },
  section: { maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  sectionTitle: { fontSize: '1.8rem', fontWeight: '700', color: '#14171A', marginBottom: '12px' },
  sectionDesc: { fontSize: '1.1rem', color: '#657786', marginBottom: '24px' },
  codeActions: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  btnPrimary: { padding: '14px 32px', fontSize: '1.1rem', fontWeight: '700', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' },
  btnSecondary: { padding: '12px 24px', fontSize: '1rem', fontWeight: '600', backgroundColor: 'white', color: '#4A90E2', border: '2px solid #4A90E2', borderRadius: '12px', cursor: 'pointer' },
  btnSuccess: { padding: '14px 32px', fontSize: '1.1rem', fontWeight: '700', backgroundColor: '#5CB85C', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }
};
