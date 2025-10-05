const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============= SIMPLE CORS - ALLOW EVERYTHING =============
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// ============= RESEND SETUP (LAZY LOAD) =============
let resend = null;

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    const { Resend } = require("resend");
    resend = new Resend(process.env.RESEND_API_KEY);
    console.log("✅ Resend initialized");
  }
  return resend;
}

// ============= STARTUP LOGS =============
console.log("\n==========================================");
console.log("🚀 Portfolio Backend Server Starting...");
console.log("==========================================");
console.log("📍 Port:", PORT);
console.log("🔑 RESEND_API_KEY:", process.env.RESEND_API_KEY ? "✓ Configured" : "❌ MISSING");
console.log("📧 FROM_EMAIL:", process.env.FROM_EMAIL || "❌ MISSING");
console.log("📨 RECIPIENT_EMAIL:", process.env.RECIPIENT_EMAIL || "❌ MISSING");
console.log("🌍 NODE_ENV:", process.env.NODE_ENV || "development");
console.log("==========================================\n");

// ============= ROOT ENDPOINT =============
app.get("/", (req, res) => {
  console.log("📍 Root endpoint hit");
  res.json({ 
    success: true,
    message: "Portfolio Backend API",
    status: "running",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "GET /health",
      contact: "POST /contact",
      newsletter: "POST /newsletter"
    }
  });
});

// ============= HEALTH CHECK =============
app.get("/health", (req, res) => {
  console.log("🏥 Health check requested");
  
  const health = {
    success: true,
    status: "healthy", 
    timestamp: new Date().toISOString(),
    config: {
      resendConfigured: !!process.env.RESEND_API_KEY,
      fromEmail: process.env.FROM_EMAIL || "not set",
      recipientEmail: process.env.RECIPIENT_EMAIL || "not set"
    },
    environment: process.env.NODE_ENV || "development",
    port: PORT
  };
  
  console.log("Health:", health);
  res.json(health);
});

// ============= CONTACT FORM =============
app.post("/contact", async (req, res) => {
  console.log("\n📧 ============= CONTACT FORM REQUEST =============");
  console.log("Time:", new Date().toISOString());
  console.log("Origin:", req.headers.origin || "No origin header");
  console.log("Method:", req.method);
  console.log("Body:", JSON.stringify(req.body, null, 2));
  
  try {
    // Extract data
    const { firstName, lastName, email, message, phone } = req.body;
    
    // Validate
    if (!firstName || !lastName || !email || !message) {
      console.log("❌ Validation failed - missing required fields");
      return res.status(400).json({ 
        success: false,
        code: 400, 
        status: "Missing required fields (firstName, lastName, email, message)" 
      });
    }

    // Check Resend config
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ CRITICAL: RESEND_API_KEY not set!");
      return res.status(500).json({
        success: false,
        code: 500,
        status: "Email service not configured. Please contact administrator."
      });
    }

    if (!process.env.FROM_EMAIL || !process.env.RECIPIENT_EMAIL) {
      console.error("❌ CRITICAL: FROM_EMAIL or RECIPIENT_EMAIL not set!");
      return res.status(500).json({
        success: false,
        code: 500,
        status: "Email addresses not configured. Please contact administrator."
      });
    }
    
    const name = `${firstName} ${lastName}`;
    const resendClient = getResend();
    
    console.log("📤 Attempting to send email...");
    console.log("From:", process.env.FROM_EMAIL);
    console.log("To:", process.env.RECIPIENT_EMAIL);
    console.log("Reply-To:", email);
    
    // Send email
    const { data, error } = await resendClient.emails.send({
      from: process.env.FROM_EMAIL,
      replyTo: email,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 20px auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              
              <!-- Contact Info -->
              <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Name:</td>
                    <td style="padding: 8px 0; color: #333;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Phone:</td>
                    <td style="padding: 8px 0; color: #333;">${phone || 'Not provided'}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Message -->
              <div style="background-color: #fff; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">Message:</h3>
                <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #999; font-size: 12px;">
                Received on ${new Date().toLocaleString('en-US', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });
    
    if (error) {
      console.error("❌ Resend API Error:", error);
      return res.status(500).json({ 
        success: false,
        code: 500, 
        status: "Failed to send email. Please try again later.",
        error: error.message 
      });
    }
    
    console.log("✅ Email sent successfully!");
    console.log("Email ID:", data?.id);
    console.log("=================================================\n");
    
    res.status(200).json({ 
      success: true,
      code: 200, 
      status: "Message Sent",
      emailId: data?.id
    });
    
  } catch (error) {
    console.error("❌ Unexpected error in /contact endpoint:", error);
    console.error("Stack:", error.stack);
    res.status(500).json({ 
      success: false,
      code: 500, 
      status: "An unexpected error occurred. Please try again later.",
      error: error.message
    });
  }
});

// ============= NEWSLETTER =============
app.post("/newsletter", async (req, res) => {
  console.log("\n📬 ============= NEWSLETTER REQUEST =============");
  console.log("Time:", new Date().toISOString());
  console.log("Body:", req.body);
  
  try {
    const { email } = req.body;
    
    // Validate
    if (!email || !email.includes("@")) {
      console.log("❌ Invalid email address");
      return res.status(400).json({ 
        success: false,
        code: 400, 
        status: "Please enter a valid email address" 
      });
    }

    // Check config
    if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL || !process.env.RECIPIENT_EMAIL) {
      console.error("❌ Email service not configured");
      return res.status(500).json({
        success: false,
        code: 500,
        status: "Email service not configured"
      });
    }

    const resendClient = getResend();
    
    console.log("📤 Sending notification to:", process.env.RECIPIENT_EMAIL);
    
    // Send notification to you
    const { error: notifyError } = await resendClient.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Newsletter Subscriber: ${email}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <div style="max-width: 500px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px;">
            <h2 style="color: #AA367C; margin-top: 0;">📧 New Newsletter Subscriber!</h2>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; font-size: 18px;"><strong>${email}</strong></p>
            </div>
            <p style="color: #666; font-size: 14px;">Subscribed on: ${new Date().toLocaleString()}</p>
          </div>
        </body>
        </html>
      `,
    });
    
    if (notifyError) {
      console.error("❌ Failed to send notification:", notifyError);
    } else {
      console.log("✅ Notification sent");
    }
    
    console.log("📤 Sending welcome email to:", email);
    
    // Send welcome email
    const { error: welcomeError } = await resendClient.emails.send({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "Welcome to My Newsletter! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px;">
            <h2 style="color: #AA367C;">Welcome! 🎉</h2>
            <p style="font-size: 16px; line-height: 1.6;">Thank you for subscribing to my newsletter!</p>
            <p style="font-size: 16px;">You'll receive updates about:</p>
            <ul style="line-height: 1.8; color: #555;">
              <li>New projects and portfolio updates</li>
              <li>Tech insights and tutorials</li>
              <li>Industry news and trends</li>
              <li>Exclusive content and resources</li>
            </ul>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #666;">Best regards,<br><strong>Surya Pratap Singh</strong></p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    
    if (welcomeError) {
      console.error("❌ Failed to send welcome email:", welcomeError);
    } else {
      console.log("✅ Welcome email sent");
    }
    
    console.log("=================================================\n");
    
    res.status(200).json({ 
      success: true,
      code: 200, 
      status: "Successfully subscribed! Check your email." 
    });
    
  } catch (error) {
    console.error("❌ Newsletter error:", error);
    res.status(500).json({ 
      success: false,
      code: 500, 
      status: "Error processing subscription",
      error: error.message
    });
  }
});

// ============= 404 HANDLER =============
app.use((req, res) => {
  console.log("❌ 404 - Route not found:", req.method, req.path);
  res.status(404).json({ 
    success: false,
    code: 404, 
    status: "Endpoint not found",
    method: req.method,
    path: req.path
  });
});

// ============= ERROR HANDLER =============
app.use((err, req, res, next) => {
  console.error("❌ ============= SERVER ERROR =============");
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);
  console.error("==========================================");
  
  res.status(500).json({ 
    success: false,
    code: 500, 
    status: "Internal server error",
    error: err.message
  });
});

// ============= START SERVER =============
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log("\n✅ ==========================================");
  console.log("✅  SERVER IS RUNNING SUCCESSFULLY!");
  console.log("✅ ==========================================");
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
  console.log("✅ ==========================================\n");
});

// Handle server errors
server.on('error', (error) => {
  console.error("\n❌ ==========================================");
  console.error("❌  SERVER FAILED TO START!");
  console.error("❌ ==========================================");
  console.error("Error:", error.message);
  console.error("==========================================\n");
  process.exit(1);
});