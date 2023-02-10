const mongoose = require('mongoose');


const mulitipleFileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    rut: {
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
    title: {
        type: String
    },
    fono: {
        type: String
    },
    email: {
        type: String
    },
    fotos: {type: Array, "default" : []}
}, {
    timestamps: true
});

module.exports = mongoose.model('Institucion', mulitipleFileSchema);