import {evolve, append} from 'ramda';
import webpack from 'webpack';

export default () => (config) => {
  return evolve({
    plugins: append(new webpack.optimize.UglifyJsPlugin())
  })(config);
}
