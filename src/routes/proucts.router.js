const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

//productos de una tienda de musica
const products = [
    {
        id: uuidv4(),
        name: "Guitarra Fender Stratocaster",
        category: "Instrumentos",
        price: 1200,
    },
    {
        id: uuidv4(),
        name: "Batería Yamaha Stage Custom",
        category: "Instrumentos",
        price: 1500,
    },
    {
        id: uuidv4(),
        name: "Teclado Korg Krome",
        category: "Instrumentos",
        price: 1000,
    },
    {
        id: uuidv4(),
        name: "Amplificador Marshall MG15CF",
        category: "Instrumentos",
        price: 300,
    },
    {
        id: uuidv4(),
        name: "Audífonos Audio-Technica ATH-M50x",
        category: "Accesorios",
        price: 150,     
    },
    {
        id: uuidv4(),
        name: "Micrófono Shure SM58",
        category: "Accesorios",
        price: 100, 
    },
    {
        id: uuidv4(),
        name: "Cables de audio Mogami Gold",
        category: "Accesorios",
        price: 80,  
    },
    {   
        id: uuidv4(),
        name: "Soporte para micrófono On-Stage Stands",
        category: "Accesorios",
        price: 40,  
    }
    
];

router.get('/', (req, res) => {
    res.status(200).json(products);
});

router.get('/:id', (req, res) => {
    try {
            const { id } = req.params;
    const product = products.find(p => p.id === id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
    } catch (error) {
     res.status(500).json({ message: 'Error al obtener el producto' });   
    }
});

router.post('/', (req, res) => {
    try {
        const { name, category, price } = req.body;
    const newProduct = {
        id: uuidv4(),
        name,
        category,
        price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto' });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;  
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
});


module.exports = router;
