import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Landing() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // In production, this would connect to EmailJS
    setEmailSubmitted(true);
    setTimeout(() => setEmailSubmitted(false), 3000);
  };

  const features = [
    {
      icon: '📖',
      title: 'Bible Stories',
      description: 'Engaging, age-appropriate Bible stories with interactive elements and discussion prompts',
      count: '45 stories'
    },
    {
      icon: '✝️',
      title: 'Memory Verses',
      description: 'KJV Scripture memorization with visual aids and repetition exercises',
      count: '50 verses'
    },
    {
      icon: '🙏',
      title: 'Prayer Time',
      description: 'Guided prayers and templates to help children connect with God',
      count: '30 prayers'
    },
    {
      icon: '🎵',
      title: 'Worship Songs',
      description: 'Child-friendly worship songs with lyrics and simple melodies',
      count: '40 songs'
    },
    {
      icon: '🕊️',
      title: 'Meditation',
      description: 'Faith-based meditation and calming exercises for peace and focus',
      count: '25 meditations'
    },
    {
      icon: '🎨',
      title: 'Art & Creativity',
      description: 'Faith-inspired art projects and creative expression activities',
      count: '35 projects'
    },
    {
      icon: '🌿',
      title: 'Nature Exploration',
      description: "Outdoor activities that celebrate God's creation",
      count: '30 explorations'
    },
    {
      icon: '💝',
      title: 'Kindness Activities',
      description: 'Service projects and acts of kindness to practice Christian values',
      count: '28 activities'
    },
    {
      icon: '🎹',
      title: 'Music & Rhythm',
      description: 'Musical activities for cognitive development and worship expression',
      count: '32 exercises'
    },
    {
      icon: '🌬️',
      title: 'Breathing Exercises',
      description: 'Calming breathing techniques combined with scripture meditation',
      count: '20 exercises'
    },
    {
      icon: '📝',
      title: 'Story Creation',
      description: 'Creative writing prompts with faith-based themes',
      count: '25 prompts'
    },
    {
      icon: '💃',
      title: 'Movement & Dance',
      description: 'Physical activities and worship dance for motor skill development',
      count: '30 movements'
    },
    {
      icon: '📔',
      title: 'Gratitude Journal',
      description: 'Daily gratitude prompts to foster thankfulness and positive thinking',
      count: '22 prompts'
    },
    {
      icon: '✨',
      title: 'Sensory Activities',
      description: 'Multi-sensory experiences designed for sensory processing needs',
      count: '33 activities'
    },
    {
      icon: '👥',
      title: 'Social Skills',
      description: 'Interactive lessons for developing friendship and communication skills',
      count: '30 lessons'
    }
  ];

  return (
    <>
      <Head>
        <title>PeacePath Kids - Faith-Based App for Special Needs Children</title>
        <meta name="description" content="475 faith-based activities designed for children with autism, ADHD, sensory processing disorders, and other special needs. Ages 6-16." />
      </Head>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.navBrand}>
            <span style={styles.navLogo}>🕊️💝✝️</span>
            <span style={styles.navTitle}>PeacePath Kids</span>
          </div>
          <div style={styles.navLinks}>
            <button onClick={() => router.push('/welcome')} style={styles.navLink}>Help Center</button>
            <button onClick={() => router.push('/login')} style={styles.navLink}>Login</button>
            <button onClick={() => router.push('/signup')} style={styles.navBtnPrimary}>Sign Up Free</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Where Little Hearts Find Peace in God's Love
          </h1>
          <p style={styles.heroSubtitle}>
            475 faith-based activities designed specifically for special needs children ages 6-16
          </p>
          <div style={styles.heroTags}>
            <span style={styles.tag}>✓ Autism Friendly</span>
            <span style={styles.tag}>✓ ADHD Support</span>
            <span style={styles.tag}>✓ Sensory Optimized</span>
            <span style={styles.tag}>✓ Scripture-Based</span>
          </div>
          <div style={styles.heroCta}>
            <button onClick={() => router.push('/signup')} style={styles.heroBtnPrimary}>
              Start Free Trial
            </button>
            <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} style={styles.heroBtnSecondary}>
              See All Features
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={styles.featuresSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>15 Activity Categories</h2>
          <p style={styles.sectionSubtitle}>
            Every activity is designed with special needs in mind and grounded in Scripture
          </p>
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} style={styles.featureCard}>
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
                <span style={styles.featureCount}>{feature.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={styles.benefitsSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Designed for Special Needs Success</h2>
          <div style={styles.benefitsGrid}>
            <div style={styles.benefitCard}>
              <div style={styles.benefitIcon}>🎨</div>
              <h3 style={styles.benefitTitle}>Sensory-Friendly Design</h3>
              <p style={styles.benefitText}>
                Research-based color palette and layouts designed to reduce overstimulation while maintaining engagement
              </p>
            </div>
            <div style={styles.benefitCard}>
              <div style={styles.benefitIcon}>🔒</div>
              <h3 style={styles.benefitTitle}>One Device Protection</h3>
              <p style={styles.benefitText}>
                Parental controls ensure children only access the app on approved devices for safety and consistency
              </p>
            </div>
            <div style={styles.benefitCard}>
              <div style={styles.benefitIcon}>📊</div>
              <h3 style={styles.benefitTitle}>Progress Tracking</h3>
              <p style={styles.benefitText}>
                Monitor your child's growth with detailed analytics and celebrate milestones together
              </p>
            </div>
            <div style={styles.benefitCard}>
              <div style={styles.benefitIcon}>♿</div>
              <h3 style={styles.benefitTitle}>Accessibility First</h3>
              <p style={styles.benefitText}>
                WCAG 2.1 AA compliant with screen reader support, keyboard navigation, and adjustable settings
              </p>
            </div>
            <div style={styles.benefitCard}>
              <div style={styles.benefitIcon}>🙏</div>
              <h3 style={styles.benefitTitle}>Scripture-Centered</h3>
              <p style={styles.benefitText}>
                Every activity incorporates KJV Scripture to nurture faith while supporting cognitive development
              </p>
            </div>
            <div style={styles.benefitCard}>
              <div style={styles.benefitIcon}>👨‍👩‍👧‍👦</div>
              <h3 style={styles.benefitTitle}>Family Support</h3>
              <p style={styles.benefitText}>
                Manage up to 4 children with individual profiles, tracking, and personalized activity recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={styles.pricingSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Simple, Affordable Pricing</h2>
          <p style={styles.sectionSubtitle}>
            Cancel anytime. Ministry discount codes available through your local church.
          </p>
          <div style={styles.pricingGrid}>
            {/* Individual Plan */}
            <div style={styles.pricingCard}>
              <div style={styles.pricingHeader}>
                <h3 style={styles.pricingTitle}>Individual</h3>
                <div style={styles.pricingPrice}>
                  <span style={styles.pricingAmount}>$6.99</span>
                  <span style={styles.pricingPeriod}>/month</span>
                </div>
              </div>
              <ul style={styles.pricingFeatures}>
                <li style={styles.pricingFeature}>✓ 1 child profile</li>
                <li style={styles.pricingFeature}>✓ All 475 activities</li>
                <li style={styles.pricingFeature}>✓ Progress tracking</li>
                <li style={styles.pricingFeature}>✓ 1 approved device</li>
                <li style={styles.pricingFeature}>✓ Email support</li>
                <li style={styles.pricingFeature}>✓ Activity recommendations</li>
              </ul>
              <button onClick={() => router.push('/signup')} style={styles.pricingBtn}>
                Start Free Trial
              </button>
            </div>

            {/* Family Plan */}
            <div style={{...styles.pricingCard, ...styles.pricingCardFeatured}}>
              <div style={styles.pricingBadge}>MOST POPULAR</div>
              <div style={styles.pricingHeader}>
                <h3 style={styles.pricingTitle}>Family</h3>
                <div style={styles.pricingPrice}>
                  <span style={styles.pricingAmount}>$12.99</span>
                  <span style={styles.pricingPeriod}>/month</span>
                </div>
              </div>
              <ul style={styles.pricingFeatures}>
                <li style={styles.pricingFeature}>✓ Up to 4 children</li>
                <li style={styles.pricingFeature}>✓ All 475 activities</li>
                <li style={styles.pricingFeature}>✓ Progress tracking per child</li>
                <li style={styles.pricingFeature}>✓ 1 approved device</li>
                <li style={styles.pricingFeature}>✓ Priority email support</li>
                <li style={styles.pricingFeature}>✓ Personalized recommendations</li>
                <li style={styles.pricingFeature}>✓ Export reports (PDF/CSV)</li>
              </ul>
              <button onClick={() => router.push('/signup')} style={styles.pricingBtnFeatured}>
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section style={styles.emailSection}>
        <div style={styles.container}>
          <h2 style={styles.emailTitle}>Stay Connected</h2>
          <p style={styles.emailSubtitle}>
            Get faith-based parenting tips, activity ideas, and special offers
          </p>
          <form onSubmit={handleEmailSubmit} style={styles.emailForm}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.emailInput}
            />
            <button type="submit" style={styles.emailBtn}>
              Subscribe
            </button>
          </form>
          {emailSubmitted && (
            <p style={styles.emailSuccess}>
              ✓ Thank you! Check your inbox for a welcome message.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>PeacePath Kids</h4>
            <p style={styles.footerText}>
              A ministry of Building On The Faith, serving special needs children and families with faith-based cognitive wellness resources.
            </p>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Quick Links</h4>
            <button onClick={() => router.push('/welcome')} style={styles.footerLink}>Help Center</button>
            <button onClick={() => router.push('/privacy')} style={styles.footerLink}>Privacy Policy</button>
            <button onClick={() => router.push('/terms')} style={styles.footerLink}>Terms of Service</button>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Contact</h4>
            <p style={styles.footerText}>buildingonthefaithmin@gmail.com</p>
            <p style={styles.footerText}>St. Louis, Missouri</p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.footerCopyright}>
            © 2024 Building On The Faith Ministry. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

const styles = {
  nav: {
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    padding: '16px 0'
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  navLogo: {
    fontSize: '1.8rem'
  },
  navTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#4A90E2'
  },
  navLinks: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  navLink: {
    background: 'none',
    border: 'none',
    padding: '8px 16px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#657786',
    cursor: 'pointer',
    transition: 'color 0.3s ease'
  },
  navBtnPrimary: {
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '700',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  hero: {
    background: 'linear-gradient(135deg, #6BA3E8 0%, #4A90E2 100%)',
    padding: '80px 24px',
    textAlign: 'center',
    color: 'white'
  },
  heroContent: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '24px',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
    lineHeight: '1.2'
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    marginBottom: '32px',
    opacity: 0.95,
    lineHeight: '1.6'
  },
  heroTags: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '40px'
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '1rem',
    fontWeight: '600'
  },
  heroCta: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  heroBtnPrimary: {
    padding: '16px 40px',
    fontSize: '1.2rem',
    fontWeight: '700',
    backgroundColor: '#FFB399',
    color: '#14171A',
    border: 'none',
    borderRadius: '32px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
  },
  heroBtnSecondary: {
    padding: '16px 40px',
    fontSize: '1.2rem',
    fontWeight: '700',
    backgroundColor: 'transparent',
    color: 'white',
    border: '3px solid white',
    borderRadius: '32px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  featuresSection: {
    padding: '80px 0',
    backgroundColor: '#F5F7FA'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '16px',
    color: '#14171A'
  },
  sectionSubtitle: {
    fontSize: '1.2rem',
    textAlign: 'center',
    color: '#657786',
    marginBottom: '48px',
    maxWidth: '700px',
    margin: '0 auto 48px'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px'
  },
  featureCard: {
    backgroundColor: 'white',
    padding: '32px 24px',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '16px'
  },
  featureTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '12px',
    color: '#14171A'
  },
  featureDescription: {
    fontSize: '1rem',
    color: '#657786',
    lineHeight: '1.6',
    marginBottom: '16px'
  },
  featureCount: {
    display: 'inline-block',
    backgroundColor: '#E1E8ED',
    padding: '6px 16px',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#4A90E2'
  },
  benefitsSection: {
    padding: '80px 0',
    backgroundColor: 'white'
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '32px'
  },
  benefitCard: {
    textAlign: 'center'
  },
  benefitIcon: {
    fontSize: '3.5rem',
    marginBottom: '20px'
  },
  benefitTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: '12px',
    color: '#14171A'
  },
  benefitText: {
    fontSize: '1rem',
    color: '#657786',
    lineHeight: '1.7'
  },
  pricingSection: {
    padding: '80px 0',
    backgroundColor: '#F5F7FA'
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '32px',
    maxWidth: '900px',
    margin: '0 auto'
  },
  pricingCard: {
    backgroundColor: 'white',
    padding: '40px 32px',
    borderRadius: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative'
  },
  pricingCardFeatured: {
    border: '3px solid #4A90E2',
    transform: 'scale(1.05)'
  },
  pricingBadge: {
    position: 'absolute',
    top: '-16px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#FFB399',
    color: '#14171A',
    padding: '6px 20px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '700'
  },
  pricingHeader: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  pricingTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#14171A'
  },
  pricingPrice: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: '8px'
  },
  pricingAmount: {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#4A90E2'
  },
  pricingPeriod: {
    fontSize: '1.2rem',
    color: '#657786'
  },
  pricingFeatures: {
    listStyle: 'none',
    marginBottom: '32px'
  },
  pricingFeature: {
    padding: '12px 0',
    fontSize: '1rem',
    color: '#14171A',
    borderBottom: '1px solid #E1E8ED'
  },
  pricingBtn: {
    width: '100%',
    padding: '16px',
    fontSize: '1.1rem',
    fontWeight: '700',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  pricingBtnFeatured: {
    width: '100%',
    padding: '16px',
    fontSize: '1.1rem',
    fontWeight: '700',
    backgroundColor: '#FFB399',
    color: '#14171A',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  emailSection: {
    padding: '80px 0',
    backgroundColor: '#4A90E2',
    color: 'white',
    textAlign: 'center'
  },
  emailTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '16px'
  },
  emailSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '32px',
    opacity: 0.95
  },
  emailForm: {
    display: 'flex',
    gap: '12px',
    maxWidth: '600px',
    margin: '0 auto',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  emailInput: {
    flex: '1 1 300px',
    padding: '16px 24px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '12px',
    minWidth: '250px'
  },
  emailBtn: {
    padding: '16px 32px',
    fontSize: '1rem',
    fontWeight: '700',
    backgroundColor: '#FFB399',
    color: '#14171A',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  emailSuccess: {
    marginTop: '16px',
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  footer: {
    backgroundColor: '#14171A',
    color: 'white',
    padding: '60px 0 24px'
  },
  footerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '40px'
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  footerTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '8px'
  },
  footerText: {
    fontSize: '1rem',
    color: '#AAB8C2',
    lineHeight: '1.6'
  },
  footerLink: {
    background: 'none',
    border: 'none',
    padding: '4px 0',
    fontSize: '1rem',
    color: '#AAB8C2',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'color 0.3s ease'
  },
  footerBottom: {
    borderTop: '1px solid #38444D',
    paddingTop: '24px',
    textAlign: 'center'
  },
  footerCopyright: {
    fontSize: '0.9rem',
    color: '#AAB8C2'
  }
};
