import {propEq} from 'ramda';

import {ENV_PROD, ENV_DEV, ENV_DEV_OPTIMIZED} from './definitions';


const envNameEq = propEq('envName');

export const isProd = envNameEq(ENV_PROD);

export const isDev = envNameEq(ENV_DEV);

export const isDevOptimized = envNameEq(ENV_DEV_OPTIMIZED);
