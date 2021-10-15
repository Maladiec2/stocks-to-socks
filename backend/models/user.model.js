const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Id: {
        type: Number,
        required: true,
    },
    Pass: {
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
    Balance: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;