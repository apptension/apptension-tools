import {propEq} from 'ramda';

const ENV_DEV = 'development';
const ENV_DEV_OPTIMIZED = 'development-optimized';
const ENV_PROD = 'production';

const buildEnv = envName => options => Object.freeze({
  ...options,
  envName
});

const envNameEq = propEq('envName');

export const dev = buildEnv(ENV_DEV);

export const devOptimized = buildEnv(ENV_DEV_OPTIMIZED);

export const production = buildEnv(ENV_PROD);

export const isProd = envNameEq(ENV_PROD);

export const isDev = envNameEq(ENV_DEV);

export const isDevOptimized = envNameEq(ENV_DEV_OPTIMIZED);
