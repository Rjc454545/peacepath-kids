import Fingerprint2 from 'fingerprintjs2';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

// Generate device fingerprint
export const generateDeviceFingerprint = async () => {
  return new Promise((resolve) => {
    Fingerprint2.get((components) => {
      const values = components.map(component => component.value);
      const fingerprint = Fingerprint2.x64hash128(values.join(''), 31);
      resolve(fingerprint);
    });
  });
};

// Check if device is already registered
export const checkDeviceRegistration = async (userId) => {
  try {
    const deviceFingerprint = await generateDeviceFingerprint();
    const devicesRef = collection(db, 'devices');
    const q = query(devicesRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      // No device registered yet - register this one
      await addDoc(devicesRef, {
        userId,
        fingerprint: deviceFingerprint,
        registeredAt: new Date().toISOString(),
        lastAccess: new Date().toISOString()
      });
      return { allowed: true, isNewDevice: true };
    }
    
    const registeredDevice = snapshot.docs[0].data();
    
    if (registeredDevice.fingerprint === deviceFingerprint) {
      // Same device - update last access
      await updateDoc(doc(db, 'devices', snapshot.docs[0].id), {
        lastAccess: new Date().toISOString()
      });
      return { allowed: true, isNewDevice: false };
    }
    
    // Different device - not allowed
    return { 
      allowed: false, 
      isNewDevice: false,
      message: 'This account is registered to a different device. Please contact support to change devices.'
    };
  } catch (error) {
    console.error('Device check error:', error);
    return { allowed: false, error: error.message };
  }
};

// Generate user code (PPKIDS-XXXXX-12345)
export const generateUserCode = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  let letterPart = '';
  for (let i = 0; i < 5; i++) {
    letterPart += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  let numberPart = '';
  for (let i = 0; i < 5; i++) {
    numberPart += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  return `PPKIDS-${letterPart}-${numberPart}`;
};

// Generate free ministry code
export const generateFreeCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'PPKIDS-FREE-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Validate free code
export const validateFreeCode = async (code) => {
  try {
    const codesRef = collection(db, 'freeCodes');
    const q = query(codesRef, where('code', '==', code), where('used', '==', false));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return { valid: false, message: 'Invalid or already used code' };
    }
    
    return { valid: true, codeId: snapshot.docs[0].id };
  } catch (error) {
    console.error('Code validation error:', error);
    return { valid: false, message: 'Error validating code' };
  }
};

// Email validation
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Password validation - must be strong
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const errors = [];
  
  if (password.length < minLength) {
    errors.push(`At least ${minLength} characters`);
  }
  if (!hasUpperCase) {
    errors.push('One uppercase letter');
  }
  if (!hasLowerCase) {
    errors.push('One lowercase letter');
  }
  if (!hasNumbers) {
    errors.push('One number');
  }
  if (!hasSpecialChar) {
    errors.push('One special character');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Calculate age from birthdate
export const calculateAge = (birthdate) => {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// Track activity completion
export const trackActivity = async (userId, childId, activityData) => {
  try {
    const progressRef = collection(db, 'users', userId, 'progress');
    await addDoc(progressRef, {
      childId,
      activityType: activityData.type,
      activityName: activityData.name,
      category: activityData.category,
      completedAt: new Date().toISOString(),
      score: activityData.score || null,
      duration: activityData.duration || null
    });
    return { success: true };
  } catch (error) {
    console.error('Activity tracking error:', error);
    return { success: false, error: error.message };
  }
};

// Get activity statistics
export const getActivityStats = async (userId, childId, timeRange = 30) => {
  try {
    const progressRef = collection(db, 'users', userId, 'progress');
    const q = query(progressRef, where('childId', '==', childId));
    const snapshot = await getDocs(q);
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - timeRange);
    
    const activities = snapshot.docs
      .map(doc => doc.data())
      .filter(activity => new Date(activity.completedAt) > cutoffDate);
    
    const stats = {
      totalActivities: activities.length,
      byCategory: {},
      byType: {},
      averageScore: 0,
      streakDays: 0
    };
    
    activities.forEach(activity => {
      // Count by category
      stats.byCategory[activity.category] = (stats.byCategory[activity.category] || 0) + 1;
      
      // Count by type
      stats.byType[activity.activityType] = (stats.byType[activity.activityType] || 0) + 1;
    });
    
    // Calculate average score
    const scoredActivities = activities.filter(a => a.score !== null);
    if (scoredActivities.length > 0) {
      const totalScore = scoredActivities.reduce((sum, a) => sum + a.score, 0);
      stats.averageScore = Math.round(totalScore / scoredActivities.length);
    }
    
    return stats;
  } catch (error) {
    console.error('Stats error:', error);
    return null;
  }
};

// Export user data (for GDPR compliance)
export const exportUserData = async (userId) => {
  try {
    const userDoc = await getDocs(doc(db, 'users', userId));
    const userData = userDoc.data();
    
    const childrenSnapshot = await getDocs(collection(db, 'users', userId, 'children'));
    const children = childrenSnapshot.docs.map(doc => doc.data());
    
    const progressSnapshot = await getDocs(collection(db, 'users', userId, 'progress'));
    const progress = progressSnapshot.docs.map(doc => doc.data());
    
    return {
      user: userData,
      children,
      progress,
      exportedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Export error:', error);
    return null;
  }
};

// Sanitize user input (prevent XSS)
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};
