const express = require('express')
const app = express();
const routes = require("./routes/index");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const handlebars = require("express-handlebars");
const { paths } = require ("./config/config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Seteo y configuracion de Handlebars con metodo ".engine"
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", paths.views);
// console.log("------>", paths.views); //Consologueo para probar si esta llegando correctamente el path;

//Configuracion para que funcionen las routes de la carpeta router
app.use("/api", routes);

// Configuracion de carpeta public
app.use("/public", express.static(paths.public));
// console.log("---------->", paths.public); //Consologueo para probar si esta llegando correctamente el path;

//Configuracion de rutas-----------------------------------------------
app.get('/', (req, res) => {
 return res.render("pages/home", {})
}); 

// /products.hbs
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
        name: "Piano Steinway & Sons",
        category: "Instrumentos",
        price: 8000,
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
        name: "Micrófono Shure SM7b",
        category: "Accesorios",
        price: 100, 
    },
]
console.log(products);
//middleware products
app.get("/products", (req, res) => {
try {
    const context = {
    products,
  };
  return res.status(200).render("pages/products", context);
} catch (error) {
    return res.status(500).json({ error: "Error al cargar los productos" });
}
});

//middleware admin
app.get("/admin", (req, res)=>{
  try {
    // const context = {
    //   title: "Panel Admin",
    // };
    return res.status(200).render("pages/admin")
  } catch (error) {
    console.error("Error: ", error)
    return res.status(500).render("pages/error")
  }
})

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