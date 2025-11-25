const express = require('express')
const app = express();
const routes = require("./routes/index");
const { paths } = require ("./config/config");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuracion para routes
app.use("/api", routes);

// Configuracion de carpeta public
app.use("/public", express.static(paths.public));
console.log("---------->", paths.public); //Consologueo para probar si esta llegando correctamente el path;

app.get('/', (req, res) => {
  res.render("pages/home", {})
}); 



 
 


app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app;