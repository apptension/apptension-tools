import {evolve, append} from 'ramda';

export default () => evolve({
  module: {
    loaders: append({
      test: /\.jsx?$/,
      exclude: /node_modules|bower_components|vendor_modules/,
      loader: 'babel'
    })
  },
  resolve: {
    extensions: append('.jsx')
  }
});
