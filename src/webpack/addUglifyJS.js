import {evolve, append} from 'ramda';
import webpack from 'webpack';

export default () => evolve({
  plugins: append(new webpack.optimize.UglifyJsPlugin())
});
