// routes/bookings.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// ✅ Create a booking (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const { category, itemId, dateFrom, dateTo, name, phone, details, payment, hostelName } = req.body;

    // Validate required fields
    if (!category || !itemId || !dateFrom || !dateTo || !name || !phone) {
      return res.status(400).json({ msg: "Please fill all required fields" });
    }

    // Debug log to check data
    console.log("📌 Booking request data:", req.body, "User from token:", req.user);

    // Create booking
    const booking = new Booking({
      user: req.user.id,         // logged-in user ID
      email: req.user.email,     // ✅ now always comes from token
      category,
      itemId,
      hostelName,
      dateFrom,
      dateTo,
      name,
      phone,
      details: details || {},
      payment: payment || "Cash",   // default to Cash
      status: "Pending",
    });

    await booking.save();
    res.status(201).json({ msg: "✅ Booking created successfully", booking });
  } catch (err) {
    console.error("❌ Booking create error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Cancel a booking (Protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    await booking.deleteOne();
    res.json({ msg: "✅ Booking cancelled successfully" });
  } catch (err) {
    console.error("❌ Delete booking error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get all bookings for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("itemId");
    res.json(bookings); // even if empty, returns []
  } catch (err) {
    console.error("❌ Get bookings error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get booking by ID (Protected)
router.get("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    console.error("❌ Get booking by ID error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Update booking payment (Protected)
router.put("/:id/pay", auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    const { payment, status } = req.body;
    booking.payment = payment || booking.payment;
    booking.status = status || booking.status;

    await booking.save();
    res.json({ msg: "✅ Payment updated successfully", booking });
  } catch (err) {
    console.error("❌ Update booking payment error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;



