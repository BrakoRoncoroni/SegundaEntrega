const express = require('express');
const router = express.Router();

const productRouter = require('./products.router');
const usersRouter = require('./users.router');

router.use("/products", productRouter);
router.use('/users', usersRouter);

module.exports = router;
