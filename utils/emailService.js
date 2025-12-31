// ============================================
// PEACEPATH KIDS - EMAIL SERVICE
// ============================================
// This file handles ALL email sending via EmailJS
// Connected to 30 email templates in EmailJS dashboard
// ============================================

import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_i2httut'; // Your Gmail service
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Send email via EmailJS
 */
async function sendEmail(templateId, templateParams) {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      templateId,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    
    console.log(`✅ Email sent: ${templateId}`, response);
    return { success: true, response };
  } catch (error) {
    console.error(`❌ Email failed: ${templateId}`, error);
    return { success: false, error };
  }
}

// ============================================
// MILESTONE CELEBRATION EMAILS
// ============================================

/**
 * Email #1: First Activity Complete
 */
export async function sendFirstActivityEmail(userData, activityName) {
  const templateParams = {
    to_name: userData.firstName,
    to_email: userData.email,
    child_name: userData.children?.[0]?.name || 'your child',
    activity_name: activityName
  };
  
  return await sendEmail('peacepath_first_activity', templateParams);
}

/**
 * Email #2: 7-Day Streak Complete
 */
export async function send7DayStreakEmail(userData, streakData) {
  const templateParams = {
    to_name: userData.firstName,
    to_email: userData.email,
    child_name: userData.children?.[0]?.name || 'your child',
    current_streak: streakData.currentStreak
  };
  
  return await sendEmail('peacepath_7day_streak', templateParams);
}

/**
 * Email #10: 30 Activities Milestone
 */
export async function send30ActivitiesEmail(userData, progressData) {
  const templateParams = {
    to_name: userData.firstName,
    to_email: userData.email,
    child_name: userData.children?.[0]?.name || 'your child',
    activities_completed: progressData.totalActivities
  };
  
  return await sendEmail('peacepath_30_activities', templateParams);
}

/**
 * Email #22: 50 Activities Milestone
 */
export async function send50ActivitiesEmail(userData, progressData) {
  const templateParams = {
    to_name: userData.firstName,
    to_email: userData.email,
    child_name: userData.children?.[0]?.name || 'your child',
    activities_completed: 50,
    days_active: progressData.activeDays
  };
  
  return await sendEmail('peacepath_50_activities', templateParams);
}

/**
 * Email #23: 100 Activities Milestone (LEGENDARY!)
 */
export async function send100ActivitiesEmail(userData, progressData) {
  const templateParams = {
    to_name: userData.firstName,
    to_email: userData.email,
    child_name: userData.children?.[0]?.name || 'your child',
    activities_completed: 100,
    active_days: progressData.activeDays,
    longest_streak: progressData.longestStreak,
    categories_completed: progressData.categoriesCompleted,
    estimated_hours: Math.round((100 * 15) / 60)
  };
  
  return await sendEmail('peacepath_100_activities', templateParams);
}

// ============================================
// ONBOARDING SEQUENCE EMAILS
// ============================================

/**
 * Email #3: Onboarding Day 1
 */
export async function sendOnboardingDay1(userData) {
  const templateParams = {
    to_name: userData.firstName,
    to_email: userData.email,
    child_name: userData.children?.[0]?.name || 'your child'
  };
  
  return await sendEmail('peacepath_onboard_1', templateParams);
}

// ============================================
// EXPORT ALL FUNCTIONS
// ============================================

export default {
  sendFirstActivityEmail,
  send7DayStreakEmail,
  send30ActivitiesEmail,
  send50ActivitiesEmail,
  send100ActivitiesEmail,
  sendOnboardingDay1
};
