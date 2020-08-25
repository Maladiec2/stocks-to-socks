const router = require('express').Router();
const axios = require('axios');
let Currency = require('../models/currency.model');

router.route('/').get((req, res) => {
    Currency.find()
        .then(currencies => res.json(currencies))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const Tp = req.body.Tp;
    const Dt = req.body.Dt;
    const CcyAmt = req.body.CcyAmt;

    const newCurrency = new Currency({ Tp, Dt, CcyAmt });

    newCurrency.save()
        .then(() => res.json('Currency added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/getRates', (req, res) => {
    let fxrates = [];
    axios.get('http://localhost:5000/currencies/')
        .then((response) => {
            for (var iterator in response.data) {
                fxrates.push(response.data[iterator].CcyAmt[1]);
            }
            fxrates.push(response.data[0].CcyAmt[0])
            res.json(fxrates)
        }
        )
        .catch(err => res.status(400).json('Error: ' + err));

}
)

module.exports = router;