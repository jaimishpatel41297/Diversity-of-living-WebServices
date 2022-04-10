var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var controller = require("../DiversityOfLiving-Controllers/FAQControllerJpa72")

router.get('/', controller.getAllFaqs);
router.get('/:data', controller.getFaqsWithCondition);
// router.get('/:country', controller.getAllcountryFaqs);
router.post('/', controller.addFaq);
// router.put('/:id', controller.updateFaq);
router.put('/', controller.updateFaq);
router.delete('/', controller.removeFaq);

module.exports = router;