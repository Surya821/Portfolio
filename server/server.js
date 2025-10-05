const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

// Server setup
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 5000;

// Debug: Check if environment variables are loaded
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Loaded ✓" : "Missing ✗");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✓" : "Missing ✗");

// Nodemailer configuration with additional settings
const contactEmail = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify email connection
contactEmail.verify((error) => {
  if (error) {
    console.log("❌ Email verification failed:", error);
  } else {
    console.log("✅ Email service ready to send messages");
  }
});

// Contact form endpoint
router.post("/contact", (req, res) => {
  const name = req.body.firstName + " " + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  
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
            <p style="margin: 10px 0;"><strong style="color: #555;">Phone:</strong> ${phone}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4CAF50; border-radius: 5px;">
            <p style="margin: 0 0 10px 0;"><strong style="color: #555;">Message:</strong></p>
            <p style="margin: 0; color: #333; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
            <p>This message was sent from your portfolio contact form.</p>
          </div>
        </div>
      </div>
    `,
  };
  
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.log("❌ Error sending email:", error);
      res.json({ code: 500, status: "Error sending message" });
    } else {
      console.log("✅ Email sent successfully to:", mail.to);
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});

// Newsletter subscription endpoint
router.post("/newsletter", (req, res) => {
  const email = req.body.email;
  
  if (!email || !email.includes("@")) {
    return res.json({ 
      code: 400, 
      status: "Invalid email address" 
    });
  }
  
  // Email to yourself about new subscriber
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
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
            <p>This notification was sent from your portfolio newsletter subscription form.</p>
          </div>
        </div>
      </div>
    `,
  };
  
  // Welcome email to subscriber
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
  contactEmail.sendMail(notificationMail, (error) => {
    if (error) {
      console.log("❌ Error sending notification:", error);
    } else {
      console.log("✅ Notification sent for new subscriber:", email);
    }
  });
  
  contactEmail.sendMail(welcomeMail, (error) => {
    if (error) {
      console.log("❌ Error sending welcome email:", error);
      res.json({ code: 500, status: "Error processing subscription" });
    } else {
      console.log("✅ Welcome email sent to:", email);
      res.json({ code: 200, status: "Successfully subscribed!" });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});