var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('../VerifyTokenAra65');
const User = require("../DiversityOfLiving-Models/UserModelJpa72");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var controller = require("../DiversityOfLiving-Controllers/UserControllerJpa72")

router.get('/', controller.getAllusers);
router.get('/single/:id', controller.getOneUser);
router.post('/register', controller.userRegistration);
router.post('/login', controller.userLogin);
router.get('/logout', function (req, res) {
    res.status(200).send({ auth: false, token: null });
});
router.put(`/update/:id`, controller.updateUser);
router.delete("/delete/:id", controller.deleteUser);
router.delete("/deleteAll", controller.deleteAllUsers);
router.post('/changePassword', controller.userChangePassword);
router.get('/me', VerifyToken, function (req, res, next) {

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user);
    });

});
module.exports = router;