const User = require("../DiversityOfLiving-Models/UserModelJpa72");

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

exports.userRegistration = async function (req, res) {
    var hashPass = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
        usertype: req.body.usertype
    },
        function (err, user) {
            if (err) return res.status(500).send({ auth: false })
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400
            });
            res.status(200).send({ auth: true, token: token });
        });
}

exports.userChangePassword = async function (req, res) {
    var hashPass = bcrypt.hashSync(req.body.password, 8);
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send({ auth: false });
        if (!user) return res.status(404).send({ auth: false });

        User.findByIdAndUpdate(user._id, { name: user.name, email: user.email, password: hashPass, usertype: user.usertype }, { new: true }, function (err, faq) {
            if (err) return res.status(500).send({ auth: false });
            // res.status(200).send(user);
            else return res.status(500).send({ auth: true });
        });
    });
}

exports.getAllusers = async function (req, res) {

    await User.find({}, function (err, user) {
        if (err) return res.status(500).send({ auth: false });
        res.status(200).send(user);
    });
}

exports.getOneUser = async function(req, res){
    await User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send({ auth: false });
        res.status(200).send(user);
    });
}

exports.userLogin = async function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send({ auth: false });
        if (!user) return res.status(404).send({ auth: false });

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        });

        res.status(200).send({ auth: true, token: token, userid: user._id, username: user.name });
    });
}

exports.deleteUser = async function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: " + user.name + " was deleted.");
    });
}

exports.updateUser = async function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
}

exports.deleteAllUsers = async function(req, res) {
    User.remove({}, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the users.");
        res.status(200).send(user);
    });
}

