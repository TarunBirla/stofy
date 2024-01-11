const Latest = require('../models/latest');
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

const createLatest = async (req, res) => {
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
            const product = await Latest.create(req.body);
            res.status(201).json({ success: true, product });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error: " + error.message });
    }
};
const demohello = async (req, res) => {
    try {
        const product = 'heelo world';
        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
// End add code///
//  get code///
const getAllLatest = async (req, res) => {
    try {
        const products = await Latest.find();
        console.log('products',products);
        
        if(products === null){
        res.status(404).json({ success: false, message: 'not found' });

        }
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message:error.message });
    }
};
  
// End get code///

//categories////
const categoriesAllLatest = async (req, res) => {
    try {
        const products = await Latest.find({}, { categories: 1, _id: 0 });

        const uniqueCategories = [...new Set(products.flatMap(product => product.categories))];

        const formattedCategories = uniqueCategories.map(category => ({ cate: category }));

        res.status(200).json({ success: true, categories: formattedCategories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
// end categories////

//level////
const levelAllLatest = async (req, res) => {
    try {
        const products = await Latest.find({}, { level: 1, _id: 0 });

        const uniqueCategories = [...new Set(products.flatMap(product => product.level))];

        const formattedCategories = uniqueCategories.map(levels => ({ level: levels }));

        res.status(200).json({ success: true, level: formattedCategories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
//End Level///
const ratingAllLatest = async (req, res) => {
    try {
        const products = await Latest.find({}, { rating: 1, _id: 0 });

        const uniqueCategories = [...new Set(products.flatMap(product => product.rating))];

        const formattedCategories = uniqueCategories.map(rating => ({ rating: rating }));

        res.status(200).json({ success: true, rating: formattedCategories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
const countryAllLatest = async (req, res) => {
    try {
        const products = await Latest.find({}, { country: 1, _id: 0 });

        const uniqueCategories = [...new Set(products.flatMap(product => product.country))];

        const formattedCategories = uniqueCategories.map(country => ({ country: country }));

        res.status(200).json({ success: true, country: formattedCategories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
const speakAllLatest = async (req, res) => {
    try {
        const products = await Latest.find({}, { speak: 1, _id: 0 });

        const uniqueCategories = [...new Set(products.flatMap(product => product.speak))];

        const formattedCategories = uniqueCategories.map(speak => ({ speak: speak }));

        res.status(200).json({ success: true, speak: formattedCategories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
const specialtiesAllLatest = async (req, res) => {
    try {
        const products = await Latest.find({}, { specialties: 1, _id: 0 });

        const uniqueCategories = [...new Set(products.flatMap(product => product.specialties))];

        const formattedCategories = uniqueCategories.map(specialties => ({ specialties: specialties }));

        res.status(200).json({ success: true, specialties: formattedCategories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// speak:String,
// specialties:String,
//by id ahow get//
const getLatestById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Latest.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
//end by id ahow get//
//Update code//
const updateLatest = async (req, res) => {
    try {
        const product = await Latest.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false, runValidators: true });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
//End Update code//

//Delete///
const deleteLatest = async (req, res) => {
    // ... [Delete Product Logic]
    try {
        const product = await Latest.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        await product.deleteOne();

        res.status(200).json({ success: true, message: "Latest deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
//end Delete/////

module.exports = {
    createLatest,
    categoriesAllLatest,
    getAllLatest,
    levelAllLatest,
    getLatestById,
    updateLatest,
    deleteLatest,
    ratingAllLatest,
    countryAllLatest,
    speakAllLatest,
    specialtiesAllLatest,
    demohello,
};
