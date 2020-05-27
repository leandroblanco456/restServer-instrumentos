
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let instumentoSchema = new Schema({
    instrumento: {
        type: String,
        required: [true, 'El nombre del instrumento es necesario']
    },
    marca: {
        type: String,
        required: [true,'La marca del instrumento es necesaria']
    },
    modelo: {
        type: String,
        required: [true, 'El modelo es necesario']
    },
    imagen: {
        type: String,
        default: false
    },
    precio: {
        type: Number,
        required: [true, 'El precio es necesario']
    },
    costoEnvio: {
        type: String,
        required: [true, 'costoEnvio es necesario']
    },
    cantidadVendida: {
        type: Number,
        required: [true, 'cantidadVendida es necesario']

    },
    descripcion: {
        type: String,
        required: [true, 'descripcion necesaria']

    },
});

module.exports = mongoose.model( 'Instrumento', instumentoSchema );