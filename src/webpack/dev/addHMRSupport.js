import {HotModuleReplacementPlugin} from 'webpack';
import {evolve, insertAll, assoc, append} from 'ramda';

export default ({devServer}) => evolve({
  entry: {
    main: insertAll(0, [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${devServer.domain}:${devServer.port}/`,
      'webpack/hot/dev-server'
    ])
  },
  plugins: append(new HotModuleReplacementPlugin()),
  devServer: assoc('hot', true)
});
