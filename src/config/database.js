// src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mi-tienda');
        console.log('✅ MongoDB conectado exitosamente');
    } catch (error) {
        console.error('❌ Error al conectar MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;