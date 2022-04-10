const Faq = require("../DiversityOfLiving-Models/FAQModelJpa72");


exports.getAllFaqs = async function (req, res) {
    await Faq.find({}, function (err, faqs) {
        if (err) return res.status(500).send({ response: false });
        res.status(200).send(faqs);
    });
}

// exports.getAllUserBasedFaqs = async function (req, res) {
//     await Faq.find({ userid: req.params.id }, function (err, faqs) {
//         if (err) return res.status(500).send({ response: false });
//         if (!faqs) return res.status(404).send({ response: false });
//         res.status(200).send(faqs);
//     })
// }

exports.getFaqsWithCondition = async function (req, res) {
    await Faq.find({ $or: [{ userid: req.params.data }, { country: req.params.data }] }, function (err, faqs) {
        if (err) return res.status(500).send({ response: false });
        if (!faqs) return res.status(404).send({ response: false });
        res.status(200).send(faqs);
    })
}

// exports.getAllcountryFaqs = async function (req, res) {
//     await Faq.find({ country: req.params.country }, function (err, faqs) {
//         if (err) return res.status(500).send({ response: false });
//         if (!faqs) return res.status(404).send({ response: false });
//         res.status(200).send(faqs);
//     })
// }

exports.addFaq = async function (req, res) {
    // User.findOne({ email: req.body.email }, function (err, user) { });
    await Faq.create({
        userid: req.body.userid,
        country: req.body.country,
        faqquestion: req.body.faqquestion,
        faqanswer: req.body.faqanswer,
        ansflag: false
    },
        function (err, faq) {
            if (err) return res.status(500).send({ response: false });
            res.status(200).send(faq);
        });
}

exports.updateFaq = async function (req, res) {
    Faq.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, faq) {
        if (err) return res.status(500).send({ response: false });
        res.status(200).send(faq);
    })
}

// exports.updateFaq = async function (req, res) {
//     Faq.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, faq) {
//         if (err) return res.status(500).send({ response: false });
//         res.status(200).send(faq);
//     })
// }

exports.removeFaq = async function (req, res) {
    Faq.findByIdAndRemove(req.body.id, function (err, faq) {
        if (err) return res.status(500).send({ response: false });
        res.status(200).send({ response: true });
    });
}