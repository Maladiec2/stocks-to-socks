const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userLogSchema = new Schema({
    eventType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Log = mongoose.model('Log', userLogSchema);

module.exports = Log;