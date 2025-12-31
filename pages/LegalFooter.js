// ============================================
// REUSABLE FOOTER COMPONENT
// ============================================
// Add this to every page for consistent legal protection
// ============================================

export default function LegalFooter() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        
        {/* Copyright Notice */}
        <div style={styles.copyrightSection}>
          <p style={styles.copyright}>
            © 2025 Building On The Faith Ministry. All Rights Reserved.
          </p>
          <p style={styles.trademark}>
            PeacePath Kids™ is a trademark of Building On The Faith Ministry
          </p>
        </div>

        {/* Legal Links */}
        <div style={styles.legalLinks}>
          <a href="/terms" style={styles.link}>Terms of Service</a>
          <span style={styles.separator}>|</span>
          <a href="/privacy" style={styles.link}>Privacy Policy</a>
          <span style={styles.separator}>|</span>
          <a href="/disclaimer" style={styles.link}>Disclaimer</a>
        </div>

        {/* Contact Info */}
        <div style={styles.contactSection}>
          <p style={styles.contact}>
            Building On The Faith Ministry | St. Louis, Missouri
          </p>
          <p style={styles.contact}>
            www.peacepathkids.com | buildingonthefaithmin@gmail.com
          </p>
        </div>

        {/* Compliance Badges */}
        <div style={styles.complianceSection}>
          <span style={styles.badge}>✅ COPPA Compliant</span>
          <span style={styles.badge}>🔒 Secure & Encrypted</span>
          <span style={styles.badge}>✝️ Faith-Based</span>
        </div>

      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: '#2C3E50',
    color: 'white',
    padding: '40px 20px',
    marginTop: '60px',
    borderTop: '4px solid #4A90E2',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  copyrightSection: {
    marginBottom: '20px',
  },
  copyright: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  trademark: {
    fontSize: '12px',
    opacity: 0.8,
    margin: '5px 0',
  },
  legalLinks: {
    margin: '20px 0',
    fontSize: '14px',
  },
  link: {
    color: '#87CEEB',
    textDecoration: 'none',
    margin: '0 5px',
    transition: 'color 0.3s',
  },
  separator: {
    color: '#7F8C8D',
    margin: '0 10px',
  },
  contactSection: {
    margin: '20px 0',
    fontSize: '13px',
    opacity: 0.9,
  },
  contact: {
    margin: '5px 0',
  },
  complianceSection: {
    marginTop: '25px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '15px',
  },
  badge: {
    background: 'rgba(255,255,255,0.1)',
    padding: '8px 15px',
    borderRadius: '20px',
    fontSize: '12px',
    border: '1px solid rgba(255,255,255,0.2)',
  },
};


// ============================================
// HOW TO USE THIS COMPONENT
// ============================================

/*

1. SAVE THIS FILE AS: /components/LegalFooter.js

2. IMPORT IN ANY PAGE:
   import LegalFooter from '../components/LegalFooter';

3. ADD AT THE BOTTOM OF YOUR PAGE:
   <LegalFooter />

4. EXAMPLE:

   export default function MyPage() {
     return (
       <div>
         <h1>My Page Content</h1>
         <p>Page content here...</p>
         
         <LegalFooter />  ← Add this!
       </div>
     );
   }

5. PAGES THAT NEED IT:
   - index.js (home page)
   - signup.js
   - login.js
   - dashboard.js
   - welcome.js
   - survey.js
   - admin.js
   - help.js
   - ALL PAGES!

*/
