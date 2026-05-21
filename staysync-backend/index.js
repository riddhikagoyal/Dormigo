require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || "http://127.0.0.1:5500";

// 🔹 Middlewares (order matters)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json()); // ✅ parse JSON
app.use(express.urlencoded({ extended: true })); // ✅ parse form data
app.use(cookieParser());

// 🔹 Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo connect error:", err.message));

// 🔹 Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/cities", require("./routes/cities"));

// Health check
app.get("/api/ping", (req, res) => res.json({ ok: true }));

// 🔹 Start server
const PORT = process.env.PORT || 5000;
if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not defined in .env file");
}
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});


