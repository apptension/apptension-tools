import {evolve, append} from 'ramda';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

export default (dirName) => ({paths}) => evolve({
  plugins: append(new CopyWebpackPlugin([
    {
      from: path.join(paths.app, dirName),
      to: dirName
    }
  ]))
});
