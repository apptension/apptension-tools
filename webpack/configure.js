import reduce from 'lodash/reduce';

export default config => middleware => env => reduce(middleware, (config, fn) => fn(config, env), config);
