const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(
  "mongodb://admin:F0OwEp7dkmiswU80@SG-sunset-durian-2503-77986.servers.mongodirector.com:27017/signupDB",
  {
    authSource: "admin",
    ssl: true,
    tlsInsecure: true
  }

)
.then(() => {
  console.log("MongoDB connected ✅");
})
.catch((err) => {
  console.log("MongoDB error ❌", err.message);
});

// Routes
const authRoutes = require("./routes/auth");
app.use(authRoutes);

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  
});