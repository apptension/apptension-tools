import {evolve, append} from 'ramda';
import combineLoaders from 'webpack-combine-loaders';

export default () => evolve({
  module: {
    loaders: append({
      test: /\.css$/,
      loader: combineLoaders([
        {loader: 'style-loader'},
        {loader: 'css-loader?minimize&-autoprefixer'},
        {loader: 'postcss-loader'}
      ])
    })
  }
});
