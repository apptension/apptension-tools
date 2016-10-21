import {evolve, assoc, identity, cond, equals, either, always, merge} from 'ramda';
import path from 'path';

import {isDev, isProd, isDevOptimized} from '../env';

export default ({publicPath = '/'} = {}) => ({env, paths}) => {
  const prodEvolution = evolve({
    output: merge({
      path: paths.dist,
      filename: '[name]-[hash].js',
      publicPath: publicPath
    })
  });

  const devEvolution = evolve({
    output: merge({
      path: paths.dist,
      filename: '[name].js',
      publicPath: publicPath
    })
  });

  return cond([
    [isProd, always(prodEvolution)],
    [either(isDev, isDevOptimized), always(devEvolution)]
  ])(env)
};
