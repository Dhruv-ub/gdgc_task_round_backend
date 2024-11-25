const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  seller: { type: String, required: true },
  rating: { type: Number, default: 0 },
});

module.exports = mongoose.model("Listing", ListingSchema);
