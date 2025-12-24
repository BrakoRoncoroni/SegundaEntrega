// src/routes/ofertas.router.js
const express = require('express');
const router = express.Router();
const Oferta = require('../models/Oferta');
const Producto = require('../models/Producto');

// POST /ofertas - Crear oferta 
router.post('/', async (req, res) => {
    try {
        const { productoId, precioOferta, duracionSegundos } = req.body;
        
        // Obtener el producto para calcular descuento
        const producto = await Producto.findById(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        // Calcular descuento
        const descuento = ((producto.precio - precioOferta) / producto.precio * 100).toFixed(2);
        
        // Crear fechas
        const fechaInicio = new Date();
        const fechaFin = new Date(fechaInicio.getTime() + duracionSegundos * 1000);
        
        // Crear oferta en MongoDB
        const newOff = new Oferta({
            producto: productoId,
            precioOferta: precioOferta,
            descuento: descuento,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            duracionMinutos: duracionSegundos / 60,
            activa: true
        });
        
        // Guardar en base de datos
        await newOff.save();
        
        // DESACTIVACIÓN AUTOMÁTICA 
        setTimeout(async () => {
            try {
                await Oferta.findByIdAndUpdate(newOff._id, { activa: false });
                console.log(`⏰ Oferta ${newOff._id} desactivada automáticamente`);
            } catch (err) {
                console.error('Error al desactivar oferta:', err);
            }
        }, duracionSegundos * 1000);
        
        res.status(201).json(newOff);
    } catch (error) {
        console.error('Error al crear oferta:', error);
        res.status(500).json({ message: 'Error al crear la oferta' });
    }
});

// GET /ofertas - Obtener todas las ofertas
router.get('/', async (req, res) => {
    try {
        // Obtener todas las ofertas de la base de datos
        const ofertas = await Oferta.find().populate('producto');
        res.status(200).json(ofertas);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).render("pages/error");
    }
});


// GET /ofertas/vista - Vista HTML de ofertas para el cliente
router.get('/vista', async (req, res) => {
    try {
        const ahora = new Date();
        
        // Buscar oferta activa
        const ofertaActiva = await Oferta.findOne({
            activa: true,
            fechaInicio: { $lte: ahora },
            fechaFin: { $gte: ahora }
        }).populate('producto');
        
        res.render('pages/ofertas', {
            ofertaActiva: ofertaActiva
        });
    } catch (error) {
        console.error('Error al cargar ofertas:', error);
        res.render('pages/ofertas', {
            ofertaActiva: null
        });
    }
});

// GET /ofertas/admin - Panel de administración
router.get('/admin', async (req, res) => {
    try {
        const ofertas = await Oferta.find().populate('producto').sort({ createdAt: -1 });
        const productos = await Producto.find();
        
        res.render('pages/admin', {
            ofertas,
            productos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar panel admin');
    }
});

// POST /ofertas/admin/crear - Crear oferta desde el panel admin
router.post('/admin/crear', async (req, res) => {
    try {
        const { productoId, duracionMinutos, descuento } = req.body;
        
        const producto = await Producto.findById(productoId);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        const precioOferta = producto.precio - (producto.precio * descuento / 100);
        
        await Oferta.updateMany(
            { producto: productoId, activa: true },
            { activa: false }
        );
        
        const fechaInicio = new Date();
        const fechaFin = new Date(fechaInicio.getTime() + duracionMinutos * 60000);
        
        const nuevaOferta = new Oferta({
            producto: productoId,
            precioOferta: precioOferta.toFixed(2),
            descuento,
            fechaInicio,
            fechaFin,
            duracionMinutos,
            activa: true
        });
        
        await nuevaOferta.save();
        
        setTimeout(async () => {
            try {
                await Oferta.findByIdAndUpdate(nuevaOferta._id, { activa: false });
                console.log(`⏰ Oferta ${nuevaOferta._id} desactivada automáticamente`);
            } catch (err) {
                console.error('Error al desactivar oferta:', err);
            }
        }, duracionMinutos * 60000);
        
        res.json({ 
            success: true, 
            mensaje: 'Oferta creada exitosamente',
            oferta: nuevaOferta
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// POST /ofertas/admin/desactivar/:id - Desactivar oferta manualmente
router.post('/admin/desactivar/:id', async (req, res) => {
    try {
        await Oferta.findByIdAndUpdate(req.params.id, { activa: false });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /ofertas/admin/:id - Eliminar oferta
router.delete('/admin/:id', async (req, res) => {
    try {
        await Oferta.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;