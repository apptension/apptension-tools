import {evolve, append} from 'ramda';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default () => (config) => {
  const extractPlugin = new ExtractTextPlugin('styles-[contenthash].css', {allChunks: true});

  return evolve({
    module: {
      loaders: append({
        test: /\.scss$/,
        loader: extractPlugin.extract('style-loader', [
          'css-loader?minimize&-autoprefixer',
          'postcss-loader',
          'sass-loader'
        ])
      })
    },
    plugins: append(extractPlugin)
  })(config);
};
