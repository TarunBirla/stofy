const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/blog/new', blogController.createBlogs);
router.get('/blogs', blogController.getAllblog);

 module.exports = router;
