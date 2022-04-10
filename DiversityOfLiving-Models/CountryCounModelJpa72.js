var mongoose = require('mongoose');
var CountrySchema = new mongoose.Schema({
    country: String,
    count: String,
});
mongoose.model('CountryCount', CountrySchema);

module.exports = mongoose.model('CountryCount');