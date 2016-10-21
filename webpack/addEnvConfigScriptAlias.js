import {evolve, assoc} from 'ramda';
import path from 'path';

export default ({paths, env}) => evolve({
  resolve: {
    alias: assoc('env-config', path.join(paths.environment, env.scriptEnv + '.js'))
  }
});
