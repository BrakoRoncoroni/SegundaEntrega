const express = require('express');
const router = express.Router();

const productRouter = require('./products.router');
const usersRouter = require('./users.router');
const ofertasRouter = require('./ofertas.router');

router.use("/products", productRouter);
router.use('/users', usersRouter);
router.use("/ofertas", ofertasRouter);

module.exports = router;
