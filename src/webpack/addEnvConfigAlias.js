import path from 'path';

import defineAlias from './utils/defineAlias';

export default ({paths, envConfigName = 'development'}) =>
  defineAlias('env-config', path.join(paths.environment, envConfigName + '.js'))();
