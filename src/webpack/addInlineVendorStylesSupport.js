import combineLoaders from 'webpack-combine-loaders';

import addLoader from './utils/addLoader';

export default addLoader({
  test: /\.css$/,
  loader: combineLoaders([
    {loader: 'style-loader'},
    {loader: 'css-loader?minimize&-autoprefixer'},
    {loader: 'postcss-loader'}
  ])
});
