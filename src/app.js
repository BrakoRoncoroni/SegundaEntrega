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
    // layoutsDir: path.join(__dirname, "views/layouts"), codigo que esta comentado en el archivo de clase
    // partialsDir: path.join(__dirname, "views/partials"), // codigo que esta comentado en el archivo de clase, no se entiende si se debe poner o no
  })
);
app.set("view engine", "hbs");
app.set("views", paths.views);
console.log("------>", paths.views); //Consologueo para probar si esta llegando correctamente el path;

//Configuracion para routes
app.use("/api", routes);

// Configuracion de carpeta public
app.use("/public", express.static(paths.public));
console.log("---------->", paths.public); //Consologueo para probar si esta llegando correctamente el path;

//Configuracion de rutas
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
app.get("/products", (req, res) => {
  const context = {
    products,
  };
  return res.render("pages/products", context);
});


module.exports = app;