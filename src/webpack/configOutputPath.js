import {evolve, cond, either, always, merge, defaultTo} from 'ramda';

import {isDev, isProd, isDevOptimized} from '../env';

export default ({publicPath = '/', path} = {}) => ({env, paths}) => {
  const prodEvolution = evolve({
    output: merge({
      path: defaultTo(paths.dist, path),
      filename: '[name]-[hash].js',
      publicPath: publicPath
    })
  });

  const devEvolution = evolve({
    output: merge({
      path: defaultTo(paths.dist, path),
      filename: '[name].js',
      publicPath: publicPath
    })
  });

  return cond([
    [isProd, always(prodEvolution)],
    [either(isDev, isDevOptimized), always(devEvolution)]
  ])(env);
};
