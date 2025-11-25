const expresss = require("express");
const router = require("./routes/index");

router.get('/', (req, res) => {
  res.status(200).json({ message: "Este es el carrito de compras" });
});

router.post("/", (req, res)=>{
    try {
        const newItem = req.body;
        res.status(200).json({ message: "Item agregado al carrito", item: newItem });    
        console.log(newItem);
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el item al carrito" });
        console.error("Error al agregar el item al carrito:", error);
    };
});

module.exports = router;