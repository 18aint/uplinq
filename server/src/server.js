import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import sgMail from '@sendgrid/mail';

// Load environment variables
dotenv.config();

// Debug environment variables
console.log('Environment variables loaded:');
console.log('CLIENT_URL:', process.env.CLIENT_URL);
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not set');
console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'Set' : 'Not set');

// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for file uploads

// Set the recipient email for all form submissions
const RECIPIENT_EMAIL = 'wayne@uplinq.digital';

// Routes
app.get('/', (req, res) => {
  res.send('Uplinq API Server is running');
});

// Create a Stripe checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId, productName, productDescription, mode } = req.body;

    console.log('Stripe Secret Key (first 10):', process.env.STRIPE_SECRET_KEY.slice(0, 10));
    console.log('Price ID received:', priceId);
    console.log('Stripe Account Mode:', process.env.STRIPE_SECRET_KEY.startsWith('sk_live_') ? 'LIVE' : 'TEST');
    console.log('Checkout mode:', mode);

    // Default to 'payment' if mode is not provided
    const checkoutMode = mode === 'subscription' ? 'subscription' : 'payment';

    // For Website Audit or Starter Kit, create dynamic pricing
    let sessionConfig;
    
    if (productName === 'Comprehensive Website Audit Report') {
      // Create session with dynamic pricing for Website Audit
      sessionConfig = {
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: 'Website Audit - Full Report',
                description: productDescription || 'Comprehensive website analysis with detailed recommendations and action plan',
              },
              unit_amount: 29700, // £297.00 in pence
            },
            quantity: 1,
          }
        ],
        mode: checkoutMode,
        success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/website-audit`,
        metadata: {
          productName,
          productDescription
        }
      };
    } else if (productName === 'Website Performance Starter Kit' || productName === 'UplinqPro Digital Toolkit') {
      // Create session for Starter Kit / UplinqPro
      sessionConfig = {
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: productName.includes('UplinqPro') ? 'UplinqPro - Digital Optimization Toolkit' : 'Website Performance Starter Kit',
                description: productDescription || 'Professional website optimization toolkit with templates, automations, and growth strategies',
              },
              unit_amount: 1900, // £19.00 in pence
            },
            quantity: 1,
          }
        ],
        mode: 'payment', // Always one-time payment for starter kit
        success_url: `${process.env.CLIENT_URL}/starter-kit-success?session_id={CHECKOUT_SESSION_ID}&email=${req.body.email}`,
        cancel_url: `${process.env.CLIENT_URL}/starter-kit`,
        metadata: {
          productName,
          productDescription,
          customerEmail: req.body.email
        }
      };
    } else {
      // Fallback to original price ID method for other products
      if (!priceId) {
        return res.status(400).json({ error: 'Price ID is required for this product' });
      }
      
      sessionConfig = {
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          }
        ],
        mode: checkoutMode,
        success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/pricing`,
        metadata: {
          productName,
          productDescription
        }
      };
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a payment intent
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', description } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook to handle Stripe events
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Payment successful for session:', session.id);
        
        // Send payment notification email to Wayne
        if (process.env.SENDGRID_API_KEY) {
          try {
            const msg = {
              to: RECIPIENT_EMAIL,
              from: process.env.SENDGRID_FROM_EMAIL || 'noreply@uplinq.digital',
              subject: `💰 New Payment Received - ${session.amount_total / 100} ${session.currency.toUpperCase()}`,
              text: `New payment received!

Payment Details:
Session ID: ${session.id}
Amount: ${session.amount_total / 100} ${session.currency.toUpperCase()}
Customer Email: ${session.customer_details?.email || 'Not provided'}
Payment Status: ${session.payment_status}
Customer Name: ${session.customer_details?.name || 'Not provided'}

Metadata:
${Object.entries(session.metadata || {}).map(([key, value]) => `${key}: ${value}`).join('\n') || 'None'}

This payment has been successfully processed through Stripe.`,
              html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px;">
    <h1 style="color: white; text-align: center; margin: 0;">💰 New Payment Received!</h1>
  </div>
  
  <div style="background: white; padding: 30px; border: 1px solid #e1e5e9; border-radius: 8px; margin-top: 20px;">
    <h2 style="color: #333; margin-top: 0;">Payment Details</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f8f9fa;">
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Session ID:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${session.id}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Amount:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6; color: #28a745; font-size: 18px; font-weight: bold;">${session.amount_total / 100} ${session.currency.toUpperCase()}</td>
      </tr>
      <tr style="background: #f8f9fa;">
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Customer Email:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${session.customer_details?.email || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Customer Name:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${session.customer_details?.name || 'Not provided'}</td>
      </tr>
      <tr style="background: #f8f9fa;">
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Payment Status:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6; color: #28a745; font-weight: bold;">${session.payment_status}</td>
      </tr>
    </table>
    
    ${Object.keys(session.metadata || {}).length > 0 ? `
    <h3 style="color: #333; margin-top: 20px;">Additional Information:</h3>
    <ul>
      ${Object.entries(session.metadata || {}).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
    </ul>
    ` : ''}
    
    <div style="background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 8px; margin-top: 20px;">
      <strong>✅ This payment has been successfully processed through Stripe.</strong>
    </div>
  </div>
</div>
`,
            };
            
            await sgMail.send(msg);
            console.log('Payment notification email sent to', RECIPIENT_EMAIL);
          } catch (emailError) {
            console.error('Error sending payment notification email:', emailError);
          }
        }
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('Payment failed for payment intent:', failedPayment.id);
        
        // Send failed payment notification email to Wayne
        if (process.env.SENDGRID_API_KEY) {
          try {
            const msg = {
              to: RECIPIENT_EMAIL,
              from: process.env.SENDGRID_FROM_EMAIL || 'noreply@uplinq.digital',
              subject: `⚠️ Payment Failed - ${failedPayment.amount / 100} ${failedPayment.currency.toUpperCase()}`,
              text: `Payment failed notification:

Payment Intent ID: ${failedPayment.id}
Amount: ${failedPayment.amount / 100} ${failedPayment.currency.toUpperCase()}
Customer Email: ${failedPayment.receipt_email || 'Not provided'}
Failure Code: ${failedPayment.last_payment_error?.code || 'Unknown'}
Failure Message: ${failedPayment.last_payment_error?.message || 'No specific error message'}

You may want to follow up with the customer to resolve the payment issue.`,
              html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 20px; border-radius: 12px;">
    <h1 style="color: white; text-align: center; margin: 0;">⚠️ Payment Failed</h1>
  </div>
  
  <div style="background: white; padding: 30px; border: 1px solid #e1e5e9; border-radius: 8px; margin-top: 20px;">
    <h2 style="color: #333; margin-top: 0;">Failed Payment Details</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f8f9fa;">
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Payment Intent ID:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${failedPayment.id}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Amount:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6; color: #dc3545; font-size: 18px; font-weight: bold;">${failedPayment.amount / 100} ${failedPayment.currency.toUpperCase()}</td>
      </tr>
      <tr style="background: #f8f9fa;">
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Customer Email:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${failedPayment.receipt_email || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Failure Code:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6; color: #dc3545;">${failedPayment.last_payment_error?.code || 'Unknown'}</td>
      </tr>
      <tr style="background: #f8f9fa;">
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Failure Message:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${failedPayment.last_payment_error?.message || 'No specific error message'}</td>
      </tr>
    </table>
    
    <div style="background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 15px; border-radius: 8px; margin-top: 20px;">
      <strong>⚠️ You may want to follow up with the customer to resolve the payment issue.</strong>
    </div>
  </div>
</div>
`,
            };
            
            await sgMail.send(msg);
            console.log('Failed payment notification email sent to', RECIPIENT_EMAIL);
          } catch (emailError) {
            console.error('Error sending failed payment notification email:', emailError);
          }
        }
        break;
        
      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        console.log('Invoice payment succeeded:', invoice.id);
        
        // Send invoice payment notification email to Wayne
        if (process.env.SENDGRID_API_KEY) {
          try {
            const msg = {
              to: RECIPIENT_EMAIL,
              from: process.env.SENDGRID_FROM_EMAIL || 'noreply@uplinq.digital',
              subject: `📄 Invoice Payment Received - ${invoice.amount_paid / 100} ${invoice.currency.toUpperCase()}`,
              text: `Invoice payment received:

Invoice ID: ${invoice.id}
Amount Paid: ${invoice.amount_paid / 100} ${invoice.currency.toUpperCase()}
Customer Email: ${invoice.customer_email || 'Not provided'}
Subscription: ${invoice.subscription || 'N/A'}
Period: ${new Date(invoice.period_start * 1000).toLocaleDateString()} - ${new Date(invoice.period_end * 1000).toLocaleDateString()}

This indicates a successful recurring payment.`,
              html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 20px; border-radius: 12px;">
    <h1 style="color: white; text-align: center; margin: 0;">📄 Invoice Payment Received</h1>
  </div>
  
  <div style="background: white; padding: 30px; border: 1px solid #e1e5e9; border-radius: 8px; margin-top: 20px;">
    <h2 style="color: #333; margin-top: 0;">Invoice Payment Details</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f8f9fa;">
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Invoice ID:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${invoice.id}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Amount Paid:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6; color: #28a745; font-size: 18px; font-weight: bold;">${invoice.amount_paid / 100} ${invoice.currency.toUpperCase()}</td>
      </tr>
      <tr style="background: #f8f9fa;">
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Customer Email:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${invoice.customer_email || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Subscription:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${invoice.subscription || 'N/A'}</td>
      </tr>
      <tr style="background: #f8f9fa;">
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Period:</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${new Date(invoice.period_start * 1000).toLocaleDateString()} - ${new Date(invoice.period_end * 1000).toLocaleDateString()}</td>
      </tr>
    </table>
    
    <div style="background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 8px; margin-top: 20px;">
      <strong>✅ This indicates a successful recurring payment.</strong>
    </div>
  </div>
</div>
`,
            };
            
            await sgMail.send(msg);
            console.log('Invoice payment notification email sent to', RECIPIENT_EMAIL);
          } catch (emailError) {
            console.error('Error sending invoice payment notification email:', emailError);
          }
        }
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

// Handle contact form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, details, file, source, requestType } = req.body;
    
    // Validate required fields
    if (!name || !email || !details) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, and details are required' 
      });
    }
    
    // Log the submission
    console.log('Contact form submission received:', { 
      name, email, details: details.substring(0, 100) + '...', 
      // Don't log the entire file for privacy reasons
      hasFile: !!file,
      source: source || 'unknown',
      requestType: requestType || 'general',
      // Always sent to our designated recipient
      sentTo: RECIPIENT_EMAIL
    });
    
    // Send email notification if SendGrid is configured
    if (process.env.SENDGRID_API_KEY) {
      try {
        let notificationSubject, notificationHtml, userConfirmationSubject, userConfirmationHtml;
        
        // Handle different request types
        if (requestType === 'audit_video') {
          // Notification email to Wayne for audit requests
          notificationSubject = '🎯 New Video Audit Request - Apollo Campaign Lead';
          notificationHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New Video Audit Request</h1>
                <p style="color: #e2e8f0; margin: 10px 0 0 0;">Apollo Campaign Lead</p>
              </div>
              
              <div style="padding: 30px; background: #f8fafc;">
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <h3 style="color: #2d3748; margin-top: 0;">📧 Lead Details:</h3>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Source:</strong> ${source}</p>
                  <p><strong>Request:</strong> Personalized website audit video</p>
                  <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                  
                  <div style="background: #fef2e7; border-left: 4px solid #f6ad55; padding: 15px; margin: 20px 0; border-radius: 4px;">
                    <p style="margin: 0; color: #744210;"><strong>⏰ Action Required:</strong></p>
                    <p style="margin: 5px 0 0 0; color: #744210;">Create and send personalized audit video within 24 hours to maintain trust.</p>
                  </div>
                  
                  <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                    <p style="color: #4a5568; font-size: 14px; margin: 0;">
                      This lead came from your Apollo campaign. Respond quickly to maximize conversion potential.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `;
          
          // Confirmation email to the user
          userConfirmationSubject = 'Your Uplinq Audit Video is Being Sent';
          userConfirmationHtml = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
              <!-- Banner Header -->
              <div style="text-align: center; padding: 30px 20px; background: #ffffff; border-bottom: 1px solid #f3f4f6;">
                <img src="https://uplinq.digital/banner.png" alt="Uplinq Digital - Modern Web Solutions for Business Growth" style="max-width: 100%; max-height: 80px; height: auto; display: block; margin: 0 auto;">
              </div>
              
              <!-- Main Content -->
              <div style="background: #ffffff; padding: 50px 40px;">
                <h1 style="color: #111827; margin: 0 0 30px 0; font-size: 28px; font-weight: 300; line-height: 1.2; text-align: center;">Hello there! 👋</h1>
                
                <p style="color: #6b7280; line-height: 1.6; margin: 0 0 40px 0; font-size: 16px; text-align: center;">
                  Thank you for requesting your personalised website audit video. We're excited to help you unlock your website's potential.
                </p>
                
                <!-- What happens next section -->
                <div style="border-left: 3px solid #3b82f6; padding: 25px 30px; margin: 40px 0; background: #f9fafb;">
                  <h2 style="color: #374151; margin: 0 0 20px 0; font-size: 18px; font-weight: 500;">What happens next:</h2>
                  <div style="color: #6b7280; line-height: 1.7; font-size: 15px;">
                    <p style="margin: 0 0 12px 0;">• Our team will analyse your website thoroughly</p>
                    <p style="margin: 0 0 12px 0;">• We'll create a personalised video review</p>
                    <p style="margin: 0; font-weight: 500; color: #374151;">• You'll receive your video within 24 hours</p>
                  </div>
                </div>
                
                <!-- What's included section -->
                <div style="border-left: 3px solid #e5e7eb; padding: 25px 30px; margin: 40px 0; background: #f9fafb;">
                  <h2 style="color: #374151; margin: 0 0 20px 0; font-size: 18px; font-weight: 500;">Your audit will include:</h2>
                  <div style="color: #6b7280; line-height: 1.7; font-size: 15px;">
                    <p style="margin: 0 0 12px 0;">• Performance optimisation opportunities</p>
                    <p style="margin: 0 0 12px 0;">• SEO improvement recommendations</p>
                    <p style="margin: 0 0 12px 0;">• User experience enhancement tips</p>
                    <p style="margin: 0;">• Conversion rate optimisation insights</p>
                  </div>
                </div>
                
                <!-- CTA Button -->
                <div style="text-align: center; margin: 50px 0;">
                  <a href="https://calendly.com/wayne-uplinq" style="display: inline-block; background: #3b82f6; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 16px; transition: background-color 0.2s;">
                    Book a Free Consultation
                  </a>
                </div>
                
                <!-- Footer -->
                <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid #f3f4f6; text-align: center;">
                  <p style="color: #9ca3af; font-size: 14px; margin: 0; line-height: 1.5;">
                    Questions? Just reply to this email or visit <a href="https://uplinq.digital" style="color: #3b82f6; text-decoration: none;">uplinq.digital</a>
                  </p>
                  <p style="color: #d1d5db; font-size: 12px; margin: 15px 0 0 0;">
                    Modern Web Solutions for Business Growth
                  </p>
                </div>
              </div>
            </div>
          `;
        } else {
          // Default contact form emails (existing logic)
          notificationSubject = `New Contact Form Submission from ${name}`;
          notificationHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">📩 New Contact Form Submission</h1>
              </div>
              
              <div style="padding: 30px; background: #f8fafc;">
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <h3 style="color: #2d3748; margin-top: 0;">Contact Details:</h3>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Source:</strong> ${source}</p>
                  <p><strong>Message:</strong></p>
                  <div style="background: #f7fafc; padding: 15px; border-radius: 4px; margin-top: 10px;">
                    <p style="margin: 0; white-space: pre-wrap;">${details}</p>
                  </div>
                  
                  ${file ? '<p><strong>File attached:</strong> Yes</p>' : ''}
                  
                  <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                    <p style="color: #4a5568; font-size: 14px; margin: 0;">
                      Submitted at: ${new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
        
        // Send notification email to Wayne
        const notificationMsg = {
          to: RECIPIENT_EMAIL,
          from: process.env.SENDGRID_FROM_EMAIL || 'noreply@uplinq.digital',
          subject: notificationSubject,
          html: notificationHtml
        };
        
        await sgMail.send(notificationMsg);
        console.log('Notification email sent successfully to:', RECIPIENT_EMAIL);
        
        // Send confirmation email to user for audit requests
        if (requestType === 'audit_video') {
          const userMsg = {
            to: email,
            from: process.env.SENDGRID_FROM_EMAIL || 'noreply@uplinq.digital',
            subject: userConfirmationSubject,
            html: userConfirmationHtml
          };
          
          await sgMail.send(userMsg);
          console.log('Confirmation email sent successfully to user:', email);
        }
        
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the whole request if email fails
        // But log it for monitoring
      }
    } else {
      console.log('SendGrid not configured, skipping email notification');
    }
    
    // Return success response
    res.status(200).json({ 
      success: true, 
      message: requestType === 'audit_video' 
        ? 'Audit request submitted successfully. Check your email for confirmation!' 
        : 'Message sent successfully. We\'ll get back to you soon!' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error. Please try again later.' 
    });
  }
});

// Handle quote form submissions
app.post('/api/quote', async (req, res) => {
  try {
    const { name, company, email, website, projectType, budget, timeline, goals } = req.body;
    
    // Log the submission
    console.log('Quote form submission received:', { 
      name, company, email, website, projectType, budget, timeline, goals,
      // Always sent to our designated recipient
      sentTo: RECIPIENT_EMAIL
    });
    
    // Send email using SendGrid
    if (process.env.SENDGRID_API_KEY) {
      try {
        const msg = {
          to: RECIPIENT_EMAIL,
          from: process.env.SENDGRID_FROM_EMAIL || 'noreply@uplinq.digital',
          subject: `New Quote Request from ${name}${company ? ` at ${company}` : ''}`,
          text: `Quote request details:
  Name: ${name}
  Company: ${company || 'N/A'}
  Email: ${email}
  Website: ${website || 'N/A'}
  Project Type: ${projectType}
  Budget: ${budget}
  Timeline: ${timeline}
  Goals: ${goals}`,
          html: `
  <h2>New Quote Request</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Company:</strong> ${company || 'N/A'}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Website:</strong> ${website || 'N/A'}</p>
  <p><strong>Project Type:</strong> ${projectType}</p>
  <p><strong>Budget:</strong> ${budget}</p>
  <p><strong>Timeline:</strong> ${timeline}</p>
  <p><strong>Goals:</strong></p>
  <p>${goals.replace(/\n/g, '<br>')}</p>
  `,
        };
        
        await sgMail.send(msg);
        console.log('Email sent to', RECIPIENT_EMAIL);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Continue with response even if email fails
      }
    } else {
      console.log('SendGrid API key not set - email not sent');
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Quote request submitted successfully',
      recipient: RECIPIENT_EMAIL // Confirm where it would be sent
    });
    
  } catch (error) {
    console.error('Error processing quote request:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process quote request. Please try again later.' 
    });
  }
});

// Handle website audit requests
app.post('/api/website-audit', async (req, res) => {
  try {
    const { websiteUrl, email, companyName } = req.body;
    
    // Log the audit request
    console.log('Website audit request received:', { 
      websiteUrl, email, companyName,
      sentTo: RECIPIENT_EMAIL
    });
    
    // Validate required fields
    if (!websiteUrl || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Website URL and email are required' 
      });
    }
    
    // Normalize URL
    const normalizedUrl = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`;
    
    try {
      // Perform basic website checks
      const auditResults = await performWebsiteAudit(normalizedUrl);
      
      // Send notification email to you
      if (process.env.SENDGRID_API_KEY) {
        try {
          const msg = {
            to: RECIPIENT_EMAIL,
            from: process.env.SENDGRID_FROM_EMAIL || 'noreply@uplinq.digital',
            subject: `New Website Audit Request: ${websiteUrl}`,
            text: `Website audit request details:
Website: ${websiteUrl}
Email: ${email}
Company: ${companyName || 'N/A'}
Overall Score: ${auditResults.overallScore}

Key Issues Found:
${auditResults.categories.map(cat => 
  `${cat.category}: ${cat.score}/${cat.maxScore} - ${cat.issues.join(', ')}`
).join('\n')}

Lead captured and ready for follow-up!`,
            html: `
<h2>New Website Audit Request</h2>
<p><strong>Website:</strong> ${websiteUrl}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${companyName || 'N/A'}</p>
<p><strong>Overall Score:</strong> ${auditResults.overallScore}/100</p>

<h3>Audit Results:</h3>
${auditResults.categories.map(cat => `
<div style="margin-bottom: 15px; padding: 10px; border-left: 4px solid #2D72F9;">
  <h4>${cat.category}: ${cat.score}/${cat.maxScore}</h4>
  <ul>
    ${cat.issues.map(issue => `<li>${issue}</li>`).join('')}
  </ul>
</div>
`).join('')}

<p><strong>🎯 This is a qualified lead ready for follow-up!</strong></p>
`,
          };
          
          await sgMail.send(msg);
          console.log('Audit notification email sent to', RECIPIENT_EMAIL);
        } catch (emailError) {
          console.error('Error sending audit notification email:', emailError);
        }
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Website audit completed successfully',
        auditResults,
        recipient: RECIPIENT_EMAIL
      });
      
    } catch (auditError) {
      console.error('Error performing website audit:', auditError);
      
      // Return mock results if actual audit fails
      const mockResults = generateMockAuditResults(normalizedUrl);
      
      res.status(200).json({ 
        success: true, 
        message: 'Website audit completed successfully',
        auditResults: mockResults,
        note: 'Using sample data for demo'
      });
    }
    
  } catch (error) {
    console.error('Error processing website audit:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process website audit. Please try again later.' 
    });
  }
});

// Handle growth calculator requests
app.post('/api/growth-calculator', async (req, res) => {
  try {
    const { email, companyName, monthlyVisitors, conversionRate, averageOrderValue, results } = req.body;
    
    // Log the calculator submission
    console.log('Growth calculator submission received:', { 
      email, companyName, monthlyVisitors, conversionRate, averageOrderValue,
      potentialIncrease: results?.monthlyIncrease || 0,
      sentTo: RECIPIENT_EMAIL
    });
    
    // Validate required fields
    if (!email || !monthlyVisitors || !conversionRate || !averageOrderValue) {
      return res.status(400).json({ 
        success: false, 
        error: 'All calculator fields are required' 
      });
    }
    
    // Send notification email to you
    if (process.env.SENDGRID_API_KEY) {
      try {
        const msg = {
          to: RECIPIENT_EMAIL,
          from: process.env.SENDGRID_FROM_EMAIL || 'noreply@uplinq.digital',
          subject: `New Growth Calculator Lead: ${email}`,
          text: `Growth calculator submission details:
Email: ${email}
Company: ${companyName || 'N/A'}
Monthly Visitors: ${monthlyVisitors.toLocaleString()}
Current Conversion Rate: ${conversionRate}%
Average Order Value: £${averageOrderValue}

RESULTS:
Current Monthly Revenue: £${results?.currentRevenue?.toLocaleString() || 'N/A'}
Potential Monthly Revenue: £${results?.potentialRevenue?.toLocaleString() || 'N/A'}
Monthly Increase: £${results?.monthlyIncrease?.toLocaleString() || 'N/A'}
Annual Increase: £${results?.annualIncrease?.toLocaleString() || 'N/A'}

🎯 High-value lead - follow up immediately!`,
          html: `
<h2>New Growth Calculator Lead</h2>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${companyName || 'N/A'}</p>

<h3>Current Website Stats:</h3>
<ul>
  <li><strong>Monthly Visitors:</strong> ${monthlyVisitors.toLocaleString()}</li>
  <li><strong>Conversion Rate:</strong> ${conversionRate}%</li>
  <li><strong>Average Order Value:</strong> £${averageOrderValue}</li>
</ul>

<h3>Revenue Potential:</h3>
<div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
  <p><strong>Current Monthly Revenue:</strong> £${results?.currentRevenue?.toLocaleString() || 'N/A'}</p>
  <p><strong>Potential Monthly Revenue:</strong> £${results?.potentialRevenue?.toLocaleString() || 'N/A'}</p>
  <p style="color: #16a34a; font-size: 18px;"><strong>Monthly Increase:</strong> £${results?.monthlyIncrease?.toLocaleString() || 'N/A'}</p>
  <p style="color: #16a34a; font-size: 16px;"><strong>Annual Increase:</strong> £${results?.annualIncrease?.toLocaleString() || 'N/A'}</p>
</div>

<p><strong>🎯 This is a qualified lead - follow up immediately!</strong></p>
`,
        };
        
        await sgMail.send(msg);
        console.log('Growth calculator notification email sent to', RECIPIENT_EMAIL);
      } catch (emailError) {
        console.error('Error sending growth calculator notification email:', emailError);
        // Continue with response even if email fails
      }
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Growth calculator submission processed successfully',
      recipient: RECIPIENT_EMAIL
    });
    
  } catch (error) {
    console.error('Error processing growth calculator:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process growth calculator submission. Please try again later.' 
    });
  }
});

// Handle starter kit purchase and delivery
app.post('/api/starter-kit-purchase', async (req, res) => {
  try {
    const { email, stripeSessionId } = req.body;
    
    // Log the purchase
    console.log('Starter kit purchase received:', { 
      email, stripeSessionId,
      sentTo: RECIPIENT_EMAIL
    });
    
    // Validate required fields
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email is required' 
      });
    }
    
    // Send starter kit email to customer
    if (process.env.SENDGRID_API_KEY) {
      try {
        const customerMsg = {
          to: email,
          from: process.env.SENDGRID_FROM_EMAIL || 'noreply@uplinq.digital',
          subject: 'Your UplinqPro Digital Toolkit is Ready! 🚀',
          text: `Welcome to UplinqPro!

Your professional optimization toolkit is ready for download:

📊 Speed Acceleration Engine
Download: https://uplinq.digital/downloads/speed-acceleration-engine.pdf

🎯 Conversion Amplifier Suite  
Download: https://uplinq.digital/downloads/conversion-amplifier-suite.zip

🔍 SEO Optimization Framework
Download: https://uplinq.digital/downloads/seo-optimization-framework.xlsx

📈 Growth Automation Playbook
Download: https://uplinq.digital/downloads/growth-automation-playbook.pdf

🎁 BONUS: Book your free 45-minute strategy session:
https://calendly.com/wayne-uplinq

Next Steps:
1. Download all your professional resources above
2. Start with the Speed Acceleration Engine for immediate impact
3. Book your included strategy session to create your custom growth plan

Ready for ongoing optimization? Consider upgrading to UplinqPro Enterprise (£47/month):
https://uplinq.digital/uplinqpro-enterprise

Questions? Just reply to this email!

Best regards,
Wayne from Uplinq Digital`,
          html: `
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px;">
  <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
    <h1 style="color: #667eea; text-align: center; font-size: 28px; margin-bottom: 10px;">Welcome to UplinqPro! 🚀</h1>
    <p style="text-align: center; color: #666; font-size: 16px; margin-bottom: 30px;">Your professional optimization toolkit is ready</p>
    
    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; border-radius: 12px; margin: 30px 0;">
      <h2 style="color: white; margin-top: 0; font-size: 22px;">Your Professional Toolkit:</h2>
      
      <div style="margin: 20px 0;">
        <h3 style="color: white; font-size: 16px; margin-bottom: 5px;">📊 Speed Acceleration Engine</h3>
        <a href="https://uplinq.digital/downloads/speed-acceleration-engine.pdf" style="color: #ffeb3b; text-decoration: none; font-weight: bold;">Download PDF →</a>
      </div>
      
      <div style="margin: 20px 0;">
        <h3 style="color: white; font-size: 16px; margin-bottom: 5px;">🎯 Conversion Amplifier Suite</h3>
        <a href="https://uplinq.digital/downloads/conversion-amplifier-suite.zip" style="color: #ffeb3b; text-decoration: none; font-weight: bold;">Download Templates →</a>
      </div>
      
      <div style="margin: 20px 0;">
        <h3 style="color: white; font-size: 16px; margin-bottom: 5px;">🔍 SEO Optimization Framework</h3>
        <a href="https://uplinq.digital/downloads/seo-optimization-framework.xlsx" style="color: #ffeb3b; text-decoration: none; font-weight: bold;">Download Framework →</a>
      </div>
      
      <div style="margin: 20px 0;">
        <h3 style="color: white; font-size: 16px; margin-bottom: 5px;">📈 Growth Automation Playbook</h3>
        <a href="https://uplinq.digital/downloads/growth-automation-playbook.pdf" style="color: #ffeb3b; text-decoration: none; font-weight: bold;">Download Playbook →</a>
      </div>
    </div>
    
    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 25px; border-radius: 12px; margin: 30px 0; text-align: center;">
      <h3 style="color: white; margin-top: 0; font-size: 20px;">🎁 Your Premium Bonus:</h3>
      <p style="color: white; margin-bottom: 20px;">45-minute personal strategy session with our optimization experts</p>
      <a href="https://calendly.com/wayne-uplinq" style="display: inline-block; background: #00c851; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Book Your Strategy Session →</a>
    </div>
    
    <h3 style="color: #333; margin-top: 30px;">Next Steps:</h3>
    <ol style="color: #666; line-height: 1.6;">
      <li>Download all your professional resources above</li>
      <li>Start with the Speed Acceleration Engine for immediate impact</li>
      <li>Book your included strategy session to create your custom growth plan</li>
    </ol>
    
    <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin: 30px 0; text-align: center; border: 2px solid #e9ecef;">
      <h3 style="color: #495057; margin-top: 0;">Ready for Ongoing Optimization?</h3>
      <p style="color: #6c757d;">Upgrade to UplinqPro Enterprise for monthly reports and advanced automation</p>
      <a href="https://uplinq.digital/uplinqpro-enterprise" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Upgrade to Enterprise - £47/month →</a>
    </div>
    
    <p style="color: #666; margin-top: 30px;">Questions? Just reply to this email!</p>
    
    <p style="color: #999; font-size: 14px; margin-top: 20px;">Best regards,<br>Wayne from Uplinq Digital</p>
  </div>
</div>
`,
        };
        
        await sgMail.send(customerMsg);
        console.log('Starter kit delivery email sent to', email);
      } catch (emailError) {
        console.error('Error sending starter kit email:', emailError);
      }
    }
    
    // Send notification to you
    if (process.env.SENDGRID_API_KEY) {
      try {
        const notificationMsg = {
          to: RECIPIENT_EMAIL,
          from: process.env.SENDGRID_FROM_EMAIL || 'noreply@uplinq.digital',
          subject: `New UplinqPro Sale: ${email} - £19`,
          text: `New UplinqPro purchase!

Customer Email: ${email}
Product: UplinqPro Digital Toolkit
Amount: £19
Stripe Session: ${stripeSessionId || 'N/A'}

The customer has been sent their professional toolkit automatically.

🎯 Follow up opportunities:
1. Book them for the included 45-minute strategy session
2. Offer UplinqPro Enterprise upgrade (£47/month) 
3. Pitch larger optimization projects during strategy session

This is a qualified customer - reach out within 24 hours!`,
          html: `
<h2>New UplinqPro Sale! 💰</h2>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px; margin: 20px 0;">
  <p style="color: white;"><strong>Customer Email:</strong> ${email}</p>
  <p style="color: white;"><strong>Product:</strong> UplinqPro Digital Toolkit</p>
  <p style="color: white;"><strong>Amount:</strong> £19</p>
  <p style="color: white;"><strong>Stripe Session:</strong> ${stripeSessionId || 'N/A'}</p>
</div>

<p>The customer has been sent their professional toolkit automatically.</p>

<h3>🎯 Follow Up Opportunities:</h3>
<ol>
  <li>Book them for the included 45-minute strategy session</li>
  <li>Offer UplinqPro Enterprise upgrade (£47/month)</li>
  <li>Pitch larger optimization projects during strategy session</li>
</ol>

<p><strong>This is a qualified customer - reach out within 24 hours!</strong></p>
`,
        };
        
        await sgMail.send(notificationMsg);
        console.log('Starter kit notification sent to', RECIPIENT_EMAIL);
      } catch (emailError) {
        console.error('Error sending starter kit notification:', emailError);
      }
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Starter kit delivered successfully',
      recipient: email
    });
    
  } catch (error) {
    console.error('Error processing starter kit purchase:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process starter kit purchase. Please contact support.' 
    });
  }
});

// Website audit helper function
async function performWebsiteAudit(url) {
  const results = {
    websiteUrl: url,
    overallScore: 0,
    categories: []
  };
  
  try {
    // Fetch the website
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Uplinq Website Audit Bot/1.0'
      },
      timeout: 10000
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    const headers = response.headers;
    
    // 1. Technical SEO Analysis
    const seoScore = analyzeSEO(html, url);
    results.categories.push(seoScore);
    
    // 2. Performance Analysis (basic)
    const perfScore = analyzePerformance(headers, html);
    results.categories.push(perfScore);
    
    // 3. Mobile Experience (basic checks)
    const mobileScore = analyzeMobile(html);
    results.categories.push(mobileScore);
    
    // 4. Security Analysis
    const securityScore = analyzeSecurity(headers, url);
    results.categories.push(securityScore);
    
    // Calculate overall score
    const totalScore = results.categories.reduce((sum, cat) => sum + cat.score, 0);
    const maxTotal = results.categories.reduce((sum, cat) => sum + cat.maxScore, 0);
    results.overallScore = Math.round((totalScore / maxTotal) * 100);
    
    return results;
    
  } catch (error) {
    console.error('Website audit error:', error);
    throw error;
  }
}

// SEO analysis helper
function analyzeSEO(html, url) {
  const issues = [];
  const recommendations = [];
  let score = 100;
  
  // Check for title tag
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (!titleMatch || titleMatch[1].length < 10) {
    issues.push('Missing or too short title tag');
    recommendations.push('Add descriptive title tag (50-60 characters)');
    score -= 20;
  }
  
  // Check for meta description
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (!metaDescMatch || metaDescMatch[1].length < 120) {
    issues.push('Missing or too short meta description');
    recommendations.push('Add compelling meta description (150-160 characters)');
    score -= 15;
  }
  
  // Check for heading structure
  const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
  if (h1Count === 0) {
    issues.push('No H1 heading found');
    recommendations.push('Add a clear H1 heading to each page');
    score -= 15;
  } else if (h1Count > 1) {
    issues.push('Multiple H1 headings found');
    recommendations.push('Use only one H1 per page');
    score -= 10;
  }
  
  // Check for images without alt text
  const imgMatches = html.match(/<img[^>]*>/gi) || [];
  const imgWithoutAlt = imgMatches.filter(img => !img.includes('alt=')).length;
  if (imgWithoutAlt > 0) {
    issues.push(`${imgWithoutAlt} images missing alt text`);
    recommendations.push('Add descriptive alt text to all images');
    score -= Math.min(imgWithoutAlt * 5, 20);
  }
  
  return {
    category: 'Technical SEO',
    score: Math.max(score, 0),
    maxScore: 100,
    issues,
    recommendations
  };
}

// Performance analysis helper
function analyzePerformance(headers, html) {
  const issues = [];
  const recommendations = [];
  let score = 100;
  
  // Check for compression
  if (!headers.get('content-encoding')) {
    issues.push('No compression detected');
    recommendations.push('Enable gzip/brotli compression');
    score -= 20;
  }
  
  // Check for caching headers
  if (!headers.get('cache-control') && !headers.get('expires')) {
    issues.push('No caching headers found');
    recommendations.push('Implement browser caching');
    score -= 15;
  }
  
  // Basic HTML size check
  const htmlSize = html.length;
  if (htmlSize > 100000) {
    issues.push('Large HTML size detected');
    recommendations.push('Optimize HTML and remove unnecessary code');
    score -= 10;
  }
  
  // Check for inline styles (performance impact)
  const inlineStyles = (html.match(/style\s*=/gi) || []).length;
  if (inlineStyles > 10) {
    issues.push('Excessive inline styles found');
    recommendations.push('Move styles to external CSS files');
    score -= 10;
  }
  
  return {
    category: 'Page Speed',
    score: Math.max(score, 0),
    maxScore: 100,
    issues,
    recommendations
  };
}

// Mobile experience analysis
function analyzeMobile(html) {
  const issues = [];
  const recommendations = [];
  let score = 100;
  
  // Check for viewport meta tag
  if (!html.includes('name="viewport"')) {
    issues.push('Missing viewport meta tag');
    recommendations.push('Add responsive viewport meta tag');
    score -= 25;
  }
  
  // Check for responsive design indicators
  if (!html.includes('media=') && !html.includes('@media')) {
    issues.push('No responsive design detected');
    recommendations.push('Implement responsive CSS design');
    score -= 30;
  }
  
  // Check for mobile-friendly font sizes
  const smallFonts = html.match(/font-size:\s*[0-9]+(px|pt)/gi);
  if (smallFonts && smallFonts.some(font => parseInt(font.match(/\d+/)[0]) < 14)) {
    issues.push('Small font sizes detected');
    recommendations.push('Use minimum 14px font size for mobile');
    score -= 15;
  }
  
  return {
    category: 'Mobile Experience',
    score: Math.max(score, 0),
    maxScore: 100,
    issues,
    recommendations
  };
}

// Security analysis helper
function analyzeSecurity(headers, url) {
  const issues = [];
  const recommendations = [];
  let score = 100;
  
  // Check for HTTPS
  if (!url.startsWith('https://')) {
    issues.push('Website not using HTTPS');
    recommendations.push('Implement SSL certificate and HTTPS');
    score -= 30;
  }
  
  // Check security headers
  const securityHeaders = [
    'strict-transport-security',
    'content-security-policy',
    'x-frame-options',
    'x-content-type-options'
  ];
  
  const missingHeaders = securityHeaders.filter(header => !headers.get(header));
  if (missingHeaders.length > 0) {
    issues.push(`Missing security headers: ${missingHeaders.join(', ')}`);
    recommendations.push('Implement security headers for better protection');
    score -= missingHeaders.length * 15;
  }
  
  return {
    category: 'Security',
    score: Math.max(score, 0),
    maxScore: 100,
    issues,
    recommendations
  };
}

// Mock audit results generator (fallback)
function generateMockAuditResults(url) {
  return {
    websiteUrl: url,
    overallScore: Math.floor(Math.random() * 40) + 60, // 60-100 range
    categories: [
      {
        category: 'Technical SEO',
        score: Math.floor(Math.random() * 30) + 60,
        maxScore: 100,
        issues: [
          'Missing meta descriptions on some pages',
          'Images without alt text detected',
          'No structured data found'
        ],
        recommendations: [
          'Add meta descriptions to all pages',
          'Optimize all images with descriptive alt text',
          'Implement structured data markup'
        ]
      },
      {
        category: 'Page Speed',
        score: Math.floor(Math.random() * 35) + 55,
        maxScore: 100,
        issues: [
          'Large image files detected',
          'Render-blocking resources found',
          'No browser caching configured'
        ],
        recommendations: [
          'Compress and optimize images',
          'Enable compression and minification',
          'Implement browser caching headers'
        ]
      },
      {
        category: 'Mobile Experience',
        score: Math.floor(Math.random() * 20) + 75,
        maxScore: 100,
        issues: [
          'Touch targets could be larger',
          'Font size optimization needed'
        ],
        recommendations: [
          'Increase button and link touch targets',
          'Optimize typography for mobile readability'
        ]
      },
      {
        category: 'Security',
        score: Math.floor(Math.random() * 15) + 80,
        maxScore: 100,
        issues: [
          'Some security headers missing'
        ],
        recommendations: [
          'Implement comprehensive security headers'
        ]
      }
    ]
  };
}

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 