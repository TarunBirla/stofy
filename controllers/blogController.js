const Blogs = require("../models/blog");
const multer = require("multer");
const path = require("path");

const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads';

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
    },
});
const upload = multer({ storage: storage });

const createBlogs = async (req, res) => {
    try {
        upload.single("image")(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                // A multer error occurred when uploading.
                console.error(err);
                return res.status(500).json({ success: false, message: "Multer Error: " + err.message });
            } else if (err) {
                // An unknown error occurred.
                console.error(err);
                return res.status(500).json({ success: false, message: "Error uploading image: " + err.message });
            }

            // Check if a file was uploaded
            if (!req.file) {
                return res.status(400).json({ success: false, message: "No image uploaded" });
            }

            // Assign the uploaded file path to the image field
            req.body.image = req.file.filename;

            // Create the blog entry in the database
            const product = await Blogs.create(req.body);
            res.status(201).json({ success: true, product });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error: " + error.message });
    }
};

const getAllblog = async (req, res) => {
    try {
        const products = await Blogs.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    createBlogs,
    getAllblog,
};
