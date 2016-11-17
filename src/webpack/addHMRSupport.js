import {HotModuleReplacementPlugin} from 'webpack';
import {evolve, insertAll, assoc, append} from 'ramda';

export default ({env}) => evolve({
  entry: {
    main: insertAll(0, [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${env.devServer.domain}:${env.devServer.port}/`,
      'webpack/hot/dev-server'
    ])
  },
  plugins: append(new HotModuleReplacementPlugin()),
  devServer: assoc('hot', true)
});
