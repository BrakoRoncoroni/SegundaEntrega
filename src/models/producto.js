const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    descripcion: String,
    imagen: String,
    stock: {
        type: Number,
        default: 0
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema);