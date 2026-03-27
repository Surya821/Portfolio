const { Resend } = require("resend");
require("dotenv").config();

let resend = null;

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
    console.log("✅ Resend initialized");
  }
  return resend;
}

module.exports = { getResend };
