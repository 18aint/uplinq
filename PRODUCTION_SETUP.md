# Production Setup Guide for Vercel

## 🚀 Environment Variables Required for Production

To make the email functionality work in production, you need to configure these environment variables in your **Vercel Dashboard**:

### 1. Go to Vercel Dashboard
1. Navigate to your project: `https://vercel.com/your-username/uplinq`
2. Go to **Settings** → **Environment Variables**

### 2. Add EmailJS Configuration Variables

Add these variables (get values from your EmailJS dashboard):

```bash
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_your_service_id
VITE_EMAILJS_TEMPLATE_ID=template_your_template_id  
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=template_confirmation
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_NOTIFICATION_EMAIL=wayne@uplinq.digital
```

### 3. Other Required Variables

```bash
# Stripe (if payment functionality needed)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key

# Analytics
VITE_CLARITY_PROJECT_ID=your_clarity_project_id
```

## 📧 EmailJS Account Setup

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up and verify your email

### Step 2: Create Email Service
1. Dashboard → **Email Services** → **Add New Service**
2. Choose Gmail/Outlook and connect your `wayne@uplinq.digital` account
3. Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Templates

#### Template 1: Notification Template
- **Template ID**: `template_notification`
- **Subject**: `{{subject}}`
- **Content**:
```
New submission from Uplinq Digital website!

From: {{from_name}} ({{user_email}})
Type: {{request_type}}
Date: {{signup_date}}

Message:
{{message}}

---
Uplinq Digital System
```

#### Template 2: Confirmation Template  
- **Template ID**: `template_confirmation`
- **To Email**: `{{to_email}}`
- **To Name**: `{{to_name}}`
- **From Name**: `{{from_name}}`
- **Reply To**: `{{reply_to}}`
- **Subject**: `{{subject}}`
- **Content**:
```
Hi {{to_name}}!

{{message}}

Best regards,
{{from_name}}
```

### Step 4: Get Public Key
1. Dashboard → **Account** → Copy your **Public Key**

## 🔧 Deployment Process

### Option 1: Manual Deploy
1. Set environment variables in Vercel dashboard
2. Push code to main branch
3. Vercel auto-deploys with new environment variables

### Option 2: CLI Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy with environment variables
vercel --prod
```

## ✅ Testing Production

After deployment, test these features:

1. **Loom Confirmation** (`/loom-confirmation`)
   - Enter email → Should send to Wayne + user confirmation

2. **Client Portal Signup** (`/client-login`)
   - Enter email → Should send notification + confirmation

3. **Check Console**
   - Should see "Emails sent successfully!" 
   - No "EmailJS not configured" warnings

## 🚨 Troubleshooting

### "EmailJS not configured" Warning
- ✅ Check Vercel environment variables are set
- ✅ Redeploy after adding variables
- ✅ Verify EmailJS Service ID and Template IDs exist

### Emails Not Sending
- ✅ Check EmailJS dashboard for quota limits
- ✅ Verify email service is connected
- ✅ Check spam folders

### Environment Variables Not Loading
- ✅ Must start with `VITE_` for client-side access
- ✅ Redeploy after adding variables
- ✅ Check variable names match exactly

## 📊 Fallback Behavior

If EmailJS fails:
- ✅ User still sees success message
- ✅ Email addresses are logged for manual follow-up
- ✅ No broken user experience
- ✅ Console logs show what needs manual attention

## 🔐 Security Notes

- EmailJS Public Key is safe to use client-side
- Never expose Service ID in public repositories
- Monitor EmailJS usage for quota limits
- Consider upgrading EmailJS plan for production volume

---

## Quick Setup Checklist

- [ ] EmailJS account created
- [ ] Email service connected
- [ ] 2 email templates created
- [ ] Environment variables added to Vercel
- [ ] Code deployed to production
- [ ] Email functionality tested

Once complete, both email flows will work reliably in production! 🎉 