const mongoose = require('mongoose');


const mulitipleFileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    fono: {
        type: String,
        required: true
    },
    comuna: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    indicaciones: {
        type: String
    },
    destinatario: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Hogar', mulitipleFileSchema);