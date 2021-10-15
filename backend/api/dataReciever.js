const axios = require('axios');
const parser = require('xml2js');
let Currency = require('../models/currency.model');

var currencyList = {};

const deleteAllData = async () => {
    try {
        await Currency.deleteMany();
    } catch (err) {
        console.log(err);
    }
}

function getData() {
    axios.get('https://www.lb.lt//webservices/FxRates/FxRates.asmx/getCurrentFxRates?tp=LT')
        .then(response => {

            deleteAllData();

            parser.parseString(response.data, (err, result) => {
                var parsedData = JSON.stringify(result, null);
                currencyList = JSON.parse(parsedData);
            })

            for (var iterator in currencyList) {
                for (var iterator1 in currencyList[iterator].FxRate) {
                    axios.post('http://localhost:5000/currencies/add', currencyList[iterator].FxRate[iterator1])
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
            //console.log('Database Is Up To Date')
        })
}
getData();