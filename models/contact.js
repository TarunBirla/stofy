const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    option: String,
    description: String,
});

module.exports = mongoose.model("ContactSchema", ContactSchema);
