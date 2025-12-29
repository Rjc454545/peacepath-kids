import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activityCount] = useState(475);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = [
    { name: 'Bible Stories', icon: '📖', color: '#4A90E2', count: 45 },
    { name: 'Memory Verses', icon: '✝️', color: '#9B87D4', count: 50 },
    { name: 'Prayer Time', icon: '🙏', color: '#66CC99', count: 30 },
    { name: 'Worship Songs', icon: '🎵', color: '#FFB399', count: 40 },
    { name: 'Meditation', icon: '🕊️', color: '#5CB85C', count: 25 },
    { name: 'Art & Creativity', icon: '🎨', color: '#F0AD4E', count: 35 },
    { name: 'Nature Exploration', icon: '🌿', color: '#5BC0DE', count: 30 },
    { name: 'Kindness Activities', icon: '💝', color: '#D9534F', count: 28 },
    { name: 'Music & Rhythm', icon: '🎹', color: '#FF9D7F', count: 32 },
    { name: 'Breathing Exercises', icon: '🌬️', color: '#66CC99', count: 20 },
    { name: 'Story Creation', icon: '📝', color: '#FFD966', count: 25 },
    { name: 'Movement & Dance', icon: '💃', color: '#9B87D4', count: 30 },
    { name: 'Gratitude Journal', icon: '📔', color: '#4A90E2', count: 22 },
    { name: 'Sensory Activities', icon: '✨', color: '#FFB399', count: 33 },
    { name: 'Social Skills', icon: '👥', color: '#5CB85C', count: 30 }
  ];

  const handleGetStarted = () => {
    router.push('/landing');
  };

  const handleLearnMore = () => {
    router.push('/welcome');
  };

  return (
    <>
      <Head>
        <title>PeacePath Kids - Where Little Hearts Find Peace in God's Love</title>
        <meta name="description" content="Faith-based cognitive wellness app for special needs children ages 6-16" />
      </Head>

      <div style={styles.container}>
        {/* Animated Logo Section */}
        <div style={{
          ...styles.logoSection,
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 1s ease'
        }}>
          <div style={styles.logoContainer}>
            {/* Dove */}
            <div style={{
              ...styles.logo,
              animation: 'float 3s ease-in-out infinite'
            }}>
              🕊️
            </div>
            {/* Heart */}
            <div style={{
              ...styles.logo,
              animation: 'pulse 2s ease-in-out infinite',
              animationDelay: '0.5s'
            }}>
              💝
            </div>
            {/* Cross */}
            <div style={{
              ...styles.logo,
              animation: 'glow 2.5s ease-in-out infinite',
              animationDelay: '1s'
            }}>
              ✝️
            </div>
          </div>

          <h1 style={styles.title}>PeacePath Kids</h1>
          <p style={styles.tagline}>Where Little Hearts Find Peace in God's Love</p>
          
          <div style={styles.badge}>
            <span style={styles.badgeText}>{activityCount} Faith-Based Activities</span>
          </div>
        </div>

        {/* Categories Grid */}
        <div style={{
          ...styles.categoriesSection,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1.5s ease 0.5s'
        }}>
          <h2 style={styles.sectionTitle}>Explore Our Activities</h2>
          <div style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <div
                key={index}
                style={{
                  ...styles.categoryCard,
                  backgroundColor: category.color,
                  animationDelay: `${index * 0.1}s`,
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
                  transition: `all 0.5s ease ${index * 0.1}s`
                }}
              >
                <div style={styles.categoryIcon}>{category.icon}</div>
                <h3 style={styles.categoryName}>{category.name}</h3>
                <p style={styles.categoryCount}>{category.count} activities</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{
          ...styles.ctaSection,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease 2s'
        }}>
          <button onClick={handleGetStarted} style={styles.primaryBtn}>
            Get Started Free
          </button>
          <button onClick={handleLearnMore} style={styles.secondaryBtn}>
            Learn More
          </button>
        </div>

        {/* Ministry Info */}
        <div style={{
          ...styles.footer,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease 2.5s'
        }}>
          <p style={styles.footerText}>
            A Ministry of Building On The Faith
          </p>
          <p style={styles.footerSubtext}>
            Serving special needs children ages 6-16 with faith-based cognitive wellness
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes glow {
          0%, 100% { 
            filter: brightness(1) drop-shadow(0 0 5px rgba(255, 255, 255, 0.5)); 
          }
          50% { 
            filter: brightness(1.3) drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)); 
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6BA3E8 0%, #4A90E2 50%, #357ABD 100%)',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: '60px',
    position: 'relative',
    zIndex: 1
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  logo: {
    fontSize: '80px',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
  },
  title: {
    fontSize: '4rem',
    fontWeight: '800',
    color: 'white',
    marginBottom: '15px',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
    fontFamily: '"Comic Sans MS", "Arial Rounded MT Bold", sans-serif'
  },
  tagline: {
    fontSize: '1.5rem',
    color: 'white',
    marginBottom: '25px',
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
    fontStyle: 'italic'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '12px 30px',
    borderRadius: '50px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  },
  badgeText: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#4A90E2',
    letterSpacing: '0.5px'
  },
  categoriesSection: {
    width: '100%',
    maxWidth: '1200px',
    marginBottom: '60px'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: '40px',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)'
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    padding: '0 20px'
  },
  categoryCard: {
    padding: '30px 20px',
    borderRadius: '24px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    color: 'white'
  },
  categoryIcon: {
    fontSize: '3rem',
    marginBottom: '15px'
  },
  categoryName: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '8px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
  },
  categoryCount: {
    fontSize: '1rem',
    opacity: 0.9
  },
  ctaSection: {
    display: 'flex',
    gap: '20px',
    marginBottom: '60px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  primaryBtn: {
    padding: '18px 40px',
    fontSize: '1.3rem',
    fontWeight: '700',
    backgroundColor: '#FFB399',
    color: '#14171A',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    fontFamily: '"Comic Sans MS", "Arial Rounded MT Bold", sans-serif'
  },
  secondaryBtn: {
    padding: '18px 40px',
    fontSize: '1.3rem',
    fontWeight: '700',
    backgroundColor: 'white',
    color: '#4A90E2',
    border: '3px solid white',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    fontFamily: '"Comic Sans MS", "Arial Rounded MT Bold", sans-serif'
  },
  footer: {
    textAlign: 'center',
    color: 'white'
  },
  footerText: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '8px',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'
  },
  footerSubtext: {
    fontSize: '1rem',
    opacity: 0.9,
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
  }
};
