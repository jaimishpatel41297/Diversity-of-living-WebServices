const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
const port = 8000;
//const mongoDbUrl = "mongodb+srv://DiversityOfLiving:3380DiversityOfLiving@diversityoflivingdataba.shlye.mongodb.net/diversityofliving";
const mongoDbUrl = "mongodb://localhost:27017/diversityofliving";

const corsOptions = {
    origin: "*",
    credentials: true
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

// Routers
const numbeoRouter = require('./DiversityOfLiving-Routers/NumbeoRouterAra65');
const userRouter = require('./DiversityOfLiving-Routers/UserRouterJpa72');
const faqRouter = require('./DiversityOfLiving-Routers/FAQRouterJpa72');
const countryCountRouter = require('./DiversityOfLiving-Routers/CountryCountRouterJpa72');

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// })

// Using Routers
app.use('/numbeo', numbeoRouter);
app.use('/faq', faqRouter);
app.use('/countrycount', countryCountRouter);
app.use('/user', userRouter);

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
});
