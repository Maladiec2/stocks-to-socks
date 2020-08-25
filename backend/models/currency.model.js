const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const currencySchema = new Schema({
    Tp: {
        type: Array,
        required: true,
    },
    Dt: {
        type: Array,
        required: true,
    },
    CcyAmt: [
        { Ccy: { type: Array, required: true }, Amt: { type: Array, required: true } }
    ]
});

const Currency = mongoose.model('Currency', currencySchema);

module.exports = Currency;