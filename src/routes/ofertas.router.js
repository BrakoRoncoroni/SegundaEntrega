const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


const ofertas = []

router.post('/', (req, res) => {
    try {
        const { productoId, precioOferta, duracionSegundos } = req.body;
    const newOff = {
        id: uuidv4(),
        productoId: productoId,
        precioOferta: precioOferta,
        duracionSegundos: duracionSegundos,
        activa: true
    };
    ofertas.push(newOff);
    res.status(201).json(newOff);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la oferta' });
    }
});

router.get('/', (req, res)=>{
    try {
        res.status(200).send(ofertas)
    } catch (error) {
        console.error("Error: ", error)
        res.status(200).render("pages/error")
    }
})
module.exports = router;