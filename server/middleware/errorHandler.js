const notFoundHandler = (req, res) => {
  console.log("❌ 404 - Route not found:", req.method, req.path);
  res.status(404).json({ 
    success: false,
    code: 404, 
    status: "Endpoint not found",
    method: req.method,
    path: req.path
  });
};

const errorHandler = (err, req, res, next) => {
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
};

module.exports = { notFoundHandler, errorHandler };
