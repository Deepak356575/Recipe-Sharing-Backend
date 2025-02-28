const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectionDb");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDb();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// API Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Recipe Sharing API!");
});

app.use("/api/users", require("./routes/user"));
app.use("/api/recipes", require("./routes/recipe"));

// Root route for testing API availability
app.get("/api", (req, res) => {
  res.json({ message: "API is running..." });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
