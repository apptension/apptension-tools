import {evolve, append, concat} from 'ramda';

export default () => evolve({
  module: {
    loaders: append({
      test: /\.tsx?$/,
      exclude: /node_modules|bower_components|vendor_modules/,
      loader: 'ts-loader'
    })
  },
  resolve: {
    extensions: concat(['.ts', '.tsx'])
  }
});
