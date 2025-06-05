# EmailJS Setup Guide for Uplinq Client Portal

This guide will help you set up EmailJS to make the "Notify Me" feature work on the Client Login page.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email account
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Templates

You need to create two email templates:

### Template 1: Notification Template (for you to receive signups)

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use these settings:
   - **Template Name**: "Client Portal Notification"
   - **Template ID**: `template_notification`
   - **Subject**: `{{subject}}`
   - **Content**:
   ```
   New Client Portal Signup
   
   Email: {{user_email}}
   Signup Date: {{signup_date}}
   Message: {{message}}
   Portal URL: {{portal_url}}
   
   Best regards,
   Uplinq Digital System
   ```

### Template 2: Confirmation Template (for users)

1. Create another template
2. Use these settings:
   - **Template Name**: "Signup Confirmation"
   - **Template ID**: `template_confirmation`
   - **Subject**: `{{subject}}`
   - **To Email**: `{{to_email}}`
   - **To Name**: `{{to_name}}`
   - **From Name**: `{{from_name}}`
   - **Reply To**: `{{reply_to}}`
   - **Content**:
   ```
   Hi {{to_name}}!
   
   {{message}}
   
   If you have any questions, feel free to reply to this email.
   
   Best regards,
   {{from_name}}
   ```

**Important:** Make sure to set the **To Email** field in your template settings to `{{to_email}}` - this is crucial for the confirmation emails to work!

## Step 4: Get Your Public Key

1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (it looks like a random string)
3. Copy this key

## Step 5: Configure Environment Variables

Create a `.env.local` file in your project root with the following content:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=template_notification
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=template_confirmation
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_NOTIFICATION_EMAIL=your-email@domain.com
```

Replace the values with your actual EmailJS credentials:
- `your_service_id_here` → Your Service ID from Step 2
- `your_public_key_here` → Your Public Key from Step 4
- `your-email@domain.com` → The email where you want to receive notifications

## Step 6: Test the Setup

1. Restart your development server (`npm run dev`)
2. Navigate to the Client Login page
3. Enter a test email and click "Notify Me"
4. You should receive an email at your notification address
5. The user should see a success message

## Troubleshooting

### Common Issues:

1. **"EmailJS error" in console**:
   - Check that all environment variables are set correctly
   - Verify your Service ID and Public Key
   - Make sure your email service is properly connected

2. **Emails not sending**:
   - Check your EmailJS dashboard for quota limits (free plan has 200 emails/month)
   - Verify your email templates have the correct variable names
   - Check spam folder

3. **Template variables not working**:
   - Make sure template variable names match exactly (case-sensitive)
   - Use `{{variable_name}}` format in templates

### Environment Variables Not Loading:

If environment variables aren't working:
1. Make sure `.env.local` is in your project root (same level as `package.json`)
2. Restart your dev server after adding variables
3. Variables must start with `VITE_` in Vite projects

## Free Plan Limitations

EmailJS free plan includes:
- 200 emails per month
- 1 email service
- 2 email templates
- Basic support

For production use, consider upgrading to a paid plan for higher limits and better support.

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your Public Key secure (though it's meant to be used client-side)
- Consider implementing rate limiting for production use
- Monitor your EmailJS usage to avoid exceeding quotas

## Need Help?

If you encounter issues:
1. Check the EmailJS documentation: https://www.emailjs.com/docs/
2. Review their troubleshooting guide
3. Contact EmailJS support for account-specific issues

The notification system is now ready to use! 