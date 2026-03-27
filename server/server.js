const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Imports
const mainRoutes = require("./routes/mainRoutes");
const emailRoutes = require("./routes/emailRoutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Startup Log (Brief)
console.log(`\n🚀 Starting Portfolio Backend on Port: ${PORT}`);
if (!process.env.RESEND_API_KEY) console.warn("⚠️  Warning: RESEND_API_KEY is not set.");

// Routes
app.use("/", mainRoutes);
app.use("/", emailRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

// Server-level error handling
server.on('error', (error) => {
  console.error("❌ SERVER FAILED TO START!");
  console.error("Error:", error.message);
  process.exit(1);
});