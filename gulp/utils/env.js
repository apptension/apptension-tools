var DEVELOPMENT = 1;
var PRODUCTION = 2;

var _value = DEVELOPMENT;
var _productionSourceMap = false;

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
  },

  addProductionSourceMap: function () {
    _productionSourceMap = true;
  },

  isSourceMapRequired: function () {
    return _productionSourceMap;
  }
};
