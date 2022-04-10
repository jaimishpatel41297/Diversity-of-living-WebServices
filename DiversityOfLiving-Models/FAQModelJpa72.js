var mongoose = require('mongoose');
var FaqSchema = new mongoose.Schema({
    userid: String,
    country: String,
    faqquestion: String,
    faqanswer: String,
    ansflag: Boolean
});
mongoose.model('Faq', FaqSchema);

module.exports = mongoose.model('Faq');