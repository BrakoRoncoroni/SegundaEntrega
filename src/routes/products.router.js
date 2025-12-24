const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
const upload = require('../config/multer');

// Crear nuevo producto desde el panel admin CON IMAGEN
router.post('/admin/crear', upload.single('imagen'), async (req, res) => {
    try {
        const { nombre, categoria, precio, descripcion, stock } = req.body;
        
        // Si se subió una imagen, usar su ruta; si no, usar imagen por defecto
        const imagenPath = req.file 
            ? `/public/uploads/${req.file.filename}` 
            : '/public/img/default.jpg';
        
        const nuevoProducto = new Producto({
            nombre,
            categoria,
            precio,
            descripcion: descripcion || '',
            imagen: imagenPath,
            stock: stock || 0,
            activo: true
        });
        
        await nuevoProducto.save();
        
        res.json({ 
            success: true, 
            mensaje: 'Producto creado exitosamente',
            producto: nuevoProducto
        });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Actualizar producto CON IMAGEN
router.put('/admin/editar/:id', upload.single('imagen'), async (req, res) => {
    try {
        const { nombre, categoria, precio, descripcion, stock } = req.body;
        
        // Preparar datos a actualizar
        const datosActualizar = {
            nombre,
            categoria,
            precio,
            descripcion,
            stock
        };
        
        // Si se subió una nueva imagen, actualizar la ruta
        if (req.file) {
            datosActualizar.imagen = `/public/uploads/${req.file.filename}`;
        }
        
        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            datosActualizar,
            { new: true }
        );
        
        if (!productoActualizado) {
            return res.status(404).json({ 
                success: false, 
                error: 'Producto no encontrado' 
            });
        }
        
        res.json({ 
            success: true, 
            mensaje: 'Producto actualizado',
            producto: productoActualizado
        });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Eliminar producto (desactivar)
router.delete('/admin/eliminar/:id', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            { activo: false },
            { new: true }
        );
        
        if (!producto) {
            return res.status(404).json({ 
                success: false, 
                error: 'Producto no encontrado' 
            });
        }
        
        res.json({ 
            success: true, 
            mensaje: 'Producto eliminado'
        });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        
        if (!producto) {
            return res.status(404).json({ 
                success: false, 
                error: 'Producto no encontrado' 
            });
        }
        
        res.json({ 
            success: true, 
            producto 
        });
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

module.exports = router;