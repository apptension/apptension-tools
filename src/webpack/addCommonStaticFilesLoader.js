import {evolve, append} from 'ramda';

export default () => evolve({
  module: {
    loaders: append({
      test: /\.(png|jpg|gif|ico|woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file",
      query: {
        name: '[name]-[hash].[ext]'
      }
    })
  }
});
