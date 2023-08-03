const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

//
//api router
//
const bootcampController = require('./bootcamp/index');
router.use('/bootcamp', bootcampController);

module.exports = router;