const mongoose = require("mongoose");

const latestSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    rating: Number,
    level: String,
    categories: String, // Assuming categories is an array of strings
    duration: String,
    country: String,
    speak: String,
    specialties: String,
    image:String,
});

module.exports = mongoose.model("Latest", latestSchema);
