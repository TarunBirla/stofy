const contact = require("../models/contact");


const createcontact = async (req, res) => {
    try {
        const product = await contact.create(req.body);
        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
const getAllContact = async (req, res) => {
    try {
        const Contact = await contact.find();
        res.status(200).json({ success: true, Contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    createcontact,
    getAllContact,
};
