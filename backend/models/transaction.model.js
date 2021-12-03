const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    Sender: {
        type: String,
        required: true,
    },
    Beneficiary: {
        type: String,
        required: true,
    },
    AccountNumber: {
        type: Number,
        required: true,
    },
    Amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;