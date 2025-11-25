const path = require('path');

module.exports = {
    PORT: 3030,
    paths: {
        public: path.join (__dirname, '../../public'),
        views: path.join(__dirname, '../../src/views')
    },
};