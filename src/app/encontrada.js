const mongoose = require('mongoose');


const mulitipleFileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    comuna: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    fotos: {type: Array, "default" : []}
}, {
    timestamps: true
});

module.exports = mongoose.model('Found', mulitipleFileSchema);