const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5050;

console.log("👋 Server script starting...");

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "users.json");
console.log(`📁 Using database file at: ${dbPath}`);

// Initialize file if empty
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([]));
  console.log("📄 Created new users.json file.");
} else {
  console.log("✅ users.json exists.");
}

// Register endpoint
app.post("/register", (req, res) => {
  const newUser = req.body;
  console.log("📨 Received user registration data:", newUser);

  try {
    const dataString = fs.readFileSync(dbPath, "utf8");
    const existingData = JSON.parse(dataString);

    existingData.push(newUser);
    fs.writeFileSync(dbPath, JSON.stringify(existingData, null, 2));
    console.log("✅ User saved successfully.");

    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    console.error("❌ Error during registration:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add this below the /register route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("📨 Received login data:", username, password);

  try {
    const users = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    console.log("👥 All users:", users);

    const user = users.find(u => u.username === username && u.password === password);
    console.log("🔍 Matched user:", user);

    if (user) {
      console.log("✅ Login successful!");
      res.status(200).json({ message: "Login successful", user });
    } else {
      console.log("❌ Invalid credentials");
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("❗ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

