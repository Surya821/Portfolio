const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// CORS Configuration - Allow your Vercel frontend
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://portfolio-frontend-seven-theta.vercel.app/', // Replace with your actual Vercel domain
    /\.vercel\.app$/ // Allow all Vercel preview deployments
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// Debug environment variables
console.log("=== Environment Check ===");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Loaded ✓" : "Missing ✗");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✓" : "Missing ✗");
console.log("SMTP_HOST:", process.env.SMTP_HOST || "Using default (gmail)");
console.log("SMTP_PORT:", process.env.SMTP_PORT || "Using default (587)");
console.log("NODE_ENV:", process.env.NODE_ENV || "development");
console.log("========================");

// Enhanced Nodemailer configuration
const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,
  pool: true,
  maxConnections: 5,
  maxMessages: 100
});

// Verify email connection
contactEmail.verify((error) => {
  if (error) {
    console.log("❌ Email verification failed:");
    console.log("Error details:", error.message);
    console.log("\n🔧 Troubleshooting tips:");
    console.log("1. Verify EMAIL_USER and EMAIL_PASS in Render environment variables");
    console.log("2. Use Gmail App Password (16 characters, no spaces)");
    console.log("3. Check that 2FA is enabled on your Gmail account");
  } else {
    console.log("✅ Email service ready to send messages");
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Portfolio Backend API",
    status: "running",
    endpoints: {
      health: "/health",
      contact: "POST /contact",
      newsletter: "POST /newsletter"
    }
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
    environment: process.env.NODE_ENV || "development"
  });
});

// Contact form endpoint
app.post("/contact", async (req, res) => {
  console.log("📧 Received contact form submission");
  console.log("Request body:", req.body);
  
  try {
    const { firstName, lastName, email, message, phone } = req.body;
    
    // Validate input
    if (!firstName || !lastName || !email || !message) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ 
        code: 400, 
        status: "Missing required fields" 
      });
    }
    
    const name = `${firstName} ${lastName}`;
    
    const mail = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `New Message from ${name} - Portfolio Contact Form`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="margin: 10px 0;"><strong style="color: #555;">Phone:</strong> ${phone || 'Not provided'}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4CAF50; border-radius: 5px;">
              <p style="margin: 0 0 10px 0;"><strong style="color: #555;">Message:</strong></p>
              <p style="margin: 0; color: #333; line-height: 1.6;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
              <p>This message was sent from your portfolio contact form at ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `,
    };
    
    await contactEmail.sendMail(mail);
    console.log("✅ Email sent successfully to:", mail.to);
    
    res.status(200).json({ 
      code: 200, 
      status: "Message Sent" 
    });
    
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ 
      code: 500, 
      status: "Error sending message. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Newsletter subscription endpoint
app.post("/newsletter", async (req, res) => {
  console.log("📬 Received newsletter subscription");
  console.log("Request body:", req.body);
  
  try {
    const { email } = req.body;
    
    if (!email || !email.includes("@")) {
      console.log("❌ Invalid email address");
      return res.status(400).json({ 
        code: 400, 
        status: "Invalid email address" 
      });
    }
    
    const notificationMail = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `New Newsletter Subscription - ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 3px solid #AA367C; padding-bottom: 10px;">📧 New Newsletter Subscriber!</h2>
            
            <div style="margin: 20px 0; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
              <p style="margin: 0; font-size: 16px;"><strong style="color: #555;">Email:</strong></p>
              <p style="margin: 10px 0 0 0; font-size: 18px; color: #AA367C;"><strong>${email}</strong></p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: linear-gradient(90.21deg, rgba(170, 54, 124, 0.1) -5.91%, rgba(74, 47, 189, 0.1) 111.58%); border-radius: 5px;">
              <p style="margin: 0; color: #666; font-size: 14px;">Subscribed on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `,
    };
    
    const welcomeMail = {
      from: `"Surya Pratap Singh" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to My Newsletter! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; background: linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Welcome! 🎉</h2>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6;">Thank you for subscribing to my newsletter!</p>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6;">You'll be the first to know about:</p>
            
            <ul style="color: #555; font-size: 15px; line-height: 1.8;">
              <li>New projects and updates</li>
              <li>Tech insights and tutorials</li>
              <li>Industry news and trends</li>
              <li>Exclusive content and resources</li>
            </ul>
            
            <div style="margin: 30px 0; padding: 20px; background: linear-gradient(90.21deg, rgba(170, 54, 124, 0.1) -5.91%, rgba(74, 47, 189, 0.1) 111.58%); border-radius: 10px; text-align: center;">
              <p style="margin: 0; color: #333; font-size: 16px;">Stay tuned for exciting updates!</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
              <p style="color: #999; font-size: 12px; margin-bottom: 10px;">Best regards,<br><strong style="color: #555;">Surya Pratap Singh</strong></p>
            </div>
          </div>
        </div>
      `,
    };
    
    // Send both emails
    await contactEmail.sendMail(notificationMail);
    console.log("✅ Notification sent for new subscriber:", email);
    
    await contactEmail.sendMail(welcomeMail);
    console.log("✅ Welcome email sent to:", email);
    
    res.status(200).json({ 
      code: 200, 
      status: "Successfully subscribed!" 
    });
    
  } catch (error) {
    console.error("❌ Error in newsletter subscription:", error);
    res.status(500).json({ 
      code: 500, 
      status: "Error processing subscription. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    code: 404, 
    status: "Endpoint not found",
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ 
    code: 500, 
    status: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});