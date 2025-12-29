import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, setPersistence, browserSessionPersistence, browserLocalPersistence } from 'firebase/auth';
import { checkDeviceRegistration } from '../utils/helpers';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Set persistence based on remember me checkbox
      await setPersistence(auth, formData.rememberMe ? browserLocalPersistence : browserSessionPersistence);

      // Sign in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Check device registration
      const deviceCheck = await checkDeviceRegistration(userCredential.user.uid);
      
      if (!deviceCheck.allowed) {
        // Device not allowed
        await auth.signOut();
        setErrors({ 
          general: deviceCheck.message || 'This account is registered to a different device. Please contact support.' 
        });
        setLoading(false);
        return;
      }

      // Successful login - redirect to dashboard
      router.push('/dashboard');

    } catch (error) {
      console.error('Login error:', error);
      
      if (error.code === 'auth/user-not-found') {
        setErrors({ email: 'No account found with this email' });
      } else if (error.code === 'auth/wrong-password') {
        setErrors({ password: 'Incorrect password' });
      } else if (error.code === 'auth/too-many-requests') {
        setErrors({ general: 'Too many failed attempts. Please try again later or reset your password.' });
      } else if (error.code === 'auth/user-disabled') {
        setErrors({ general: 'This account has been disabled. Please contact support.' });
      } else {
        setErrors({ general: 'Login failed. Please check your credentials and try again.' });
      }
      
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setResetError('Please enter your email address');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSent(true);
      setResetError('');
      
      // Close modal after 3 seconds
      setTimeout(() => {
        setShowResetModal(false);
        setResetSent(false);
        setResetEmail('');
      }, 3000);
      
    } catch (error) {
      console.error('Password reset error:', error);
      
      if (error.code === 'auth/user-not-found') {
        setResetError('No account found with this email');
      } else if (error.code === 'auth/invalid-email') {
        setResetError('Invalid email address');
      } else {
        setResetError('Failed to send reset email. Please try again.');
      }
    }
  };

  const openResetModal = () => {
    setShowResetModal(true);
    setResetEmail(formData.email);
    setResetError('');
    setResetSent(false);
  };

  return (
    <>
      <Head>
        <title>Login - PeacePath Kids</title>
        <meta name="description" content="Login to your PeacePath Kids account" />
      </Head>

      <div style={styles.container}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.logo}>🕊️💝✝️</div>
            <h1 style={styles.title}>Welcome Back!</h1>
            <p style={styles.subtitle}>
              Login to continue your child's faith journey
            </p>
          </div>

          {/* General Error */}
          {errors.general && (
            <div style={styles.alertError}>
              <span>⚠️</span>
              <span>{errors.general}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Email */}
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email Address
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
                autoComplete="email"
              />
              {errors.email && (
                <p style={styles.errorText}>⚠️ {errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  style={{
                    ...styles.input,
                    ...(errors.password && styles.inputError)
                  }}
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.showPasswordBtn}
                  disabled={loading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <p style={styles.errorText}>⚠️ {errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={styles.optionsRow}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  style={styles.checkbox}
                  disabled={loading}
                />
                <span style={styles.checkboxText}>Remember me (30 days)</span>
              </label>
              <button
                type="button"
                onClick={openResetModal}
                style={styles.forgotPassword}
                disabled={loading}
              >
                Forgot password?
              </button>
            </div>

            {/* Device Security Notice */}
            <div style={styles.securityNotice}>
              <h4 style={styles.securityTitle}>🔒 Device Security</h4>
              <p style={styles.securityText}>
                For your child's safety, this account can only be accessed from the registered device. 
                If you're logging in from a new device, please contact support.
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
                  <span>Logging in...</span>
                </>
              ) : (
                'Login'
              )}
            </button>

            {/* Signup Link */}
            <p style={styles.signupPrompt}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/signup')}
                style={styles.signupLink}
                disabled={loading}
              >
                Sign up for free
              </button>
            </p>
          </form>
        </div>

        {/* Help Section */}
        <div style={styles.helpSection}>
          <p style={styles.helpText}>
            Need help?{' '}
            <button
              onClick={() => router.push('/welcome')}
              style={styles.helpLink}
            >
              Visit our Help Center
            </button>
          </p>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showResetModal && (
        <div style={styles.modalOverlay} onClick={() => setShowResetModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Reset Password</h2>
              <button
                onClick={() => setShowResetModal(false)}
                style={styles.modalClose}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {resetSent ? (
              <div style={styles.resetSuccess}>
                <div style={styles.successIcon}>✓</div>
                <h3 style={styles.successTitle}>Check Your Email</h3>
                <p style={styles.successText}>
                  We've sent password reset instructions to <strong>{resetEmail}</strong>
                </p>
                <p style={styles.successSubtext}>
                  Please check your inbox and follow the link to reset your password.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePasswordReset} style={styles.resetForm}>
                <p style={styles.modalText}>
                  Enter your email address and we'll send you instructions to reset your password.
                </p>

                {resetError && (
                  <div style={styles.alertError}>
                    <span>⚠️</span>
                    <span>{resetError}</span>
                  </div>
                )}

                <div style={styles.formGroup}>
                  <label htmlFor="resetEmail" style={styles.label}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="resetEmail"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.modalActions}>
                  <button
                    type="button"
                    onClick={() => setShowResetModal(false)}
                    style={styles.modalBtnSecondary}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={styles.modalBtnPrimary}
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '48px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    marginBottom: '24px'
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
  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  checkboxText: {
    fontSize: '0.95rem',
    color: '#14171A'
  },
  forgotPassword: {
    background: 'none',
    border: 'none',
    color: '#4A90E2',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: '0',
    fontSize: '0.95rem'
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
    gap: '12px'
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
  signupPrompt: {
    textAlign: 'center',
    fontSize: '1rem',
    color: '#657786'
  },
  signupLink: {
    background: 'none',
    border: 'none',
    color: '#4A90E2',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: '0',
    fontSize: 'inherit'
  },
  helpSection: {
    textAlign: 'center'
  },
  helpText: {
    fontSize: '1rem',
    color: '#657786'
  },
  helpLink: {
    background: 'none',
    border: 'none',
    color: '#4A90E2',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: '0',
    fontSize: 'inherit'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '32px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  modalTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#14171A'
  },
  modalClose: {
    background: 'none',
    border: 'none',
    fontSize: '1.8rem',
    cursor: 'pointer',
    color: '#657786',
    padding: '4px',
    minWidth: 'auto',
    minHeight: 'auto'
  },
  modalText: {
    fontSize: '1rem',
    color: '#657786',
    lineHeight: '1.6',
    marginBottom: '24px'
  },
  resetForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '8px'
  },
  modalBtnSecondary: {
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '600',
    backgroundColor: '#E1E8ED',
    color: '#14171A',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  modalBtnPrimary: {
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '700',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  resetSuccess: {
    textAlign: 'center',
    padding: '20px'
  },
  successIcon: {
    fontSize: '4rem',
    color: '#5CB85C',
    marginBottom: '16px'
  },
  successTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#14171A',
    marginBottom: '12px'
  },
  successText: {
    fontSize: '1.1rem',
    color: '#657786',
    lineHeight: '1.6',
    marginBottom: '8px'
  },
  successSubtext: {
    fontSize: '1rem',
    color: '#AAB8C2'
  }
};
