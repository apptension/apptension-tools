import {merge} from 'ramda';

export default () => merge({
  entry: null,
  output: null,
  watch: false,
  devtool: false,
  resolve: {
    extensions: ['', '.js'],
    alias: {}
  },
  plugins: [],
  module: {
    loaders: []
  },
  node: {
    __dirname: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  browser: {
    __dirname: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
});
