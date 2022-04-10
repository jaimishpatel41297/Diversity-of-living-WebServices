const express = require('express');
const router = express.Router();

// Controllers
const numbeoController = require("../DiversityOfLiving-Controllers/NumbeoControllerAra65");

// Routes
router.get('/countries', numbeoController.getCountries);
router.post('/country_data', numbeoController.getCountryData);

module.exports = router;