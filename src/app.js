const express = require('express')
const app = express();
const routes = require("./routes/index");
const path = require('path');


const handlebars = require("express-handlebars");
const { paths } = require ("./config/config");

//Seteo y configuracion de Handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);
app.set("view engine", "hbs");
app.set("views", paths.views);
console.log("------>", paths.views);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuracion para routes
app.use("/api", routes);

// Configuracion de carpeta public
app.use("/public", express.static(paths.public));
console.log("---------->", paths.public); //Consologueo para probar si esta llegando correctamente el path;

app.get('/', (req, res) => {
 return res.render("pages/home", {})
}); 



app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app;