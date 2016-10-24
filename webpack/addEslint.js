import {evolve, append, assoc, pipe} from 'ramda';
import path from 'path';

export default ({paths}) => pipe(
  assoc('eslint', {
    configFile: path.join(paths.cwd, '.eslintrc')
  }),
  evolve({
    module: {
      preLoaders: append({
        test: /\.jsx?$/,
        exclude: /node_modules|bower_components|vendor_modules/,
        loader: 'eslint-loader'
      })
    }
  })
);
