import {evolve, assoc, identity, cond, equals, either, always} from 'ramda';
import path from 'path';

import {isDev, isProd, isDevOptimized} from '../env';

export default ({env, paths, filePatterns}) => {
  const entryName = 'main';

  const mainScriptPath = path.join(paths.app, filePatterns.mainScript);

  const prodEvolution = evolve({
    entry: assoc(entryName, mainScriptPath)
  });

  const devEvolution = evolve({
    entry: assoc(entryName, [
      'webpack-dev-server/client?http://' + env.domain + ':' + env.port + '/',
      'webpack/hot/dev-server',
      mainScriptPath
    ])
  });

  return cond([
    [isProd, always(prodEvolution)],
    [either(isDev, isDevOptimized), always(devEvolution)]
  ])(env)
};
