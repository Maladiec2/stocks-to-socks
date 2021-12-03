const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Sender: {
        type: Number,
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

const User = mongoose.model('User', userSchema);

module.exports = User;