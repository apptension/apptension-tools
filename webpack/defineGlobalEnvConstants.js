import {evolve, concat, ifElse, either, not, always} from 'ramda';
import {DefinePlugin} from 'webpack';

import {isProd, isDevOptimized} from '../env';

export default ({env}) => evolve({
  plugins: concat([
    new DefinePlugin({
      'process.env': {
        NODE_ENV: ifElse(
          either(isProd, isDevOptimized),
          always('"production"'),
          always('"development"')
        )(env)
      },
      __DEBUG__: not(either(isProd, isDevOptimized)(env))
    })
  ])
});
