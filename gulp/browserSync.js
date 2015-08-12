var browserSync = require('./utils/browserSyncInstance');
var config = require('./config');


module.exports = function () {
    browserSync.init({
        proxy: config.domain + ':' + config.port,
        ws: true
    });
};
