// Variable to store all the countries
var countries = []
const API_KEY = "x1livdx5oej62t";
const axios = require('axios');

exports.getCountries = async function(req, res){

    console.log("Numbeo Controller Running: Get countries");

    // Url to get the cities from external api
    const URL = `https://www.numbeo.com/api/cities?api_key=${API_KEY}`;

    // get data from url
    async function fetchData(){
        const response = await axios(URL);
        const data = response.data;

        data.cities.forEach(item => {
            if(countries.includes(item.country)){
                null;    
            }
            else{
                countries.push(item.country);
            }
        });
        
        res.header("Content-Type","application/json");
        res.send(JSON.stringify(countries));
    }

    fetchData();
}

exports.getCountryData = async function(req, res){
    console.log("Numbeo Controller Running: Get single country's data");

    const country = req.body.country;
    
    // Url to get the data from external api
    const URL = `https://www.numbeo.com/api/country_indices?api_key=${API_KEY}&country=${country}`;

    async function fetchData(){
        const response = await axios(URL);
        const data = response.data;
        
        res.header("Content-Type","application/json");
        res.send(JSON.stringify(data));
    }

    fetchData();
}