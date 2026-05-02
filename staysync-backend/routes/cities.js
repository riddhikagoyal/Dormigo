const express = require("express");
const router = express.Router();
const CityData = require("../models/CityData");

// ✅ Get all cities
router.get("/", async (req, res) => {
  try {
    const cities = await CityData.find({}, "city");
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get data for one city
router.get("/:city", async (req, res) => {
  try {
    const city = await CityData.findOne({
      city: new RegExp(`^${req.params.city}$`, "i"), // case-insensitive
    });
    if (!city) return res.status(404).json({ message: "City not found" });
    res.json(city);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add new city data (whole document)
router.post("/", async (req, res) => {
  try {
    const newCity = new CityData(req.body);
    await newCity.save();
    res.status(201).json(newCity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ➕ Dynamic route: add data to any category (hostels, institutes, libraries, hospitals)
router.post("/:city/:type", async (req, res) => {
  try {
    const { city, type } = req.params;

    // ✅ Only allow certain fields
    const allowedTypes = ["hostels", "institutes", "libraries", "hospitals"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    // ✅ Handle single object OR array of objects
    const data = Array.isArray(req.body) ? { $each: req.body } : req.body;

    const updatedCity = await CityData.findOneAndUpdate(
      { city: new RegExp(`^${city}$`, "i") }, // case-insensitive match
      { $push: { [type]: data } },            // push one or many
      { new: true }
    );

    if (!updatedCity) return res.status(404).json({ message: "City not found" });
    res.json(updatedCity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;



