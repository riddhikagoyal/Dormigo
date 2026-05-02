const mongoose = require("mongoose");

const cityDataSchema = new mongoose.Schema({
  city: { type: String, required: true, unique: true },
  hostels: [
    {
      name: String,
      address: String,
      price: String,
      contact: String,
      image: String,
    }
  ],
  institutes: [
    {
      name: String,
      address: String,
      rating: Number,
      website: String,
      image: String,
    }
  ],
  libraries: [
    {
      name: String,
      address: String,
      facilities: [String],
      image: String,
    }
  ],
  hospitals: [
    {
      name: String,
      address: String,
      phone: String,
      image: String,
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("CityData", cityDataSchema);
