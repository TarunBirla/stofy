const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/contact', contactController.createcontact);
router.get('/contactshow', contactController.getAllContact);

module.exports = router;
