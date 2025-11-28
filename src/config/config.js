const path = require('path');

module.exports = {
    PORT: 3030,
    paths: {
        public: path.join (__dirname, '../../public'),
        views: path.join(__dirname, '../views') // esto no lo vi en clase, copiado de archivo base de clases
    },
};