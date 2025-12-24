const express = require('express')
const app = express();
const routes = require("./routes/index");
const productosRouter = require('./routes/products.router');
const path = require('path');
const connectDB = require('./config/database');
const Producto = require('./models/Producto'); // 

connectDB();

const handlebars = require("express-handlebars");
const { paths } = require ("./config/config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Seteo y configuracion de Handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", paths.views);

//Configuracion para que funcionen las routes
app.use("/api", routes);
app.use("/productos", productosRouter);

// Configuracion de carpeta public
app.use("/public", express.static(paths.public));

//Configuracion de rutas-----------------------------------------------
app.get('/', (req, res) => {
 return res.render("pages/home", {})
}); 

//
app.get("/products", async (req, res) => {
  try {
    const todosLosProductos = await Producto.find({}).lean(); 
    
    console.log('Productos encontrados:', todosLosProductos.length);
    
    const context = {
      products: todosLosProductos,
    };
    return res.status(200).render("pages/products", context);
  } catch (error) {
    console.error("Error al cargar productos:", error);
    return res.status(500).json({ error: "Error al cargar los productos" });
  }
});

//middleware admin - 
app.get("/admin", async (req, res) => {
  try {
    const productos = await Producto.find().sort({ createdAt: -1 }).lean();
    
    return res.status(200).render("pages/admin", {
      productos
    });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).render("pages/error");
  }
});

//middleware carrito
app.get("/cart", (req, res)=>{
  try {
    return res.status(200).render("pages/cart")
  } catch (error) {
    console.error("Error: ", error)
    return res.status(500).render("pages/error")
  };
})

//middleware error
app.get("/error", (req, res)=>{
  try {
    return res.status(200).render("pages/error")
  } catch (error) {
    console.error("Error: ", error)
    return res.status(500).render("pages/error")
  }
})

//middleware ofertas
app.get("/ofertas", (req, res) => {
  try {
    return res.status(200).render("pages/ofertas")
  } catch (error) {
    console.error("Error: ", error)
    return res.status(500).render("pages/error")
  }
})

module.exports = app;