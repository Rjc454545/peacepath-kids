import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { auth, db } from '../lib/firebase';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  addDoc, 
  orderBy,
  limit,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp 
} from 'firebase/firestore';
import { generateFreeCode } from '../utils/helpers';

export default function Admin() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Real data states
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    freeCodesUsed: 0,
    monthlyRevenue: 0
  });
  
  const [users, setUsers] = useState([]);
  const [lifetimeCodes, setLifetimeCodes] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // overview, users, codes, activity
  
  // Code generation
  const [codes, setCodes] = useState([]);
  const [codeQuantity, setCodeQuantity] = useState(100);
  const [generatingCodes, setGeneratingCodes] = useState(false);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'PeacePath2024Admin!') {
      setIsAuthenticated(true);
      setError('');
      loadAllData();
    } else {
      setError('Invalid admin password');
    }
  };

  // Load all data when authenticated
  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadStats(),
        loadUsers(),
        loadLifetimeCodes(),
        loadRecentActivity()
      ]);
    } catch (err) {
      console.error('Error loading data:', err);
    }
    setLoading(false);
  };

  // Load statistics
  const loadStats = async () => {
    try {
      // Get total users
      const usersSnap = await getDocs(collection(db, 'users'));
      const totalUsers = usersSnap.size;

      // Get active subscriptions (users with valid subscription)
      const activeSubsQuery = query(
        collection(db, 'users'),
        where('subscriptionStatus', '==', 'active')
      );
      const activeSubsSnap = await getDocs(activeSubsQuery);
      const activeSubscriptions = activeSubsSnap.size;

      // Get lifetime codes used
      const codesQuery = query(
        collection(db, 'lifetimeCodes'),
        where('redeemed', '==', true)
      );
      const codesSnap = await getDocs(codesQuery);
      const freeCodesUsed = codesSnap.size;

      // Calculate monthly revenue
      // Individual: $6.99, Family: $12.99
      let monthlyRevenue = 0;
      activeSubsSnap.forEach((doc) => {
        const userData = doc.data();
        if (userData.subscriptionPlan === 'individual') {
          monthlyRevenue += 6.99;
        } else if (userData.subscriptionPlan === 'family') {
          monthlyRevenue += 12.99;
        }
      });

      setStats({
        totalUsers,
        activeSubscriptions,
        freeCodesUsed,
        monthlyRevenue: monthlyRevenue.toFixed(2)
      });
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  // Load all users
  const loadUsers = async () => {
    try {
      const usersSnap = await getDocs(collection(db, 'users'));
      const usersData = [];
      usersSnap.forEach((doc) => {
        usersData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      // Sort by signup date (newest first)
      usersData.sort((a, b) => {
        const dateA = a.createdAt?.toDate() || new Date(0);
        const dateB = b.createdAt?.toDate() || new Date(0);
        return dateB - dateA;
      });
      setUsers(usersData);
    } catch (err) {
      console.error('Error loading users:', err);
    }
  };

  // Load lifetime codes
  const loadLifetimeCodes = async () => {
    try {
      const codesSnap = await getDocs(collection(db, 'lifetimeCodes'));
      const codesData = [];
      codesSnap.forEach((doc) => {
        codesData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      // Sort by generated date (newest first)
      codesData.sort((a, b) => {
        const dateA = a.generatedAt?.toDate() || new Date(0);
        const dateB = b.generatedAt?.toDate() || new Date(0);
        return dateB - dateA;
      });
      setLifetimeCodes(codesData);
    } catch (err) {
      console.error('Error loading codes:', err);
    }
  };

  // Load recent activity
  const loadRecentActivity = async () => {
    try {
      const usersQuery = query(
        collection(db, 'users'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      const usersSnap = await getDocs(usersQuery);
      const activity = [];
      usersSnap.forEach((doc) => {
        const userData = doc.data();
        activity.push({
          type: 'signup',
          email: userData.email,
          date: userData.createdAt?.toDate(),
          plan: userData.subscriptionPlan || userData.hasLifetimeAccess ? 'Lifetime' : 'None'
        });
      });
      setRecentActivity(activity);
    } catch (err) {
      console.error('Error loading activity:', err);
    }
  };

  // Generate lifetime codes
  const generateCodes = async () => {
    setGeneratingCodes(true);
    const newCodes = [];
    
    try {
      for (let i = 0; i < codeQuantity; i++) {
        const code = generateFreeCode();
        
        // Save to Firebase
        await addDoc(collection(db, 'lifetimeCodes'), {
          code: code,
          redeemed: false,
          redeemedBy: null,
          redeemedAt: null,
          generatedAt: Timestamp.now()
        });
        
        newCodes.push(code);
      }
      
      setCodes(newCodes);
      alert(`Successfully generated ${codeQuantity} codes!`);
      await loadLifetimeCodes(); // Refresh the codes list
      await loadStats(); // Refresh stats
    } catch (err) {
      console.error('Error generating codes:', err);
      alert('Error generating codes. Please try again.');
    }
    
    setGeneratingCodes(false);
  };

  // Download codes as CSV
  const downloadCodes = () => {
    const csvContent = 'Code,Generated Date,Redeemed,Redeemed By,Redeemed Date\n' +
      lifetimeCodes.map(c => 
        `${c.code},${c.generatedAt?.toDate().toLocaleDateString() || 'N/A'},${c.redeemed ? 'Yes' : 'No'},${c.redeemedBy || 'N/A'},${c.redeemedAt?.toDate().toLocaleDateString() || 'N/A'}`
      ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `peacepath-codes-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Download only unused codes
  const downloadUnusedCodes = () => {
    const unusedCodes = lifetimeCodes.filter(c => !c.redeemed);
    const content = unusedCodes.map(c => c.code).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `peacepath-unused-codes-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
  };

  // Delete user (admin function)
  const deleteUser = async (userId, userEmail) => {
    if (!confirm(`Are you sure you want to delete user: ${userEmail}?`)) return;
    
    try {
      await deleteDoc(doc(db, 'users', userId));
      alert('User deleted successfully');
      await loadUsers();
      await loadStats();
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Error deleting user. Please try again.');
    }
  };

  // Filter users by search term
  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter codes by search term
  const filteredCodes = lifetimeCodes.filter(code =>
    code.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.redeemedBy?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Refresh data
  const refreshData = () => {
    loadAllData();
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <>
        <Head><title>Admin Login - PeacePath Kids</title></Head>
        <div style={styles.loginContainer}>
          <div style={styles.loginCard}>
            <h1 style={styles.title}>🔐 Admin Access</h1>
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

  // Main admin dashboard
  return (
    <>
      <Head><title>Admin Dashboard - PeacePath Kids</title></Head>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>Admin Dashboard</h1>
          <div style={styles.headerActions}>
            <button onClick={refreshData} style={styles.btnRefresh}>
              🔄 Refresh Data
            </button>
            <button onClick={() => router.push('/dashboard')} style={styles.btnSecondary}>
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div style={styles.loadingBanner}>
            Loading data...
          </div>
        )}

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>👥 Total Users</div>
            <div style={styles.statValue}>{stats.totalUsers}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>✅ Active Subscriptions</div>
            <div style={styles.statValue}>{stats.activeSubscriptions}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>🎟️ Codes Redeemed</div>
            <div style={styles.statValue}>{stats.freeCodesUsed}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>💰 Monthly Revenue</div>
            <div style={styles.statValue}>${stats.monthlyRevenue}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={styles.tabContainer}>
          <button
            onClick={() => setActiveTab('overview')}
            style={activeTab === 'overview' ? styles.tabActive : styles.tab}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            style={activeTab === 'users' ? styles.tabActive : styles.tab}
          >
            👥 Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('codes')}
            style={activeTab === 'codes' ? styles.tabActive : styles.tab}
          >
            🎟️ Lifetime Codes ({lifetimeCodes.length})
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            style={activeTab === 'generate' ? styles.tabActive : styles.tab}
          >
            ⚡ Generate Codes
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Recent Activity</h2>
            <div style={styles.activityList}>
              {recentActivity.length === 0 ? (
                <p style={styles.emptyState}>No recent activity</p>
              ) : (
                recentActivity.map((activity, index) => (
                  <div key={index} style={styles.activityItem}>
                    <div style={styles.activityIcon}>👤</div>
                    <div style={styles.activityDetails}>
                      <div style={styles.activityText}>
                        <strong>{activity.email}</strong> signed up
                      </div>
                      <div style={styles.activityMeta}>
                        {activity.date?.toLocaleDateString()} • Plan: {activity.plan}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>All Users</h2>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Plan</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Signed Up</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={styles.emptyState}>No users found</td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} style={styles.tableRow}>
                        <td style={styles.td}>{user.email}</td>
                        <td style={styles.td}>
                          {user.hasLifetimeAccess ? (
                            <span style={styles.badgeLifetime}>Lifetime</span>
                          ) : user.subscriptionPlan === 'individual' ? (
                            <span style={styles.badgeIndividual}>Individual</span>
                          ) : user.subscriptionPlan === 'family' ? (
                            <span style={styles.badgeFamily}>Family</span>
                          ) : (
                            <span style={styles.badgeNone}>None</span>
                          )}
                        </td>
                        <td style={styles.td}>
                          {user.subscriptionStatus === 'active' || user.hasLifetimeAccess ? (
                            <span style={styles.statusActive}>Active</span>
                          ) : (
                            <span style={styles.statusInactive}>Inactive</span>
                          )}
                        </td>
                        <td style={styles.td}>
                          {user.createdAt?.toDate().toLocaleDateString() || 'N/A'}
                        </td>
                        <td style={styles.td}>
                          <button
                            onClick={() => deleteUser(user.id, user.email)}
                            style={styles.btnDelete}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Lifetime Codes Tab */}
        {activeTab === 'codes' && (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Lifetime Access Codes</h2>
              <div style={styles.codeActions}>
                <input
                  type="text"
                  placeholder="Search codes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={styles.searchInput}
                />
                <button onClick={downloadCodes} style={styles.btnSecondary}>
                  📥 Download All (CSV)
                </button>
                <button onClick={downloadUnusedCodes} style={styles.btnPrimary}>
                  📥 Download Unused
                </button>
              </div>
            </div>

            <div style={styles.codeStats}>
              <div style={styles.codeStat}>
                <span style={styles.codeStatLabel}>Total Generated:</span>
                <span style={styles.codeStatValue}>{lifetimeCodes.length}</span>
              </div>
              <div style={styles.codeStat}>
                <span style={styles.codeStatLabel}>Redeemed:</span>
                <span style={styles.codeStatValue}>{lifetimeCodes.filter(c => c.redeemed).length}</span>
              </div>
              <div style={styles.codeStat}>
                <span style={styles.codeStatLabel}>Available:</span>
                <span style={styles.codeStatValue}>{lifetimeCodes.filter(c => !c.redeemed).length}</span>
              </div>
            </div>
            
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.th}>Code</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Redeemed By</th>
                    <th style={styles.th}>Generated Date</th>
                    <th style={styles.th}>Redeemed Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCodes.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={styles.emptyState}>No codes found</td>
                    </tr>
                  ) : (
                    filteredCodes.map((code) => (
                      <tr key={code.id} style={styles.tableRow}>
                        <td style={styles.td}>
                          <code style={styles.codeText}>{code.code}</code>
                        </td>
                        <td style={styles.td}>
                          {code.redeemed ? (
                            <span style={styles.statusRedeemed}>Redeemed</span>
                          ) : (
                            <span style={styles.statusAvailable}>Available</span>
                          )}
                        </td>
                        <td style={styles.td}>{code.redeemedBy || '-'}</td>
                        <td style={styles.td}>
                          {code.generatedAt?.toDate().toLocaleDateString() || 'N/A'}
                        </td>
                        <td style={styles.td}>
                          {code.redeemedAt?.toDate().toLocaleDateString() || '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Generate Codes Tab */}
        {activeTab === 'generate' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Generate Lifetime Access Codes</h2>
            <p style={styles.sectionDesc}>
              Create lifetime access codes for ministry distribution, church partnerships, and promotional campaigns.
            </p>
            
            <div style={styles.generateForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Number of Codes to Generate:</label>
                <select
                  value={codeQuantity}
                  onChange={(e) => setCodeQuantity(Number(e.target.value))}
                  style={styles.select}
                >
                  <option value={10}>10 codes</option>
                  <option value={50}>50 codes</option>
                  <option value={100}>100 codes</option>
                  <option value={250}>250 codes</option>
                  <option value={500}>500 codes</option>
                  <option value={1000}>1,000 codes</option>
                  <option value={2500}>2,500 codes</option>
                  <option value={5000}>5,000 codes</option>
                </select>
              </div>

              <button
                onClick={generateCodes}
                disabled={generatingCodes}
                style={generatingCodes ? styles.btnDisabled : styles.btnPrimary}
              >
                {generatingCodes ? '⏳ Generating...' : `⚡ Generate ${codeQuantity} Codes`}
              </button>

              {codes.length > 0 && (
                <div style={styles.successMessage}>
                  ✅ Successfully generated {codes.length} codes! Check the "Lifetime Codes" tab to view and download them.
                </div>
              )}
            </div>

            <div style={styles.infoBox}>
              <h3 style={styles.infoTitle}>💡 How to Use Generated Codes</h3>
              <ul style={styles.infoList}>
                <li>Go to the "Lifetime Codes" tab to view all generated codes</li>
                <li>Download codes as CSV (all codes) or TXT (unused only)</li>
                <li>Distribute codes to churches, partners, or promotional campaigns</li>
                <li>Users enter codes during signup to get lifetime access</li>
                <li>Track redemptions in real-time in the "Lifetime Codes" tab</li>
              </ul>
            </div>
          </div>
        )}
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
  header: { maxWidth: '1200px', margin: '0 auto 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' },
  pageTitle: { fontSize: '2.5rem', fontWeight: '700', color: '#14171A' },
  headerActions: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  loadingBanner: { maxWidth: '1200px', margin: '0 auto 20px', padding: '16px', backgroundColor: '#4A90E2', color: 'white', textAlign: 'center', borderRadius: '12px', fontWeight: '600' },
  statsGrid: { maxWidth: '1200px', margin: '0 auto 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  statCard: { backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' },
  statLabel: { fontSize: '1rem', color: '#657786', marginBottom: '12px', fontWeight: '600' },
  statValue: { fontSize: '2.5rem', fontWeight: '700', color: '#4A90E2' },
  tabContainer: { maxWidth: '1200px', margin: '0 auto 20px', display: 'flex', gap: '8px', backgroundColor: 'white', padding: '8px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', flexWrap: 'wrap' },
  tab: { flex: 1, padding: '12px 20px', fontSize: '1rem', fontWeight: '600', backgroundColor: 'transparent', color: '#657786', border: 'none', borderRadius: '8px', cursor: 'pointer', minWidth: '150px' },
  tabActive: { flex: 1, padding: '12px 20px', fontSize: '1rem', fontWeight: '700', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', minWidth: '150px' },
  section: { maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' },
  sectionTitle: { fontSize: '1.8rem', fontWeight: '700', color: '#14171A' },
  sectionDesc: { fontSize: '1.1rem', color: '#657786', marginBottom: '24px' },
  searchInput: { padding: '12px 16px', fontSize: '1rem', border: '2px solid #E1E8ED', borderRadius: '8px', minWidth: '250px' },
  codeActions: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  codeStats: { display: 'flex', gap: '32px', marginBottom: '24px', padding: '20px', backgroundColor: '#F5F7FA', borderRadius: '12px', flexWrap: 'wrap' },
  codeStat: { display: 'flex', flexDirection: 'column', gap: '4px' },
  codeStatLabel: { fontSize: '0.9rem', color: '#657786', fontWeight: '600' },
  codeStatValue: { fontSize: '1.8rem', fontWeight: '700', color: '#4A90E2' },
  tableContainer: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#F5F7FA', borderBottom: '2px solid #E1E8ED' },
  th: { padding: '16px', textAlign: 'left', fontSize: '0.9rem', fontWeight: '700', color: '#657786', textTransform: 'uppercase' },
  tableRow: { borderBottom: '1px solid #E1E8ED' },
  td: { padding: '16px', fontSize: '1rem', color: '#14171A' },
  codeText: { padding: '4px 8px', backgroundColor: '#F5F7FA', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem' },
  badgeLifetime: { padding: '4px 12px', backgroundColor: '#FFD700', color: '#14171A', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600' },
  badgeIndividual: { padding: '4px 12px', backgroundColor: '#4A90E2', color: 'white', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600' },
  badgeFamily: { padding: '4px 12px', backgroundColor: '#5CB85C', color: 'white', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600' },
  badgeNone: { padding: '4px 12px', backgroundColor: '#E1E8ED', color: '#657786', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600' },
  statusActive: { color: '#5CB85C', fontWeight: '600' },
  statusInactive: { color: '#D9534F', fontWeight: '600' },
  statusRedeemed: { padding: '4px 12px', backgroundColor: '#D9534F', color: 'white', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600' },
  statusAvailable: { padding: '4px 12px', backgroundColor: '#5CB85C', color: 'white', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600' },
  emptyState: { textAlign: 'center', padding: '40px', color: '#657786', fontSize: '1.1rem' },
  activityList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  activityItem: { display: 'flex', gap: '16px', padding: '16px', backgroundColor: '#F5F7FA', borderRadius: '12px', alignItems: 'center' },
  activityIcon: { fontSize: '2rem', flexShrink: 0 },
  activityDetails: { flex: 1 },
  activityText: { fontSize: '1rem', color: '#14171A', marginBottom: '4px' },
  activityMeta: { fontSize: '0.85rem', color: '#657786' },
  generateForm: { display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '1rem', fontWeight: '600', color: '#14171A' },
  select: { padding: '14px', fontSize: '1rem', border: '2px solid #E1E8ED', borderRadius: '12px', backgroundColor: 'white', cursor: 'pointer' },
  successMessage: { padding: '16px', backgroundColor: '#D4EDDA', color: '#155724', borderRadius: '12px', fontSize: '1rem', fontWeight: '600', border: '2px solid #C3E6CB' },
  infoBox: { marginTop: '32px', padding: '24px', backgroundColor: '#E7F3FF', borderRadius: '12px', border: '2px solid #4A90E2' },
  infoTitle: { fontSize: '1.2rem', fontWeight: '700', color: '#14171A', marginBottom: '12px' },
  infoList: { fontSize: '1rem', color: '#14171A', lineHeight: '1.8', paddingLeft: '20px' },
  btnPrimary: { padding: '14px 32px', fontSize: '1.1rem', fontWeight: '700', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' },
  btnSecondary: { padding: '12px 24px', fontSize: '1rem', fontWeight: '600', backgroundColor: 'white', color: '#4A90E2', border: '2px solid #4A90E2', borderRadius: '12px', cursor: 'pointer' },
  btnRefresh: { padding: '12px 24px', fontSize: '1rem', fontWeight: '600', backgroundColor: '#5CB85C', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' },
  btnDelete: { padding: '8px 16px', fontSize: '0.9rem', fontWeight: '600', backgroundColor: '#D9534F', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  btnDisabled: { padding: '14px 32px', fontSize: '1.1rem', fontWeight: '700', backgroundColor: '#E1E8ED', color: '#657786', border: 'none', borderRadius: '12px', cursor: 'not-allowed' }
};
