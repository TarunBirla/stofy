const express = require('express');
const router = express.Router();
const latestController = require('../controllers/latestController');

router.post('/latest/new', latestController.createLatest);
router.get('/demos', latestController.demohello);
router.get('/rating', latestController.ratingAllLatest);
router.get('/categories', latestController.categoriesAllLatest);
router.get('/latest', latestController.getAllLatest);
router.get('/level', latestController.levelAllLatest);
router.get('/latest/:id', latestController.getLatestById);
router.put('/latest/:id', latestController.updateLatest);
router.delete('/latest/:id', latestController.deleteLatest);
router.get('/speak', latestController.speakAllLatest);

router.get('/specialties', latestController.specialtiesAllLatest);

router.get('/country', latestController.countryAllLatest);

 module.exports = router;
