const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 🔗 Reference to User model
      required: true,
    },
    category: {
      type: String, // e.g., "Hostel", "Library", "Institute", "Hospital"
      required: true,
      trim: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId, // if referencing another collection (Hostel, Library, etc.)
      required: true,
    },
hostelName: { type: String, required: true },
    dateFrom: {
      type: Date,
      required: true,
    },
    dateTo: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    details: {
      type: Map, // ✅ Better than Object for flexible key-value
      of: String,
    },

    email: { type: String, required: true },
    status: { type: String, default: "Pending" },  // <--
  payment: { type: String, default: "Unpaid" }   // <--
  },
  { timestamps: true } // ✅ Automatically adds createdAt & updatedAt
);

module.exports = mongoose.model("Booking", bookingSchema);

