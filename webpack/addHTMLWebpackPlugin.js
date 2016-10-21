import {evolve, append, merge, either} from 'ramda';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

import {isProd, isDevOptimized} from '../env';

export default ({htmlExtraOptions = {}} = {}) => ({env, paths}) => evolve({
  plugins: append(new HtmlWebpackPlugin(merge, {
    template: path.join(paths.app, 'index.ejs'),
    inject: 'body',
    environment: env.scriptEnv,
    debug: either(isProd, isDevOptimized)(env)
  }, htmlExtraOptions))
});
