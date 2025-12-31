// ============================================
// PEACEPATH KIDS - EMAIL AUTOMATION
// ============================================
// This file determines WHEN to send emails
// ============================================

import emailService from './emailService';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

// ============================================
// CHECK IF EMAIL WAS SENT (prevent duplicates)
// ============================================

async function wasEmailSent(userId, emailType) {
  try {
    const emailDoc = await getDoc(doc(db, 'sentEmails', `${userId}_${emailType}`));
    return emailDoc.exists();
  } catch (error) {
    console.error('Error checking sent email:', error);
    return false;
  }
}

// ============================================
// MARK EMAIL AS SENT
// ============================================

async function markEmailSent(userId, emailType) {
  try {
    await setDoc(doc(db, 'sentEmails', `${userId}_${emailType}`), {
      userId,
      emailType,
      sentAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error marking email sent:', error);
  }
}

// ============================================
// GET USER DATA
// ============================================

async function getUserData(userId) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) return null;
    
    return {
      userId,
      ...userDoc.data()
    };
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}

// ============================================
// GET PROGRESS DATA
// ============================================

async function getProgressData(userId) {
  try {
    const progressDoc = await getDoc(doc(db, 'activityProgress', userId));
    if (!progressDoc.exists()) {
      return {
        totalActivities: 0,
        activeDays: 0,
        currentStreak: 0,
        longestStreak: 0
      };
    }
    
    return progressDoc.data();
  } catch (error) {
    console.error('Error getting progress data:', error);
    return {
      totalActivities: 0,
      activeDays: 0,
      currentStreak: 0,
      longestStreak: 0
    };
  }
}

// ============================================
// EMAIL TRIGGERS
// ============================================

/**
 * Trigger: When user signs up (Day 1)
 */
export async function onUserSignup(userId) {
  const alreadySent = await wasEmailSent(userId, 'onboard_day1');
  if (alreadySent) return;
  
  const userData = await getUserData(userId);
  if (!userData) return;
  
  await emailService.sendOnboardingDay1(userData);
  await markEmailSent(userId, 'onboard_day1');
}

/**
 * Trigger: When user completes their FIRST activity
 */
export async function onFirstActivityComplete(userId, activityName) {
  const alreadySent = await wasEmailSent(userId, 'first_activity');
  if (alreadySent) return;
  
  const userData = await getUserData(userId);
  if (!userData) return;
  
  await emailService.sendFirstActivityEmail(userData, activityName);
  await markEmailSent(userId, 'first_activity');
}

/**
 * Trigger: When user achieves 7-day streak
 */
export async function on7DayStreak(userId) {
  const alreadySent = await wasEmailSent(userId, '7day_streak');
  if (alreadySent) return;
  
  const userData = await getUserData(userId);
  const progressData = await getProgressData(userId);
  
  if (!userData || progressData.currentStreak < 7) return;
  
  await emailService.send7DayStreakEmail(userData, progressData);
  await markEmailSent(userId, '7day_streak');
}

/**
 * Trigger: When user completes 30 activities
 */
export async function on30Activities(userId) {
  const alreadySent = await wasEmailSent(userId, '30_activities');
  if (alreadySent) return;
  
  const userData = await getUserData(userId);
  const progressData = await getProgressData(userId);
  
  if (!userData || progressData.totalActivities < 30) return;
  
  await emailService.send30ActivitiesEmail(userData, progressData);
  await markEmailSent(userId, '30_activities');
}

/**
 * Trigger: When user completes 50 activities
 */
export async function on50Activities(userId) {
  const alreadySent = await wasEmailSent(userId, '50_activities');
  if (alreadySent) return;
  
  const userData = await getUserData(userId);
  const progressData = await getProgressData(userId);
  
  if (!userData || progressData.totalActivities < 50) return;
  
  await emailService.send50ActivitiesEmail(userData, progressData);
  await markEmailSent(userId, '50_activities');
}

/**
 * Trigger: When user completes 100 activities (LEGENDARY!)
 */
export async function on100Activities(userId) {
  const alreadySent = await wasEmailSent(userId, '100_activities');
  if (alreadySent) return;
  
  const userData = await getUserData(userId);
  const progressData = await getProgressData(userId);
  
  if (!userData || progressData.totalActivities < 100) return;
  
  await emailService.send100ActivitiesEmail(userData, progressData);
  await markEmailSent(userId, '100_activities');
}

// ============================================
// EXPORT ALL TRIGGERS
// ============================================

export default {
  onUserSignup,
  onFirstActivityComplete,
  on7DayStreak,
  on30Activities,
  on50Activities,
  on100Activities
};
