const express = require("express");
const router = express.Router();
const { getResend } = require("../config/resend");
const { 
  getContactEmailTemplate, 
  getNewsletterNotificationTemplate, 
  getNewsletterWelcomeTemplate 
} = require("../utils/emailTemplates");

router.post("/contact", async (req, res) => {
  console.log("\n📧 ============= CONTACT FORM REQUEST =============");
  try {
    const { firstName, lastName, email, message, phone } = req.body;
    
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ 
        success: false,
        code: 400, 
        status: "Missing required fields (firstName, lastName, email, message)" 
      });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY not set!");
      return res.status(500).json({
        success: false,
        code: 500,
        status: "Email service not configured"
      });
    }

    const name = `${firstName} ${lastName}`;
    const resendClient = getResend();
    
    const { data, error } = await resendClient.emails.send({
      from: process.env.FROM_EMAIL,
      replyTo: email,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Message from ${name}`,
      html: getContactEmailTemplate(name, email, phone, message),
    });
    
    if (error) {
      console.error("❌ Resend API Error:", error);
      return res.status(500).json({ 
        success: false,
        code: 500, 
        status: "Failed to send email",
        error: error.message 
      });
    }
    
    res.status(200).json({ 
      success: true,
      code: 200, 
      status: "Message Sent",
      emailId: data?.id
    });
    
  } catch (error) {
    console.error("❌ Unexpected error in /contact:", error);
    res.status(500).json({ 
      success: false,
      code: 500, 
      status: "An unexpected error occurred",
      error: error.message
    });
  }
});

router.post("/newsletter", async (req, res) => {
  console.log("\n📬 ============= NEWSLETTER REQUEST =============");
  try {
    const { email } = req.body;
    
    if (!email || !email.includes("@")) {
      return res.status(400).json({ 
        success: false,
        code: 400, 
        status: "Please enter a valid email address" 
      });
    }

    if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL || !process.env.RECIPIENT_EMAIL) {
      console.error("❌ Email service not configured");
      return res.status(500).json({
        success: false,
        code: 500,
        status: "Email service not configured"
      });
    }

    const resendClient = getResend();
    
    // Send notification
    await resendClient.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Newsletter Subscriber: ${email}`,
      html: getNewsletterNotificationTemplate(email),
    });
    
    // Send welcome email
    await resendClient.emails.send({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "Welcome to My Newsletter! 🎉",
      html: getNewsletterWelcomeTemplate(),
    });
    
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

module.exports = router;
