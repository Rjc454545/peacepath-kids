import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Welcome() {
  const router = useRouter();
  const [chatInput, setChat

Input] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTrouble, setActiveTrouble] = useState(null);

  const faqs = [
    {
      q: "What age is PeacePath Kids designed for?",
      a: "PeacePath Kids is designed for children ages 6-16 with special needs including autism, ADHD, sensory processing disorders, and other developmental challenges."
    },
    {
      q: "How many activities are included?",
      a: "We have 475 faith-based activities across 15 categories including Bible stories, memory verses, worship songs, art, music, meditation, and more."
    },
    {
      q: "Is the app COPPA compliant?",
      a: "Yes! We fully comply with COPPA (Children's Online Privacy Protection Act). Parental consent is required, and we never collect personal information from children without verified guardian approval."
    },
    {
      q: "Can I use this on multiple devices?",
      a: "For your child's safety and consistency, each subscription is limited to one approved device. Contact support if you need to change devices."
    },
    {
      q: "How does the free trial work?",
      a: "You get 7 days free access to all 475 activities. No credit card required for signup. After the trial, choose between Individual ($6.99/month) or Family ($12.99/month) plans."
    },
    {
      q: "What special needs does this support?",
      a: "Our app is designed for children with Autism Spectrum Disorder (ASD), ADHD, Sensory Processing Disorder, anxiety, learning disabilities, speech delays, and physical disabilities."
    },
    {
      q: "Are activities based on Scripture?",
      a: "Yes! All activities incorporate KJV Scripture and Christian values while supporting cognitive and developmental growth."
    },
    {
      q: "Can I track my child's progress?",
      a: "Yes! The parent dashboard shows completion rates, favorite activities, time spent, and progress charts for each child."
    },
    {
      q: "How many children can I add?",
      a: "Individual plan: 1 child. Family plan: Up to 4 children with separate profiles and progress tracking."
    },
    {
      q: "What if my child has multiple special needs?",
      a: "Our survey allows you to select multiple conditions and customize preferences. Activities are then personalized to your child's unique profile."
    },
    {
      q: "Are there sensory-friendly features?",
      a: "Yes! We use research-based colors, adjustable sound levels, screen reader support, and sensory-optimized layouts throughout the app."
    },
    {
      q: "Can I cancel anytime?",
      a: "Absolutely! You can cancel your subscription at any time with no fees or penalties. Access continues until the end of your billing period."
    },
    {
      q: "Is there a ministry discount?",
      a: "Yes! Churches and ministries can request free access codes to distribute to families in need. Contact us at buildingonthefaithmin@gmail.com."
    },
    {
      q: "What if I need to change devices?",
      a: "Contact our support team at buildingonthefaithmin@gmail.com with your user code. We'll help you safely transfer to a new device."
    },
    {
      q: "How do I get support?",
      a: "Use our chatbot below, visit this Help Center, or email buildingonthefaithmin@gmail.com. We typically respond within 24 hours."
    }
  ];

  const troubleshooting = {
    "Login Issues": [
      { issue: "Forgot password", solution: "Click 'Forgot password' on login page. Check your email for reset link." },
      { issue: "Email not recognized", solution: "Verify email spelling. If you signed up with Google/social login, use that method." },
      { issue: "Password won't accept", solution: "Passwords need 8+ characters with uppercase, lowercase, number, and special character." },
      { issue: "Account locked", solution: "After multiple failed attempts, wait 30 minutes or use password reset." },
      { issue: "Device not recognized", solution: "Each account works on one device. Contact support to change devices." },
      { issue: "Can't remember email", solution: "Check purchase confirmation emails or contact support with your user code." },
      { issue: "Two-factor not working", solution: "Ensure phone time is correct. Try generating new backup codes." },
      { issue: "Session expired", solution: "Login again. Check 'Remember me' to stay logged in for 30 days." }
    ],
    "Payment Problems": [
      { issue: "Payment declined", solution: "Verify card details and billing address. Contact your bank if issue persists." },
      { issue: "Can't update card", solution: "Go to Dashboard → Settings → Payment Method to update card information." },
      { issue: "Unexpected charge", solution: "Review billing history in dashboard. Contact support if you see errors." },
      { issue: "Need refund", solution: "We offer 7-day money-back guarantee. Email support with order details." },
      { issue: "Trial ended early", solution: "Trials are 7 days from signup. Check your signup confirmation email for start date." },
      { issue: "Free code not working", solution: "Ensure code is typed exactly as provided. Contact your church/ministry if invalid." },
      { issue: "Charged after canceling", solution: "Cancellation takes effect at period end. Check cancellation confirmation email." },
      { issue: "Can't find invoices", solution: "Dashboard → Settings → Billing History shows all invoices and receipts." }
    ],
    "App Performance": [
      { issue: "App running slow", solution: "Clear browser cache, close other tabs, check internet connection speed." },
      { issue: "Videos won't play", solution: "Update browser, enable JavaScript, check internet connection." },
      { issue: "Audio not working", solution: "Check device volume, unmute browser tab, verify audio permissions." },
      { issue: "Activities won't load", solution: "Refresh page, clear cache, try different browser (Chrome recommended)." },
      { issue: "Progress not saving", solution: "Ensure stable internet connection. Don't close browser during activities." },
      { issue: "Images not displaying", solution: "Disable ad blockers, enable images in browser settings." },
      { issue: "App crashes", solution: "Update browser to latest version. Report crashes to support with details." },
      { issue: "Features missing", solution: "Verify subscription is active. Some features require Family plan." }
    ],
    "Profile & Account": [
      { issue: "Can't add child", solution: "Family plan allows 4 children. Individual plan allows 1. Upgrade if needed." },
      { issue: "Survey won't submit", solution: "Complete all required fields (marked with *). Check internet connection." },
      { issue: "Want to edit survey", solution: "Dashboard → Child Profile → Edit Profile to update survey answers." },
      { issue: "Lost user code", solution: "Find it in Dashboard → Settings → Account Information." },
      { issue: "Change email address", solution: "Dashboard → Settings → Account → Update Email Address." },
      { issue: "Delete account", solution: "Dashboard → Settings → Privacy → Delete Account (permanent action)." },
      { issue: "Export my data", solution: "Dashboard → Settings → Privacy → Export Data (receives within 24 hours)." },
      { issue: "Privacy concerns", solution: "Review our Privacy Policy. We never share child data. Contact support with concerns." }
    ],
    "Activities & Content": [
      { issue: "Can't find activity type", solution: "Use Dashboard search or filter by category. All 15 categories listed on home page." },
      { issue: "Activity too hard/easy", solution: "Update child profile age and abilities. Activities auto-adjust to profile." },
      { issue: "Want to skip activity", solution: "Click 'Next Activity' or return to category page to choose different activity." },
      { issue: "Activity recommendations wrong", solution: "Update survey responses in child profile for better personalization." },
      { issue: "Need printable version", solution: "Many activities have print option. Click printer icon when available." },
      { issue: "Suggestions for new activities", solution: "Dashboard → Feedback → Suggest Activity. We review all suggestions." },
      { issue: "Activity contains error", solution: "Use 'Report Issue' button on activity page. Include screenshot if possible." },
      { issue: "Can't track completion", solution: "Ensure logged in. Progress saves automatically when activity marked complete." }
    ],
    "Technical Support": [
      { issue: "Browser compatibility", solution: "Chrome, Firefox, Safari, Edge supported. Update to latest version for best experience." },
      { issue: "Mobile vs desktop", solution: "Full features on desktop. Mobile has core features but some limitations." },
      { issue: "Screen reader issues", solution: "We support NVDA, JAWS, VoiceOver. Report specific issues to support." },
      { issue: "Keyboard navigation", solution: "Tab to navigate, Enter to select, Esc to close. Full keyboard support included." },
      { issue: "Need accessibility help", solution: "Dashboard → Settings → Accessibility has text size, contrast, and screen reader options." },
      { issue: "Offline access", solution: "App requires internet connection. Offline mode coming in future update." },
      { issue: "System requirements", solution: "Modern browser, 1GB RAM, 10Mbps internet recommended for best experience." },
      { issue: "Contact real person", solution: "Email buildingonthefaithmin@gmail.com or use chatbot below for immediate help." }
    ]
  };

  const categories = [
    { name: 'Bible Stories', icon: '📖', desc: 'Interactive stories from Scripture with discussion prompts' },
    { name: 'Memory Verses', icon: '✝️', desc: 'KJV verse memorization with visual aids' },
    { name: 'Prayer Time', icon: '🙏', desc: 'Guided prayers and prayer prompts' },
    { name: 'Worship Songs', icon: '🎵', desc: 'Child-friendly worship music' },
    { name: 'Meditation', icon: '🕊️', desc: 'Calming exercises with Scripture focus' },
    { name: 'Art & Creativity', icon: '🎨', desc: 'Faith-inspired art projects' },
    { name: 'Nature Exploration', icon: '🌿', desc: 'Outdoor activities celebrating creation' },
    { name: 'Kindness Activities', icon: '💝', desc: 'Service projects and acts of kindness' },
    { name: 'Music & Rhythm', icon: '🎹', desc: 'Musical activities for development' },
    { name: 'Breathing Exercises', icon: '🌬️', desc: 'Calming breathing with Scripture' },
    { name: 'Story Creation', icon: '📝', desc: 'Creative writing with faith themes' },
    { name: 'Movement & Dance', icon: '💃', desc: 'Physical activities and worship dance' },
    { name: 'Gratitude Journal', icon: '📔', desc: 'Daily thankfulness prompts' },
    { name: 'Sensory Activities', icon: '✨', desc: 'Multi-sensory faith experiences' },
    { name: 'Social Skills', icon: '👥', desc: 'Friendship and communication lessons' }
  ];

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim().toLowerCase();
    setChatHistory([...chatHistory, { type: 'user', message: chatInput }]);

    let botResponse = "I'm here to help! Let me find that information for you.";

    // Simple response logic
    if (userMessage.includes('price') || userMessage.includes('cost') || userMessage.includes('subscription')) {
      botResponse = "Individual plan is $6.99/month (1 child). Family plan is $12.99/month (up to 4 children). Both include all 475 activities with a 7-day free trial!";
    } else if (userMessage.includes('trial')) {
      botResponse = "You get 7 days free access to all features! No credit card required to start. Cancel anytime during trial with no charges.";
    } else if (userMessage.includes('device') || userMessage.includes('phone') || userMessage.includes('tablet')) {
      botResponse = "Each account is linked to one device for your child's safety. To change devices, contact support at buildingonthefaithmin@gmail.com with your user code.";
    } else if (userMessage.includes('activity') || userMessage.includes('activities')) {
      botResponse = "We have 475 activities across 15 categories! Everything from Bible stories to art projects, all designed for special needs children ages 6-16.";
    } else if (userMessage.includes('special need') || userMessage.includes('autism') || userMessage.includes('adhd')) {
      botResponse = "Yes! We support children with autism, ADHD, sensory processing disorders, anxiety, learning disabilities, speech delays, and physical disabilities.";
    } else if (userMessage.includes('cancel')) {
      botResponse = "You can cancel anytime from Dashboard → Settings → Subscription. No fees or penalties. Your access continues until the end of your billing period.";
    } else if (userMessage.includes('support') || userMessage.includes('help') || userMessage.includes('contact')) {
      botResponse = "Email us at buildingonthefaithmin@gmail.com or use this chatbot! We typically respond within 24 hours. Include your user code for faster service.";
    } else if (userMessage.includes('ministry') || userMessage.includes('church') || userMessage.includes('free code')) {
      botResponse = "Churches can request free access codes! Contact buildingonthefaithmin@gmail.com to discuss how we can support your ministry.";
    } else {
      botResponse = "I can help with pricing, activities, special needs features, device issues, cancellation, or general questions. What would you like to know more about?";
    }

    setTimeout(() => {
      setChatHistory(prev => [...prev, { type: 'bot', message: botResponse }]);
    }, 500);

    setChat

Input('');
  };

  return (
    <>
      <Head>
        <title>Help Center - PeacePath Kids</title>
        <meta name="description" content="Get help with PeacePath Kids - FAQs, troubleshooting, and support" />
      </Head>

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>🕊️💝✝️</div>
          <h1 style={styles.title}>Help Center</h1>
          <p style={styles.subtitle}>We're here to support your family's faith journey</p>
        </div>

        {/* Quick Links */}
        <div style={styles.quickLinks}>
          <button onClick={() => document.getElementById('getting-started').scrollIntoView({ behavior: 'smooth' })} style={styles.quickLink}>
            🚀 Getting Started
          </button>
          <button onClick={() => document.getElementById('faqs').scrollIntoView({ behavior: 'smooth' })} style={styles.quickLink}>
            ❓ FAQs
          </button>
          <button onClick={() => document.getElementById('troubleshooting').scrollIntoView({ behavior: 'smooth' })} style={styles.quickLink}>
            🔧 Troubleshooting
          </button>
          <button onClick={() => document.getElementById('chatbot').scrollIntoView({ behavior: 'smooth' })} style={styles.quickLink}>
            💬 Chat Support
          </button>
        </div>

        {/* Getting Started */}
        <section id="getting-started" style={styles.section}>
          <h2 style={styles.sectionTitle}>🚀 Getting Started</h2>
          <div style={styles.stepsGrid}>
            {[
              { num: 1, title: 'Sign Up Free', desc: 'Create your account in 2 minutes. No credit card needed for 7-day trial.' },
              { num: 2, title: 'Complete Survey', desc: 'Tell us about your child so we can personalize activities.' },
              { num: 3, title: 'Explore Activities', desc: 'Browse 475 faith-based activities designed for special needs.' },
              { num: 4, title: 'Track Progress', desc: 'Watch your child grow with detailed analytics in the parent dashboard.' },
              { num: 5, title: 'Choose Your Plan', desc: 'After trial, select Individual ($6.99) or Family ($12.99) plan.' }
            ].map(step => (
              <div key={step.num} style={styles.stepCard}>
                <div style={styles.stepNumber}>{step.num}</div>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Activity Categories */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>📚 Activity Categories</h2>
          <div style={styles.categoriesGrid}>
            {categories.map((cat, idx) => (
              <div key={idx} style={styles.categoryCard}>
                <div style={styles.categoryIcon}>{cat.icon}</div>
                <h4 style={styles.categoryName}>{cat.name}</h4>
                <p style={styles.categoryDesc}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" style={styles.section}>
          <h2 style={styles.sectionTitle}>❓ Frequently Asked Questions</h2>
          <div style={styles.faqContainer}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={styles.faqItem}>
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={styles.faqQuestion}
                >
                  <span>{faq.q}</span>
                  <span style={styles.faqArrow}>{activeFaq === idx ? '▼' : '▶'}</span>
                </button>
                {activeFaq === idx && (
                  <div style={styles.faqAnswer}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Troubleshooting */}
        <section id="troubleshooting" style={styles.section}>
          <h2 style={styles.sectionTitle}>🔧 Troubleshooting Guide</h2>
          <div style={styles.troubleContainer}>
            {Object.entries(troubleshooting).map(([category, issues], catIdx) => (
              <div key={catIdx} style={styles.troubleCategory}>
                <button
                  onClick={() => setActiveTrouble(activeTrouble === catIdx ? null : catIdx)}
                  style={styles.troubleCategoryBtn}
                >
                  <span style={styles.troubleCategoryTitle}>{category}</span>
                  <span style={styles.troubleArrow}>{activeTrouble === catIdx ? '▼' : '▶'}</span>
                </button>
                {activeTrouble === catIdx && (
                  <div style={styles.troubleIssues}>
                    {issues.map((item, issueIdx) => (
                      <div key={issueIdx} style={styles.troubleItem}>
                        <div style={styles.troubleIssue}>❌ {item.issue}</div>
                        <div style={styles.troubleSolution}>✅ {item.solution}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Chatbot */}
        <section id="chatbot" style={styles.section}>
          <h2 style={styles.sectionTitle}>💬 Chat with Us</h2>
          <div style={styles.chatContainer}>
            <div style={styles.chatMessages}>
              {chatHistory.length === 0 && (
                <div style={styles.chatWelcome}>
                  👋 Hi! I'm here to help. Ask me about pricing, activities, special needs features, or anything else!
                </div>
              )}
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  style={msg.type === 'user' ? styles.chatUser : styles.chatBot}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} style={styles.chatForm}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your question here..."
                style={styles.chatInput}
              />
              <button type="submit" style={styles.chatSend}>Send</button>
            </form>
          </div>
        </section>

        {/* Contact */}
        <section style={styles.contactSection}>
          <h2 style={styles.sectionTitle}>📧 Still Need Help?</h2>
          <p style={styles.contactText}>
            Email us at <strong>buildingonthefaithmin@gmail.com</strong>
          </p>
          <p style={styles.contactText}>
            We typically respond within 24 hours. Include your user code for faster service.
          </p>
          <div style={styles.contactButtons}>
            <button onClick={() => router.push('/login')} style={styles.btnPrimary}>
              Login to Dashboard
            </button>
            <button onClick={() => router.push('/signup')} style={styles.btnSecondary}>
              Start Free Trial
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#F5F7FA', padding: '40px 20px' },
  header: { textAlign: 'center', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px' },
  logo: { fontSize: '3rem', marginBottom: '16px' },
  title: { fontSize: '3rem', fontWeight: '700', color: '#14171A', marginBottom: '12px' },
  subtitle: { fontSize: '1.2rem', color: '#657786' },
  quickLinks: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' },
  quickLink: { padding: '12px 24px', fontSize: '1rem', fontWeight: '600', backgroundColor: 'white', color: '#4A90E2', border: '2px solid #4A90E2', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.3s ease' },
  section: { maxWidth: '1000px', margin: '0 auto 60px', backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  sectionTitle: { fontSize: '2rem', fontWeight: '700', color: '#14171A', marginBottom: '24px', textAlign: 'center' },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' },
  stepCard: { textAlign: 'center', padding: '24px', backgroundColor: '#F5F7FA', borderRadius: '16px' },
  stepNumber: { width: '50px', height: '50px', margin: '0 auto 16px', backgroundColor: '#4A90E2', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '700' },
  stepTitle: { fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', color: '#14171A' },
  stepDesc: { fontSize: '0.95rem', color: '#657786', lineHeight: '1.5' },
  categoriesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' },
  categoryCard: { padding: '20px', backgroundColor: '#F5F7FA', borderRadius: '12px', textAlign: 'center' },
  categoryIcon: { fontSize: '2.5rem', marginBottom: '12px' },
  categoryName: { fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px', color: '#14171A' },
  categoryDesc: { fontSize: '0.9rem', color: '#657786', lineHeight: '1.4' },
  faqContainer: { display: 'flex', flexDirection: 'column', gap: '12px' },
  faqItem: { border: '2px solid #E1E8ED', borderRadius: '12px', overflow: 'hidden' },
  faqQuestion: { width: '100%', padding: '16px 20px', backgroundColor: 'white', border: 'none', textAlign: 'left', fontSize: '1.05rem', fontWeight: '600', color: '#14171A', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  faqArrow: { fontSize: '0.9rem', color: '#4A90E2' },
  faqAnswer: { padding: '16px 20px', backgroundColor: '#F5F7FA', fontSize: '1rem', color: '#657786', lineHeight: '1.6', borderTop: '1px solid #E1E8ED' },
  troubleContainer: { display: 'flex', flexDirection: 'column', gap: '16px' },
  troubleCategory: { border: '2px solid #E1E8ED', borderRadius: '12px', overflow: 'hidden' },
  troubleCategoryBtn: { width: '100%', padding: '16px 20px', backgroundColor: '#4A90E2', color: 'white', border: 'none', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  troubleCategoryTitle: { fontSize: '1.1rem' },
  troubleArrow: { fontSize: '0.9rem' },
  troubleIssues: { padding: '20px', backgroundColor: 'white' },
  troubleItem: { padding: '12px 0', borderBottom: '1px solid #E1E8ED' },
  troubleIssue: { fontSize: '1rem', fontWeight: '600', color: '#D9534F', marginBottom: '4px' },
  troubleSolution: { fontSize: '0.95rem', color: '#5CB85C', lineHeight: '1.5', paddingLeft: '20px' },
  chatContainer: { maxWidth: '700px', margin: '0 auto', backgroundColor: 'white', borderRadius: '16px', border: '2px solid #E1E8ED', overflow: 'hidden' },
  chatMessages: { height: '400px', overflowY: 'auto', padding: '20px', backgroundColor: '#F5F7FA' },
  chatWelcome: { padding: '16px', backgroundColor: 'white', borderRadius: '12px', textAlign: 'center', color: '#657786', fontSize: '1rem' },
  chatUser: { padding: '12px 16px', backgroundColor: '#4A90E2', color: 'white', borderRadius: '12px', marginBottom: '12px', maxWidth: '70%', marginLeft: 'auto', fontSize: '1rem' },
  chatBot: { padding: '12px 16px', backgroundColor: 'white', color: '#14171A', borderRadius: '12px', marginBottom: '12px', maxWidth: '70%', fontSize: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  chatForm: { display: 'flex', padding: '16px', backgroundColor: 'white', borderTop: '2px solid #E1E8ED' },
  chatInput: { flex: 1, padding: '12px', fontSize: '1rem', border: '2px solid #E1E8ED', borderRadius: '12px', marginRight: '12px' },
  chatSend: { padding: '12px 24px', fontSize: '1rem', fontWeight: '700', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' },
  contactSection: { maxWidth: '600px', margin: '0 auto', textAlign: 'center', backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  contactText: { fontSize: '1.1rem', color: '#657786', marginBottom: '12px', lineHeight: '1.6' },
  contactButtons: { display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' },
  btnPrimary: { padding: '14px 32px', fontSize: '1.1rem', fontWeight: '700', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' },
  btnSecondary: { padding: '14px 32px', fontSize: '1.1rem', fontWeight: '700', backgroundColor: 'white', color: '#4A90E2', border: '2px solid #4A90E2', borderRadius: '12px', cursor: 'pointer' }
};
