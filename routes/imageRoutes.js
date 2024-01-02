const express = require('express');
const multer = require('multer');
const imageModel = require('../models/imageModel');

const router = express.Router();
const upload = multer();

router.post('/upload', upload.single('image'), imageModel.uploadImage);

module.exports = router;
