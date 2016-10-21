import path from 'path';

import defineAlias from './defineAlias';

export default ({paths, env}) => defineAlias('env-config', path.join(paths.environment, env.scriptEnv + '.js'))();
