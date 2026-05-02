// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // <-- make sure path is correct

const users = [
  { name: "Riddhika Goyal", email: "riddhg1306@gmail.com", password: "riddhika" },
  { name: "Aryan Sharma", email: "aryan.sharma@example.com", password: "aryan123" },
  { name: "Priya Mehta", email: "priya.mehta@example.com", password: "priya123" },
  { name: "Rahul Verma", email: "rahul.verma@example.com", password: "rahul123" },
];

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old users (optional)
    await User.deleteMany({});
    console.log("🗑️ Old users removed");

    // Hash passwords before inserting
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    await User.insertMany(hashedUsers);
    console.log("✅ Users seeded successfully");

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    mongoose.disconnect();
  }
}

seedUsers();
