const CountryCount = require("../DiversityOfLiving-Models/CountryCounModelJpa72");

exports.getCountryCount = async function (req, res) {
    await CountryCount.find({}, function (err, countrycounts) {
        if (err) return res.status(500).send({ response: false });
        res.status(200).send(countrycounts);
    });
}

exports.addCountryCount = async function (req, res) {
    
    const countryData = await CountryCount.findOne({country: req.params.country});

    if(countryData !== null) {
        countryData.count = parseInt(countryData.count) + 1;
        await countryData.save();
        res.status(200).send(countryData);
    } else {
        await CountryCount.create({
            country: req.params.country,
            count: 1,
        },
        function (err, countrycounts) {
            if (err) return res.status(500).send({ mresponsesg: false });
            res.status(200).send(countrycounts);
        });
    }
}