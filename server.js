const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
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
// Admin: get all users
const User = require("./models/User");
app.get("/admin/user", async (req, res)=> {
  const users = await User.find();
  res.json(users);
});
//Admin: delet user
app.delete("/admin/user/:id", async (req,res) => {
  await
  User.findByIdAndDelete(req.params.id);
  res.json({message: "User deleted "});
});
// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  
});