const mongoose = require('mongoose');

const ofertaSchema = new mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    precioOferta: {
        type: Number,
        required: true
    },
    descuento: {
        type: Number,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    duracionMinutos: {
        type: Number,
        required: true
    },
    activa: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Oferta', ofertaSchema);