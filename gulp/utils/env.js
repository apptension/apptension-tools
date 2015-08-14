var DEVELOPMENT = 1;
var PRODUCTION = 2;

var _value = DEVELOPMENT;

module.exports = {
  DEVELOPMENT: DEVELOPMENT,
  PRODUCTION: PRODUCTION,

  isProduction: function () {
    return _value === PRODUCTION;
  },

  isDevelopment: function () {
    return _value === DEVELOPMENT;
  },

  'set': function (value) {
    _value = value;
  }
};
