import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { validateEmail, validatePassword, sanitizeInput } from '../utils/helpers';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreedToTerms: false,
    agreedToCoppa: false,
    agreedToMarketing: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Parent name validation
    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent/guardian name is required';
    } else if (formData.parentName.trim().length < 2) {
      newErrors.parentName = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordCheck = validatePassword(formData.password);
      if (!passwordCheck.valid) {
        newErrors.password = 'Password must include: ' + passwordCheck.errors.join(', ');
      }
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone validation (optional but must be valid if provided)
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Terms agreement
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the Terms of Service';
    }

    // COPPA consent
    if (!formData.agreedToCoppa) {
      newErrors.agreedToCoppa = 'Parental consent is required for children under 13';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        parentName: sanitizeInput(formData.parentName),
        email: formData.email,
        phone: formData.phone || '',
        createdAt: new Date().toISOString(),
        subscriptionStatus: 'trial',
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        agreedToTerms: true,
        agreedToCoppa: true,
        marketingOptIn: formData.agreedToMarketing,
        children: []
      });

      // Redirect to survey to complete profile
      router.push('/survey');

    } catch (error) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'This email is already registered. Please login instead.' });
      } else if (error.code === 'auth/weak-password') {
        setErrors({ password: 'Password is too weak. Please choose a stronger password.' });
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - PeacePath Kids</title>
        <meta name="description" content="Create your free account and start your 7-day trial" />
      </Head>

      <div style={styles.container}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.logo}>🕊️💝✝️</div>
            <h1 style={styles.title}>Create Your Account</h1>
            <p style={styles.subtitle}>
              Start your 7-day free trial. No credit card required.
            </p>
          </div>

          {/* General Error */}
          {errors.general && (
            <div style={styles.alertError}>
              <span>⚠️</span>
              <span>{errors.general}</span>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Parent/Guardian Name */}
            <div style={styles.formGroup}>
              <label htmlFor="parentName" style={styles.label}>
                Parent/Guardian Name *
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Enter your full name"
                style={{
                  ...styles.input,
                  ...(errors.parentName && styles.inputError)
                }}
                disabled={loading}
              />
              {errors.parentName && (
                <p style={styles.errorText}>⚠️ {errors.parentName}</p>
              )}
            </div>

            {/* Email */}
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                style={{
                  ...styles.input,
                  ...(errors.email && styles.inputError)
                }}
                disabled={loading}
              />
              {errors.email && (
                <p style={styles.errorText}>⚠️ {errors.email}</p>
              )}
            </div>

            {/* Phone (Optional) */}
            <div style={styles.formGroup}>
              <label htmlFor="phone" style={styles.label}>
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                style={{
                  ...styles.input,
                  ...(errors.phone && styles.inputError)
                }}
                disabled={loading}
              />
              {errors.phone && (
                <p style={styles.errorText}>⚠️ {errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password *
              </label>
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  style={{
                    ...styles.input,
                    ...(errors.password && styles.inputError)
                  }}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.showPasswordBtn}
                  disabled={loading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <p style={styles.errorText}>⚠️ {errors.password}</p>
              )}
              <p style={styles.helpText}>
                Must be at least 8 characters with uppercase, lowercase, number, and special character
              </p>
            </div>

            {/* Confirm Password */}
            <div style={styles.formGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>
                Confirm Password *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                style={{
                  ...styles.input,
                  ...(errors.confirmPassword && styles.inputError)
                }}
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p style={styles.errorText}>⚠️ {errors.confirmPassword}</p>
              )}
            </div>

            {/* COPPA Consent Notice */}
            <div style={styles.coppaNotice}>
              <h3 style={styles.coppaTitle}>📋 Children's Privacy Protection</h3>
              <p style={styles.coppaText}>
                This app is designed for children ages 6-16 with special needs. By creating an account, 
                you certify that you are the parent or legal guardian of the child(ren) who will use this app.
              </p>
              <p style={styles.coppaText}>
                We comply with COPPA (Children's Online Privacy Protection Act) and will never collect 
                personal information from children without verified parental consent.
              </p>
            </div>

            {/* Checkboxes */}
            <div style={styles.checkboxGroup}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="agreedToCoppa"
                  checked={formData.agreedToCoppa}
                  onChange={handleChange}
                  style={styles.checkbox}
                  disabled={loading}
                />
                <span style={styles.checkboxText}>
                  I certify that I am a parent/guardian and give consent for my child(ren) to use PeacePath Kids *
                </span>
              </label>
              {errors.agreedToCoppa && (
                <p style={styles.errorText}>⚠️ {errors.agreedToCoppa}</p>
              )}
            </div>

            <div style={styles.checkboxGroup}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  style={styles.checkbox}
                  disabled={loading}
                />
                <span style={styles.checkboxText}>
                  I agree to the{' '}
                  <a href="/terms" target="_blank" style={styles.link}>Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" target="_blank" style={styles.link}>Privacy Policy</a> *
                </span>
              </label>
              {errors.agreedToTerms && (
                <p style={styles.errorText}>⚠️ {errors.agreedToTerms}</p>
              )}
            </div>

            <div style={styles.checkboxGroup}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="agreedToMarketing"
                  checked={formData.agreedToMarketing}
                  onChange={handleChange}
                  style={styles.checkbox}
                  disabled={loading}
                />
                <span style={styles.checkboxText}>
                  Send me faith-based parenting tips and activity ideas (optional)
                </span>
              </label>
            </div>

            {/* Device Security Notice */}
            <div style={styles.securityNotice}>
              <h4 style={styles.securityTitle}>🔒 Device Security</h4>
              <p style={styles.securityText}>
                Your account will be linked to this device for your child's safety. 
                Contact support if you need to change devices.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitBtn,
                ...(loading && styles.submitBtnDisabled)
              }}
            >
              {loading ? (
                <>
                  <span style={styles.spinner}></span>
                  <span>Creating Account...</span>
                </>
              ) : (
                'Start Free 7-Day Trial'
              )}
            </button>

            {/* Login Link */}
            <p style={styles.loginPrompt}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/login')}
                style={styles.loginLink}
                disabled={loading}
              >
                Login here
              </button>
            </p>
          </form>
        </div>

        {/* Trust Indicators */}
        <div style={styles.trustSection}>
          <div style={styles.trustBadge}>
            <span style={styles.trustIcon}>✓</span>
            <span style={styles.trustText}>COPPA Compliant</span>
          </div>
          <div style={styles.trustBadge}>
            <span style={styles.trustIcon}>✓</span>
            <span style={styles.trustText}>Secure & Encrypted</span>
          </div>
          <div style={styles.trustBadge}>
            <span style={styles.trustIcon}>✓</span>
            <span style={styles.trustText}>No Credit Card Required</span>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F5F7FA',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '48px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    marginBottom: '32px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  logo: {
    fontSize: '3rem',
    marginBottom: '16px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#14171A',
    marginBottom: '12px'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#657786',
    lineHeight: '1.6'
  },
  alertError: {
    backgroundColor: '#F2DEDE',
    borderLeft: '4px solid #D9534F',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#A94442',
    fontSize: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#14171A'
  },
  input: {
    padding: '16px',
    fontSize: '1rem',
    border: '2px solid #E1E8ED',
    borderRadius: '12px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    fontFamily: 'inherit'
  },
  inputError: {
    borderColor: '#D9534F'
  },
  passwordContainer: {
    position: 'relative'
  },
  showPasswordBtn: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '4px',
    minWidth: 'auto',
    minHeight: 'auto'
  },
  errorText: {
    color: '#D9534F',
    fontSize: '0.9rem',
    margin: '4px 0 0 0',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  helpText: {
    fontSize: '0.9rem',
    color: '#657786',
    margin: '4px 0 0 0',
    lineHeight: '1.4'
  },
  coppaNotice: {
    backgroundColor: '#D9EDF7',
    borderLeft: '4px solid #5BC0DE',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '8px'
  },
  coppaTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#31708F',
    marginBottom: '12px'
  },
  coppaText: {
    fontSize: '1rem',
    color: '#31708F',
    lineHeight: '1.6',
    marginBottom: '8px'
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    cursor: 'pointer'
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    marginTop: '2px',
    minWidth: '20px'
  },
  checkboxText: {
    fontSize: '1rem',
    color: '#14171A',
    lineHeight: '1.5'
  },
  link: {
    color: '#4A90E2',
    textDecoration: 'underline',
    fontWeight: '600'
  },
  securityNotice: {
    backgroundColor: '#FCF8E3',
    borderLeft: '4px solid #F0AD4E',
    padding: '16px',
    borderRadius: '8px'
  },
  securityTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#8A6D3B',
    marginBottom: '8px'
  },
  securityText: {
    fontSize: '0.95rem',
    color: '#8A6D3B',
    lineHeight: '1.5'
  },
  submitBtn: {
    padding: '18px',
    fontSize: '1.2rem',
    fontWeight: '700',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '8px'
  },
  submitBtnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loginPrompt: {
    textAlign: 'center',
    fontSize: '1rem',
    color: '#657786',
    marginTop: '8px'
  },
  loginLink: {
    background: 'none',
    border: 'none',
    color: '#4A90E2',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: '0',
    fontSize: 'inherit'
  },
  trustSection: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '600px'
  },
  trustBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
  },
  trustIcon: {
    fontSize: '1.5rem',
    color: '#5CB85C'
  },
  trustText: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#14171A'
  }
};
