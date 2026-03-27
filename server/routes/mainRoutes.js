const express = require("express");
const router = express.Router();
const PORT = process.env.PORT || 5000;

router.get("/", (req, res) => {
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

router.get("/health", (req, res) => {
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
  res.json(health);
});

module.exports = router;
