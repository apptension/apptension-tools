import {evolve, append} from 'ramda';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default () => (config) => {
  const extractPlugin = new ExtractTextPlugin('vendor-[contenthash].css', {allChunks: true});

  return evolve({
    module: {
      loaders: append({
        test: /\.css$/,
        loader: extractPlugin.extract('style-loader', ['css-loader?minimize&-autoprefixer'])
      })
    },
    plugins: append(extractPlugin)
  })(config);
};
