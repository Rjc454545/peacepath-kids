# PeacePath Kids - Complete Deployment Guide

## 🎯 Deployment Overview

This guide will walk you through deploying PeacePath Kids from start to finish. Estimated time: 2-3 hours.

---

## Phase 1: Upload to GitHub (30 minutes)

### Step 1: Install GitHub Desktop (Recommended Method)

1. Download GitHub Desktop from https://desktop.github.com
2. Install and sign in with username: **Rjc454545**
3. Click "Add" → "Create New Repository"
4. Name: `peacepath-kids`
5. Description: "Faith-based app for special needs children"
6. Click "Create Repository"

### Step 2: Add Files

1. Click "Show in Explorer" (Windows) or "Show in Finder" (Mac)
2. Copy ALL files from peacepath-kids-app folder into this directory
3. Return to GitHub Desktop
4. You'll see all files listed
5. Add commit message: "Initial commit - Complete PeacePath Kids application"
6. Click "Commit to main"
7. Click "Publish repository"
8. ✅ Your code is now on GitHub!

---

## Phase 2: Deploy to Vercel (15 minutes)

### Step 1: Connect Vercel to GitHub

1. Go to https://vercel.com
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel to access your GitHub

### Step 2: Import Project

1. Click "Add New" → "Project"
2. Find `peacepath-kids` repository
3. Click "Import"
4. Framework Preset: **Next.js** (auto-detected)
5. Root Directory: `./` (leave as is)
6. **Don't click Deploy yet!** We need to add environment variables first.

### Step 3: Add Environment Variables

Click "Environment Variables" and add these (we'll fill in values in Phase 3):

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_USER_ID=
```

**STOP HERE** - Don't deploy yet. Get API keys in Phase 3 first.

---

## Phase 3: Configure Firebase (45 minutes)

### Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add Project"
3. Name: `peacepath-kids-production`
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Enable Authentication

1. Click "Authentication" → "Get Started"
2. Click "Email/Password"
3. Enable Email/Password
4. Click "Save"

### Step 3: Create Firestore Database

1. Click "Firestore Database" → "Create Database"
2. Start in **Production mode**
3. Choose location: `us-central1` (or closest to you)
4. Click "Enable"

### Step 4: Deploy Security Rules

1. Click "Rules" tab
2. Copy content from `firestore.rules` file
3. Paste into rules editor
4. Click "Publish"

### Step 5: Get Firebase Config

1. Click ⚙️ (Settings) → "Project settings"
2. Scroll to "Your apps" → Click Web icon ( </> )
3. Register app name: "PeacePath Kids Web"
4. Copy the config values:

```javascript
const firebaseConfig = {
  apiKey: "...",              // → NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "...",          // → NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: "...",           // → NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "...",       // → NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "...",   // → NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "..."                // → NEXT_PUBLIC_FIREBASE_APP_ID
};
```

5. Add these values to Vercel Environment Variables (from Phase 2)

---

## Phase 4: Configure Stripe (30 minutes)

### Step 1: Access Your Stripe Dashboard

1. Go to https://dashboard.stripe.com
2. Sign in to your existing account

### Step 2: Create Products

1. Click "Products" → "Add Product"
2. **Product 1: Individual Plan**
   - Name: PeacePath Kids - Individual
   - Description: 1 child, all activities
   - Pricing: $6.99/month recurring
   - Click "Save Product"
   - Copy Price ID (starts with `price_`)

3. **Product 2: Family Plan**
   - Name: PeacePath Kids - Family
   - Description: Up to 4 children, all activities
   - Pricing: $12.99/month recurring
   - Click "Save Product"
   - Copy Price ID

### Step 3: Get API Keys

1. Click "Developers" → "API Keys"
2. Copy **Publishable key** (starts with `pk_`)
   → Add to Vercel as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Reveal and copy **Secret key** (starts with `sk_`)
   → Add to Vercel as `STRIPE_SECRET_KEY`

### Step 4: Update Code with Price IDs

In Vercel Environment Variables, add:
```
STRIPE_INDIVIDUAL_PRICE_ID=price_xxxxx (from step 2)
STRIPE_FAMILY_PRICE_ID=price_xxxxx (from step 2)
```

---

## Phase 5: Configure EmailJS (20 minutes)

### Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com
2. Click "Sign Up Free"
3. Create account with your Gmail: buildingonthefaithmin@gmail.com

### Step 2: Add Email Service

1. Click "Email Services" → "Add New Service"
2. Choose "Gmail"
3. Click "Connect Account"
4. Authorize EmailJS to access Gmail
5. Service ID will be created (starts with `service_`)
   → Copy to Vercel as `NEXT_PUBLIC_EMAILJS_SERVICE_ID`

### Step 3: Create Email Templates

1. Click "Email Templates" → "Create New Template"
2. **Template 1: Welcome Email**
   - Name: Welcome to PeacePath Kids
   - Subject: `Welcome to PeacePath Kids, {{user_name}}!`
   - Content: 
   ```
   Hi {{user_name}},

   Welcome to PeacePath Kids! We're excited to support your family's faith journey.

   Your 7-day free trial has begun. You now have access to all 475 activities!

   Get started: {{app_url}}

   Blessings,
   Building On The Faith Ministry
   ```
   - Save and copy Template ID → `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`

3. **Template 2: Password Reset** (optional, create similarly)
4. **Template 3: Payment Confirmation** (optional)

### Step 4: Get User ID

1. Click "Account" (top right)
2. Copy "User ID"
   → Add to Vercel as `NEXT_PUBLIC_EMAILJS_USER_ID`

---

## Phase 6: Deploy! (10 minutes)

### Step 1: Verify All Environment Variables

Go to Vercel → Your Project → Settings → Environment Variables

Make sure ALL of these are filled in:
- ✅ 6 Firebase variables
- ✅ 4 Stripe variables
- ✅ 3 EmailJS variables

### Step 2: Deploy

1. Go to Vercel → Deployments
2. Click "Redeploy" or "Deploy"
3. Wait 2-3 minutes
4. ✅ **You're LIVE!**

### Step 3: Get Your URL

Your app is now at: `https://peacepath-kids.vercel.app`
(Or your custom domain if configured)

---

## Phase 7: Post-Deployment (30 minutes)

### Step 1: Test Complete User Flow

1. Visit your live URL
2. Click "Sign Up"
3. Complete registration
4. Fill out survey
5. Access dashboard
6. ✅ Verify everything works!

### Step 2: Generate Free Ministry Codes

1. Go to: `https://your-url.vercel.app/admin`
2. Password: `PeacePath2024Admin!` (change this!)
3. Click "Generate 2,500 Codes"
4. Download the file
5. ✅ Ready to distribute to churches!

### Step 3: Update Admin Password

1. Go to Vercel → Settings → Environment Variables
2. Add: `ADMIN_PASSWORD_HASH=[your-bcrypt-hash]`
3. Generate hash at: https://bcrypt-generator.com
4. Redeploy

---

## 🎉 Launch Checklist

Before announcing to families:

- [ ] All environment variables configured
- [ ] Firebase security rules deployed
- [ ] Stripe products created and linked
- [ ] EmailJS templates created
- [ ] Full user flow tested (signup → survey → dashboard)
- [ ] Payment flow tested (use Stripe test mode)
- [ ] 2,500 free codes generated
- [ ] Admin dashboard secured with new password
- [ ] Privacy policy reviewed
- [ ] Terms of service reviewed

---

## 📧 Next Steps

### Marketing Launch

1. **Email your church database**
2. **Post on social media**
3. **Contact local churches** with free codes
4. **Reach out to special needs groups**

### Support Setup

1. Monitor buildingonthefaithmin@gmail.com daily
2. Check admin dashboard for support messages
3. Respond within 24 hours

---

## ⚠️ Troubleshooting

### "Environment variable not found"
→ Check Vercel → Settings → Environment Variables
→ Redeploy after adding variables

### "Firebase permission denied"
→ Verify firestore.rules are deployed
→ Check Firebase console → Rules tab

### "Stripe payment fails"
→ Verify Price IDs match your Stripe products
→ Check Stripe dashboard → Developers → API Keys

### "Email not sending"
→ Verify EmailJS Service is connected
→ Check template IDs match

---

## 🆘 Get Help

**Issues during deployment?**
Email: buildingonthefaithmin@gmail.com
Include: Error message and which phase you're on

---

## 🎊 Congratulations!

You've successfully deployed PeacePath Kids!

You're now serving special needs families with faith-based cognitive wellness activities.

**God bless your ministry!**

---

*"And let us not be weary in well doing: for in due season we shall reap, if we faint not." - Galatians 6:9 (KJV)*
