const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");

router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json({ data: listings });
  } catch (err) {
    res.status(500).json({ error: "Error fetching listings" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    res.json({ data: listing });
  } catch (err) {
    res.status(500).json({ error: "Error fetching listing" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, seller, rating } = req.body;
    const newListing = new Listing({ title, description, seller, rating });
    const savedListing = await newListing.save();
    res.json({ data: savedListing });
  } catch (err) {
    res.status(500).json({ error: "Error creating listing" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedListing)
      return res.status(404).json({ error: "Listing not found" });
    res.json({ data: updatedListing });
  } catch (err) {
    res.status(500).json({ error: "Error updating listing" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing)
      return res.status(404).json({ error: "Listing not found" });
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting listing" });
  }
});

module.exports = router;
