const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(
 "mongodb+srv://Amankushwaha:Aman%25402005@cluster0.70ia04k.mongodb.net/",
  {
    ssl: true,
    tlsInsecure: true
  }

)
.then(() => {
  console.log("MongoDB connected ✅");
  console.log("Connected DB name:", mongoose.connection.name);
})
.catch((err) => {
  console.log("MongoDB error ❌", err.message);
});

// Routes
const authRoutes = require("./routes/auth");
app.use(authRoutes);
app.get("/", (req, res) =>{
  res.sendFile(__dirname + "/public/signup.html");
});

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  
});