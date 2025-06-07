# Environment Variables Setup Guide

This guide will help you configure the necessary environment variables to fix the console errors and enable full functionality.

## Issues Fixed by This Setup

1. ✅ **Stripe key undefined** - Payment processing functionality
2. ✅ **CLARITY_PROJECT_ID 400 error** - Microsoft Clarity analytics
3. ✅ **Contact form 405 errors** - Server communication issues
4. ✅ **Missing SendGrid configuration** - Email notifications

## Frontend Environment Variables

Create a `.env` file in the **root directory** (same level as package.json) with the following variables:

```bash
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
# Get this from: https://dashboard.stripe.com/test/apikeys

# EmailJS Configuration (Optional - fallback to server if not set)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=your_confirmation_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
# Get these from: https://www.emailjs.com/

# Analytics
VITE_CLARITY_PROJECT_ID=your_clarity_project_id
# Get this from: https://clarity.microsoft.com/

# Development
VITE_API_URL=https://uplinq-backend-1.onrender.com
# For local development, use: http://localhost:4000
```

## Server Environment Variables

Create a `.env` file in the **server** directory with:

```bash
# Required for all functionality
NODE_ENV=production
PORT=4000
CLIENT_URL=https://uplinq.digital

# Stripe Configuration (Required for payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
# Get these from: https://dashboard.stripe.com/test/apikeys

# SendGrid Configuration (Required for email notifications)
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@uplinq.digital
# Get API key from: https://app.sendgrid.com/settings/api_keys

# Email Configuration
RECIPIENT_EMAIL=wayne@uplinq.digital
NOTIFICATION_EMAIL=wayne@uplinq.digital
```

## Microsoft Clarity Setup

1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Create a new project
3. Get your project ID
4. Uncomment and update the Clarity code in `index.html`:

```javascript
<!-- Microsoft Clarity -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "YOUR_ACTUAL_CLARITY_PROJECT_ID");
</script>
```

## Stripe Setup

### For Development/Testing:
1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Use test mode keys (start with `pk_test_` and `sk_test_`)
3. Set up webhook endpoint pointing to your server

### For Production:
1. Switch to live mode in Stripe dashboard
2. Use live keys (start with `pk_live_` and `sk_live_`)
3. Update webhook endpoint to production URL

## SendGrid Setup

1. Create a [SendGrid account](https://signup.sendgrid.com/)
2. Create an API key with full access
3. Verify your sender identity for `noreply@uplinq.digital`
4. Set up domain authentication (recommended)

## Quick Fix Commands

After creating the environment files, restart your services:

```bash
# Frontend (restart dev server)
npm run dev

# Server (if running locally)
cd server
npm restart

# Or redeploy to your hosting platform
```

## Verification Steps

After setup, verify everything works:

1. **Stripe**: Try a test payment on the pricing page
2. **Contact forms**: Submit a test contact form
3. **Clarity**: Check if analytics are tracking (may take a few minutes)
4. **Email notifications**: Verify emails arrive at wayne@uplinq.digital

## Environment Files Location

```
your-project/
├── .env                 # Frontend environment variables
├── package.json
├── src/
├── server/
│   ├── .env            # Server environment variables
│   ├── package.json
│   └── src/
└── README.md
```

## Security Notes

- Never commit `.env` files to git
- Add `.env` to your `.gitignore` file
- Use different keys for development and production
- Regularly rotate API keys for security

## Need Help?

If you encounter issues:
1. Check the browser console for specific error messages
2. Verify all environment variables are set correctly
3. Ensure your hosting platform has the environment variables configured
4. Test with test/sandbox keys first before using production keys

## Current Status

✅ **Fixed Issues:**
- Stripe key undefined error (now shows warning instead of crashing)
- CLARITY_PROJECT_ID 400 error (commented out until configured)
- Unused image preload warnings (removed CFO image preloads)
- Contact form API endpoints (updated to use correct URLs)

⚠️ **Requires Configuration:**
- Environment variables setup (this guide)
- Microsoft Clarity project ID
- Stripe payment processing
- SendGrid email notifications 