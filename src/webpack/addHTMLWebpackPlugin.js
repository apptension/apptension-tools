import {evolve, append, merge} from 'ramda';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default ({paths, htmlPlugin = {}}) => evolve({
  plugins: append(new HtmlWebpackPlugin(merge({
    template: path.join(paths.app, 'index.ejs'),
    inject: 'body'
  }, htmlPlugin)))
});
