var path = require('path');
var fs = require('fs');


var userConfig = {};
var userConfigFilePath = path.join(process.cwd(), 'gulp', '.configrc');
try {
    var userConfigStats = fs.statSync(userConfigFilePath);
    if (userConfigStats.isFile()) {
        userConfig = JSON.parse(fs.readFileSync(userConfigFilePath));
    }
} catch (ignore) {
}

module.exports = userConfig;
