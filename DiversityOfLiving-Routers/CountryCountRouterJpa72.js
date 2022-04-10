var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var controller = require("../DiversityOfLiving-Controllers/CountryCountControllerJpa72")

router.get('/', controller.getCountryCount);
router.post('/:country', controller.addCountryCount);
//router.put('/:name', controller.updateCountryCount);

module.exports = router;