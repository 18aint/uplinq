# Email Configuration Guide

## Current Status
✅ **Forms working** - Both Loom confirmation and Client login show success messages  
⚠️ **Emails not sending** - Email services need configuration

## Quick Fix (Production Ready)

### Option 1: EmailJS Setup (Recommended)

1. **Create EmailJS Account**
   - Go to [emailjs.com](https://emailjs.com) and sign up
   - Connect your Gmail/email service
   - Create 2 templates (see EMAILJS_SETUP.md)

2. **Create .env.local file** in project root:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=template_notification  
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=template_confirmation
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_NOTIFICATION_EMAIL=wayne@uplinq.digital
```

3. **Restart development server**:
```bash
npm run dev
```

### Option 2: Server Backend (Current Setup)

The server in `/server` directory uses SendGrid. To activate:

1. **Get SendGrid API Key**
   - Sign up at [sendgrid.com](https://sendgrid.com)
   - Create API key with Mail Send permissions

2. **Deploy server** with environment variables:
```env
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@uplinq.digital
CLIENT_URL=https://uplinq.digital
```

3. **Update frontend endpoints** to point to your deployed server

## Testing

### Currently (Without Config):
- ✅ Forms submit successfully
- ✅ User sees confirmation messages  
- ⚠️ No actual emails sent
- ✅ Console logs show form data

### After EmailJS Config:
- ✅ Notification emails → wayne@uplinq.digital
- ✅ Confirmation emails → users
- ✅ 200 emails/month free limit

### After Server Config:
- ✅ All emails via SendGrid
- ✅ Unlimited sending (paid)
- ✅ Better deliverability

## Troubleshooting

**"No emails received"** = Expected without configuration  
**"Form shows success"** = ✅ Working correctly  
**"Console shows logs"** = ✅ Data captured properly

The forms are working perfectly - they just need email service configuration for production use. 