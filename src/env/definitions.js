export const ENV_DEV = 'dev';
export const ENV_DEV_OPTIMIZED = 'dev-opt';
export const ENV_PROD = 'prod';

const buildEnv = envName => {
  /**
   * @param options
   */
  return options => Object.freeze({
    devServer: {
      domain: 'localhost',
      port: 8000
    },
    scriptEnv: 'development',
    ...options,
    envName
  });
};

export const dev = buildEnv(ENV_DEV);

export const devOptimized = buildEnv(ENV_DEV_OPTIMIZED);

export const production = buildEnv(ENV_PROD);

