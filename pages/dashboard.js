import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { auth, db } from '../lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { onFirstActivityComplete, on7DayStreak, on30Activities, on50Activities, on100Activities } from '../utils/emailAutomation';
export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [children, setChildren] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        router.push('/login');
        return;
      }

      setUser(currentUser);
      await loadUserData(currentUser.uid);
      await loadChildren(currentUser.uid);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const loadUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadChildren = async (userId) => {
    try {
      const childrenRef = collection(db, 'users', userId, 'children');
      const snapshot = await getDocs(childrenRef);
      const childrenData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChildren(childrenData);
    } catch (error) {
      console.error('Error loading children:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const renderOverview = () => (
    <div>
      <h2 style={styles.tabTitle}>Dashboard Overview</h2>
      
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👶</div>
          <div style={styles.statNumber}>{children.length}</div>
          <div style={styles.statLabel}>Active Children</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>✅</div>
          <div style={styles.statNumber}>47</div>
          <div style={styles.statLabel}>Activities Completed</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📅</div>
          <div style={styles.statNumber}>12</div>
          <div style={styles.statLabel}>Days Active</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⭐</div>
          <div style={styles.statNumber}>95%</div>
          <div style={styles.statLabel}>Completion Rate</div>
        </div>
      </div>

      <div style={styles.childrenSection}>
        <h3 style={styles.sectionTitle}>Your Children</h3>
        {children.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No children profiles yet. Complete the survey to add your first child!</p>
            <button onClick={() => router.push('/survey')} style={styles.btnPrimary}>
              Add Child Profile
            </button>
          </div>
        ) : (
          <div style={styles.childrenGrid}>
            {children.map(child => (
              <div key={child.id} style={styles.childCard}>
                <div style={styles.childAvatar}>{child.name[0]}</div>
                <h4 style={styles.childName}>{child.name}</h4>
                <p style={styles.childInfo}>{child.age} years old</p>
                <p style={styles.childInfo}>{child.gender}</p>
                <button style={styles.btnSecondary}>View Progress</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div>
      <h2 style={styles.tabTitle}>Profile & Settings</h2>
      <div style={styles.profileSection}>
        <div style={styles.profileCard}>
          <h3 style={styles.cardTitle}>Account Information</h3>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Email:</span>
            <span style={styles.infoValue}>{user?.email}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Parent Name:</span>
            <span style={styles.infoValue}>{userData?.parentName || 'Not set'}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>User Code:</span>
            <span style={styles.infoValue}>{userData?.userCode || 'N/A'}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Member Since:</span>
            <span style={styles.infoValue}>
              {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Unknown'}
            </span>
          </div>
        </div>

        <div style={styles.profileCard}>
          <h3 style={styles.cardTitle}>Subscription</h3>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Plan:</span>
            <span style={styles.infoValue}>
              {userData?.subscriptionStatus === 'trial' ? 'Free Trial' : 'Individual'}
            </span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Status:</span>
            <span style={{...styles.infoValue, color: '#5CB85C'}}>Active</span>
          </div>
          {userData?.subscriptionStatus === 'trial' && (
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Trial Ends:</span>
              <span style={styles.infoValue}>
                {userData?.trialEndsAt ? new Date(userData.trialEndsAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          )}
          <button style={styles.btnSecondary}>Manage Subscription</button>
        </div>
      </div>
    </div>
  );

  const renderActivities = () => (
    <div>
      <h2 style={styles.tabTitle}>Recent Activities</h2>
      <div style={styles.activityList}>
        {[
          { name: 'The Good Samaritan', category: 'Bible Stories', date: 'Today', score: 100 },
          { name: 'Psalm 23', category: 'Memory Verses', date: 'Yesterday', score: 95 },
          { name: 'Morning Prayer', category: 'Prayer Time', date: '2 days ago', score: 100 },
          { name: 'Creation Art', category: 'Art & Creativity', date: '3 days ago', score: 88 }
        ].map((activity, idx) => (
          <div key={idx} style={styles.activityItem}>
            <div style={styles.activityInfo}>
              <h4 style={styles.activityName}>{activity.name}</h4>
              <p style={styles.activityMeta}>{activity.category} • {activity.date}</p>
            </div>
            <div style={styles.activityScore}>
              <div style={styles.scoreCircle}>{activity.score}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Dashboard - PeacePath Kids</title>
      </Head>

      <div style={styles.container}>
        <nav style={styles.nav}>
          <div style={styles.navBrand}>
            <span style={styles.navLogo}>🕊️💝✝️</span>
            <span style={styles.navTitle}>PeacePath Kids</span>
          </div>
          <div style={styles.navLinks}>
            <button onClick={() => router.push('/welcome')} style={styles.navLink}>Help</button>
            <button onClick={handleLogout} style={styles.navLink}>Logout</button>
          </div>
        </nav>

        <div style={styles.dashboardContainer}>
          <div style={styles.sidebar}>
            <button
              onClick={() => setActiveTab('overview')}
              style={activeTab === 'overview' ? styles.sidebarBtnActive : styles.sidebarBtn}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab('children')}
              style={activeTab === 'children' ? styles.sidebarBtnActive : styles.sidebarBtn}
            >
              👶 Children
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              style={activeTab === 'activities' ? styles.sidebarBtnActive : styles.sidebarBtn}
            >
              📚 Activities
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              style={activeTab === 'profile' ? styles.sidebarBtnActive : styles.sidebarBtn}
            >
              ⚙️ Settings
            </button>
          </div>

          <div style={styles.mainContent}>
            <div style={styles.welcomeBar}>
              <h1 style={styles.welcomeTitle}>Welcome back, {userData?.parentName || 'Parent'}!</h1>
              <p style={styles.welcomeSubtitle}>Here's what's happening with your children's activities</p>
            </div>

            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'activities' && renderActivities()}
            {activeTab === 'children' && renderOverview()}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#F5F7FA' },
  loadingContainer: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F7FA' },
  spinner: { width: '50px', height: '50px', border: '5px solid #E1E8ED', borderTop: '5px solid #4A90E2', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '20px' },
  nav: { backgroundColor: 'white', padding: '16px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  navBrand: { display: 'flex', alignItems: 'center', gap: '12px' },
  navLogo: { fontSize: '1.8rem' },
  navTitle: { fontSize: '1.5rem', fontWeight: '700', color: '#4A90E2' },
  navLinks: { display: 'flex', gap: '16px' },
  navLink: { background: 'none', border: 'none', padding: '8px 16px', fontSize: '1rem', fontWeight: '600', color: '#657786', cursor: 'pointer' },
  dashboardContainer: { display: 'flex', maxWidth: '1400px', margin: '0 auto', padding: '24px', gap: '24px' },
  sidebar: { width: '250px', backgroundColor: 'white', borderRadius: '16px', padding: '24px', height: 'fit-content', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  sidebarBtn: { width: '100%', padding: '14px', marginBottom: '8px', fontSize: '1rem', fontWeight: '600', backgroundColor: 'transparent', color: '#657786', border: 'none', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s ease' },
  sidebarBtnActive: { width: '100%', padding: '14px', marginBottom: '8px', fontSize: '1rem', fontWeight: '700', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', textAlign: 'left' },
  mainContent: { flex: 1, backgroundColor: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  welcomeBar: { marginBottom: '32px', paddingBottom: '24px', borderBottom: '2px solid #E1E8ED' },
  welcomeTitle: { fontSize: '2rem', fontWeight: '700', color: '#14171A', marginBottom: '8px' },
  welcomeSubtitle: { fontSize: '1.1rem', color: '#657786' },
  tabTitle: { fontSize: '1.8rem', fontWeight: '700', color: '#14171A', marginBottom: '24px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' },
  statCard: { backgroundColor: '#F5F7FA', padding: '24px', borderRadius: '16px', textAlign: 'center' },
  statIcon: { fontSize: '2.5rem', marginBottom: '12px' },
  statNumber: { fontSize: '2.5rem', fontWeight: '700', color: '#4A90E2', marginBottom: '8px' },
  statLabel: { fontSize: '1rem', color: '#657786', fontWeight: '600' },
  childrenSection: { marginTop: '40px' },
  sectionTitle: { fontSize: '1.5rem', fontWeight: '700', color: '#14171A', marginBottom: '20px' },
  childrenGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' },
  childCard: { backgroundColor: '#F5F7FA', padding: '24px', borderRadius: '16px', textAlign: 'center' },
  childAvatar: { width: '80px', height: '80px', margin: '0 auto 16px', backgroundColor: '#4A90E2', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '700' },
  childName: { fontSize: '1.3rem', fontWeight: '700', color: '#14171A', marginBottom: '8px' },
  childInfo: { fontSize: '1rem', color: '#657786', marginBottom: '4px' },
  emptyState: { textAlign: 'center', padding: '40px', backgroundColor: '#F5F7FA', borderRadius: '16px' },
  btnPrimary: { padding: '14px 32px', fontSize: '1.1rem', fontWeight: '700', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', marginTop: '16px' },
  btnSecondary: { padding: '12px 24px', fontSize: '1rem', fontWeight: '600', backgroundColor: 'white', color: '#4A90E2', border: '2px solid #4A90E2', borderRadius: '12px', cursor: 'pointer', marginTop: '12px' },
  profileSection: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' },
  profileCard: { padding: '24px', backgroundColor: '#F5F7FA', borderRadius: '16px' },
  cardTitle: { fontSize: '1.3rem', fontWeight: '700', color: '#14171A', marginBottom: '20px' },
  infoRow: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #E1E8ED', marginBottom: '12px' },
  infoLabel: { fontSize: '1rem', color: '#657786', fontWeight: '600' },
  infoValue: { fontSize: '1rem', color: '#14171A', fontWeight: '600' },
  activityList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  activityItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#F5F7FA', borderRadius: '12px' },
  activityInfo: { flex: 1 },
  activityName: { fontSize: '1.2rem', fontWeight: '700', color: '#14171A', marginBottom: '4px' },
  activityMeta: { fontSize: '0.95rem', color: '#657786' },
  activityScore: { marginLeft: '20px' },
  scoreCircle: { width: '60px', height: '60px', backgroundColor: '#4A90E2', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: '700' }
};
